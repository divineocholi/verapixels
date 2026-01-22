import React, { useState, useEffect } from "react";
import { 
  FiLayers,
  FiImage,
  FiPenTool,
  FiLayout,
  FiPackage,
  FiArrowRight,
  FiCheckCircle,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiStar,
  FiRefreshCw,
  FiPhone,
  FiMail,
  FiGlobe,
  FiMessageSquare,
  FiTarget,
  FiFeather,
  FiType,
  FiGrid
} from "react-icons/fi";

type DesignCategory = "logo" | "branding" | "print" | "digital";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  category: DesignCategory;
}

const GraphicsDesign = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeCategory, setActiveCategory] = useState<"all" | DesignCategory>("all");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services: Service[] = [
    {
      icon: <FiTarget />,
      title: "Logo Design",
      description: "Create memorable and impactful logos that perfectly represent your brand identity.",
      features: [
        "Custom logo concepts",
        "Multiple design revisions",
        "Vector file formats",
        "Brand style guide"
      ],
      category: "logo"
    },
    {
      icon: <FiLayers />,
      title: "Brand Identity",
      description: "Complete branding packages including logos, color schemes, and brand guidelines.",
      features: [
        "Visual identity system",
        "Brand guidelines",
        "Marketing materials",
        "Brand strategy"
      ],
      category: "branding"
    },
    {
      icon: <FiPackage />,
      title: "Print Design",
      description: "Professional print materials from business cards to large format banners.",
      features: [
        "Business cards & stationery",
        "Brochures & flyers",
        "Packaging design",
        "Print-ready files"
      ],
      category: "print"
    },
    {
      icon: <FiLayout />,
      title: "Digital Graphics",
      description: "Eye-catching digital assets for websites, social media, and online marketing.",
      features: [
        "Social media graphics",
        "Web banners & ads",
        "Email templates",
        "Digital illustrations"
      ],
      category: "digital"
    }
  ];

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&q=80",
      title: "Minimalist Logo Design",
      category: "logo",
      description: "Modern geometric logo for tech startup"
    },
    {
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a3?w=600&h=600&fit=crop&q=80",
      title: "Brand Identity Package",
      category: "branding",
      description: "Complete branding for luxury fashion brand"
    },
    {
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop&q=80",
      title: "Creative Logo Concept",
      category: "logo",
      description: "Unique logo design for creative agency"
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&q=80",
      title: "Product Packaging",
      category: "print",
      description: "Elegant packaging for organic products"
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&q=80",
      title: "Social Media Templates",
      category: "digital",
      description: "Engaging social media graphics suite"
    },
    {
      image: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=600&h=600&fit=crop&q=80",
      title: "Business Card Design",
      category: "print",
      description: "Premium business card collection"
    },
    {
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=600&fit=crop&q=80",
      title: "Logo Collection",
      category: "logo",
      description: "Diverse logo designs showcase"
    },
    {
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=600&fit=crop&q=80",
      title: "Brand Guidelines",
      category: "branding",
      description: "Comprehensive brand style guide"
    },
    {
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=600&fit=crop&q=80",
      title: "Digital Illustrations",
      category: "digital",
      description: "Custom illustrations for web"
    }
  ];

  const filteredPortfolio = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const features = [
    { icon: <FiZap />, title: "Fast Delivery", desc: "Quick turnaround without compromising quality" },
    { icon: <FiAward />, title: "Award Winning", desc: "Recognized designs by industry leaders" },
    { icon: <FiUsers />, title: "Expert Team", desc: "Experienced designers and creative directors" },
    { icon: <FiStar />, title: "100% Original", desc: "Unique designs tailored to your brand" },
    { icon: <FiRefreshCw />, title: "Unlimited Revisions", desc: "Work until you're completely satisfied" },
    { icon: <FiTrendingUp />, title: "Results Driven", desc: "Designs that convert and engage" }
  ];

  return (
    <div className="graphics-design-page">
      {/* Animated Background */}
      <div className="design-bg">
        <div className="grid-pattern"></div>
        <div className="floating-elements">
          <div className="float-shape shape-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
          <div className="float-shape shape-2" style={{ transform: `translateY(${scrollY * -0.15}px)` }}></div>
          <div className="float-shape shape-3" style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="design-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <FiPenTool className="badge-icon" />
                <span>Professional Graphics Design</span>
              </div>
              
              <h1 className="hero-title">
                Creative Design That
                <br />
                <span className="title-gradient">Tells Your Story</span>
              </h1>
              
              <p className="hero-description">
                Transform your brand with stunning graphics that capture attention and 
                communicate your message. From logos to complete brand identities, we bring 
                your vision to life.
              </p>

              <div className="hero-cta">
                <button className="cta-primary">
                  Start Your Project
                  <FiArrowRight />
                </button>
                <button className="cta-secondary">
                  <FiMessageSquare />
                  View Portfolio
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-box">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Designs Created</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">200+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-icons">
                <div className="float-icon icon-1"><FiPenTool /></div>
                <div className="float-icon icon-2"><FiImage /></div>
                <div className="float-icon icon-3"><FiLayers /></div>
                <div className="float-icon icon-4"><FiType /></div>
              </div>

              {/* Design Showcase Images */}
              <div className="design-showcase">
                <img 
                  src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=500&fit=crop&q=80" 
                  alt="Logo Design" 
                  className="showcase-img img-1"
                />
                <img 
                  src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a3?w=500&h=500&fit=crop&q=80" 
                  alt="Brand Identity" 
                  className="showcase-img img-2"
                />
                <img 
                  src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&h=500&fit=crop&q=80" 
                  alt="Creative Design" 
                  className="showcase-img img-3"
                />
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
              Our Design <span className="highlight">Services</span>
            </h2>
            <p className="section-desc">
              Comprehensive graphic design solutions for every need
            </p>
          </div>

          <div className="services-layout">
            <div className="services-nav">
              {services.map((service, idx) => (
                <button
                  key={idx}
                  className={`service-nav-item ${activeService === idx ? 'active' : ''}`}
                  onClick={() => setActiveService(idx)}
                >
                  <div className="nav-icon">{service.icon}</div>
                  <span>{service.title}</span>
                </button>
              ))}
            </div>

            <div className="service-display">
              <div className="service-icon-large">
                {services[activeService].icon}
              </div>
              <h3 className="service-title-large">{services[activeService].title}</h3>
              <p className="service-desc-large">{services[activeService].description}</p>
              
              <div className="service-features-list">
                {services[activeService].features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <FiCheckCircle className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="service-learn-more">
                Get Started <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our Creative <span className="highlight">Portfolio</span>
            </h2>
            <p className="section-desc">
              Explore our latest design projects and creative work
            </p>
          </div>

          <div className="portfolio-filters">
            <button 
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <FiGrid /> All Work
            </button>
            <button 
              className={`filter-btn ${activeCategory === "logo" ? "active" : ""}`}
              onClick={() => setActiveCategory("logo")}
            >
              <FiTarget /> Logos
            </button>
            <button 
              className={`filter-btn ${activeCategory === "branding" ? "active" : ""}`}
              onClick={() => setActiveCategory("branding")}
            >
              <FiLayers /> Branding
            </button>
            <button 
              className={`filter-btn ${activeCategory === "print" ? "active" : ""}`}
              onClick={() => setActiveCategory("print")}
            >
              <FiPackage /> Print
            </button>
            <button 
              className={`filter-btn ${activeCategory === "digital" ? "active" : ""}`}
              onClick={() => setActiveCategory("digital")}
            >
              <FiLayout /> Digital
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((item, idx) => (
              <div key={idx} className="portfolio-item">
                <div className="portfolio-image-wrapper">
                  <img src={item.image} alt={item.title} className="portfolio-image" />
                  <div className="portfolio-overlay">
                    <h4 className="portfolio-title">{item.title}</h4>
                    <p className="portfolio-desc">{item.description}</p>
                    <button className="view-btn">
                      View Project <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="highlight">Verapixels</span>
            </h2>
            <p className="section-desc">
              Excellence in graphic design and creative solutions
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card">
            <FiFeather className="cta-icon" />
            <h2 className="cta-title">Ready to Elevate Your Brand?</h2>
            <p className="cta-text">
              Let's create stunning designs that make your brand stand out and leave a lasting impression.
            </p>
            <div className="cta-actions">
              <button className="cta-btn-primary">
                <FiPhone />
                Call Us Now
              </button>
              <button className="cta-btn-secondary">
                <FiMail />
                Send Message
              </button>
              <button className="cta-btn-tertiary">
                <FiGlobe />
                View More Work
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

        .graphics-design-page {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .design-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(88, 101, 242, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 101, 242, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 30s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .float-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #5865f2, #7289da);
          top: 10%;
          right: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #7289da, #8b5cf6);
          bottom: 20%;
          left: 10%;
          animation: float 25s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #5865f2, #a855f7);
          top: 50%;
          left: 50%;
          animation: float 22s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .design-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.4);
          border-radius: 50px;
          color: #7289da;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          font-size: 18px;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }

        .title-gradient {
          background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .hero-visual {
          position: relative;
          height: 600px;
          perspective: 1500px;
        }

        .design-showcase {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .showcase-img {
          position: absolute;
          width: 350px;
          height: 350px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(88, 101, 242, 0.2);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .img-1 {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px);
          z-index: 3;
          animation: img1Float 6s ease-in-out infinite;
        }

        .img-2 {
          left: 50%;
          top: 50%;
          transform: translate(-25%, -50%) rotate(8deg) translateZ(0px);
          z-index: 2;
          animation: img2Float 7s ease-in-out infinite;
        }

        .img-3 {
          left: 50%;
          top: 50%;
          transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px);
          z-index: 1;
          animation: img3Float 8s ease-in-out infinite;
        }

        @keyframes img1Float {
          0%, 100% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(-20px); }
        }

        @keyframes img2Float {
          0%, 100% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(0); }
          50% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(-25px); }
        }

        @keyframes img3Float {
          0%, 100% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(0); }
          50% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(-15px); }
        }

        .showcase-img:hover {
          transform: translate(-50%, -50%) rotate(0deg) scale(1.1) translateZ(150px) !important;
          z-index: 10 !important;
          box-shadow: 
            0 70px 140px rgba(88, 101, 242, 0.5),
            0 0 0 2px rgba(88, 101, 242, 0.4),
            0 0 80px rgba(88, 101, 242, 0.4);
          animation: none !important;
          filter: brightness(1.1);
        }

        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 12px;
          color: #5865f2;
          font-size: 24px;
          backdrop-filter: blur(10px);
          animation: floatIcon 3s ease-in-out infinite;
        }

        .icon-1 {
          top: 10%;
          right: 5%;
          animation-delay: 0s;
        }

        .icon-2 {
          top: 50%;
          right: 0%;
          animation-delay: 0.5s;
        }

        .icon-3 {
          bottom: 20%;
          right: 8%;
          animation-delay: 1s;
        }

        .icon-4 {
          top: 30%;
          left: 5%;
          animation-delay: 1.5s;
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .services-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .highlight {
          color: #5865f2;
        }

        .section-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .services-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .services-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .nav-icon {
          font-size: 24px;
          color: #5865f2;
        }

        .service-nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.3);
          transform: translateX(5px);
        }

        .service-nav-item.active {
          background: rgba(88, 101, 242, 0.15);
          border-color: #5865f2;
          color: white;
        }

        .service-display {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .service-icon-large {
          font-size: 64px;
          color: #5865f2;
        }

        .service-title-large {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .service-desc-large {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .service-features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 20px 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .feature-check {
          color: #5865f2;
          font-size: 20px;
          flex-shrink: 0;
        }

        .service-learn-more {
          align-self: flex-start;
          padding: 14px 32px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid #5865f2;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .service-learn-more:hover {
          background: #5865f2;
          transform: translateX(5px);
        }

        .portfolio-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .portfolio-filters {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .filter-btn {
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.3);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: rgba(88, 101, 242, 0.2);
          border-color: #5865f2;
          color: white;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 32px;
        }

        .portfolio-item {
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .portfolio-item:hover {
          transform: translateY(-8px);
        }

        .portfolio-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .portfolio-image {
          width: 100%;
          height: 350px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .portfolio-item:hover .portfolio-image {
          transform: scale(1.1);
        }

        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 10, 15, 0.95), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
        }

        .portfolio-desc {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }

        .view-btn {
          align-self: flex-start;
          padding: 12px 24px;
          background: #5865f2;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: #7289da;
          transform: translateX(5px);
        }

        .features-section {
          padding: 100px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 101, 242, 0.15);
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 32px;
          color: #5865f2;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .feature-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .final-cta {
          padding: 100px 0 120px;
        }

        .cta-card {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 60px;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.2), transparent 70%);
          opacity: 0.5;
        }

        .cta-icon {
          font-size: 64px;
          color: #5865f2;
          margin: 0 auto 32px;
          animation: spin 10s linear infinite;
          position: relative;
          z-index: 1;
          display: block;
          width: fit-content;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-btn-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-btn-secondary {
          background: rgba(114, 137, 218, 0.2);
          color: white;
          border: 2px solid #7289da;
        }

        .cta-btn-secondary:hover {
          background: #7289da;
          transform: translateY(-3px);
        }

        .cta-btn-tertiary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 2px solid #8b5cf6;
        }

        .cta-btn-tertiary:hover {
          background: #8b5cf6;
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            height: 500px;
          }

          .showcase-img {
            width: 300px;
            height: 300px;
          }

          .services-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .services-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .service-nav-item {
            min-width: 200px;
          }

          .portfolio-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1.15rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-primary, .cta-secondary {
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .hero-visual {
            height: 400px;
          }

          .showcase-img {
            width: 250px;
            height: 250px;
          }

          .img-1 {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          .img-2 {
            transform: translate(-20%, -50%) rotate(5deg);
          }

          .img-3 {
            transform: translate(-80%, -50%) rotate(-5deg);
          }

          .services-layout {
            padding: 24px;
          }

          .services-nav {
            flex-direction: column;
          }

          .service-nav-item {
            min-width: auto;
          }

          .service-title-large {
            font-size: 1.8rem;
          }

          .portfolio-filters {
            gap: 12px;
          }

          .filter-btn {
            padding: 12px 20px;
            font-size: 0.95rem;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-card {
            padding: 60px 32px;
          }

          .cta-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
            justify-content: center;
          }

          .floating-icons {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 28px;
          }

          .section-desc {
            font-size: 1rem;
          }

          .feature-card {
            padding: 28px;
          }

          .feature-icon-wrapper {
            width: 56px;
            height: 56px;
            font-size: 28px;
          }

          .cta-icon {
            font-size: 48px;
          }

          .design-showcase {
            transform: scale(0.8);
          }

          .showcase-img {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default GraphicsDesign;