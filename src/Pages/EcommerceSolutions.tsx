import React, { useEffect, useRef, useState } from "react";
import { Client, Databases, ID } from 'appwrite';

/**
 * Enhanced VeeAIChatbot with Appwrite Integration
 * Features: Database storage, intent detection, admin escalation, timezone handling
 */

/* --------------------------- Appwrite Setup --------------------------- */
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6933f4610012182c4b1d');

const databases = new Databases(client);
const DATABASE_ID = '6933f49b00278d1abf56';

const COLLECTIONS = {
  CONVERSATIONS: 'chat_conversations',
  MESSAGES: 'chat_messages',
  NOTIFICATIONS: 'admin_notifications',
  BOOKING_ATTEMPTS: 'booking_attempts'
};

/* --------------------------- Types --------------------------- */
type Sender = "vee" | "user" | "admin";
type Intent = "booking" | "complex" | "simple" | "greeting" | "unknown";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  timestamp: Date;
  links?: Array<{ text: string; url: string }>;
  intent?: Intent;
}

interface KBEntry {
  keywords: string[];
  answer: string;
  links?: Array<{ text: string; url: string }>;
  priority?: number;
  intent?: Intent;
}

/* --------------------------- Helper Functions --------------------------- */

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const detectIntent = (text: string): Intent => {
  const lower = text.toLowerCase();
  
  const bookingKeywords = ['book', 'appointment', 'schedule', 'meeting', 'consultation', 'call', 'demo', 'tomorrow', 'next week', 'available'];
  if (bookingKeywords.some(kw => lower.includes(kw))) return 'booking';
  
  const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'];
  if (greetingKeywords.some(kw => lower.includes(kw))) return 'greeting';
  
  const complexIndicators = ['custom', 'specific', 'detailed', 'integration', 'api', 'backend', 'database', 'complex', 'advanced'];
  if (complexIndicators.some(kw => lower.includes(kw)) || text.split(' ').length > 15) {
    return 'complex';
  }
  
  const simpleIndicators = ['what', 'how', 'who', 'where', 'when', 'services', 'portfolio', 'price', 'cost'];
  if (simpleIndicators.some(kw => lower.includes(kw))) return 'simple';
  
  return 'unknown';
};

const needsAdminEscalation = (intent: Intent, failedAttempts: number): boolean => {
  if (intent === 'complex') return true;
  if (intent === 'booking') return false;
  if (intent === 'unknown' && failedAttempts >= 2) return true;
  return false;
};

/* --------------------------- Inline Icons --------------------------- */
const IconChat = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSend = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSun = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M5 19l1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const IconMoon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAlert = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

/* --------------------------- Knowledge Base --------------------------- */
const KNOWLEDGE_BASE: KBEntry[] = [
  {
    keywords: ["book", "appointment", "schedule", "meeting", "consultation"],
    answer: "I'd love to help you schedule a consultation! Let me check our availability.\n\nWhat date and time work best for you? Please specify your timezone if you're not in Lagos, Nigeria.",
    intent: "booking",
    priority: 10
  },
  {
    keywords: ["ocholi divine", "founder", "ceo"],
    answer: "Ocholi Divine is the visionary founder and CEO of Verapixels. He's passionate about creating exceptional digital experiences and leads our team with innovation and excellence.",
    links: [{ text: "Meet Our Team", url: "/ourcoreteam" }],
    intent: "simple",
    priority: 9
  },
  {
    keywords: ["services", "what you offer", "what can you do"],
    answer: "We offer:\n\n🌐 Web Development\n📱 Mobile Apps\n🎨 UI/UX Design\n✨ Graphic Design\n\nWhich interests you?",
    links: [
      { text: "Web Dev", url: "/webdevelopment" },
      { text: "Mobile", url: "/mobileappdevelopment" },
      { text: "Design", url: "/uiuxdesign" }
    ],
    intent: "simple",
    priority: 10
  },
  {
    keywords: ["pricing", "cost", "how much", "price"],
    answer: "Our pricing is project-based and customized to your needs. We require full payment upfront for dedicated resources. Contact us for a detailed quote!",
    links: [{ text: "Get Quote", url: "/contact" }],
    intent: "simple",
    priority: 9
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer: "Hi there! 👋 I'm Vee, your Verapixels AI assistant. I can help you explore services, view portfolio, book consultations, or answer questions. What interests you?",
    intent: "greeting",
    priority: 10
  }
];

/* --------------------------- Main Component --------------------------- */
const VeeAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">(() => 
    (typeof window !== "undefined" && localStorage.getItem("vee-theme")) === "light" ? "light" : "dark"
  );
  const [conversationId, setConversationId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [buttonPos, setButtonPos] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth - 64 - 24,
        y: window.innerHeight - 64 - 24
      };
    }
    return { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const quickOptions = [
    { id: "services", label: "Our Services", emoji: "🛠️" },
    { id: "portfolio", label: "View Portfolio", emoji: "💼" },
    { id: "about", label: "About Us", emoji: "ℹ️" },
    { id: "contact", label: "Get in Touch", emoji: "📞" },
  ];

  useEffect(() => {
    const session = generateSessionId();
    setSessionId(session);
    initializeConversation(session);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("vee-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        const maxX = window.innerWidth - 64;
        const maxY = window.innerHeight - 64;
        
        setButtonPos({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeConversation = async (session: string) => {
    try {
      const convId = ID.unique();
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CONVERSATIONS,
        convId,
        {
          conversation_id: convId,
          user_timezone: getUserTimezone(),
          status: 'active',
          is_admin_takeover: false,
          started_at: new Date().toISOString(),
          session_id: session
        }
      );
      setConversationId(convId);
      
      const welcome: Message = {
        id: Date.now(),
        sender: "vee",
        text: "Hi! 👋 I'm Vee, your intelligent Verapixels assistant.\n\nI can help you:\n• Explore our services\n• Book consultations\n• View portfolio\n• Get pricing info\n\nWhat would you like to know?",
        timestamp: new Date(),
        intent: "greeting"
      };
      setMessages([welcome]);
      
      await saveMessage(convId, welcome);
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
    }
  };

  const saveMessage = async (convId: string, message: Message) => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        ID.unique(),
        {
          message_id: `msg_${Date.now()}`,
          conversation_id: convId,
          sender_type: message.sender,
          sender_name: message.sender === 'vee' ? 'Vee AI' : 'User',
          message_text: message.text,
          timestamp: message.timestamp.toISOString(),
          read_by_admin: false,
          read_by_user: message.sender === 'user',
          intent_detected: message.intent || 'unknown'
        }
      );
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const createAdminNotification = async (reason: string, priority: string, preview: string) => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.NOTIFICATIONS,
        ID.unique(),
        {
          notification_id: ID.unique(),
          conversation_id: conversationId,
          reason: reason,
          priority: priority,
          status: 'pending',
          message_preview: preview,
          created_at: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  };

  const handleBookingRequest = async (userMessage: string) => {
    try {
      const userTimezone = getUserTimezone();
      const businessTimezone = 'Africa/Lagos';
      
      const hasDate = /\b(tomorrow|today|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2})\b/i.test(userMessage);
      const hasTime = /\b(\d{1,2}:\d{2}|am|pm|\d{1,2}\s*(am|pm))\b/i.test(userMessage);
      
      if (!hasDate || !hasTime) {
        return {
          text: "To book a consultation, I need:\n\n📅 Preferred date\n🕐 Preferred time\n🌍 Your timezone (if not Lagos, Nigeria)\n\nExample: 'I'd like to book for December 15 at 2pm EST'",
          needsMoreInfo: true
        };
      }
      
      const now = new Date();
      const currentHour = now.getHours();
      
      if (currentHour < 9 || currentHour >= 18) {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.BOOKING_ATTEMPTS,
          ID.unique(),
          {
            attempt_id: ID.unique(),
            conversation_id: conversationId,
            user_timezone: userTimezone,
            requested_date: 'parsed_date',
            requested_time: 'parsed_time',
            business_timezone: businessTimezone,
            conflict_reason: 'outside_hours',
            created_at: new Date().toISOString(),
            was_resolved: false
          }
        );
        
        return {
          text: "I notice the requested time falls outside our business hours (9 AM - 6 PM Lagos time).\n\nHere are available slots:\n• Tomorrow at 10 AM Lagos time\n• Tomorrow at 2 PM Lagos time\n• Tomorrow at 4 PM Lagos time\n\nWould any of these work?",
          timezoneConflict: true
        };
      }
      
      return {
        text: "Great! I'm forwarding your booking request to our team. They'll confirm within 24 hours and send you a calendar invite.\n\n📧 Check your email for confirmation!",
        bookingSuccess: true
      };
      
    } catch (error) {
      console.error('Booking error:', error);
      return {
        text: "I encountered an issue processing your booking. Let me connect you with our team directly.",
        needsAdmin: true
      };
    }
  };

  const findKBAnswer = (input: string): { text: string; links?: Array<{ text: string; url: string }>; intent: Intent } | null => {
    const lower = input.toLowerCase();
    let matches: Array<{ entry: KBEntry; score: number }> = [];

    for (const entry of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          score += (entry.priority || 5) * 2;
        }
      }
      if (score > 0) {
        matches.push({ entry, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    
    if (matches.length > 0 && matches[0].score >= 5) {
      return { 
        text: matches[0].entry.answer, 
        links: matches[0].entry.links,
        intent: matches[0].entry.intent || 'simple'
      };
    }

    return null;
  };

  const handleQuickOptionClick = (id: string, label?: string) => {
    const userMsg: Message = { 
      id: Date.now(), 
      sender: "user", 
      text: label ?? id, 
      timestamp: new Date() 
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(async () => {
      let resp;
      if (id === "services") {
        resp = { 
          text: "We offer comprehensive digital services:\n\n🌐 Web Development - Custom websites & applications\n📱 Mobile Apps - iOS & Android development\n🎨 UI/UX Design - User-centered interfaces\n✨ Graphic Design - Branding & visual identity\n\nWhich service interests you most?", 
          links: [
            { text: "Web Development", url: "/webdevelopment" },
            { text: "Mobile Apps", url: "/mobileappdevelopment" },
            { text: "UI/UX Design", url: "/uiuxdesign" },
            { text: "Graphic Design", url: "/graphicsdesign" }
          ]
        };
      } else if (id === "portfolio") {
        resp = { 
          text: "Explore our portfolio! We've created websites, mobile apps, e-commerce platforms across various industries.", 
          links: [
            { text: "All Projects", url: "/allprojects" },
            { text: "Case Studies", url: "/casestudies" }
          ]
        };
      } else if (id === "about") {
        resp = { 
          text: "Verapixels is led by founder Ocholi Divine. We combine design with engineering excellence.", 
          links: [
            { text: "About Verapixels", url: "/aboutverapixels" },
            { text: "Meet Our Team", url: "/ourcoreteam" }
          ]
        };
      } else if (id === "contact") {
        resp = { 
          text: "Ready to start your project? Let's connect!", 
          links: [{ text: "Contact Us", url: "/contact" }]
        };
      } else {
        resp = { text: "Here's the information you requested." };
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "vee",
        text: resp.text,
        timestamp: new Date(),
        links: resp.links
      };
      setMessages((prev) => [...prev, botMsg]);
      await saveMessage(conversationId, botMsg);
      setIsTyping(false);
      if (!isOpen) setUnreadCount((n) => n + 1);
    }, 900);
  };

  const handleSend = async () => {
    const raw = inputValue.trim();
    if (!raw || isTyping || !conversationId) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: raw,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    await saveMessage(conversationId, userMsg);

    const intent = detectIntent(raw);
    userMsg.intent = intent;

    setTimeout(async () => {
      let response: any = null;

      if (intent === 'booking') {
        response = await handleBookingRequest(raw);
        
        if (response.bookingSuccess) {
          await createAdminNotification('booking_conflict', 'high', `Booking request: ${raw.substring(0, 50)}...`);
        }
        
        if (response.needsAdmin) {
          await escalateToAdmin('Booking issue', raw);
        }
      } else {
        response = findKBAnswer(raw);
      }

      let botText = "";
      let botLinks: Array<{ text: string; url: string }> | undefined;

      if (response && response.text) {
        botText = response.text;
        botLinks = response.links;
        setFailedAttempts(0);
      } else {
        setFailedAttempts(prev => prev + 1);
        
        if (failedAttempts >= 1) {
          botText = "I'm having trouble understanding that. Let me connect you with our team for personalized help!";
          await escalateToAdmin('Complex query', raw);
        } else {
          botText = "I'm not sure about that. Could you rephrase or ask about:\n• Our services\n• Portfolio\n• Pricing\n• Booking a consultation";
        }
      }

      if (needsAdminEscalation(intent, failedAttempts)) {
        await escalateToAdmin('Complex query', raw);
        botText += "\n\n🔔 I've notified our team. They'll join the conversation shortly!";
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "vee",
        text: botText,
        timestamp: new Date(),
        links: botLinks,
        intent: intent
      };

      setMessages(prev => [...prev, botMsg]);
      await saveMessage(conversationId, botMsg);
      setIsTyping(false);
      
      if (!isOpen) setUnreadCount(n => n + 1);
    }, 800);
  };

  const escalateToAdmin = async (reason: string, context: string) => {
    try {
      await createAdminNotification(
        'complex_query',
        'high',
        context.substring(0, 100)
      );
      
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CONVERSATIONS,
        conversationId,
        { status: 'transferred', is_admin_takeover: true }
      );
      
      setIsAdminMode(true);
    } catch (error) {
      console.error('Escalation failed:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleButtonClick = () => {
    if (!isDragging) {
      setIsOpen(true);
      setUnreadCount(0);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {!isOpen && (
        <button
          onClick={handleButtonClick}
          onMouseDown={handleMouseDown}
          style={{
            position: "fixed",
            left: buttonPos.x,
            top: buttonPos.y,
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg,#0063f4,#00bfff)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0,99,244,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "grab",
            zIndex: 9999,
            transition: isDragging ? "none" : "transform 0.2s",
            userSelect: "none"
          }}
        >
          <IconChat size={24} />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#ff3b30",
              color: "#fff",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700
            }}>{unreadCount}</span>
          )}
        </button>
      )}

      {isOpen && (
        <div style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          top: 80,
          width: 420,
          maxWidth: "calc(100vw - 48px)",
          display: "flex",
          flexDirection: "column",
          background: theme === "dark" ? "#0a0e1a" : "#fff",
          borderRadius: 20,
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          zIndex: 10000,
          overflow: "hidden"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            background: "linear-gradient(90deg,#0063f4,#00bfff)",
            color: "#fff"
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0063f4",
                fontWeight: 800,
                fontSize: 20
              }}>V</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, display: "flex", gap: 6, alignItems: "center" }}>
                  Vee {isAdminMode && <IconAlert size={14} />}
                  <IconSparkle size={14} />
                </div>
                <div style={{ fontSize: 12 }}>
                  {isAdminMode ? "Admin will join soon..." : "AI Assistant"}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={toggleTheme}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 8
                }}
              >
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "none",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 18
                }}
              >✕</button>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: theme === "dark" ? "#0f1419" : "#f5f7fa"
            }}
          >
            {messages.length <= 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 13, opacity: 0.7 }}>Quick Actions</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleQuickOptionClick(opt.id, opt.label)}
                      style={{
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                        background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                        color: theme === "dark" ? "#fff" : "#0b1220",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "all 0.2s"
                      }}
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(m => (
              <div key={m.id} style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                justifyContent: m.sender === "user" ? "flex-end" : "flex-start"
              }}>
                {m.sender === "vee" && (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#0063f4,#00bfff)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}>V</div>
                )}

                <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: m.sender === "user" 
                      ? (theme === "dark" ? "#1a2332" : "#e8f1ff")
                      : (theme === "dark" ? "#1e2836" : "#fff"),
                    color: theme === "dark" ? "#e6eef9" : "#0b1220",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5, fontSize: 14 }}>
                      {m.text}
                    </div>
                  </div>

                  {m.links && m.links.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {m.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "8px 12px",
                            borderRadius: 10,
                            background: theme === "dark" ? "#1a2332" : "#e8f1ff",
                            textDecoration: "none",
                            color: "#0063f4",
                            fontSize: 13,
                            fontWeight: 600
                          }}
                        >
                          {link.text} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {m.sender === "user" && (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#e0e7ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}>U</div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#0063f4,#00bfff)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700
                }}>V</div>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: theme === "dark" ? "#1e2836" : "#fff"
                }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#0063f4",
                        animation: `pulse 1.4s ${i * 0.2}s infinite`
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: 14,
            borderTop: theme === "dark" ? "1px solid #1e2836" : "1px solid #e0e0e0",
            display: "flex",
            gap: 8
          }}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                outline: "none",
                background: theme === "dark" ? "#1a2332" : "#fff",
                color: theme === "dark" ? "#fff" : "#0b1220",
                fontSize: 14
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "none",
                background: inputValue.trim() && !isTyping 
                  ? "linear-gradient(135deg,#0063f4,#00bfff)"
                  : "#e0e0e0",
                color: "#fff",
                cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IconSend />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 60%, 100% { opacity: 0.5; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VeeAIChatbot;