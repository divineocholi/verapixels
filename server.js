import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail, sendAdminNotification, sendUserConfirmation, sendAdminChatNotification } from './emailService.js';

// Load environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        },
        {
          title: "Medium Effort Wins (15 minutes each)",
          content: "These require slightly more work but deliver compounding benefits.",
          subsections: [
            {
              title: "6. Minify CSS and JavaScript",
              content: "Minification removes unnecessary spaces, comments, and characters from code without changing functionality. Use online tools like MinifyCode.com or, for WordPress, install 'Autoptimize' plugin. Typical savings: 20-40% file size reduction on code files."
            },
            {
              title: "7. Reduce Redirects",
              content: "Every redirect adds a round-trip delay. Use Screaming Frog (free for 500 URLs) to find all redirects on your site, then either fix broken links directly or eliminate redirect chains. Common culprit: www.site.com → site.com → site.com/home. Consolidate these."
            },
            {
              title: "8. Upgrade to HTTP/2",
              content: "HTTP/2 is faster than HTTP/1.1 but requires HTTPS. If you're not on HTTPS yet, get a free SSL certificate from Let's Encrypt (most hosts install this with one click). Then enable HTTP/2 in your hosting panel. This can speed up resource-heavy pages by 20-30%."
            },
            {
              title: "9. Optimize Web Fonts",
              content: "Custom fonts are beautiful but slow. First, do you need 5 font weights? Reduce to 2-3. Second, use 'font-display: swap' so text appears instantly in system font, then switches to your custom font. Third, only load fonts for languages you support (many fonts load Latin + Cyrillic + Asian by default)."
            },
            {
              title: "10. Audit Third-Party Code",
              content: "Social media share buttons, comment systems, and live chat widgets often load 10+ separate files. Use requestmap.webperf.tools to see what third-party domains your site calls. For anything that loads >100KB, ask: Is this worth a 500ms delay? If not, remove or replace with a lighter alternative."
            }
          ]
        }
      ],
      
      highlight: {
        icon: "Zap",
        text: "Speed optimization follows the 80/20 rule: 20% of optimizations deliver 80% of results. These 10 fixes are that 20%—master them before worrying about advanced techniques."
      },
      
      quote: "Users don't care about your technical constraints. A slow site feels like a bad product, regardless of what it actually does. Speed is the most universal UX improvement you can make.",
      
      pitfalls: [
        {
          title: "Optimizing What Users Don't See",
          description: "Don't optimize your admin dashboard that only you use. Focus on pages with actual traffic—homepage, product pages, checkout. Use Google Analytics to find your top 10 visited pages and start there."
        },
        {
          title: "Breaking Things by Over-Optimizing",
          description: "Before making changes, test your site thoroughly after each fix. Some minification plugins break JavaScript. Some lazy-loading tools hide images Google needs for SEO. Make one change at a time and verify it works before moving to the next."
        },
        {
          title: "Ignoring Mobile Performance",
          description: "Your desktop site might be fast, but mobile users on 4G see a different story. Always test on real mobile devices, not just desktop dev tools. Use Google's Mobile-Friendly Test to catch mobile-specific issues."
        }
      ],
      
      caseStudy: {
        title: "Walmart's Speed = Money Discovery",
        data: "Walmart found that for every 1 second improvement in load time, conversions increased by 2%. When they improved load time by 1 second, revenue increased by $100 million annually. They achieved this primarily through image optimization (60% of improvement) and eliminating third-party scripts (25% of improvement)—exactly the quick wins listed above."
      },
      
      quickStartGuide: {
        title: "30-Minute Speed Blitz",
        steps: [
          "Minute 0-5: Test current speed at PageSpeed Insights. Note your score.",
          "Minute 5-10: Compress all images using TinyPNG. Upload new versions.",
          "Minute 10-15: Remove unused plugins (WordPress) or scripts (all platforms).",
          "Minute 15-20: Enable caching (WP Super Cache plugin or .htaccess modification).",
          "Minute 20-25: Sign up for Cloudflare free CDN and configure DNS.",
          "Minute 25-30: Re-test at PageSpeed Insights. Compare before/after scores."
        ]
      },
      
      measurementGuide: {
        title: "Measuring What Matters",
        metrics: [
          {
            name: "First Contentful Paint (FCP)",
            target: "< 1.8 seconds",
            meaning: "When users see ANYTHING on screen. If this is >3s, users bounce."
          },
          {
            name: "Largest Contentful Paint (LCP)",
            target: "< 2.5 seconds",
            meaning: "When the main content loads. This is what users perceive as 'load time.'"
          },
          {
            name: "Time to Interactive (TTI)",
            target: "< 3.8 seconds",
            meaning: "When users can actually click/scroll. Slow TTI = frustrating experience."
          }
        ]
      },
      
      nextSteps: {
        title: "What's Next?",
        content: "After implementing these quick wins, you're ready for intermediate optimizations: code splitting, server-side rendering, and advanced caching strategies. Or, book a performance audit where we'll analyze your specific bottlenecks and create a custom optimization roadmap.",
        cta: {
          primary: "Book Performance Audit",
          secondary: "Read Advanced Guide"
        }
      },
      
      advancedTools: [
        "Google PageSpeed Insights for overall performance scores",
        "WebPageTest.org for detailed waterfall analysis",
        "GTmetrix for tracking performance over time",
        "Lighthouse (built into Chrome) for automated audits"
      ],
      
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
    // ✅ Return FULL blog posts with detailedContent
    res.json({
      success: true,
      blogs: blogPosts, // Send complete data
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

// Get single blog post by ID
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

// Get blogs by category
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

// Search blogs
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

// Get blog categories
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


// In your /api/consultations/book endpoint
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

    // 1. Store consultation in database
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

    // 2. Send BOTH emails
    try {
      // SEND TO ADMIN FIRST
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

      // SEND TO USER
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
      console.error('❌ Email sending error:', emailError);
      // DON'T FAIL - emails are not critical
    }

    // 3. Return success
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

// In your server file (ensure this is before your routes)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ CORRECT CODE (using sendEmail from emailService.js)
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

// ========== SEND CONFIRMATION EMAIL ROUTE ==========
app.post('/api/consultations/send-confirmation', async (req, res) => {
  try {
    const {
      userName, userEmail, phone, contact_method,
      booking_date, booking_time, business_time, user_timezone,
      message, consultation_id
    } = req.body;

    console.log('📧 Sending confirmation email for consultation:', consultation_id);

    // Send user confirmation using your email service
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

// Add this test endpoint to your server.js
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

// Complete admin registration with password hashing
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

    // 3. Hash password for admins table
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed for database');

    // 4. Create admin record with hashed password
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

// Admin Login with password verification
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

// ========== UTILITY ENDPOINTS ==========

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
    blogPosts: blogPosts.length,
    server: "Chat & Blog Server",
    version: "3.0.0",
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      blogs: "/api/blogs",
      blog: "/api/blogs/:id",
      categories: "/api/blogs/categories/all",
      health: "/health",
      connections: "/connections",
      adminApi: {
        createInvite: "/api/admin/create-invite",
        completeRegistration: "/api/admin/complete-registration",
        login: "/api/admin/login"
      }
    }
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
      blogs: "/api/blogs",
      blog: "/api/blogs/:id",
      websocket: `${protocol}//${serverDomain}`,
      devtools: "/.well-known/appspecific/com.chrome.devtools.json",
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

// ========== STATIC FILE SERVING (AFTER ALL API ROUTES!) ==========

// Serve static files from React build directory
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

// Server-side rendering for blog posts
app.get('/blog/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogPosts.find(post => post.id === blogId);
  
  if (blog) {
    // Create a simple HTML page for SEO
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blog.title} - My Blog</title>
        <meta name="description" content="${blog.excerpt}">
        
        <!-- Open Graph Tags -->
        <meta property="og:title" content="${blog.title}">
        <meta property="og:description" content="${blog.excerpt}">
        <meta property="og:image" content="${blog.image}">
        <meta property="og:url" content="${req.protocol}://${req.get('host')}/blog/${blogId}">
        <meta property="og:type" content="article">
        
        <!-- Twitter Card -->
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
        
        <!-- React app will mount here -->
        <div id="root"></div>
        
        <script>
          // Pass blog data to React app for instant hydration
          window.__INITIAL_BLOG_DATA__ = ${JSON.stringify(blog)};
          window.__INITIAL_PATH__ = '/blog/${blogId}';
        </script>
        <script type="module" src="/assets/index.js"></script>
      </body>
      </html>
    `;
    
    res.send(html);
  } else {
    // Serve the main React app for 404
    res.sendFile(path.join(buildPath, 'index.html'));
  }
});

// All other requests return the React app (EXCEPT API routes)
app.use((req, res, next) => {
  // Skip API routes - they should have been handled already
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'API endpoint not found'
    });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Add this route to your server file
app.post('/api/consultations/send-confirmation', async (req, res) => {
  try {
    const {
      userName, userEmail, phone, contact_method,
      booking_date, booking_time, business_time, user_timezone,
      message, consultation_id
    } = req.body;

    console.log('📧 Sending confirmation email for consultation:', consultation_id);

    // Send user confirmation using your email service
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
        message: 'Email sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send email'
      });
    }

  } catch (error) {
    console.error('❌ Error in send-confirmation endpoint:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
});

// Optional: Add endpoint for admin notifications too
app.post('/api/notifications/send-admin-alert', async (req, res) => {
  try {
    const {
      conversationId, reason, messagePreview
    } = req.body;

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

// ========== SOCKET.IO SETUP ==========
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling']
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
      
      // Send join message
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
      
      // Send to ALL sockets in the conversation room
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
    
    socket.on('transfer_to_admin', async (data) => {
  console.log('🔀 Transfer to admin requested:', data);
  
  const roomId = data.conversationId;
  
  try {
    // Call your backend API instead of direct email sending
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

// ========== EMAIL TEST ENDPOINTS ==========

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

// ========== END TEST ENDPOINTS ==========

server.listen(PORT, () => {
  console.log(`🚀 Chat & Blog server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Connections: http://localhost:${PORT}/connections`);
  console.log(`📚 Blog API: http://localhost:${PORT}/api/blogs`);
  console.log(`📖 Blog posts: http://localhost:${PORT}/blog/5-ui-ux-tricks`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🌐 WebSocket URL: ${isDevelopment ? 'ws' : 'wss'}://localhost:${PORT}`);
  console.log(`👥 Admin API:`);
  console.log(`   - Create Invite: http://localhost:${PORT}/api/admin/create-invite`);
  console.log(`   - Complete Registration: http://localhost:${PORT}/api/admin/complete-registration`);
  console.log(`   - Login: http://localhost:${PORT}/api/admin/login`);
  console.log(`🔧 DevTools endpoint: http://localhost:${PORT}/.well-known/appspecific/com.chrome.devtools.json`);
  console.log(`📊 Blog Stats: ${blogPosts.length} posts, ${[...new Set(blogPosts.map(blog => blog.category))].length} categories`);
  console.log(`✅ Server ready for connections!`);
});

export { app, server, io,  sendEmail, sendAdminNotification, sendUserConfirmation, sendAdminChatNotification};