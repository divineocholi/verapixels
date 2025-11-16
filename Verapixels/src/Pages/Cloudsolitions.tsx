import React, { useState, useEffect, useRef } from 'react';
import { 
  FiCloud, 
  FiServer, 
  FiDatabase, 
  FiShield, 
  FiZap, 
  FiLock,
  FiTrendingUp,
  FiGlobe,
  FiCpu,
  FiActivity,
  FiBarChart2,
  FiArrowRight,
  FiCheck,
  FiRefreshCw,
  FiUploadCloud,
  FiDownloadCloud,
  FiSettings
} from 'react-icons/fi';

const CloudSolutions = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(88, 101, 242, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const particles: Particle[] = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && ctx) {
            ctx.strokeStyle = `rgba(88, 101, 242, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const solutions = [
    {
      icon: <FiCloud />,
      title: "Cloud Infrastructure",
      description: "Scalable and reliable cloud infrastructure solutions",
      features: ["Auto-scaling", "Load balancing", "99.99% uptime", "Global CDN"]
    },
    {
      icon: <FiServer />,
      title: "Cloud Migration",
      description: "Seamless migration of your applications to the cloud",
      features: ["Zero downtime", "Data integrity", "Cost optimization", "Security first"]
    },
    {
      icon: <FiDatabase />,
      title: "Cloud Storage",
      description: "Secure and accessible storage solutions",
      features: ["Unlimited storage", "Auto-backup", "Encryption", "Fast access"]
    },
    {
      icon: <FiShield />,
      title: "Cloud Security",
      description: "Enterprise-grade security for your cloud assets",
      features: ["DDoS protection", "Firewall", "SSL/TLS", "Compliance"]
    }
  ];

  const cloudProviders = [
    { name: "AWS", logo: "☁️", color: "#FF9900" },
    { name: "Azure", logo: "☁️", color: "#0089D6" },
    { name: "Google Cloud", logo: "☁️", color: "#4285F4" },
    { name: "IBM Cloud", logo: "☁️", color: "#0F62FE" }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA", icon: <FiActivity /> },
    { value: "500+", label: "Cloud Projects", icon: <FiTrendingUp /> },
    { value: "50TB+", label: "Data Managed", icon: <FiDatabase /> },
    { value: "24/7", label: "Support", icon: <FiShield /> }
  ];

  const benefits = [
    { icon: <FiZap />, title: "Lightning Fast", desc: "Optimized performance globally" },
    { icon: <FiLock />, title: "Ultra Secure", desc: "Military-grade encryption" },
    { icon: <FiTrendingUp />, title: "Auto-Scale", desc: "Scale on demand automatically" },
    { icon: <FiGlobe />, title: "Global Reach", desc: "Deploy anywhere instantly" },
    { icon: <FiRefreshCw />, title: "Auto Backup", desc: "Never lose your data" },
    { icon: <FiBarChart2 />, title: "Analytics", desc: "Real-time insights" }
  ];

  return (
    <div className="cloud-solutions">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div 
            className="floating-badge"
            style={{ transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)` }}
          >
            <FiCloud className="badge-icon" />
            <span>Cloud Solutions</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Power Your Business</span>
            <span className="title-gradient">With Cloud Technology</span>
          </h1>
          
          <p className="hero-subtitle">
            Transform your infrastructure with cutting-edge cloud solutions. 
            Scale infinitely, secure completely, deploy globally.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary">
              <FiUploadCloud />
              Get Started
              <FiArrowRight />
            </button>
            <button className="btn-secondary">
              <FiSettings />
              Explore Services
            </button>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="stat-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className="hero-visual"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
          }}
        >
          <div className="cloud-orbit orbit-1">
            <div className="orbit-node node-1">
              <FiServer />
            </div>
            <div className="orbit-node node-2">
              <FiDatabase />
            </div>
            <div className="orbit-node node-3">
              <FiCpu />
            </div>
          </div>
          <div className="cloud-orbit orbit-2">
            <div className="orbit-node node-4">
              <FiShield />
            </div>
            <div className="orbit-node node-5">
              <FiZap />
            </div>
          </div>
          <div className="cloud-center">
            <FiCloud />
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="solutions-section">
        <div className="section-header">
          <h2 className="section-title">
            Cloud <span className="highlight">Solutions</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive cloud services tailored to your needs
          </p>
        </div>
        
        <div className="solutions-grid">
          {solutions.map((solution, idx) => (
            <div 
              key={idx}
              className="solution-card"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="card-glow"></div>
              <div className="solution-icon">{solution.icon}</div>
              <h3 className="solution-title">{solution.title}</h3>
              <p className="solution-desc">{solution.description}</p>
              <ul className="solution-features">
                {solution.features.map((feature, i) => (
                  <li key={i}>
                    <FiCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="card-btn">
                Learn More <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2 className="section-title">
            Why Choose <span className="highlight">Our Cloud</span>
          </h2>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="benefit-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="benefit-icon-wrapper">
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud Providers */}
      <section className="providers-section">
        <div className="section-header">
          <h2 className="section-title">
            Multi-Cloud <span className="highlight">Platform</span>
          </h2>
          <p className="section-subtitle">
            Deploy on any major cloud provider
          </p>
        </div>
        
        <div className="providers-grid">
          {cloudProviders.map((provider, idx) => (
            <div 
              key={idx}
              className="provider-card"
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                ['--provider-color' as string]: provider.color
              } as React.CSSProperties}
            >
              <div className="provider-logo">{provider.logo}</div>
              <div className="provider-name">{provider.name}</div>
              <div className="provider-status">
                <div className="status-dot"></div>
                <span>Available</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <FiUploadCloud className="cta-icon" />
            <h2 className="cta-title">Ready to Move to the Cloud?</h2>
            <p className="cta-text">
              Start your cloud journey today and transform your business infrastructure
            </p>
            <div className="cta-buttons">
              <button className="btn-cta-primary">
                <FiCloud />
                Start Free Trial
              </button>
              <button className="btn-cta-secondary">
                <FiDownloadCloud />
                Schedule Demo
              </button>
            </div>
          </div>
          
          <div className="cta-visual">
            <div className="pulse-ring ring-1"></div>
            <div className="pulse-ring ring-2"></div>
            <div className="pulse-ring ring-3"></div>
            <div className="pulse-center">
              <FiGlobe />
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

        .cloud-solutions {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .particle-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        section {
          position: relative;
          z-index: 1;
          padding: 120px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding-top: 140px;
        }

        .floating-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.4);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 30px rgba(88, 101, 242, 0.3);
        }

        .badge-icon {
          font-size: 20px;
          color: #5865f2;
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.03em;
        }

        .title-line {
          display: block;
        }

        .title-gradient {
          display: block;
          background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 18px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(88, 101, 242, 0.5);
          transform: translateY(-3px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.6s ease backwards;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(88, 101, 242, 0.1);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-icon {
          font-size: 32px;
          color: #5865f2;
          margin-bottom: 12px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        /* 3D Cloud Visualization */
        .hero-visual {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
        }

        .cloud-center {
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.2), rgba(139, 92, 246, 0.2));
          border: 2px solid rgba(88, 101, 242, 0.4);
          border-radius: 50%;
          font-size: 80px;
          color: #5865f2;
          box-shadow: 
            0 0 60px rgba(88, 101, 242, 0.4),
            inset 0 0 60px rgba(88, 101, 242, 0.2);
          animation: pulse 3s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .cloud-orbit {
          position: absolute;
          border: 1px dashed rgba(88, 101, 242, 0.2);
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }

        .orbit-1 {
          width: 400px;
          height: 400px;
        }

        .orbit-2 {
          width: 300px;
          height: 300px;
          animation-duration: 15s;
          animation-direction: reverse;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-node {
          position: absolute;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 15, 0.9);
          border: 2px solid rgba(88, 101, 242, 0.5);
          border-radius: 50%;
          font-size: 28px;
          color: #5865f2;
          box-shadow: 0 0 30px rgba(88, 101, 242, 0.5);
          backdrop-filter: blur(10px);
          animation: float 3s ease-in-out infinite;
        }

        .node-1 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .node-2 { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 0.5s; }
        .node-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1s; }
        .node-4 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.3s; }
        .node-5 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.8s; }

        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }

        /* Solutions Section */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 16px;
        }

        .highlight {
          color: #5865f2;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .solution-card {
          position: relative;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          overflow: hidden;
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.4s ease;
        }

        .solution-card:hover {
          transform: translateY(-10px);
          border-color: rgba(88, 101, 242, 0.5);
          box-shadow: 0 20px 60px rgba(88, 101, 242, 0.3);
        }

        .solution-card:hover .card-glow {
          opacity: 1;
        }

        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(88, 101, 242, 0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .solution-icon {
          font-size: 48px;
          color: #5865f2;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .solution-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .solution-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .solution-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .solution-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .solution-features li svg {
          color: #5865f2;
          font-size: 18px;
          flex-shrink: 0;
        }

        .card-btn {
          padding: 14px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid #5865f2;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .card-btn:hover {
          background: #5865f2;
          transform: translateX(5px);
        }

        /* Benefits Section */
        .benefits-section {
          background: rgba(255, 255, 255, 0.01);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }

        .benefit-card {
          padding: 36px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.25);
        }

        .benefit-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 50%;
          font-size: 36px;
          color: #5865f2;
          transition: all 0.3s ease;
        }

        .benefit-card:hover .benefit-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 0 40px rgba(88, 101, 242, 0.4);
        }

        .benefit-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .benefit-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.65);
        }

        /* Providers Section */
        .providers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
        }

        .provider-card {
          padding: 48px 32px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .provider-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--provider-color, #5865f2), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .provider-card:hover {
          transform: translateY(-10px);
          border-color: var(--provider-color, #5865f2);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .provider-card:hover::before {
          opacity: 0.15;
        }

        .provider-logo {
          font-size: 64px;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 20px var(--provider-color, #5865f2));
        }

        .provider-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .provider-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 20px #10b981; }
        }

        /* CTA Section */
        .cta-section {
          padding: 140px 24px;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.05), rgba(139, 92, 246, 0.05));
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 80px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .cta-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(88, 101, 242, 0.15), transparent 60%);
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-icon {
          font-size: 56px;
          color: #5865f2;
          margin-bottom: 24px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-cta-primary, .btn-cta-secondary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .btn-cta-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .btn-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .btn-cta-secondary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 2px solid #8b5cf6;
        }

        .btn-cta-secondary:hover {
          background: #8b5cf6;
          transform: translateY(-3px);
        }

        .cta-visual {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(88, 101, 242, 0.3);
          border-radius: 50%;
          animation: pulseRing 3s ease-out infinite;
        }

        .ring-1 {
          width: 300px;
          height: 300px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 350px;
          height: 350px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 400px;
          height: 400px;
          animation-delay: 2s;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        .pulse-center {
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.3), rgba(139, 92, 246, 0.3));
          border: 3px solid rgba(88, 101, 242, 0.5);
          border-radius: 50%;
          font-size: 72px;
          color: #5865f2;
          box-shadow: 
            0 0 60px rgba(88, 101, 242, 0.5),
            inset 0 0 40px rgba(88, 101, 242, 0.3);
          animation: pulse 3s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 60px;
            padding-top: 100px;
          }

          .hero-visual {
            height: 500px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-container {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 60px 40px;
          }

          .cta-visual {
            height: 350px;
          }

          .ring-1 { width: 250px; height: 250px; }
          .ring-2 { width: 300px; height: 300px; }
          .ring-3 { width: 350px; height: 350px; }
          .pulse-center { width: 150px; height: 150px; font-size: 60px; }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 20px;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-subtitle {
            font-size: 1.15rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-primary, .btn-secondary {
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .hero-visual {
            height: 400px;
          }

          .cloud-center {
            width: 150px;
            height: 150px;
            font-size: 60px;
          }

          .orbit-1 {
            width: 300px;
            height: 300px;
          }

          .orbit-2 {
            width: 220px;
            height: 220px;
          }

          .orbit-node {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .solutions-grid {
            grid-template-columns: 1fr;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .providers-grid {
            grid-template-columns: 1fr;
          }

          .cta-container {
            padding: 40px 24px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-text {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-cta-primary, .btn-cta-secondary {
            justify-content: center;
          }

          .cta-visual {
            height: 300px;
          }

          .ring-1 { width: 200px; height: 200px; }
          .ring-2 { width: 240px; height: 240px; }
          .ring-3 { width: 280px; height: 280px; }
          .pulse-center { width: 130px; height: 130px; font-size: 52px; }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }

          .floating-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .section-title {
            font-size: 32px;
          }

          .section-subtitle {
            font-size: 1.05rem;
          }

          .solution-card {
            padding: 32px 24px;
          }

          .benefit-card {
            padding: 28px;
          }

          .benefit-icon-wrapper {
            width: 70px;
            height: 70px;
            font-size: 32px;
          }

          .provider-card {
            padding: 36px 24px;
          }

          .provider-logo {
            font-size: 52px;
          }

          .cta-icon {
            font-size: 48px;
          }

          .hero-visual {
            height: 350px;
          }

          .cloud-center {
            width: 120px;
            height: 120px;
            font-size: 48px;
          }

          .orbit-1 {
            width: 250px;
            height: 250px;
          }

          .orbit-2 {
            width: 180px;
            height: 180px;
          }

          .orbit-node {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CloudSolutions;