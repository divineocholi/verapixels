import React, { useState, useEffect } from 'react';
import { 
  FiArrowRight,
  FiShield,
  FiLock,
  FiEye,
  FiAlertTriangle,
  FiCheckCircle,
  FiServer,
  FiCloud,
  FiDatabase,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiExternalLink,
  FiZap,
  FiGlobe,
  FiCpu,
  FiActivity
} from 'react-icons/fi';
import VeeAIChatbot from '../Components/VeeAIChatbot';

const CybersecurityPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % threatCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <FiShield />,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do",
      features: ["Network Testing", "Web App Testing", "Social Engineering", "Physical Security"]
    },
    {
      icon: <FiLock />,
      title: "Security Audits",
      description: "In-depth analysis of your security posture and compliance requirements",
      features: ["Policy Review", "Access Control", "Compliance Check", "Risk Assessment"]
    },
    {
      icon: <FiEye />,
      title: "Threat Monitoring",
      description: "24/7 real-time threat detection and incident response services",
      features: ["SIEM Integration", "Real-time Alerts", "Incident Response", "Forensic Analysis"]
    },
    {
      icon: <FiCloud />,
      title: "Cloud Security",
      description: "Secure your cloud infrastructure across AWS, Azure, and Google Cloud",
      features: ["Cloud Audit", "Configuration", "Data Encryption", "Access Management"]
    },
    {
      icon: <FiDatabase />,
      title: "Data Protection",
      description: "Safeguard sensitive data with encryption and access controls",
      features: ["Data Encryption", "DLP Solutions", "Backup Security", "Privacy Compliance"]
    },
    {
      icon: <FiServer />,
      title: "Network Security",
      description: "Protect your network infrastructure from cyber threats",
      features: ["Firewall Config", "VPN Setup", "Network Segmentation", "IDS/IPS"]
    }
  ];

  const threatCategories = [
    {
      title: "Ransomware Protection",
      description: "Advanced defense against ransomware attacks",
      impact: "99.9% Detection Rate",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
    },
    {
      title: "DDoS Mitigation",
      description: "Real-time protection against distributed attacks",
      impact: "500Gbps+ Capacity",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
    },
    {
      title: "Zero-Day Threats",
      description: "AI-powered detection of unknown vulnerabilities",
      impact: "< 1min Response Time",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
    },
    {
      title: "Insider Threats",
      description: "Behavioral analysis to detect malicious insiders",
      impact: "95% Prevention Rate",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
    }
  ];

  const stats = [
    { icon: <FiUsers />, value: "1000+", label: "Protected Clients" },
    { icon: <FiAward />, value: "15+", label: "Industry Certifications" },
    { icon: <FiTrendingUp />, value: "99.9%", label: "Uptime Guarantee" }
  ];

  const securityTools = [
    {
      name: "Metasploit",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      description: "Penetration testing"
    },
    {
      name: "Wireshark",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      description: "Network analysis"
    },
    {
      name: "Burp Suite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
      description: "Web app security"
    },
    {
      name: "Nmap",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      description: "Network scanning"
    },
    {
      name: "Splunk",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      description: "SIEM platform"
    },
    {
      name: "Nessus",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "Vulnerability scanner"
    }
  ];

  return (
    <div className="cyber-page">
      {/* 3D Animated Background */}
      <div className="cyber-bg">
        <div className="matrix-rain"></div>
        <div className="cyber-grid"></div>
        <div className="glow-orbs">
          <div className="orb orb-1" style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}></div>
          <div className="orb orb-2" style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }}></div>
          <div className="orb orb-3" style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`
          }}></div>
        </div>
        <div className="scan-lines"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <FiShield />
                <span>Enterprise Cybersecurity</span>
              </div>
              <h1 className="hero-title">
                Defend Your Digital <span className="gradient-text">Assets</span> With Advanced Security
              </h1>
              <p className="hero-description">
                Comprehensive cybersecurity solutions to protect your business from evolving threats. Our expert team provides 24/7 monitoring, threat intelligence, and incident response.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">
                  Get Security Audit
                  <FiArrowRight />
                </button>
                <button className="btn-secondary">
                  View Services
                  <FiEye />
                </button>
              </div>

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
              <div className="shield-animation">
                <div className="shield-core">
                  <FiShield />
                </div>
                <div className="shield-ring ring-1"></div>
                <div className="shield-ring ring-2"></div>
                <div className="shield-ring ring-3"></div>
                <div className="data-particle p1"><FiLock /></div>
                <div className="data-particle p2"><FiZap /></div>
                <div className="data-particle p3"><FiActivity /></div>
                <div className="data-particle p4"><FiCpu /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Carousel */}
      <section className="threat-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Threat Protection</span> Coverage
            </h2>
            <p className="section-subtitle">
              Comprehensive defense against modern cyber threats
            </p>
          </div>

          <div className="threat-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {threatCategories.map((threat, idx) => (
                <div key={idx} className="threat-slide">
                  <div className="threat-image">
                    <img src={threat.image} alt={threat.title} />
                    <div className="threat-overlay">
                      <div className="threat-content">
                        <h3>{threat.title}</h3>
                        <p>{threat.description}</p>
                        <div className="threat-impact">
                          <FiCheckCircle />
                          <span>{threat.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {threatCategories.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Security Services</span>
            </h2>
            <p className="section-subtitle">
              End-to-end cybersecurity solutions for your business
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="service-card"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="service-icon-wrapper">
                  <div className="service-icon">{service.icon}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                
                {hoveredService === idx && (
                  <div className="service-features">
                    {service.features.map((feature, i) => (
                      <div key={i} className="feature-item">
                        <FiCheckCircle />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Tools */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Tools</span> We Master
            </h2>
            <p className="section-subtitle">
              Industry-leading security tools and frameworks
            </p>
          </div>

          <div className="tools-grid">
            {securityTools.map((tool, idx) => (
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

      {/* Security Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Security Process</span>
            </h2>
            <p className="section-subtitle">
              A systematic approach to protecting your business
            </p>
          </div>

          <div className="process-grid">
            {[
              { 
                step: "01", 
                title: "Assessment", 
                desc: "Comprehensive security audit and vulnerability assessment",
                icon: <FiEye />
              },
              { 
                step: "02", 
                title: "Strategy", 
                desc: "Custom security roadmap tailored to your business",
                icon: <FiGlobe />
              },
              { 
                step: "03", 
                title: "Implementation", 
                desc: "Deploy security controls and monitoring systems",
                icon: <FiServer />
              },
              { 
                step: "04", 
                title: "Monitoring", 
                desc: "24/7 threat detection and real-time alerts",
                icon: <FiActivity />
              },
              { 
                step: "05", 
                title: "Response", 
                desc: "Rapid incident response and threat mitigation",
                icon: <FiZap />
              },
              { 
                step: "06", 
                title: "Optimization", 
                desc: "Continuous improvement and security updates",
                icon: <FiTrendingUp />
              }
            ].map((phase, idx) => (
              <div key={idx} className="process-card">
                <div className="process-number">{phase.step}</div>
                <div className="process-icon">{phase.icon}</div>
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
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
            <FiShield className="cta-icon" />
            <h2>Ready to Secure Your Business?</h2>
            <p>Get a free security assessment and discover vulnerabilities before attackers do.</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Schedule Consultation
                <FiArrowRight />
              </button>
              <button className="btn-secondary">
                Contact Security Team
                <FiExternalLink />
              </button>
            </div>
          </div>
        </div>
      </section>
          <VeeAIChatbot />        

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cyber-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .cyber-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .matrix-rain {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(transparent 30%, rgba(0, 255, 65, 0.03) 70%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.03) 4px
            );
          animation: matrixScroll 20s linear infinite;
        }

        @keyframes matrixScroll {
          from { background-position: 0 0; }
          to { background-position: 0 100px; }
        }

        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.05) 0px, transparent 1px, transparent 40px, rgba(0, 255, 65, 0.05) 41px),
            repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.05) 0px, transparent 1px, transparent 40px, rgba(0, 255, 65, 0.05) 41px);
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center bottom;
        }

        .glow-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          transition: transform 0.3s ease-out;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: #00ff41;
          top: -250px;
          left: -250px;
          animation: pulse 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #ff0055;
          bottom: -200px;
          right: -200px;
          animation: pulse 6s ease-in-out infinite;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 450px;
          height: 450px;
          background: #00d4ff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 10s ease-in-out infinite;
          animation-delay: -6s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .scan-lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 65, 0.03) 0px,
            transparent 2px,
            transparent 4px,
            rgba(0, 255, 65, 0.03) 6px
          );
          animation: scanMove 8s linear infinite;
        }

        @keyframes scanMove {
          from { transform: translateY(0); }
          to { transform: translateY(6px); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

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
          background: rgba(0, 255, 65, 0.1);
          border: 1px solid rgba(0, 255, 65, 0.3);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ff41;
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
          background: linear-gradient(135deg, #00ff41, #00d4ff);
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
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          color: #000;
          box-shadow: 0 10px 30px rgba(0, 255, 65, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 255, 65, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 65, 0.3);
          color: white;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(0, 255, 65, 0.1);
          border-color: rgba(0, 255, 65, 0.5);
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
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 12px;
          font-size: 24px;
          color: #000;
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
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shield-animation {
          position: relative;
          width: 300px;
          height: 300px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }

        .shield-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 20px;
          font-size: 50px;
          color: #000;
          box-shadow: 0 0 60px rgba(0, 255, 65, 0.6);
          z-index: 10;
        }

        .shield-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 50%;
          animation: ringPulse 3s ease-in-out infinite;
        }

        .ring-1 {
          width: 150px;
          height: 150px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 200px;
          height: 200px;
          animation-delay: -1s;
        }

        .ring-3 {
          width: 250px;
          height: 250px;
          animation-delay: -2s;
        }

        @keyframes ringPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        .data-particle {
          position: absolute;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 65, 0.2);
          border: 1px solid rgba(0, 255, 65, 0.5);
          border-radius: 8px;
          font-size: 20px;
          color: #00ff41;
          backdrop-filter: blur(10px);
          animation: particleOrbit 8s linear infinite;
        }

        .p1 {
          animation-delay: 0s;
        }

        .p2 {
          animation-delay: -2s;
        }

        .p3 {
          animation-delay: -4s;
        }

        .p4 {
          animation-delay: -6s;
        }

        @keyframes particleOrbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        .threat-section,
        .services-section,
        .tools-section,
        .process-section {
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

        .threat-carousel {
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 24px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s ease-in-out;
        }

        .threat-slide {
          min-width: 100%;
        }

        .threat-image {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 24px;
        }

        .threat-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .threat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          display: flex;
          align-items: flex-end;
          padding: 40px;
        }

        .threat-content h3 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .threat-content p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }

        .threat-impact {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(0, 255, 65, 0.2);
          border: 1px solid rgba(0, 255, 65, 0.4);
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #00ff41;
          width: fit-content;
        }

        .carousel-dots {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot:hover {
          background: rgba(0, 255, 65, 0.5);
        }

        .dot.active {
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .service-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          cursor: pointer;
          min-height: 320px;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .service-icon-wrapper {
          margin-bottom: 24px;
        }

        .service-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 16px;
          font-size: 32px;
          color: #000;
          box-shadow: 0 10px 30px rgba(0, 255, 65, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .service-card > p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        .service-features {
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .feature-item svg {
          color: #00ff41;
          font-size: 18px;
          flex-shrink: 0;
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
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tool-card:hover {
          transform: translateY(-10px) rotateY(10deg);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .tool-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 65, 0.1);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tool-card:hover .tool-icon-wrapper {
          transform: scale(1.1) rotateZ(360deg);
          background: rgba(0, 255, 65, 0.2);
        }

        .tool-icon-wrapper img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          filter: brightness(0) invert(1);
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

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .process-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .process-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(0, 255, 65, 0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
        }

        .process-card:hover::before {
          transform: rotate(45deg) translateY(100%);
        }

        .process-card:hover {
          transform: translateY(-10px);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .process-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 16px;
        }

        .process-icon {
          font-size: 48px;
          color: #00ff41;
          margin-bottom: 20px;
        }

        .process-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .process-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-section {
          padding: 100px 0 120px;
        }

        .cta-box {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          opacity: 0.15;
          filter: blur(80px);
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
          animation: shieldPulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
          display: block;
          width: fit-content;
        }

        

        @keyframes shieldPulse {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.5));
          }
          50% { 
            transform: scale(1.1);
            filter: drop-shadow(0 0 40px rgba(0, 255, 65, 0.8));
          }
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

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .shield-animation {
            width: 250px;
            height: 250px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .process-grid {
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

          .threat-image {
            height: 400px;
          }

          .threat-content h3 {
            font-size: 1.8rem;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .process-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .cta-box {
            padding: 60px 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
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

          .shield-animation {
            width: 200px;
            height: 200px;
          }

          .shield-core {
            width: 80px;
            height: 80px;
            font-size: 40px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .threat-image {
            height: 300px;
          }

          .threat-content {
            padding: 20px;
          }

          .threat-content h3 {
            font-size: 1.5rem;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .cta-icon {
            font-size: 48px;
          }
        }
      `}</style>
    </div>
  );
};

export default CybersecurityPage;