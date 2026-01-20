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
  Sparkles,
  Eye,
  BarChart3,
  Target,
  TrendingUp
} from 'lucide-react';

const ServicesSection = () => {
  const [titleInView, setTitleInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [servicesInView, setServicesInView] = useState(false);
  const [caseStudiesInView, setCaseStudiesInView] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement | null>(null);

  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    members: 0,
    awards: 0
  });

  const services = [
    { 
      icon: Sparkles, 
      title: 'Brand Identity', 
      subtitle: 'Business Naming & Logo Design',
      gradient: 'linear-gradient(135deg, #6a00ff 0%, #a855f7 100%)'
    },
    { 
      icon: Cpu, 
      title: 'Web Development', 
      subtitle: 'Custom Websites & Applications', 
      featured: true,
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #06d6a0 100%)'
    },
    { 
      icon: Target, 
      title: 'UI/UX Design', 
      subtitle: 'Beautiful User Experiences',
      gradient: 'linear-gradient(135deg, #3ddc84 0%, #06d6a0 100%)'
    },
    { 
      icon: Zap, 
      title: 'Mobile Apps', 
      subtitle: 'iOS & Android Development',
      gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)'
    },
    { 
      icon: Settings, 
      title: 'Maintenance', 
      subtitle: 'Ongoing Support & Updates',
      gradient: 'linear-gradient(135deg, #ffb74d 0%, #ff8a65 100%)'
    }
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
    const targets = { projects: 15, clients: 12, members: 10, awards: 0 };
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

  const handleCaseHover = (id: number | null) => {
    setActiveCaseStudy(id);
    setHoveredCard(id);
  };

  return (
    <div className="services-root">
      {/* Services Grid Section */}
      <section className="services-hero">
        <div className="services-container">
          <p className="services-label">EXCELLENCE IN EVERY SERVICE</p>
          
          <h2 ref={titleRef} className={`services-title ${titleInView ? 'revealed' : ''}`}>
            <span className="title-gradient">Premium Solutions</span>
            <span className="title-sub">For Modern Businesses</span>
          </h2>

          <p className="services-desc">
            We craft digital experiences that transform businesses. From strategy to execution, 
            we deliver results that matter in today's competitive landscape.
          </p>

          <div ref={servicesRef} className="services-grid-new">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={i} 
                  className={`service-card-new ${service.featured ? 'featured' : ''} ${servicesInView ? 'animate-in' : ''}`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    '--card-glow': service.gradient
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-inner">
                    <div className="card-icon-wrapper">
                      <div className="icon-backdrop" style={{ background: service.gradient }}></div>
                      <IconComponent size={32} strokeWidth={1.5} className="card-icon" />
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">{service.title}</h3>
                      <p className="card-subtitle">{service.subtitle}</p>
                    </div>

                    <div className="card-hover-content">
                      <div className="hover-line"></div>
                      <p className="hover-text">Explore Service →</p>
                    </div>
                  </div>

                  <div className="card-glow-effect"></div>
                  <div className="card-border"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section ref={statsRef} className="stats-section-new">
        <div className="stats-container">
          <div className="stats-header">
            <h3 className="stats-title">Trusted by Industry Leaders</h3>
            <p className="stats-subtitle">Numbers that speak for themselves</p>
          </div>
          
          <div className="stats-grid-new">
            {[
              { icon: Briefcase, value: counts.projects, label: 'Projects Completed', suffix: '+' },
              { icon: Smile, value: counts.clients, label: 'Happy Clients', suffix: '+' },
              { icon: Users, value: counts.members, label: 'Team Members', suffix: '+' },
              { icon: Trophy, value: counts.awards, label: 'Industry Awards', suffix: '', comment: 'Coming Soon' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`stat-card-new ${statsInView ? 'stat-visible' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="stat-icon-wrapper">
                  <stat.icon size={32} strokeWidth={1.5} />
                  <div className="stat-icon-glow"></div>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {stat.comment ? (
                      <span className="coming-soon">{stat.comment}</span>
                    ) : (
                      <>
                        {stat.value}
                        <span className="stat-suffix">{stat.suffix}</span>
                      </>
                    )}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-progress">
                  <div className="progress-bar"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section - Completely Redesigned */}
      <section ref={caseStudiesRef} className="case-studies-section-new">
        <div className="case-studies-container-new">
          <div className="section-header">
            <div className="header-badge">
              <Sparkles size={16} />
              <span>Case Studies</span>
              <Sparkles size={16} />
            </div>
            <h2 className="section-title-new">
              <span className="title-line">Real Impact,</span>
              <span className="title-line gradient">Measurable Results</span>
            </h2>
            <p className="section-description-new">
              Discover how our strategic solutions drive success across industries
            </p>
          </div>

          <div className="case-studies-grid-redesign">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={caseStudy.id}
                className={`case-study-card ${caseStudiesInView ? 'card-visible' : ''} ${activeCaseStudy === caseStudy.id ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => handleCaseHover(caseStudy.id)}
                onMouseLeave={() => handleCaseHover(null)}
                onClick={() => setActiveCaseStudy(caseStudy.id)}
              >
                {/* Card Background Layers */}
                <div className="card-bg-layer"></div>
                <div 
                  className="card-color-layer"
                  style={{ background: caseStudy.gradient }}
                ></div>
                <div className="card-image-layer">
                  <img src={caseStudy.image} alt={caseStudy.client} />
                  <div className="image-overlay"></div>
                </div>

                {/* Card Content */}
                <div className="card-content-wrapper">
                  {/* Top Section - Always Visible */}
                  <div className="card-top">
                    <div className="industry-tag">
                      <div className="tag-dot" style={{ background: caseStudy.color }}></div>
                      <span>{caseStudy.industry}</span>
                    </div>
                    <div className="client-name">
                      <h3>{caseStudy.client}</h3>
                    </div>
                  </div>

                  {/* Middle Section - Animated on Hover */}
                  <div className="card-middle">
                    <div className="challenge-box">
                      <div className="box-header">
                        <Target size={16} />
                        <span>Challenge</span>
                      </div>
                      <p className="box-content">{caseStudy.challenge}</p>
                    </div>

                    <div className="solution-box">
                      <div className="box-header">
                        <BarChart3 size={16} />
                        <span>Solution</span>
                      </div>
                      <p className="box-content">{caseStudy.solution}</p>
                    </div>
                  </div>

                  {/* Bottom Section - Animated on Hover */}
                  <div className="card-bottom">
                    <div className="results-box">
                      <div className="box-header">
                        <TrendingUp size={16} />
                        <span>Results</span>
                      </div>
                      <div className="results-list">
                        {caseStudy.results.split(' • ').map((result, i) => (
                          <div key={i} className="result-item">
                            <div className="result-check">✓</div>
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="case-study-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Viewing ${caseStudy.client} case study`);
                      }}
                    >
                      <span>View Case Study</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="card-hover-overlay"></div>
                </div>

                {/* Card Border Animation */}
                <div className="card-border-animation"></div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="view-all-wrapper">
            <button className="view-all-cta">
              <span>Explore All Success Stories</span>
              <div className="cta-icon">
                <ChevronRight size={24} />
              </div>
              <div className="cta-glow"></div>
            </button>
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
          background: #0a0a0f;
          color: #fff;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Modern Services Section */
        .services-hero {
          padding: 120px 20px;
          background: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%);
          position: relative;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          letter-spacing: 3px;
          margin-bottom: 20px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .services-title {
          margin-bottom: 30px;
          position: relative;
        }

        .title-gradient {
          display: block;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
          opacity: 0;
          filter: blur(10px);
          transform: translateX(-50px);
        }

        .services-title.revealed .title-gradient {
          animation: gradientSlideReveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes gradientSlideReveal {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateX(0);
          }
        }

        .title-sub {
          display: block;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          opacity: 0;
          transform: translateY(30px);
          animation: titleReveal 0.8s ease-out 0.2s forwards;
        }

        @keyframes titleReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .services-desc {
          max-width: 600px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 80px;
          font-size: 1.1rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Redesigned Services Grid */
        .services-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          position: relative;
          z-index: 1;
        }

        .service-card-new {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 40px 30px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
        }

        .service-card-new.animate-in {
          animation: cardSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cardSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card-new:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }

        .service-card-new.featured {
          background: rgba(106, 0, 255, 0.05);
          border: 1px solid rgba(106, 0, 255, 0.2);
        }

        .service-card-new.featured:hover {
          background: rgba(106, 0, 255, 0.08);
          border-color: rgba(106, 0, 255, 0.4);
        }

        .card-inner {
          position: relative;
          z-index: 2;
        }

        .card-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-backdrop {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0.1;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .service-card-new:hover .icon-backdrop {
          opacity: 0.2;
          transform: scale(1.1);
        }

        .card-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .service-card-new:hover .card-icon {
          transform: scale(1.1);
        }

        .card-content {
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #fff;
        }

        .card-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .card-hover-content {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .service-card-new:hover .card-hover-content {
          opacity: 1;
          transform: translateY(0);
        }

        .hover-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          margin-bottom: 12px;
          border-radius: 1px;
        }

        .hover-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .card-glow-effect {
          position: absolute;
          inset: 0;
          background: var(--card-glow);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 20px;
          filter: blur(20px);
          z-index: 0;
        }

        .service-card-new:hover .card-glow-effect {
          opacity: 0.1;
        }

        .card-border {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card-new:hover .card-border {
          opacity: 1;
        }

        /* Redesigned Stats Section */
        .stats-section-new {
          padding: 100px 20px;
          background: linear-gradient(135deg, #0f0f1a 0%, #0a0a0f 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stats-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stats-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .stats-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card-new {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 40px 30px;
          display: flex;
          align-items: center;
          gap: 25px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-80px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card-new.stat-visible {
          animation: statFadeLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes statFadeLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .stat-card-new:hover {
          transform: translateX(0) translateY(-5px);
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .stat-icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 18px;
        }

        .stat-icon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          opacity: 0;
          border-radius: 18px;
          transition: opacity 0.3s ease;
        }

        .stat-card-new:hover .stat-icon-glow {
          opacity: 0.1;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 5px;
          display: flex;
          align-items: baseline;
        }

        .coming-soon {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          font-style: italic;
        }

        .stat-suffix {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.6);
          margin-left: 4px;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .stat-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0 0 20px 20px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          width: 0;
          animation: progressLoad 1.5s ease-out forwards;
        }

        @keyframes progressLoad {
          to { width: 100%; }
        }

        /* Completely Redesigned Case Studies */
        .case-studies-section-new {
          padding: 140px 20px;
          background: #0a0a0f;
          position: relative;
        }

        .case-studies-section-new::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, rgba(106, 0, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
          animation: subtlePulse 8s ease-in-out infinite;
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .case-studies-container-new {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(106, 0, 255, 0.1);
          color: #a855f7;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 30px;
          border: 1px solid rgba(106, 0, 255, 0.2);
        }

        .section-title-new {
          margin-bottom: 20px;
        }

        .title-line {
          display: block;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
        }

        .title-line.gradient {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .section-description-new {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Redesigned Case Studies Grid */
        .case-studies-grid-redesign {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 35px;
          margin-bottom: 80px;
        }

        .case-study-card {
          position: relative;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-study-card.card-visible {
          animation: cardReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cardReveal {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .case-study-card:hover,
        .case-study-card.active {
          transform: scale(1.02);
        }

        /* Card Background Layers */
        .card-bg-layer {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          z-index: 1;
        }

        .card-color-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .case-study-card:hover .card-color-layer,
        .case-study-card.active .card-color-layer {
          opacity: 0.1;
        }

        .card-image-layer {
          position: absolute;
          inset: 0;
          z-index: 3;
        }

        .card-image-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .case-study-card:hover .card-image-layer img,
        .case-study-card.active .card-image-layer img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10, 10, 15, 0.4) 0%,
            rgba(10, 10, 15, 0.8) 50%,
            rgba(10, 10, 15, 0.95) 100%
          );
        }

        /* Card Content */
        .card-content-wrapper {
          position: absolute;
          inset: 0;
          z-index: 4;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-top {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .case-study-card:hover .card-top,
        .case-study-card.active .card-top {
          opacity: 0;
          transform: translateY(-20px);
        }

        .industry-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          width: fit-content;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .client-name h3 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-top: 20px;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        /* Middle Section */
        .card-middle {
          position: absolute;
          top: 40px;
          left: 40px;
          right: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease 0.1s;
          pointer-events: none;
        }

        .case-study-card:hover .card-middle,
        .case-study-card.active .card-middle {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .challenge-box,
        .solution-box {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }

        .case-study-card:hover .challenge-box,
        .case-study-card.active .challenge-box {
          transform: translateX(-10px);
        }

        .case-study-card:hover .solution-box,
        .case-study-card.active .solution-box {
          transform: translateX(10px);
        }

        .box-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #00d4ff;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .box-content {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Bottom Section */
        .card-bottom {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease 0.2s;
          pointer-events: none;
        }

        .case-study-card:hover .card-bottom,
        .case-study-card.active .card-bottom {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .results-box {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
        }

        .result-check {
          color: #06d6a0;
          font-weight: 900;
          font-size: 1.2rem;
        }

        .case-study-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .case-study-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.3);
        }

        /* Hover Overlay */
        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.2) 30%,
            rgba(0, 0, 0, 0.6) 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .case-study-card:hover .card-hover-overlay,
        .case-study-card.active .card-hover-overlay {
          opacity: 1;
        }

        /* Border Animation */
        .card-border-animation {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 5;
        }

        .case-study-card:hover .card-border-animation,
        .case-study-card.active .card-border-animation {
          opacity: 1;
          animation: borderFlow 3s linear infinite;
        }

        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* View All Button */
        .view-all-wrapper {
          text-align: center;
        }

        .view-all-cta {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 60px;
          padding: 20px 50px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .view-all-cta:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(106, 0, 255, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.2);
        }

        .cta-icon {
          transition: transform 0.3s ease;
        }

        .view-all-cta:hover .cta-icon {
          transform: translateX(5px);
        }

        .cta-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(106, 0, 255, 0.2), transparent, rgba(0, 212, 255, 0.2));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .view-all-cta:hover .cta-glow {
          opacity: 1;
          animation: glowShift 2s ease-in-out infinite;
        }

        @keyframes glowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-grid-new {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stats-grid-new {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          /* Enhanced mobile animations */
          .stat-card-new.stat-visible {
            animation: statFadeLeftMobile 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          @keyframes statFadeLeftMobile {
            0% {
              opacity: 0;
              transform: translateX(-100px) scale(0.95);
            }
            60% {
              transform: translateX(5px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          .case-studies-grid-redesign {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .case-study-card {
            height: 450px;
          }

          .card-content-wrapper {
            padding: 25px;
          }

          .client-name h3 {
            font-size: 2rem;
          }

          .box-content {
            font-size: 0.9rem;
          }

          .result-item {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .services-hero,
          .stats-section-new,
          .case-studies-section-new {
            padding: 60px 20px;
          }

          /* Premium mobile stat card animations */
          .stat-card-new {
            flex-direction: column;
            text-align: center;
            gap: 15px;
            padding: 30px 20px;
          }

          .stat-card-new.stat-visible {
            animation: statFadeLeftPremium 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          @keyframes statFadeLeftPremium {
            0% {
              opacity: 0;
              transform: translateX(-120px) translateY(20px) rotate(-5deg);
              filter: blur(5px);
            }
            50% {
              transform: translateX(10px) translateY(-5px) rotate(2deg);
              filter: blur(2px);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0) rotate(0deg);
              filter: blur(0);
            }
          }

          .stat-number {
            font-size: 2rem;
          }

          .case-study-card {
            height: 400px;
          }

          .view-all-cta {
            width: 100%;
            justify-content: center;
            padding: 18px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;