import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  FiArrowLeft,
  FiCheckCircle,
  FiCode,
  FiZap,
  FiShield,
  FiLayers,
  FiSmartphone,
  FiBox,
  FiCpu,
  FiServer,
  FiDatabase,
  FiCloud,
  FiGlobe,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiClock,
  FiDollarSign,
  FiMonitor,
  FiPackage
} from "react-icons/fi";

type CategoryType = "ios" | "android" | "cross-platform" | "enterprise";

const WebApplearnMore = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as CategoryType;
  
  const [category, setCategory] = useState<CategoryType>(categoryParam || "ios");
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryParam && (categoryParam === "ios" || categoryParam === "android" || categoryParam === "cross-platform" || categoryParam === "enterprise")) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % contentData[category].features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [category]);

  const contentData = {
    ios: {
      title: "Native iOS Development",
      subtitle: "Build powerful apps for iPhone, iPad, and Apple Watch",
      description: "Create stunning iOS applications using Swift and SwiftUI with the latest Apple technologies. Our expert team delivers premium experiences that Apple users love.",
      icon: <FiSmartphone />,
      color: "#007AFF",
      gradient: "linear-gradient(135deg, #007AFF, #5AC8FA)",
      features: [
        {
          icon: <FiCode />,
          title: "Swift & SwiftUI",
          desc: "Modern Swift language with declarative SwiftUI framework for beautiful, performant apps"
        },
        {
          icon: <FiLayers />,
          title: "iOS Ecosystem",
          desc: "Full integration with iCloud, Apple Pay, HealthKit, ARKit, and Core ML"
        },
        {
          icon: <FiShield />,
          title: "App Store Ready",
          desc: "Complete App Store optimization and compliance with Apple guidelines"
        },
        {
          icon: <FiCpu />,
          title: "Performance",
          desc: "Metal graphics, Core Animation, and optimized code for smooth 60fps experiences"
        }
      ],
      technologies: [
        { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
        { name: "Xcode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" },
        { name: "Objective-C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg" }
      ],
      benefits: [
        "Premium user experience with native iOS design",
        "Access to latest iOS features and APIs",
        "Superior performance and battery efficiency",
        "Seamless Apple ecosystem integration",
        "High-quality App Store presence"
      ],
      process: [
        { step: "01", title: "Requirements", desc: "Define iOS-specific features and Apple guidelines" },
        { step: "02", title: "UI/UX Design", desc: "Create beautiful interfaces following Apple HIG" },
        { step: "03", title: "Development", desc: "Build with Swift and latest iOS frameworks" },
        { step: "04", title: "Testing", desc: "Rigorous testing on all iOS devices" },
        { step: "05", title: "Deployment", desc: "App Store submission and launch" }
      ],
      stats: [
        { icon: <FiUsers />, value: "1.5B+", label: "iOS Users Worldwide" },
        { icon: <FiDollarSign />, value: "$85B", label: "App Store Revenue" },
        { icon: <FiAward />, value: "4.7★", label: "Average App Rating" }
      ]
    },
    android: {
      title: "Native Android Development",
      subtitle: "Reach billions with powerful Android applications",
      description: "Build feature-rich Android apps using Kotlin and Jetpack Compose. Leverage Google's powerful ecosystem and reach the world's largest mobile platform.",
      icon: <FiSmartphone />,
      color: "#3DDC84",
      gradient: "linear-gradient(135deg, #3DDC84, #07C160)",
      features: [
        {
          icon: <FiCode />,
          title: "Kotlin & Jetpack",
          desc: "Modern Kotlin with Jetpack Compose for efficient, maintainable Android apps"
        },
        {
          icon: <FiLayers />,
          title: "Material Design",
          desc: "Beautiful Material Design 3 with dynamic theming and modern components"
        },
        {
          icon: <FiGlobe />,
          title: "Google Services",
          desc: "Integration with Google Play, Maps, Firebase, ML Kit, and Android Auto"
        },
        {
          icon: <FiPackage />,
          title: "Multi-Device",
          desc: "Support for phones, tablets, foldables, Wear OS, and Android TV"
        }
      ],
      technologies: [
        { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
      ],
      benefits: [
        "Largest mobile market with 3+ billion devices",
        "Flexible customization and device support",
        "Google Play services integration",
        "Open-source platform advantages",
        "Extensive hardware compatibility"
      ],
      process: [
        { step: "01", title: "Planning", desc: "Define Android features and target devices" },
        { step: "02", title: "Design", desc: "Material Design implementation and prototyping" },
        { step: "03", title: "Development", desc: "Build with Kotlin and Android Jetpack" },
        { step: "04", title: "QA Testing", desc: "Test across multiple devices and OS versions" },
        { step: "05", title: "Launch", desc: "Google Play Store optimization and release" }
      ],
      stats: [
        { icon: <FiUsers />, value: "3B+", label: "Android Devices" },
        { icon: <FiGlobe />, value: "190+", label: "Countries Reached" },
        { icon: <FiTrendingUp />, value: "72%", label: "Market Share" }
      ]
    },
    "cross-platform": {
      title: "Cross-Platform Development",
      subtitle: "Build once, deploy everywhere with modern frameworks",
      description: "Develop powerful apps with React Native and Flutter. Single codebase for iOS and Android with near-native performance and reduced development time.",
      icon: <FiLayers />,
      color: "#FF6B9D",
      gradient: "linear-gradient(135deg, #FF6B9D, #C084FC)",
      features: [
        {
          icon: <FiZap />,
          title: "Single Codebase",
          desc: "Write once, deploy to iOS and Android from one shared codebase"
        },
        {
          icon: <FiClock />,
          title: "Faster Development",
          desc: "Reduce development time by 50% with hot reload and shared logic"
        },
        {
          icon: <FiDollarSign />,
          title: "Cost Effective",
          desc: "Lower development and maintenance costs with unified codebase"
        },
        {
          icon: <FiCpu />,
          title: "Native Performance",
          desc: "Near-native performance with platform-specific optimizations"
        }
      ],
      technologies: [
        { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" }
      ],
      benefits: [
        "Single codebase for multiple platforms",
        "Faster time to market for both iOS and Android",
        "Reduced development and maintenance costs",
        "Easy updates across all platforms",
        "Large developer community and libraries"
      ],
      process: [
        { step: "01", title: "Strategy", desc: "Choose framework and define shared architecture" },
        { step: "02", title: "Design", desc: "Create unified UI that works across platforms" },
        { step: "03", title: "Build", desc: "Develop with React Native or Flutter" },
        { step: "04", title: "Test", desc: "Comprehensive testing on iOS and Android" },
        { step: "05", title: "Deploy", desc: "Simultaneous launch on both app stores" }
      ],
      stats: [
        { icon: <FiClock />, value: "50%", label: "Faster Development" },
        { icon: <FiDollarSign />, value: "40%", label: "Cost Reduction" },
        { icon: <FiUsers />, value: "2x", label: "Market Reach" }
      ]
    },
    enterprise: {
      title: "Enterprise Mobile Solutions",
      subtitle: "Secure, scalable apps for large organizations",
      description: "Build enterprise-grade mobile applications with advanced security, custom integrations, and scalable architecture. Perfect for large teams and complex workflows.",
      icon: <FiBox />,
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)",
      features: [
        {
          icon: <FiShield />,
          title: "Enterprise Security",
          desc: "Bank-level encryption, MDM support, and compliance with SOC 2, HIPAA"
        },
        {
          icon: <FiServer />,
          title: "Backend Integration",
          desc: "Seamless integration with SAP, Salesforce, Oracle, and custom systems"
        },
        {
          icon: <FiDatabase />,
          title: "Data Management",
          desc: "Offline sync, real-time data, and secure cloud storage solutions"
        },
        {
          icon: <FiCloud />,
          title: "Scalability",
          desc: "Architecture that handles thousands of users and massive data loads"
        }
      ],
      technologies: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" }
      ],
      benefits: [
        "Enterprise-grade security and compliance",
        "Custom workflow automation",
        "Legacy system integration",
        "Advanced analytics and reporting",
        "24/7 support and maintenance"
      ],
      process: [
        { step: "01", title: "Discovery", desc: "Understand enterprise requirements and systems" },
        { step: "02", title: "Architecture", desc: "Design scalable, secure enterprise architecture" },
        { step: "03", title: "Development", desc: "Build with enterprise frameworks and security" },
        { step: "04", title: "Integration", desc: "Connect with existing enterprise systems" },
        { step: "05", title: "Support", desc: "Ongoing maintenance and 24/7 support" }
      ],
      stats: [
        { icon: <FiUsers />, value: "10K+", label: "Enterprise Users" },
        { icon: <FiShield />, value: "99.9%", label: "Uptime SLA" },
        { icon: <FiServer />, value: "100+", label: "System Integrations" }
      ]
    }
  };

  const currentContent = contentData[category];

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="learn-more-page">
      {/* Animated Background */}
      <div className="tech-bg">
        <div className="hexagon-pattern"></div>
        <div className="particle-field">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        <div className="gradient-overlay"></div>
      </div>

      {/* Back Button */}
      <div className="back-nav">
        <button className="back-btn" onClick={handleBack}>
          <FiArrowLeft />
          <span>Back to Services</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="detail-hero">
        <div className="container">
          <div className="hero-content-center">
            <div className="hero-icon-large" style={{ background: currentContent.gradient }}>
              {currentContent.icon}
            </div>
            <h1 className="hero-title-large">
              {currentContent.title}
            </h1>
            <p className="hero-subtitle-large">
              {currentContent.subtitle}
            </p>
            <p className="hero-description-large">
              {currentContent.description}
            </p>

            {/* Stats */}
            <div className="hero-stats-grid">
              {currentContent.stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon" style={{ color: currentContent.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="features-showcase">
        <div className="container">
          <h2 className="section-title-center">
            Key <span style={{ color: currentContent.color }}>Features</span>
          </h2>

          <div className="features-interactive">
            <div className="features-nav-vertical">
              {currentContent.features.map((feature, idx) => (
                <button
                  key={idx}
                  className={`feature-nav-btn ${activeFeature === idx ? 'active' : ''}`}
                  onClick={() => setActiveFeature(idx)}
                  style={activeFeature === idx ? { borderColor: currentContent.color } : {}}
                >
                  <div className="feature-nav-icon" style={activeFeature === idx ? { color: currentContent.color } : {}}>
                    {feature.icon}
                  </div>
                  <span>{feature.title}</span>
                </button>
              ))}
            </div>

            <div className="feature-display-card">
              <div className="feature-icon-3d" style={{ background: currentContent.gradient }}>
                {currentContent.features[activeFeature].icon}
              </div>
              <h3 className="feature-title-large">{currentContent.features[activeFeature].title}</h3>
              <p className="feature-desc-large">{currentContent.features[activeFeature].desc}</p>
              
              <div className="feature-animation">
                <div className="code-block">
                  <div className="code-line" style={{ animationDelay: '0s' }}></div>
                  <div className="code-line" style={{ animationDelay: '0.1s' }}></div>
                  <div className="code-line short" style={{ animationDelay: '0.2s' }}></div>
                  <div className="code-line" style={{ animationDelay: '0.3s' }}></div>
                  <div className="code-line short" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="tech-showcase">
        <div className="container">
          <h2 className="section-title-center">
            Core <span style={{ color: currentContent.color }}>Technologies</span>
          </h2>

          <div className="tech-cards-3d">
            {currentContent.technologies.map((tech, idx) => (
              <div key={idx} className="tech-card-3d">
                <div className="tech-card-inner">
                  <div className="tech-card-front">
                    <img src={tech.icon} alt={tech.name} />
                    <h4>{tech.name}</h4>
                  </div>
                  <div className="tech-card-back" style={{ background: currentContent.gradient }}>
                    <FiCheckCircle />
                    <p>Expert Level</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section-detail">
        <div className="container">
          <h2 className="section-title-center">
            Why Choose <span style={{ color: currentContent.color }}>This Approach</span>
          </h2>

          <div className="benefits-grid-detail">
            {currentContent.benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="benefit-item-detail"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="benefit-check" style={{ background: currentContent.gradient }}>
                  <FiCheckCircle />
                </div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section-detail">
        <div className="container">
          <h2 className="section-title-center">
            Development <span style={{ color: currentContent.color }}>Process</span>
          </h2>

          <div className="process-flow">
            {currentContent.process.map((step, idx) => (
              <div key={idx} className="process-node">
                <div className="process-circle" style={{ background: currentContent.gradient }}>
                  {step.step}
                </div>
                <div className="process-content-node">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {idx < currentContent.process.length - 1 && (
                  <div className="process-line" style={{ background: currentContent.gradient }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section-detail">
        <div className="container">
          <div className="cta-box-3d" style={{ borderColor: currentContent.color }}>
            <div className="cta-glow" style={{ background: currentContent.gradient }}></div>
            <FiMonitor className="cta-icon-large" style={{ color: currentContent.color }} />
            <h2>Ready to Get Started?</h2>
            <p>Let's build something amazing together. Contact us for a free consultation.</p>
            <div className="cta-buttons-row">
              <button className="cta-btn-solid" style={{ background: currentContent.gradient }}>
                Start Project
              </button>
              <button className="cta-btn-outline" style={{ borderColor: currentContent.color, color: currentContent.color }}>
                Schedule Call
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

        .learn-more-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .tech-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hexagon-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(45deg, transparent 0px, transparent 50px, rgba(255, 255, 255, 0.02) 51px, transparent 56px),
            repeating-linear-gradient(-45deg, transparent 0px, transparent 50px, rgba(255, 255, 255, 0.02) 51px, transparent 56px);
          animation: hexMove 20s linear infinite;
        }

        @keyframes hexMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(88, 101, 242, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .back-nav {
          padding: 24px 0;
          position: relative;
          z-index: 10;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          margin-left: 24px;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        .detail-hero {
          padding: 60px 0 100px;
        }

        .hero-content-center {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-icon-large {
          width: 120px;
          height: 120px;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          font-size: 56px;
          color: white;
          animation: iconFloat 3s ease-in-out infinite;
          box-shadow: 0 20px 60px rgba(88, 101, 242, 0.4);
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .hero-title-large {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .hero-subtitle-large {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
          font-weight: 600;
        }

        .hero-description-large {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 60px;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .features-showcase {
          padding: 100px 0;
        }

        .section-title-center {
          text-align: center;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 80px;
        }

        .features-interactive {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-nav-vertical {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-nav-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .feature-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
        }

        .feature-nav-btn.active {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .feature-nav-icon {
          font-size: 28px;
        }

        .feature-display-card {
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .feature-icon-3d {
          width: 100px;
          height: 100px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          font-size: 48px;
          color: white;
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.4);
          animation: icon3D 4s ease-in-out infinite;
        }

        @keyframes icon3D {
          0%, 100% { transform: perspective(500px) rotateY(0deg); }
          50% { transform: perspective(500px) rotateY(15deg); }
        }

        .feature-title-large {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .feature-desc-large {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
        }

        .feature-animation {
          margin-top: 40px;
        }

        .code-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .code-line {
          height: 12px;
          background: linear-gradient(90deg, rgba(88, 101, 242, 0.4), rgba(88, 101, 242, 0.1));
          border-radius: 6px;
          animation: codeLine 2s ease-in-out infinite;
        }

        .code-line.short {
          width: 60%;
        }

        @keyframes codeLine {
          0%, 100% { opacity: 0.3; transform: scaleX(0.95); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .tech-showcase {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-cards-3d {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          max-width: 800px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .tech-card-3d {
          height: 250px;
          perspective: 1000px;
          cursor: pointer;
        }

        .tech-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .tech-card-3d:hover .tech-card-inner {
          transform: rotateY(180deg);
        }

        .tech-card-front,
        .tech-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .tech-card-front {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
        }

        .tech-card-front img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }

        .tech-card-front h4 {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .tech-card-back {
          transform: rotateY(180deg);
          color: white;
        }

        .tech-card-back svg {
          font-size: 48px;
        }

        .tech-card-back p {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .benefits-section-detail {
          padding: 100px 0;
        }

        .benefits-grid-detail {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .benefit-item-detail {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out both;
          transition: all 0.3s ease;
        }

        .benefit-item-detail:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .benefit-check {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 24px;
          color: white;
        }

        .benefit-item-detail p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .process-section-detail {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-flow {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }

        .process-node {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          align-items: center;
          position: relative;
        }

        .process-circle {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.5);
          animation: pulseCircle 2s ease-in-out infinite;
        }

        @keyframes pulseCircle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .process-content-node {
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .process-content-node h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .process-content-node p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .process-line {
          position: absolute;
          left: 40px;
          top: 80px;
          width: 3px;
          height: 80px;
          opacity: 0.5;
        }

        .cta-section-detail {
          padding: 100px 0 120px;
        }

        .cta-box-3d {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid;
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          opacity: 0.1;
          filter: blur(100px);
          animation: glowRotate 10s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-icon-large {
          font-size: 64px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-box-3d h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-box-3d p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn-solid,
        .cta-btn-outline {
          padding: 18px 40px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .cta-btn-solid {
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .cta-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .cta-btn-outline {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .cta-btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .features-interactive {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .features-nav-vertical {
            flex-direction: row;
            overflow-x: auto;
          }

          .feature-nav-btn {
            min-width: 200px;
          }

          .process-node {
            grid-template-columns: 60px 1fr;
            gap: 20px;
          }

          .process-circle {
            width: 60px;
            height: 60px;
            font-size: 1.2rem;
          }

          .process-line {
            left: 30px;
            height: 60px;
          }
        }

        @media (max-width: 768px) {
          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .features-nav-vertical {
            flex-direction: column;
          }

          .feature-nav-btn {
            min-width: auto;
          }

          .feature-display-card {
            padding: 40px 32px;
          }

          .tech-cards-3d {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .benefits-grid-detail {
            grid-template-columns: 1fr;
          }

          .process-node {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .process-circle {
            margin: 0 auto;
          }

          .process-line {
            display: none;
          }

          .cta-box-3d {
            padding: 60px 32px;
          }

          .cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 480px) {
          .back-btn {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }

          .hero-icon-large {
            width: 100px;
            height: 100px;
            font-size: 48px;
          }

          .feature-icon-3d {
            width: 80px;
            height: 80px;
            font-size: 40px;
          }

          .stat-card {
            padding: 24px 20px;
          }

          .tech-card-3d {
            height: 200px;
          }

          .tech-card-front img {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default WebApplearnMore;