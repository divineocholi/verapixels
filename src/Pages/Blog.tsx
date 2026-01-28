import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, User, Calendar, Share2, TrendingUp, ChevronRight, Search, 
  Palette, Code, Zap, Lightbulb, Briefcase, FileText, Check, X, AlertTriangle,
  CheckCircle, XCircle, Brain, BookOpen, Target, Award
} from 'lucide-react';

// API Configuration
const API_URL = import.meta.env.PROD 
  ? 'https://verapixels-server.onrender.com'
  : '';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  difficulty?: string;
  gradient: string;
  image: string;
  detailedContent?: {
    lead: string;
    targetAudience?: {
      ideal: string[];
      requirements: string;
    };
    sections: Array<{
      title: string;
      content: string;
      subsections?: Array<{
        title: string;
        content: string;
      }>;
    }>;
    highlight: {
      icon: string;
      text: string;
    };
    quote: string;
    pitfalls: Array<{
      title: string;
      description: string;
    }>;
    caseStudy?: {
      title: string;
      data: string;
    };
    quickStartGuide?: {
      title: string;
      steps: string[];
    };
    measurementGuide?: {
      title: string;
      metrics: Array<{
        name: string;
        target: string;
        meaning: string;
      }>;
    };
    implementationGuide?: {
      title: string;
      phases: Array<{
        week?: string;
        quarter?: string;
        focus: string;
        actions: string[];
      }>;
    };
    nextSteps?: {
      title: string;
      content: string;
      cta: {
        primary: string;
        secondary: string;
      };
    };
    advancedTools?: string[];
    applications: string;
    conclusion: string;
  };
}

const Blog = () => {
  const { id: blogIdFromURL } = useParams();
  const navigate = useNavigate();
  
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Helper functions for SEO meta tags
  const updateMetaTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`) || 
               document.querySelector(`meta[name="${property}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      if (property.startsWith('og:')) {
        tag.setAttribute('property', property);
      } else if (property.startsWith('twitter:')) {
        tag.setAttribute('name', property);
      } else {
        tag.setAttribute('name', property);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const updateCanonicalUrl = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  };

  const updateMetaTags = (blog: BlogPost) => {
    document.title = `${blog.title} | Expert Insights Blog`;
    updateMetaTag('description', blog.excerpt);
    updateMetaTag('og:title', blog.title);
    updateMetaTag('og:description', blog.excerpt);
    updateMetaTag('og:image', blog.image);
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:site_name', 'Expert Insights Blog');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', blog.title);
    updateMetaTag('twitter:description', blog.excerpt);
    updateMetaTag('twitter:image', blog.image);
    updateMetaTag('article:published_time', blog.date + 'T00:00:00Z');
    updateMetaTag('article:modified_time', blog.date + 'T00:00:00Z');
    updateMetaTag('article:author', blog.author);
    updateMetaTag('article:section', blog.category);
    updateCanonicalUrl(window.location.href);
    addStructuredData(blog);
  };

  const resetMetaTags = () => {
    document.title = 'Expert Insights Blog | Industry Knowledge & Tutorials';
    updateMetaTag('description', 'Discover expert guides, tutorials, and industry insights to grow your business and master your craft');
    updateCanonicalUrl(window.location.origin + '/blog');
    updateMetaTag('og:title', 'Expert Insights Blog | Industry Knowledge & Tutorials');
    updateMetaTag('og:description', 'Discover expert guides, tutorials, and industry insights to grow your business and master your craft');
    updateMetaTag('og:url', window.location.origin + '/blog');
    updateMetaTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Expert Insights Blog | Industry Knowledge & Tutorials');
    updateMetaTag('twitter:description', 'Discover expert guides, tutorials, and industry insights to grow your business and master your craft');
  };

  const addStructuredData = (blog: BlogPost) => {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.excerpt,
      "image": blog.image,
      "datePublished": blog.date + 'T00:00:00Z',
      "dateModified": blog.date + 'T00:00:00Z',
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Expert Insights",
        "logo": {
          "@type": "ImageObject",
          "url": window.location.origin + "/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (blogIdFromURL && blogPosts.length > 0) {
      const blog = blogPosts.find(post => post.id === blogIdFromURL);
      if (blog) {
        setTimeout(() => openBlog(blog), 50);
      } else {
        fetchBlogById(blogIdFromURL);
      }
    }
  }, [blogIdFromURL, blogPosts]);

  useEffect(() => {
    if (selectedBlog) {
      updateMetaTags(selectedBlog);
      fetchRelatedBlogs(selectedBlog);
    } else {
      resetMetaTags();
    }
  }, [selectedBlog]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      const data = await response.json();
      
      if (data.success) {
        setBlogPosts(data.blogs);
        
        if ((window as any).__INITIAL_BLOG_DATA__) {
          setSelectedBlog((window as any).__INITIAL_BLOG_DATA__);
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogById = async (blogId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blogId}`);
      const data = await response.json();
      
      if (data.success && data.blog) {
        openBlog(data.blog);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/categories/all`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRelatedBlogs = async (blog: BlogPost) => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/category/${blog.category}`);
      const data = await response.json();
      
      if (data.success) {
        const related = data.blogs
          .filter((post: BlogPost) => post.id !== blog.id)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const openBlog = (blog: BlogPost) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedBlog(blog);
      navigate(`/blog/${blog.id}`, { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAnimating(false);
    }, 300);
  };

  const closeBlog = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedBlog(null);
      navigate('/blog');
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
          console.log('Share cancelled');
        }
      } else {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchBlogs();
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/blogs/search/${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogPosts(data.blogs);
      }
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      fetchBlogs();
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/blogs/category/${category}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogPosts(data.blogs);
      }
    } catch (error) {
      console.error('Error filtering blogs:', error);
    }
  };

  const filteredBlogs = blogPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchQuery('');
    fetchBlogs();
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    
    const badges = {
      beginner: { icon: '🟢', label: 'Beginner', color: '#10b981' },
      intermediate: { icon: '🟡', label: 'Intermediate', color: '#f59e0b' },
      advanced: { icon: '🔴', label: 'Advanced', color: '#ef4444' }
    };
    
    const badge = badges[difficulty as keyof typeof badges];
    if (!badge) return null;
    
    return (
      <span className="difficulty-badge" style={{ borderColor: badge.color, color: badge.color }}>
        <span>{badge.icon}</span>
        <span>{badge.label}</span>
      </span>
    );
  };

  const iconMap: Record<string, React.ComponentType<any>> = {
    Design: Palette,
    Performance: Zap,
    Development: Code,
    Business: Briefcase,
    Content: FileText,
    Brain: Brain,
    Language: FileText
  };

  if (loading && !selectedBlog) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {!selectedBlog ? (
        <div className="blog-listing">
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
              
              <div className={`blog-search-container ${isSearchExpanded ? 'expanded' : ''}`}>
                {isSearchExpanded && (
                  <button 
                    className="search-close-btn"
                    onClick={() => setIsSearchExpanded(false)}
                    aria-label="Close search"
                  >
                    <X size={20} />
                  </button>
                )}
                <form onSubmit={handleSearch} className="blog-search-bar">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      className="search-clear-btn"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button type="submit" className="search-btn desktop-only">
                    Search
                  </button>
                  <button type="submit" className="search-btn mobile-only" aria-label="Search">
                    <Search size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="blog-filters">
            <div className="blog-filters-container">
              <div className="category-pills-wrapper">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="blog-grid-container">
            {filteredBlogs.length === 0 ? (
              <div className="no-results">
                <h3>No blog posts found</h3>
                <p>Try a different search or category</p>
                <button className="clear-filters-btn" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredBlogs.map((post, index) => {
                  const IconComponent = iconMap[post.category] || FileText;
                  return (
                    <article
                      key={post.id}
                      className="blog-card"
                      onClick={() => openBlog(post)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="blog-card-image-wrapper">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="blog-card-image"
                          loading="lazy"
                        />
                        <div className="blog-card-overlay" style={{ background: post.gradient }}></div>
                        <div className="blog-category-badge">
                          <IconComponent size={16} />
                          <span>{post.category}</span>
                        </div>
                        {post.difficulty && (
                          <div className="blog-difficulty-badge">
                            {getDifficultyBadge(post.difficulty)}
                          </div>
                        )}
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
            )}
          </div>
        </div>
      ) : (
        <div className={`blog-detail ${isAnimating ? 'closing' : 'opening'}`}>
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
                aria-label={shareCopied ? "Link copied" : "Share this article"}
              >
                {shareCopied ? <Check size={18} /> : <Share2 size={18} />}
              </button>
            </div>
          </div>

          <div className="blog-detail-hero">
            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title} 
              loading="eager"
            />
            <div className="blog-detail-overlay" style={{ background: selectedBlog.gradient }}></div>
          </div>

          <article className="blog-detail-content">
            <div className="blog-detail-meta">
              <div className="meta-badges">
                <span className="meta-category" style={{ background: selectedBlog.gradient }}>
                  {selectedBlog.category}
                </span>
                {selectedBlog.difficulty && getDifficultyBadge(selectedBlog.difficulty)}
              </div>
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

            {/* Target Audience Section */}
            {selectedBlog.detailedContent?.targetAudience && (
              <div className="target-audience-section">
                <div className="target-audience-header">
                  <Target size={20} />
                  <h3>This Article is For:</h3>
                </div>
                <ul className="target-audience-list">
                  {selectedBlog.detailedContent.targetAudience.ideal.map((person, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{person}</span>
                    </li>
                  ))}
                </ul>
                <p className="prerequisites">
                  <strong>Prerequisites:</strong> {selectedBlog.detailedContent.targetAudience.requirements}
                </p>
              </div>
            )}
            
            <div className="blog-detail-body">
              <p className="lead-paragraph">{selectedBlog.detailedContent?.lead || selectedBlog.excerpt}</p>
              
              {selectedBlog.detailedContent?.sections?.map((section, index) => (
                <div key={index} className="content-section">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                  
                  {section.subsections?.map((subsection, subIndex) => (
                    <div key={subIndex} className="subsection">
                      <h3>{subsection.title}</h3>
                      <p>{subsection.content}</p>
                    </div>
                  ))}
                </div>
              ))}

              {selectedBlog.detailedContent?.highlight && (
                <div className="content-highlight">
                  <Lightbulb size={24} />
                  <div>
                    <strong>Key Insight:</strong> {selectedBlog.detailedContent.highlight.text}
                  </div>
                </div>
              )}

              {selectedBlog.detailedContent?.quote && (
                <div className="content-quote">
                  "{selectedBlog.detailedContent.quote}"
                </div>
              )}

              {/* Quick Start Guide */}
              {selectedBlog.detailedContent?.quickStartGuide && (
                <div className="quick-start-section">
                  <div className="quick-start-header">
                    <Zap size={24} />
                    <h2>{selectedBlog.detailedContent.quickStartGuide.title}</h2>
                  </div>
                  <div className="quick-start-steps">
                    {selectedBlog.detailedContent.quickStartGuide.steps.map((step, idx) => (
                      <div key={idx} className="quick-start-step">
                        <div className="step-number">{idx + 1}</div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Measurement Guide */}
              {selectedBlog.detailedContent?.measurementGuide && (
                <div className="measurement-section">
                  <h2>{selectedBlog.detailedContent.measurementGuide.title}</h2>
                  <div className="metrics-grid">
                    {selectedBlog.detailedContent.measurementGuide.metrics.map((metric, idx) => (
                      <div key={idx} className="metric-card">
                        <h4>{metric.name}</h4>
                        <div className="metric-target">
                          <Award size={18} />
                          <span>Target: {metric.target}</span>
                        </div>
                        <p className="metric-meaning">{metric.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Implementation Guide */}
              {selectedBlog.detailedContent?.implementationGuide && (
                <div className="implementation-section">
                  <h2>{selectedBlog.detailedContent.implementationGuide.title}</h2>
                  <div className="implementation-phases">
                    {selectedBlog.detailedContent.implementationGuide.phases.map((phase, idx) => (
                      <div key={idx} className="phase-card">
                        <div className="phase-header">
                          <span className="phase-label">{phase.week || phase.quarter}</span>
                          <h4>{phase.focus}</h4>
                        </div>
                        <ul className="phase-actions">
                          {phase.actions.map((action, actionIdx) => (
                            <li key={actionIdx}>
                              <CheckCircle size={14} />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlog.detailedContent?.pitfalls && selectedBlog.detailedContent.pitfalls.length > 0 && (
                <div className="content-section">
                  <h2>Common Pitfalls to Avoid</h2>
                  <p>
                    Even with the best intentions, it's easy to make mistakes. Here are the most common pitfalls to watch out for:
                  </p>

                  <div className="pitfalls-grid">
                    {selectedBlog.detailedContent.pitfalls.map((pitfall, index) => (
                      <div key={index} className="pitfall-card">
                        <div className="pitfall-icon">
                          <AlertTriangle size={24} />
                        </div>
                        <div className="pitfall-content">
                          <h4>{pitfall.title}</h4>
                          <p>{pitfall.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlog.detailedContent?.caseStudy && (
                <div className="case-study-section">
                  <div className="case-study-header">
                    <BookOpen size={28} />
                    <h2>Case Study</h2>
                  </div>
                  <div className="case-study-content">
                    <h3>{selectedBlog.detailedContent.caseStudy.title}</h3>
                    <p>{selectedBlog.detailedContent.caseStudy.data}</p>
                  </div>
                </div>
              )}

              {selectedBlog.detailedContent?.advancedTools && selectedBlog.detailedContent.advancedTools.length > 0 && (
                <div className="content-section">
                  <h2>Tools & Resources</h2>
                  <p>
                    {selectedBlog.difficulty === 'beginner' 
                      ? 'Get started with these easy-to-use tools:'
                      : 'Take your implementation to the next level with these professional-grade tools:'}
                  </p>
                  
                  <div className="tools-grid">
                    {selectedBlog.detailedContent.advancedTools.map((tool, index) => (
                      <div key={index} className="tool-card">
                        <CheckCircle size={20} />
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlog.detailedContent?.applications && (
                <div className="content-section">
                  <h2>Real-World Applications</h2>
                  <p>{selectedBlog.detailedContent.applications}</p>
                </div>
              )}

              {selectedBlog.detailedContent?.conclusion && (
                <div className="content-section">
                  <h2>Moving Forward</h2>
                  <p>{selectedBlog.detailedContent.conclusion}</p>
                </div>
              )}

              {/* Next Steps CTA */}
              {selectedBlog.detailedContent?.nextSteps ? (
                <div className="next-steps-section">
                  <h3>{selectedBlog.detailedContent.nextSteps.title}</h3>
                  <p>{selectedBlog.detailedContent.nextSteps.content}</p>
                  <div className="cta-buttons">
                    <button className="cta-btn primary" style={{ background: selectedBlog.gradient }}>
                      {selectedBlog.detailedContent.nextSteps.cta.primary}
                    </button>
                    <button className="cta-btn secondary">
                      {selectedBlog.detailedContent.nextSteps.cta.secondary}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="content-cta">
                  <h3>Ready to Get Started?</h3>
                  <p>Apply these insights to your projects and watch your results transform. Remember, the best time to start is now.</p>
                  <button className="cta-btn" style={{ background: selectedBlog.gradient }}>
                    Implement These Strategies
                  </button>
                </div>
              )}
            </div>

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

            {relatedBlogs.length > 0 && (
              <div className="related-articles">
                <h3>Related Articles</h3>
                <div className="related-grid">
                  {relatedBlogs.map(post => {
                    const IconComponent = iconMap[post.category] || FileText;
                    return (
                      <div
                        key={post.id}
                        className="related-card"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'instant' });
                          setIsAnimating(true);
                          setTimeout(() => {
                            setSelectedBlog(post);
                            navigate(`/blog/${post.id}`);
                            setIsAnimating(false);
                          }, 300);
                        }}
                      >
                        <div className="related-image">
                          <img src={post.image} alt={post.title} loading="lazy" />
                        </div>
                        <div className="related-content">
                          <div className="related-badge">
                            <IconComponent size={14} />
                            <span>{post.category}</span>
                          </div>
                          {post.difficulty && getDifficultyBadge(post.difficulty)}
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
            )}
          </article>
        </div>
      )}

      <style>{`
        .blog-page {
          min-height: 100vh;
          background: #000;
          color: #fff;
          padding-top: 80px;
        }

        .blog-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 20px;
        }

        .blog-loading .spinner {
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

        /* Difficulty Badge */
        .difficulty-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .blog-difficulty-badge {
          position: absolute;
          top: 16px;
          right: 16px;
        }

        .meta-badges {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        /* Target Audience Section */
        .target-audience-section {
          background: rgba(106, 0, 255, 0.05);
          border: 1px solid rgba(106, 0, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          margin: 30px 0;
        }

        .target-audience-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .target-audience-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: #00d4ff;
        }

        .target-audience-header svg {
          color: #00d4ff;
        }

        .target-audience-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px;
        }

        .target-audience-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 1rem;
        }

        .target-audience-list svg {
          color: #10b981;
          flex-shrink: 0;
        }

        .prerequisites {
          margin: 16px 0 0;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .prerequisites strong {
          color: #00d4ff;
        }

        /* Quick Start Section */
        .quick-start-section {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 16px;
          padding: 30px;
          margin: 50px 0;
        }

        .quick-start-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .quick-start-header svg {
          color: #10b981;
        }

        .quick-start-header h2 {
          margin: 0 !important;
          padding: 0 !important;
        }

        .quick-start-header h2::after {
          display: none;
        }

        .quick-start-steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .quick-start-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.03);
          padding: 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .quick-start-step:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }

        .step-number {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .quick-start-step p {
          margin: 0;
          line-height: 1.6;
        }

        /* Measurement Section */
        .measurement-section {
          margin: 50px 0;
        }

        .metrics-grid {
          display: grid;
          gap: 20px;
          margin-top: 30px;
        }

        @media (min-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          border-color: #6a00ff;
          transform: translateY(-5px);
        }

        .metric-card h4 {
          margin: 0 0 12px;
          font-size: 1.1rem;
          color: #00d4ff;
        }

        .metric-target {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #10b981;
        }

        .metric-target svg {
          flex-shrink: 0;
        }

        .metric-meaning {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        /* Implementation Section */
        .implementation-section {
          margin: 50px 0;
        }

        .implementation-phases {
          display: grid;
          gap: 24px;
          margin-top: 30px;
        }

        .phase-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .phase-card:hover {
          border-color: #6a00ff;
        }

        .phase-header {
          margin-bottom: 16px;
        }

        .phase-label {
          display: inline-block;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .phase-header h4 {
          margin: 8px 0 0;
          font-size: 1.2rem;
          color: #fff;
        }

        .phase-actions {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .phase-actions li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .phase-actions svg {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 4px;
        }

        /* Next Steps Section */
        .next-steps-section {
          background: linear-gradient(135deg, rgba(106, 0, 255, 0.1), rgba(0, 212, 255, 0.1));
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          margin: 60px 0;
        }

        .next-steps-section h3 {
          font-size: 2rem;
          margin: 0 0 16px;
        }

        .next-steps-section p {
          margin: 0 0 32px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          border: none;
          color: #fff;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-btn.primary {
          box-shadow: 0 20px 40px rgba(106, 0, 255, 0.3);
        }

        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
        }

        .cta-btn.primary:hover {
          box-shadow: 0 25px 50px rgba(106, 0, 255, 0.5);
        }

        .cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Rest of the existing styles... */
        .blog-hero {
          position: relative;
          padding: 60px 20px 40px;
          text-align: center;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .blog-hero {
            padding: 120px 20px 80px;
          }
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
          position: relative;
          z-index: 10;
        }

        .blog-hero-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.1;
          position: relative;
          z-index: 10;
        }

        .gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 768px) {
          .blog-hero-subtitle {
            font-size: 1.2rem;
          }
        }

        .blog-search-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .blog-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 12px 20px;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .blog-search-bar {
            padding: 16px 24px;
          }
        }

        .blog-search-bar:focus-within {
          border-color: #6a00ff;
          box-shadow: 0 0 40px rgba(106, 0, 255, 0.3);
        }

        .blog-search-bar svg {
          color: rgba(255, 255, 255, 0.5);
          margin-right: 12px;
          flex-shrink: 0;
        }

        .blog-search-bar input {
          flex: 1;
          background: none;
          border: none;
          color: #fff;
          font-size: 1rem;
          outline: none;
          min-width: 0;
        }

        .blog-search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-clear-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 4px;
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .search-clear-btn:hover {
          color: #fff;
        }

        .search-btn {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border: none;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(106, 0, 255, 0.3);
        }

        .search-close-btn {
          display: none;
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          z-index: 11;
        }

        .mobile-only {
          display: none;
        }

        .desktop-only {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .blog-search-container.expanded {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            z-index: 1000;
            padding: 80px 20px 0;
            margin: 0;
            max-width: none;
          }

          .blog-search-container.expanded .blog-search-bar {
            border-radius: 20px;
            padding: 16px 20px;
            background: rgba(255, 255, 255, 0.1);
          }

          .blog-search-container.expanded .search-close-btn {
            display: block;
          }

          .mobile-only {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            width: 44px;
            height: 44px;
          }

          .desktop-only {
            display: none;
          }

          .blog-search-bar input {
            font-size: 1.1rem;
          }
        }

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

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
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

        .no-results {
          text-align: center;
          padding: 60px 20px;
        }

        .no-results h3 {
          font-size: 2rem;
          margin-bottom: 16px;
        }

        .no-results p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .clear-filters-btn {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-filters-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(106, 0, 255, 0.3);
        }

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

        .blog-detail-hero {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .blog-detail-hero {
            height: 500px;
          }
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
          padding: 40px 20px;
        }

        @media (min-width: 768px) {
          .blog-detail-content {
            padding: 60px 20px;
          }
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
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (min-width: 768px) {
          .blog-detail-body {
            font-size: 1.1rem;
          }
        }

        .lead-paragraph {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.7;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .lead-paragraph {
            font-size: 1.3rem;
          }
        }

        .content-section {
          margin-bottom: 50px;
        }

        .blog-detail-body h2 {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 60px 0 24px;
          color: #fff;
          position: relative;
          padding-bottom: 12px;
        }

        @media (min-width: 768px) {
          .blog-detail-body h2 {
            font-size: 2rem;
          }
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
          font-size: 1.3rem;
          font-weight: 700;
          margin: 40px 0 20px;
          color: #fff;
        }

        @media (min-width: 768px) {
          .blog-detail-body h3 {
            font-size: 1.5rem;
          }
        }

        .blog-detail-body p {
          margin-bottom: 24px;
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
          padding: 20px;
          border-radius: 12px;
          margin: 40px 0;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .content-highlight {
            padding: 24px;
          }
        }

        .content-highlight svg {
          color: #6a00ff;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .content-quote {
          background: rgba(255, 255, 255, 0.02);
          border-left: 4px solid #00d4ff;
          padding: 24px;
          margin: 40px 0;
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          position: relative;
        }

        @media (min-width: 768px) {
          .content-quote {
            padding: 32px;
            margin: 50px 0;
            font-size: 1.4rem;
          }
        }

        .content-quote::before {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 3rem;
          color: rgba(0, 212, 255, 0.2);
          font-family: serif;
          line-height: 1;
        }

        @media (min-width: 768px) {
          .content-quote::before {
            font-size: 4rem;
          }
        }

        .pitfalls-grid {
          display: grid;
          gap: 20px;
          margin-top: 30px;
        }

        @media (min-width: 768px) {
          .pitfalls-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .pitfall-card {
          background: rgba(255, 0, 0, 0.05);
          border: 1px solid rgba(255, 0, 0, 0.2);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .pitfall-card:hover {
          border-color: rgba(255, 0, 0, 0.4);
          transform: translateY(-2px);
        }

        .pitfall-icon {
          color: #ff6b6b;
          flex-shrink: 0;
        }

        .pitfall-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 8px;
          color: #ff6b6b;
        }

        .pitfall-content p {
          margin: 0;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .case-study-section {
          background: linear-gradient(135deg, rgba(106, 0, 255, 0.1), rgba(0, 212, 255, 0.1));
          border: 1px solid rgba(106, 0, 255, 0.3);
          border-radius: 16px;
          padding: 30px;
          margin: 50px 0;
        }

        @media (min-width: 768px) {
          .case-study-section {
            padding: 40px;
          }
        }

        .case-study-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .case-study-header svg {
          color: #00d4ff;
        }

        .case-study-header h2 {
          margin: 0;
          font-size: 1.8rem;
        }

        .case-study-content h3 {
          font-size: 1.3rem;
          margin: 0 0 16px;
          color: #00d4ff;
        }

        .case-study-content p {
          margin: 0;
          line-height: 1.7;
        }

        .tools-grid {
          display: grid;
          gap: 16px;
          margin-top: 30px;
        }

        @media (min-width: 768px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          border-color: #6a00ff;
          transform: translateX(5px);
        }

        .tool-card svg {
          color: #00d4ff;
          flex-shrink: 0;
        }

        .tool-card span {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .content-cta {
          background: linear-gradient(135deg, rgba(106, 0, 255, 0.1), rgba(0, 212, 255, 0.1));
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          margin: 60px 0;
        }

        @media (min-width: 768px) {
          .content-cta {
            padding: 40px;
          }
        }

        .content-cta h3 {
          font-size: 1.8rem;
          margin: 0 0 16px;
        }

        @media (min-width: 768px) {
          .content-cta h3 {
            font-size: 2rem;
          }
        }

        .content-cta p {
          margin: 0 0 32px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (min-width: 768px) {
          .content-cta p {
            font-size: 1.1rem;
          }
        }

        .author-bio {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          margin: 60px 0;
          display: flex;
          gap: 20px;
          align-items: center;
        }

        @media (min-width: 768px) {
          .author-bio {
            padding: 32px;
            gap: 24px;
          }
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 900;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .author-avatar {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }
        }

        .author-info h4 {
          font-size: 1.2rem;
          margin: 0 0 8px;
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .author-info h4 {
            font-size: 1.3rem;
          }
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
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0 0 40px;
        }

        @media (min-width: 768px) {
          .related-articles h3 {
            font-size: 2rem;
          }
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
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

          .author-bio {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;