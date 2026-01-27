import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, TrendingUp, ChevronRight, Search, Filter, Palette, Code, Zap, Lightbulb, Briefcase, FileText, X, Menu, Copy, Check } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  icon: any;
  gradient: string;
  image: string;
  detailedContent: {
    lead: string;
    sections: Array<{
      title: string;
      content: string;
      subsections?: Array<{
        title: string;
        content: string;
      }>;
    }>;
    highlight: {
      icon: any;
      text: string;
    };
    quote: string;
    pitfalls: Array<{
      title: string;
      description: string;
    }>;
    applications: string;
    conclusion: string;
  };
}

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Scroll restoration effect - FIX FOR SCROLL ISSUE
  useEffect(() => {
    if (!selectedBlog) {
      // We're on the listing page, scroll to top
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [selectedBlog]);

  // Blog data with unique detailed content
  const blogPosts: BlogPost[] = [
    {
      id: "5-ui-ux-tricks",
      title: "5 UI/UX Tricks That Make Websites Feel Premium",
      excerpt: "Discover the secret design patterns that top tech companies use to create luxury digital experiences.",
      author: " Emmanuella Udom",
      readTime: "8 min read",
      date: "Oct 25, 2025",
      category: "Design",
      icon: Palette,
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
          icon: Lightbulb,
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
      author: "Ocholi Divine",
      readTime: "6 min read",
      date: "Oct 22, 2025",
      category: "Performance",
      icon: Zap,
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
          icon: Zap,
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
      author: "Freda Mbajiorgu",
      readTime: "10 min read",
      date: "Oct 20, 2025",
      category: "Development",
      icon: Code,
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
          icon: Code,
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
      author: "Ocholi Divine",
      readTime: "12 min read",
      date: "Oct 18, 2025",
      category: "Business",
      icon: Briefcase,
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
          icon: Lightbulb,
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
      author: "Precious",
      readTime: "11 min read",
      date: "Oct 15, 2024",
      category: "Content",
      icon: FileText,
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
          icon: FileText,
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
      author: "Ocholi Divine",
      readTime: "9 min read",
      date: "Oct 12, 2025",
      category: "Business",
      icon: Lightbulb,
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
          icon: Briefcase,
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

  const categories = ['All', 'Design', 'Performance', 'Development', 'Business', 'Content'];

  const filteredBlogs = blogPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openBlog = (blog: BlogPost) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedBlog(blog);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAnimating(false);
    }, 300);
  };

  const closeBlog = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedBlog(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleShare = async () => {
    if (selectedBlog) {
      const shareUrl = `${window.location.origin}/blog/${selectedBlog.id}`;
      const shareText = `Check out this article: ${selectedBlog.title} by ${selectedBlog.author}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: selectedBlog.title,
            text: shareText,
            url: shareUrl,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    }
  };

  return (
    <div className="blog-page">
      {!selectedBlog ? (
        /* Blog Listing Page */
        <div className="blog-listing">
          {/* Hero Section */}
          <div className="blog-hero">
            <div className="blog-hero-bg"></div>
            <div className="blog-hero-content">
              <div className="blog-badge">
                <TrendingUp size={16} />
                <span>KNOWLEDGE HUB</span>
              </div>
              <h1 className="blog-hero-title">
                Insights & <span className="gradient-text">Innovation</span>
              </h1>
              <p className="blog-hero-subtitle">
                Discover expert guides, tutorials, and industry insights to grow your business and master your craft
              </p>
              
              {/* Search Bar */}
              <div className="blog-search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Filter - Centered */}
          <div className="blog-filters">
            <div className="blog-filters-container">
              <div className="category-pills-wrapper">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid-container">
            <div className="blog-grid">
              {filteredBlogs.map((post, index) => {
                const IconComponent = post.icon;
                return (
                  <article
                    key={post.id}
                    className="blog-card"
                    onClick={() => openBlog(post)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="blog-card-image-wrapper">
                      <img src={post.image} alt={post.title} className="blog-card-image" />
                      <div className="blog-card-overlay" style={{ background: post.gradient }}></div>
                      <div className="blog-category-badge">
                        <IconComponent size={16} />
                        <span>{post.category}</span>
                      </div>
                    </div>

                    <div className="blog-card-content">
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>

                      <div className="blog-card-meta">
                        <div className="meta-item">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <button className="read-more-btn">
                        <span>Read Article</span>
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Blog Detail Page */
        <div className={`blog-detail ${isAnimating ? 'closing' : 'opening'}`}>
          {/* Header */}
          <div className="blog-detail-header">
            <button className="back-btn" onClick={closeBlog}>
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </button>
            
            <div className="blog-actions">
              <button 
                className="action-btn"
                onClick={handleShare}
                title={shareCopied ? "Copied!" : "Share article"}
              >
                {shareCopied ? <Check size={18} /> : <Share2 size={18} />}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="blog-detail-hero">
            <img src={selectedBlog.image} alt={selectedBlog.title} />
            <div className="blog-detail-overlay" style={{ background: selectedBlog.gradient }}></div>
          </div>

          {/* Content */}
          <article className="blog-detail-content">
            <div className="blog-detail-meta">
              <span className="meta-category" style={{ background: selectedBlog.gradient }}>
                {selectedBlog.category}
              </span>
              <div className="meta-info">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{selectedBlog.date}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{selectedBlog.readTime}</span>
                </div>
                <div className="meta-item">
                  <User size={16} />
                  <span>{selectedBlog.author}</span>
                </div>
              </div>
            </div>

            <h1 className="blog-detail-title">{selectedBlog.title}</h1>
            
            <div className="blog-detail-body">
              <p className="lead-paragraph">{selectedBlog.detailedContent.lead}</p>
              
              {selectedBlog.detailedContent.sections.map((section, index) => (
                <div key={index} className="content-section">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                  
                  {section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="subsection">
                      <h3>{subsection.title}</h3>
                      <p>{subsection.content}</p>
                    </div>
                  ))}
                </div>
              ))}

              <div className="content-highlight">
                {(() => {
                  const HighlightIcon = selectedBlog.detailedContent.highlight.icon;
                  return <HighlightIcon size={24} />;
                })()}
                <div>
                  <strong>Key Insight:</strong> {selectedBlog.detailedContent.highlight.text}
                </div>
              </div>

              <div className="content-quote">
                "{selectedBlog.detailedContent.quote}"
              </div>

              <h2>Common Pitfalls to Avoid</h2>
              <p>
                Even with the best intentions, it's easy to make mistakes. Here are the most common pitfalls specific to {selectedBlog.category.toLowerCase()}:
              </p>

              <ul>
                {selectedBlog.detailedContent.pitfalls.map((pitfall, index) => (
                  <li key={index}>
                    <strong>{pitfall.title}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>

              <h2>Real-World Applications</h2>
              <p>
                {selectedBlog.detailedContent.applications}
              </p>

              <h2>Moving Forward</h2>
              <p>
                {selectedBlog.detailedContent.conclusion}
              </p>

              <div className="content-cta">
                <h3>Ready to Get Started?</h3>
                <p>Apply these insights to your projects and watch your results transform. Remember, the best time to start is now.</p>
                <button className="cta-btn" style={{ background: selectedBlog.gradient }}>
                  Implement These Strategies
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="author-bio">
              <div className="author-avatar">
                {selectedBlog.author.charAt(0)}
              </div>
              <div className="author-info">
                <h4>{selectedBlog.author}</h4>
                <p>
                  Expert {selectedBlog.category} strategist with over 10 years of experience helping businesses achieve exceptional results. Passionate about sharing knowledge and empowering others to succeed.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="related-articles">
              <h3>Related Articles</h3>
              <div className="related-grid">
                {blogPosts
                  .filter(post => post.id !== selectedBlog.id && post.category === selectedBlog.category)
                  .slice(0, 3)
                  .map(post => {
                    const IconComponent = post.icon;
                    return (
                      <div
                        key={post.id}
                        className="related-card"
                        onClick={() => {
                          // Scroll to top before opening
                          window.scrollTo({ top: 0, behavior: 'instant' });
                          setIsAnimating(true);
                          setTimeout(() => {
                            setSelectedBlog(post);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsAnimating(false);
                          }, 300);
                        }}
                      >
                        <div className="related-image">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="related-content">
                          <div className="related-badge">
                            <IconComponent size={14} />
                            <span>{post.category}</span>
                          </div>
                          <h4>{post.title}</h4>
                          <div className="related-meta">
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </article>
        </div>
      )}

      <style>{`
        .blog-page {
          min-height: 100vh;
          background: #000;
          color: #fff;
        }

        /* Hero Section */
        .blog-hero {
          position: relative;
          padding: 120px 20px 80px;
          text-align: center;
          overflow: hidden;
        }

        .blog-hero-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(106, 0, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%);
        }

        .blog-hero-content {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .blog-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 24px;
        }

        .blog-hero-title {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .blog-search-bar {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 16px 24px;
          transition: all 0.3s ease;
        }

        .blog-search-bar:focus-within {
          border-color: #6a00ff;
          box-shadow: 0 0 40px rgba(106, 0, 255, 0.3);
        }

        .blog-search-bar svg {
          color: rgba(255, 255, 255, 0.5);
          margin-right: 12px;
        }

        .blog-search-bar input {
          flex: 1;
          background: none;
          border: none;
          color: #fff;
          font-size: 1rem;
          outline: none;
        }

        .blog-search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Centered Category Filters */
        .blog-filters {
          padding: 40px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
        }

        .blog-filters-container {
          max-width: 1400px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .category-pills-wrapper {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .category-pill:hover {
          border-color: #6a00ff;
          color: #fff;
          transform: translateY(-2px);
        }

        .category-pill.active {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 10px 20px rgba(106, 0, 255, 0.3);
        }

        .blog-grid-container {
          padding: 60px 20px 120px;
        }

        .blog-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 40px;
        }

        .blog-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: cardFadeIn 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes cardFadeIn {
          to {
            opacity: 1;
          }
        }

        .blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(106, 0, 255, 0.5);
          box-shadow: 0 30px 60px rgba(106, 0, 255, 0.3);
        }

        .blog-card-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .blog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card:hover .blog-card-image {
          transform: scale(1.1);
        }

        .blog-card-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-overlay {
          opacity: 0.6;
        }

        .blog-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .blog-card-content {
          padding: 24px;
        }

        .blog-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .blog-card-excerpt {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .blog-card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .meta-item svg {
          color: #00d4ff;
        }

        .read-more-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .read-more-btn:hover {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-color: transparent;
        }

        /* Blog Detail */
        .blog-detail {
          animation: slideIn 0.5s ease;
        }

        .blog-detail.closing {
          animation: slideOut 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50%);
          }
        }

        .blog-detail-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-5px);
        }

        .blog-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          border-color: #6a00ff;
        }

        .action-btn::after {
          content: attr(title);
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }

        .action-btn:hover::after {
          opacity: 1;
        }

        .blog-detail-hero {
          position: relative;
          height: 500px;
          overflow: hidden;
        }

        .blog-detail-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-detail-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
        }

        .blog-detail-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .blog-detail-meta {
          margin-bottom: 30px;
        }

        .meta-category {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .meta-info {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .blog-detail-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 900;
          margin: 0 0 40px;
          line-height: 1.2;
        }

        .blog-detail-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
        }

        .lead-paragraph {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.7;
          font-weight: 500;
        }

        .blog-detail-body h2 {
          font-size: 2rem;
          font-weight: 800;
          margin: 60px 0 24px;
          color: #fff;
          position: relative;
          padding-bottom: 12px;
        }

        .blog-detail-body h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #6a00ff, #00d4ff);
          border-radius: 2px;
        }

        .blog-detail-body h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 40px 0 20px;
          color: #fff;
        }

        .blog-detail-body p {
          margin-bottom: 24px;
        }

        .blog-detail-body ul, .blog-detail-body ol {
          margin: 24px 0;
          padding-left: 24px;
        }

        .blog-detail-body li {
          margin-bottom: 12px;
          line-height: 1.7;
        }

        .subsection {
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid;
          border-image: linear-gradient(135deg, #6a00ff, #00d4ff) 1;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }

        .content-highlight {
          background: rgba(106, 0, 255, 0.1);
          border-left: 4px solid #6a00ff;
          padding: 24px;
          border-radius: 12px;
          margin: 40px 0;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .content-highlight svg {
          color: #6a00ff;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .content-quote {
          background: rgba(255, 255, 255, 0.02);
          border-left: 4px solid #00d4ff;
          padding: 32px;
          margin: 50px 0;
          font-size: 1.4rem;
          font-style: italic;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          position: relative;
        }

        .content-quote::before {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 4rem;
          color: rgba(0, 212, 255, 0.2);
          font-family: serif;
          line-height: 1;
        }

        .content-cta {
          background: linear-gradient(135deg, rgba(106, 0, 255, 0.1), rgba(0, 212, 255, 0.1));
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          margin: 60px 0;
        }

        .content-cta h3 {
          font-size: 2rem;
          margin: 0 0 16px;
        }

        .content-cta p {
          margin: 0 0 32px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-btn {
          border: none;
          color: #fff;
          padding: 18px 40px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(106, 0, 255, 0.3);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(106, 0, 255, 0.5);
        }

        .author-bio {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 32px;
          margin: 60px 0;
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .author-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 900;
          flex-shrink: 0;
        }

        .author-info h4 {
          font-size: 1.3rem;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .author-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .related-articles {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .related-articles h3 {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 40px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .related-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-5px);
          border-color: rgba(106, 0, 255, 0.3);
          box-shadow: 0 20px 40px rgba(106, 0, 255, 0.2);
        }

        .related-image {
          height: 150px;
          overflow: hidden;
        }

        .related-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .related-card:hover .related-image img {
          transform: scale(1.1);
        }

        .related-content {
          padding: 20px;
        }

        .related-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .related-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .related-meta {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 768px) {
          .blog-hero {
            padding: 80px 20px 60px;
          }

          .blog-hero-title {
            font-size: 36px;
          }

          .blog-filters-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .category-pills-wrapper {
            justify-content: flex-start;
            min-width: max-content;
            padding-right: 20px;
          }

          .category-pill {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .blog-detail-hero {
            height: 300px;
          }

          .blog-detail-content {
            padding: 40px 20px;
          }

          .blog-detail-title {
            font-size: 32px;
          }

          .blog-detail-body {
            font-size: 1rem;
          }

          .author-bio {
            flex-direction: column;
            text-align: center;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }

          .content-quote {
            font-size: 1.1rem;
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .blog-filters {
            padding: 30px 15px;
          }

          .category-pill {
            padding: 8px 16px;
            font-size: 0.85rem;
          }

          .blog-detail-header {
            padding: 15px;
          }

          .back-btn span {
            display: none;
          }

          .back-btn {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;