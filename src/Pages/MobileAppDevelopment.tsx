import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSmartphone, 
  FiZap,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
  FiBox,
  FiActivity,
  FiLock,
  FiUsers,
  FiBarChart2,
  FiRefreshCw,
  FiGlobe,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiDownload,
  FiMonitor,
  FiCpu,
  FiWifi
} from "react-icons/fi";
import VeeAIChatbot from "../Components/VeeAIChatbot";

type ServiceCategory = "ios" | "android" | "cross-platform" | "enterprise";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  category: ServiceCategory;
}

const MobileAppDevelopment = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services: Service[] = [
    {
      icon: <FiSmartphone />,
      title: "Native iOS Development",
      description: "Build powerful, high-performance iOS applications using Swift and the latest Apple frameworks.",
      features: [
        "Swift & SwiftUI development",
        "Apple ecosystem integration",
        "App Store optimization",
        "iOS-specific features"
      ],
      category: "ios"
    },
    {
      icon: <FiSmartphone />,
      title: "Native Android Development",
      description: "Create robust Android applications with Kotlin and modern Android development tools.",
      features: [
        "Kotlin & Jetpack Compose",
        "Material Design implementation",
        "Google Play optimization",
        "Android-specific features"
      ],
      category: "android"
    },
    {
      icon: <FiLayers />,
      title: "Cross-Platform Apps",
      description: "Develop once, deploy everywhere with React Native and Flutter for maximum reach.",
      features: [
        "Single codebase deployment",
        "Native performance",
        "Cost-effective solution",
        "Faster time to market"
      ],
      category: "cross-platform"
    },
    {
      icon: <FiBox />,
      title: "Enterprise Mobile Solutions",
      description: "Secure, scalable mobile applications for large organizations and businesses.",
      features: [
        "Enterprise security protocols",
        "Backend integration",
        "Custom workflows",
        "Advanced analytics"
      ],
      category: "enterprise"
    }
  ];

  const technologies = {
    crossPlatform: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" }
    ],
    native: [
      { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Objective-C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg" }
    ],
    backend: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" }
    ],
    tools: [
      { name: "Xcode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
    ]
  };

  const features = [
    { icon: <FiZap />, title: "High Performance", desc: "Optimized for speed and smooth user experience" },
    { icon: <FiShield />, title: "Secure & Safe", desc: "Bank-level encryption and security standards" },
    { icon: <FiTrendingUp />, title: "Scalable", desc: "Grows seamlessly with your user base" },
    { icon: <FiUsers />, title: "User-Centric", desc: "Intuitive interfaces that users love" },
    { icon: <FiLock />, title: "Data Privacy", desc: "GDPR compliant and privacy-focused" },
    { icon: <FiWifi />, title: "Offline Support", desc: "Works seamlessly without internet" }
  ];

  const process = [
    { num: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
    { num: "02", title: "Design", desc: "Creating beautiful and intuitive UI/UX" },
    { num: "03", title: "Development", desc: "Building with cutting-edge technologies" },
    { num: "04", title: "Testing", desc: "Rigorous QA across all devices" },
    { num: "05", title: "Launch", desc: "App store deployment and support" }
  ];

  const handleLearnMore = (category: ServiceCategory) => {
    // Navigate to the learn more page with the selected category
    navigate(`/mobile-app-learn-more?category=${category}`);
  };

  return (
    <div className="mobile-app-page">
      {/* Animated Background */}
      <div className="mobile-bg">
        <div className="grid-pattern"></div>
        <div className="floating-elements">
          <div className="float-shape shape-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
          <div className="float-shape shape-2" style={{ transform: `translateY(${scrollY * -0.15}px)` }}></div>
          <div className="float-shape shape-3" style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mobile-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <FiSmartphone className="badge-icon" />
                <span>Mobile App Development</span>
              </div>
              
              <h1 className="hero-title">
                Build Amazing Mobile Apps
                <br />
                <span className="title-gradient">For iOS & Android</span>
              </h1>
              
              <p className="hero-description">
                Transform your ideas into powerful mobile applications that engage users 
                and drive business growth. Native and cross-platform solutions tailored to your needs.
              </p>

              <div className="hero-cta">
                <button className="cta-primary">
                  Start Your Project
                  <FiArrowRight />
                </button>
                <button className="cta-secondary">
                  <FiMessageSquare />
                  Get Free Consultation
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-box">
                  <div className="stat-value">200+</div>
                  <div className="stat-label">Apps Launched</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">5M+</div>
                  <div className="stat-label">Downloads</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">4.8★</div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-icons">
                <div className="float-icon icon-1"><FiDownload /></div>
                <div className="float-icon icon-2"><FiCpu /></div>
                <div className="float-icon icon-3"><FiActivity /></div>
                <div className="float-icon icon-4"><FiMonitor /></div>
              </div>

              {/* Real Phone Images */}
              <div className="phone-images-stack">
                <img 
                  src="https://images.unsplash.com/photo-1592286927505-b7e6ab36524c?w=400&h=800&fit=crop&q=80" 
                  alt="Mobile App 1" 
                  className="phone-img phone-img-1"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop&q=80" 
                  alt="Mobile App 2" 
                  className="phone-img phone-img-2"
                />
                <img 
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=800&fit=crop&q=80" 
                  alt="Mobile App 3" 
                  className="phone-img phone-img-3"
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
              Mobile Development <span className="highlight">Services</span>
            </h2>
            <p className="section-desc">
              Comprehensive mobile solutions for every platform
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

              <button 
                className="service-learn-more"
                onClick={() => handleLearnMore(services[activeService].category)}
              >
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
              Leveraging the best mobile development technologies
            </p>
          </div>

          <div className="tech-categories">
            <div className="tech-category">
              <h3 className="category-title">Cross-Platform</h3>
              <div className="tech-grid">
                {technologies.crossPlatform.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">Native Development</h3>
              <div className="tech-grid">
                {technologies.native.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">Backend & APIs</h3>
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
              <h3 className="category-title">Development Tools</h3>
              <div className="tech-grid">
                {technologies.tools.map((tech, idx) => (
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
              Excellence in mobile app development
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
              Our proven approach to building successful apps
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
            <h2 className="cta-title">Ready to Launch Your Mobile App?</h2>
            <p className="cta-text">
              Let's bring your mobile app idea to life and reach millions of users.
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

        .mobile-app-page {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .mobile-bg {
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

        .mobile-hero {
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
          height: 650px;
          perspective: 1500px;
        }

        .phone-images-stack {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-img {
          position: absolute;
          width: 320px;
          height: 650px;
          object-fit: cover;
          border-radius: 45px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(88, 101, 242, 0.2);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .phone-img-1 {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px);
          z-index: 3;
          animation: phoneImg1Float 6s ease-in-out infinite;
        }

        .phone-img-2 {
          left: 50%;
          top: 50%;
          transform: translate(-25%, -50%) rotate(8deg) translateZ(0px);
          z-index: 2;
          animation: phoneImg2Float 7s ease-in-out infinite;
        }

        .phone-img-3 {
          left: 50%;
          top: 50%;
          transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px);
          z-index: 1;
          animation: phoneImg3Float 8s ease-in-out infinite;
        }

        @keyframes phoneImg1Float {
          0%, 100% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(-20px); }
        }

        @keyframes phoneImg2Float {
          0%, 100% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(0); }
          50% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(-25px); }
        }

        @keyframes phoneImg3Float {
          0%, 100% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(0); }
          50% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(-15px); }
        }

        .phone-img:hover {
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

      @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            height: 500px;
          }

          .phone-img {
            width: 260px;
            height: 540px;
          }

          .services-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .services-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }

          .services-nav::-webkit-scrollbar {
            height: 6px;
          }

          .services-nav::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
          }

          .services-nav::-webkit-scrollbar-thumb {
            background: rgba(88, 101, 242, 0.5);
            border-radius: 3px;
          }

          .service-nav-item {
            min-width: 200px;
            flex-shrink: 0;
          }

          .service-display {
            text-align: center;
            align-items: center;
          }

          .service-icon-large {
            margin: 0 auto;
          }

          .service-features-list {
            max-width: 500px;
            margin: 20px auto;
          }

          .service-learn-more {
            align-self: center;
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

          .phone-img {
            width: 220px;
            height: 460px;
          }

          .phone-img-1 {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          .phone-img-2 {
            transform: translate(-20%, -50%) rotate(5deg);
          }

          .phone-img-3 {
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

          .phone-images-stack {
            transform: scale(0.75);
          }

          .phone-img {
            width: 200px;
            height: 420px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAppDevelopment;