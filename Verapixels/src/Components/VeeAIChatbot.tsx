import React, { useEffect, useRef, useState } from "react";

/**
 * VeeAIChatbot.tsx
 * Verapixels intelligent assistant component (TypeScript + React)
 *
 * - Enhanced knowledge-base with detailed answers
 * - Smart routing to actual website pages
 * - Light/dark toggle persisted to localStorage
 * - Inline SVG icons (no external icon libs)
 */

/* --------------------------- Types --------------------------- */
type Sender = "vee" | "user";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  timestamp: Date;
  link?: { text: string; url: string } | null;
}

interface KBEntry {
  keywords: string[];
  answer: string;
  link?: { text: string; url: string } | null;
}

/* --------------------------- Inline Icons --------------------------- */
const IconChat = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconServices = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M6 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M12 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M18 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconPortfolio = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconContact = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAbout = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M12 11v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconQuote = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 11a4 4 0 0 1-4 4v4h6v-4H7v-4zM17 11a4 4 0 0 1-4 4v4h6v-4h-2v-4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
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

/* --------------------------- Enhanced Knowledge Base --------------------------- */
const KNOWLEDGE_BASE: KBEntry[] = [
  // About Verapixels - Enhanced with detailed answers
  {
    keywords: ["who is ocholi divine", "tell me about ocholi divine", "founder", "ocholi", "divine ocholi", "ceo"],
    answer: "Ocholi Divine is the visionary founder and CEO of Verapixels. He's a frontend developer and digital innovator with a passion for blending cutting-edge design, modern technology, and exceptional user experience. Under his leadership, Verapixels has become a forward-thinking technology and creative agency dedicated to solving real business challenges through beautiful, functional digital products. His expertise spans web development, UI/UX design, and digital strategy.",
    link: { text: "Meet Our Core Team", url: "/ourcoreteam" }
  },
  {
    keywords: ["what is verapixels", "about verapixels", "tell me about verapixels", "who are you", "company info", "your company"],
    answer: "Verapixels is a technology and creative agency specializing in building exceptional websites, digital products, and comprehensive brand systems. We combine world-class design with engineering excellence to deliver production-ready experiences that drive business results. Our approach is rooted in truth and clarity (Vera = truth, Pixels = digital elements), ensuring every project we create is honest, clear, and delivers genuine value to our clients and their users.",
    link: { text: "Discover More About Verapixels", url: "/aboutverapixels" }
  },
  {
    keywords: ["team", "who works at verapixels", "meet the team", "core team", "staff", "employees"],
    answer: "Our core team consists of talented frontend developers, UI/UX designers, brand strategists, and digital specialists. We're a distributed team that scales based on project needs, ensuring you always get the right expertise for your specific requirements. Every team member is carefully selected for their skills, creativity, and commitment to excellence. We believe in craftsmanship, collaboration, and delivering work we're proud of.",
    link: { text: "Meet Our Core Team", url: "/ourcoreteam" }
  },
  {
    keywords: ["how you work", "work process", "workflow", "how we work", "function", "methodology", "approach"],
    answer: "Our work process is designed for transparency, efficiency, and exceptional results. We follow a proven methodology: Discovery (understanding your needs), Strategy (planning the approach), Design (creating beautiful interfaces), Development (building with modern tech), Testing (ensuring quality), and Launch (delivering excellence). We maintain clear communication throughout, provide regular updates, and work collaboratively with clients at every stage. Our agile-friendly approach means you're involved in the journey from start to finish.",
    link: { text: "Learn How We Work and Function", url: "/howweworkandfunction" }
  },
  {
    keywords: ["testimonials", "reviews", "client feedback", "what clients say", "success stories", "client reviews"],
    answer: "Our clients consistently praise our attention to detail, technical expertise, and ability to deliver on time. We've helped startups scale, SMEs modernize their digital presence, and established brands refresh their identity. Our testimonials showcase real results: increased conversions, improved user engagement, and digital products that truly serve business goals. We measure success through client satisfaction and tangible business outcomes.",
    link: { text: "Read Client Testimonials", url: "/clienttestimonials" }
  },

  // Services - Detailed with proper routing
  {
    keywords: ["services", "what do you offer", "what services", "offerings", "what you do", "your services"],
    answer: "Verapixels offers a comprehensive suite of digital services: Web Development (custom websites and web applications), Mobile App Development (iOS and Android), UI/UX Design (user-centered interfaces), Cybersecurity (protecting your digital assets), and Digital Marketing (growing your online presence). We provide end-to-end solutions from concept to launch, ensuring every project is built with modern technology, beautiful design, and measurable results.",
    link: { text: "Explore All Our Services", url: "/webdevelopment" }
  },
  {
    keywords: ["web development", "website development", "build website", "web dev", "website", "create website", "develop website"],
    answer: "Our web development service creates fast, secure, and scalable websites using modern technologies like React, TypeScript, and Node.js. We build responsive websites that work perfectly on all devices, implement SEO best practices, ensure accessibility standards, and optimize for performance. Whether you need a corporate website, landing page, or complex web application, we deliver production-ready solutions that drive business growth and provide exceptional user experiences.",
    link: { text: "Learn About Web Development", url: "/webdevelopment" }
  },
  {
    keywords: ["mobile app", "mobile development", "ios", "android", "app development", "mobile application"],
    answer: "We develop native and cross-platform mobile applications for iOS and Android that combine stunning design with powerful functionality. Our mobile apps are built with performance, security, and user experience at the forefront. We handle the entire process: strategy, design, development, testing, and App Store/Play Store deployment. From startups to enterprises, we create mobile solutions that engage users and achieve your business objectives.",
    link: { text: "Explore Mobile App Development", url: "/mobileappdevelopment" }
  },
  {
    keywords: ["ui ux", "ui/ux", "user experience", "user interface", "design", "ux design", "ui design"],
    answer: "Our UI/UX design service focuses on creating intuitive, beautiful interfaces that users love. We conduct thorough user research, create wireframes and prototypes, perform usability testing, and deliver pixel-perfect designs in Figma. Our approach combines aesthetic excellence with data-driven decisions, ensuring your digital products are not just beautiful but highly functional and conversion-optimized. We design for accessibility, ensuring everyone can use your product effectively.",
    link: { text: "Discover UI/UX Design Services", url: "/uiuxdesign" }
  },
  {
    keywords: ["cybersecurity", "security", "cyber security", "protection", "secure", "data security"],
    answer: "Our cybersecurity service protects your digital assets from threats and vulnerabilities. We provide security audits, penetration testing, vulnerability assessments, secure coding practices, and ongoing security monitoring. We implement industry-standard security measures including HTTPS, data encryption, secure authentication, and compliance with data protection regulations. Your business and customer data security is our priority, and we stay updated with the latest security best practices.",
    link: { text: "Learn About Cybersecurity", url: "/cybersecurity" }
  },
  {
    keywords: ["digital marketing", "marketing", "seo", "online marketing", "grow business", "marketing services"],
    answer: "Our digital marketing service helps you reach and engage your target audience effectively. We offer SEO optimization, content strategy, social media marketing, email campaigns, analytics setup, and conversion rate optimization. We create data-driven marketing strategies that increase visibility, drive qualified traffic, and convert visitors into customers. Our approach combines creative content with technical optimization for maximum ROI on your marketing investment.",
    link: { text: "Explore Digital Marketing", url: "/digitalmarketing" }
  },

  // Portfolio - Detailed with proper routing
  {
    keywords: ["portfolio", "work", "projects", "show me work", "examples", "your work", "past work"],
    answer: "Our portfolio showcases the diverse range of projects we've delivered for clients across industries. From sleek corporate websites to complex web applications, e-commerce platforms, and mobile apps, each project demonstrates our commitment to quality, innovation, and results. We've worked with startups, SMEs, NGOs, and established brands, helping them achieve their digital goals through exceptional design and development.",
    link: { text: "View Our Complete Portfolio", url: "/clientportfolio" }
  },
  {
    keywords: ["client portfolio", "clients", "who you worked with", "client work"],
    answer: "Our client portfolio features successful projects delivered for businesses across various industries. We've partnered with innovative startups, growing SMEs, non-profit organizations, and personal brands to create digital solutions that drive real business results. Each client relationship is built on trust, transparency, and our commitment to exceeding expectations. We adapt our approach to meet each client's unique needs and goals.",
    link: { text: "See Our Client Portfolio", url: "/clientportfolio" }
  },
  {
    keywords: ["all projects", "project showcase", "your projects", "view projects"],
    answer: "Browse through all our completed projects to see the breadth and depth of our capabilities. Our project gallery includes websites, mobile apps, e-commerce solutions, brand systems, and digital products across multiple industries. Each project tells a story of collaboration, problem-solving, and delivering solutions that exceed client expectations and delight end users.",
    link: { text: "Browse All Projects", url: "/allprojects" }
  },
  {
    keywords: ["web applications", "web apps", "saas", "web application", "web app portfolio"],
    answer: "We specialize in building powerful web applications that solve complex business problems. Our web apps are built with modern frameworks like React and Node.js, featuring intuitive interfaces, robust backends, secure authentication, and scalable architecture. Whether you need a SaaS platform, internal dashboard, or custom business tool, we deliver web applications that are fast, reliable, and user-friendly.",
    link: { text: "Explore Web Applications", url: "/webapplications" }
  },
  {
    keywords: ["mobile apps", "mobile applications", "app portfolio", "mobile app portfolio"],
    answer: "Our mobile app portfolio demonstrates our expertise in creating engaging iOS and Android applications. We've built apps for various purposes: productivity tools, social platforms, e-commerce, entertainment, and business solutions. Each app is designed with careful attention to mobile UX best practices, performance optimization, and platform-specific guidelines to ensure a native feel and smooth user experience.",
    link: { text: "View Mobile Apps Portfolio", url: "/mobileapps" }
  },
  {
    keywords: ["ecommerce", "online store", "e-commerce", "shop", "ecommerce solutions", "online shop"],
    answer: "Our e-commerce solutions help businesses sell online effectively. We build secure, conversion-optimized online stores with integrated payment gateways, inventory management, order tracking, and customer accounts. Our e-commerce platforms are designed to provide seamless shopping experiences that drive sales, with mobile-responsive designs, fast checkout processes, and powerful admin panels for easy management.",
    link: { text: "See E-commerce Solutions", url: "/ecommercesolutions" }
  },
  {
    keywords: ["case studies", "case study", "success stories", "results", "client results"],
    answer: "Our case studies provide in-depth looks at how we've solved real business challenges for our clients. Each case study details the client's objectives, our strategic approach, the solution we implemented, and the measurable results achieved. From increased conversion rates to improved user engagement and business growth, our case studies demonstrate the tangible value we deliver through thoughtful design and technical excellence.",
    link: { text: "Read Our Case Studies", url: "/casestudies" }
  },

  // Pricing & Business
  {
    keywords: ["pricing", "cost", "how much", "price", "rates", "budget", "how much do you charge"],
    answer: "Our pricing is project-based and depends on scope, complexity, and timeline. We offer transparent, competitive rates with no hidden fees. We require full payment upfront to ensure we can dedicate our complete focus and resources to delivering premium quality work. This payment structure allows us to maintain our high standards and commit fully to your project's success. Contact us for a detailed, customized quote tailored to your specific needs.",
    link: { text: "Get a Custom Quote", url: "/contact" }
  },
  {
    keywords: ["payment", "payment policy", "pay", "upfront payment", "payment method"],
    answer: "We require full payment upfront for all projects. This payment policy ensures we can allocate dedicated resources, maintain our premium service quality, and focus entirely on delivering exceptional results without financial constraints. Our upfront payment structure reflects our commitment to your project from day one and allows us to work without compromise. We accept bank transfers, credit cards, and digital payments for your convenience.",
    link: { text: "Contact Us About Payment", url: "/contact" }
  },
  {
    keywords: ["timeline", "how long", "duration", "delivery time", "project timeline", "timeframe"],
    answer: "Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while more complex projects like web applications or comprehensive e-commerce solutions may take 6-8 weeks or longer. During our discovery phase, we'll provide you with a detailed timeline that includes milestones, review points, and final delivery date. We pride ourselves on delivering on time while maintaining our quality standards.",
    link: { text: "Discuss Your Project Timeline", url: "/contact" }
  },
  {
    keywords: ["quote", "get quote", "request quote", "free quote", "estimate", "quotation"],
    answer: "Request a free, no-obligation quote for your project! Simply provide us with details about your requirements, goals, and timeline through our contact form. We'll review your needs, ask any clarifying questions, and provide you with a comprehensive proposal that includes scope, timeline, deliverables, and investment required. Our quotes are detailed and transparent, so you know exactly what to expect.",
    link: { text: "Request Your Free Quote", url: "/contact" }
  },
  {
    keywords: ["contact", "reach out", "get in touch", "email", "phone", "talk to agent", "contact you"],
    answer: "We'd love to hear from you! You can contact us through our dedicated contact page, email us at info@verapixel.com, or use this chat assistant. We typically respond within 24 hours during business days. Whether you have a project inquiry, need a quote, or just want to discuss your ideas, our team is ready to help. You can also request to talk to an agent directly for immediate assistance.",
    link: { text: "Contact Us Now", url: "/contact" }
  },

  // Technical Details & Capabilities
  {
    keywords: ["technology", "tech stack", "technologies", "what you use", "frameworks", "tech"],
    answer: "We use cutting-edge technologies to build modern, performant digital products. Our stack includes React and TypeScript for frontend development, Node.js for backend services, modern CSS frameworks, and deployment platforms like Vercel and Netlify. We choose the right technology for each project, prioritizing performance, maintainability, and scalability. Our team stays current with industry best practices and emerging technologies to deliver future-proof solutions.",
    link: { text: "Learn More About Our Services", url: "/webdevelopment" }
  },
  {
    keywords: ["responsive", "mobile friendly", "mobile responsive", "works on mobile", "mobile optimization"],
    answer: "Every website and application we build is fully responsive and mobile-friendly. We follow a mobile-first design approach, ensuring your digital product looks stunning and functions flawlessly on all devices - from smartphones and tablets to desktop computers and large displays. We test across multiple screen sizes, browsers, and devices to guarantee a consistent, optimized experience for every user, regardless of how they access your site.",
    link: { text: "See Our Responsive Designs", url: "/clientportfolio" }
  },
  {
    keywords: ["seo", "search engine", "google", "search optimization", "ranking", "seo optimization"],
    answer: "SEO is built into every project we create. We implement comprehensive on-page SEO including semantic HTML markup, optimized meta tags, proper heading structure, fast page load speeds, mobile optimization, XML sitemaps, and schema markup. We also provide guidance on content strategy and technical SEO best practices. Our goal is to ensure your website is discoverable by search engines and ranks well for relevant keywords, driving organic traffic to your business.",
    link: { text: "Learn About Our SEO Approach", url: "/digitalmarketing" }
  },
  {
    keywords: ["cms", "content management", "update content", "edit website", "content system"],
    answer: "We integrate powerful content management systems that make updating your website easy, even without technical knowledge. We work with modern headless CMS solutions like Sanity and Strapi, as well as WordPress when preferred. Our CMS implementations feature intuitive admin panels, drag-and-drop editors, media management, and preview functionality, allowing you to manage your content confidently and efficiently.",
    link: { text: "Discover Our Technical Capabilities", url: "/webdevelopment" }
  },
  {
    keywords: ["maintenance", "support", "updates", "ongoing support", "website maintenance"],
    answer: "We offer comprehensive maintenance and support plans to keep your digital products running smoothly. Our maintenance services include regular security updates, performance monitoring, bug fixes, content updates, backups, uptime monitoring, and technical support. We provide different service levels with defined SLAs to match your needs, ensuring your website or application remains secure, fast, and up-to-date long after launch.",
    link: { text: "Contact Us About Maintenance", url: "/contact" }
  },
  {
    keywords: ["accessibility", "a11y", "wcag", "accessible", "disabilities"],
    answer: "Accessibility is a core priority in everything we build. We follow WCAG guidelines to ensure your digital products are usable by everyone, including people with disabilities. Our accessibility practices include semantic HTML, proper ARIA labels, keyboard navigation, screen reader optimization, sufficient color contrast, and alternative text for images. We believe in creating inclusive digital experiences that don't exclude anyone.",
    link: { text: "Learn About Our Quality Standards", url: "/howweworkandfunction" }
  },
  {
    keywords: ["performance", "speed", "fast", "loading time", "page speed"],
    answer: "Performance is critical to user experience and business success. We optimize every project for maximum speed through techniques like code splitting, lazy loading, image optimization, CDN integration, and efficient caching strategies. We measure performance using Lighthouse and Core Web Vitals, ensuring your site loads quickly even on slower connections. Fast websites improve user satisfaction, conversion rates, and search engine rankings.",
    link: { text: "See Our Performance Standards", url: "/webdevelopment" }
  },

  // Process & General Questions
  {
    keywords: ["start", "how to start", "begin", "getting started", "onboarding", "how do i start"],
    answer: "Starting a project with Verapixels is simple and straightforward. First, reach out through our contact form or this chat. We'll schedule a discovery call to understand your needs, goals, and vision. Then we'll provide a detailed proposal with scope, timeline, and investment. Once you approve and make payment, we kick off with research and planning, followed by design, development, testing, and launch. Throughout the process, we maintain clear communication and keep you involved at every milestone.",
    link: { text: "Start Your Project Now", url: "/contact" }
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    answer: "Hello! Welcome to Verapixels! I'm Vee, your virtual assistant. I'm here to answer questions about our services, portfolio, team, processes, and anything else you'd like to know. Feel free to ask me anything, or use the quick action buttons to navigate to specific pages. How can I help you today?",
    link: null
  },
  {
    keywords: ["thanks", "thank you", "appreciate", "thanks a lot"],
    answer: "You're very welcome! I'm glad I could help. If you have any more questions about Verapixels or would like to discuss a project, feel free to ask or visit our contact page. We're here to help bring your digital vision to life!",
    link: { text: "Contact Us", url: "/contact" }
  },
  {
    keywords: ["help", "assist", "support", "need help"],
    answer: "I'm here to help! You can ask me about Verapixels' services, view our portfolio, learn about our team and process, get pricing information, or request a quote. I can also direct you to specific pages or connect you with a human agent. What would you like to know more about?",
    link: null
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const quickOptions = [
    { id: "about", label: "About Verapixels", icon: <IconAbout />, link: "/aboutverapixels" },
    { id: "services", label: "Our Services", icon: <IconServices />, link: "/webdevelopment" },
    { id: "portfolio", label: "View Portfolio", icon: <IconPortfolio />, link: "/clientportfolio" },
    { id: "contact", label: "Contact Us", icon: <IconContact />, link: "/contact" },
    { id: "quote", label: "Get a Quote", icon: <IconQuote />, link: "/contact" },
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
        text: "Hi — I'm Vee, your Verapixels assistant! 👋 I can answer questions about our services, portfolio, team, pricing, and process. Pick a quick option below or ask me anything about Verapixels!",
        timestamp: new Date(),
        link: null,
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 80);
  };

  const pushVeeMessage = (text: string, link?: { text: string; url: string } | null) => {
    const msg: Message = { 
      id: Date.now() + Math.floor(Math.random() * 1000), 
      sender: "vee", 
      text, 
      timestamp: new Date(), 
      link: link ?? null 
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  const findKBAnswer = (input: string) => {
    if (!input) return null;
    const lower = input.toLowerCase().trim();

    // Exact keyword matching
    for (const entry of KNOWLEDGE_BASE) {
      for (const kw of entry.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          return { text: entry.answer, link: entry.link ?? null };
        }
      }
    }

    // Fuzzy token matching
    const tokens = lower.split(/\W+/).filter(Boolean);
    let best: { entry: KBEntry; score: number } | null = null;

    for (const entry of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of entry.keywords) {
        const kwTokens = kw.toLowerCase().split(/\W+/).filter(Boolean);
        for (const t of kwTokens) {
          if (tokens.includes(t)) score += 1;
        }
      }
      if (score > 0 && (!best || score > best.score)) {
        best = { entry, score };
      }
    }

    if (best && best.score >= 2) {
      return { text: best.entry.answer, link: best.entry.link ?? null };
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
      if (id === "about") {
        resp = { 
          text: "Verapixels is a technology and creative agency that combines world-class design with engineering excellence. We build websites, digital products, and brand systems that drive real business results. Learn more about our story, mission, and what makes us different.", 
          link: { text: "About Verapixels", url: "/aboutverapixels" } 
        };
      } else if (id === "services") {
        resp = { 
          text: "We offer comprehensive digital services including Web Development, Mobile App Development, UI/UX Design, Cybersecurity, and Digital Marketing. Each service is delivered with attention to detail, modern technology, and a focus on measurable results.", 
          link: { text: "Explore Our Services", url: "/webdevelopment" } 
        };
      } else if (id === "portfolio") {
        resp = { 
          text: "Explore our portfolio of successful projects across industries. From beautiful websites to powerful web applications, mobile apps, and e-commerce solutions - see how we've helped clients achieve their digital goals.", 
          link: { text: "View Portfolio", url: "/clientportfolio" } 
        };
      } else if (id === "contact") {
        resp = { 
          text: "Ready to start your project? Get in touch with our team! We respond within 24 hours and offer free consultations to discuss your needs, goals, and how we can help bring your vision to life.", 
          link: { text: "Contact Us", url: "/contact" } 
        };
      } else if (id === "quote") {
        resp = { 
          text: "Request a free, detailed quote for your project. Tell us about your requirements, timeline, and goals, and we'll provide a comprehensive proposal with transparent pricing and clear deliverables.", 
          link: { text: "Get Your Free Quote", url: "/contact" } 
        };
      } else {
        resp = { text: "Here's the information you requested." };
      }

      pushVeeMessage(resp.text, resp.link ?? null);
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
        pushVeeMessage(match.text, match.link ?? null);
      } else {
        pushVeeMessage(
          "I couldn't find a specific answer to that question, but I can help you explore our main pages where you might find what you're looking for. Try asking about our services, portfolio, team, or process - or contact us directly for personalized assistance!",
          { text: "Contact Our Team", url: "/contact" }
        );
      }

      setIsTyping(false);
      if (!isOpen) setUnreadCount((n) => n + 1);
    }, 900 + Math.floor(Math.random() * 700));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="vee-chat-root" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      {/* Chat button */}
      {!isOpen && (
        <button
          className="vee-chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Vee Chat"
          title="Open Vee — Verapixels Assistant"
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            width: 64,
            height: 64,
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg,#0063f4,#00bfff)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <IconChat />
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
            width: 420,
            maxWidth: "calc(100vw - 48px)",
            height: 620,
            display: "flex",
            flexDirection: "column",
            background: theme === "dark" ? "rgba(8,10,18,0.98)" : "#fff",
            color: theme === "dark" ? "#e6eef9" : "#0b1220",
            borderRadius: 16,
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            zIndex: 10000,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            background: theme === "dark" ? "linear-gradient(90deg,#0063f4,#00bfff)" : "linear-gradient(90deg,#0b6bff,#00bfff)",
            color: "#fff"
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                width: 44, 
                height: 44, 
                borderRadius: 10, 
                background: "#fff", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#0063f4", 
                fontWeight: 800, 
                fontSize: 18
              }}>V</div>
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontWeight: 800 }}>Vee</div>
                <div style={{ fontSize: 12, opacity: 0.95 }}>Your Verapixels Assistant</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                }}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <IconSun /> : <IconMoon />}
                <span style={{ fontSize: 12, fontWeight: 700 }}>{theme === "dark" ? "Light" : "Dark"}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  width: 36, 
                  height: 36, 
                  borderRadius: 10, 
                  border: "none", 
                  background: "rgba(255,255,255,0.15)", 
                  color: "#fff", 
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages + Quick options */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div
              ref={chatContainerRef}
              className="vee-chat-messages"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                gap: 12,
                display: "flex",
                flexDirection: "column",
                background: theme === "dark" ? "linear-gradient(180deg, rgba(0,0,0,0.12), transparent)" : "transparent"
              }}
            >
              {/* Quick options when first opening */}
              {messages.length <= 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>Quick actions</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {quickOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleQuickOptionClick(opt.id, opt.label)}
                        style={{
                          display: "inline-flex",
                          gap: 8,
                          alignItems: "center",
                          padding: "8px 12px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,0.06)",
                          background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f5f7fb",
                          color: theme === "dark" ? "#fff" : "#0b1220",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ width: 18, height: 18 }}>{opt.icon}</span>
                        <span style={{ fontWeight: 700 }}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>
                    Don't see what you're looking for? Type your question below.
                  </div>
                </div>
              )}

              {/* Render messages */}
              {messages.map((m) => (
                <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
                  {m.sender === "vee" && (
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: theme === "dark" ? "linear-gradient(135deg,#0063f4,#00bfff)" : "#0b6bff",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      flexShrink: 0
                    }}>V</div>
                  )}

                  <div style={{
                    maxWidth: "78%",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  }}>
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      background: m.sender === "user" 
                        ? (theme === "dark" ? "rgba(255,255,255,0.06)" : "#eef3ff") 
                        : (theme === "dark" ? "rgba(0,99,244,0.12)" : "#eaf5ff"),
                      color: theme === "dark" ? "#e6eef9" : "#04102a",
                      border: "1px solid rgba(0,0,0,0.04)"
                    }}>
                      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.45, fontSize: 14 }}>{m.text}</div>
                    </div>

                    {m.link && (
                      <a href={`#${m.link.url}`} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 10,
                        background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#fff",
                        border: "1px solid rgba(0,0,0,0.06)",
                        textDecoration: "none",
                        color: theme === "dark" ? "#00d4ff" : "#0077ff",
                        width: "fit-content",
                        fontWeight: 700,
                        fontSize: 13
                      }}>
                        {m.link.text} 
                        <span style={{ transform: "rotate(-90deg)", display: "inline-block" }}>›</span>
                      </a>
                    )}
                  </div>

                  {m.sender === "user" && (
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: theme === "dark" ? "rgba(255,255,255,0.06)" : "#dfeeff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#fff" : "#0b1220",
                      fontWeight: 700,
                      flexShrink: 0
                    }}>U</div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{
                    width: 36, 
                    height: 36, 
                    borderRadius: 10, 
                    background: "linear-gradient(135deg,#0063f4,#00bfff)", 
                    color: "#fff", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontWeight: 700
                  }}>V</div>
                  <div style={{ padding: "8px 12px", borderRadius: 12, background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f5f7fb" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: 6, 
                        background: theme === "dark" ? "#dfefff" : "#0063f4", 
                        animation: "vee-typing 1.4s infinite" 
                      }} />
                      <div style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: 6, 
                        background: theme === "dark" ? "#bcdcff" : "#0077ff", 
                        animation: "vee-typing 1.4s 0.15s infinite" 
                      }} />
                      <div style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: 6, 
                        background: theme === "dark" ? "#93c7ff" : "#0099ff", 
                        animation: "vee-typing 1.4s 0.3s infinite" 
                      }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={{ 
              padding: 12, 
              borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(10,20,40,0.04)", 
              display: "flex", 
              gap: 8, 
              alignItems: "center" 
            }}>
              <input
                type="text"
                placeholder="Ask Vee about Verapixels..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)",
                  outline: "none",
                  background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#fff",
                  color: theme === "dark" ? "#fff" : "#0b1220",
                  fontSize: 14
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  border: "none",
                  background: inputValue.trim() && !isTyping 
                    ? "linear-gradient(135deg,#0063f4,#00bfff)" 
                    : theme === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                  opacity: inputValue.trim() && !isTyping ? 1 : 0.5
                }}
              >
                <IconSend />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add typing animation keyframes */}
      <style>{`
        @keyframes vee-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default VeeAIChatbot;