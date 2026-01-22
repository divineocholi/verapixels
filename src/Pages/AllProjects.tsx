import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  client: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const AllProjects = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projectRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "TechFlow Dashboard",
      category: "Website",
      description: "Modern SaaS platform with real-time analytics and intuitive workflow management.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      tags: ["React", "Node.js", "Dashboard"],
      year: "2025",
      client: "TechFlow Inc.",
      stats: [
        { label: "Growth", value: "+250%" },
        { label: "Score", value: "95/100" }
      ]
    },
    {
      id: 2,
      title: "Nexus Brand Identity",
      category: "Logo Design",
      description: "Complete brand identity system with modern logo and comprehensive guidelines.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop",
      tags: ["Logo", "Branding", "Identity"],
      year: "2025",
      client: "Nexus Corp",
      stats: [
        { label: "Recognition", value: "+320%" },
        { label: "Impact", value: "A+" }
      ]
    },
    {
      id: 3,
      title: "FinanceHub Portal",
      category: "Website",
      description: "Comprehensive financial management platform with advanced analytics tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      tags: ["Finance", "Dashboard", "Analytics"],
      year: "2024",
      client: "FinanceHub",
      stats: [
        { label: "Users", value: "50K+" },
        { label: "Uptime", value: "99.9%" }
      ]
    },
    {
      id: 4,
      title: "Design System Pro",
      category: "UI/UX Design",
      description: "Comprehensive design system with components, patterns, and documentation.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
      tags: ["UI/UX", "Design System", "Components"],
      year: "2025",
      client: "DesignCo",
      stats: [
        { label: "Components", value: "200+" },
        { label: "Adoption", value: "95%" }
      ]
    }
  ];

  const categories = ['All', 'Website', 'Logo Design', 'UI/UX Design'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observers = Object.entries(projectRefs.current).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => new Set(prev).add(Number(id)));
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleCaseStudyClick = (projectId: number) => {
    navigate(`/casestudies?project=${projectId}`);
  };

  return (
    <div className="projects-page">
      {/* Animated Background */}
      <div className="bg-particles">
        <div 
          className="particle particle-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="particle particle-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="particle particle-3"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * -0.02}px)`
          }}
        />
      </div>

      {/* Grid Overlay */}
      <div className="grid-overlay" />

      <div className="projects-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            Our Portfolio
          </div>
          <h1 className="hero-title">
            Crafting Digital
            <br />
            <span className="gradient-text">Masterpieces</span>
          </h1>
          <p className="hero-subtitle">
            Explore our collection of successful projects that showcase innovation, 
            creativity, and technical excellence. Each project tells a unique story 
            of transformation and growth.
          </p>
        </section>

        {/* Category Filter */}
        <section className="filter-section">
          <div className="filter-container">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="filter-indicator" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[project.id] = el; }}
              className={`project-card ${visibleProjects.has(project.id) ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="image-overlay" />
                
                {/* Badges */}
                <div className="project-badges">
                  <span className="category-badge">{project.category}</span>
                  <span className="year-badge">{project.year}</span>
                </div>

                {/* Hover Actions */}
                <div className="project-actions">
                  <button
                    onClick={() => handleCaseStudyClick(project.id)}
                    className="action-btn primary-action"
                  >
                    <span className="btn-icon">📖</span>
                    <span className="btn-text">View Case Study</span>
                  </button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-client">Client: {project.client}</p>
                </div>

                <p className="project-description">{project.description}</p>

                {/* Stats */}
                <div className="project-stats">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="stat-item">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action */}
                <button
                  onClick={() => handleCaseStudyClick(project.id)}
                  className="project-link"
                >
                  <span>Explore Project</span>
                  <span className="link-arrow">→</span>
                </button>
              </div>

              <div className="project-glow" />
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <div className="cta-icon">🚀</div>
            <h2 className="cta-title">
              Ready to Build Your
              <br />
              <span className="gradient-text">Next Big Thing?</span>
            </h2>
            <p className="cta-description">
              Let's collaborate and create something extraordinary together. 
              Get in touch for a free consultation.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                <span>Start a Project</span>
                <span className="btn-icon">✨</span>
              </button>
              <button className="cta-btn secondary">
                <span>Schedule Call</span>
                <span className="btn-icon">📞</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          overflow-x: hidden;
          width: 100%;
        }

        .projects-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          width: 100%;
        }

        .bg-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: float 15s ease-in-out infinite;
        }

        .particle-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: 10%;
          left: -10%;
        }

        .particle-2 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #9d4edd, #c77dff);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .particle-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #00ff88, #06ffa5);
          bottom: 10%;
          left: 50%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          background: 
            linear-gradient(90deg, rgba(0, 99, 244, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(0, 99, 244, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 1;
        }

        .projects-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 2;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 180px 0 80px;
          animation: fadeInUp 1s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 50px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeIn 1s ease 0.2s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .badge-icon {
          font-size: 1.2rem;
          animation: sparkle 2s ease infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          letter-spacing: -0.02em;
          animation: fadeInUp 1s ease 0.3s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 1s ease 0.4s both;
        }

        /* Filter Section */
        .filter-section {
          padding: 60px 0;
          animation: fadeIn 1s ease 0.6s both;
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        .filter-btn {
          position: relative;
          padding: 14px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .filter-btn:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 99, 244, 0.4);
          color: #fff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: #00bfff;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .filter-btn.active::before {
          opacity: 1;
        }

        .filter-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 20px;
            opacity: 1;
          }
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 35px;
          padding: 60px 0 100px;
        }

        .project-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.4);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3),
                      0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .project-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card:hover .project-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.9));
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .project-card:hover .image-overlay {
          opacity: 1;
        }

        .project-badges {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }

        .category-badge,
        .year-badge {
          padding: 8px 18px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          animation: slideDown 0.6s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .category-badge {
          color: #00bfff;
          border-color: rgba(0, 191, 255, 0.3);
        }

        .year-badge {
          color: #c77dff;
          border-color: rgba(199, 125, 255, 0.3);
        }

        .project-actions {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          display: flex;
          gap: 15px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
        }

        .project-card:hover .project-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          border: none;
          border-radius: 15px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .primary-action {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .primary-action:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.6);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .btn-text {
          font-size: 1rem;
        }

        .project-content {
          padding: 24px;
        }

        .project-header {
          margin-bottom: 12px;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .project-card:hover .project-title {
          background: linear-gradient(135deg, #00bfff, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-client {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
        }

        .project-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 18px;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 18px;
          padding: 18px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .tag {
          padding: 6px 14px;
          background: rgba(0, 99, 244, 0.1);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 16px;
          font-size: 0.8rem;
          color: #00bfff;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tag:hover {
          background: rgba(0, 99, 244, 0.2);
          transform: translateY(-2px);
        }

        .project-link {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-link:hover {
          background: rgba(0, 99, 244, 0.2);
          border-color: rgba(0, 99, 244, 0.5);
          transform: translateX(5px);
        }

        .link-arrow {
          font-size: 1.3rem;
          transition: transform 0.3s ease;
        }

        .project-link:hover .link-arrow {
          transform: translateX(5px);
        }

        .project-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 99, 244, 0.3), transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          filter: blur(60px);
        }

        .project-card:hover .project-glow {
          opacity: 1;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0 120px;
          animation: fadeInUp 1s ease 0.8s both;
        }

        .cta-content {
          text-align: center;
          padding: 80px 60px;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), rgba(157, 78, 221, 0.05));
          border: 2px solid rgba(0, 99, 244, 0.3);
          border-radius: 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.1), transparent 70%);
          animation: pulse 3s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .cta-icon {
          font-size: 4rem;
          margin-bottom: 30px;
          animation: bounce 2s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .cta-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }

        .cta-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto 40px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 40px;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.4);
        }

        .cta-btn.primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 99, 244, 0.6);
        }

        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 2px solid rgba(0, 99, 244, 0.4);
        }

        .cta-btn.secondary:hover {
          background: rgba(0, 99, 244, 0.2);
          transform: translateY(-5px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .projects-container {
            padding: 0 20px;
          }

          .hero-section {
            padding: 140px 0 60px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .project-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .stat-value {
            font-size: 1.2rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .cta-content {
            padding: 60px 30px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn {
            width: 100%;
            justify-content: center;
          }

          .filter-container {
            gap: 10px;
          }

          .filter-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .project-image-wrapper {
            height: 200px;
          }

          .project-content {
            padding: 20px;
          }

          .project-actions {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AllProjects;