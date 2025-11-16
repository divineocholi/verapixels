import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, User, TrendingUp, Zap, Palette, Code } from 'lucide-react';

const TechBlogSection = () => {
const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "5 UI/UX Tricks That Make Websites Feel Premium",
      excerpt: "Discover the secret design patterns that top tech companies use to create luxury digital experiences that captivate users.",
      author: "Sarah Chen",
      readTime: "8 min read",
      date: "Oct 25, 2024",
      category: "Design",
      icon: Palette,
      gradient: "linear-gradient(135deg, #6a00ff 0%, #8b5cf6 100%)",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "How Fast Websites Boost Business Revenue",
      excerpt: "Learn why website speed is directly tied to conversion rates and discover optimization techniques that increase sales.",
      author: "Michael Zhang",
      readTime: "6 min read",
      date: "Oct 22, 2024",
      category: "Performance",
      icon: Zap,
      gradient: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "The Tech Behind Smooth Animations",
      excerpt: "Dive deep into the frameworks and principles that power buttery-smooth animations in modern web applications.",
      author: "Alex Rivera",
      readTime: "10 min read",
      date: "Oct 20, 2024",
      category: "Development",
      icon: Code,
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
    },
    
  ];

  return (
    <div className="blog-root" ref={sectionRef}>
      {/* Background Elements */}
      <div className="blog-bg-grid"></div>
      <div className="blog-bg-orbs"></div>

      <div className="blog-container">
        {/* Header */}
        <div className={`blog-header ${isInView ? 'blog-fade-in' : ''}`}>
          <div className="blog-badge">
            <div className="blog-badge-dot"></div>
            <span>INSIGHTS & INNOVATION</span>
          </div>
          
          <h2 className="blog-title">
            Latest From Our <span className="blog-gradient-text">Tech Blog</span>
          </h2>
          
          <p className="blog-subtitle">
            Stay ahead with cutting-edge insights, tutorials, and industry trends
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogPosts.map((post, index) => {
            const IconComponent = post.icon;
            return (
              <div
                key={post.id}
                className={`blog-card ${isInView ? 'blog-fade-in' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Image */}
                <div className="blog-card-image-wrapper">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="blog-card-image"
                  />
                  <div 
                    className="blog-card-overlay"
                    style={{ background: post.gradient }}
                  ></div>
                  
                  {/* Category Badge */}
                  <div className="blog-category-badge">
                    <IconComponent size={16} />
                    <span>{post.category}</span>
                  </div>

                  {/* 3D Floating Icon */}
                  <div 
                    className={`blog-floating-icon ${hoveredCard === post.id ? 'blog-icon-active' : ''}`}
                    style={{ background: post.gradient }}
                  >
                    <IconComponent size={32} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="blog-card-meta">
                    <div className="blog-meta-item">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="blog-meta-item">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button className="blog-read-more">
                    <span>Read Article</span>
                    <ArrowRight 
                      size={20} 
                      className={hoveredCard === post.id ? 'blog-arrow-active' : ''}
                    />
                  </button>
                </div>

                {/* 3D Effect Layers */}
                <div className="blog-card-3d-layer"></div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className={`blog-cta ${isInView ? 'blog-fade-in' : ''}`} style={{ animationDelay: '0.8s' }}>
          <button className="blog-view-all-btn">
            <span>View All Blog Posts</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .blog-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background Effects */
        .blog-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: blogGridMove 30s linear infinite;
        }

        @keyframes blogGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .blog-bg-orbs {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(106, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        }

        .blog-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .blog-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .blog-header.blog-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .blog-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          animation: blogPulse 2s ease-in-out infinite;
        }

        @keyframes blogPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }

        .blog-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .blog-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .blog-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }

        .blog-card.blog-fade-in {
          animation: blogCardFadeIn 0.8s ease forwards;
        }

        @keyframes blogCardFadeIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .blog-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: #6a00ff;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
        }

        /* Card Image */
        .blog-card-image-wrapper {
          position: relative;
          height: 240px;
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
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-overlay {
          opacity: 0.7;
        }

        .blog-category-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 3D Floating Icon */
        .blog-floating-icon {
          position: absolute;
          bottom: -30px;
          right: 20px;
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform: translateY(0) rotateX(0) rotateY(0);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .blog-floating-icon.blog-icon-active {
          transform: translateY(-20px) rotateX(-15deg) rotateY(15deg);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }

        /* Card Content */
        .blog-card-content {
          padding: 30px;
        }

        .blog-card-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 15px;
          line-height: 1.3;
          color: #fff;
        }

        .blog-card-excerpt {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin: 0 0 20px;
        }

        /* Meta Info */
        .blog-card-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .blog-meta-item svg {
          color: #00d4ff;
        }

        /* Read More Button */
        .blog-read-more {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .blog-read-more:hover {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-color: transparent;
          transform: translateY(-2px);
        }

        .blog-arrow-active {
          animation: blogArrowSlide 0.6s ease infinite;
        }

        @keyframes blogArrowSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        /* 3D Layer Effect */
        .blog-card-3d-layer {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          filter: blur(20px);
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-3d-layer {
          opacity: 0.3;
        }

        /* CTA Section */
        .blog-cta {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .blog-cta.blog-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-view-all-btn {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          color: #fff;
          padding: 20px 50px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.4);
          position: relative;
          overflow: hidden;
        }

        .blog-view-all-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00d4ff 0%, #6a00ff 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .blog-view-all-btn:hover::before {
          opacity: 1;
        }

        .blog-view-all-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.6);
        }

        .blog-view-all-btn span {
          position: relative;
          z-index: 1;
        }

        .blog-view-all-btn svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .blog-view-all-btn:hover svg {
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .blog-root {
            padding: 60px 20px;
          }

          .blog-header {
            margin-bottom: 50px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .blog-card-content {
            padding: 25px;
          }

          .blog-view-all-btn {
            padding: 16px 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TechBlogSection;