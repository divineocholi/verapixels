import React, { useState, useEffect } from "react";
import { 
  FiCode, 
  FiZap,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiCpu,
  FiLayers,
  FiServer,
  FiBox,
  FiActivity,
  FiLock,
  FiUsers,
  FiBarChart2,
  FiRefreshCw,
  FiGlobe,
  FiMessageSquare,
  FiPhone,
  FiMail
} from "react-icons/fi";

const WebApplications = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: <FiCpu />,
      title: "Custom Web Applications",
      description: "Build powerful, scalable applications tailored to your business logic and workflows.",
      features: [
        "Custom business logic implementation",
        "Real-time data processing",
        "Advanced user permissions",
        "Integrated dashboard analytics"
      ]
    },
    {
      icon: <FiServer />,
      title: "SaaS Platforms",
      description: "Multi-tenant software solutions with subscription management and user analytics.",
      features: [
        "Multi-tenant architecture",
        "Subscription billing integration",
        "User analytics & reporting",
        "API access management"
      ]
    },
    {
      icon: <FiBox />,
      title: "Enterprise Solutions",
      description: "Large-scale applications with complex integrations and high-security requirements.",
      features: [
        "Enterprise-grade security",
        "Legacy system integration",
        "Custom workflow automation",
        "Advanced reporting tools"
      ]
    },
    {
      icon: <FiActivity />,
      title: "Progressive Web Apps",
      description: "App-like experiences that work offline and deliver native functionality.",
      features: [
        "Offline-first architecture",
        "Push notifications",
        "Home screen installation",
        "Background sync"
      ]
    }
  ];

  const technologies = {
    frontend: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" }
    ],
    backend: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
    ],
    database: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Elasticsearch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" }
    ],
    devops: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "NGINX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" }
    ]
  };

  const features = [
    { icon: <FiZap />, title: "High Performance", desc: "Lightning-fast load times and optimized code" },
    { icon: <FiShield />, title: "Secure by Design", desc: "Enterprise-level security and encryption" },
    { icon: <FiTrendingUp />, title: "Scalable Architecture", desc: "Grows seamlessly with your business" },
    { icon: <FiUsers />, title: "User-Centric", desc: "Intuitive interfaces that users love" },
    { icon: <FiLock />, title: "Data Privacy", desc: "GDPR compliant and privacy-focused" },
    { icon: <FiBarChart2 />, title: "Analytics Ready", desc: "Built-in tracking and reporting" }
  ];

  const process = [
    { num: "01", title: "Discovery", desc: "Understanding your needs and defining requirements" },
    { num: "02", title: "Architecture", desc: "Designing scalable system architecture" },
    { num: "03", title: "Development", desc: "Agile development with regular updates" },
    { num: "04", title: "Testing", desc: "Comprehensive QA and user testing" },
    { num: "05", title: "Deployment", desc: "Smooth launch and ongoing support" }
  ];

  return (
    <div className="webapp-page">
      {/* Animated Background */}
      <div className="webapp-bg">
        <div className="grid-lines"></div>
        <div className="floating-shapes">
          <div className="shape shape-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
          <div className="shape shape-2" style={{ transform: `translateY(${scrollY * -0.15}px)` }}></div>
          <div className="shape shape-3" style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="webapp-hero">
        <div className="container">
          <div className="hero-content-wrapper">
            <div className="hero-badge">
              <FiCode className="badge-icon" />
              <span>Enterprise Web Applications</span>
            </div>
            
            <h1 className="hero-title">
              Transform Your Business With
              <br />
              <span className="title-gradient">Custom Web Applications</span>
            </h1>
            
            <p className="hero-description">
              We build high-performance web applications that streamline operations, 
              enhance user experiences, and drive measurable business growth.
            </p>

            <div className="hero-cta">
              <button className="cta-primary">
                Start Your Project
                <FiArrowRight />
              </button>
              <button className="cta-secondary">
                <FiMessageSquare />
                Schedule Consultation
              </button>
            </div>

            <div className="trust-badges">
              <div className="badge-item">
                <FiCheckCircle />
                <span>300+ Apps Built</span>
              </div>
              <div className="badge-item">
                <FiCheckCircle />
                <span>99.9% Uptime</span>
              </div>
              <div className="badge-item">
                <FiCheckCircle />
                <span>24/7 Support</span>
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
              Application Development <span className="highlight">Services</span>
            </h2>
            <p className="section-desc">
              Comprehensive solutions for modern web applications
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
                Learn More <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Technology <span className="highlight">Stack</span>
            </h2>
            <p className="section-desc">
              Leveraging cutting-edge technologies for robust applications
            </p>
          </div>

          <div className="tech-categories">
            <div className="tech-category">
              <h3 className="category-title">Frontend</h3>
              <div className="tech-grid">
                {technologies.frontend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">Backend</h3>
              <div className="tech-grid">
                {technologies.backend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">Database</h3>
              <div className="tech-grid">
                {technologies.database.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">DevOps</h3>
              <div className="tech-grid">
                {technologies.devops.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
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
              Excellence in every aspect of application development
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

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Development <span className="highlight">Process</span>
            </h2>
            <p className="section-desc">
              Our proven methodology for delivering exceptional results
            </p>
          </div>

          <div className="process-timeline">
            {process.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
                {idx < process.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card">
            <FiRefreshCw className="cta-icon" />
            <h2 className="cta-title">Ready to Build Your Application?</h2>
            <p className="cta-text">
              Let's discuss your project and create a solution that drives your business forward.
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
                View Portfolio
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

        .webapp-page {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .webapp-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-lines {
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

        .floating-shapes {
          position: absolute;
          inset: 0;
        }

        .shape {
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
          background: linear-gradient(135deg, #f43f5e, #ec4899);
          bottom: 20%;
          left: 10%;
          animation: float 25s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
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

        /* Hero Section */
        .webapp-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
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
          font-size: clamp(36px, 7vw, 72px);
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
          font-size: 1.35rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 40px;
          border-radius: 12px;
          font-size: 1.1rem;
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

        .trust-badges {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
        }

        .badge-item svg {
          color: #5865f2;
          font-size: 20px;
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

        /* Technologies Section */
        .tech-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-categories {
          display: grid;
          gap: 60px;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .category-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #5865f2;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.2);
        }

        .tech-item img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .tech-item span {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
        }

        /* Features Section */
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

        /* Process Section */
        .process-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-timeline {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .process-step {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 40px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .process-step:hover {
          transform: translateX(10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.25);
        }

        .step-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
        }

        .step-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .step-connector {
          position: absolute;
          left: 80px;
          bottom: -40px;
          width: 2px;
          height: 40px;
          background: linear-gradient(180deg, #5865f2, transparent);
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        /* Final CTA Section */
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
          margin-bottom: 32px;
          animation: spin 10s linear infinite;
          position: relative;
          z-index: 1;
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
          background: rgba(244, 63, 94, 0.2);
          color: white;
          border: 2px solid #f43f5e;
        }

        .cta-btn-secondary:hover {
          background: #f43f5e;
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

        /* Responsive Design */
        @media (max-width: 1024px) {
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

          .process-step {
            grid-template-columns: 80px 1fr;
            gap: 24px;
            padding: 32px;
          }

          .step-number {
            font-size: 3rem;
          }

          .step-connector {
            left: 60px;
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

          .trust-badges {
            flex-direction: column;
            gap: 20px;
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

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 16px;
          }

          .tech-item {
            padding: 20px 12px;
          }

          .tech-item img {
            width: 40px;
            height: 40px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .process-step {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 28px;
          }

          .step-number {
            font-size: 2.5rem;
          }

          .step-connector {
            display: none;
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
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-desc {
            font-size: 1rem;
          }

          .tech-category {
            padding: 24px;
          }

          .category-title {
            font-size: 1.4rem;
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
        }
      `}</style>
    </div>
  );
};

export default WebApplications;