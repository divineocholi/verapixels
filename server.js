import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import path from "path";
import { fileURLToPath } from "url";

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

// ========== BLOG DATA ==========
const blogPosts = [
  {
    id: "5-ui-ux-tricks",
    title: "5 UI/UX Tricks That Make Websites Feel Premium",
    excerpt: "Discover the secret design patterns that top tech companies use to create luxury digital experiences.",
    author: "Emmanuella udom",
    readTime: "8 min read",
    date: "Oct 25, 2024",
    category: "Design",
    gradient: "linear-gradient(135deg, #6a00ff 0%, #8b5cf6 100%)",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "Premium UI/UX isn't about adding more elements—it's about strategic subtraction and psychological design principles that create an air of sophistication.",
      sections: [
        {
          title: "The Psychology of Premium Design",
          content: "Premium design leverages cognitive biases and emotional responses. Research shows users perceive designs as premium when they exhibit three key characteristics: consistency, intentionality, and emotional resonance.",
          subsections: [
            {
              title: "Visual Consistency",
              content: "Maintain consistent spacing (using 8px grid systems), typography hierarchies (no more than 3 typefaces), and color palettes with intentional contrast ratios."
            },
            {
              title: "Micro-interactions",
              content: "Smooth animations with proper easing curves (cubic-bezier(0.4, 0, 0.2, 1)) and meaningful hover states that provide tactile feedback."
            }
          ]
        },
        {
          title: "The 5 Key Techniques",
          content: "Here are the specific techniques that elevate ordinary designs to premium experiences:",
          subsections: [
            {
              title: "Strategic Negative Space",
              content: "Use 60px+ margins on desktop, 40px+ on mobile. Negative space should feel intentional, not empty. It guides user attention and creates breathing room."
            },
            {
              title: "Custom Cursor States",
              content: "Implement cursor states that change based on context—pointers for clickable elements, grabbing for draggable items, and custom shapes for special interactions."
            },
            {
              title: "Progressive Disclosure",
              content: "Reveal information gradually. Complex features should unfold naturally as users need them, reducing cognitive load while maintaining advanced capabilities."
            }
          ]
        }
      ],
      highlight: {
        icon: "Lightbulb",
        text: "Premium design is about confidence in restraint. Remove one unnecessary element from every screen you design."
      },
      quote: "Good design is as little design as possible. Less, but better—because it concentrates on the essential aspects.",
      pitfalls: [
        {
          title: "Over-designing",
          description: "Adding unnecessary elements in pursuit of 'premium' actually creates clutter and confusion."
        },
        {
          title: "Inconsistent spacing",
          description: "Random padding/margin values break visual harmony and signal amateur design."
        }
      ],
      applications: "These principles apply across e-commerce luxury brands, fintech platforms requiring trust, and SaaS products needing to justify premium pricing tiers.",
      conclusion: "Premium UI/UX creates perceived value through intentional design decisions. Start implementing one technique at a time and measure user engagement improvements."
    }
  },
  {
    id: "website-speed-revenue",
    title: "How Fast Websites Boost Business Revenue",
    excerpt: "Learn why website speed is directly tied to conversion rates and discover optimization techniques.",
    author: "ocholi Divine",
    readTime: "6 min read",
    date: "Oct 22, 2025",
    category: "Performance",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "Every 100ms delay in page load time reduces conversion rates by 7%. In the competitive digital landscape, speed isn't just technical—it's revenue.",
      sections: [
        {
          title: "The Direct Revenue Impact",
          content: "Amazon found that 100ms of latency cost them 1% in sales. Google discovered that delaying search results by 400ms reduced searches by 0.74%. These aren't minor metrics—they're business-critical numbers.",
          subsections: [
            {
              title: "Mobile Performance",
              content: "53% of mobile site visits are abandoned if pages take longer than 3 seconds to load. With mobile traffic dominating, this directly impacts revenue."
            },
            {
              title: "Core Web Vitals",
              content: "Google's ranking factors now include Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—each affecting both SEO and conversions."
            }
          ]
        },
        {
          title: "Optimization Strategies",
          content: "Implement these performance improvements in order of impact:",
          subsections: [
            {
              title: "Image Optimization",
              content: "Convert images to WebP format (30% smaller than JPEG), implement lazy loading, and use responsive images with srcset attributes."
            },
            {
              title: "JavaScript Optimization",
              content: "Code-split your bundles, remove unused code, and defer non-critical JavaScript. Consider using Partial Hydration for React applications."
            }
          ]
        }
      ],
      highlight: {
        icon: "Zap",
        text: "Prioritize above-the-fold content. Users form opinions in the first 50ms—make those milliseconds count with immediate visual feedback."
      },
      quote: "Performance isn't a feature—it's a fundamental user experience requirement that directly impacts business metrics.",
      pitfalls: [
        {
          title: "Third-party script bloat",
          description: "Analytics, chat widgets, and social plugins can add seconds to load times without proper async loading."
        },
        {
          title: "Unoptimized hero images",
          description: "Large above-the-fold images are the #1 cause of poor LCP scores and immediate bounce rates."
        }
      ],
      applications: "E-commerce sites see immediate revenue improvements. Content sites benefit from better SEO rankings. SaaS platforms reduce churn with faster interfaces.",
      conclusion: "Website speed optimization provides some of the highest ROI in digital marketing. Start measuring with tools like WebPageTest and Lighthouse, then implement improvements systematically."
    }
  },
  {
    id: "smooth-animations-tech",
    title: "The Tech Behind Smooth Animations",
    excerpt: "Dive deep into the frameworks and principles that power buttery-smooth animations.",
    author: "freda Mbajiorgu",
    readTime: "10 min read",
    date: "Oct 20, 2025",
    category: "Development",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "Smooth animations run at 60fps (16.7ms per frame) with consistent timing functions and hardware acceleration. Achieving this requires understanding both the browser's rendering pipeline and animation principles.",
      sections: [
        {
          title: "Browser Rendering Pipeline",
          content: "Every animation triggers Style, Layout, Paint, and Composite steps. The most performant animations only trigger Composite (using transform and opacity properties).",
          subsections: [
            {
              title: "CSS Transforms vs. Layout Properties",
              content: "Use transform: translateX() instead of left/right properties, and opacity instead of visibility. These use the GPU and avoid costly layout recalculations."
            },
            {
              title: "Will-Change Property",
              content: "Hint to browsers about what will animate: will-change: transform. But use sparingly—overuse causes memory overhead."
            }
          ]
        },
        {
          title: "JavaScript Animation Libraries",
          content: "Choose libraries based on your needs:",
          subsections: [
            {
              title: "Framer Motion (React)",
              content: "Declarative animations with spring physics and gesture support. Best for complex, interactive UI animations."
            },
            {
              title: "GSAP",
              content: "Industry standard for timeline-based animations and complex sequences. Unparalleled performance and browser compatibility."
            }
          ]
        }
      ],
      highlight: {
        icon: "Code",
        text: "Always use requestAnimationFrame() instead of setTimeout/setInterval for JavaScript animations to sync with browser refresh rates."
      },
      quote: "Animation isn't just about moving things—it's about creating relationships between elements and guiding user attention through time and space.",
      pitfalls: [
        {
          title: "Over-animating",
          description: "Too many simultaneous animations compete for attention and cause performance bottlenecks."
        },
        {
          title: "Ignoring reduced motion",
          description: "Always respect prefers-reduced-motion media query for accessibility compliance."
        }
      ],
      applications: "Micro-interactions in buttons, page transitions, loading states, scroll-triggered animations, and data visualization come to life with proper animation techniques.",
      conclusion: "Mastering smooth animations requires both technical knowledge and artistic timing. Start with CSS transitions, graduate to JavaScript libraries, and always measure performance with Chrome DevTools."
    }
  },
  {
    id: "naming-your-business",
    title: "The Complete Guide to Naming Your Business",
    excerpt: "Master the art and science of creating a memorable business name that resonates with customers.",
    author: "ocholi Divine",
    readTime: "12 min read",
    date: "Oct 18, 2025",
    category: "Business",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "A great business name is pronounceable, memorable, available as a domain, and evokes the right emotions. It's your first impression and lasting brand identity.",
      sections: [
        {
          title: "The Name Spectrum",
          content: "Names exist on a spectrum from descriptive (General Motors) to suggestive (Uber) to abstract (Google). Each position has different trademark and marketing implications.",
          subsections: [
            {
              title: "Descriptive Names",
              content: "Clear but hard to trademark. Best for local businesses where clarity trumps creativity."
            },
            {
              title: "Suggestive Names",
              content: "Balance clarity and creativity. Hint at benefits without being literal (Slack for team communication)."
            }
          ]
        },
        {
          title: "Naming Techniques",
          content: "Systematic approaches to generate quality names:",
          subsections: [
            {
              title: "Portmanteau Method",
              content: "Combine relevant words: Netflix (Internet + flicks), Pinterest (Pin + interest). Creates unique, trademarkable names."
            },
            {
              title: "Foreign Word Method",
              content: "Use words from other languages that sound appealing and relate to your values: Novo (Portuguese for 'new'), Kairos (Greek for 'right moment')."
            }
          ]
        }
      ],
      highlight: {
        icon: "Lightbulb",
        text: "Test names with your target audience. Say them aloud, check pronunciation, and ensure they don't have negative connotations in other languages."
      },
      quote: "Your brand name is the single word that will eventually represent everything you do. Choose it wisely.",
      pitfalls: [
        {
          title: "Overly clever names",
          description: "Names that require explanation fail the 'bar test'—can you explain it simply in a noisy bar?"
        },
        {
          title: "Domain availability",
          description: "Don't compromise with strange TLDs or hyphens. The perfect name needs the perfect domain."
        }
      ],
      applications: "Startups need names that scale. SaaS products benefit from suggestive names. Consumer brands need emotional resonance. B2B companies need credibility signals.",
      conclusion: "Naming is both creative and strategic. Generate hundreds of options, filter systematically, test with real people, and secure all assets (domain, social handles, trademark) before committing."
    }
  },
  {
    id: "case-study-writing-guide",
    title: "How to Write Compelling Case Studies That Convert",
    excerpt: "Learn the proven formula for creating case studies that showcase your expertise and persuade customers.",
    author: "ocholi Divine",
    readTime: "11 min read",
    date: "Oct 15, 2025",
    category: "Content",
    gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "Effective case studies follow the STAR method: Situation, Task, Action, Result. They transform features into tangible outcomes that prospects can envision for themselves.",
      sections: [
        {
          title: "The Psychology of Persuasion",
          content: "Case studies work because they provide social proof (Cialdini's principle) and create mental availability. Readers see themselves in the customer's situation.",
          subsections: [
            {
              title: "Quantifiable Results",
              content: "Always lead with metrics: 'Increased conversions by 47%' or 'Reduced processing time by 3 hours.' Numbers create credibility anchors."
            },
            {
              title: "Customer Quotes",
              content: "Direct quotes add human authenticity. Capture emotional benefits alongside functional ones: 'This saved my team from burnout.'"
            }
          ]
        },
        {
          title: "Structure That Converts",
          content: "Follow this narrative arc for maximum impact:",
          subsections: [
            {
              title: "The Hero's Journey",
              content: "Position the customer as hero, their challenge as the dragon, and your solution as the magical weapon. This classic story structure increases retention."
            },
            {
              title: "Before-After-Bridge",
              content: "Show the painful before state, the glorious after state, and how your solution bridges the gap. This creates desire and shows understanding."
            }
          ]
        }
      ],
      highlight: {
        icon: "FileText",
        text: "Include specific implementation details. Prospects want to know exactly how you achieved results—this builds credibility and sets realistic expectations."
      },
      quote: "A well-written case study does the selling for you. It answers objections before they're raised and builds trust through demonstrated expertise.",
      pitfalls: [
        {
          title: "Vague results",
          description: "'Improved efficiency' is meaningless. 'Reduced processing from 4 hours to 15 minutes' is compelling."
        },
        {
          title: "Too much self-promotion",
          description: "Focus 70% on the customer's story, 30% on your solution. The customer should be the protagonist."
        }
      ],
      applications: "B2B companies use case studies in sales decks. SaaS companies feature them on pricing pages. Agencies use them in proposals. Enterprise sales require detailed implementation studies.",
      conclusion: "Great case studies are customer-centric stories with measurable outcomes. Interview customers deeply, extract emotional and quantitative benefits, and structure them as compelling narratives that address prospect anxieties."
    }
  },
  {
    id: "startup-branding-essentials",
    title: "Startup Branding Essentials: Build Your Identity",
    excerpt: "Everything you need to know about creating a strong brand identity from day one.",
    author: "ocholi Divine",
    readTime: "9 min read",
    date: "Oct 12, 2025",
    category: "Business",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop",
    detailedContent: {
      lead: "Startup branding isn't just a logo—it's a cohesive system of visual, verbal, and experiential elements that communicate your unique value proposition and build emotional connections.",
      sections: [
        {
          title: "Brand Strategy Foundations",
          content: "Before design begins, define your brand strategy: positioning statement, target audience personas, brand personality, and core values. These decisions inform every design choice.",
          subsections: [
            {
              title: "Positioning Matrix",
              content: "Plot competitors on axes (price vs. quality, innovative vs. traditional) to identify gaps. Own a unique position rather than competing directly."
            },
            {
              title: "Brand Archetypes",
              content: "Identify with one of 12 archetypes (Hero, Sage, Jester, etc.). This provides consistency across all brand expressions."
            }
          ]
        },
        {
          title: "Visual Identity System",
          content: "Create scalable design systems, not just individual assets:",
          subsections: [
            {
              title: "Logo Architecture",
              content: "Design primary, secondary, and submark logos. Each serves different use cases while maintaining recognition."
            },
            {
              title: "Design Tokens",
              content: "Establish color palettes (primary, secondary, accent), typography scales, spacing systems, and component libraries for consistency."
            }
          ]
        }
      ],
      highlight: {
        icon: "Briefcase",
        text: "Document everything in a brand book. Even solo founders need this reference to maintain consistency as the team grows."
      },
      quote: "Your brand is what people say about you when you're not in the room. Design every touchpoint to shape that conversation.",
      pitfalls: [
        {
          title: "Designing in a vacuum",
          description: "Brands exist in competitive contexts. Research competitors thoroughly to differentiate, not imitate."
        },
        {
          title: "Ignoring implementation",
          description: "Beautiful brand guidelines are useless without considering real-world applications (email signatures, social media, merchandise)."
        }
      ],
      applications: "Tech startups need scalable design systems. DTC brands require emotional resonance. B2B companies need professional credibility. All benefit from clear brand architecture.",
      conclusion: "Startup branding is an investment that compounds over time. Begin with strategic foundations, build flexible visual systems, implement consistently across all touchpoints, and evolve as you learn from market feedback."
    }
  }
];

// ========== BLOG API ROUTES ==========

// Get all blog posts
app.get('/api/blogs', (req, res) => {
  try {
    const formattedBlogs = blogPosts.map(blog => ({
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

// ========== STATIC FILE SERVING ==========

// Serve static files from React build directory
const buildPath = path.join(__dirname, 'dist'); // Change to 'dist' if using Vite
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

// All other requests return the React app
app.use((req, res) => {
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

export { app, server, io };