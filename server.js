import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs'; // ✅ ADD THIS IMPORT

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5001;

// Dynamic CORS origins
const allowedOrigins = isDevelopment
  ? [
      "http://localhost:5173",
      "http://localhost:5179",
      "http://localhost:3000",
      "http://localhost:5177",
    ]
  : process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',') 
    : [];

console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
console.log('🌍 Allowed origins:', allowedOrigins);

// ========== MIDDLEWARE ==========
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Security headers with dynamic CSP
app.use((req, res, next) => {
  const protocol = isDevelopment ? 'ws:' : 'wss:';
  const httpProtocol = isDevelopment ? 'http:' : 'https:';
  const serverDomain = process.env.SERVER_DOMAIN || `localhost:${PORT}`;
  
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    `connect-src 'self' ${protocol}//${serverDomain} ${httpProtocol}//${serverDomain}; ` +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

// ========== SUPABASE ADMIN CLIENT ==========
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// ========== ADMIN API ROUTES ==========

// Create admin invite endpoint
app.post('/api/admin/create-invite', async (req, res) => {
  const { email, role, createdBy } = req.body;

  try {
    console.log('🎯 Creating invite for:', email);

    // 1. Check if user already exists in admins table
    const { data: existingUser } = await supabaseAdmin
      .from('admins')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'An admin with this email already exists' 
      });
    }

    // 2. Generate invite token FIRST (before creating auth user)
    const token = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    console.log('🔑 Generated token:', token);

    // 3. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: 'TemporaryPassword123!',
      email_confirm: true,
      user_metadata: { name: 'New Admin' }
    });

    if (authError) {
      console.error('❌ Auth error:', authError);
      return res.status(500).json({ 
        success: false, 
        error: authError.message || 'Failed to create auth user' 
      });
    }

    console.log('✅ Auth user created:', authData.user.id);

    // 4. Create invite record
    const { error: inviteError } = await supabaseAdmin
      .from('admin_invites')
      .insert({
        token: token,
        email: email,
        role_assigned: role,
        expires_at: expiresAt.toISOString(),
        created_by: createdBy,
        auth_user_id: authData.user.id,
        used: false
      });

    if (inviteError) {
      console.error('❌ Invite error:', inviteError);
      // Clean up: delete the auth user if invite creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ 
        success: false, 
        error: inviteError.message || 'Failed to create invite' 
      });
    }

    console.log('✅ Invite created successfully');

    // 5. Generate invite URL
    const clientUrl = process.env.CLIENT_URL 
      ? process.env.CLIENT_URL.split(',')[0].trim()
      : 'http://localhost:5173';
    
    const inviteUrl = `${clientUrl}/superadmin/register?token=${token}`;

    console.log('📧 Invite URL:', inviteUrl);

    // 6. Return success response
    res.json({
      success: true,
      userId: authData.user.id,
      inviteUrl: inviteUrl,
      token: token,
      email: email
    });

  } catch (error) {
    console.error('❌ Error creating invite:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create invite' 
    });
  }
});

// ✅ UPDATED ENDPOINT: Complete admin registration with password hashing
app.post('/api/admin/complete-registration', async (req, res) => {
  const { token, password, name } = req.body;

  try {
    console.log('🔐 Completing registration for token:', token);

    // 1. Validate invite
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('admin_invites')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (inviteError || !invite) {
      console.error('❌ Invite validation failed:', inviteError);
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or expired invite token' 
      });
    }

    console.log('✅ Invite validated for:', invite.email);

    // 2. Update user password in Supabase Auth
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      invite.auth_user_id,
      { password: password }
    );

    if (updateError) {
      console.error('❌ Password update failed:', updateError);
      return res.status(500).json({ 
        success: false, 
        error: updateError.message || 'Failed to update password' 
      });
    }

    console.log('✅ Password updated in Supabase Auth');

    // 3. ✅ HASH PASSWORD FOR ADMINS TABLE
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed for database');

    // 4. Create admin record WITH HASHED PASSWORD
    const { error: adminError } = await supabaseAdmin
      .from('admins')
      .insert({
        auth_user_id: invite.auth_user_id,
        name: name || invite.email.split('@')[0],
        email: invite.email,
        password_hash: hashedPassword, // ✅ STORE HASHED PASSWORD
        role: invite.role_assigned,
        is_active: true,
        settings: {}
      });

    if (adminError) {
      console.error('❌ Admin record creation failed:', adminError);
      return res.status(500).json({ 
        success: false, 
        error: adminError.message || 'Failed to create admin record' 
      });
    }

    console.log('✅ Admin record created with hashed password');

    // 5. Mark invite as used
    const { error: markUsedError } = await supabaseAdmin
      .from('admin_invites')
      .update({ 
        used: true, 
        used_at: new Date().toISOString() 
      })
      .eq('token', token);

    if (markUsedError) {
      console.error('⚠️ Warning: Failed to mark invite as used:', markUsedError);
      // Don't fail the request for this
    }

    console.log('✅ Invite marked as used');

    // 6. Return success
    res.json({
      success: true,
      email: invite.email,
      message: 'Registration completed successfully'
    });

  } catch (error) {
    console.error('❌ Error completing registration:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Registration failed. Please try again.' 
    });
  }
});

// ✅ NEW ENDPOINT: Admin Login with password verification
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Admin login attempt for:', email);

    // 1. Get admin from database
    const { data: admin, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !admin) {
      console.error('❌ Admin not found:', adminError);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      console.error('❌ Invalid password for:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    console.log('✅ Password verified for:', email);

    // 3. Update last login
    await supabaseAdmin
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // 4. Return admin data (without password)
    const { password_hash, ...adminData } = admin;

    res.json({
      success: true,
      admin: adminData,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Login failed. Please try again.' 
    });
  }
});

// ========== SOCKET.IO SETUP ==========
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling']
});

// Chrome DevTools endpoint
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  console.log('🔧 Chrome DevTools connection attempt');
  const protocol = isDevelopment ? 'ws:' : 'wss:';
  const serverDomain = process.env.SERVER_DOMAIN || `localhost:${PORT}`;
  
  res.json({
    manifest: {
      debugger_websocket_url: `${protocol}//${serverDomain}/socket.io/`,
      description: "Chat WebSocket Server DevTools",
      title: "Chat Server Debugger",
      type: "node"
    }
  });
});

// Store active connections
const activeConnections = new Map();

// Simple query classification
const classifyQuery = (message) => {
  const lowerMessage = message.toLowerCase();

  const bookingKeywords = [
    "book", "appointment", "schedule", "reserve", "consultation", "meeting", "booking"
  ];
  const adminKeywords = [
    "talk to human", "speak to someone", "real person", "human agent", 
    "person", "human", "admin", "representative", "agent"
  ];

  if (bookingKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "BOOKING";
  }
  if (adminKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "ADMIN_REQUEST";
  }
  return "SIMPLE";
};

// Function to log room information
const logRoomInfo = (roomId) => {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (room) {
    console.log(`📍 Room ${roomId}: ${room.size} member(s)`);
    console.log(`📍 Members:`, Array.from(room));
  } else {
    console.log(`📍 Room ${roomId}: Does not exist`);
  }
};

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Log all events for debugging
  socket.onAny((eventName, ...args) => {
    if (eventName !== 'ping' && eventName !== 'pong') {
      console.log(`📡 [${socket.id}] Event: ${eventName}`, 
        args[0] ? JSON.stringify(args[0]).substring(0, 100) + '...' : 'No data');
    }
  });

  // Check client type
  const { adminId, dashboard, clientType, sessionId } = socket.handshake.query;
  
  console.log("Client type:", { adminId, dashboard, clientType, sessionId });

  // ========== ADMIN CONNECTION ==========
  if (dashboard === 'admin') {
    console.log(`👨‍💼 Admin connected: ${adminId} (Socket ID: ${socket.id})`);
    
    // Store admin connection
    activeConnections.set(socket.id, { 
      type: 'admin', 
      adminId, 
      rooms: new Set() 
    });

    // ========== ADMIN JOINS CONVERSATION ==========
    socket.on('admin_join', (data) => {
      console.log('🚪 Admin joining conversation:', data.conversationId);
      console.log('👤 Admin name:', data.adminName);
      
      const roomId = data.conversationId;
      
      // Leave any previous conversation rooms
      const adminInfo = activeConnections.get(socket.id);
      if (adminInfo && adminInfo.rooms) {
        adminInfo.rooms.forEach(oldRoom => {
          if (oldRoom !== roomId) {
            socket.leave(oldRoom);
            console.log(`🚪 Admin left room: ${oldRoom}`);
          }
        });
        adminInfo.rooms.clear();
        adminInfo.rooms.add(roomId);
      }
      
      // Join the conversation room
      socket.join(roomId);
      
      // Log room info
      logRoomInfo(roomId);
      
      // ✅ SEND JOIN MESSAGE: "Junior has joined the conversation"
      const joinMessage = {
        id: `system_msg_${Date.now()}`,
        message_id: `system_msg_${Date.now()}`,
        conversation_id: roomId,
        sender_type: 'admin',
        sender_name: 'System',
        message_text: `${data.adminName || 'An admin'} has joined the conversation. How can I help you today?`,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false,
        intent_detected: 'admin_joined',
        classification: 'SYSTEM'
      };
      
      // Send join message to conversation
      io.to(roomId).emit('new_message', joinMessage);
      
      // Also emit admin_joined event
      io.to(roomId).emit('admin_joined', {
        adminId: data.adminId,
        adminName: data.adminName,
        conversationId: roomId,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Admin ${data.adminName} joined conversation ${roomId}`);
    });
    
    // ========== ADMIN SENDS MESSAGE ==========
    const handleAdminMessage = (data) => {
      console.log('💬 Admin message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      const roomId = data.conversationId || data.conversation_id;
      
      if (!roomId) {
        console.error('❌ No conversation ID provided in admin message');
        return;
      }
      
      // Ensure admin is in the room
      if (!socket.rooms.has(roomId)) {
        console.log('⚠️ Admin not in conversation room, auto-joining...');
        socket.join(roomId);
        
        // Update admin info
        const adminInfo = activeConnections.get(socket.id);
        if (adminInfo && adminInfo.rooms) {
          adminInfo.rooms.add(roomId);
        }
      }
      
      // Create admin message object
      const adminMessage = {
        id: `admin_msg_${Date.now()}`,
        message_id: `admin_msg_${Date.now()}`,
        conversation_id: roomId,
        sender_type: 'admin',
        sender_name: data.adminName || 'Admin',
        message_text: data.message || data.message_text,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false,
        intent_detected: data.intent || 'admin_response',
        classification: data.classification || 'ADMIN_RESPONSE'
      };
      
      console.log('📤 Emitting to conversation room:', roomId);
      logRoomInfo(roomId);
      
      // ✅ CRITICAL: Send to ALL sockets in the conversation room
      io.to(roomId).emit('new_message', adminMessage);
      
      console.log('✅ Admin message sent to conversation:', roomId);
    };
    
    // Listen to BOTH event names for maximum compatibility
    socket.on('admin_message', handleAdminMessage);
    socket.on('send_message', (data) => {
      // Format data for consistency
      const formattedData = {
        conversationId: data.conversationId || data.conversation_id,
        message: data.message || data.message_text,
        adminName: data.adminName || 'Admin',
        intent: data.intent,
        classification: data.classification
      };
      handleAdminMessage(formattedData);
    });
    
    // ========== ADMIN STATUS CHANGE ==========
    socket.on('admin_status_change', (data) => {
      console.log('🔄 Admin status change:', data);
      io.to(data.conversationId).emit('status_updated', data);
    });
    
    // ========== TRANSFER TO ADMIN ==========
    socket.on('transfer_to_admin', (data) => {
      console.log('🔀 Transfer to admin requested:', data);
      
      const roomId = data.conversationId;
      
      // Create notification for all admins
      const notification = {
        notification_id: data.notificationId || `notif_${Date.now()}`,
        conversation_id: roomId,
        notification_type: 'user_request',
        message_preview: data.reason || 'User requested assistance',
        reason: data.reason,
        priority: data.priority || 'high',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Send to all admin clients
      io.emit('new_notification', notification);
      console.log('🔔 Notification sent to all admins');
      
      // Confirm to user
      socket.to(roomId).emit('transfer_confirmed', {
        conversationId: roomId,
        status: 'Admin notified',
        timestamp: new Date().toISOString()
      });
      
      // Also emit transfer_initiated
      socket.to(roomId).emit('transfer_initiated', {
        conversationId: roomId,
        reason: data.reason,
        timestamp: new Date().toISOString()
      });
    });
    
    // ========== ADMIN TYPING INDICATOR ==========
    socket.on('typing', (data) => {
      console.log('⌨️ Admin typing in:', data.conversationId);
      
      const roomId = data.conversationId;
      
      // Send typing indicator to user (but not back to admin)
      socket.to(roomId).emit('admin_typing', {
        conversationId: roomId,
        isTyping: data.isTyping,
        timestamp: new Date().toISOString()
      });
    });
    
    console.log(`✅ Admin ${adminId} event handlers registered`);
  } 
  // ========== CHATBOT/USER CONNECTION ==========
  else if (clientType === 'chatbot') {
    console.log(`🤖 Chatbot connected for session: ${sessionId} (Socket ID: ${socket.id})`);
    
    // Store user connection
    activeConnections.set(socket.id, { 
      type: 'user', 
      sessionId, 
      rooms: new Set() 
    });
    
    // Join session room
    socket.join(sessionId);
    
    // ========== USER JOINS CONVERSATION ==========
    socket.on('join_conversation', (data) => {
      console.log('🚪 User joining conversation:', data.conversationId);
      
      const roomId = data.conversationId || sessionId;
      
      // Leave any previous rooms
      const userInfo = activeConnections.get(socket.id);
      if (userInfo && userInfo.rooms) {
        userInfo.rooms.forEach(oldRoom => {
          if (oldRoom !== roomId) {
            socket.leave(oldRoom);
            console.log(`🚪 User left room: ${oldRoom}`);
          }
        });
        userInfo.rooms.clear();
        userInfo.rooms.add(roomId);
      }
      
      // Join the conversation room
      socket.join(roomId);
      
      console.log('✅ User joined room:', roomId);
      logRoomInfo(roomId);
    });
    
    // ========== USER SENDS MESSAGE ==========
    socket.on('send_message', (data) => {
      console.log('💬 User message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      const roomId = data.conversationId || sessionId;
      const classification = classifyQuery(data.message);
      
      // Ensure user is in the room
      if (!socket.rooms.has(roomId)) {
        console.log('⚠️ User not in conversation room, auto-joining...');
        socket.join(roomId);
        
        // Update user info
        const userInfo = activeConnections.get(socket.id);
        if (userInfo && userInfo.rooms) {
          userInfo.rooms.add(roomId);
        }
      }
      
      // Create user message object
      const userMessage = {
        id: `msg_${Date.now()}`,
        message_id: `msg_${Date.now()}`,
        conversation_id: roomId,
        sender_type: 'user',
        sender_name: data.sender || 'User',
        message_text: data.message,
        timestamp: new Date().toISOString(),
        read_by_admin: false,
        read_by_user: true,
        intent_detected: classification,
        classification: classification,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null
      };
      
      console.log('📤 Emitting to conversation room:', roomId);
      logRoomInfo(roomId);
      
      // Send to conversation room
      io.to(roomId).emit('new_message', userMessage);
      console.log('✅ User message sent to conversation:', roomId);
      
      // If it's an admin request, create notification
      if (classification === 'ADMIN_REQUEST') {
        const notification = {
          notification_id: `notif_${Date.now()}`,
          conversation_id: roomId,
          notification_type: 'user_request',
          message_preview: data.message.length > 100 
            ? data.message.substring(0, 100) + '...' 
            : data.message,
          reason: 'User requested human assistance',
          priority: 'high',
          status: 'pending',
          created_at: new Date().toISOString()
        };
        
        // Send to all admin clients
        io.emit('new_notification', notification);
        console.log('🔔 Admin notification sent for:', roomId);
      }
    });
    
    // ========== USER TYPING INDICATOR ==========
    socket.on('typing', (data) => {
      if (data.userType === 'user') {
        console.log('⌨️ User typing in:', data.conversationId);
        
        const roomId = data.conversationId;
        
        // Send typing indicator to admin
        socket.to(roomId).emit('user_typing', {
          conversationId: roomId,
          isTyping: data.isTyping,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // ========== TRANSFER TO ADMIN (from chatbot) ==========
    socket.on('transfer_to_admin', (data) => {
      console.log('🔀 User requested transfer to admin:', data);
      
      const roomId = data.conversationId;
      
      // Create notification for all admins
      const notification = {
        notification_id: data.notificationId || `notif_${Date.now()}`,
        conversation_id: roomId,
        notification_type: 'user_request',
        message_preview: data.reason || 'User requested assistance',
        reason: data.reason,
        priority: data.priority || 'urgent',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Send to all admin clients
      io.emit('new_notification', notification);
      console.log('🔔 Transfer notification sent to all admins');
      
      // Also send confirmation back to user
      socket.emit('transfer_initiated', {
        conversationId: roomId,
        reason: data.reason,
        timestamp: new Date().toISOString()
      });
    });
  }
  
  // ========== HEALTH CHECK ==========
  socket.on("ping", () => {
    socket.emit("pong", { 
      timestamp: new Date().toISOString(),
      socketId: socket.id 
    });
  });
  
  // ========== DISCONNECT ==========
  socket.on("disconnect", (reason) => {
    console.log("❌ Client disconnected:", socket.id);
    console.log("   Reason:", reason);
    
    const clientInfo = activeConnections.get(socket.id);
    if (clientInfo) {
      console.log("   Client type:", clientInfo.type);
      if (clientInfo.type === 'admin') {
        console.log("   Admin ID:", clientInfo.adminId);
      } else {
        console.log("   Session:", clientInfo.sessionId);
      }
    }
    
    activeConnections.delete(socket.id);
  });
  
  // Send connection confirmation
  socket.emit('connected', {
    socketId: socket.id,
    timestamp: new Date().toISOString(),
    message: 'Successfully connected to WebSocket server'
  });
});

// Endpoint to check active connections
app.get("/connections", (req, res) => {
  const connections = {
    total: activeConnections.size,
    admins: Array.from(activeConnections.entries())
      .filter(([_, info]) => info.type === 'admin')
      .map(([socketId, info]) => ({ socketId, adminId: info.adminId })),
    users: Array.from(activeConnections.entries())
      .filter(([_, info]) => info.type === 'user')
      .map(([socketId, info]) => ({ socketId, sessionId: info.sessionId })),
    rooms: Array.from(io.sockets.adapter.rooms.entries())
      .filter(([roomId]) => !Array.from(activeConnections.keys()).includes(roomId))
      .map(([roomId, sockets]) => ({
        roomId,
        memberCount: sockets.size,
        members: Array.from(sockets)
      }))
  };
  
  res.json(connections);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    connections: io.engine.clientsCount,
    activeConnections: activeConnections.size,
    server: "Chat WebSocket Server",
    version: "2.4.0",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  const protocol = isDevelopment ? 'ws:' : 'wss:';
  const serverDomain = process.env.SERVER_DOMAIN || `localhost:${PORT}`;
  
  res.json({
    message: "Server is running!",
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: "/health",
      connections: "/connections",
      websocket: `${protocol}//${serverDomain}`,
      devtools: "/.well-known/appspecific/com.chrome.devtools.json",
      adminApi: {
        createInvite: "/api/admin/create-invite",
        completeRegistration: "/api/admin/complete-registration",
        login: "/api/admin/login" // ✅ NEW
      }
    },
    allowedOrigins: allowedOrigins,
    activeConnections: io.engine.clientsCount,
    socketRooms: io.sockets.adapter.rooms.size
  });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Connections: http://localhost:${PORT}/connections`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🌐 WebSocket URL: ${isDevelopment ? 'ws' : 'wss'}://localhost:${PORT}`);
  console.log(`👥 Admin API:`);
  console.log(`   - Create Invite: http://localhost:${PORT}/api/admin/create-invite`);
  console.log(`   - Complete Registration: http://localhost:${PORT}/api/admin/complete-registration`);
  console.log(`   - Login: http://localhost:${PORT}/api/admin/login`); // ✅ NEW
  console.log(`🔧 DevTools endpoint: http://localhost:${PORT}/.well-known/appspecific/com.chrome.devtools.json`);
  console.log(`✅ Server ready for connections!`);
});

export { app, server, io };