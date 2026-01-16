import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiGithub,
  FiZap,
  FiLayers,
  FiMonitor,
  FiSmartphone,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiCheck,
  FiExternalLink
} from 'react-icons/fi';
import VeeAIChatbot from '../Components/VeeAIChatbot';

const UIUXDesignPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const portfolioProjects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      category: "Mobile Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      description: "Modern shopping experience with intuitive navigation",
      tools: ["Figma", "Sketch", "Principle"],
      caseStudyUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Banking Dashboard",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description: "Clean and secure financial management interface",
      tools: ["Adobe XD", "Figma", "After Effects"],
      caseStudyUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      category: "Mobile Design",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
      description: "Motivating workout and health monitoring experience",
      tools: ["Figma", "Protopie", "Illustrator"],
      caseStudyUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Real Estate Platform",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Elegant property search and listing interface",
      tools: ["Sketch", "InVision", "Photoshop"],
      caseStudyUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description: "Analytics and engagement tracking made simple",
      tools: ["Figma", "Framer", "Adobe XD"],
      caseStudyUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Food Delivery App",
      category: "Mobile Design",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      description: "Delightful food ordering experience",
      tools: ["Figma", "Principle", "Illustrator"],
      caseStudyUrl: "#",
      githubUrl: "#"
    }
  ];

  const designTools = [
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      description: "Collaborative design"
    },
    {
      name: "Adobe XD",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
      description: "Prototyping & wireframing"
    },
    {
      name: "Sketch",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
      description: "Vector design tool"
    },
    {
      name: "Illustrator",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
      description: "Vector graphics"
    },
    {
      name: "Photoshop",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
      description: "Image editing"
    },
    {
      name: "After Effects",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
      description: "Motion graphics"
    }
  ];

  const services = [
    {
      icon: <FiMonitor />,
      title: "Web Design",
      description: "Responsive and beautiful web interfaces that convert visitors into customers"
    },
    {
      icon: <FiSmartphone />,
      title: "Mobile Design",
      description: "Native iOS and Android designs optimized for touch and mobile experiences"
    },
    {
      icon: <FiLayers />,
      title: "UI Design",
      description: "Pixel-perfect interfaces with consistent design systems and components"
    },
    {
      icon: <FiZap />,
      title: "UX Strategy",
      description: "User research, personas, journey maps, and usability testing"
    }
  ];

  const stats = [
    { icon: <FiUsers />, value: "500+", label: "Happy Clients" },
    { icon: <FiAward />, value: "50+", label: "Design Awards" },
    { icon: <FiTrendingUp />, value: "98%", label: "Success Rate" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  return (
    <div className="uiux-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <FiLayers />
                <span>UI/UX Design Services</span>
              </div>
              <h1 className="hero-title">
                We Design <span className="gradient-text">Experiences</span> That Users Love
              </h1>
              <p className="hero-description">
                Transform your ideas into stunning, user-friendly designs. We create interfaces that not only look beautiful but drive engagement and conversions through thoughtful UX strategy.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">
                  Start Your Project
                  <FiArrowRight />
                </button>
                <button className="btn-secondary">
                  View Portfolio
                  <FiEye />
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-details">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="design-mockup">
                <img 
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop" 
                  alt="UI/UX Design"
                  className="mockup-img"
                />
                <div className="floating-card card-1">
                  <FiMonitor />
                  <span>Responsive Design</span>
                </div>
                <div className="floating-card card-2">
                  <FiSmartphone />
                  <span>Mobile First</span>
                </div>
                <div className="floating-card card-3">
                  <FiZap />
                  <span>Fast & Smooth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Design Services</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive UI/UX solutions tailored to your needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Carousel */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Design Portfolio</span>
            </h2>
            <p className="section-subtitle">
              Explore our latest UI/UX design projects
            </p>
          </div>

          <div className="carousel-container">
            <button className="carousel-btn prev" onClick={prevSlide}>
              <FiArrowLeft />
            </button>

            <div className="carousel-wrapper">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {portfolioProjects.map((project, idx) => (
                  <div 
                    key={project.id} 
                    className="carousel-slide"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="project-image-wrapper">
                      <img src={project.image} alt={project.title} />
                      
                      {hoveredProject === project.id && (
                        <div className="project-overlay">
                          <div className="overlay-content">
                            <h3>{project.title}</h3>
                            <p className="project-category">{project.category}</p>
                            <p className="project-desc">{project.description}</p>
                            
                            <div className="project-tools">
                              {project.tools.map((tool, i) => (
                                <span key={i} className="tool-tag">{tool}</span>
                              ))}
                            </div>

                            <div className="project-buttons">
                              <a href={project.caseStudyUrl} className="project-btn">
                                <FiEye />
                                Case Study
                              </a>
                              <a href={project.githubUrl} className="project-btn">
                                <FiGithub />
                                View Code
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn next" onClick={nextSlide}>
              <FiArrowRight />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {portfolioProjects.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Design Tools */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Design <span className="gradient-text">Tools We Use</span>
            </h2>
            <p className="section-subtitle">
              Industry-leading software for world-class designs
            </p>
          </div>

          <div className="tools-grid">
            {designTools.map((tool, idx) => (
              <div key={idx} className="tool-card">
                <div className="tool-icon-wrapper">
                  <img src={tool.icon} alt={tool.name} />
                </div>
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Design Process</span>
            </h2>
            <p className="section-subtitle">
              A proven approach to creating exceptional user experiences
            </p>
          </div>

          <div className="process-timeline">
            {[
              { step: "01", title: "Research", desc: "User research, competitor analysis, and market insights" },
              { step: "02", title: "Wireframe", desc: "Low-fidelity sketches and information architecture" },
              { step: "03", title: "Design", desc: "High-fidelity mockups with visual design system" },
              { step: "04", title: "Prototype", desc: "Interactive prototypes for testing and validation" },
              { step: "05", title: "Test", desc: "Usability testing and iterative improvements" },
              { step: "06", title: "Deliver", desc: "Final designs with developer handoff documentation" }
            ].map((phase, idx) => (
              <div key={idx} className="process-step">
                <div className="step-number">{phase.step}</div>
                <div className="step-content">
                  <h3>{phase.title}</h3>
                  <p>{phase.desc}</p>
                </div>
                {idx < 5 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <FiLayers className="cta-icon" />
            <h2>Ready to Create Something Amazing?</h2>
            <p>Let's transform your vision into a beautiful, user-friendly design that drives results.</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Get Started Today
                <FiArrowRight />
              </button>
              <button className="btn-secondary">
                Schedule Consultation
                <FiExternalLink />
              </button>
            </div>
          </div>
        </div>
      </section>
         
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .uiux-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .animated-bg {
          pos
ition: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: orbFloat 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: #007AFF;
          top: -300px;
          left: -300px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #FF6B9D;
          bottom: -250px;
          right: -250px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero-section {
          padding: 120px 0 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #007AFF;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-primary,
        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          color: white;
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 122, 255, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          border-radius: 12px;
          font-size: 24px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-visual {
          position: relative;
        }

        .design-mockup {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .mockup-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0, 122, 255, 0.3);
        }

        .floating-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          font-weight: 600;
          animation: floatCard 4s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .floating-card svg {
          font-size: 24px;
          color: #007AFF;
        }

        .card-1 {
          top: 10%;
          right: -50px;
          animation-delay: 0s;
        }

        .card-2 {
          top: 50%;
          left: -50px;
          animation-delay: -1.5s;
        }

        .card-3 {
          bottom: 10%;
          right: -30px;
          animation-delay: -3s;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Services Section */
        .services-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .service-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .service-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 16px;
          font-size: 32px;
          margin-bottom: 24px;
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .service-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Portfolio Carousel */
        .portfolio-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .carousel-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .carousel-wrapper {
          overflow: hidden;
          border-radius: 24px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s ease-in-out;
        }

        .carousel-slide {
          min-width: 100%;
          position: relative;
        }

        .project-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          border-radius: 24px;
        }

        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .carousel-slide:hover .project-image-wrapper img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.3));
          display: flex;
          align-items: flex-end;
          padding: 40px;
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .overlay-content {
          width: 100%;
        }

        .overlay-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .project-category {
          color: #007AFF;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .project-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }

        .project-tools {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tool-tag {
          padding: 6px 14px;
          background: rgba(0, 122, 255, 0.2);
          border: 1px solid rgba(0, 122, 255, 0.4);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #5AC8FA;
        }

        .project-buttons {
          display: flex;
          gap: 12px;
        }

        .project-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: white;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .project-btn:hover {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-color: transparent;
          transform: translateY(-2px);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .carousel-btn:hover {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-btn.prev {
          left: -80px;
        }

        .carousel-btn.next {
          right: -80px;
        }

        .carousel-indicators {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .indicator.active {
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
        }

        /* Tools Section */
        .tools-section {
          padding: 100px 0;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tool-card {
          padding: 40px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tool-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .tool-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tool-card:hover .tool-icon-wrapper {
          transform: scale(1.1) rotateY(180deg);
        }

        .tool-icon-wrapper img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .tool-card h4 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .tool-card p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Process Section */
        .process-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-timeline {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .process-step {
          position: relative;
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .process-step:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .step-number {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.4);
        }

        .step-content h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .step-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0 120px;
        }

        .cta-box {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(0, 122, 255, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          opacity: 0.1;
          filter: blur(100px);
          animation: glowRotate 10s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

          .cta-icon {
          font-size: 64px;
          color: #5865f2;
          margin: 0 auto 32px;
          animation: iconBounce 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
          display: block;
          width: fit-content;
        }


        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-box h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-box p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
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

        /* Responsive Design */
        @media (max-width: 1200px) {
          .carousel-btn.prev {
            left: 20px;
          }

          .carousel-btn.next {
            right: 20px;
          }
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .design-mockup {
            display: flex;
            justify-content: center;
          }

          .mockup-img {
            max-width: 400px;
          }

          .floating-card {
            display: none;
          }

          .process-timeline {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .project-image-wrapper {
            height: 400px;
          }

          .overlay-content h3 {
            font-size: 1.5rem;
          }

          .project-buttons {
            flex-direction: column;
          }

          .carousel-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .carousel-btn.prev {
            left: 10px;
          }

          .carousel-btn.next {
            right: 10px;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .process-timeline {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .cta-box {
            padding: 60px 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.8rem;
            padding: 8px 16px;
          }

          .hero-title {
            font-size: 28px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .service-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }

          .project-image-wrapper {
            height: 300px;
          }

          .overlay-content {
            padding: 20px;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .tool-icon-wrapper {
            width: 70px;
            height: 70px;
          }

          .tool-icon-wrapper img {
            width: 40px;
            height: 40px;
          }

          .step-number {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .cta-icon {
            font-size: 48px;
          }
        }
      `}</style>
    </div>
  );
};

export default UIUXDesignPage;