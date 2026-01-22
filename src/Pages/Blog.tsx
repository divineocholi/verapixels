import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, TrendingUp, ChevronRight, Search, Filter, Palette, Code, Zap, Lightbulb, Briefcase, FileText, X, Menu } from 'lucide-react';

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
}

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);

  // Blog data
  const blogPosts: BlogPost[] = [
    {
      id: "5-ui-ux-tricks",
      title: "5 UI/UX Tricks That Make Websites Feel Premium",
      excerpt: "Discover the secret design patterns that top tech companies use to create luxury digital experiences.",
      author: "Sarah Chen",
      readTime: "8 min read",
      date: "Oct 25, 2024",
      category: "Design",
      icon: Palette,
      gradient: "linear-gradient(135deg, #6a00ff 0%, #8b5cf6 100%)",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop"
    },
    {
      id: "website-speed-revenue",
      title: "How Fast Websites Boost Business Revenue",
      excerpt: "Learn why website speed is directly tied to conversion rates and discover optimization techniques.",
      author: "Michael Zhang",
      readTime: "6 min read",
      date: "Oct 22, 2024",
      category: "Performance",
      icon: Zap,
      gradient: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
    },
    {
      id: "smooth-animations-tech",
      title: "The Tech Behind Smooth Animations",
      excerpt: "Dive deep into the frameworks and principles that power buttery-smooth animations.",
      author: "Alex Rivera",
      readTime: "10 min read",
      date: "Oct 20, 2024",
      category: "Development",
      icon: Code,
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=600&fit=crop"
    },
    {
      id: "naming-your-business",
      title: "The Complete Guide to Naming Your Business",
      excerpt: "Master the art and science of creating a memorable business name that resonates with customers.",
      author: "Jessica Thompson",
      readTime: "12 min read",
      date: "Oct 18, 2024",
      category: "Business",
      icon: Briefcase,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop"
    },
    {
      id: "case-study-writing-guide",
      title: "How to Write Compelling Case Studies That Convert",
      excerpt: "Learn the proven formula for creating case studies that showcase your expertise and persuade customers.",
      author: "David Martinez",
      readTime: "11 min read",
      date: "Oct 15, 2024",
      category: "Content",
      icon: FileText,
      gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
    },
    {
      id: "startup-branding-essentials",
      title: "Startup Branding Essentials: Build Your Identity",
      excerpt: "Everything you need to know about creating a strong brand identity from day one.",
      author: "Emma Rodriguez",
      readTime: "9 min read",
      date: "Oct 12, 2024",
      category: "Business",
      icon: Lightbulb,
      gradient: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop"
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

          {/* Category Filter */}
          <div className="blog-filters">
            <div className="blog-filters-container">
              <Filter size={18} />
              <div className="category-pills">
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
              <button className="action-btn">
                <Bookmark size={18} />
              </button>
              <button className="action-btn">
                <Share2 size={18} />
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
              <p className="lead-paragraph">{selectedBlog.excerpt}</p>
              
              <h2>Understanding the Fundamentals</h2>
              <p>
                In today's digital landscape, mastering these concepts is more crucial than ever. Whether you're a seasoned professional or just starting out, understanding the core principles will set you apart from the competition and help you achieve remarkable results.
              </p>

              <p>
                The key to success lies in implementing proven strategies consistently while remaining flexible enough to adapt to changing circumstances. This guide will walk you through everything you need to know to excel in this area.
              </p>

              <div className="content-highlight">
                <Lightbulb size={24} />
                <div>
                  <strong>Pro Tip:</strong> Always start with a solid foundation. Rushing into implementation without proper planning leads to costly mistakes and wasted time.
                </div>
              </div>

              <h2>Key Strategies for Success</h2>
              <p>
                Let's dive into the specific tactics that will help you achieve your goals. Each of these strategies has been tested in real-world scenarios and proven to deliver consistent results.
              </p>

              <h3>1. Start With Research and Planning</h3>
              <p>
                Before jumping into execution, invest time in thorough research. Understand your target audience, analyze competitors, and identify gaps in the market. This groundwork will inform every decision you make moving forward.
              </p>

              <h3>2. Focus on Quality Over Quantity</h3>
              <p>
                It's tempting to prioritize output, but quality always wins in the long run. Whether you're creating content, building products, or developing services, ensure that every element meets high standards.
              </p>

              <h3>3. Test, Measure, and Optimize</h3>
              <p>
                The most successful professionals never stop improving. Implement systems to track performance, gather feedback, and make data-driven adjustments. This iterative approach leads to continuous growth.
              </p>

              <div className="content-quote">
                "Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill
              </div>

              <h2>Common Pitfalls to Avoid</h2>
              <p>
                Even with the best intentions, it's easy to make mistakes. Here are the most common pitfalls and how to avoid them:
              </p>

              <ul>
                <li><strong>Neglecting mobile optimization:</strong> Over 60% of users browse on mobile devices. Ensure your solutions work flawlessly across all screen sizes.</li>
                <li><strong>Ignoring user feedback:</strong> Your audience knows what they want. Listen to their input and incorporate it into your strategy.</li>
                <li><strong>Overcomplicating things:</strong> Simple solutions often work best. Don't add complexity for complexity's sake.</li>
                <li><strong>Failing to stay updated:</strong> Industries evolve rapidly. Commit to continuous learning and adaptation.</li>
              </ul>

              <h2>Real-World Applications</h2>
              <p>
                Theory is valuable, but practical application is where true learning happens. Here are concrete examples of how these principles work in action:
              </p>

              <p>
                Companies that implement these strategies typically see improvements ranging from 30% to 300% across key metrics. The exact results depend on your starting point, industry, and execution quality, but the potential for transformation is undeniable.
              </p>

              <h2>Moving Forward</h2>
              <p>
                Now that you understand the fundamentals, it's time to take action. Start with one strategy, master it, then build on that foundation. Remember that sustainable success comes from consistent effort over time, not overnight miracles.
              </p>

              <p>
                The journey ahead will have challenges, but armed with this knowledge and a commitment to excellence, you're well-positioned to achieve outstanding results. Keep learning, stay curious, and never stop pushing your boundaries.
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

        .blog-filters {
          padding: 40px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .blog-filters-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .blog-filters-container svg {
          color: rgba(255, 255, 255, 0.5);
        }

        .category-pills {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          flex: 1;
        }

        .category-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-pill:hover {
          border-color: #6a00ff;
          color: #fff;
        }

        .category-pill.active {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-color: transparent;
          color: #fff;
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
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
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
        }

        .blog-detail-body h2 {
          font-size: 2rem;
          font-weight: 800;
          margin: 60px 0 24px;
          color: #fff;
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
            flex-direction: column;
            align-items: flex-start;
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
      `}</style>
    </div>
  );
};

export default Blog;