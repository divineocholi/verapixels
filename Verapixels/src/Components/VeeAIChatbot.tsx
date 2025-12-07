import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Enhanced VeeAIChatbot.tsx
 * Smarter Verapixels assistant with improved navigation and contextual awareness
 * Now with draggable icon functionality
 */

/* --------------------------- Types --------------------------- */
type Sender = "vee" | "user";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  timestamp: Date;
  links?: Array<{ text: string; url: string }>;
}

interface KBEntry {
  keywords: string[];
  answer: string;
  links?: Array<{ text: string; url: string }>;
  priority?: number;
}

/* --------------------------- Inline Icons --------------------------- */
const IconChat = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSend = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSun = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M5 19l1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const IconMoon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* --------------------------- Enhanced Knowledge Base --------------------------- */
const KNOWLEDGE_BASE: KBEntry[] = [
  // Founder & Team
  {
    keywords: ["ocholi divine", "founder", "ceo", "ocholi", "divine", "who created verapixels", "owner"],
    answer: "Ocholi Divine is the visionary founder and CEO of Verapixels. He's a passionate frontend developer and digital innovator who established Verapixels to deliver cutting-edge design and technology solutions. His expertise spans web development, UI/UX design, and digital strategy, and he leads the team with a commitment to excellence and innovation.",
    links: [{ text: "Meet Our Core Team", url: "/ourcoreteam" }],
    priority: 10
  },
  {
    keywords: ["team", "who works", "meet the team", "core team", "staff", "employees", "who are you"],
    answer: "Our core team consists of talented frontend developers, UI/UX designers, and digital specialists. We're a carefully curated group of professionals who are passionate about creating exceptional digital experiences. Each team member brings unique expertise and creativity to every project.",
    links: [{ text: "Meet Our Core Team", url: "/ourcoreteam" }],
    priority: 8
  },

  // About Verapixels
  {
    keywords: ["what is verapixels", "about verapixels", "tell me about", "company info", "who are you", "what do you do"],
    answer: "Verapixels is a technology and creative agency specializing in building exceptional websites, digital products, and comprehensive brand systems. We combine world-class design with engineering excellence to deliver production-ready experiences. Our name reflects our mission: Vera (truth) + Pixels (digital elements) = creating honest, clear, and valuable digital solutions.",
    links: [
      { text: "About Verapixels", url: "/aboutverapixels" },
      { text: "How We Work", url: "/howweworkandfunction" }
    ],
    priority: 10
  },
  {
    keywords: ["how you work", "work process", "workflow", "methodology", "approach", "how we work", "process"],
    answer: "We follow a proven methodology: Discovery → Strategy → Design → Development → Testing → Launch. We maintain transparent communication throughout, provide regular updates, and work collaboratively with clients at every stage. Our agile-friendly approach ensures you're involved from start to finish.",
    links: [{ text: "Our Work Process", url: "/howweworkandfunction" }],
    priority: 8
  },

  // Services - Comprehensive Coverage
  {
    keywords: ["services", "what services", "offerings", "what you offer", "what can you do"],
    answer: "Verapixels offers comprehensive digital services:\n\n• Web Development - Custom websites & applications\n• Mobile App Development - iOS & Android apps\n• UI/UX Design - User-centered interfaces\n• Graphic Design - Visual branding & identity\n\nEach service is delivered with modern technology, beautiful design, and measurable results.",
    links: [
      { text: "Web Development", url: "/webdevelopment" },
      { text: "Mobile Apps", url: "/mobileappdevelopment" },
      { text: "UI/UX Design", url: "/uiuxdesign" },
      { text: "Graphic Design", url: "/graphicsdesign" }
    ],
    priority: 10
  },
  {
    keywords: ["web development", "website", "web dev", "build website", "create website", "web design"],
    answer: "Our web development service creates fast, secure, and scalable websites using modern technologies like React, TypeScript, and Node.js. We build responsive websites that work perfectly on all devices, with SEO optimization, accessibility standards, and performance optimization built-in.",
    links: [{ text: "Web Development Services", url: "/webdevelopment" }],
    priority: 9
  },
  {
    keywords: ["mobile app", "mobile development", "ios", "android", "app development", "mobile application"],
    answer: "We develop native and cross-platform mobile applications for iOS and Android with stunning design and powerful functionality. We handle everything from strategy and design to development, testing, and App Store deployment.",
    links: [{ text: "Mobile App Development", url: "/mobileappdevelopment" }],
    priority: 9
  },
  {
    keywords: ["ui ux", "ui/ux", "user experience", "user interface", "ux design", "ui design", "design"],
    answer: "Our UI/UX design service creates intuitive, beautiful interfaces that users love. We conduct user research, create wireframes and prototypes, perform usability testing, and deliver pixel-perfect designs. We combine aesthetic excellence with data-driven decisions.",
    links: [{ text: "UI/UX Design Services", url: "/uiuxdesign" }],
    priority: 9
  },
  {
    keywords: ["graphic design", "graphics", "branding", "logo", "visual design", "brand identity"],
    answer: "Our graphic design service delivers compelling visual identities and brand systems. From logos and brand guidelines to marketing materials and digital assets, we create designs that communicate your message effectively and leave lasting impressions.",
    links: [{ text: "Graphic Design Services", url: "/graphicsdesign" }],
    priority: 9
  },

  // Portfolio & Projects
  {
    keywords: ["portfolio", "work", "projects", "show me work", "examples", "past projects", "your work"],
    answer: "Explore our diverse portfolio showcasing websites, web applications, mobile apps, and e-commerce platforms across multiple industries. Each project demonstrates our commitment to quality, innovation, and delivering results that exceed expectations.",
    links: [
      { text: "All Projects", url: "/allprojects" },
      { text: "Case Studies", url: "/casestudies" }
    ],
    priority: 10
  },
  {
    keywords: ["case studies", "case study", "success stories", "client results", "results"],
    answer: "Our case studies provide in-depth analysis of how we've solved real business challenges. Each study details client objectives, our strategic approach, the solution implemented, and measurable results achieved - from increased conversions to improved user engagement.",
    links: [{ text: "Read Case Studies", url: "/casestudies" }],
    priority: 8
  },
  {
    keywords: ["all projects", "project showcase", "view projects", "project gallery"],
    answer: "Browse our complete project gallery featuring websites, mobile apps, e-commerce solutions, and digital products. Each project showcases our technical expertise, creative design, and commitment to delivering exceptional results.",
    links: [{ text: "View All Projects", url: "/allprojects" }],
    priority: 8
  },

  // Blog & Career
  {
    keywords: ["blog", "articles", "read", "content", "posts", "news"],
    answer: "Visit our blog for insights on web development, design trends, technology updates, and digital strategy. We share valuable knowledge, tips, and perspectives from our team's experience building digital products.",
    links: [{ text: "Read Our Blog", url: "/blog" }],
    priority: 7
  },
  {
    keywords: ["career", "jobs", "hiring", "work with you", "join team", "employment", "opportunities"],
    answer: "Interested in joining Verapixels? We're always looking for talented developers, designers, and creative professionals who are passionate about building exceptional digital experiences. Check our careers page for current opportunities.",
    links: [{ text: "View Career Opportunities", url: "/career" }],
    priority: 8
  },

  // Pricing & Contact
  {
    keywords: ["pricing", "cost", "how much", "price", "rates", "budget", "fees"],
    answer: "Our pricing is project-based and tailored to your specific needs. We require full payment upfront to ensure dedicated resources and premium quality. This allows us to focus entirely on delivering exceptional results. Contact us for a detailed, customized quote with transparent pricing.",
    links: [{ text: "Get a Quote", url: "/contact" }],
    priority: 9
  },
  {
    keywords: ["contact", "get in touch", "reach out", "email", "phone", "talk", "speak"],
    answer: "Ready to start your project? Get in touch with our team! We respond within 24 hours and offer free consultations. Whether you need a quote, have questions, or want to discuss your vision, we're here to help.",
    links: [{ text: "Contact Us", url: "/contact" }],
    priority: 10
  },
  {
    keywords: ["quote", "get quote", "request quote", "estimate", "quotation", "proposal"],
    answer: "Request a free, detailed quote for your project! Share your requirements, goals, and timeline, and we'll provide a comprehensive proposal with transparent pricing, clear deliverables, and project milestones.",
    links: [{ text: "Request a Quote", url: "/contact" }],
    priority: 9
  },

  // Technical & Process
  {
    keywords: ["timeline", "how long", "duration", "delivery", "timeframe", "when"],
    answer: "Project timelines vary by complexity. Simple websites typically take 2-4 weeks, while complex applications may take 6-8 weeks or longer. During discovery, we'll provide a detailed timeline with milestones and delivery dates. We pride ourselves on delivering on time while maintaining quality.",
    links: [{ text: "Discuss Timeline", url: "/contact" }],
    priority: 7
  },
  {
    keywords: ["technology", "tech stack", "technologies", "frameworks", "tools", "what you use"],
    answer: "We use cutting-edge technologies: React and TypeScript for frontend, Node.js for backend, modern CSS frameworks, and platforms like Vercel and Netlify. We choose the right tech for each project, prioritizing performance, maintainability, and scalability.",
    links: [{ text: "Learn More", url: "/webdevelopment" }],
    priority: 6
  },
  {
    keywords: ["responsive", "mobile friendly", "mobile responsive", "works on mobile"],
    answer: "Every website and app we build is fully responsive and mobile-friendly. We follow a mobile-first approach, ensuring your digital product looks stunning and functions flawlessly on all devices - smartphones, tablets, and desktops.",
    links: [{ text: "See Our Work", url: "/allprojects" }],
    priority: 7
  },
  {
    keywords: ["seo", "search engine", "google", "ranking", "optimization"],
    answer: "SEO is built into every project. We implement semantic HTML, optimized meta tags, fast load speeds, mobile optimization, XML sitemaps, and schema markup. Our goal is to ensure your website ranks well and drives organic traffic.",
    links: [{ text: "Digital Marketing", url: "/contact" }],
    priority: 7
  },

  // Getting Started
  {
    keywords: ["start", "begin", "getting started", "how to start", "first step"],
    answer: "Starting is easy! Reach out through our contact form, and we'll schedule a discovery call to understand your needs. Then we'll provide a detailed proposal. Once approved and payment is made, we kick off with research, design, development, testing, and launch.",
    links: [{ text: "Start Your Project", url: "/contact" }],
    priority: 9
  },

  // Greetings & Help
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    answer: "Hello! 👋 Welcome to Verapixels! I'm Vee, your intelligent assistant. I can help you explore our services, view our portfolio, learn about our team, get pricing info, or connect you with our team. What would you like to know?",
    priority: 10
  },
  {
    keywords: ["help", "assist", "support", "what can you do"],
    answer: "I can help you with:\n\n• Exploring our services (Web, Mobile, UI/UX, Graphics)\n• Viewing our portfolio and case studies\n• Learning about our team and process\n• Getting pricing information\n• Requesting quotes\n• Navigating to any page\n\nWhat interests you most?",
    priority: 9
  },
  {
    keywords: ["thanks", "thank you", "appreciate"],
    answer: "You're very welcome! Happy to help. If you have more questions or want to start a project, feel free to ask or visit our contact page. We're excited to bring your vision to life! 🚀",
    links: [{ text: "Contact Us", url: "/contact" }],
    priority: 5
  },
];

/* --------------------------- Component --------------------------- */
const VeeAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [theme, setTheme] = useState<"dark" | "light">(() => 
    (typeof window !== "undefined" && localStorage.getItem("vee-theme")) === "light" ? "light" : "dark"
  );
  const [buttonPos, setButtonPos] = useState({ x: 24, y: 24 });
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
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("vee-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcome: Message = {
        id: Date.now(),
        sender: "vee",
        text: "Hi there! 👋 I'm Vee, your Verapixels intelligent assistant.\n\nI can help you:\n• Explore our services\n• View our portfolio\n• Learn about our team\n• Get pricing & quotes\n• Navigate anywhere on the site\n\nPick a quick option below or ask me anything!",
        timestamp: new Date(),
      };
      setMessages([welcome]);
      setUnreadCount(1);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Keep button within viewport
        const maxX = window.innerWidth - 64 - 24;
        const maxY = window.innerHeight - 64 - 24;
        
        setButtonPos({
          x: Math.max(24, Math.min(newX, maxX)),
          y: Math.max(24, Math.min(newY, maxY))
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
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 80);
  };

  const pushVeeMessage = (text: string, links?: Array<{ text: string; url: string }>) => {
    const msg: Message = { 
      id: Date.now() + Math.floor(Math.random() * 1000), 
      sender: "vee", 
      text, 
      timestamp: new Date(), 
      links 
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  const findKBAnswer = (input: string) => {
    if (!input) return null;
    const lower = input.toLowerCase().trim();

    // Priority-based exact matching
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

    // Fuzzy token matching
    const tokens = lower.split(/\W+/).filter(Boolean);
    for (const entry of KNOWLEDGE_BASE) {
      let tokenScore = 0;
      for (const kw of entry.keywords) {
        const kwTokens = kw.toLowerCase().split(/\W+/).filter(Boolean);
        for (const t of kwTokens) {
          if (tokens.includes(t)) tokenScore += (entry.priority || 5);
        }
      }
      if (tokenScore > 0) {
        const existing = matches.find(m => m.entry === entry);
        if (existing) {
          existing.score += tokenScore;
        } else {
          matches.push({ entry, score: tokenScore });
        }
      }
    }

    // Sort by score and return best match
    matches.sort((a, b) => b.score - a.score);
    
    if (matches.length > 0 && matches[0].score >= 5) {
      return { text: matches[0].entry.answer, links: matches[0].entry.links };
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

    setTimeout(() => {
      let resp;
      if (id === "services") {
        resp = { 
          text: "We offer comprehensive digital services to bring your vision to life:\n\n🌐 Web Development - Custom websites & web applications\n📱 Mobile Apps - iOS & Android development\n🎨 UI/UX Design - Beautiful, user-centered interfaces\n✨ Graphic Design - Branding & visual identity\n\nWhich service interests you most?", 
          links: [
            { text: "Web Development", url: "/webdevelopment" },
            { text: "Mobile Apps", url: "/mobileappdevelopment" },
            { text: "UI/UX Design", url: "/uiuxdesign" },
            { text: "Graphic Design", url: "/graphicsdesign" }
          ]
        };
      } else if (id === "portfolio") {
        resp = { 
          text: "Explore our portfolio of successful projects! We've created websites, mobile apps, e-commerce platforms, and complete digital solutions across various industries. Each project showcases our commitment to quality and innovation.", 
          links: [
            { text: "All Projects", url: "/allprojects" },
            { text: "Case Studies", url: "/casestudies" }
          ]
        };
      } else if (id === "about") {
        resp = { 
          text: "Verapixels is a technology and creative agency led by founder Ocholi Divine. We combine world-class design with engineering excellence to deliver exceptional digital experiences. Learn more about our story, team, and how we work.", 
          links: [
            { text: "About Verapixels", url: "/aboutverapixels" },
            { text: "Meet Our Team", url: "/ourcoreteam" },
            { text: "How We Work", url: "/howweworkandfunction" }
          ]
        };
      } else if (id === "contact") {
        resp = { 
          text: "Ready to start your project? Let's connect! We respond within 24 hours and offer free consultations. Share your vision with us and we'll provide a detailed quote tailored to your needs.", 
          links: [{ text: "Contact Us", url: "/contact" }]
        };
      } else {
        resp = { text: "Here's the information you requested." };
      }

      pushVeeMessage(resp.text, resp.links);
      setIsTyping(false);
      if (!isOpen) setUnreadCount((n) => n + 1);
    }, 900);
  };

  const handleSend = () => {
    const raw = inputValue.trim();
    if (!raw || isTyping) return;

    const userMsg: Message = { 
      id: Date.now(), 
      sender: "user", 
      text: raw, 
      timestamp: new Date() 
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const match = findKBAnswer(raw);
      if (match) {
        pushVeeMessage(match.text, match.links);
      } else {
        pushVeeMessage(
          "I couldn't find a specific answer to that, but I'm here to help! Try asking about:\n\n• Our services (web, mobile, design)\n• Portfolio and case studies\n• Our team and process\n• Pricing and quotes\n• Specific pages you'd like to visit\n\nOr contact our team directly for personalized assistance!",
          [{ text: "Contact Our Team", url: "/contact" }]
        );
      }

      setIsTyping(false);
      if (!isOpen) setUnreadCount((n) => n + 1);
    }, 800 + Math.floor(Math.random() * 500));
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
    setDragStart({
      x: e.clientX - buttonPos.x,
      y: e.clientY - buttonPos.y
    });
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // Only open chat if not dragging
    if (!isDragging) {
      setIsOpen(true);
    }
  };

  return (
    <div className="vee-chat-root" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes vee-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      {/* Chat button */}
      {!isOpen && (
        <button
          className="vee-chat-button"
          onClick={handleButtonClick}
          onMouseDown={handleMouseDown}
          aria-label="Open Vee Chat"
          title="Chat with Vee - Your AI Assistant (Drag to move)"
          style={{
            position: "fixed",
            right: buttonPos.x,
            bottom: buttonPos.y,
            width: 64,
            height: 64,
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg,#0063f4,#00bfff)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0,99,244,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "grab",
            zIndex: 9999,
            transition: isDragging ? "none" : "transform 0.2s, box-shadow 0.2s",
            userSelect: "none"
          }}
          onMouseEnter={(e) => {
            if (!isDragging) {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,99,244,0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isDragging) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,99,244,0.4)";
            }
          }}
        >
          <IconChat size={24} />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute",
              right: -4,
              top: -4,
              background: "#ff3b30",
              color: "#fff",
              width: 24,
              height: 24,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              border: "2px solid white",
            }}>{unreadCount}</span>
          )}
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="vee-chat-window"
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            top: 80,
            width: 420,
            maxWidth: "calc(100vw - 48px)",
            height: "auto",
            maxHeight: "calc(100vh - 104px)",
            display: "flex",
            flexDirection: "column",
            background: theme === "dark" ? "rgba(8,10,18,0.98)" : "#fff",
            color: theme === "dark" ? "#e6eef9" : "#0b1220",
            borderRadius: 20,
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            zIndex: 10000,
            overflow: "hidden",
            border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            background: theme === "dark" ? "linear-gradient(90deg,#0063f4,#00bfff)" : "linear-gradient(90deg,#0b6bff,#00bfff)",
            color: "#fff"
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: "rgba(255,255,255,0.95)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#0063f4", 
                fontWeight: 800, 
                fontSize: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}>V</div>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}>
                  Vee <IconSparkle size={14} />
                </div>
                <div style={{ fontSize: 12, opacity: 0.95 }}>Your Verapixels AI Assistant</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 8,
                  transition: "background 0.2s",
                }}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  width: 36, 
                  height: 36, 
                  borderRadius: 8, 
                  border: "none", 
                  background: "rgba(255,255,255,0.15)", 
                  color: "#fff", 
                  cursor: "pointer",
                  fontSize: 18,
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div
              ref={chatContainerRef}
              className="vee-chat-messages"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 18,
                gap: 14,
                display: "flex",
                flexDirection: "column",
                background: theme === "dark" ? "linear-gradient(180deg, rgba(0,0,0,0.08), transparent)" : "#fafbfc"
              }}
            >
              {/* Quick options when first opening */}
              {messages.length <= 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.08)" : "#f0f4ff";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <span>{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Render messages */}
              {messages.map((m) => (
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
                      background: theme === "dark" ? "linear-gradient(135deg,#0063f4,#00bfff)" : "#0b6bff",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 16,
                      flexShrink: 0
                    }}>V</div>
                  )}

                  <div style={{
                    maxWidth: "75%",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  }}>
                    <div style={{
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: m.sender === "user" 
                        ? (theme === "dark" ? "rgba(0,99,244,0.15)" : "#e8f1ff") 
                        : (theme === "dark" ? "rgba(255,255,255,0.08)" : "#fff"),
                      color: theme === "dark" ? "#e6eef9" : "#0b1220",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}>
                      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5, fontSize: 14 }}>{m.text}</div>
                    </div>

                    {m.links && m.links.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {m.links.map((link, idx) => (
                          <Link 
                            key={idx} 
                            to={link.url}
                            onClick={() => {
                              setIsOpen(false);
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "8px 12px",
                              borderRadius: 10,
                              background: theme === "dark" ? "rgba(0,99,244,0.12)" : "#e8f1ff",
                              border: theme === "dark" ? "1px solid rgba(0,99,244,0.3)" : "1px solid rgba(0,99,244,0.2)",
                              textDecoration: "none",
                              color: theme === "dark" ? "#5eb3ff" : "#0063f4",
                              fontSize: 13,
                              fontWeight: 600,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = theme === "dark" ? "rgba(0,99,244,0.2)" : "#d4e7ff";
                              e.currentTarget.style.transform = "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = theme === "dark" ? "rgba(0,99,244,0.12)" : "#e8f1ff";
                              e.currentTarget.style.transform = "translateX(0)";
                            }}
                          >
                            {link.text}
                            <span style={{ fontSize: 16 }}>→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {m.sender === "user" && (
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: theme === "dark" ? "rgba(255,255,255,0.1)" : "#e0e7ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#fff" : "#0b1220",
                      fontWeight: 700,
                      fontSize: 16,
                      flexShrink: 0
                    }}>U</div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, 
                    height: 40, 
                    borderRadius: 10, 
                    background: "linear-gradient(135deg,#0063f4,#00bfff)", 
                    color: "#fff", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontWeight: 700,
                    fontSize: 16
                  }}>V</div>
                  <div style={{ 
                    padding: "12px 16px", 
                    borderRadius: 14, 
                    background: theme === "dark" ? "rgba(255,255,255,0.06)" : "#f5f7fa",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"
                  }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <div 
                          key={i}
                          style={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: 8, 
                            background: theme === "dark" ? "#5eb3ff" : "#0063f4", 
                            animation: `vee-typing 1.4s ${delay}s infinite` 
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={{ 
              padding: 14, 
              borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", 
              display: "flex", 
              gap: 8, 
              alignItems: "center",
              background: theme === "dark" ? "rgba(0,0,0,0.2)" : "#fff"
            }}>
              <input
                type="text"
                placeholder="Ask me anything about Verapixels..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                  outline: "none",
                  background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                  color: theme === "dark" ? "#fff" : "#0b1220",
                  fontSize: 14,
                  transition: "border 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = theme === "dark" ? "1px solid rgba(0,99,244,0.5)" : "1px solid rgba(0,99,244,0.4)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)";
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  background: inputValue.trim() && !isTyping 
                    ? "linear-gradient(135deg,#0063f4,#00bfff)" 
                    : theme === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                  opacity: inputValue.trim() && !isTyping ? 1 : 0.5,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <IconSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeeAIChatbot;