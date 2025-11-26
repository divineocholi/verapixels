import React, { useState, useEffect } from "react";

import { 
  FiCode, 
  FiLayers,
  FiZap,
  FiShield,
  FiSmartphone,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiMonitor,
  FiCloud,
  FiLayout,
  FiDatabase,
  FiGlobe,
  FiSettings,
  FiTarget,
  FiAward,
  FiClock,
  FiMail,
  FiPhone,
  FiMessageCircle
} from "react-icons/fi";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiTailwindcss, 
  SiSass, 
  SiGit, 
  SiDocker, 
  SiAmazondynamodb, 
  SiVercel,
  SiFirebase,
  SiGraphql,
  SiPython,
  SiDjango,
  SiHtml5,
  SiCss3,
  SiRedis,
  SiKubernetes,
  SiNginx,
  SiJest,
  SiWebpack,
  SiEslint,
  SiPrettier
} from 'react-icons/si';

const WebDevelopment = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const services = [
    {
      icon: <FiMonitor />,
      title: "Custom Web Applications",
      description: "Tailored solutions built from scratch to match your unique business requirements and workflows.",
      features: ["Scalable Architecture", "Advanced Functionality", "Custom Integrations", "Admin Dashboards"],
      color: "#0063f4"
    },
    {
      icon: <FiGlobe />,
      title: "E-Commerce Solutions",
      description: "Powerful online stores that convert visitors into customers with seamless shopping experiences.",
      features: ["Payment Gateway Integration", "Inventory Management", "Shopping Cart Optimization", "Analytics Dashboard"],
      color: "#00ff88"
    },
    {
      icon: <FiLayers />,
      title: "Progressive Web Apps",
      description: "Fast, reliable, and engaging web apps that work offline and feel like native applications.",
      features: ["Offline Functionality", "Push Notifications", "App-Like Experience", "Cross-Platform"],
      color: "#00bfff"
    },
    {
      icon: <FiLayout />,
      title: "Landing Pages & Websites",
      description: "Stunning, conversion-focused pages designed to captivate your audience and drive results.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Lead Generation"],
      color: "#ffd700"
    },
    {
      icon: <FiCloud />,
      title: "API Development & Integration",
      description: "Robust APIs and seamless third-party integrations to extend your web application's capabilities.",
      features: ["RESTful APIs", "GraphQL", "Third-Party Services", "Microservices"],
      color: "#ff6b9d"
    },
    {
      icon: <FiDatabase />,
      title: "CMS Development",
      description: "Content management systems that empower your team to update and manage content effortlessly.",
      features: ["Custom CMS", "WordPress", "Headless CMS", "Content Workflows"],
      color: "#9d4edd"
    }
  ];

  const technologies = [
    {
      name: "Frontend",
      stack: [
        { name: "React", icon: <SiReact />, description: "Modern UI library for dynamic interfaces", color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, description: "Production-ready React framework", color: "#000000" },
        { name: "TypeScript", icon: <SiTypescript />, description: "Type-safe JavaScript development", color: "#3178C6" },
        { name: "JavaScript", icon: <SiJavascript />, description: "Core web programming language", color: "#F7DF1E" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, description: "Utility-first CSS framework", color: "#06B6D4" },
        { name: "HTML5", icon: <SiHtml5 />, description: "Modern web markup language", color: "#E34F26" },
        { name: "CSS3", icon: <SiCss3 />, description: "Advanced styling and animations", color: "#1572B6" },
        { name: "Sass", icon: <SiSass />, description: "Professional-grade CSS extension", color: "#CC6699" }
      ]
    },
    {
      name: "Backend",
      stack: [
        { name: "Node.js", icon: <SiNodedotjs />, description: "JavaScript runtime for servers", color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, description: "Minimal web framework for Node.js", color: "#000000" },
        { name: "Python", icon: <SiPython />, description: "Versatile backend language", color: "#3776AB" },
        { name: "Django", icon: <SiDjango />, description: "High-level Python web framework", color: "#092E20" },
        { name: "PostgreSQL", icon: <SiPostgresql />, description: "Powerful relational database", color: "#4169E1" },
        { name: "MongoDB", icon: <SiMongodb />, description: "Flexible NoSQL database", color: "#47A248" },
        { name: "Redis", icon: <SiRedis />, description: "In-memory data structure store", color: "#DC382D" },
        { name: "GraphQL", icon: <SiGraphql />, description: "Query language for APIs", color: "#E10098" }
      ]
    },
    {
      name: "Cloud & DevOps",
      stack: [
        { name: "AWS", icon: <SiAmazondynamodb />, description: "Cloud infrastructure solutions", color: "#FF9900" },
        { name: "Docker", icon: <SiDocker />, description: "Containerization platform", color: "#2496ED" },
        { name: "Kubernetes", icon: <SiKubernetes />, description: "Container orchestration system", color: "#326CE5" },
        { name: "Vercel", icon: <SiVercel />, description: "Instant deployment platform", color: "#000000" },
        { name: "Firebase", icon: <SiFirebase />, description: "Google's development platform", color: "#FFCA28" },
        { name: "NGINX", icon: <SiNginx />, description: "High-performance web server", color: "#009639" },
        { name: "Git", icon: <SiGit />, description: "Version control system", color: "#F05032" },
        { name: "Webpack", icon: <SiWebpack />, description: "Module bundler for JavaScript", color: "#8DD6F9" }
      ]
    },
    {
      name: "Tools & Testing",
      stack: [
        { name: "Jest", icon: <SiJest />, description: "JavaScript testing framework", color: "#C21325" },
        { name: "ESLint", icon: <SiEslint />, description: "Code linting utility", color: "#4B32C3" },
        { name: "Prettier", icon: <SiPrettier />, description: "Code formatter", color: "#F7B93E" }
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, define project scope, and create a detailed development roadmap.",
      icon: <FiTarget />
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Our designers craft intuitive interfaces and interactive prototypes for your approval.",
      icon: <FiLayout />
    },
    {
      step: "03",
      title: "Development",
      description: "Our developers build your web application using cutting-edge technologies and best practices.",
      icon: <FiCode />
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Rigorous testing ensures your application is bug-free, secure, and performs flawlessly.",
      icon: <FiShield />
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "We deploy your application and provide ongoing maintenance and support.",
      icon: <FiZap />
    }
  ];

  const benefits = [
    {
      icon: <FiSmartphone />,
      title: "Responsive Design",
      description: "Perfect experience on every device, from mobile to desktop"
    },
    {
      icon: <FiZap />,
      title: "Lightning Fast",
      description: "Optimized for speed with sub-second load times"
    },
    {
      icon: <FiShield />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee"
    },
    {
      icon: <FiTrendingUp />,
      title: "SEO Optimized",
      description: "Built to rank high on search engines from day one"
    },
    {
      icon: <FiSettings />,
      title: "Easy to Maintain",
      description: "Clean code and documentation for effortless updates"
    },
    {
      icon: <FiAward />,
      title: "Scalable Solutions",
      description: "Architecture that grows with your business needs"
    }
  ];

  const stats = [
    { icon: <FiCode />, value: "500+", label: "Projects Delivered" },
    { icon: <FiClock />, value: "95%", label: "On-Time Delivery" },
    { icon: <FiAward />, value: "4.9/5", label: "Client Rating" },
    { icon: <FiTrendingUp />, value: "200%", label: "Avg. ROI Increase" }
  ];

  const contactMethods = [
    {
      icon: <FiPhone />,
      title: "Call Us",
      description: "Speak with our team directly",
      action: "Customer Service"
    },
    {
      icon: <FiMessageCircle />,
      title: "WhatsApp",
      description: "Quick chat support",
      action: "Message Us"
    },
    {
      icon: <FiMail />,
      title: "Email",
      description: "Send us your requirements",
      action: "Email Us"
    },
    {
      icon: <FiGlobe />,
      title: "Social Media",
      description: "Connect on social platforms",
      action: "Follow Us"
    }
  ];

  return (
    <div className="webdev-page">
      {/* Animated Background */}
      <div className="webdev-bg">
        <div 
          className="bg-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="bg-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="bg-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.025}px)`
          }}
        />
        <div className="code-pattern"></div>
        <div className="gradient-mesh"></div>
      </div>

      {/* Hero Section */}
      <section className="webdev-hero">
        <div className="webdev-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FiCode /> Web Development Services
            </div>
            <h1 className="hero-title">
              Build Powerful Web Applications
              <br />
              <span className="gradient-text">That Drive Results</span>
            </h1>
            <p className="hero-subtitle">
              From stunning websites to complex web applications, we create digital experiences 
              that engage users, boost conversions, and scale with your business.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                Start Your Project <FiArrowRight />
              </button>
              <button className="btn-secondary">
                View Portfolio
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-buttons">
                  <span className="btn-red"></span>
                  <span className="btn-yellow"></span>
                  <span className="btn-green"></span>
                </div>
                <span className="window-title">app.jsx</span>
              </div>
              <div className="code-content">
                <pre><code>{`import React from 'react';

const App = () => {
  return (
    <div className="app">
      <h1>Building Amazing
          Web Experiences</h1>
      <p>With Verapixels</p>
    </div>
  );
};

export default App;`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="webdev-container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Web Development</span> Services
            </h2>
            <p className="section-subtitle">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <div 
                key={i} 
                className={`service-card animate-on-scroll ${i % 2 === 0 ? 'slide-left' : 'slide-right'}`}
              >
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FiCheckCircle style={{ color: service.color }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-glow" style={{ background: service.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="tech-section">
        <div className="webdev-container">
          <div className="section-header">
            <h2 className="section-title">
              Cutting-Edge <span className="gradient-text">Technologies</span>
            </h2>
            <p className="section-subtitle">
              We use the best tools and frameworks to build exceptional web applications
            </p>
          </div>

          <div className="tech-tabs">
            {technologies.map((category, i) => (
              <button
                key={i}
                className={`tech-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="tech-content">
            <div className="tech-grid">
              {technologies[activeTab].stack.map((tech, i) => (
                <div 
                  key={i} 
                  className="tech-card animate-on-scroll zoom-in"
                >
                  <div 
                    className="tech-icon"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <h4 className="tech-name">{tech.name}</h4>
                  <p className="tech-description">{tech.description}</p>
                  <div className="tech-glow" style={{ background: tech.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="webdev-container">
          <div className="section-header">
            <h2 className="section-title">
              Our Development <span className="gradient-text">Process</span>
            </h2>
            <p className="section-subtitle">
              A proven approach that delivers exceptional results
            </p>
          </div>

          <div className="process-grid">
            {process.map((item, i) => (
              <div 
                key={i} 
                className="process-card animate-on-scroll fade-in"
              >
                <div className="process-number">{item.step}</div>
                <div className="process-icon">{item.icon}</div>
                <h3 className="process-title">{item.title}</h3>
                <p className="process-description">{item.description}</p>
                {i < process.length - 1 && <div className="process-arrow"><FiArrowRight /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="webdev-container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="gradient-text">Verapixels</span>
            </h2>
            <p className="section-subtitle">
              The advantages of working with our expert team
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="benefit-card animate-on-scroll zoom-in"
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Pricing Section */}
      <section className="pricing-section">
        <div className="webdev-container">
          <div className="section-header">
            <h2 className="section-title">
              Get a <span className="gradient-text">Custom Quote</span>
            </h2>
            <p className="section-subtitle">
              Every project is unique. Contact us for personalized pricing tailored to your specific needs
            </p>
          </div>

          <div className="contact-grid">
            {contactMethods.map((method, i) => (
              <div 
                key={i} 
                className={`contact-card animate-on-scroll ${i % 2 === 0 ? 'slide-left' : 'slide-right'}`}
              >
                <div className="contact-icon">{method.icon}</div>
                <h3 className="contact-title">{method.title}</h3>
                <p className="contact-description">{method.description}</p>
                <button className="contact-button">
                  {method.action} <FiArrowRight />
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-note animate-on-scroll fade-in">
            <div className="note-content">
              <FiCheckCircle className="note-icon" />
              <p>
                Our team will work with you to understand your requirements and provide a 
                detailed quote that fits your budget and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="webdev-container">
          <div className="cta-content animate-on-scroll zoom-in">
            <h2 className="cta-title">Ready to Build Something Amazing?</h2>
            <p className="cta-text">
              Let's turn your vision into a powerful web application that drives growth and delights users.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary-large">
                Schedule Free Consultation <FiArrowRight />
              </button>
              <button className="btn-secondary-large">
                Chat With Us
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

        .webdev-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .webdev-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.2;
          animation: floatOrb 15s ease-in-out infinite;
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -15%;
          left: -10%;
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          bottom: -10%;
          right: -10%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ff6b9d, #9d4edd);
          top: 50%;
          left: 50%;
          animation-delay: 3.5s;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -60px) scale(1.15); }
          66% { transform: translate(-50px, 50px) scale(0.85); }
        }

        .code-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: patternMove 40s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .gradient-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(0, 99, 244, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 255, 136, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 107, 157, 0.06) 0%, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }

        @keyframes meshMove {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .webdev-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .webdev-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
        }

        .webdev-hero .webdev-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.5);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
          backdrop-filter: blur(10px);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 30%, #00ff88 60%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .btn-primary, .btn-secondary {
          padding: 18px 38px;
          font-size: 1.05rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.7);
          color: #fff;
        }

        .btn-primary svg, .btn-primary span {
          position: relative;
          z-index: 1;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 99, 244, 0.4);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.2);
        }

        .stat-icon {
          font-size: 32px;
          color: #00bfff;
          margin-bottom: 12px;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .hero-visual {
          animation: fadeInUp 1s ease 0.8s both;
        }

        .code-window {
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }

        .code-window:hover {
          transform: translateY(-10px);
          box-shadow: 0 40px 100px rgba(0, 99, 244, 0.3);
        }

        .window-header {
          background: rgba(255, 255, 255, 0.05);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .window-buttons {
          display: flex;
          gap: 8px;
        }

        .window-buttons span {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .code-window:hover .window-buttons span {
          transform: scale(1.1);
        }

        .btn-red { background: #ff5f56; box-shadow: 0 0 10px rgba(255, 95, 86, 0.5); }
        .btn-yellow { background: #ffbd2e; box-shadow: 0 0 10px rgba(255, 189, 46, 0.5); }
        .btn-green { background: #27c93f; box-shadow: 0 0 10px rgba(39, 201, 63, 0.5); }

        .window-title {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .code-content {
          padding: 35px;
          font-family: 'Courier New', monospace;
        }

        .code-content pre {
          margin: 0;
        }

        .code-content code {
          color: #00ff88;
          font-size: 0.95rem;
          line-height: 1.9;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        /* Scroll Animation Base Styles */
        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
        }

        /* Slide Left Animation */
        .animate-on-scroll.slide-left {
          transform: translateX(-80px);
        }

        .animate-on-scroll.slide-left.animate-in {
          transform: translateX(0);
        }

        /* Slide Right Animation */
        .animate-on-scroll.slide-right {
          transform: translateX(80px);
        }

        .animate-on-scroll.slide-right.animate-in {
          transform: translateX(0);
        }

        /* Zoom In Animation */
        .animate-on-scroll.zoom-in {
          transform: scale(0.8);
        }

        .animate-on-scroll.zoom-in.animate-in {
          transform: scale(1);
        }

        /* Zoom Out Animation */
        .animate-on-scroll.zoom-out {
          transform: scale(1.2);
        }

        .animate-on-scroll.zoom-out.animate-in {
          transform: scale(1);
        }

        /* Fade In Animation */
        .animate-on-scroll.fade-in {
          opacity: 0;
        }

        .animate-on-scroll.fade-in.animate-in {
          opacity: 1;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .services-section {
          padding: 120px 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
        }

        .service-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          transition: all 0.5s ease;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          transform: translateY(-15px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.4);
        }

        .service-icon {
          font-size: 56px;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .service-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 28px;
        }

        .service-features {
          list-style: none;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
        }

        .service-features li:hover {
          transform: translateX(5px);
        }

        .service-features svg {
          flex-shrink: 0;
          font-size: 20px;
        }

        .service-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(100px);
          transition: opacity 0.5s ease;
        }

        .service-card:hover .service-glow {
          opacity: 0.25;
        }

        .tech-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.04), transparent);
        }

        .tech-tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .tech-tab {
          padding: 16px 36px;
          font-size: 1.1rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tech-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateY(-3px);
        }

        .tech-tab.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 30px rgba(0, 99, 244, 0.4);
        }

        .tech-content {
          min-height: 400px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 35px;
        }

        .tech-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tech-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.35);
        }

        .tech-icon {
          font-size: 3.5rem;
          margin-bottom: 24px;
          transition: all 0.4s ease;
        }

        .tech-card:hover .tech-icon {
          transform: scale(1.15);
        }

        .tech-name {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        .tech-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .tech-glow {
          position: absolute;
          bottom: -30%;
          right: -30%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.4s ease;
        }

        .tech-card:hover .tech-glow {
          opacity: 0.2;
        }

        .process-section {
          padding: 120px 0;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
        }

        .process-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          text-align: center;
          transition: all 0.5s ease;
          backdrop-filter: blur(10px);
        }

        .process-card:hover {
          transform: translateY(-12px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.35);
        }

        .process-number {
          position: absolute;
          top: 24px;
          right: 24px;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.2), rgba(0, 191, 255, 0.1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .process-icon {
          font-size: 52px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }

        .process-card:hover .process-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .process-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .process-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .process-arrow {
          position: absolute;
          top: 50%;
          right: -18px;
          transform: translateY(-50%);
          font-size: 28px;
          color: rgba(0, 99, 244, 0.4);
          z-index: 2;
          animation: arrowPulse 2s ease-in-out infinite;
        }

        @keyframes arrowPulse {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(5px); }
        }

        .benefits-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.04), transparent);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .benefit-card {
          padding: 45px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          transition: all 0.5s ease;
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .benefit-card:hover {
          transform: translateY(-12px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.35);
        }

        .benefit-icon {
          font-size: 52px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .benefit-card:hover .benefit-icon {
          transform: scale(1.15) rotate(-5deg);
        }

        .benefit-title {
          font-size: 1.7rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .benefit-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .pricing-section {
          padding: 120px 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .contact-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          text-align: center;
          transition: all 0.5s ease;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          transform: translateY(-15px);
          border-color: rgba(0, 99, 244, 0.6);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.4);
        }

        .contact-icon {
          font-size: 56px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.2) rotate(10deg);
          color: #00ff88;
        }

        .contact-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .contact-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 32px;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .contact-button {
          width: 100%;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          color: #fff;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
        }

        .contact-button:hover {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.5);
          transform: translateY(-3px);
          color: #fff;
        }

        .pricing-note {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          background: rgba(0, 99, 244, 0.08);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .note-content {
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
        }

        .note-icon {
          font-size: 32px;
          color: #00ff88;
          flex-shrink: 0;
        }

        .note-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        .cta-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.06), transparent);
        }

        .cta-content {
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
          padding: 90px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.15), rgba(0, 191, 255, 0.1), transparent);
          opacity: 0.6;
        }

        .cta-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.3rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .btn-primary-large, .btn-secondary-large {
          padding: 22px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #fff;
        }

        .btn-primary-large {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          box-shadow: 0 12px 45px rgba(0, 99, 244, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary-large::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-primary-large:hover::before {
          opacity: 1;
        }

        .btn-primary-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.7);
          color: #fff;
        }

        .btn-primary-large svg, .btn-primary-large span {
          position: relative;
          z-index: 1;
        }

        .btn-secondary-large {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        @media (max-width: 1024px) {
          .webdev-hero .webdev-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }

          .process-arrow {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .webdev-container {
            padding: 0 24px;
          }

          .hero-title {
            font-size: 38px;
          }

          .hero-subtitle {
            font-size: 1.15rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .section-title {
            font-size: 34px;
          }

          .services-grid,
          .benefits-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            padding: 70px 40px;
          }

          .cta-title {
            font-size: 30px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary-large,
          .btn-secondary-large {
            width: 100%;
            justify-content: center;
          }

          .note-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .webdev-container {
            padding: 0 20px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 2rem;
          }

          .tech-tabs {
            flex-direction: column;
            align-items: stretch;
          }

          .tech-tab {
            text-align: center;
          }

          .code-content {
            padding: 24px;
          }

          .code-content code {
            font-size: 0.85rem;
          }

          .service-card,
          .benefit-card,
          .contact-card,
          .process-card {
            padding: 35px 28px;
          }

          .cta-content {
            padding: 50px 30px;
          }

          .pricing-note {
            padding: 30px 24px;
          }
        } `}</style>
    </div>
  );
};

export  default WebDevelopment