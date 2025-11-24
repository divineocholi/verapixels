import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiTarget,
  FiCode,
  FiLayers,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiMonitor,
  FiArrowRight,
  FiClock,
  FiAward,
  FiRefreshCw,
  FiShield,
  FiHeart,
  FiStar,
  FiGitBranch,
} from "react-icons/fi";
import {
  SiFigma,
  SiReact,
  SiNodedotjs,
  SiAmazon,
  SiDocker,
  SiGit,
  SiJira,
  SiSlack,
} from "react-icons/si";

const HowWeWorkandFunction = () => {
  const [activeProcess, setActiveProcess] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const workingProcess = [
    {
      number: "01",
      title: "Discovery & Research",
      icon: <FiTarget />,
      description:
        "We dive deep into understanding your business, goals, target audience, and market landscape. Every great project starts with knowing exactly what success looks like.",
      details: [
        "Stakeholder interviews & workshops",
        "Competitor analysis & market research",
        "User persona development",
        "Requirements gathering & documentation",
      ],
      color: "#0063f4",
      duration: "1-2 weeks",
    },
    {
      number: "02",
      title: "Strategy & Planning",
      icon: <FiLayers />,
      description:
        "Armed with insights, we craft a comprehensive roadmap. This blueprint ensures everyone is aligned and every pixel serves a purpose.",
      details: [
        "Project scope & timeline definition",
        "Technology stack selection",
        "Architecture & design planning",
        "Resource allocation & team assembly",
      ],
      color: "#00bfff",
      duration: "1 week",
    },
    {
      number: "03",
      title: "Design & Prototyping",
      icon: <FiMonitor />,
      description:
        "Our creative team brings concepts to life. From wireframes to high-fidelity designs, we create experiences that captivate and convert.",
      details: [
        "Wireframing & user flow mapping",
        "Visual design & brand integration",
        "Interactive prototypes",
        "Design system development",
      ],
      color: "#00ff88",
      duration: "2-3 weeks",
    },
    {
      number: "04",
      title: "Development & Iteration",
      icon: <FiCode />,
      description:
        "Where ideas become reality. Our developers build robust, scalable solutions using cutting-edge technologies and best practices.",
      details: [
        "Agile sprint-based development",
        "Continuous integration & deployment",
        "Regular code reviews & testing",
        "Weekly progress demonstrations",
      ],
      color: "#ffd700",
      duration: "4-12 weeks",
    },
    {
      number: "05",
      title: "Testing & Quality Assurance",
      icon: <FiShield />,
      description:
        "Perfection is in the details. We rigorously test every feature, interaction, and edge case to ensure flawless performance.",
      details: [
        "Automated & manual testing",
        "Cross-browser & device compatibility",
        "Performance optimization",
        "Security audits & penetration testing",
      ],
      color: "#ff6b9d",
      duration: "1-2 weeks",
    },
    {
      number: "06",
      title: "Launch & Deployment",
      icon: <FiZap />,
      description:
        "It's showtime! We handle the entire deployment process, ensuring a smooth transition from development to production.",
      details: [
        "Deployment strategy & rollout plan",
        "Server configuration & optimization",
        "Final quality checks",
        "Go-live monitoring & support",
      ],
      color: "#9d4edd",
      duration: "3-5 days",
    },
    {
      number: "07",
      title: "Support & Evolution",
      icon: <FiRefreshCw />,
      description:
        "Our partnership doesn't end at launch. We provide ongoing support, monitoring, and continuous improvements to keep you ahead.",
      details: [
        "24/7 technical support",
        "Performance monitoring & analytics",
        "Regular updates & maintenance",
        "Feature enhancements & scaling",
      ],
      color: "#00d1ff",
      duration: "Ongoing",
    },
  ];

  const principles = [
    {
      icon: <FiUsers />,
      title: "Client-First Mindset",
      description:
        "Your success is our north star. We treat every project as if it were our own business.",
    },
    {
      icon: <FiMessageSquare />,
      title: "Transparent Communication",
      description:
        "No jargon, no surprises. We keep you in the loop with clear, honest updates at every stage.",
    },
    {
      icon: <FiSettings />,
      title: "Agile & Adaptive",
      description:
        "Markets change, requirements evolve. We stay flexible and responsive to keep you competitive.",
    },
    {
      icon: <FiAward />,
      title: "Quality Over Speed",
      description:
        "We move fast, but never at the expense of excellence. Every deliverable meets our high standards.",
    },
    {
      icon: <FiGitBranch />,
      title: "Collaborative Approach",
      description:
        "Your team + our team = dream team. We work as an extension of your organization.",
    },
    {
      icon: <FiHeart />,
      title: "Passion-Driven",
      description:
        "We love what we do, and it shows. Every project gets our full dedication and creativity.",
    },
  ];

  const tools = [
    { name: "Figma", category: "Design", icon: <SiFigma /> },
    { name: "React", category: "Frontend", icon: <SiReact /> },
    { name: "Node.js", category: "Backend", icon: <SiNodedotjs /> },
    { name: "AWS", category: "Cloud", icon: <SiAmazon /> },
    { name: "Docker", category: "DevOps", icon: <SiDocker /> },
    { name: "Git", category: "Version Control", icon: <SiGit /> },
    { name: "Jira", category: "Project Management", icon: <SiJira /> },
    { name: "Slack", category: "Communication", icon: <SiSlack /> },
  ];

  const metrics = [
    { icon: <FiClock />, value: "48hrs", label: "Average Response Time" },
    { icon: <FiTrendingUp />, value: "98%", label: "On-Time Delivery" },
    { icon: <FiStar />, value: "5.0", label: "Client Satisfaction" },
    { icon: <FiCheckCircle />, value: "100%", label: "Quality Assurance" },
  ];

  return (
    <div className="work-page">
      {/* Animated Background */}
      <div className="work-bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient gradient-1"></div>
        <div className="bg-gradient gradient-2"></div>
        <div className="bg-gradient gradient-3"></div>
      </div>

      {/* Hero Section */}
      <section className="work-hero">
        <div className="work-container">
          <div className="hero-badge">
            <FiSettings /> Our Methodology
          </div>
          <h1 className="hero-title">
            How We <span className="gradient-text">Work & Function</span>
          </h1>
          <p className="hero-subtitle">
            A proven process that transforms ideas into exceptional digital
            experiences. Transparent, collaborative, and designed for success.
          </p>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="metric-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="metric-icon">{metric.icon}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-section">
        <div className="work-container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">7-Step Process</span>
            </h2>
            <p className="section-subtitle">
              From concept to launch and beyond—every step carefully
              orchestrated for maximum impact
            </p>
          </div>

          <div className="process-timeline">
            {workingProcess.map((step, i) => (
              <div
                key={i}
                className={`process-step ${
                  activeProcess === i ? "active" : ""
                }`}
                onMouseEnter={() => setActiveProcess(i)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="step-number" style={{ color: step.color }}>
                  {step.number}
                </div>

                <div className="step-icon" style={{ background: step.color }}>
                  {step.icon}
                </div>

                <div className="step-content">
                  <div className="step-header">
                    <h3 className="step-title">{step.title}</h3>
                    <span
                      className="step-duration"
                      style={{ color: step.color }}
                    >
                      <FiClock /> {step.duration}
                    </span>
                  </div>

                  <p className="step-description">{step.description}</p>

                  <ul className="step-details">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="detail-item">
                        <FiCheckCircle style={{ color: step.color }} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="step-connector"></div>
                <div
                  className="step-glow"
                  style={{ background: step.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="principles-section">
        <div className="work-container">
          <div className="section-header">
            <h2 className="section-title">
              Our Core <span className="gradient-text">Principles</span>
            </h2>
            <p className="section-subtitle">
              The values that guide every decision, every line of code, and
              every pixel we craft
            </p>
          </div>

          <div className="principles-grid">
            {principles.map((principle, i) => (
              <div
                key={i}
                className="principle-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="principle-icon">{principle.icon}</div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-description">{principle.description}</p>
                <div className="principle-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="tools-section">
        <div className="work-container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="section-subtitle">
              Industry-leading tools and technologies that power our solutions
            </p>
          </div>

          <div className="tools-grid">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="tool-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-category">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - New Modern Style */}
      <section className="action-section">
        <div className="work-container">
          <div className="action-wrapper">
            <div className="action-left">
              <div className="action-badge">
                <FiZap /> Let's Work Together
              </div>
              <h2 className="action-title">Ready to Start Your Project?</h2>
              <p className="action-text">
                Let's discuss how our proven process can bring your vision to
                life. Schedule a free consultation today and let's build
                something amazing together.
              </p>
              <div className="action-features">
                <div className="feature-item">
                  <FiCheckCircle />
                  <span>Free consultation & project assessment</span>
                </div>
                <div className="feature-item">
                  <FiCheckCircle />
                  <span>Transparent pricing & timeline</span>
                </div>
                <div className="feature-item">
                  <FiCheckCircle />
                  <span>No obligation, just honest advice</span>
                </div>
              </div>
            </div>
            <div className="action-right">
              <button className="start-button">
                <span>Get Started</span>
                <FiArrowRight className="arrow-icon" />
              </button>
              <p className="action-subtext">Join 200+ satisfied clients</p>
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

        .work-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .work-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .bg-gradient {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: floatGradient 15s ease-in-out infinite;
        }

        .gradient-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .gradient-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .gradient-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 40%;
          animation-delay: 10s;
        }

        @keyframes floatGradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .work-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .work-hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 60px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Metrics Grid */
        .metrics-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          margin-top: 60px;
        }

        .metric-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          width: 240px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .metric-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .metric-icon {
          font-size: 42px;
          color: #00bfff;
          margin-bottom: 20px;
        }

        .metric-value {
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* Process Timeline */
        .process-section {
          padding: 120px 0;
        }

        .process-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .process-step {
          position: relative;
          padding: 50px 40px 50px 140px;
          margin-bottom: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 25px;
          transition: all 0.5s ease;
          animation: fadeInUp 0.8s ease both;
          overflow: hidden;
        }

        .process-step:hover,
        .process-step.active {
          transform: translateX(10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .step-number {
          position: absolute;
          top: 30px;
          left: 40px;
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.15;
          line-height: 1;
        }

        .step-icon {
          position: absolute;
          top: 50px;
          left: 40px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 32px;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .step-content {
          position: relative;
          z-index: 1;
        }

        .step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0;
        }

        .step-duration {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .step-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .step-details {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .detail-item svg {
          flex-shrink: 0;
          font-size: 18px;
        }

        .step-connector {
          position: absolute;
          left: 74px;
          top: 130px;
          bottom: -40px;
          width: 2px;
          background: linear-gradient(180deg, rgba(0, 99, 244, 0.5), transparent);
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        .step-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .process-step:hover .step-glow,
        .process-step.active .step-glow {
          opacity: 0.2;
        }

        /* Principles Section */
        .principles-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .principles-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: center;
        }

        .principle-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .principle-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .principle-icon {
          font-size: 48px;
          color: #00bfff;
          margin-bottom: 24px;
        }

        .principle-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .principle-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .principle-line {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #0063f4, #00bfff);
          border-radius: 2px;
          margin-top: 24px;
          transition: width 0.4s ease;
        }

        .principle-card:hover .principle-line {
          width: 100px;
        }

        /* Tools Section */
        .tools-section {
          padding: 120px 0;
        }

        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
        }

        .tool-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease both;
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .tool-card:hover {
          transform: translateY(-8px) scale(1.05);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.3);
        }

        .tool-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }

        .tool-icon svg {
          color: inherit;
        }

        /* Original Brand Colors for Tech Stack Icons */
        .tool-card:nth-child(1) .tool-icon { color: #F24E1E; } /* Figma */
        .tool-card:nth-child(2) .tool-icon { color: #61DAFB; } /* React */
        .tool-card:nth-child(3) .tool-icon { color: #339933; } /* Node.js */
        .tool-card:nth-child(4) .tool-icon { color: #FF9900; } /* AWS */
        .tool-card:nth-child(5) .tool-icon { color: #2496ED; } /* Docker */
        .tool-card:nth-child(6) .tool-icon { color: #F05032; } /* Git */
        .tool-card:nth-child(7) .tool-icon { color: #0052CC; } /* Jira */
        .tool-card:nth-child(8) .tool-icon { color: #4A154B; } /* Slack */

        .tool-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .tool-category {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        /* New Action Section */
        .action-section {
          padding: 120px 0;
        }

        .action-wrapper {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
          padding: 70px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
        }

        .action-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .action-left {
          position: relative;
          z-index: 1;
        }

        .action-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 25px;
          color: #00bfff;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 25px;
          width: fit-content;
        }

        .action-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .action-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 35px;
          max-width: 600px;
        }

        .action-features {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .feature-item svg {
          color: #00ff88;
          font-size: 20px;
          flex-shrink: 0;
        }

        .action-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .start-button {
          position: relative;
          padding: 24px 60px;
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.4);
          overflow: hidden;
        }

        .start-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .start-button:hover::before {
          left: 100%;
        }

        .start-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0, 99, 244, 0.6);
          background: linear-gradient(135deg, #0077ff, #00d4ff);
        }

        .start-button span {
          position: relative;
          z-index: 1;
        }

        .arrow-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .start-button:hover .arrow-icon {
          transform: translateX(5px);
        }

        .action-subtext {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .process-step {
            padding: 40px 30px 40px 120px;
          }

          .step-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
            left: 30px;
            top: 40px;
          }

          .step-number {
            left: 30px;
            font-size: 3rem;
          }

          .step-connector {
            left: 60px;
          }

          .action-wrapper {
            grid-template-columns: 1fr;
            gap: 50px;
            padding: 60px 50px;
          }

          .action-right {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .work-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .metrics-grid {
            gap: 20px;
          }

          .metric-card {
            width: calc(50% - 10px);
            min-width: 0;
          }

          .metric-value {
            font-size: 2.2rem;
          }

          .section-title {
            font-size: 36px;
          }

          .process-step {
            padding: 120px 25px 30px 25px;
          }

          .step-number {
            top: 20px;
            left: 25px;
            font-size: 2.5rem;
          }

          .step-icon {
            top: 20px;
            left: auto;
            right: 25px;
            width: 55px;
            height: 55px;
            font-size: 24px;
          }

          .step-connector {
            display: none;
          }

          .step-title {
            font-size: 1.5rem;
          }

          .step-details {
            grid-template-columns: 1fr;
          }

          .principles-grid {
            gap: 30px;
          }

          .principle-card {
            width: 100%;
          }

          .tools-grid {
            gap: 20px;
          }

          .tool-card {
            width: calc(50% - 10px);
            min-width: 0;
            padding: 30px 20px;
          }

          .tool-icon {
            font-size: 2.8rem;
          }

          .action-wrapper {
            padding: 50px 30px;
          }

          .action-title {
            font-size: 2.5rem;
          }

          .action-text {
            font-size: 1.05rem;
          }

          .start-button {
            padding: 20px 50px;
            font-size: 1.15rem;
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .metrics-grid {
            flex-direction: column;
          }

          .metric-card {
            width: 100%;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 18px;
          }

          .step-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .tool-card {
            width: 100%;
          }

          .action-title {
            font-size: 2rem;
          }

          .start-button {
            padding: 18px 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default HowWeWorkandFunction;