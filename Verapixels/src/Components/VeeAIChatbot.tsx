// Enhanced VeeAIChatbot.tsx with all fixes and improvements
import React, { useEffect, useRef, useState } from "react";
import { supabase } from './supabase'; // Import from your supabase config file
import io from "socket.io-client";
import emailjs from '@emailjs/browser';

type Sender = "vee" | "user" | "admin";
type ThemeMode = "dark" | "light";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  timestamp: Date;
  links?: Array<{ text: string; url: string; action?: string; data?: any }>;
  intent?: string;
  options?: string[];
  classification?: string;
  sender_type?: 'user' | 'bot' | 'admin';
}

interface SocketMessage {
  id: string;
  _id?: string;
  message_id: string;
  conversation_id: string;
  sender_type: 'user' | 'bot' | 'admin';
  sender_name: string;
  message_text: string;
  timestamp: Date | string;
  read_by_admin: boolean;
  read_by_user: boolean;
  intent_detected: string;
  classification: string;
  message_type: string;
  metadata?: string;
  sender?: 'user' | 'bot' | 'admin';
}

interface BookingState {
  isBooking: boolean;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  dateDisplay?: string;
  time?: string;
  contactMethod?: string;
  step: 'name' | 'email' | 'phone' | 'contact' | 'date' | 'time' | 'confirm' | 'edit' | 'none';
  datePage: number;
}

/* --------------------------- WebSocket Configuration --------------------------- */
const SOCKET_CONFIG = {
  url: import.meta.env.PROD 
    ? window.location.origin
    : 'http://localhost:5001',
  options: {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    forceNew: false,
    autoConnect: true
  }
};

/* --------------------------- Configuration --------------------------- */
const BUSINESS_TIMEZONE = 'Africa/Lagos';
const BUSINESS_HOURS = { 
  start: 9, 
  end: 16, 
  endMinutes: 30,
  workingDays: [1, 2, 3, 4, 5]
};

const CONTACT_METHODS = [
  { id: 'video', label: 'Video Call' },
  { id: 'audio', label: 'Audio Call' },
  { id: 'googlemeet', label: 'Google Meet' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'zoom', label: 'Zoom Call' },
  { id: 'phone', label: 'Phone Call' }
];

interface KBEntry {
  keywords: string[];
  answer: string;
  links?: Array<{ text: string; url: string; action?: string; data?: any }>;
  priority?: number;
  intent?: string;
  category?: string;
}

/* --------------------------- ENHANCED KNOWLEDGE BASE --------------------------- */
const ENHANCED_KNOWLEDGE_BASE: KBEntry[] = [
  // ==================== IMMEDIATE ADMIN TRANSFER KEYWORDS ====================
  {
    keywords: ["agent", "admin", "human", "representative", "person", "real person", "live agent", "customer service", "support agent", "talk to someone", "speak with human", "speak to admin", "connect to agent", "help desk"],
    answer: `IMMEDIATELY CONNECTING YOU TO AN ADMIN

I've detected that you want to speak with a human representative. I'm connecting you to our admin team right now!

What to expect:
• Admin will join this chat within 2 minutes
• You can discuss any issues directly
• Priority support for your request`,
    priority: 100,
    intent: "immediate_admin_transfer",
    category: "admin_request"
  },

  // ==================== COMPANY FOUNDATION & HISTORY ====================
  {
    keywords: ["ocholi divine", "f divine", "founder", "ceo", "owner", "who started", "who created", "who owns", "leadership", "ocholi", "divine ocholi", "who is ocholi", "who is divine"],
    answer: `OCHOLI DIVINE - Founder & CEO of Verapixels

BACKGROUND & VISION:
Ocholi Divine founded Verapixels in 2025 with a revolutionary vision to transform the digital landscape. With an innate passion for technology and an unwavering eye for perfection, he envisioned building a company where innovation meets craftsmanship—where every line of code and every design element serves a meaningful purpose.

THE NAME STORY:
The name "Verapixels" was born from:
1. "Vera" - Meaning "truth" and "authenticity" (Latin origin)
2. "Pixels" - Inspired by a memorable conversation on his first day at tech school
3. Combined = "Verapixels" meaning "Truth through Pixels"

HIS PHILOSOPHY:
"When you give a design element the right padding, the right spacing, the perfect 20px—and it looks absolutely flawless—that's the Verapixels standard."

CURRENT ROLE:
• Tech Visionary - Driving innovation and future strategies
• Problem Solver - Leading complex solution architecture
• Innovation Leader - Setting industry standards

Ocholi Divine continues to lead Verapixels with a hands-on approach, ensuring every project reflects our commitment to excellence and authenticity.`,
    priority: 10,
    intent: "about_founder",
    category: "company_foundation"
  },
  
  {
    keywords: ["verapixels", "company", "about", "what is", "who are you", "tell me about", "background", "agency", "about company"],
    answer: `VERAPIXELS - Technology & Creative Agency

COMPANY DETAILS:
• Founded: 2025
• Type: Technology & Creative Agency
• Location: Lagos, Nigeria (Global Delivery)
• Specialization: Digital Innovation, Web Development, Design Solutions

NAME MEANING:
• Vera = Truth & Authenticity (Latin origin)
• Pixels = Fundamental building blocks of digital design
• Combined = "Authentic Digital Excellence"

WHAT WE DO:
We create digital experiences that don't just work—they inspire. Our commitment is to honest, transparent partnerships and genuine innovation that drives real business results.

MILESTONES:
• 2025: Foundation - Verapixels was born from a vision to transform digital experiences
• 2025: First Client - Delivered first project, setting the standard for excellence
• 2025+: Growing Impact - Expanding reach and building future tech solutions`,
    links: [
      { text: "📖 Read Our Full Story", url: "/aboutverapixels", action: "navigate" },
      { text: "👥 Meet Our Team", url: "/ourcoreteam", action: "navigate" },
      { text: "🔄 Our Process", url: "/howweworkandfunction", action: "navigate" }
    ],
    priority: 10,
    intent: "about_company",
    category: "company_foundation"
  },

  // ==================== PAGE NAVIGATION ====================
  {
    keywords: ["contact page", "contact us page", "contact information", "get in touch page", "where to contact"],
    answer: `Contact Page Information

You're looking for our contact information page!

What's on the Contact Page:
• Full Contact Details (Phone, Email, Address)
• Contact Form for immediate inquiries
• Location Map and directions
• Working Hours and availability
• Emergency contact options
• Quick response guarantee

Quick Actions:
• Submit a project inquiry
• Request a call back
• Schedule immediate consultation
• Report urgent issues`,
    links: [
      { text: "📞 Go to Contact Page", url: "/contact", action: "navigate" },
      { text: "📅 Book Consultation", url: "/consultationbooking", action: "navigate" },
      { text: "📧 Email Us", url: "mailto:info@verapixels.com", action: "external" }
    ],
    priority: 9,
    intent: "page_navigation",
    category: "navigation"
  },
  
  {
    keywords: ["about page", "about us", "about verapixels page", "who we are page", "our story"],
    answer: `About Page Information

You're looking for our About Us page!

What's on the About Page:
• Our Full Story - From conception to today
• Mission & Vision - What drives us
• Core Values - Our guiding principles
• Team Introduction - Meet our experts
• Company Culture - How we work
• Achievements - Milestones and recognition

Why Visit This Page:
• Understand our philosophy
• Learn about our approach
• See our team structure
• Discover our company culture`,
    links: [
      { text: "📖 Go to About Page", url: "/aboutverapixels", action: "navigate" },
      { text: "👥 Meet the Team", url: "/ourcoreteam", action: "navigate" },
      { text: "🔄 Our Process", url: "/howweworkandfunction", action: "navigate" }
    ],
    priority: 9,
    intent: "page_navigation",
    category: "navigation"
  },
  
  {
    keywords: ["services page", "our services", "what we offer", "services offered", "service page"],
    answer: `Services Page Information

You're looking for our Services page!

What's on the Services Page:
• Complete Service Catalog - All offerings
• Detailed Descriptions - Each service explained
• Technology Stack - Tools we use
• Case Studies - Real examples
• Process Overview - How we deliver
• Pricing Guidance - Investment ranges

Services Categories:
1. Web Development - Custom websites & applications
2. Mobile Apps - iOS & Android solutions
3. UI/UX Design - User-centered design
4. Graphics Design - Visual branding
5. Digital Marketing - Online presence
6. Tech Consultation - Strategic guidance`,
    links: [
      { text: "🌐 Web Development", url: "/webdevelopment", action: "navigate" },
      { text: "📱 Mobile Apps", url: "/mobileappdevelopment", action: "navigate" },
      { text: "✨ UI/UX Design", url: "/uiuxdesign", action: "navigate" },
      { text: "🎨 Graphics Design", url: "/graphicsdesign", action: "navigate" }
    ],
    priority: 9,
    intent: "page_navigation",
    category: "navigation"
  },
  
  {
    keywords: ["portfolio page", "our work", "projects page", "case studies", "previous work", "work examples"],
    answer: `Portfolio Page Information

You're looking for our Portfolio page!

What's on the Portfolio Page:
• Project Gallery - Visual showcase
• Case Studies - Detailed project breakdowns
• Client Testimonials - Success stories
• Technology Used - Stack for each project
• Results Achieved - Impact metrics
• Industry Focus - Various sectors served

Featured Categories:
• E-commerce Solutions
• Enterprise Applications
• Mobile Applications
• Brand Identity Projects
• Web Platform Designs`,
    links: [
      { text: "📁 View All Projects", url: "/allprojects", action: "navigate" },
      { text: "📊 Case Studies", url: "/casestudies", action: "navigate" },
      { text: "🎯 Filter by Category", url: "/allprojects?filter=web", action: "navigate" }
    ],
    priority: 9,
    intent: "page_navigation",
    category: "navigation"
  },
  
  {
    keywords: ["career page", "jobs", "employment", "join us", "hiring", "vacancies", "work with us"],
    answer: `Career Page Information

You're looking for our Careers page!

What's on the Career Page:
• Current Openings - Available positions
• Job Descriptions - Role details
• Requirements - Skills needed
• Application Process - How to apply
• Benefits & Perks - What we offer
• Company Culture - Work environment

Why Join Verapixels:
• Innovative projects
• Growth opportunities
• Collaborative environment
• Competitive compensation
• Learning & development`,
    links: [
      { text: "👔 View Open Positions", url: "/career", action: "navigate" },
      { text: "📄 Apply Now", url: "/career#apply", action: "navigate" },
      { text: "👥 Meet Our Team", url: "/ourcoreteam", action: "navigate" }
    ],
    priority: 9,
    intent: "page_navigation",
    category: "navigation"
  },

  // ==================== SERVICES ====================
  {
    keywords: ["services", "what you offer", "what do you do", "offerings", "work", "capabilities", "service list", "all services"],
    answer: `OUR COMPREHENSIVE SERVICES

At Verapixels, we offer a full spectrum of digital solutions:

WEB DEVELOPMENT
• Custom Web Applications
• E-Commerce Platforms
• Progressive Web Apps (PWAs)
• CMS Development
• API Integration
• Enterprise Solutions

MOBILE APP DEVELOPMENT
• iOS & Android Apps
• Cross-platform Solutions
• Native Development
• App Maintenance
• App Store Optimization

UI/UX DESIGN
• User Interface Design
• User Experience Research
• Wireframing & Prototyping
• Design Systems
• Usability Testing

GRAPHICS DESIGN
• Logo & Brand Identity
• Print Design
• Marketing Collateral
• Social Media Graphics
• Packaging Design

ADDITIONAL SERVICES
• Cloud Solutions
• Cybersecurity
• Digital Marketing
• Tech Consultation
• Video Editing

Ready to start a project?`,
    links: [
      { text: "🌐 Web Development", url: "/webdevelopment", action: "navigate" },
      { text: "📱 Mobile Apps", url: "/mobileappdevelopment", action: "navigate" },
      { text: "✨ UI/UX Design", url: "/uiuxdesign", action: "navigate" },
      { text: "🎨 Graphics Design", url: "/graphicsdesign", action: "navigate" },
      { text: "📅 Book Consultation", url: "/consultationbooking", action: "navigate" }
    ],
    priority: 10,
    intent: "all_services",
    category: "services"
  },

  // ==================== PRICING ====================
  {
    keywords: ["pricing", "cost", "price", "how much", "rates", "budget", "quote", "estimate", "investment", "prices"],
    answer: `PRICING STRUCTURE

Our Pricing Philosophy:
We provide custom quotes based on your specific requirements. Each project is unique, so we tailor our pricing accordingly.

Price Factors:
1. Project Complexity - Simple vs. advanced features
2. Timeline - Standard vs. rush delivery
3. Design Requirements - Basic vs. custom design
4. Integration Needs - Third-party services
5. Maintenance - Ongoing support

Service Ranges:
• Landing Pages: ₦150,000 - ₦350,000
• Business Websites: ₦300,000 - ₦800,000
• E-commerce Stores: ₦500,000 - ₦2,000,000+
• Custom Web Apps: ₦800,000 - ₦3,000,000+
• Mobile Apps: ₦500,000 - ₦8,000,000+

Payment Structure:
1. 50% - Project commencement
2. 25% - Design approval
3. 25% - Final delivery

Note: All projects are custom, so exact pricing requires a consultation.`,
    links: [
      { text: "📅 Get Custom Quote", url: "/consultationbooking", action: "navigate" },
      { text: "📞 Talk to Sales", url: "#", action: "transfer_to_admin", data: { reason: 'Pricing inquiry' } }
    ],
    priority: 10,
    intent: "detailed_pricing",
    category: "pricing"
  },

  // ==================== CONTACT ====================
  {
    keywords: ["contact", "contact us", "reach us", "get in touch", "email", "phone", "address", "location", "office", "how to contact"],
    answer: `CONTACT INFORMATION

Location:
123 Tech Boulevard
Victoria Island, Lagos, Nigeria

Email:
• General: info@verapixels.com
• Support: support@verapixels.com
• Careers: careers@verapixels.com

Phone:
• Nigeria: +234 707 1333 709
• WhatsApp: +234 707 1333 709

Working Hours:
• Monday-Friday: 9 AM - 4:30 PM (GMT+1)
• Saturday: 10 AM - 2 PM (GMT+1)
• Sunday: Emergency only

Quick Actions:
• Book a free consultation
• Send project inquiry
• Request support
• Join our team`,
    links: [
      { text: "📞 Go to Contact Page", url: "/contact", action: "navigate" },
      { text: "📅 Book Consultation", url: "/consultationbooking", action: "navigate" },
      { text: "📧 Send Email", url: "mailto:info@verapixels.com", action: "external" },
      { text: "📱 Call Now", url: "tel:+2347071333709", action: "external" }
    ],
    priority: 10,
    intent: "detailed_contact",
    category: "contact"
  },

  // ==================== BOOKING/CONSULTATION ====================
  {
    keywords: ["book", "booking", "consultation", "schedule", "appointment", "meeting", "call", "demo", "book a call", "schedule meeting"],
    answer: `BOOK A CONSULTATION

Ready to discuss your project? Let's schedule a consultation!

What happens in a consultation:
1. Needs Assessment - Understand your requirements
2. Solution Brainstorming - Explore possibilities
3. Timeline Discussion - Project schedule
4. Budget Planning - Investment options
5. Next Steps - Clear action plan

Consultation Options:
• 30-minute Discovery Call - Initial discussion
• 1-hour Strategy Session - Detailed planning
• Technical Consultation - Expert advice`,
    links: [
      { text: "📅 Book Now", url: "/consultationbooking", action: "navigate" },
      { text: "👨‍💼 Talk to Sales", url: "#", action: "transfer_to_admin", data: { reason: 'Consultation booking' } },
      { text: "📋 View Services", url: "#", action: "all_services_help" }
    ],
    priority: 10,
    intent: "booking",
    category: "booking"
  },

  // ==================== GREETINGS ====================
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "hi there"],
    answer: `Hello! Welcome to Verapixels!

I'm Vee, your intelligent assistant. I'm here to help you with:

What I can do:
• Answer questions about Verapixels
• Help you book consultations
• Connect you with our team
• Navigate our website
• Provide service information
• Share pricing guidance`,
    links: [
      { text: "👨‍💼 Speak with Admin", url: "#", action: "transfer_to_admin", data: { reason: 'User requested admin' } },
      { text: "📅 Book Consultation", url: "/consultationbooking", action: "navigate" },
      { text: "🛠️ View Services", url: "#", action: "all_services_help" },
      { text: "💰 Get Pricing", url: "#", action: "pricing_help" }
    ],
    priority: 10,
    intent: "greeting",
    category: "general"
  },

  // ==================== HELP ====================
  {
    keywords: ["help", "what can you do", "assist", "guide", "how to use", "support", "need help"],
    answer: `HOW I CAN HELP YOU

INFORMATION PROVIDER:
• Company details and services
• Technical specifications
• Process and timelines
• Pricing and policies
• Portfolio and case studies

ACTION ASSISTANT:
• Book consultations
• Connect with our team
• Navigate website pages
• Get quotes and estimates
• Schedule meetings

EXPERT GUIDANCE:
• Project recommendations
• Technology suggestions
• Best practices
• Solution architecture`,
    links: [
      { text: "👨‍💼 Talk to Human", url: "#", action: "transfer_to_admin", data: { reason: 'User needs human assistance' } },
      { text: "📅 Book Appointment", url: "#", action: "start_booking" },
      { text: "📞 Contact Info", url: "#", action: "contact_help" },
      { text: "💰 Pricing Info", url: "#", action: "pricing_help" }
    ],
    priority: 10,
    intent: "help",
    category: "general"
  }
];

/* --------------------------- Icons --------------------------- */
const IconChat = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const IconSend = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);

const IconX = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const IconSun = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 1v2m0 18v2M23 12h-2M3 12H1m18.36-8.36l-1.42 1.42M6.34 17.66l-1.42 1.42m12.02 0l-1.42-1.42M6.34 6.34L4.92 4.92" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconMoon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconGlobe = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconExternal = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

/* --------------------------- Helper Functions --------------------------- */
const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const getUserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

// Timezone utilities from your booking code
const convertTimeToTimezone = (time: string, date: string, fromTz: string, toTz: string) => {
  const [hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || [];
  let hour = parseInt(hours);
  if (period?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (period?.toUpperCase() === 'AM' && hour === 12) hour = 0;

  const dateTimeString = `${date}T${hour.toString().padStart(2, '0')}:${minutes}:00`;
  const sourceDate = new Date(dateTimeString + ' GMT');
  
  // Get offset difference
  const sourceFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: fromTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const targetFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // Create date in source timezone
  const sourceParts = sourceFormatter.formatToParts(new Date(dateTimeString));
  const sourceHour = parseInt(sourceParts.find(p => p.type === 'hour')?.value || '0');
  
  // Create date in target timezone
  const targetParts = targetFormatter.formatToParts(new Date(dateTimeString));
  const targetHour = parseInt(targetParts.find(p => p.type === 'hour')?.value || '0');
  
  const offsetDiff = targetHour - sourceHour;
  const convertedHour = hour + offsetDiff;
  
  const finalHour = convertedHour % 24;
  const displayHour = finalHour === 0 ? 12 : finalHour > 12 ? finalHour - 12 : finalHour;
  const displayPeriod = finalHour >= 12 ? 'PM' : 'AM';
  
  return `${displayHour.toString().padStart(2, '0')}:${minutes} ${displayPeriod}`;
};

// Generate time slots based on business hours (30-minute intervals)
const generateTimeSlots = () => {
  const slots: string[] = [];
  const startHour = BUSINESS_HOURS.start;
  const endHour = BUSINESS_HOURS.end;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    // Add slots for :00 and :30
    for (let minute = 0; minute < 60; minute += 30) {
      // Skip if it's past 4:00 PM (last slot is 4:00 PM)
      if (hour === endHour && minute > 0) break;
      
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const minuteStr = minute.toString().padStart(2, '0');
      slots.push(`${displayHour.toString().padStart(2, '0')}:${minuteStr} ${period}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

/* --------------------------- Improved Answer Matching --------------------------- */
const findBestAnswer = (input: string): any => {
  if (!input) return null;
  
  const lower = input.toLowerCase().trim();
  console.log(`🔍 Searching for: "${lower}"`);
  
  // FIRST: Check for immediate admin transfer keywords
  const adminKeywords = ["agent", "admin", "human", "representative", "person", "real person", "live agent", "customer service", "support agent", "talk to someone", "speak with human", "speak to admin", "connect to agent", "help desk"];
  
  for (const keyword of adminKeywords) {
    if (lower.includes(keyword.toLowerCase())) {
      console.log('🚨 Admin transfer keyword detected:', keyword);
      return ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "immediate_admin_transfer");
    }
  }
  
  let bestMatch = { entry: null as KBEntry | null, score: 0, matchedKeywords: [] as string[] };
  
  for (const entry of ENHANCED_KNOWLEDGE_BASE) {
    // Skip admin transfer entry for regular matching
    if (entry.intent === "immediate_admin_transfer") continue;
    
    let score = 0;
    const matched = [];
    
    for (const keyword of entry.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Exact match gives highest score
      if (lower === keywordLower) {
        score += (entry.priority || 5) * 10;
        matched.push(keyword);
      } 
      // Contains keyword
      else if (lower.includes(keywordLower)) {
        // Longer keywords get higher score
        const lengthBonus = keywordLower.length / 5;
        score += (entry.priority || 5) * (3 + lengthBonus);
        matched.push(keyword);
      }
      
      // Check for plural forms and variations
      const variations = [
        keywordLower + 's',
        keywordLower.replace(/s$/, ''),
        keywordLower + 'ing',
        keywordLower.replace(/ing$/, '')
      ];
      
      for (const variation of variations) {
        if (lower.includes(variation) && !matched.includes(keyword)) {
          score += (entry.priority || 5) * 2;
          matched.push(keyword + ` (${variation})`);
        }
      }
    }
    
    // Add bonus for exact intent matches
    if (entry.intent && lower.includes(entry.intent)) {
      score += 20;
    }
    
    // Bonus for category mentions
    if (entry.category && lower.includes(entry.category)) {
      score += 10;
    }
    
    // Special bonus for page navigation requests
    if (entry.intent === "page_navigation" && (lower.includes("page") || lower.includes("go to"))) {
      score += 25;
    }
    
    if (score > bestMatch.score) {
      bestMatch = { entry, score, matchedKeywords: matched };
    }
  }
  
  console.log(`🏆 Best match:`, {
    intent: bestMatch.entry?.intent,
    score: bestMatch.score,
    keywords: bestMatch.matchedKeywords
  });
  
  if (bestMatch.entry && bestMatch.score >= 15) {
    return { 
      text: bestMatch.entry.answer, 
      links: bestMatch.entry.links,
      intent: bestMatch.entry.intent,
      category: bestMatch.entry.category,
      confidence: Math.min(bestMatch.score / 100, 1).toFixed(2)
    };
  }
  
  // Fallback: Use semantic matching for complex queries
  return findSemanticMatch(lower);
};

const findSemanticMatch = (query: string): any => {
  const commonQuestions = {
    // Page navigation variations
    'go to contact': ENHANCED_KNOWLEDGE_BASE.find(e => e.keywords.includes("contact page")),
    'show me contact': ENHANCED_KNOWLEDGE_BASE.find(e => e.keywords.includes("contact page")),
    'take me to': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "page_navigation"),
    'direct me to': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "page_navigation"),
    'navigate to': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "page_navigation"),
    
    // Founder variations
    'who is ocholi': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "about_founder"),
    'who is f divine': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "about_founder"),
    'tell me about divine': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "about_founder"),
    
    // Pricing variations
    'how much does': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "detailed_pricing"),
    'what is the cost': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "detailed_pricing"),
    
    // Booking variations
    'schedule a': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "booking"),
    'make an appointment': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "booking"),
    'want to book': ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === "booking"),
  };

  for (const [pattern, entry] of Object.entries(commonQuestions)) {
    if (query.includes(pattern) && entry) {
      return {
        text: entry.answer,
        links: entry.links,
        intent: entry.intent,
        category: entry.category
      };
    }
  }
  
  // Default fallback response
  return {
    text: "I want to make sure I understand you correctly. Could you:\n\n1. Rephrase your question?\n2. Or choose one of these options:",
    links: [
      { text: "👨‍💼 Talk to Human Team", url: "#", action: 'transfer_to_admin', data: { reason: 'User needed specialized help' } },
      { text: "📅 Book Consultation", url: "#", action: 'start_booking' },
      { text: "🛠️ View Services", url: "/services", action: 'navigate' },
      { text: "💰 Get Pricing Info", url: "#", action: 'pricing_help' }
    ],
    intent: "fallback_response"
  };
};

/* --------------------------- Message Duplication Prevention --------------------------- */
let lastMessageCache: { [key: string]: number } = {};

const saveMessage = async (conversationId: string, message: Message): Promise<any> => {
  try {
    // Enhanced duplicate prevention
    const cacheKey = `${conversationId}_${message.text.substring(0, 50)}_${message.sender}`;
    
    // Check if same message was sent within last 2 seconds
    const now = Date.now();
    if (lastMessageCache[cacheKey] && (now - lastMessageCache[cacheKey]) < 2000) {
      console.log('🔄 Skipping duplicate message (recently sent)');
      return null;
    }
    
    lastMessageCache[cacheKey] = now;
    
    // Clean old cache entries
    Object.keys(lastMessageCache).forEach(key => {
      if (now - lastMessageCache[key] > 5000) {
        delete lastMessageCache[key];
      }
    });

    const messageData = {
      message_id: `msg_${Date.now()}`,
      conversation_id: conversationId,
      sender_type: message.sender === "vee" ? "bot" : message.sender === "admin" ? "admin" : "user",
      sender_name: message.sender === "vee" ? "Vee AI" : message.sender === "admin" ? "Admin" : "User",
      message_text: message.text,
      timestamp: new Date().toISOString(),
      read_by_admin: false,
      read_by_user: true,
      intent_detected: message.intent || "unknown",
      classification: message.classification || "SIMPLE",
      metadata: message.links || message.options ? 
        JSON.stringify({ links: message.links, options: message.options }) : null
    };

    const { data, error } = await supabase
      .from('chat_messages')
      .insert(messageData)
      .select()
      .single();

    if (error) {
      console.error('Supabase save message error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error saving message to Supabase:', error);
    return null;
  }
};

const createConversation = async (sessionId: string, timezone: string) => {
  try {
    const conversationData = {
      conversation_id: sessionId,
      user_timezone: timezone,
      status: 'active',
      is_admin_takeover: false,
      started_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
      session_id: sessionId
    };

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert(conversationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating conversation in Supabase:', error);
    return null;
  }
};

const updateConversationActivity = async (conversationId: string) => {
  try {
    const { error } = await supabase
      .from('chat_conversations')
      .update({ 
        last_activity: new Date().toISOString()
      })
      .eq('conversation_id', conversationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating conversation activity:', error);
  }
};

const createAdminNotification = async (conversationId: string, reason: string, priority: string = 'high', messagePreview: string) => {
  try {
    console.log('📢 Creating admin notification:', { conversationId, reason, priority, messagePreview });
    
    const notificationData = {
      notification_id: `notif_${Date.now()}`,
      conversation_id: conversationId,
      notification_type: 'user_request',
      message_preview: messagePreview.substring(0, 200),
      reason: reason,
      priority: priority,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('admin_notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase notification error:', error);
      // Try alternative method - send email notification
      await sendEmailNotification(conversationId, reason, messagePreview);
      return { success: true, method: 'email' };
    }

    console.log('✅ Admin notification created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating notification in Supabase:', error);
    // Try email as fallback
    await sendEmailNotification(conversationId, reason, messagePreview);
    return { success: true, method: 'email' };
  }
};

const sendEmailNotification = async (conversationId: string, reason: string, messagePreview: string) => {
  try {
    const serviceId = 'service_w8wwd8e';
    const publicKey = 'NUKm-dvMLR7ftwvbF';
    const templateId = 'template_503vbvj'; // Your admin notification template
    
    const params = {
      conversation_id: conversationId,
      reason: reason,
      message_preview: messagePreview,
      timestamp: new Date().toISOString(),
      priority: 'high'
    };

    await emailjs.send(serviceId, templateId, params, publicKey);
    console.log('📧 Email notification sent');
    return true;
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return false;
  }
};

/* --------------------------- Main Component --------------------------- */
const VeeAISmartChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [conversationId, setConversationId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [userTimezone, setUserTimezone] = useState<string>("");
  const [showTimezoneSelector, setShowTimezoneSelector] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const [adminIsTyping, setAdminIsTyping] = useState<boolean>(false);
  const [adminHasJoined, setAdminHasJoined] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">("connecting");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('vee-chat-theme') as ThemeMode;
      if (savedTheme) return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });
  const [bookingState, setBookingState] = useState<BookingState>({
    isBooking: false,
    step: 'none',
    datePage: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socketRef = useRef<any>(null);

  // Available time zones for selector
  const availableTimezones = [
    'Africa/Lagos',
    'Europe/London',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Europe/Paris',
    'America/Los_Angeles',
    'Asia/Singapore',
    'America/Chicago',
    'Asia/Dubai'
  ];

  /* --------------------------- WebSocket Connection --------------------------- */
  useEffect(() => {
    if (socketRef.current) {
      console.log('🔄 Socket already exists, reusing...');
      return;
    }

    if (!sessionId) return;
    
    console.log('🔌 Initializing WebSocket connection...');
    
    const socketInstance = io(SOCKET_CONFIG.url, {
      ...SOCKET_CONFIG.options,
      query: {
        clientType: 'chatbot',
        sessionId: sessionId,
        timezone: userTimezone
      }
    });

    socketRef.current = socketInstance;
    
    socketInstance.on('connect', () => {
      console.log('✅ WebSocket connected successfully');
      setIsSocketConnected(true);
      setConnectionStatus('connected');
      
      socketInstance.emit('join_conversation', {
        conversationId: sessionId,
        userId: `user_${sessionId}`,
        userInfo: {
          timezone: userTimezone,
          isBooking: bookingState.isBooking,
          name: 'Chat User'
        }
      });
    });
    
    socketInstance.on('disconnect', (reason: string) => {
      console.log('❌ WebSocket disconnected:', reason);
      setIsSocketConnected(false);
      setConnectionStatus('disconnected');
      
      if (reason === 'io server disconnect') {
        socketInstance.connect();
      }
    });
    
    socketInstance.on('connect_error', (error: Error) => {
      console.error('❌ WebSocket connection error:', error.message);
      setConnectionStatus('error');
      
      setTimeout(() => {
        socketInstance.io.opts.transports = ['polling'];
        socketInstance.connect();
      }, 2000);
    });
    
    socketInstance.on('reconnect', (attemptNumber: number) => {
      console.log(`🔄 WebSocket reconnected after ${attemptNumber} attempts`);
      setIsSocketConnected(true);
      setConnectionStatus('connected');
    });
    
    socketInstance.on('new_message', (message: SocketMessage) => {
      console.log('📨 Received message via WebSocket:', message);
      
      // Enhanced duplicate check
      setMessages(prev => {
        const alreadyExists = prev.some(msg => {
          const isSameText = msg.text.trim() === message.message_text.trim();
          const isSameSender = msg.sender_type === message.sender_type;
          const isRecent = Math.abs(new Date(msg.timestamp).getTime() - new Date(message.timestamp).getTime()) < 1000;
          
          return (isSameText && isSameSender) || (isSameText && isRecent);
        });
        
        if (alreadyExists) {
          console.log('⚠️ Duplicate WebSocket message detected, skipping');
          return prev;
        }
        
        const senderMap = {
          'user': 'user' as Sender,
          'bot': 'vee' as Sender,
          'admin': 'admin' as Sender
        };
        
        const newMessage: Message = {
          id: parseInt(message.id?.replace(/\D/g, '') || Date.now().toString()),
          sender: senderMap[message.sender_type || 'bot'],
          text: message.message_text,
          timestamp: new Date(message.timestamp),
          intent: message.intent_detected,
          classification: message.classification,
          sender_type: message.sender_type
        };
        
        return [...prev, newMessage];
      });
      
      if (message.sender_type === 'admin' && !adminHasJoined) {
        setAdminHasJoined(true);
      }
      
      if (!isOpen) setUnreadCount(prev => prev + 1);
      
      updateConversationActivity(sessionId);
    });
    
    socketInstance.on('admin_joined', (data: any) => {
      console.log('👨‍💼 Admin joined:', data);
      setAdminHasJoined(true);
      
      const adminJoinedMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: `${data.adminName || 'An admin'} has joined the conversation. You can now chat directly!`,
        timestamp: new Date(),
        intent: 'admin_joined'
      };
      
      setMessages(prev => [...prev, adminJoinedMsg]);
    });
    
    socketInstance.on('admin_typing', (data: any) => {
      if (data.conversationId === sessionId) {
        console.log('⌨️ Admin typing:', data.isTyping);
        setAdminIsTyping(data.isTyping);
      }
    });

    socketInstance.on('transfer_initiated', (data: any) => {
      console.log('🔄 Transfer initiated:', data);
      
      const transferMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: `Conversation transferred to admin: ${data.reason || 'User requested assistance'}`,
        timestamp: new Date(),
        intent: 'transfer_initiated'
      };
      
      setMessages(prev => [...prev, transferMsg]);
    });
    
    setSocket(socketInstance);
    
    return () => {
      console.log('🧹 Cleaning up WebSocket connection');
      if (socketInstance && socketInstance.connected) {
        socketInstance.disconnect();
        socketRef.current = null;
      }
    };
  }, [sessionId, userTimezone]);

  /* --------------------------- Initialize Conversation --------------------------- */
  useEffect(() => {
    const initConversation = async () => {
      const session = generateSessionId();
      const timezone = getUserTimezone();
      
      setSessionId(session);
      setUserTimezone(timezone);
      
      try {
        const conversation = await createConversation(session, timezone);
        
        if (conversation) {
          setConversationId(conversation.id);
          
          const welcome: Message = {
            id: Date.now(),
            sender: "vee",
            text: `Hi there! I'm Vee, your Verapixels AI Assistant.

I can help you with:
• Booking consultations with our team
• Getting information about our services
• Connecting you with human agents
• Navigating our website pages
• Answering questions about Verapixels

What would you like to do today?`,
            timestamp: new Date(),
            intent: "greeting",
            links: [
              { text: "👨‍💼 Speak with Admin", url: "#", action: "transfer_to_admin", data: { reason: 'Welcome screen request' } },
              { text: "📅 Book Consultation", url: "#", action: "start_booking" },
              { text: "🛠️ View Services", url: "#", action: "all_services_help" },
              { text: "💰 Get Pricing", url: "#", action: "pricing_help" }
            ]
          };
          
          setMessages([welcome]);
          await saveMessage(session, welcome);
        }
      } catch (error) {
        console.error('Error initializing conversation:', error);
      }
    };
    
    initConversation();
  }, []);

  /* --------------------------- Effects --------------------------- */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isTyping && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping, isOpen]);

  const sendTypingIndicator = (isTyping: boolean) => {
    if (socket && isSocketConnected && sessionId) {
      socket.emit('typing', {
        conversationId: sessionId,
        isTyping,
        userType: 'user'
      });
    }
  };

  /* --------------------------- Handle Send Message --------------------------- */
  const handleSend = async () => {
    const raw = inputValue.trim();
    if (!raw || isTyping) return;

    // CHECK: If admin has joined, skip AI processing
    if (adminHasJoined) {
      console.log('🛑 Admin is handling, sending directly to admin');
      const userMsg: Message = { 
        id: Date.now(), 
        sender: "user", 
        text: raw, 
        timestamp: new Date() 
      };
      
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      
      // Save to database
      await saveMessage(sessionId, userMsg);
      
      // Send via WebSocket for admin to see
      if (socket && isSocketConnected) {
        socket.emit('send_message', {
          conversationId: sessionId,
          message: raw,
          sender: 'user',
          messageType: 'text'
        });
      }
      
      return; // CRITICAL: Exit early when admin is handling
    }

    const userMsg: Message = { 
      id: Date.now(), 
      sender: "user", 
      text: raw, 
      timestamp: new Date() 
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    sendTypingIndicator(true);
    
    // Save user message to Supabase
    await saveMessage(sessionId, userMsg);
    
    // Send via WebSocket if connected
    if (socket && isSocketConnected) {
      socket.emit('send_message', {
        conversationId: sessionId,
        message: raw,
        sender: 'user',
        messageType: 'text',
        metadata: {
          isBooking: bookingState.isBooking,
          currentStep: bookingState.step
        }
      });
    }
    
    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(false);
    }, 1000);

    // Handle bot response
    setTimeout(async () => {
      // DOUBLE CHECK: Admin might have joined while typing
      if (adminHasJoined) {
        console.log('🛑 Admin joined while typing, cancelling AI response');
        setIsTyping(false);
        return;
      }

      let response: any = { text: "" };
      
      // Check for recent responses to avoid duplicates
      const recentResponses = messages.filter(msg => 
        msg.sender === 'vee' && 
        msg.timestamp.getTime() > Date.now() - 3000
      );
      
      if (recentResponses.some(msg => msg.text.includes(raw.substring(0, 20)))) {
        console.log('🔄 Recent similar response found, skipping');
        setIsTyping(false);
        return;
      }

      if (bookingState.isBooking) {
        response = await handleBookingFlow(raw);
      } else {
        const match = findBestAnswer(raw);
        
        if (match && match.intent === 'booking') {
          // Start booking flow
          setBookingState({ 
            isBooking: true, 
            step: 'name' as const,
            name: undefined,
            email: undefined,
            phone: undefined,
            date: undefined,
            dateDisplay: undefined,
            time: undefined,
            contactMethod: undefined,
            datePage: 0
          });
          
          response = {
            text: "Great! I'll help you book a consultation. First, what's your full name?",
            intent: 'booking_started'
          };
        } 
        // Check if it's an immediate admin transfer request
        else if (match && match.intent === 'immediate_admin_transfer') {
          console.log('🚨 IMMEDIATE ADMIN TRANSFER REQUESTED');
          
          // Set admin joined flag immediately
          setAdminHasJoined(true);
          
          const notification = await createAdminNotification(
            sessionId, 
            'Immediate admin request by user', 
            'urgent', 
            `User said: "${raw.substring(0, 100)}"`
          );
          
          if (notification) {
            response.text = `${match.text}\n\n✅ Admin notified with HIGH PRIORITY! They will join within 2 minutes.`;
          } else {
            response.text = `${match.text}\n\n⚠️ Emergency contact: Please call +234 707 1333 709 immediately.`;
          }
        } 
        else if (match) {
          response = {
            text: match.text,
            links: match.links,
            intent: match.intent
          };
        } else {
          // No match found - suggest options
          response = {
            text: "I want to make sure I understand you correctly. Could you:\n\n1. Rephrase your question?\n2. Or choose one of these options:",
            links: [
              { text: "👨‍💼 Talk to Human Team", url: "#", action: 'transfer_to_admin', data: { reason: 'User needed specialized help' } },
              { text: "📅 Book Consultation", url: "#", action: 'start_booking' },
              { text: "🛠️ View Services", url: "/services", action: 'navigate' },
              { text: "💰 Get Pricing", url: "#", action: 'pricing_help' }
            ]
          };
        }
      }
      
      // Send bot response via WebSocket if no admin is present
      if (socket && isSocketConnected && response && !adminHasJoined) {
        socket.emit('send_message', {
          conversationId: sessionId,
          message: response.text,
          sender: 'vee',
          messageType: 'bot_response',
          metadata: {
            intent: response.intent,
            hasLinks: !!response.links,
            requiresAdmin: response.intent === 'immediate_admin_transfer'
          }
        });
      }
      
      const veeMsg: Message = {
        id: Date.now(),
        sender: "vee",
        text: response.text,
        timestamp: new Date(),
        links: response.links,
        intent: response.intent,
        options: response.options,
        classification: response.intent === 'booking' ? 'BOOKING' : 'SIMPLE'
      };
      
      setMessages((prev) => [...prev, veeMsg]);
      
      // Save bot message to Supabase
      await saveMessage(sessionId, veeMsg);
      
      setIsTyping(false);
      if (!isOpen) setUnreadCount((n) => n + 1);
      
      updateConversationActivity(sessionId);
    }, 1000); // Reduced from 1500ms to 1000ms for faster responses
  };

  /* --------------------------- Transfer to Admin --------------------------- */
  const handleTransferToAdmin = async (reason = 'User requested human assistance') => {
    console.log('🚀 Initiating admin transfer:', reason);
    
    // Clear any pending typing or responses
    setIsTyping(false);
    
    // Mark admin as joined immediately
    setAdminHasJoined(true);
    
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    const notification = await createAdminNotification(
      sessionId, 
      reason, 
      'urgent', 
      `User requested admin assistance: ${reason}`
    );
    
    if (!notification) {
      console.error('❌ Failed to create notification');
      const errorMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: '⚠️ Unable to notify admin at the moment. Please try again or email us at info@verapixels.com.',
        timestamp: new Date(),
        intent: 'transfer_failed'
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }
    
    // Send via WebSocket if connected
    if (socket && isSocketConnected) {
      socket.emit('transfer_to_admin', {
        conversationId: sessionId,
        reason: reason,
        notificationId: notification.notification_id || 'email_notification'
      });
      
      console.log('📤 Transfer request sent via WebSocket');
    }
    
    const transferMsg: Message = {
      id: Date.now(),
      sender: 'vee',
      text: '✅ I\'ve notified our team with HIGH PRIORITY! An admin will join the conversation shortly!',
      timestamp: new Date(),
      intent: 'transfer_confirmed'
    };
    setMessages(prev => [...prev, transferMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBookingFlow = async (userInput: string): Promise<any> => {
    const { step, name, email, phone, contactMethod, date, time } = bookingState;
    let nextStep = step;
    let responseText = "";
    let data = { ...bookingState };

    switch (step) {
      case 'name':
        data.name = userInput;
        data.step = 'email';
        responseText = `Thanks, ${userInput}! What's your email address?`;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
          return {
            text: "Please provide a valid email address (e.g., name@example.com):",
            intent: 'booking_invalid_email'
          };
        }
        data.email = userInput;
        data.step = 'phone';
        responseText = "Great! What's your phone number (with country code)?";
        break;
      case 'phone':
        data.phone = userInput;
        data.step = 'contact';
        responseText = "How would you prefer we contact you?\n" +
          CONTACT_METHODS.map(m => `${m.id === 'video' ? '🎥' : m.id === 'audio' ? '📞' : '💬'} ${m.label}`).join('\n');
        break;
      case 'contact':
        const method = CONTACT_METHODS.find(m => 
          userInput.toLowerCase().includes(m.id) || 
          userInput.toLowerCase().includes(m.label.toLowerCase())
        );
        if (method) {
          data.contactMethod = method.label;
          data.step = 'date';
          responseText = `Perfect! We'll contact you via ${method.label}. When would you like to schedule? You can say "tomorrow", "next Monday", or a specific date.`;
        } else {
          responseText = "Please choose one of these methods:\n" +
            CONTACT_METHODS.map(m => `• ${m.label}`).join('\n');
        }
        break;
      case 'date':
        // Parse date input
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let selectedDate: string;
        
        if (userInput.toLowerCase().includes('tomorrow')) {
          selectedDate = tomorrow.toISOString().split('T')[0];
        } else if (userInput.toLowerCase().includes('monday') || 
                  userInput.toLowerCase().includes('tuesday') ||
                  userInput.toLowerCase().includes('wednesday') ||
                  userInput.toLowerCase().includes('thursday') ||
                  userInput.toLowerCase().includes('friday') ||
                  userInput.toLowerCase().includes('saturday') ||
                  userInput.toLowerCase().includes('sunday')) {
          // Find next occurrence of the mentioned day
          const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          const targetDay = days.findIndex(d => userInput.toLowerCase().includes(d));
          
          const currentDay = today.getDay();
          let daysToAdd = targetDay - currentDay;
          if (daysToAdd <= 0) daysToAdd += 7;
          
          const targetDate = new Date(today);
          targetDate.setDate(targetDate.getDate() + daysToAdd);
          selectedDate = targetDate.toISOString().split('T')[0];
        } else {
          // Try to parse as date
          try {
            const parsedDate = new Date(userInput);
            if (!isNaN(parsedDate.getTime())) {
              selectedDate = parsedDate.toISOString().split('T')[0];
            } else {
              selectedDate = userInput; // Let the backend handle validation
            }
          } catch {
            selectedDate = userInput;
          }
        }
        
        data.date = selectedDate;
        data.step = 'time';
        
        // Check availability for this date
        const availableSlots = await checkAvailableSlots(selectedDate);
        if (availableSlots.length === 0) {
          responseText = `I checked our schedule for ${selectedDate} and unfortunately all slots are booked. Would you like to choose another date?`;
          data.step = 'date'; // Go back to date selection
        } else {
          responseText = `Available times for ${selectedDate} (your timezone: ${userTimezone}):\n\n` +
            availableSlots.map(slot => `• ${slot}`).join('\n') +
            "\n\nWhich time works best for you?";
        }
        break;
      case 'time':
        // Check if the time is available
        const isAvailable = await checkTimeAvailability(data.date!, userInput);
        if (!isAvailable) {
          responseText = `Sorry, ${userInput} is not available. Please choose another time from the available slots:`;
          const availableSlots = await checkAvailableSlots(data.date!);
          responseText += "\n\n" + availableSlots.map(slot => `• ${slot}`).join('\n');
        } else {
          data.time = userInput;
          data.step = 'confirm';
          
          // Get business time conversion
          const businessTime = data.date ? convertTimeToTimezone(userInput, data.date, userTimezone, BUSINESS_TIMEZONE) : userInput;
          
          responseText = `Perfect! Let me confirm your booking:\n\n` +
            `📋 **Booking Summary:**\n` +
            `• Name: ${data.name}\n` +
            `• Email: ${data.email}\n` +
            `• Phone: ${data.phone}\n` +
            `• Contact Method: ${data.contactMethod}\n` +
            `• Date: ${data.date}\n` +
            `• Time: ${data.time} (your timezone)\n` +
            `• Business Time: ${businessTime} (Lagos time)\n\n` +
            `Is this correct? Type "yes" to confirm or "no" to make changes.`;
        }
        break;
      case 'confirm':
        if (userInput.toLowerCase().includes('yes')) {
          // Finalize booking
          const result = await finalizeBooking();
          if (result.success) {
            responseText = `✅ **Booking confirmed!**\n\n` +
              `Your consultation has been scheduled:\n` +
              `• Date: ${data.date}\n` +
              `• Time: ${data.time} (your timezone)\n` +
              `• Check your email for confirmation\n\n` +
              `We'll contact you via ${data.contactMethod} at the scheduled time.`;
            
            // Reset booking state
            setBookingState({
              isBooking: false,
              step: 'none',
              datePage: 0
            });
          } else {
            responseText = `❌ **Booking failed:** ${result.error}\n\n` +
              `Please try again or contact us directly at info@verapixels.com.`;
            data.step = 'confirm'; // Stay on confirm step
          }
        } else {
          responseText = "What would you like to change?\n" +
            "1. Name\n" +
            "2. Email\n" +
            "3. Phone\n" +
            "4. Contact Method\n" +
            "5. Date\n" +
            "6. Time\n\n" +
            "Type the number or field you want to change:";
          data.step = 'edit';
        }
        break;
      case 'edit':
        // Handle field editing
        if (userInput.includes('1') || userInput.toLowerCase().includes('name')) {
          data.step = 'name';
          responseText = "What's your corrected name?";
        } else if (userInput.includes('2') || userInput.toLowerCase().includes('email')) {
          data.step = 'email';
          responseText = "What's your corrected email?";
        } else if (userInput.includes('3') || userInput.toLowerCase().includes('phone')) {
          data.step = 'phone';
          responseText = "What's your corrected phone number?";
        } else if (userInput.includes('4') || userInput.toLowerCase().includes('contact')) {
          data.step = 'contact';
          responseText = "How would you prefer we contact you?\n" +
            CONTACT_METHODS.map(m => `${m.id === 'video' ? '🎥' : m.id === 'audio' ? '📞' : '💬'} ${m.label}`).join('\n');
        } else if (userInput.includes('5') || userInput.toLowerCase().includes('date')) {
          data.step = 'date';
          responseText = "What date would you prefer?";
        } else if (userInput.includes('6') || userInput.toLowerCase().includes('time')) {
          data.step = 'time';
          responseText = "What time would you prefer?";
        } else {
          responseText = "Please choose a number from 1-6 or type the field name you want to change.";
        }
        break;
      default:
        responseText = "Let me help you complete your booking. What information can you provide?";
    }

    setBookingState(data);
    return {
      text: responseText,
      intent: 'booking'
    };
  };

  const checkAvailableSlots = async (date: string): Promise<string[]> => {
    try {
      // Check Supabase for booked slots
      const { data: bookings, error } = await supabase
        .from('consultations')
        .select('booking_time, status')
        .eq('booking_date', date)
        .in('status', ['confirmed', 'pending']);
      
      if (error) {
        console.error('Error checking availability:', error);
        return timeSlots; // Return all slots as fallback
      }
      
      const bookedTimes = bookings?.map(b => b.booking_time) || [];
      
      // Filter available slots (not booked)
      return timeSlots.filter(slot => !bookedTimes.includes(slot));
    } catch (error) {
      console.error('Error checking available slots:', error);
      return timeSlots; // Return all slots as fallback
    }
  };

  const checkTimeAvailability = async (date: string, time: string): Promise<boolean> => {
    try {
      const { data: bookings, error } = await supabase
        .from('consultations')
        .select('booking_time, status')
        .eq('booking_date', date)
        .eq('booking_time', time)
        .in('status', ['confirmed', 'pending']);
      
      if (error) {
        console.error('Error checking time availability:', error);
        return false;
      }
      
      return !bookings || bookings.length === 0;
    } catch (error) {
      console.error('Error checking time availability:', error);
      return false;
    }
  };

  const finalizeBooking = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { name, email, phone, contactMethod, date, time } = bookingState;
      
      if (!name || !email || !phone || !contactMethod || !date || !time) {
        return { success: false, error: 'Missing required information' };
      }
      
      const consultationId = `cons_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const businessTime = convertTimeToTimezone(time, date, userTimezone, BUSINESS_TIMEZONE);
      
      // Create booking in Supabase
      const { data, error } = await supabase
        .from('consultations')
        .insert([{
          consultation_id: consultationId,
          name: name,
          email: email,
          phone: phone,
          contact_method: contactMethod,
          booking_date: date,
          booking_time: time,
          user_timezone: userTimezone,
          business_time: businessTime,
          message: 'Booked via Vee AI Chatbot',
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        console.error('Error creating booking:', error);
        return { success: false, error: 'Database error' };
      }
      
      // Send confirmation emails using EmailJS
      const serviceId = 'service_w8wwd8e';
      const publicKey = 'NUKm-dvMLR7ftwvbF';
      const adminTemplateId = 'template_503vbvj';
      const userTemplateId = 'template_6zgl8ml';
      
      const baseParams = {
        from_name: name,
        from_email: email,
        user_name: name,
        user_email: email,
        phone: phone,
        contact_method: contactMethod,
        preferred_date: date,
        preferred_time: time,
        business_time: businessTime,
        user_timezone: userTimezone,
        business_timezone: BUSINESS_TIMEZONE,
        consultation_id: consultationId
      };
      
      // Send notification to admin
      await emailjs.send(serviceId, adminTemplateId, { ...baseParams, reply_to: email }, publicKey);
      
      // Send auto-reply to user
      await emailjs.send(serviceId, userTemplateId, baseParams, publicKey);
      
      console.log('✅ Booking finalized:', consultationId);
      return { success: true };
      
    } catch (error) {
      console.error('Error finalizing booking:', error);
      return { success: false, error: 'Unexpected error' };
    }
  };

  const handleLinkNavigation = (url: string, action?: string, data?: any) => {
    console.log('🔗 Link clicked:', { url, action, data });
    
    if (action === 'transfer_to_admin') {
      handleTransferToAdmin(data?.reason || 'User requested human assistance');
      return;
    }
    
    if (action === 'start_booking') {
      setBookingState({ 
        isBooking: true, 
        step: 'name' as const,
        datePage: 0
      });
      
      const bookingMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: "Great! I'll help you book a consultation. First, what's your full name?",
        timestamp: new Date(),
        intent: 'booking_started'
      };
      setMessages(prev => [...prev, bookingMsg]);
      return;
    }
    
    if (action === 'navigate') {
      // Navigate within the app
      window.location.href = url;
      return;
    }
    
    if (action === 'external') {
      // Open external link
      window.open(url, '_blank');
      return;
    }
    
    if (action === 'pricing_help') {
      const pricingMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === 'detailed_pricing')?.answer || "I can help you with pricing. Could you tell me what type of project you have in mind?",
        timestamp: new Date(),
        intent: 'pricing'
      };
      setMessages(prev => [...prev, pricingMsg]);
      return;
    }
    
    if (action === 'all_services_help') {
      const servicesMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === 'all_services')?.answer || "Here are our services. What specific area are you interested in?",
        timestamp: new Date(),
        intent: 'all_services'
      };
      setMessages(prev => [...prev, servicesMsg]);
      return;
    }
    
    if (action === 'contact_help') {
      const contactMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: ENHANCED_KNOWLEDGE_BASE.find(e => e.intent === 'detailed_contact')?.answer || "Here's how to contact us. What specific information do you need?",
        timestamp: new Date(),
        intent: 'contact'
      };
      setMessages(prev => [...prev, contactMsg]);
      return;
    }
    
    if (action === 'suggest_questions') {
      const suggestionsMsg: Message = {
        id: Date.now(),
        sender: 'vee',
        text: "Here are some common questions:\n\n• What services do you offer?\n• How much does a website cost?\n• Can I see your portfolio?\n• How do I book a consultation?\n• What's your process like?\n\nOr try rephrasing your question!",
        timestamp: new Date(),
        intent: 'suggestions'
      };
      setMessages(prev => [...prev, suggestionsMsg]);
      return;
    }
    
    // Default: open in new tab
    window.open(url, '_blank');
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem('vee-chat-theme', newTheme);
      return newTheme;
    });
  };

  const handleTimezoneChange = (newTimezone: string) => {
    setUserTimezone(newTimezone);
    setShowTimezoneSelector(false);
    
    const timezoneMsg: Message = {
      id: Date.now(),
      sender: "vee",
      text: `Timezone updated to: ${newTimezone}`,
      timestamp: new Date(),
      intent: "timezone_change"
    };
    
    setMessages(prev => [...prev, timezoneMsg]);
  };

  /* --------------------------- Chatbot Opening Options --------------------------- */
  const handleOpenChatbot = () => {
    setIsOpen(true);
    
    // Show options when opening
    const optionsMsg: Message = {
      id: Date.now(),
      sender: "vee",
      text: "Welcome! How can I help you today?\n\nChoose an option below or type your question:",
      timestamp: new Date(),
      links: [
        { text: "👨‍💼 Speak with Admin", url: "#", action: "transfer_to_admin", data: { reason: 'User selected from options' } },
        { text: "📅 Book a Consultation", url: "#", action: "start_booking" },
        { text: "🛠️ Know More About Us", url: "/aboutverapixels", action: "navigate" },
        { text: "💰 Get Pricing Info", url: "#", action: "pricing_help" },
        { text: "📁 View Portfolio", url: "/allprojects", action: "navigate" }
      ]
    };
    
    if (messages.length <= 1) { // Only add if it's basically a new conversation
      setMessages(prev => [...prev, optionsMsg]);
    }
  };

  /* --------------------------- Cleanup on Unmount --------------------------- */
  useEffect(() => {
    return () => {
      // Clear all timeouts
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Clear message cache
      Object.keys(lastMessageCache).forEach(key => {
        delete lastMessageCache[key];
      });
      
      // Disconnect socket
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div className={`vee-chat-root ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <style>{`
        .vee-chat-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .vee-chat-button {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0066ff, #00ccff);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 102, 255, 0.4);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .vee-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(0, 102, 255, 0.6);
        }
        
        .vee-unread-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ff4757;
          color: #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid ${isDark ? '#000' : '#fff'};
        }
        
        .vee-chat-window {
          position: fixed;
          top: 100px;
          right: 24px;
          width: 420px;
          height: 600px;
          max-height: calc(100vh - 120px);
          background: ${isDark ? '#1a1a1a' : '#fff'};
          border: 1px solid ${isDark ? '#333' : '#e0e0e0'};
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
          z-index: 9999;
          overflow: hidden;
        }
        
        .vee-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: ${isDark ? '#1a1a1a' : '#fff'};
          min-height: 0;
        }
        
        .vee-chat-header {
          padding: 20px;
          background: linear-gradient(135deg, #0066ff, #00ccff);
          border-radius: 20px 20px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        
        .vee-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .vee-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          color: #fff;
        }
        
        .vee-header-text h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        
        .vee-header-text p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
          color: #fff;
        }
        
        .vee-header-actions {
          display: flex;
          gap: 8px;
        }
        
        .vee-theme-btn, .vee-close-btn, .vee-globe-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
        }
        
        .vee-theme-btn:hover, .vee-close-btn:hover, .vee-globe-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .vee-message {
          display: flex;
          gap: 12px;
        }
        
        .vee-message.user {
          flex-direction: row-reverse;
        }
        
        .vee-message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        
        .vee-message.vee .vee-message-avatar {
          background: linear-gradient(135deg, #0066ff, #00ccff);
        }
        
        .vee-message.user .vee-message-avatar {
          background: ${isDark ? '#333' : '#e0e0e0'};
          color: ${isDark ? '#fff' : '#000'};
        }
        
        .vee-message.admin .vee-message-avatar {
          background: linear-gradient(135deg, #8a2be2, #9370db);
        }
        
        .vee-message-bubble {
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          color: ${isDark ? '#fff' : '#000'};
          background: ${isDark ? '#2a2a2a' : '#f5f5f5'};
          border: 1px solid ${isDark ? '#333' : '#e0e0e0'};
          word-break: break-word;
          max-width: 280px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .vee-message-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        
        .vee-message-link {
          padding: 10px 16px;
          background: ${isDark ? 'rgba(0, 102, 255, 0.15)' : 'rgba(0, 102, 255, 0.1)'};
          border: 1px solid rgba(0, 102, 255, 0.3);
          border-radius: 20px;
          color: ${isDark ? '#00ccff' : '#0066ff'};
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          font-family: inherit;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .vee-message-link:hover {
          background: rgba(0, 102, 255, 0.25);
          border-color: #0066ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.2);
        }
        
        .vee-input-area {
          padding: 16px 20px;
          border-top: 1px solid ${isDark ? '#333' : '#e0e0e0'};
          background: ${isDark ? '#1a1a1a' : '#fff'};
          flex-shrink: 0;
        }
        
        .vee-input-wrapper {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .vee-input {
          flex: 1;
          padding: 14px 18px;
          background: ${isDark ? '#2a2a2a' : '#f5f5f5'};
          border: 1px solid ${isDark ? '#333' : '#e0e0e0'};
          border-radius: 24px;
          color: ${isDark ? '#fff' : '#000'};
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.3s ease;
        }
        
        .vee-input:focus {
          border-color: #0066ff;
          background: ${isDark ? 'rgba(0, 102, 255, 0.1)' : 'rgba(0, 102, 255, 0.05)'};
        }
        
        .vee-send-btn {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0066ff, #00ccff);
          border: none;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .vee-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }
        
        .vee-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .vee-typing {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .vee-typing-dots {
          display: flex;
          gap: 6px;
          padding: 16px;
          background: ${isDark ? '#2a2a2a' : '#f5f5f5'};
          border-radius: 18px;
        }
        
        .vee-typing-dot {
          width: 8px;
          height: 8px;
          background: #00ccff;
          border-radius: 50%;
          animation: typing 1.4s ease-in-out infinite;
        }
        
        .vee-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .vee-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .vee-tz-selector {
          position: absolute;
          top: 70px;
          right: 20px;
          background: ${isDark ? '#2a2a2a' : '#fff'};
          border: 1px solid ${isDark ? '#333' : '#e0e0e0'};
          border-radius: 12px;
          padding: 16px;
          width: 280px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 10001;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease;
        }
        
        .vee-tz-option {
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: ${isDark ? '#fff' : '#000'};
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }
        
        .vee-tz-option:hover {
          background: ${isDark ? '#333' : '#f5f5f5'};
        }
        
        .vee-tz-option.active {
          background: rgba(0, 102, 255, 0.15);
          color: #0066ff;
          font-weight: 600;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        
        /* Custom scrollbar */
        .vee-messages-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .vee-messages-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .vee-messages-container::-webkit-scrollbar-thumb {
          background: ${isDark ? '#444' : '#ccc'};
          border-radius: 3px;
        }
        
        @media (max-width: 768px) {
          .vee-chat-window {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }
          
          .vee-messages-container {
            padding: 16px;
          }
          
          .vee-chat-header {
            padding: 16px;
          }
          
          .vee-tz-selector {
            top: 60px;
            right: 10px;
            left: 10px;
            width: auto;
          }
        }
      `}</style>

      {!isOpen ? (
        <button className="vee-chat-button" onClick={handleOpenChatbot}>
          <IconChat size={28} />
          {unreadCount > 0 && (
            <div className="vee-unread-badge">{unreadCount}</div>
          )}
        </button>
      ) : (
        <>
          <div className="vee-chat-window">
            <div className="vee-chat-header">
              <div className="vee-header-content">
                <div className="vee-avatar">V</div>
                <div className="vee-header-text">
                  <h3>Vee AI Assistant</h3>
                  <p>{isSocketConnected ? '🟢 Connected' : '🔴 Connecting...'}</p>
                </div>
              </div>
              <div className="vee-header-actions">
                <button 
                  className="vee-theme-btn" 
                  onClick={toggleTheme}
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
                </button>
                <button 
                  className="vee-globe-btn" 
                  onClick={() => setShowTimezoneSelector(!showTimezoneSelector)}
                  title="Change timezone"
                >
                  <IconGlobe size={16} />
                </button>
                <button className="vee-close-btn" onClick={() => setIsOpen(false)}>
                  <IconX size={18} />
                </button>
              </div>
            </div>

            <div className="vee-messages-container" ref={messagesContainerRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`vee-message ${msg.sender}`}>
                  <div className="vee-message-avatar">
                    {msg.sender === "vee" ? "V" : msg.sender === "admin" ? "A" : "U"}
                  </div>
                  <div className="vee-message-content">
                    <div className="vee-message-bubble">{msg.text}</div>
                    {msg.links && msg.links.length > 0 && (
                      <div className="vee-message-links">
                        {msg.links.map((link, idx) => (
                          <button
                            key={idx}
                            className={`vee-message-link ${link.action === 'external' ? 'external' : ''}`}
                            onClick={() => handleLinkNavigation(link.url, link.action, link.data)}
                          >
                            {link.text}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.options && msg.options.length > 0 && (
                      <div className="vee-message-links">
                        {msg.options.map((option, idx) => (
                          <button
                            key={idx}
                            className="vee-message-link"
                            onClick={() => {
                              setInputValue(option);
                              setTimeout(() => handleSend(), 100);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {adminIsTyping && (
                <div className="vee-typing">
                  <div className="vee-message-avatar" style={{ background: 'linear-gradient(135deg, #8a2be2, #9370db)' }}>
                    A
                  </div>
                  <div className="vee-typing-dots">
                    <div className="vee-typing-dot"></div>
                    <div className="vee-typing-dot"></div>
                    <div className="vee-typing-dot"></div>
                  </div>
                  <span style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666', marginLeft: '8px' }}>
                    Admin is typing...
                  </span>
                </div>
              )}
              
              {isTyping && !adminHasJoined && (
                <div className="vee-typing">
                  <div className="vee-message-avatar" style={{ background: 'linear-gradient(135deg, #0066ff, #00ccff)' }}>
                    V
                  </div>
                  <div className="vee-typing-dots">
                    <div className="vee-typing-dot"></div>
                    <div className="vee-typing-dot"></div>
                    <div className="vee-typing-dot"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="vee-input-area">
              <div className="vee-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="vee-input"
                  placeholder={adminHasJoined ? "Chat with admin..." : "Type your message..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  autoFocus={isOpen}
                />
                <button
                  className="vee-send-btn"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  title="Send message"
                >
                  <IconSend />
                </button>
              </div>
            </div>
          </div>

          {showTimezoneSelector && (
            <div className="vee-tz-selector">
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: isDark ? '#fff' : '#000' }}>
                Select Your Timezone
              </h4>
              {availableTimezones.map((tz) => (
                <button
                  key={tz}
                  className={`vee-tz-option ${userTimezone === tz ? 'active' : ''}`}
                  onClick={() => handleTimezoneChange(tz)}
                >
                  {tz}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VeeAISmartChatbot;