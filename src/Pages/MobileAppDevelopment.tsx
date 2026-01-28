import React, { useState, useEffect, useRef } from "react";
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
  FiWifi,
  FiCode,
  FiCloud,
  FiDatabase,
  FiPackage,
  FiTarget,
  FiAward,
  FiClock
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type ServiceCategory = "ios" | "android" | "cross-platform" | "enterprise";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  category: ServiceCategory;
  color: string;
}

const MobileAppDevelopment = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [activeService, setActiveService] = useState<ServiceCategory>("ios");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const services: Service[] = [
    {
      icon: <FiSmartphone />,
      title: "Native iOS Development",
      description: "Craft exceptional iOS experiences using Swift and Apple's latest frameworks for seamless performance.",
      features: [
        "Swift & SwiftUI development",
        "Apple ecosystem integration",
        "App Store optimization",
        "ARKit & Core ML integration"
      ],
      category: "ios",
      color: "#007AFF"
    },
    {
      icon: <FiSmartphone />,
      title: "Native Android Development",
      description: "Build powerful Android applications with Kotlin and modern Jetpack components.",
      features: [
        "Kotlin & Jetpack Compose",
        "Material Design 3 implementation",
        "Google Play optimization",
        "Android 14 features"
      ],
      category: "android",
      color: "#3DDC84"
    },
    {
      icon: <FiLayers />,
      title: "Cross-Platform Apps",
      description: "Unified development with React Native and Flutter for maximum reach and efficiency.",
      features: [
        "Single codebase deployment",
        "Native-like performance",
        "Cost-effective solution",
        "Rapid prototyping"
      ],
      category: "cross-platform",
      color: "#8B5CF6"
    },
    {
      icon: <FiBox />,
      title: "Enterprise Solutions",
      description: "Secure, scalable enterprise applications with advanced integration capabilities.",
      features: [
        "Enterprise security protocols",
        "Legacy system integration",
        "Custom workflow automation",
        "Advanced analytics dashboard"
      ],
      category: "enterprise",
      color: "#F97316"
    }
  ];

  const technologies = {
    crossPlatform: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569B" },
      { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg", color: "#3880FF" },
      { name: "Xamarin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg", color: "#3498DB" }
    ],
    native: [
      { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", color: "#F05138" },
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "#7F52FF" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
      { name: "Objective-C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg", color: "#438EFF" }
    ],
    backend: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#FFCA28" },
      { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", color: "#E10098" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" }
    ],
    tools: [
      { name: "Xcode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg", color: "#1575F9" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", color: "#3DDC84" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" }
    ]
  };

  const features = [
    { 
      icon: <FiZap />, 
      title: "High Performance", 
      desc: "Optimized for 60fps smooth animations and instant load times",
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)"
    },
    { 
      icon: <FiShield />, 
      title: "Bank-Level Security", 
      desc: "End-to-end encryption and GDPR compliance",
      gradient: "linear-gradient(135deg, #10b981, #047857)"
    },
    { 
      icon: <FiTrendingUp />, 
      title: "Scalable Architecture", 
      desc: "Microservices ready for millions of users",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
    },
    { 
      icon: <FiUsers />, 
      title: "User-Centric Design", 
      desc: "Accessibility-first with intuitive UX",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)"
    },
    { 
      icon: <FiDatabase />, 
      title: "Real-time Sync", 
      desc: "Offline-first with instant cloud sync",
      gradient: "linear-gradient(135deg, #6366f1, #3b82f6)"
    },
    { 
      icon: <FiTarget />, 
      title: "AI-Powered Analytics", 
      desc: "Predictive analytics and user behavior insights",
      gradient: "linear-gradient(135deg, #f43f5e, #8b5cf6)"
    }
  ];

  const process = [
    { 
      num: "01", 
      title: "Discovery & Strategy", 
      desc: "In-depth analysis and roadmap creation",
      icon: <FiTarget />
    },
    { 
      num: "02", 
      title: "UI/UX Design", 
      desc: "Interactive prototypes and user testing",
      icon: <FiPackage />
    },
    { 
      num: "03", 
      title: "Development", 
      desc: "Agile development with weekly demos",
      icon: <FiCode />
    },
    { 
      num: "04", 
      title: "Quality Assurance", 
      desc: "Automated testing and manual validation",
      icon: <FiAward />
    },
    { 
      num: "05", 
      title: "Launch & Scale", 
      desc: "App store deployment and performance monitoring",
      icon: <FiCloud />
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLearnMore = (category: ServiceCategory) => {
    navigate(`/mobile-app-learn-more?category=${category}`);
  };

  const currentService = services.find(s => s.category === activeService);

  return (
    <div 
      ref={containerRef}
      className="mobile-app-page"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background */}
      <div className="page-background">
        <div className="bg-gradient"></div>
        <div className="dynamic-grid"></div>
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: `calc(${Math.random() * 100}vw + ${Math.sin(Date.now() * 0.001 + i) * 20}px)`,
              y: `calc(${Math.random() * 100}vh + ${Math.cos(Date.now() * 0.001 + i) * 20}px)`,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        ))}
      </div>

      {/* Mouse Follow Gradient */}
      <motion.div
        className="mouse-follow"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      ></motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-content"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hero-badge"
              >
                <div className="badge-pulse"></div>
                <span>Mobile App Development</span>
              </motion.div>

              <h1 className="hero-title">
                <span className="text-white">Transform Your</span>
                <br />
                <span className="title-gradient">Mobile Vision</span>
              </h1>

              <p className="hero-description">
                We craft exceptional mobile experiences that engage users and drive business growth. 
                From concept to launch, we're with you every step of the way.
              </p>

              <div className="hero-cta">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-primary"
                >
                  Start Your Project
                  <FiArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-secondary"
                >
                  <FiMessageSquare />
                  Free Consultation
                </motion.button>
              </div>

              <div className="hero-stats">
                {[
                  { value: "200+", label: "Apps Launched" },
                  { value: "5M+", label: "Downloads" },
                  { value: "4.8★", label: "Avg Rating" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="stat-box"
                  >
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Phone Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-visual"
            >
              {/* Floating Icons */}
              <div className="floating-icons">
               {[
  { icon: <FiCpu />, delay: 0, gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
  { icon: <FiActivity />, delay: 0.2, gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { icon: <FiDatabase />, delay: 0.4, gradient: "linear-gradient(135deg, #10b981, #047857)" },
  { icon: <FiCloud />, delay: 0.6, gradient: "linear-gradient(135deg, #f97316, #ef4444)" }
].map((item, i) => (
  <motion.div
    key={i}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1 
    }}
    transition={{ delay: item.delay, type: "spring" }}
    className="float-icon"
    style={{
      left: `${20 + i * 15}%`,
      top: `${10 + i * 20}%`,
      background: item.gradient
    }}
  >
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: i * 0.5
      }}
    >
      {item.icon}
    </motion.div>
  </motion.div>
))}
              </div>

              {/* Phone Stack */}
              <div className="phone-stack">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="phone-mockup"
                    initial={{ rotate: i === 0 ? -8 : i === 1 ? 4 : -12 }}
                    animate={{ rotate: i === 0 ? -8 : i === 1 ? 4 : -12 }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 50 }}
                    style={{
                      transform: `translateX(${(i - 1) * 60}px) rotate(${i === 0 ? -8 : i === 1 ? 4 : -12}deg)`,
                      zIndex: 30 - i * 10
                    }}
                  >
                    <div className="phone-inner"></div>
                    <img
                      src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop&q=80`}
                      alt={`App Screenshot ${i + 1}`}
                      className="phone-image"
                    />
                    <div className="phone-overlay"></div>
                    <div className="phone-overlay-bottom"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="scroll-indicator"
        >
          <span className="scroll-text">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="scroll-arrow"
          >
            <div className="scroll-dot"></div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Our <span className="section-title-gradient">Services</span>
            </h2>
            <p className="section-desc">
              Comprehensive mobile solutions tailored to your specific needs
            </p>
          </motion.div>

          <div className="services-container">
            {/* Service Cards */}
            <div className="services-list">
              {services.map((service) => (
                <motion.div
                  key={service.category}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => setActiveService(service.category)}
                  className={`service-card ${activeService === service.category ? 'active' : ''}`}
                >
                  <div className="service-card-header">
                    <div 
                      className="service-icon-wrapper"
                      style={{ color: service.color }}
                    >
                      {service.icon}
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <FiArrowRight 
                      className="service-arrow"
                      style={{ 
                        color: service.color,
                        transform: activeService === service.category ? 'translateX(8px)' : 'none',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="service-features">
                    {service.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service Details */}
            <AnimatePresence mode="wait">
              {currentService && (
                <motion.div
                  key={currentService.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="service-detail"
                >
                  <div className="detail-header">
                    <div 
                      className="detail-icon-wrapper"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentService.color}40, transparent)`,
                        color: currentService.color
                      }}
                    >
                      {currentService.icon}
                    </div>
                    <div>
                      <h3 className="detail-title">{currentService.title}</h3>
                      <div className="expertise-bar">
                        <div className="expertise-bar-track">
                          <motion.div
                            className="expertise-bar-fill"
                            style={{ background: currentService.color }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                          ></motion.div>
                        </div>
                        <span className="expertise-label">Expertise Level</span>
                      </div>
                    </div>
                  </div>

                  <p className="detail-description">{currentService.description}</p>

                  <div className="detail-features">
                    {currentService.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="detail-feature"
                      >
                        <FiCheckCircle style={{ color: currentService.color }} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLearnMore(currentService.category)}
                    className="detail-cta"
                    style={{ background: currentService.color }}
                  >
                    Learn More
                    <FiArrowRight />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Technology <span className="section-title-gradient">Stack</span>
            </h2>
            <p className="section-desc">
              Leveraging cutting-edge technologies for superior mobile experiences
            </p>
          </motion.div>

          <div className="tech-grid">
            {Object.entries(technologies).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="tech-category"
              >
                <h3 className="category-title">
                  {category.replace(/([A-Z])/g, ' $1')}
                </h3>
                <div className="tech-items">
                  {items.map((tech, techIdx) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + techIdx * 0.05 }}
                      whileHover={{ x: 10 }}
                      className="tech-item"
                    >
                      <div className="tech-icon">
                        <img src={tech.icon} alt={tech.name} />
                      </div>
                      <span className="tech-name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Why <span className="section-title-gradient">Choose Us</span>
            </h2>
            <p className="section-desc">
              Delivering excellence at every step of your mobile journey
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="feature-card"
              >
                <div 
                  className="feature-icon-wrapper"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.desc}</p>
                <motion.div
                  className="feature-divider"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Our <span className="section-title-gradient">Process</span>
            </h2>
            <p className="section-desc">
              A transparent, collaborative approach to app development
            </p>
          </motion.div>

          <div className="process-timeline">
            <div className="timeline-line"></div>
            <div className="process-steps">
              {process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="process-step"
                >
                  {i % 2 === 0 && <div className="step-spacer"></div>}
                  
                  <div className="step-content">
                    <div className="step-header">
                      <div className="step-icon-wrapper">
                        {step.icon}
                      </div>
                      <div>
                        <div className="step-number">Step {step.num}</div>
                        <h3 className="step-title">{step.title}</h3>
                      </div>
                    </div>
                    <p className="step-desc">{step.desc}</p>
                  </div>

                  <div className="timeline-node">
                    <motion.div
                      className="node-circle"
                      style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                      whileHover={{ scale: 1.5 }}
                    ></motion.div>
                  </div>

                  {i % 2 !== 0 && <div className="step-spacer"></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-card"
          >
            <div className="cta-icon-wrapper">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FiRefreshCw className="cta-icon" />
              </motion.div>
            </div>
            
            <h2 className="cta-title">
              Ready to Build Your
              <br />
              <span className="cta-title-gradient">Dream App?</span>
            </h2>
            
            <p className="cta-text">
              Let's turn your vision into reality. Schedule a free consultation with our experts today.
            </p>

            <div className="cta-actions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-btn-primary"
              >
                <FiPhone />
                Book a Call
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-btn-secondary"
              >
                <FiMail />
                Get a Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-btn-tertiary"
              >
                <FiGlobe />
                View Portfolio
              </motion.button>
            </div>

            <div className="cta-info">
              <p className="cta-info-text">
                <span className="info-highlight">24/7 Support</span> • 
                <span className="info-highlight">30-Day Warranty</span> • 
                <span className="info-highlight">Free Prototype</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styles */}
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

        /* Animated Background Effects */
        .page-background {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0f172a 0%, #020617 50%, #0f172a 100%);
        }

        .dynamic-grid {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 80%);
          mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 80%);
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
        }

        /* Mouse Follow Gradient */
        .mouse-follow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Container */
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 0 60px;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 32px;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .title-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 10s infinite linear;
        }

        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
          max-width: 600px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 400px;
        }

        .stat-box {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          height: 700px;
        }

        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: white;
          font-size: 24px;
          animation: floatIcon 3s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .phone-stack {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-mockup {
          position: absolute;
          width: 280px;
          height: 560px;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(59, 130, 246, 0.2);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 8px solid #0f172a;
        }

        .phone-mockup:hover {
          transform: translate(-50%, -50%) rotate(0deg) scale(1.05);
          z-index: 100;
          box-shadow: 
            0 70px 140px rgba(59, 130, 246, 0.5),
            0 0 0 2px rgba(59, 130, 246, 0.4),
            0 0 80px rgba(59, 130, 246, 0.4);
        }

        .phone-inner {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e293b, #0f172a);
        }

        .phone-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .phone-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
        }

        .phone-overlay-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .scroll-text {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .scroll-arrow {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          display: flex;
          justify-content: center;
        }

        .scroll-dot {
          width: 4px;
          height: 12px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
          margin-top: 8px;
        }

        /* Section Styles */
        .section {
          padding: 120px 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .section-title-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
          max-width: 800px;
          margin: 0 auto;
        }

        /* Services Section */
        .services-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .service-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(8px);
        }

        .service-card.active {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .service-card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
        }

        .service-card-content {
          flex: 1;
        }

        .service-icon-wrapper {
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .service-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 16px;
        }

        .service-arrow {
          font-size: 24px;
          margin-top: 12px;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature-tag {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .service-detail {
          padding: 40px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .detail-icon-wrapper {
          padding: 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }

        .detail-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .expertise-bar {
          margin-top: 12px;
        }

        .expertise-bar-track {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .expertise-bar-fill {
          height: 100%;
          border-radius: 2px;
        }

        .expertise-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .detail-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 32px;
        }

        .detail-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .detail-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .detail-feature svg {
          flex-shrink: 0;
        }

        .detail-cta {
          padding: 14px 32px;
          border-radius: 10px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          color: white;
          font-size: 1rem;
        }

        .detail-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Technology Stack */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
        }

        .tech-category:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-8px);
        }

        .category-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #3b82f6;
          text-transform: capitalize;
        }

        .tech-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(8px);
        }

        .tech-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .tech-icon img {
          width: 24px;
          height: 24px;
        }

        .tech-name {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Features Section */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.4s ease;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 32px;
          color: white;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
        }

        .feature-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .feature-card-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .feature-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
          margin-top: 24px;
        }

        /* Process Section */
        .process-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899);
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 120px;
        }

        .process-step {
          position: relative;
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .step-content {
          flex: 1;
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .step-content:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(10px);
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .step-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          border-radius: 12px;
          font-size: 24px;
        }

        .step-number {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 4px;
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .step-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .timeline-node {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          z-index: 2;
        }

        .node-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .step-spacer {
          flex: 1;
        }

        /* CTA Section */
        .cta-section {
          position: relative;
          padding: 120px 0;
        }

        .cta-card {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%);
        }

        .cta-icon-wrapper {
          display: inline-block;
          padding: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .cta-icon {
          font-size: 48px;
          color: #3b82f6;
        }

        .cta-title {
          font-size: clamp(36px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-title-gradient {
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-btn-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
        }

        .cta-btn-secondary {
          background: rgba(244, 63, 94, 0.2);
          color: white;
          border: 1px solid #f43f5e;
        }

        .cta-btn-secondary:hover {
          background: #f43f5e;
          transform: translateY(-2px);
        }

        .cta-btn-tertiary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 1px solid #8b5cf6;
        }

        .cta-btn-tertiary:hover {
          background: #8b5cf6;
          transform: translateY(-2px);
        }

        .cta-info {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
        }

        .cta-info-text {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .info-highlight {
          color: white;
          font-weight: 600;
          margin: 0 16px;
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .hero-grid,
          .services-container,
          .tech-grid,
          .features-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .process-step {
            flex-direction: column;
            gap: 40px;
            text-align: center;
          }

          .step-spacer {
            display: none;
          }

          .timeline-line {
            left: 40px;
          }

          .timeline-node {
            left: 40px;
          }

          .step-content {
            width: calc(100% - 80px);
            margin-left: 80px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1.15rem;
          }

          .hero-cta {
            flex-direction: column;
          }

          .cta-primary, .cta-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .hero-visual {
            height: 500px;
          }

          .phone-mockup {
            width: 240px;
            height: 480px;
          }

          .section {
            padding: 80px 0;
          }

          .section-title {
            font-size: 32px;
          }

          .service-detail,
          .tech-category,
          .feature-card {
            padding: 24px;
          }

          .cta-card {
            padding: 40px 24px;
          }

          .cta-actions {
            flex-direction: column;
          }

          .cta-btn-primary,
          .cta-btn-secondary,
          .cta-btn-tertiary {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .phone-mockup {
            width: 200px;
            height: 400px;
          }

          .detail-title {
            font-size: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAppDevelopment;