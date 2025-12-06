import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Cpu, 
  Shield, 
  Bot, 
  Settings, 
  Briefcase, 
  Smile, 
  Users, 
  Trophy,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ServicesSection = () => {
  const [titleInView, setTitleInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [servicesInView, setServicesInView] = useState(false);
  const [caseStudiesInView, setCaseStudiesInView] = useState(false);
  const [clickedCase, setClickedCase] = useState<number | null>(null);
  
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement | null>(null);

  // Counter animation
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    members: 0,
    awards: 0
  });

  const services = [
    { icon: Zap, title: 'Brand', subtitle: 'Creative Art & Design' },
    { icon: Cpu, title: 'Business', subtitle: 'Consulting Services', featured: true },
    { icon: Shield, title: 'Security', subtitle: 'Cyber Security' },
    { icon: Bot, title: 'Automation', subtitle: 'System Automation' },
    { icon: Settings, title: 'Support', subtitle: 'Quick Maintenance' }
  ];

  const companies = [
    'MICROSOFT', 'GOOGLE', 'AMAZON', 'APPLE', 'META', 'NETFLIX', 
    'TESLA', 'NVIDIA', 'ADOBE', 'SPOTIFY'
  ];

  const caseStudies = [
    {
      id: 1,
      industry: 'FinTech',
      client: 'PayFlow Pro',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      challenge: 'Legacy system slowing transaction processing by 40%',
      solution: 'Built custom API infrastructure with real-time fraud detection',
      results: '300% faster processing • 99.9% uptime • $50M+ annual transactions',
      color: '#6a00ff',
      gradient: 'linear-gradient(135deg, #6a00ff 0%, #a855f7 100%)'
    },
    {
      id: 2,
      industry: 'Healthcare',
      client: 'MediCare Hub',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      challenge: 'HIPAA compliance issues with patient data management',
      solution: 'Secure cloud migration with encrypted data storage',
      results: '90% faster data access • 100% compliance • 50K+ patient records',
      color: '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #06d6a0 100%)'
    },
    {
      id: 3,
      industry: 'E-commerce',
      client: 'StyleHub Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      challenge: 'Poor mobile conversion rates (15% below industry average)',
      solution: 'Progressive Web App with AR try-on features',
      results: '300% mobile revenue increase • 40% higher conversion • 5-star rating',
      color: '#ff6b9d',
      gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)'
    },
    {
      id: 4,
      industry: 'Manufacturing',
      client: 'AutoParts Pro',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      challenge: 'Inefficient inventory management causing 25% stockouts',
      solution: 'IoT-powered smart inventory system with predictive analytics',
      results: '99% inventory accuracy • 60% reduction in stockouts • $2M savings',
      color: '#3ddc84',
      gradient: 'linear-gradient(135deg, #3ddc84 0%, #06d6a0 100%)'
    }
  ];

  // Intersection Observer for title
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for services
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for case studies
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCaseStudiesInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (caseStudiesRef.current) {
      observer.observe(caseStudiesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsInView) {
          setStatsInView(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsInView]);

  const animateCounters = () => {
    const targets = { projects: 500, clients: 50, members: 30, awards: 85 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        members: Math.floor(targets.members * progress),
        awards: Math.floor(targets.awards * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  const handleCaseClick = (id: number) => {
    setClickedCase(id);
    setTimeout(() => {
      // Navigate to CaseStudyDetails page
      alert(`Navigating to CaseStudyDetails for case #${id}`);
      // In real app: window.location.href = `/CaseStudyDetails?id=${id}`;
    }, 600);
  };

  const handleViewAllClick = () => {
    alert('Navigating to all Case Studies');
    // In real app: window.location.href = '/CaseStudyDetails';
  };

  return (
    <div className="services-root">
      {/* Services Grid Section */}
      <section className="services-hero">
        <div className="services-container">
          <p className="services-label">LET'S EXPLORE MORE ABOUT US</p>
          
          <h2 ref={titleRef} className={`services-title ${titleInView ? 'revealed' : ''}`}>
            <span className="title-bg">WHAT WE'RE OFFERING TO</span>
            <span className="title-fg">WHAT WE'RE OFFERING TO</span>
          </h2>
          <h2 ref={titleRef} className={`services-title ${titleInView ? 'revealed' : ''}`}>
            <span className="title-bg">OUR CUSTOMERS</span>
            <span className="title-fg">OUR CUSTOMERS</span>
          </h2>

          <p className="services-desc">
            In today's era, we set you up a website for your business to acquire more 
            opportunities. We are here to provide the best services that fit your business.
          </p>

          <div ref={servicesRef} className="services-grid">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={i} 
                  className={`service-card ${service.featured ? 'featured' : ''} ${servicesInView ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="service-icon">
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <div className="service-glow"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <p className="marquee-label">Doing Things Together And You Overcome The Obstacle</p>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...companies, ...companies].map((company, i) => (
              <span key={i} className="marquee-item">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section - REDESIGNED */}
      <section ref={caseStudiesRef} className="case-studies-section">
        <div className="case-studies-container">
          {/* Section Header with Animations */}
          <div className={`case-studies-header ${caseStudiesInView ? 'header-animate' : ''}`}>
            <p className="section-subtitle">
              <Sparkles size={16} className="sparkle-icon" />
              SUCCESS STORIES
              <Sparkles size={16} className="sparkle-icon" />
            </p>
            <h2 className="section-title">
              <span className="title-word">Real</span>{' '}
              <span className="title-word">Results,</span>{' '}
              <span className="title-word gradient-text">Real</span>{' '}
              <span className="title-word gradient-text">Impact</span>
            </h2>
            <p className="section-description">
              See how we've helped businesses across industries overcome challenges 
              and achieve remarkable results with our technology solutions.
            </p>
          </div>

          {/* Case Studies Grid - Image-based */}
          <div className="case-studies-grid-new">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={caseStudy.id}
                className={`case-card ${caseStudiesInView ? 'card-animate' : ''} ${clickedCase === caseStudy.id ? 'clicked' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  '--card-gradient': caseStudy.gradient
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredCard(caseStudy.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCaseClick(caseStudy.id)}
              >
                {/* Background Image */}
                <div className="case-image-wrapper">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.client}
                    className="case-image"
                  />
                  <div className="case-overlay"></div>
                </div>

                {/* Industry Badge */}
                <div className="case-badge">
                  <span className="badge-dot"></span>
                  {caseStudy.industry}
                </div>

                {/* Client Name - Shows on Hover */}
                <div className={`case-client-name ${hoveredCard === caseStudy.id ? 'visible' : ''}`}>
                  <h3>{caseStudy.client}</h3>
                  <div className="client-underline"></div>
                </div>

                {/* Details - Shows on Click/Hover */}
                <div className={`case-details ${hoveredCard === caseStudy.id ? 'visible' : ''}`}>
                  <div className="detail-item">
                    <span className="detail-label">Challenge</span>
                    <p className="detail-text">{caseStudy.challenge}</p>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Solution</span>
                    <p className="detail-text">{caseStudy.solution}</p>
                  </div>

                  <div className="case-results-compact">
                    {caseStudy.results.split(' • ').map((result, i) => (
                      <div key={i} className="result-badge">
                        <span className="result-check">✓</span>
                        {result}
                      </div>
                    ))}
                  </div>

                  <button 
                    className="case-cta"
                    style={{ background: caseStudy.gradient }}
                  >
                    View Full Case Study
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Hover Indicator */}
                <div className={`hover-indicator ${hoveredCard === caseStudy.id ? 'hidden' : ''}`}>
                  <span>Click to explore</span>
                  <div className="pulse-ring"></div>
                </div>

                {/* Animated Border */}
                <div className="case-border"></div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className={`view-all-container ${caseStudiesInView ? 'button-animate' : ''}`}>
            <button className="view-all-btn-new" onClick={handleViewAllClick}>
              <span className="btn-text">Explore All Case Studies</span>
              <span className="btn-icon">
                <ChevronRight size={24} />
              </span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase size={48} strokeWidth={1.5} />
            </div>
            <div className="stat-number">{counts.projects}K+</div>
            <div className="stat-label">Project Complete</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Smile size={48} strokeWidth={1.5} />
            </div>
            <div className="stat-number">{counts.clients}K+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={48} strokeWidth={1.5} />
            </div>
            <div className="stat-number">{counts.members}K+</div>
            <div className="stat-label">Qualified Team</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Trophy size={48} strokeWidth={1.5} />
            </div>
            <div className="stat-number">{counts.awards}+</div>
            <div className="stat-label">Awards Winning</div>
          </div>
        </div>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .services-root {
          background: #000;
          color: #fff;
          overflow: hidden;
        }

        /* Services Section */
        .services-hero {
          padding: 100px 20px;
          background: linear-gradient(180deg, #000 0%, #0a0a0f 100%);
          position: relative;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin-bottom: 20px;
          font-weight: 600;
          animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .services-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          margin: 0 0 10px;
          position: relative;
          line-height: 1.1;
        }

        .title-bg, .title-fg {
          display: block;
        }

        .title-bg {
          color: rgba(255, 255, 255, 0.08);
          position: absolute;
          top: 0;
          left: 0;
          animation: slideInLeft 1s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .title-fg {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .services-title.revealed .title-fg {
          clip-path: inset(0 0 0 0);
        }

        .services-desc {
          max-width: 600px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin: 30px 0 60px;
          font-size: 1.05rem;
          animation: fadeInUp 1s ease-out 0.3s both;
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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 40px 24px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px) scale(0.9);
        }

        .service-card.animate-in {
          animation: cardZoomIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cardZoomIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .service-card.featured {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          transform: scale(1.05);
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: #6a00ff;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.4);
        }

        .service-card.featured:hover {
          transform: scale(1.1) translateY(-10px);
          box-shadow: 0 25px 70px rgba(106, 0, 255, 0.5);
        }

        .service-glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(106, 0, 255, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover .service-glow {
          opacity: 1;
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }

        .service-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .service-icon svg {
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.3));
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-icon svg {
          transform: scale(1.2) rotate(5deg);
        }

        .service-card.featured .service-icon svg {
          filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.4));
        }

        .service-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .service-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          margin: 0;
        }

        .service-card.featured .service-subtitle {
          color: rgba(255, 255, 255, 0.95);
        }

        /* Marquee */
        .marquee-section {
          padding: 60px 0;
          background: #000;
          border-top: 1px solid rgba(106, 0, 255, 0.2);
          border-bottom: 1px solid rgba(106, 0, 255, 0.2);
        }

        .marquee-label {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          margin-bottom: 30px;
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .marquee-wrapper {
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          gap: 80px;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          font-size: 2rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.15);
          white-space: nowrap;
          letter-spacing: 4px;
          transition: color 0.3s ease;
        }

        .marquee-item:hover {
          color: rgba(106, 0, 255, 0.4);
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* REDESIGNED CASE STUDIES SECTION */
        .case-studies-section {
          padding: 120px 20px;
          background: radial-gradient(ellipse at top, #0a0a0f 0%, #000 50%, #000 100%);
          position: relative;
        }

        .case-studies-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(106, 0, 255, 0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulseBackground 4s ease-in-out infinite;
        }

        @keyframes glowPulseBackground {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(1.1); }
        }

        .case-studies-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .case-studies-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-studies-header.header-animate {
          opacity: 1;
          transform: translateY(0);
        }

        .section-subtitle {
          color: #00d4ff;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 24px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          animation: subtitleGlow 2s ease-in-out infinite;
        }

        .sparkle-icon {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .sparkle-icon:first-child {
          animation-delay: 0s;
        }

        .sparkle-icon:last-child {
          animation-delay: 0.75s;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }

        @keyframes subtitleGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(0, 212, 255, 0.3); }
          50% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 30px rgba(0, 212, 255, 0.4); }
        }

        .section-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 28px;
          perspective: 1000px;
        }

        .title-word {
          display: inline-block;
          animation: titleWordFloat 3s ease-in-out infinite;
          transform-origin: center;
        }

        .title-word:nth-child(1) { animation-delay: 0s; }
        .title-word:nth-child(2) { animation-delay: 0.2s; }
        .title-word:nth-child(3) { animation-delay: 0.4s; }
        .title-word:nth-child(4) { animation-delay: 0.6s; }

        @keyframes titleWordFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(5deg); }
        }

        .gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
          background-size: 200% 100%;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .section-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.15rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          animation: fadeInUp 1.2s ease-out 0.3s both;
        }

        /* NEW Case Studies Grid */
        .case-studies-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 35px;
          margin-bottom: 80px;
        }

        .case-card {
          position: relative;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8) translateY(50px);
        }

        .case-card.card-animate {
          animation: cardReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cardReveal {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .case-card:hover {
          transform: scale(1.03) translateY(-10px);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-card.clicked {
          animation: cardClick 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cardClick {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1.05); opacity: 0; }
        }

        /* Image Background */
        .case-image-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .case-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-card:hover .case-image {
          transform: scale(1.1);
        }

        .case-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.95) 100%
          );
          transition: background 0.4s ease;
        }

        .case-card:hover .case-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.85) 50%,
            rgba(0, 0, 0, 0.98) 100%
          );
        }

        /* Industry Badge */
        .case-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 3;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: badgeSlideIn 0.6s ease-out 0.2s both;
        }

        @keyframes badgeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--card-gradient);
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* Client Name - Shows on Hover */
        .case-client-name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          text-align: center;
          width: 90%;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }

        .case-client-name.visible {
          opacity: 1;
          transform: translate(-50%, -50%) translateY(-20px);
        }

        .case-client-name h3 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          margin: 0 0 16px;
          background: var(--card-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          animation: clientNameZoom 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes clientNameZoom {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .client-underline {
          height: 3px;
          background: var(--card-gradient);
          max-width: 200px;
          margin: 0 auto;
          border-radius: 2px;
          animation: underlineExpand 0.6s ease-out;
        }

        @keyframes underlineExpand {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        /* Details Section */
        .case-details {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 30px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .case-details.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .detail-item {
          margin-bottom: 20px;
          animation: detailSlideIn 0.5s ease-out;
        }

        @keyframes detailSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .detail-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #00d4ff;
          margin-bottom: 8px;
        }

        .detail-text {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .case-results-compact {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
        }

        .result-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          padding: 8px 14px;
          border-radius: 30px;
          font-size: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: resultBadgeSlide 0.4s ease-out;
        }

        @keyframes resultBadgeSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .result-check {
          color: #06d6a0;
          font-weight: 900;
        }

        /* CTA Button */
        .case-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: ctaSlideUp 0.6s ease-out;
        }

        @keyframes ctaSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .case-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.5);
        }

        /* Hover Indicator */
        .hover-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          text-align: center;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .hover-indicator.hidden {
          opacity: 0;
        }

        .hover-indicator span {
          display: block;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
          animation: indicatorPulse 2s ease-in-out infinite;
        }

        @keyframes indicatorPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .pulse-ring {
          width: 40px;
          height: 40px;
          border: 2px solid var(--card-gradient, #6a00ff);
          border-radius: 50%;
          margin: 0 auto;
          position: relative;
          animation: ringPulse 2s ease-out infinite;
        }

        .pulse-ring::before {
          content: '↓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.2rem;
          animation: arrowBounce 2s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(5px); }
        }

        /* Animated Border */
        .case-border {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, transparent, var(--card-gradient), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 4;
        }

        .case-card:hover .case-border {
          opacity: 1;
          animation: borderRotate 3s linear infinite;
        }

        @keyframes borderRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* View All Button */
        .view-all-container {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
        }

        .view-all-container.button-animate {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .view-all-btn-new {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          border-radius: 60px;
          padding: 20px 50px;
          color: white;
          font-size: 1.15rem;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.3);
        }

        .view-all-btn-new::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .view-all-btn-new:hover::before {
          width: 300px;
          height: 300px;
        }

        .view-all-btn-new:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.5);
        }

        .btn-text,
        .btn-icon {
          position: relative;
          z-index: 1;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .view-all-btn-new:hover .btn-icon {
          transform: translateX(5px);
        }

        .btn-glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .view-all-btn-new:hover .btn-glow {
          opacity: 1;
          animation: glowRotate 3s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
          opacity: 0.3;
        }

        @keyframes gridMove {
          from { transform: translate(0, 0); }
          to { transform: translate(50px, 50px); }
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          text-align: center;
          animation: statFadeIn 0.8s ease-out;
        }

        @keyframes statFadeIn {
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
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-icon svg {
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
          animation: statIconFloat 3s ease-in-out infinite;
        }

        @keyframes statIconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        .stat-number {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 10px;
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          animation: numberCount 1s ease-out;
        }

        @keyframes numberCount {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.95;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .case-studies-grid-new {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .case-card {
            height: 450px;
          }

          .case-client-name h3 {
            font-size: 1.8rem;
          }

          .case-details {
            padding: 20px;
          }

          .view-all-btn-new {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .case-card {
            height: 420px;
          }

          .case-badge {
            top: 16px;
            left: 16px;
            font-size: 0.7rem;
            padding: 6px 12px;
          }

          .case-details {
            padding: 16px;
          }

          .case-client-name h3 {
            font-size: 1.5rem;
          }

          .detail-text {
            font-size: 0.85rem;
          }

          .result-badge {
            font-size: 0.75rem;
            padding: 6px 12px;
          }
        }
      `}</style>
      </div>
  );
};

export default ServicesSection