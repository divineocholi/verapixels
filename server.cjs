import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5177",
    ],
    credentials: true,
  })
);

// Security headers to fix CSP
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "connect-src 'self' ws://localhost:5001 http://localhost:5001; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5177",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling']
});

// Chrome DevTools endpoint (to fix CSP error)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  console.log('📊 Chrome DevTools connection attempt');
  res.json({
    manifest: {
      debugger_websocket_url: "ws://localhost:5001/socket.io/",
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

  // Admin connection
  if (dashboard === 'admin') {
    console.log(`👨‍💼 Admin connected: ${adminId}`);
    
    socket.on('admin_join', (data) => {
      console.log('👥 Admin joined conversation:', data.conversationId);
      socket.join(data.conversationId);
      
      // Notify user that admin joined
      io.to(data.conversationId).emit('admin_joined', {
        adminId: data.adminId,
        adminName: data.adminName,
        conversationId: data.conversationId,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Admin ${data.adminName} joined conversation ${data.conversationId}`);
    });
    
    socket.on('admin_message', (data) => {
      console.log('📤 Admin message to conversation:', data.conversationId);
      
      // Create admin message object
      const adminMessage = {
        message_id: `admin_msg_${Date.now()}`,
        conversation_id: data.conversationId,
        sender_type: 'admin',
        sender_name: data.adminName || 'Admin',
        message_text: data.message,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false,
        intent_detected: 'admin_response'
      };
      
      // Send to conversation room
      io.to(data.conversationId).emit('new_message', adminMessage);
      console.log('✅ Admin message sent to conversation:', data.conversationId);
    });
    
    socket.on('admin_status_change', (data) => {
      console.log('🔄 Admin status change:', data);
      io.to(data.conversationId).emit('status_updated', data);
    });
    
    socket.on('transfer_to_admin', (data) => {
      console.log('🔄 Transfer to admin:', data);
      
      // Create notification for all admins
      const notification = {
        notification_id: `notif_${Date.now()}`,
        conversation_id: data.conversationId,
        notification_type: 'user_request',
        message_preview: data.reason || 'User requested assistance',
        reason: data.reason,
        priority: 'high',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Send to all admin clients
      io.emit('new_notification', notification);
      console.log('🔔 Notification sent to all admins:', data.conversationId);
    });
    
  } 
  // Chatbot/User connection
  else if (clientType === 'chatbot') {
    console.log(`🤖 Chatbot connected for session: ${sessionId}`);
    
    socket.join(sessionId);
    activeConnections.set(socket.id, { sessionId });
    
    socket.on('join_conversation', (data) => {
      console.log('👤 User joined conversation:', data.conversationId);
      socket.join(data.conversationId);
    });
    
    socket.on('send_message', (data) => {
      console.log('💬 User message to conversation:', data.conversationId);
      
      const classification = classifyQuery(data.message);
      
      // Create user message object
      const userMessage = {
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
    
    socket.on('typing', (data) => {
      if (data.userType === 'user') {
        io.to(data.conversationId).emit('admin_typing', {
          conversationId: data.conversationId,
          isTyping: data.isTyping
        });
      }
    });
  }
  
  // Health check
  socket.on("ping", () => {
    socket.emit("pong", { timestamp: new Date().toISOString() });
  });
  
  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
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
    version: "1.0.0"
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "Server is running!",
    endpoints: {
      health: "/health",
      websocket: "ws://localhost:5001",
      devtools: "/.well-known/appspecific/com.chrome.devtools.json"
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📡 WebSocket URL: ws://localhost:${PORT}`);
  console.log(`🔧 DevTools endpoint: http://localhost:${PORT}/.well-known/appspecific/com.chrome.devtools.json`);
  console.log(`✅ Server ready for connections!`);
});

export { app, server, io }; // Optional: Export if needed elsewhere