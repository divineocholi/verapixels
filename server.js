import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5001;

// Dynamic CORS origins
const allowedOrigins = isDevelopment
  ? [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5177",
    ]
  : process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',') 
    : [];

console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
console.log('🔐 Allowed origins:', allowedOrigins);

// CORS setup
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

// Socket.IO setup with dynamic CORS
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
  console.log('📊 Chrome DevTools connection attempt');
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

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Check client type
  const { adminId, dashboard, clientType, sessionId } = socket.handshake.query;
  
  console.log("Client type:", { adminId, dashboard, clientType, sessionId });

  // ========== ADMIN CONNECTION ==========
  if (dashboard === 'admin') {
    console.log(`👨‍💼 Admin connected: ${adminId}`);
    
    // ========== ADMIN JOINS CONVERSATION ==========
    socket.on('admin_join', (data) => {
      console.log('👥 Admin joining conversation:', data.conversationId);
      console.log('👤 Admin name:', data.adminName);
      
      // Join the conversation room
      socket.join(data.conversationId);
      
      // ✅ SEND JOIN MESSAGE: "Junior has joined the conversation"
      const joinMessage = {
        id: `system_msg_${Date.now()}`,
        message_id: `system_msg_${Date.now()}`,
        conversation_id: data.conversationId,
        sender_type: 'admin',
        sender_name: 'System',
        message_text: `${data.adminName} has joined the conversation. How can I help you today?`,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false,
        intent_detected: 'admin_joined',
        classification: 'SYSTEM'
      };
      
      // Send join message to conversation
      io.to(data.conversationId).emit('new_message', joinMessage);
      
      // Also emit admin_joined event
      io.to(data.conversationId).emit('admin_joined', {
        adminId: data.adminId,
        adminName: data.adminName,
        conversationId: data.conversationId,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Admin ${data.adminName} joined conversation ${data.conversationId}`);
      console.log(`📍 Room size:`, io.sockets.adapter.rooms.get(data.conversationId)?.size || 0);
    });
    
    // ========== ADMIN SENDS MESSAGE ==========
    // Handle BOTH 'admin_message' AND 'send_message' for compatibility
    const handleAdminMessage = (data) => {
      console.log('📤 Admin message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      // Create admin message object
      const adminMessage = {
        id: `admin_msg_${Date.now()}`,
        message_id: `admin_msg_${Date.now()}`,
        conversation_id: data.conversationId,
        sender_type: 'admin',
        sender_name: data.adminName || 'Admin',
        message_text: data.message,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false,
        intent_detected: 'admin_response',
        classification: 'ADMIN_RESPONSE'
      };
      
      console.log('📍 Emitting to conversation room:', data.conversationId);
      console.log('📍 Room size:', io.sockets.adapter.rooms.get(data.conversationId)?.size || 0);
      console.log('📍 Sockets in room:', Array.from(io.sockets.adapter.rooms.get(data.conversationId) || []));
      
      // ✅ CRITICAL: Send to conversation room
      io.to(data.conversationId).emit('new_message', adminMessage);
      
      console.log('✅ Admin message sent to conversation:', data.conversationId);
    };
    
    // Listen to BOTH event names for maximum compatibility
    socket.on('admin_message', handleAdminMessage);
    socket.on('send_message', handleAdminMessage); // ✅ AdminDashboard uses this
    
    // ========== ADMIN STATUS CHANGE ==========
    socket.on('admin_status_change', (data) => {
      console.log('🔄 Admin status change:', data);
      io.to(data.conversationId).emit('status_updated', data);
    });
    
    // ========== TRANSFER TO ADMIN ==========
    socket.on('transfer_to_admin', (data) => {
      console.log('🔄 Transfer to admin requested:', data);
      
      // Create notification for all admins
      const notification = {
        notification_id: data.notificationId || `notif_${Date.now()}`,
        conversation_id: data.conversationId,
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
      socket.to(data.conversationId).emit('transfer_confirmed', {
        conversationId: data.conversationId,
        status: 'Admin notified',
        timestamp: new Date().toISOString()
      });
    });
    
    // ========== ADMIN TYPING INDICATOR ==========
    socket.on('typing', (data) => {
      console.log('⌨️ Admin typing in:', data.conversationId);
      
      // Send typing indicator to user (but not back to admin)
      socket.to(data.conversationId).emit('admin_typing', {
        conversationId: data.conversationId,
        isTyping: data.isTyping,
        timestamp: new Date().toISOString()
      });
    });
    
    console.log(`✅ Admin ${adminId} event handlers registered`);
  } 
  // ========== CHATBOT/USER CONNECTION ==========
  else if (clientType === 'chatbot') {
    console.log(`🤖 Chatbot connected for session: ${sessionId}`);
    
    socket.join(sessionId);
    activeConnections.set(socket.id, { sessionId });
    
    // ========== USER JOINS CONVERSATION ==========
    socket.on('join_conversation', (data) => {
      console.log('👤 User joining conversation:', data.conversationId);
      socket.join(data.conversationId);
      console.log('✅ User joined room:', data.conversationId);
      console.log('📍 Room size:', io.sockets.adapter.rooms.get(data.conversationId)?.size || 0);
    });
    
    // ========== USER SENDS MESSAGE ==========
    socket.on('send_message', (data) => {
      console.log('💬 User message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      const classification = classifyQuery(data.message);
      
      // Create user message object
      const userMessage = {
        id: `msg_${Date.now()}`,
        message_id: `msg_${Date.now()}`,
        conversation_id: data.conversationId,
        sender_type: 'user',
        sender_name: 'User',
        message_text: data.message,
        timestamp: new Date().toISOString(),
        read_by_admin: false,
        read_by_user: true,
        intent_detected: classification,
        classification: classification
      };
      
      console.log('📍 Emitting to conversation room:', data.conversationId);
      console.log('📍 Room size:', io.sockets.adapter.rooms.get(data.conversationId)?.size || 0);
      
      // Send to conversation room
      io.to(data.conversationId).emit('new_message', userMessage);
      console.log('✅ User message sent to conversation:', data.conversationId);
      
      // If it's an admin request, create notification
      if (classification === 'ADMIN_REQUEST') {
        const notification = {
          notification_id: `notif_${Date.now()}`,
          conversation_id: data.conversationId,
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
        console.log('🔔 Admin notification sent for:', data.conversationId);
      }
    });
    
    // ========== USER TYPING INDICATOR ==========
    socket.on('typing', (data) => {
      if (data.userType === 'user') {
        console.log('⌨️ User typing in:', data.conversationId);
        
        // Send typing indicator to admin
        socket.to(data.conversationId).emit('user_typing', {
          conversationId: data.conversationId,
          isTyping: data.isTyping,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // ========== TRANSFER TO ADMIN (from chatbot) ==========
    socket.on('transfer_to_admin', (data) => {
      console.log('🔄 User requested transfer to admin:', data);
      
      // Create notification for all admins
      const notification = {
        notification_id: data.notificationId || `notif_${Date.now()}`,
        conversation_id: data.conversationId,
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
    });
  }
  
  // ========== HEALTH CHECK ==========
  socket.on("ping", () => {
    socket.emit("pong", { timestamp: new Date().toISOString() });
  });
  
  // ========== DISCONNECT ==========
  socket.on("disconnect", (reason) => {
    console.log("❌ Client disconnected:", socket.id);
    console.log("   Reason:", reason);
    
    const clientInfo = activeConnections.get(socket.id);
    if (clientInfo) {
      console.log("   Session:", clientInfo.sessionId);
    }
    
    activeConnections.delete(socket.id);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    connections: io.engine.clientsCount,
    server: "Chat WebSocket Server",
    version: "2.0.0",
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
      websocket: `${protocol}//${serverDomain}`,
      devtools: "/.well-known/appspecific/com.chrome.devtools.json"
    },
    allowedOrigins: allowedOrigins,
    activeConnections: io.engine.clientsCount
  });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📡 WebSocket URL: ${isDevelopment ? 'ws' : 'wss'}://localhost:${PORT}`);
  console.log(`🔧 DevTools endpoint: http://localhost:${PORT}/.well-known/appspecific/com.chrome.devtools.json`);
  console.log(`✅ Server ready for connections!`);
});

export { app, server, io };