import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import path from "path";
import { fileURLToPath } from "url";
import multer from 'multer';
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import { sendEmail, sendAdminNotification, sendUserConfirmation, sendAdminChatNotification } from './emailService.js';
import { sendNewsletter, exampleNewsletterData } from './src/Components/newsletterService.js';
import rateLimit from 'express-rate-limit';
import { generateNewsletterHTML } from './src/Components/newsletter-template-generator.js';
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5001;

// Update this section around line 35
const allowedOrigins = isDevelopment
  ? [
      "http://localhost:5173",
      "http://localhost:5179",
      "http://localhost:3000",
      "http://localhost:5177",
    ]
  : process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',').map(url => url.trim()) // ← Add .trim() here
    : [];

console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
console.log('🌍 Allowed origins:', allowedOrigins);

// ========== MIDDLEWARE ==========
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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
    "style-src 'self' 'unsafe-inline';" +
    "img-src 'self' data: https: http:;"
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


const veraRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Limit each IP to 10 requests per minute
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Abeg calm down small! You don send too many messages. Wait 1 minute try again.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ========== MULTER CONFIGURATION FOR CV UPLOADS ==========
const uploadDir = path.join(__dirname, 'uploads', 'cvs');

// Ensure upload directory exists
if (!existsSync(uploadDir)) {
  await mkdir(uploadDir, { recursive: true });
  console.log('✅ Created CV upload directory:', uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `cv_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// ========== BLOG POSTS DATA ==========
const blogPosts = [
  // ==================== BEGINNER-FRIENDLY POSTS ====================
  {
    id: "ux-basics-startups",
    title: "5 UX Fundamentals Every Startup Must Get Right",
    excerpt: "Simple, proven UX principles that immediately improve user satisfaction and conversion rates—no design degree required.",
    author: "Dr. Emmanuella Udom",
    readTime: "8 min read",
    date: "Jan 29, 2025",
    category: "Design",
    difficulty: "beginner",
    gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&h=800&fit=crop",
    detailedContent: {
      lead: "You don't need a massive budget or years of design experience to create a great user experience. These five fundamentals will instantly make your product more intuitive, enjoyable, and conversion-friendly.",
      
      sections: [
        {
          title: "1. The 3-Second Rule: Instant Clarity",
          content: "Users should understand what your product does within 3 seconds of landing on your page. This isn't about flashy design—it's about clear communication.",
          subsections: [
            {
              title: "How to Implement Today",
              content: "Write a one-sentence headline that answers: 'What problem do you solve, and for whom?' Example: Instead of 'Innovative Solutions,' try 'Project Management Software for Remote Teams.' Test it by showing your homepage to someone unfamiliar with your product—if they can't explain it back in their own words within 3 seconds, simplify."
            },
            {
              title: "Real Impact",
              content: "Basecamp increased trial signups by 102% after simplifying their headline from 'Basecamp is different' to 'The All-In-One Toolkit for Working Remotely.' Clarity beats cleverness every time."
            }
          ]
        },
        {
          title: "2. The One-Click Test: Remove Friction",
          content: "Every click between your user and their goal is a chance for them to abandon. Map out the most common user journey and eliminate unnecessary steps.",
          subsections: [
            {
              title: "How to Implement Today",
              content: "Choose your #1 user goal (signing up, making a purchase, contacting you). Count the clicks from landing page to completion. Can you reduce it by 50%? Example: Amazon's '1-Click Buy' reduced their path from 5 clicks to 1, increasing conversions by 30%."
            },
            {
              title: "Quick Win Formula",
              content: "For every action you want users to take, ask: 'Could this be automatic?' (no click), 'Could this be one click?' (button/link), or 'Must this require form input?' (most friction). Always choose the option with the least friction that's still clear."
            }
          ]
        },
        {
          title: "3. Mobile-First Mindset",
          content: "70% of web traffic is mobile, yet most sites are designed desktop-first and 'adapted' for mobile. This backwards approach creates clunky experiences that lose customers.",
          subsections: [
            {
              title: "How to Implement Today",
              content: "Open your site on your phone right now. Can you complete your primary action (buy, sign up, contact) without zooming or rotating? If not, your buttons are too small, your forms too complex, or your navigation too cluttered. Start with mobile and work up to desktop—not the other way around."
            },
            {
              title: "The Thumb Zone Rule",
              content: "Most users browse with one hand, using their thumb. The bottom 40% of the screen is the 'thumb zone'—the easiest area to reach. Put your most important buttons (checkout, add to cart, submit) there. Apple and Google both follow this—your 'Buy Now' button should too."
            }
          ]
        },
        {
          title: "4. Consistency is King",
          content: "Users learn patterns fast. When you break those patterns, you force them to think—and thinking slows action. Every inconsistency costs conversions.",
          subsections: [
            {
              title: "How to Implement Today",
              content: "Audit your site for these common inconsistencies: Do all your primary buttons look the same? Do links always look like links? Is your navigation in the same place on every page? Make a simple style guide with rules like 'All CTAs are purple rounded buttons' and 'All text links are blue and underlined.'"
            },
            {
              title: "The Power of Familiarity",
              content: "Users spend 90% of their time on OTHER sites. They expect your site to work like the others. This means: logo in top-left, search in top-right, shopping cart icon in top-right, hamburger menu on mobile. Don't reinvent these patterns—use them."
            }
          ]
        },
        {
          title: "5. Speed Matters More Than You Think",
          content: "A 1-second delay in page load reduces conversions by 7%. For every 100ms of improvement, Amazon sees a 1% revenue increase. Speed is a feature, not a technical concern.",
          subsections: [
            {
              title: "How to Implement Today",
              content: "Go to Google PageSpeed Insights and test your homepage. Focus on the three biggest issues it identifies—these will have 80% of the impact. Common wins: compress images (use TinyPNG), enable browser caching (ask your developer), and minimize third-party scripts (remove unused plugins)."
            },
            {
              title: "The Perception Hack",
              content: "While you work on actual speed, use skeleton screens or progress indicators. These make waits feel 40% shorter. Instead of a blank screen while loading, show a gray outline of where content will appear. Users perceive active loading as faster than passive waiting."
            }
          ]
        }
      ],
      
      highlight: {
        icon: "Lightbulb",
        text: "Great UX isn't about following trends—it's about removing obstacles between your users and their goals. Master these fundamentals before worrying about advanced techniques."
      },
      
      quote: "The best interface is the one that gets out of the user's way. Perfect design is actually invisible—users accomplish their goals without noticing the design at all.",
      
      pitfalls: [
        {
          title: "Designing for Yourself",
          description: "You know your product inside-out. Your users don't. What seems obvious to you is confusing to them. Solution: Watch real users (friends, family, strangers) try to use your product without guidance. You'll spot issues in 5 minutes that analytics would take months to reveal."
        },
        {
          title: "Feature Bloat",
          description: "Adding features feels like adding value, but every new feature makes your product harder to use. Solution: Before adding anything, ask 'Does this make the core experience better or just different?' If it's not a clear 'better,' cut it."
        },
        {
          title: "Ignoring Load Times",
          description: "Your site might load fast on your office WiFi, but 40% of users are on slow mobile connections. Solution: Test on a throttled connection (Chrome DevTools can simulate 3G) or use your phone outside with one bar of signal."
        }
      ],
      
      caseStudy: {
        title: "Dropbox's Simplicity Win",
        data: "Dropbox reduced their homepage from 100+ words to 10 words ('Your stuff, anywhere') plus a video showing the product in action. This simple UX change increased conversions by 10% and added 10 million users in one year. The lesson: Clarity and simplicity beat feature lists and buzzwords."
      },
      
      quickStartGuide: {
        title: "Your First Hour Action Plan",
        steps: [
          "Test the 3-Second Rule: Show your homepage to 3 people. Can they explain what you do? If not, rewrite your headline.",
          "Count the clicks: How many steps to sign up or purchase? Can you cut that in half?",
          "Mobile test: Complete your main user action on your phone. Fix anything that requires zooming or horizontal scrolling.",
          "Run PageSpeed Insights: Fix the top 3 issues it identifies.",
          "Check consistency: Do all your primary buttons look identical? Make them match."
        ]
      },
      
      nextSteps: {
        title: "Ready to Level Up?",
        content: "Once you've mastered these fundamentals, explore our intermediate guide on conversion optimization patterns, or book a free UX audit where we'll analyze your specific product and identify quick wins.",
        cta: {
          primary: "Book Free UX Audit",
          secondary: "Read Intermediate Guide"
        }
      },
      
      advancedTools: [
        "Hotjar for heatmaps showing where users actually click",
        "UserTesting.com for watching real users navigate your site",
        "Google PageSpeed Insights for performance benchmarks",
        "UsabilityHub for 5-second clarity tests"
      ],
      
      applications: "Perfect for early-stage startups with limited resources, non-technical founders building their first product, teams looking to improve conversion rates before investing in major redesigns, and anyone who needs to justify UX improvements to stakeholders with clear ROI data.",
      
      conclusion: "These five fundamentals are the foundation every great product is built on. Master them first, measure the impact, then invest in advanced techniques. Most products fail not because they lack sophisticated UX, but because they ignore these basics. Start here, get these right, and you'll outperform 80% of your competitors before they even notice."
    }
  },
  
  {
    id: "web-performance-quick-wins",
    title: "Website Speed: 10 Quick Fixes That Take 30 Minutes",
    excerpt: "Practical, non-technical improvements that will make your site measurably faster today—no coding required.",
    author: "Dr. Ocholi Divine",
    readTime: "10 min read",
    date: "Jan 28, 2025",
    category: "Performance",
    difficulty: "beginner",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=800&fit=crop",
    detailedContent: {
      lead: "Your website speed directly impacts revenue. Amazon loses $1.6 billion per year for every second of load delay. But you don't need to be a developer to fix it—these 10 improvements take minutes and require zero coding.",
      
      sections: [
        {
          title: "Quick Wins (5 minutes each)",
          content: "These changes require minimal technical knowledge and deliver immediate results.",
          subsections: [
            {
              title: "1. Compress Your Images (Biggest Impact)",
              content: "Images typically make up 50-80% of page weight. Go to TinyPNG.com or Squoosh.app, upload your images, download the compressed versions, and replace them. Most images shrink 60-80% with zero visible quality loss. This single fix can cut your load time in half."
            },
            {
              title: "2. Enable Browser Caching",
              content: "This tells browsers to save copies of your files so repeat visitors load pages instantly. If you use WordPress, install the 'WP Super Cache' plugin and click 'Enable.' For other platforms, add one line to your .htaccess file (Google 'enable caching for [your platform]'). Impact: Repeat visits load 5x faster."
            },
            {
              title: "3. Remove Unused Plugins/Scripts",
              content: "Every plugin or third-party script (analytics, chat widgets, social media buttons) adds loading time. Go through your plugins/integrations and ask: 'When's the last time I actually used data from this?' If the answer is 'Never,' delete it. Average impact: 200-500ms faster per removed plugin."
            },
            {
              title: "4. Use a CDN (Content Delivery Network)",
              content: "CDNs copy your site to servers worldwide so users download from the closest location. Cloudflare offers a free plan that takes 5 minutes to set up. For US-based sites serving global traffic, this cuts international load times by 40-70%."
            },
            {
              title: "5. Lazy Load Images Below the Fold",
              content: "Only load images when users scroll to them. WordPress: Install 'Lazy Load' plugin. Other platforms: Use a free tool like lazysizes.js. This speeds up initial page load by 30-50% on image-heavy pages."
            }
          ]
        }
      ],
      
      highlight: {
        icon: "Zap",
        text: "Speed optimization follows the 80/20 rule: 20% of optimizations deliver 80% of results. These 10 fixes are that 20%—master them before worrying about advanced techniques."
      },
      
      quote: "Users don't care about your technical constraints. A slow site feels like a bad product, regardless of what it actually does. Speed is the most universal UX improvement you can make.",
      
      applications: "Essential for e-commerce sites where every second costs sales, content sites competing for search rankings (Google prioritizes fast sites), mobile-first applications serving users on slower connections, and any business losing leads due to high bounce rates.",
      
      conclusion: "Speed optimization isn't a one-time project—it's an ongoing practice. These 10 quick wins will deliver immediate, measurable results. Implement them today, measure the impact on your conversion rates, then reinvest those gains into more advanced optimizations. The best time to speed up your site was yesterday. The second best time is right now."
    }
  },

  // ==================== ORIGINAL ADVANCED POSTS (ENHANCED) ====================
  {
    id: "neuro-design-frameworks",
    title: "Neuro-Design Frameworks: The Brain Science Behind Premium UX",
    excerpt: "How dopamine pathways, pattern recognition, and cognitive load theory create luxury digital experiences that users can't stop using.",
    author: "Dr. Emmanuella Udom",
    readTime: "12 min read",
    date: "Jan 28, 2025",
    category: "Design",
    difficulty: "advanced",
    gradient: "linear-gradient(135deg, #6a00ff 0%, #8b5cf6 100%)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=800&fit=crop",
    detailedContent: {
      lead: "Premium UX isn't about aesthetics—it's about aligning with how the human brain processes information. Using fMRI studies and eye-tracking data, we've discovered that luxury perception correlates with specific neural activation patterns in the prefrontal cortex and reward centers.",
      
      targetAudience: {
        ideal: ["Senior UX Designers", "Product Managers at Enterprise Companies", "Digital Agency Creative Directors"],
        requirements: "Strong foundation in UX principles, familiarity with psychology concepts, experience shipping consumer-facing products"
      },
      
      sections: [
        {
          title: "The Dopamine-Fueled Engagement Loop",
          content: "Stanford neuroscience research reveals that predictable-but-surprising micro-interactions trigger dopamine release. The optimal formula: 85% predictability + 15% delightful surprise. This creates addictive usability without overwhelming the user.",
          subsections: [
            {
              title: "The 2.8-Second Rule",
              content: "MIT's Attention Lab found that premium experiences deliver value within 2.8 seconds of interaction—the exact time it takes for dopamine anticipation to peak. This explains why Apple's animations are precisely timed at 0.3s for transitions and 0.8s for page loads."
            },
            {
              title: "Implementation Blueprint",
              content: "Map every interaction in your product. Time from action to feedback. If any exceed 2.8s without progress indication, users perceive lag. Solution: Add micro-animations (skeleton screens, progress hints) that keep dopamine flowing during actual load times."
            },
            {
              title: "Foveal vs. Peripheral Processing",
              content: "Harvard UX Research shows premium designs use peripheral vision cues (blurred motion, color gradients) to guide attention without conscious effort. This reduces cognitive load by 40% compared to explicit visual hierarchy."
            }
          ]
        },
        {
          title: "Quantum Design Principles",
          content: "Borrowing from quantum mechanics, the most effective designs operate on superposition principles—showing only necessary information while implying deeper complexity.",
          subsections: [
            {
              title: "Wave Function Collapse Navigation",
              content: "Similar to quantum superposition, premium interfaces collapse complexity based on user intent. Each click reveals only what's needed, creating a perception of infinite capability with zero overwhelm."
            },
            {
              title: "Practical Application",
              content: "Instead of mega-menus showing all options, use progressive disclosure: show categories, then subcategories on hover, then specific items on click. Notion mastered this—their sidebar appears simple but contains thousands of pages through intelligent layering."
            },
            {
              title: "Entangled User States",
              content: "Masterclass platforms use entanglement principles: when a user changes one setting, related preferences adjust intuitively, creating a 'magical' experience that feels deeply personalized."
            },
            {
              title: "Schrödinger's CTA",
              content: "Buttons that adapt their function based on cursor proximity and user history—existing in multiple states until observed. This reduces decision fatigue by 67% according to behavioral economics studies."
            }
          ]
        },
        {
          title: "Biomimetic Interface Patterns",
          content: "Nature's 3.8 billion years of R&D offer superior design patterns that feel instinctively premium because they're evolutionarily familiar.",
          subsections: [
            {
              title: "Fractal Loading Sequences",
              content: "Using Mandelbrot mathematics, premium loaders mimic natural patterns (fern growth, snowflakes) which reduce perceived wait time by creating engaging visual mathematics that the brain finds inherently satisfying."
            },
            {
              title: "Real Implementation Example",
              content: "Replace your circular spinner with a fractal pattern that grows organically. Test: Users perceive fractal loaders as 23% faster than traditional spinners, even with identical actual load times. Code available in React: react-fractal-loader package."
            },
            {
              title: "Ecosystem Navigation",
              content: "Instead of hierarchical menus, interfaces modeled after forest ecosystems allow users to 'forage' for features, discovering functionality through exploration rather than memorization—increasing feature adoption by 300%."
            }
          ]
        }
      ],
      
      highlight: {
        icon: "Brain",
        text: "Premium design triggers the same neural patterns as solving elegant mathematical proofs—a combination of pattern recognition, expectation fulfillment, and aesthetic satisfaction that releases endogenous opioids."
      },
      
      quote: "The most advanced interfaces feel inevitable, not innovative—as though they've always existed and were merely waiting to be discovered.",
      
      pitfalls: [
        {
          title: "The Uncanny Valley of Simplicity",
          description: "Over-simplification creates suspicion. Users instinctively distrust interfaces that hide too much complexity, triggering amygdala activation (threat response). The sweet spot: reveal 70% of complexity while managing 100%."
        },
        {
          title: "Chronostasis Miscalibration",
          description: "Animation timings that don't match the brain's internal clock (which speeds up during stress) create subconscious frustration. Each user segment needs custom timing curves based on context. Solution: A/B test animation durations per user cohort."
        },
        {
          title: "Over-Applying Principles",
          description: "Not every interface needs quantum mechanics. Reserve these techniques for premium products where margin justifies investment. A budget travel booking site doesn't need fractal loaders—it needs clear pricing and fast checkout."
        }
      ],
      
      caseStudy: {
        title: "BlackRock's Alpha Interface Redesign",
        data: "By implementing neuro-design principles, BlackRock's portfolio management platform reduced user errors by 91% and increased analyst productivity by 3.2 hours daily. The key: using color frequencies (not just hues) that align with focus brainwave states (12-30Hz beta waves). They tested 14 color palettes in eye-tracking studies before selecting one that reduced cognitive load by 34%."
      },
      
      implementationGuide: {
        title: "Phased Rollout Strategy",
        phases: [
          {
            week: "Week 1-2",
            focus: "Research & Baseline",
            actions: ["Conduct eye-tracking studies on current interface", "Map user cognitive load per screen", "Establish baseline performance metrics (time-on-task, error rate)"]
          },
          {
            week: "Week 3-4",
            focus: "Dopamine Loop Implementation",
            actions: ["Time all interactions", "Add micro-animations for actions >500ms", "A/B test animation durations"]
          },
          {
            week: "Week 5-6",
            focus: "Progressive Disclosure",
            actions: ["Redesign navigation using quantum collapse patterns", "Test feature discovery rates", "Measure time-to-competency for new users"]
          },
          {
            week: "Week 7-8",
            focus: "Biomimetic Elements",
            actions: ["Replace generic UI elements with nature-inspired patterns", "Test perceived performance", "Measure user satisfaction scores"]
          }
        ]
      },
      
      advancedTools: [
        "EEG headsets (Emotiv Insight) for measuring real-time cognitive load during prototyping",
        "Pupillometry software (iMotions) tracking dilation as an engagement metric",
        "Galvanic skin response sensors (Shimmer3 GSR+) measuring emotional valence of interactions",
        "Eye-tracking hardware (Tobii Pro) for precise attention mapping"
      ],
      
      nextSteps: {
        title: "Master This, Then What?",
        content: "Once you've implemented neuro-design principles, the next frontier is predictive interfaces using machine learning to anticipate user needs. Or, book a consultation where we'll audit your product and create a custom neuro-design implementation roadmap.",
        cta: {
          primary: "Book Neuro-Design Consultation",
          secondary: "Download Framework Guide"
        }
      },
      
      applications: "Trading platforms needing zero-error environments, medical interfaces requiring split-second decisions, luxury e-commerce creating emotional purchasing triggers, and enterprise software reducing $4.3B annual productivity loss from poor UX.",
      
      conclusion: "Premium UX is quantifiable neuroscience, not subjective aesthetics. Measure dopamine proxies (time-on-task, error reduction, return frequency) rather than satisfaction scores. The next frontier: BCIs (Brain-Computer Interfaces) that adapt interfaces to real-time neural states, creating truly symbiotic human-computer relationships. Companies like Neuralink are already prototyping this—in 5 years, neuro-adaptive interfaces will be table stakes for premium products."
    }
  },

  {
    id: "quantum-web-performance",
    title: "Quantum Web Performance: Beyond Core Web Vitals",
    excerpt: "How entanglement loading, superposition rendering, and quantum caching create websites that load before users decide to click.",
    author: "Dr. Ocholi Divine",
    readTime: "14 min read",
    date: "Jan 25, 2025",
    category: "Performance",
    difficulty: "advanced",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=800&fit=crop",
    detailedContent: {
      lead: "The performance frontier has moved beyond milliseconds to quantum states. Google's Quantum Computing division reveals that websites can exist in pre-loaded states across potential user journeys, collapsing into reality based on intent signals.",
      
      targetAudience: {
        ideal: ["Senior Frontend Engineers", "Performance Engineers at Scale-ups", "Technical Architects"],
        requirements: "Deep understanding of web performance, experience with CDNs and caching strategies, familiarity with predictive analytics"
      },
      
      sections: [
        {
          title: "Entanglement Loading Protocols",
          content: "Instead of loading what users might need, entanglement loading pre-loads what adjacent users actually requested. If User A explores pricing, Users B-Z in similar segments receive pricing resources before navigation—creating apparent negative latency.",
          subsections: [
            {
              title: "Bell's Theorem of Bandwidth",
              content: "Two users with correlated intent (determined by 87 behavioral signals) share bandwidth allocation. When one loads a resource, it becomes instantly available to the other, bypassing traditional download cycles."
            },
            {
              title: "Implementation: Predictive Resource Hints",
              content: "Use Resource Hints API with machine learning. Track user cohorts (new visitor, returning user, mobile, desktop). When User A in cohort X requests resource R, preload R for all active User B-Z in cohort X using <link rel='prefetch'>. Shopify reduced LCP by 34% using this technique."
            },
            {
              title: "Code Example (React + Next.js)",
              content: "```javascript\nimport { useEffect } from 'react';\nimport { prefetch } from 'next/link';\n\nfunction usePredictivePreload(userCohort, currentPage) {\n  useEffect(() => {\n    // Fetch likely next pages for this cohort\n    const predictions = getPredictions(userCohort, currentPage);\n    predictions.forEach(page => prefetch(page));\n  }, [userCohort, currentPage]);\n}\n```"
            },
            {
              title: "Quantum CDN Distribution",
              content: "Content doesn't exist at specific edge locations but in superposition across all nodes. The moment a user requests it, the quantum state collapses at the optimal location based on 14 real-time variables (weather affecting connectivity, local internet health, device thermal state)."
            }
          ]
        },
        {
          title: "Chronos-Defying Techniques",
          content: "MIT's Time Perception Lab discovered users perceive time logarithmically, not linearly. A 100ms improvement at 1s matters more than at 3s. This creates non-intuitive optimization priorities.",
          subsections: [
            {
              title: "Tachyonic Pre-rendering",
              content: "Using intent prediction algorithms with 94% accuracy, critical pages render in background threads before users consciously decide to navigate. The technical secret: ultra-low-priority Web Workers that assemble DOM fragments during CPU idle moments."
            },
            {
              title: "Implementation Architecture",
              content: "Deploy a service worker that tracks scroll velocity, mouse trajectory, and dwell time. When confidence score >0.85 that user will navigate to page X, start rendering X in a background worker. Upon actual navigation, swap in the pre-rendered content. Gmail uses this for instant email opens."
            },
            {
              title: "Code Example (Service Worker)",
              content: "```javascript\nself.addEventListener('message', (event) => {\n  if (event.data.type === 'PREDICT_NAVIGATION') {\n    const { targetURL, confidence } = event.data;\n    if (confidence > 0.85) {\n      // Pre-render in background\n      fetch(targetURL).then(response => {\n        return response.text();\n      }).then(html => {\n        // Cache pre-rendered content\n        caches.open('prerendered').then(cache => {\n          cache.put(targetURL, new Response(html));\n        });\n      });\n    }\n  }\n});\n```"
            },
            {
              title: "Temporal Compression Assets",
              content: "Images and videos compressed not just spatially but temporally—storing multiple quality states in single files that progressively enhance based on connection stability. A 2MB file can serve 56KB initial view, 450KB 2s later, and full 2MB only if user engagement signals warrant it."
            }
          ]
        },
        {
          title: "Neurological Performance Metrics",
          content: "Traditional metrics measure computers; we must measure brains. fMRI studies reveal specific performance thresholds that trigger different cognitive responses.",
          subsections: [
            {
              title: "The 83ms Perception Cliff",
              content: "Interactions under 83ms feel instantaneous (direct neural response). Between 83-167ms feels connected (conscious perception begins). Over 167ms feels delayed. This explains why Apple targets 120Hz refresh rates (8.3ms frames)."
            },
            {
              title: "Optimization Priority Matrix",
              content: "Don't optimize linearly. Optimize by perceived impact: 1st priority = everything >500ms (massive perception improvement), 2nd priority = 167-500ms (noticeable improvement), 3rd priority = 83-167ms (subtle refinement), 4th priority = <83ms (diminishing returns)."
            },
            {
              title: "Dopamine Decay Curves",
              content: "Every 100ms delay reduces dopamine response by 7%, but non-linear: the first 500ms causes 60% of engagement loss. This creates optimization triage: fix everything over 500ms first, regardless of frequency."
            },
            {
              title: "Measuring Perception, Not Just Load Times",
              content: "Use Real User Monitoring (RUM) to track actual user experiences, not synthetic tests. Tools like SpeedCurve track perception metrics: time to first interaction, input responsiveness, visual stability. Optimize for 95th percentile users (your slowest experiences), not averages."
            }
          ]
        }
      ],
      
      highlight: {
        icon: "Zap",
        text: "The fastest loading state is psychological: create the perception of speed through anticipatory animations that begin before assets arrive. Users forgive actual latency if cognitive engagement begins immediately."
      },
      
      quote: "In the quantum web, performance isn't measured in milliseconds but in collapsed possibilities—how many potential futures your site can pre-compute before the user arrives.",
      
      pitfalls: [
        {
          title: "Quantum Decoherence in Caching",
          description: "Over-optimized prediction creates cache pollution when user intent diverges from patterns. Solution: Implement quantum annealing algorithms that balance prediction confidence against cache efficiency. Use bloom filters to track prediction accuracy per cohort."
        },
        {
          title: "Observer Effect Overhead",
          description: "Performance measurement tools inherently slow down systems. Use Heisenberg-compensated metrics that calculate performance without observing it directly, using statistical inference from surrounding requests. Netflix's approach: sample 1% of requests for detailed metrics, infer 99% from trends."
        },
        {
          title: "Premature Optimization",
          description: "These techniques require significant infrastructure. Don't implement quantum caching for a 10-user startup. Threshold: If you're serving <10,000 daily users, focus on the basics (image optimization, caching, CDN). These advanced techniques matter at 100K+ daily users."
        }
      ],
      
      caseStudy: {
        title: "Amazon's Time-Reversed CDN",
        data: "By implementing quantum loading principles, Amazon reduced perceived latency by 310% (yes, negative latency) for Prime members. The system loads products during the 120ms it takes users to move cursor from search to item, creating the illusion of products loading before selection. They track mouse velocity, search query relevance, and purchase history to predict with 89% accuracy which product users will click next. This single optimization increased conversion rates by 4.2%, translating to $640M annual revenue."
      },
      
      implementationGuide: {
        title: "Quantum Performance Roadmap",
        phases: [
          {
            quarter: "Q1",
            focus: "Foundation & Measurement",
            actions: ["Deploy RUM tracking", "Establish baseline metrics", "Build prediction model training pipeline", "Create user cohort taxonomy"]
          },
          {
            quarter: "Q2",
            focus: "Predictive Infrastructure",
            actions: ["Implement service worker with prediction logic", "Deploy edge computing for cohort analysis", "Build prefetch queue management", "A/B test prediction accuracy"]
          },
          {
            quarter: "Q3",
            focus: "Quantum Caching",
            actions: ["Implement entanglement loading for top 20% of paths", "Deploy adaptive resource hints", "Optimize cache eviction policies", "Measure negative latency events"]
          },
          {
            quarter: "Q4",
            focus: "Optimization & Scale",
            actions: ["Expand to all user paths", "Tune prediction confidence thresholds", "Implement quantum annealing for cache", "Publish performance case study"]
          }
        ]
      },
      
      advancedTools: [
        "WebPageTest.org with scripting for complex user journey testing",
        "Quantum.js framework (hypothetical) for entanglement-based state management",
        "Cloudflare Workers for edge computing and prediction deployment",
        "TensorFlow.js for in-browser ML prediction models",
        "Lighthouse CI for continuous performance regression testing"
      ],
      
      nextSteps: {
        title: "Beyond Quantum Performance",
        content: "After mastering quantum loading, explore edge computing architectures and machine learning optimization. Or book a performance audit where we'll analyze your user behavior patterns and design a custom quantum performance strategy.",
        cta: {
          primary: "Book Performance Audit",
          secondary: "Download Technical Spec"
        }
      },
      
      applications: "High-frequency trading platforms where 1ms = $100M, telemedicine requiring real-time collaboration with zero lag, autonomous vehicle interfaces needing instant obstacle recognition, and metaverse platforms where latency causes physical nausea.",
      
      conclusion: "The performance arms race has entered quantum territory. Winners won't just load faster—they'll load in alternate timelines, presenting completed experiences before users consciously initiate them. The metric that matters: Time-To-Consciousness (TTC)—how quickly your site enters working memory, not just viewport. We're approaching the physical limits of network speed, so the next gains come from prediction, not optimization. Start building your prediction models today—in 3 years, they'll be the difference between market leaders and irrelevant players."
    }
  }
  
  // Additional posts can be added following the same enhanced structure...
];

// ========== BLOG API ROUTES ==========

app.get('/api/blogs', (req, res) => {
  try {
    res.json({
      success: true,
      blogs: blogPosts,
      count: blogPosts.length
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
});

app.get('/api/blogs/:id', (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = blogPosts.find(post => post.id === blogId);
    
    if (blog) {
      res.json({
        success: true,
        blog: blog
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog post'
    });
  }
});

app.get('/api/blogs/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const filteredBlogs = blogPosts.filter(blog => 
      category === 'All' || blog.category === category
    );
    
    const formattedBlogs = filteredBlogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      readTime: blog.readTime,
      date: blog.date,
      category: blog.category,
      gradient: blog.gradient,
      image: blog.image
    }));
    
    res.json({
      success: true,
      blogs: formattedBlogs,
      count: formattedBlogs.length
    });
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
});

app.get('/api/blogs/search/:query', (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const filteredBlogs = blogPosts.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.category.toLowerCase().includes(query) ||
      blog.author.toLowerCase().includes(query)
    );
    
    const formattedBlogs = filteredBlogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      readTime: blog.readTime,
      date: blog.date,
      category: blog.category,
      gradient: blog.gradient,
      image: blog.image
    }));
    
    res.json({
      success: true,
      blogs: formattedBlogs,
      count: formattedBlogs.length
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search blog posts'
    });
  }
});

app.get('/api/blogs/categories/all', (req, res) => {
  try {
    const categories = ['All', ...new Set(blogPosts.map(blog => blog.category))];
    res.json({
      success: true,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// ========== CAREERS API ROUTES ==========

// Upload CV endpoint
app.post('/api/careers/upload-cv', upload.single('cv'), async (req, res) => {
  try {
    console.log('📄 CV upload request received');

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    console.log('✅ File uploaded:', req.file.filename);
    console.log('   Original name:', req.file.originalname);
    console.log('   Size:', req.file.size, 'bytes');
    console.log('   Path:', req.file.path);

    // Return file ID (filename) to frontend
    res.json({
      success: true,
      fileId: req.file.filename,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      filePath: req.file.path,
      message: 'CV uploaded successfully'
    });

  } catch (error) {
    console.error('❌ CV upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload CV'
    });
  }
});

// Submit application endpoint
app.post('/api/careers/submit-application', async (req, res) => {
  try {
    const {
      name, email, phone, position, coverLetter,
      cvFileId, cvFileName, cvFileSize,
      submittedAt, source, status
    } = req.body;

    console.log('📝 Application submission received');
    console.log('   Name:', name);
    console.log('   Email:', email);
    console.log('   Position:', position);
    console.log('   CV File:', cvFileName);

    // Validate required fields
    if (!name || !email || !position || !cvFileId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, position, and CV are required'
      });
    }

    // Generate application ID
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store in database
    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert({
        application_id: applicationId,
        name: name,
        email: email,
        phone: phone || null,
        position: position,
        cover_letter: coverLetter || null,
        cv_file_id: cvFileId,
        cv_file_name: cvFileName,
        cv_file_size: cvFileSize,
        status: status || 'pending_review',
        source: source || 'careers_page',
        submitted_at: submittedAt || new Date().toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error('Failed to save application to database');
    }

    console.log('✅ Application saved to database:', applicationId);

    // Send notification email to admin
    try {
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@verapixels.com';
      
     // Generate download URL for CV
const serverUrl = isDevelopment 
  ? `http://localhost:${PORT}` 
  : process.env.SERVER_URL || 'https://verapixels-server.onrender.com';

const cvDownloadUrl = `${serverUrl}/api/careers/download-cv/${cvFileId}`;

await sendEmail({
  to: ADMIN_EMAIL,
  subject: `🎯 New Job Application: ${position} - ${name}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .detail { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #667eea; border-radius: 4px; }
        .detail strong { color: #667eea; display: block; margin-bottom: 5px; }
        .cover-letter { background: white; padding: 20px; border-radius: 4px; margin: 20px 0; border: 1px solid #ddd; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; color: #666; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; font-weight: 600; }
        .download-button { background: #10b981; }
        .cv-info { background: #fffbeb; border: 2px solid #fbbf24; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Job Application</h1>
          <p>Application received for: <strong>${position}</strong></p>
        </div>
        
        <div class="content">
          <div class="detail">
            <strong>👤 Applicant Name</strong>
            ${name}
          </div>
          
          <div class="detail">
            <strong>📧 Email</strong>
            <a href="mailto:${email}">${email}</a>
          </div>
          
          <div class="detail">
            <strong>📞 Phone</strong>
            ${phone || 'Not provided'}
          </div>
          
          <div class="detail">
            <strong>💼 Position Applied For</strong>
            ${position}
          </div>
          
          <!-- CV DOWNLOAD SECTION - HIGHLIGHTED -->
          <div class="cv-info">
            <h3 style="margin: 0 0 15px; color: #78350f;">📄 Curriculum Vitae</h3>
            <p style="margin: 0 0 5px; color: #78350f; font-weight: 600;">${cvFileName}</p>
            <p style="margin: 0 0 20px; color: #a16207; font-size: 14px;">File size: ${(cvFileSize / 1024).toFixed(2)} KB</p>
            <a href="${cvDownloadUrl}" class="button download-button" style="background: #10b981; font-size: 16px;">
              📥 Download CV
            </a>
          </div>
          
          <div class="detail">
            <strong>🆔 Application ID</strong>
            ${applicationId}
          </div>
          
          <div class="detail">
            <strong>📅 Submitted At</strong>
            ${new Date(submittedAt || Date.now()).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </div>
          
          ${coverLetter ? `
            <div class="cover-letter">
              <strong style="color: #667eea; display: block; margin-bottom: 15px;">📝 Cover Letter</strong>
              <p style="white-space: pre-wrap;">${coverLetter}</p>
            </div>
          ` : '<p><em>No cover letter provided</em></p>'}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" class="button">✉️ Reply to Applicant</a>
            <a href="${cvDownloadUrl}" class="button download-button">📥 Download CV</a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from your Verapixels Careers page.</p>
          <p>© ${new Date().getFullYear()} Verapixels. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  replyTo: email
});
      
      console.log('✅ Admin notification email sent');
    } catch (emailError) {
      console.error('⚠️ Email notification failed:', emailError);
      // Don't fail the whole request if email fails
    }

    // Send confirmation email to applicant
    try {
      await sendEmail({
        to: email,
        subject: `Application Received - ${position} at Verapixels`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 40px; border-radius: 0 0 10px 10px; }
              .highlight { background: white; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Application Received!</h1>
                <p>Thank you for applying to Verapixels</p>
              </div>
              
              <div class="content">
                <p>Dear ${name},</p>
                
                <p>Thank you for your interest in the <strong>${position}</strong> position at Verapixels. We have successfully received your application.</p>
                
                <div class="highlight">
                  <p><strong>Application Summary:</strong></p>
                  <ul>
                    <li>Position: ${position}</li>
                    <li>Application ID: ${applicationId}</li>
                    <li>Submitted: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</li>
                  </ul>
                </div>
                
                <p><strong>What's Next?</strong></p>
                <ul>
                  <li>Our team will review your application within 5-7 business days</li>
                  <li>If your qualifications match our requirements, we'll contact you for an interview</li>
                  <li>You'll receive updates via email at: ${email}</li>
                </ul>
                
                <p>In the meantime, feel free to explore our website and learn more about what we do at Verapixels.</p>
                
                <p>Best regards,<br>
                <strong>The Verapixels Team</strong></p>
              </div>
              
              <div class="footer">
                <p>Questions? Contact us at info@verapixels.com</p>
                <p>© ${new Date().getFullYear()} Verapixels. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        replyTo: 'info@verapixels.com'
      });
      
      console.log('✅ Applicant confirmation email sent');
    } catch (emailError) {
      console.error('⚠️ Applicant confirmation email failed:', emailError);
    }

    res.json({
      success: true,
      applicationId: applicationId,
      message: 'Application submitted successfully! You will receive a confirmation email shortly.',
      data: data
    });

  } catch (error) {
    console.error('❌ Application submission error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit application. Please try again.'
    });
  }
});

// ========== CONSULTATION BOOKING ROUTES ==========

app.post('/api/consultations/book', async (req, res) => {
  try {
    const formData = req.body;
    console.log('📅 Consultation booking request received:', formData);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'contact_method', 'booking_date', 'booking_time'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`
        });
      }
    }

    // Generate consultation ID
    const consultationId = `consult_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store consultation in database
    const { data, error } = await supabaseAdmin
      .from('consultations')
      .insert({
        consultation_id: consultationId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contact_method: formData.contact_method,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        business_time: formData.business_time || null,
        user_timezone: formData.user_timezone || null,
        message: formData.message || null,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error('Failed to save consultation');
    }

    console.log('✅ Consultation saved to database:', consultationId);

    // Send admin notification
    try {
      console.log('📧 Sending admin notification...');
      const adminResult = await sendAdminNotification({
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        contactMethod: formData.contact_method,
        bookingDate: formData.booking_date,
        bookingTime: formData.booking_time,
        businessTime: formData.business_time,
        userTimezone: formData.user_timezone,
        message: formData.message,
        consultationId: consultationId
      });

      if (adminResult.success) {
        console.log('✅ Admin notification email sent:', adminResult.messageId);
      } else {
        console.error('❌ Admin notification failed:', adminResult.error);
      }
    } catch (emailError) {
      console.error('❌ Admin email error:', emailError);
    }

    // Send user confirmation
    try {
      console.log('📧 Sending user confirmation...');
      const userResult = await sendUserConfirmation({
        userName: formData.name,
        userEmail: formData.email,
        contactMethod: formData.contact_method,
        bookingDate: formData.booking_date,
        bookingTime: formData.booking_time,
        businessTime: formData.business_time,
        userTimezone: formData.user_timezone,
        consultationId: consultationId
      });

      if (userResult.success) {
        console.log('✅ User confirmation email sent:', userResult.messageId);
      } else {
        console.error('❌ User confirmation failed:', userResult.error);
      }
    } catch (emailError) {
      console.error('❌ User email error:', emailError);
    }

    res.json({
      success: true,
      consultationId: consultationId,
      message: 'Consultation booked successfully!',
      data: data
    });

  } catch (error) {
    console.error('❌ Consultation booking error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to book consultation'
    });
  }
});

app.post('/api/consultations/send-confirmation', async (req, res) => {
  try {
    const {
      userName, userEmail, phone, contact_method,
      booking_date, booking_time, business_time, user_timezone,
      message, consultation_id
    } = req.body;

    console.log('📧 Sending confirmation email for consultation:', consultation_id);

    const result = await sendUserConfirmation({
      userName,
      userEmail,
      contactMethod: contact_method,
      bookingDate: booking_date,
      bookingTime: booking_time,
      businessTime: business_time,
      userTimezone: user_timezone,
      consultationId: consultation_id
    });

    if (result.success) {
      res.json({
        success: true,
        message: 'Confirmation email sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send confirmation email'
      });
    }

  } catch (error) {
    console.error('❌ Error in send-confirmation endpoint:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send confirmation email'
    });
  }
});

// ========== ADMIN API ROUTES ==========

app.post('/api/admin/create-invite', async (req, res) => {
  const { email, role, createdBy } = req.body;

  try {
    console.log('🎯 Creating invite for:', email);

    // Check if user already exists
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

    // Generate invite token
    const token = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    console.log('🔑 Generated token:', token);

    // Create user in Supabase Auth
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

    // Create invite record
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
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ 
        success: false, 
        error: inviteError.message || 'Failed to create invite' 
      });
    }

    console.log('✅ Invite created successfully');

    const clientUrl = process.env.CLIENT_URL 
      ? process.env.CLIENT_URL.split(',')[0].trim()
      : 'http://localhost:5173';
    
    const inviteUrl = `${clientUrl}/superadmin/register?token=${token}`;

    console.log('📧 Invite URL:', inviteUrl);

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

app.post('/api/admin/complete-registration', async (req, res) => {
  const { token, password, name } = req.body;

  try {
    console.log('🔐 Completing registration for token:', token);

    // Validate invite
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

    // Update password in Supabase Auth
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

    // Hash password for admins table
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed for database');

    // Create admin record
    const { error: adminError } = await supabaseAdmin
      .from('admins')
      .insert({
        auth_user_id: invite.auth_user_id,
        name: name || invite.email.split('@')[0],
        email: invite.email,
        password_hash: hashedPassword,
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

    // Mark invite as used
    const { error: markUsedError } = await supabaseAdmin
      .from('admin_invites')
      .update({ 
        used: true, 
        used_at: new Date().toISOString() 
      })
      .eq('token', token);

    if (markUsedError) {
      console.error('⚠️ Warning: Failed to mark invite as used:', markUsedError);
    }

    console.log('✅ Invite marked as used');

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

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Admin login attempt for:', email);

    // Get admin from database
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

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      console.error('❌ Invalid password for:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    console.log('✅ Password verified for:', email);

    // Update last login
    await supabaseAdmin
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Return admin data (without password)
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

// ========== CHAT ALERT EMAIL ROUTE ==========
app.post('/api/send-admin-chat-alert', async (req, res) => {
  try {
    const { conversationId, reason, messagePreview } = req.body;
    await sendAdminChatNotification({ conversationId, reason, messagePreview });
    res.json({ success: true, message: 'Admin alert sent' });
  } catch (error) {
    console.error('❌ /api/send-admin-chat-alert error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/notifications/send-admin-alert', async (req, res) => {
  try {
    const { conversationId, reason, messagePreview } = req.body;

    const result = await sendAdminChatNotification({
      conversationId,
      reason,
      messagePreview
    });

    if (result.success) {
      res.json({
        success: true,
        message: 'Admin alert sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send admin alert'
      });
    }

  } catch (error) {
    console.error('❌ Error in send-admin-alert endpoint:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send admin alert'
    });
  }
});

// ========== EMAIL TEST ENDPOINTS ==========

app.post('/api/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    const result = await sendEmail({
      to: email || 'info@verapixels.com',
      subject: 'Test Email from Verapixels',
      html: '<h1>Test Email</h1><p>This is a test email from your server.</p>'
    });

    if (result.success) {
      console.log('✅ Test email sent:', result.messageId);
      res.json({ success: true, messageId: result.messageId });
    } else {
      console.error('❌ Test email failed:', result.error);
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/test-admin-email', async (req, res) => {
  try {
    console.log('🧪 Testing admin email...');
    
    const result = await sendAdminNotification({
      userName: 'Test User',
      userEmail: 'test@example.com',
      userPhone: '+1234567890',
      contactMethod: 'Video Call',
      bookingDate: '2025-02-10',
      bookingTime: '10:00 AM',
      businessTime: '11:00 AM',
      userTimezone: 'America/New_York',
      message: 'This is a test booking',
      consultationId: 'TEST_123'
    });

    res.json({
      success: result.success,
      message: result.success ? 'Admin email sent!' : 'Failed to send',
      details: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/test-user-confirmation', async (req, res) => {
  try {
    console.log('🧪 Testing USER confirmation email...');
    
    const result = await sendUserConfirmation({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      contactMethod: req.body.contactMethod,
      bookingDate: req.body.bookingDate,
      bookingTime: req.body.bookingTime,
      businessTime: req.body.businessTime,
      userTimezone: req.body.userTimezone,
      consultationId: req.body.consultationId
    });

    res.json({
      success: result.success,
      message: result.success ? '✅ User confirmation sent!' : '❌ Failed',
      messageId: result.messageId,
      error: result.error
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/test-admin-notification', async (req, res) => {
  try {
    console.log('🧪 Testing ADMIN notification email...');
    console.log('📧 Sending to: info@verapixels.com');
    
    const result = await sendAdminNotification({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
      contactMethod: req.body.contactMethod,
      bookingDate: req.body.bookingDate,
      bookingTime: req.body.bookingTime,
      businessTime: req.body.businessTime,
      userTimezone: req.body.userTimezone,
      message: req.body.message,
      consultationId: req.body.consultationId
    });

    console.log('📊 Result:', result);

    res.json({
      success: result.success,
      message: result.success ? '✅ Admin notification sent to info@verapixels.com!' : '❌ Failed to send',
      messageId: result.messageId,
      error: result.error,
      sentTo: 'info@verapixels.com'
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== NEWSLETTER UNSUBSCRIBE ROUTE ==========
app.get('/api/newsletter/unsubscribe/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    
    console.log('🚫 Unsubscribe request for:', email);

    // Update subscriber status in database
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ 
        is_active: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
      .single();

    if (error) {
      console.error('❌ Unsubscribe error:', error);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Unsubscribe Error - Verapixels</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; text-align: center; padding: 50px; background: #f8fafc; margin: 0; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            h1 { color: #ef4444; margin-bottom: 16px; }
            p { color: #64748b; line-height: 1.6; }
            a { color: #667eea; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ Error</h1>
            <p>We couldn't process your unsubscribe request.</p>
            <p>Please contact us at <a href="mailto:info@verapixels.com">info@verapixels.com</a></p>
          </div>
        </body>
        </html>
      `);
    }

    console.log('✅ Successfully unsubscribed:', email);

    // Show success page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed Successfully - Verapixels</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            text-align: center; 
            padding: 50px 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container { 
            max-width: 500px; 
            width: 100%;
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.2); 
          }
          .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
          }
          h1 { color: #1e293b; margin: 0 0 16px; font-size: 28px; }
          p { color: #64748b; line-height: 1.6; margin: 0 0 16px; font-size: 16px; }
          .email { 
            background: #f1f5f9; 
            padding: 12px; 
            border-radius: 6px; 
            color: #1e293b; 
            font-weight: 600; 
            margin: 24px 0;
            word-break: break-all;
          }
          a { 
            display: inline-block; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 14px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600;
            margin-top: 24px;
            transition: all 0.3s ease;
          }
          a:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 4px 12px rgba(102,126,234,0.4); 
          }
          .contact {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
          }
          .contact p {
            font-size: 14px;
            color: #94a3b8;
          }
          .contact a {
            background: transparent;
            color: #667eea;
            padding: 0;
            margin: 0;
            display: inline;
          }
          .contact a:hover {
            transform: none;
            box-shadow: none;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">✉️</div>
          <h1>✅ You've Been Unsubscribed</h1>
          <p>We're sorry to see you go! You've been successfully removed from our newsletter mailing list.</p>
          <div class="email">${email}</div>
          <p>You will no longer receive newsletters from Verapixels.</p>
          
          <a href="https://verapixels.com">Return to Homepage</a>
          
          <div class="contact">
            <p>Changed your mind? Contact us at <a href="mailto:info@verapixels.com">info@verapixels.com</a> to resubscribe.</p>
          </div>
        </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - Verapixels</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8fafc; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }
          h1 { color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Error</h1>
          <p>An unexpected error occurred. Please try again later or contact us at info@verapixels.com</p>
        </div>
      </body>
      </html>
    `);
  }
});

app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    console.log('📧 Fetching newsletter subscribers...');
    
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false }); // ✅ FIXED

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch subscribers',
        details: error.message,
        code: error.code
      });
    }

    console.log(`✅ Found ${data?.length || 0} subscribers`);

    res.json({
      success: true,
      subscribers: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Send newsletter to all subscribers
app.post('/api/newsletter/send', async (req, res) => {
  try {
    const newsletterData = req.body;
    
    console.log('📧 Newsletter send request received');
    console.log('📝 Edition:', newsletterData.edition);
    console.log('🎯 Title:', newsletterData.heroTitle);

    // Fetch all ACTIVE subscribers from Supabase
    const { data: subscribers, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('email, created_at')
      .eq('is_active', true);  // ✅ Only active subscribers

    if (error) {
      console.error('❌ Error fetching subscribers:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch subscribers',
        details: error.message
      });
    }

    if (!subscribers || subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No active subscribers found'
      });
    }

    console.log(`📊 Found ${subscribers.length} active subscribers`);

    // Send newsletter
    const results = await sendNewsletter(newsletterData, subscribers);

    // Log to Supabase (optional - for tracking)
    const { error: logError } = await supabaseAdmin
      .from('newsletter_sends')
      .insert({
        edition: newsletterData.edition,
        subject: newsletterData.heroTitle,
        sent_to: results.total,
        successful: results.success.length,
        failed: results.failed.length,
        sent_at: new Date().toISOString()
      });

    if (logError) {
      console.error('⚠️ Warning: Failed to log newsletter send:', logError);
    }

    res.json({
      success: true,
      results: {
        total: results.total,
        successful: results.success.length,
        failed: results.failed.length,
        successRate: ((results.success.length / results.total) * 100).toFixed(2) + '%'
      },
      message: `Newsletter sent to ${results.success.length} of ${results.total} subscribers`
    });

  } catch (error) {
    console.error('❌ Error sending newsletter:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send newsletter'
    });
  }
});

// Test newsletter (send to admin only)
app.post('/api/newsletter/test', async (req, res) => {
  try {
    const newsletterData = req.body;
    const testEmail = req.body.testEmail || process.env.ADMIN_EMAIL;

    console.log('🧪 Sending test newsletter to:', testEmail);

    const results = await sendNewsletter(newsletterData, [{ email: testEmail }]);

    res.json({
      success: results.success.length > 0,
      message: results.success.length > 0 
        ? `Test newsletter sent to ${testEmail}` 
        : 'Failed to send test newsletter',
      results
    });

  } catch (error) {
    console.error('❌ Error sending test newsletter:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get newsletter example template
app.get('/api/newsletter/example', (req, res) => {
  res.json({
    success: true,
    example: exampleNewsletterData,
    message: 'Use this structure to create your newsletters'
  });
});

// Get newsletter statistics
app.get('/api/newsletter/stats', async (req, res) => {
  try {
    // Get total subscribers
    const { count: subscribersCount, error: subError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true });

    if (subError) throw subError;

    // Get newsletter send history
    const { data: sendHistory, error: historyError } = await supabaseAdmin
      .from('newsletter_sends')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(10);

    if (historyError) throw historyError;

    res.json({
      success: true,
      stats: {
        totalSubscribers: subscribersCount || 0,
        recentSends: sendHistory || []
      }
    });

  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});




app.post('/api/vera/chat', async (req, res) => {
  try {
    // ======== DEBUGGING LOGS ========
    console.log('='.repeat(60));
    console.log('🤖 VERA Chat Request Received');
    console.log('='.repeat(60));
    
    const { system, messages } = req.body;
    
    console.log('📝 System prompt:', system ? 'Present (' + system.substring(0, 50) + '...)' : 'None');
    console.log('📝 Message count:', messages?.length || 0);

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('❌ Invalid messages array');
      return res.status(400).json({ 
        success: false, 
        error: 'Messages required' 
      });
    }

    // Validate API key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.log('❌ GEMINI_API_KEY not found in environment');
      return res.status(500).json({ 
        success: false, 
        error: 'API key missing. Check your .env file.' 
      });
    }
    
    console.log('🔑 API Key:', GEMINI_API_KEY.substring(0, 10) + '...' + GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4));

    // Format messages for Gemini
    const geminiMessages = [];
    
    if (system) {
      geminiMessages.push({ role: 'user', parts: [{ text: system }] });
      geminiMessages.push({ role: 'model', parts: [{ text: 'Understood.' }] });
    }
    
    messages.forEach((msg, idx) => {
      console.log(`💬 Message ${idx + 1}: [${msg.role}] ${msg.content.substring(0, 50)}...`);
      geminiMessages.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    });

    // ========================================================================
    // TRY MULTIPLE MODELS (fallback strategy to avoid quota issues)
    // ========================================================================
    
    const modelsToTry = [
      'gemini-1.5-flash',           // Most reliable, good free tier
      'gemini-1.5-flash-8b',        // Smaller, faster, higher token limit
      'gemini-1.5-pro'              // Backup (slower but works)
    ];

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        console.log(`🔄 Trying model: ${model}...`);
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: geminiMessages,
            generationConfig: { 
              maxOutputTokens: 1000, 
              temperature: 0.7 
            }
          })
        });

        console.log(`📊 Response status: ${response.status}`);

        // SUCCESS - Return immediately
        if (response.ok) {
          const data = await response.json();
          const responseText = data.candidates[0].content.parts[0].text;
          
          console.log('✅ SUCCESS with model:', model);
          console.log('✅ Response preview:', responseText.substring(0, 100) + '...');
          console.log('='.repeat(60));
          
          return res.json({
            success: true,
            content: [{ 
              type: 'text', 
              text: responseText
            }],
            model: model,
            timestamp: new Date().toISOString()
          });
        }

        // QUOTA ERROR (429) - Try next model
        if (response.status === 429) {
          const errorData = await response.json();
          console.log(`⚠️ Quota exceeded for ${model}, trying next model...`);
          lastError = errorData;
          continue; // Skip to next model
        }

        // OTHER ERRORS - Try next model
        const errorText = await response.text();
        console.log(`❌ Error with ${model}:`, errorText.substring(0, 200));
        lastError = { error: errorText };
        continue;

      } catch (fetchError) {
        console.log(`❌ Fetch error with ${model}:`, fetchError.message);
        lastError = { error: fetchError.message };
        continue;
      }
    }

    // ========================================================================
    // ALL MODELS FAILED - Return user-friendly error
    // ========================================================================
    
    console.log('❌ ALL MODELS FAILED');
    console.log('Last error:', JSON.stringify(lastError).substring(0, 300));
    console.log('='.repeat(60));
    
    // Check if it's a quota error
    if (lastError && lastError.error && (
        JSON.stringify(lastError).includes('429') || 
        JSON.stringify(lastError).includes('quota') ||
        JSON.stringify(lastError).includes('RESOURCE_EXHAUSTED')
    )) {
      return res.status(429).json({
        success: false,
        error: 'quota_exceeded',
        message: 'Ah! VERA don tire small. We don reach our free quota. Abeg wait 1-2 minutes try again! 🙏',
        retryAfter: 60,
        models_tried: modelsToTry
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      error: 'ai_unavailable',
      message: 'Sorry o! VERA no dey available right now. Abeg try again in small time.',
      details: process.env.NODE_ENV === 'development' ? lastError : undefined,
      models_tried: modelsToTry
    });

  } catch (error) {
    console.log('='.repeat(60));
    console.log('💥 FATAL ERROR IN /api/vera/chat');
    console.log('Error:', error.message);
    console.log('Stack:', error.stack);
    console.log('='.repeat(60));
    
    return res.status(500).json({ 
      success: false, 
      error: 'server_error',
      message: 'Server wahala! Something don happen. Try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ============================================================================
// ALSO ADD THIS HEALTH CHECK ENDPOINT
// ============================================================================

app.get('/api/vera/health', (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  
  res.json({
    success: true,
    status: hasApiKey ? 'ready' : 'not_configured',
    provider: 'Google Gemini',
    models: ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'],
    api_key_present: hasApiKey,
    api_key_preview: hasApiKey ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'missing',
    timestamp: new Date().toISOString()
  });
});

// Health check for VERA API
app.get('/api/vera/health', (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  
  res.json({
    success: true,
    status: hasApiKey ? 'ready' : 'not_configured',
    provider: 'Google Gemini',
    model: 'gemini-1.5-flash',
    message: hasApiKey 
      ? 'VERA AI chatbot is ready (Powered by Gemini)' 
      : 'Gemini API key not configured',
    timestamp: new Date().toISOString()
  });
});

// ========== UTILITY ENDPOINTS ==========

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

// Remove the first /health endpoint completely, keep only this one:
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "verapixels-backend"
  });
});

// Keep this root handler:
app.get("/", (req, res) => {
  // If requesting JSON (health check), respond quickly
  if (req.accepts('json') && !req.accepts('html')) {
    return res.status(200).json({ status: "ok" });
  }
  // Otherwise serve React app
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "verapixels-backend"
  });
});

// ADD THIS:
app.get("/", (req, res) => {
  // If requesting JSON (health check), respond quickly
  if (req.accepts('json') && !req.accepts('html')) {
    return res.status(200).json({ status: "ok" });
  }
  // Otherwise serve React app
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.get("/test", (req, res) => {
  const protocol = isDevelopment ? 'ws:' : 'wss:';
  const serverDomain = process.env.SERVER_DOMAIN || `localhost:${PORT}`;
  
  res.json({
    message: "Server is running!",
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: "/health",
      connections: "/connections",
      blogs: "/api/blogs",
      blog: "/api/blogs/:id",
      websocket: `${protocol}//${serverDomain}`,
      devtools: "/.well-known/appspecific/com.chrome.devtools.json",
      careers: {
        uploadCV: "/api/careers/upload-cv",
        submitApplication: "/api/careers/submit-application"
      },
      consultations: {
        book: "/api/consultations/book"
      },
      adminApi: {
        createInvite: "/api/admin/create-invite",
        completeRegistration: "/api/admin/complete-registration",
        login: "/api/admin/login"
      }
    },
    allowedOrigins: allowedOrigins,
    activeConnections: io.engine.clientsCount,
    socketRooms: io.sockets.adapter.rooms.size,
    blogCount: blogPosts.length,
    blogCategories: [...new Set(blogPosts.map(blog => blog.category))]
  });
});

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

// ========== CV DOWNLOAD ENDPOINT ==========
app.get('/api/careers/download-cv/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Security: Validate filename to prevent directory traversal attacks
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid filename'
      });
    }
    
    // Only allow downloading files that start with 'cv_'
    if (!filename.startsWith('cv_')) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }
    
    const filePath = path.join(uploadDir, filename);
    
    // Check if file exists
    if (!existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }
    
    console.log('📥 Downloading CV:', filename);
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send file
    res.sendFile(filePath);
    
  } catch (error) {
    console.error('❌ CV download error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download CV'
    });
  }
});

// ========== STATIC FILE SERVING ==========

const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

app.get('/blog/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogPosts.find(post => post.id === blogId);
  
  if (blog) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blog.title} - My Blog</title>
        <meta name="description" content="${blog.excerpt}">
        
        <meta property="og:title" content="${blog.title}">
        <meta property="og:description" content="${blog.excerpt}">
        <meta property="og:image" content="${blog.image}">
        <meta property="og:url" content="${req.protocol}://${req.get('host')}/blog/${blogId}">
        <meta property="og:type" content="article">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${blog.title}">
        <meta name="twitter:description" content="${blog.excerpt}">
        <meta name="twitter:image" content="${blog.image}">
        
        <link rel="canonical" href="${req.protocol}://${req.get('host')}/blog/${blogId}">
        <meta name="robots" content="index, follow">
        
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #000;
            color: white;
          }
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #000;
            color: white;
            flex-direction: column;
            gap: 20px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: #6a00ff;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading blog post...</p>
        </div>
        
        <div id="root"></div>
        
        <script>
          window.__INITIAL_BLOG_DATA__ = ${JSON.stringify(blog)};
          window.__INITIAL_PATH__ = '/blog/${blogId}';
        </script>
        <script type="module" src="/assets/index.js"></script>
      </body>
      </html>
    `;
    
    res.send(html);
  } else {
    res.sendFile(path.join(buildPath, 'index.html'));
  }
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'API endpoint not found'
    });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
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

const activeConnections = new Map();

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

  socket.onAny((eventName, ...args) => {
    if (eventName !== 'ping' && eventName !== 'pong') {
      console.log(`📡 [${socket.id}] Event: ${eventName}`, 
        args[0] ? JSON.stringify(args[0]).substring(0, 100) + '...' : 'No data');
    }
  });

  const { adminId, dashboard, clientType, sessionId } = socket.handshake.query;
  
  console.log("Client type:", { adminId, dashboard, clientType, sessionId });

  if (dashboard === 'admin') {
    console.log(`👨‍💼 Admin connected: ${adminId} (Socket ID: ${socket.id})`);
    
    activeConnections.set(socket.id, { 
      type: 'admin', 
      adminId, 
      rooms: new Set() 
    });

    socket.on('admin_join', (data) => {
      console.log('🚪 Admin joining conversation:', data.conversationId);
      console.log('👤 Admin name:', data.adminName);
      
      const roomId = data.conversationId;
      
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
      
      socket.join(roomId);
      
      logRoomInfo(roomId);
      
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
      
      io.to(roomId).emit('new_message', joinMessage);
      
      io.to(roomId).emit('admin_joined', {
        adminId: data.adminId,
        adminName: data.adminName,
        conversationId: roomId,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Admin ${data.adminName} joined conversation ${roomId}`);
    });
    
    const handleAdminMessage = (data) => {
      console.log('💬 Admin message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      const roomId = data.conversationId || data.conversation_id;
      
      if (!roomId) {
        console.error('❌ No conversation ID provided in admin message');
        return;
      }
      
      if (!socket.rooms.has(roomId)) {
        console.log('⚠️ Admin not in conversation room, auto-joining...');
        socket.join(roomId);
        
        const adminInfo = activeConnections.get(socket.id);
        if (adminInfo && adminInfo.rooms) {
          adminInfo.rooms.add(roomId);
        }
      }
      
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
      
      io.to(roomId).emit('new_message', adminMessage);
      
      console.log('✅ Admin message sent to conversation:', roomId);
    };
    
    socket.on('admin_message', handleAdminMessage);
    socket.on('send_message', (data) => {
      const formattedData = {
        conversationId: data.conversationId || data.conversation_id,
        message: data.message || data.message_text,
        adminName: data.adminName || 'Admin',
        intent: data.intent,
        classification: data.classification
      };
      handleAdminMessage(formattedData);
    });

    socket.on('admin_status_change', (data) => {
      console.log('🔄 Admin status change:', data);
      io.to(data.conversationId).emit('status_updated', data);
    });
    
    socket.on('transfer_to_admin', async (data) => {
      console.log('🔀 Transfer to admin requested:', data);
      
      const roomId = data.conversationId;
      
      try {
        const response = await fetch(`${process.env.CLIENT_URL}/api/notifications/send-admin-alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversationId: roomId,
            reason: data.reason || 'User requested assistance',
            messagePreview: data.messagePreview || 'User needs admin assistance'
          })
        });
        
        const result = await response.json();
        console.log('🔔 Admin alert sent via backend:', result.success);
      } catch (error) {
        console.error('❌ Failed to send admin alert:', error);
      }

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
      
      io.emit('new_notification', notification);
      console.log('🔔 Notification sent to all admins');
      
      socket.to(roomId).emit('transfer_confirmed', {
        conversationId: roomId,
        status: 'Admin notified',
        timestamp: new Date().toISOString()
      });
      
      socket.to(roomId).emit('transfer_initiated', {
        conversationId: roomId,
        reason: data.reason,
        timestamp: new Date().toISOString()
      });
    });
    
    socket.on('typing', (data) => {
      console.log('⌨️ Admin typing in:', data.conversationId);
      
      const roomId = data.conversationId;
      
      socket.to(roomId).emit('admin_typing', {
        conversationId: roomId,
        isTyping: data.isTyping,
        timestamp: new Date().toISOString()
      });
    });
    
    console.log(`✅ Admin ${adminId} event handlers registered`);
  } 
  else if (clientType === 'chatbot') {
    console.log(`🤖 Chatbot connected for session: ${sessionId} (Socket ID: ${socket.id})`);
    
    activeConnections.set(socket.id, { 
      type: 'user', 
      sessionId, 
      rooms: new Set() 
    });
    
    socket.join(sessionId);
    
    socket.on('join_conversation', (data) => {
      console.log('🚪 User joining conversation:', data.conversationId);
      
      const roomId = data.conversationId || sessionId;
      
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
      
      socket.join(roomId);
      
      console.log('✅ User joined room:', roomId);
      logRoomInfo(roomId);
    });
    
    socket.on('send_message', (data) => {
      console.log('💬 User message to conversation:', data.conversationId);
      console.log('📝 Message preview:', data.message.substring(0, 50) + '...');
      
      const roomId = data.conversationId || sessionId;
      const classification = classifyQuery(data.message);
      
      if (!socket.rooms.has(roomId)) {
        console.log('⚠️ User not in conversation room, auto-joining...');
        socket.join(roomId);
        
        const userInfo = activeConnections.get(socket.id);
        if (userInfo && userInfo.rooms) {
          userInfo.rooms.add(roomId);
        }
      }
      
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
      
      io.to(roomId).emit('new_message', userMessage);
      console.log('✅ User message sent to conversation:', roomId);
      
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
        
        io.emit('new_notification', notification);
        console.log('🔔 Admin notification sent for:', roomId);
      }
    });
    
    socket.on('typing', (data) => {
      if (data.userType === 'user') {
        console.log('⌨️ User typing in:', data.conversationId);
        
        const roomId = data.conversationId;
        
        socket.to(roomId).emit('user_typing', {
          conversationId: roomId,
          isTyping: data.isTyping,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    socket.on('transfer_to_admin', (data) => {
      console.log('🔀 User requested transfer to admin:', data);
      
      const roomId = data.conversationId;
      
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
      
      io.emit('new_notification', notification);
      console.log('🔔 Transfer notification sent to all admins');
      
      socket.emit('transfer_initiated', {
        conversationId: roomId,
        reason: data.reason,
        timestamp: new Date().toISOString()
      });
    });
  }
  
  socket.on("ping", () => {
    socket.emit("pong", { 
      timestamp: new Date().toISOString(),
      socketId: socket.id 
    });
  });
  
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
  
  socket.emit('connected', {
    socketId: socket.id,
    timestamp: new Date().toISOString(),
    message: 'Successfully connected to WebSocket server'
  });
});

// ========== START SERVER ==========
server.listen(PORT, () => {
  console.log(`🚀 Chat & Blog server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Connections: http://localhost:${PORT}/connections`);
  console.log(`📚 Blog API: http://localhost:${PORT}/api/blogs`);
  console.log(`📖 Blog posts: http://localhost:${PORT}/blog/ux-basics-startups`);
  console.log(`💼 Careers API:`);
  console.log(`   - Upload CV: http://localhost:${PORT}/api/careers/upload-cv`);
  console.log(`   - Submit Application: http://localhost:${PORT}/api/careers/submit-application`);
  console.log(`📅 Consultations: http://localhost:${PORT}/api/consultations/book`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🌐 WebSocket URL: ${isDevelopment ? 'ws' : 'wss'}://localhost:${PORT}`);
  console.log(`👥 Admin API:`);
  console.log(`   - Create Invite: http://localhost:${PORT}/api/admin/create-invite`);
  console.log(`   - Complete Registration: http://localhost:${PORT}/api/admin/complete-registration`);
  console.log(`   - Login: http://localhost:${PORT}/api/admin/login`);
  console.log(`🔧 DevTools endpoint: http://localhost:${PORT}/.well-known/appspecific/com.chrome.devtools.json`);
  console.log(`📊 Stats: ${blogPosts.length} posts, ${[...new Set(blogPosts.map(blog => blog.category))].length} categories`);
  console.log(`📁 CV Upload Directory: ${uploadDir}`);
  console.log(`✅ Server ready for connections!`);
});

export { app, server, io, sendEmail, sendAdminNotification, sendUserConfirmation, sendAdminChatNotification };