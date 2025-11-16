import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, Zap, Cpu, Shield, Bot, Settings, Lightbulb, Rocket, Briefcase, Smile, Users, Trophy } from 'lucide-react';

import { FiPlay, FiPause, FiMaximize, FiVolume2 } from 'react-icons/fi';

const ServicesSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
  const [titleInView, setTitleInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null); // ✅ FIXED
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
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

          <div className="services-grid">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div key={i} className={`service-card ${service.featured ? 'featured' : ''}`}>
                  <div className="service-icon">
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
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

      {/* Video Section */}
      <section className="video-section">
        <div className="services-container">
          <div className="video-grid">
            <div className="video-wrapper">
              <div className="video-badge">
                <div className="badge-number">13</div>
                <div className="badge-text">Years<br/>Experience</div>
              </div>
              
              <video
                ref={videoRef}
                className="custom-video"
                poster="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
                onClick={toggleVideo}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>

              <button className="video-play-btn" onClick={toggleVideo}>
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>

              <div className="video-controls">
                <button className="control-btn" onClick={toggleMute}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button className="control-btn" onClick={toggleFullscreen}>
                  <Maximize size={20} />
                </button>
              </div>
            </div>

            <div className="video-content">
              <p className="video-label">GROW YOUR COMPANY WITH</p>
              <h3 className="video-title">
                WHAT WE'RE OFFERING TO OUR CUSTOMERS
              </h3>
              <p className="video-text">
                Our agency is a business you hire to outsource your digital marketing 
                efforts, instead of handling in-house. They can provide your business 
                with a variety of digital solutions.
              </p>

              <div className="video-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Lightbulb size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>Strategic Vision</h4>
                    <p>Transform your business</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Rocket size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>End-to-End Team Support</h4>
                    <p>Dedicated team assistance</p>
                  </div>
                </div>
              </div>

              <div className="video-info">
                <div className="info-avatars">
                  <img src="https://i.pravatar.cc/40?img=1" alt="avatar" />
                  <img src="https://i.pravatar.cc/40?img=2" alt="avatar" />
                  <img src="https://i.pravatar.cc/40?img=3" alt="avatar" />
                </div>
                <div className="info-text">
                  <strong>Meet Customer</strong>
                  <p>Our Clients Are Our Priority</p>
                </div>
                <div className="info-contact">
                  <span>📞 CONTACT</span>
                  <strong>+234 000 0000</strong>
                </div>
              </div>

              <div className="video-actions">
                <button className="action-btn primary">DISCOVER</button>
                <button className="action-btn secondary">OUR STORY</button>
                <button className="action-btn secondary">LEARN MORE</button>
              </div>
            </div>
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
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .service-card.featured {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          transform: scale(1.05);
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: #6a00ff;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.3);
        }

        .service-card.featured:hover {
          transform: scale(1.08) translateY(-10px);
        }

        .service-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .service-icon svg {
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.3));
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
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Video Section */
        .video-section {
          padding: 100px 20px;
          background: #000;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 60px;
          align-items: center;
        }

        .video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.3);
        }

        .video-badge {
          position: absolute;
          top: 30px;
          left: 30px;
          z-index: 10;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.5);
        }

        .badge-number {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
        }

        .badge-text {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.2;
          margin-top: 5px;
        }

        .custom-video {
          width: 100%;
          height: 500px;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }

        .video-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #6a00ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
        }

        .video-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 15px 60px rgba(106, 0, 255, 0.6);
        }

        .video-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff!important;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: rgba(106, 0, 255, 0.8);
          border-color: #6a00ff;
        }

        .video-content {
          padding: 20px;
        }

        .video-label {
          color: #6a00ff;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .video-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .video-text {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .video-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .feature-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .feature-icon {
          flex-shrink: 0;
          color: #00d4ff;
        }

        .feature-item h4 {
          margin: 0 0 5px;
          font-size: 1.1rem;
        }

        .feature-item p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .video-info {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 30px;
        }

        .info-avatars {
          display: flex;
        }

        .info-avatars img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #000;
          margin-left: -10px;
        }

        .info-avatars img:first-child {
          margin-left: 0;
        }

        .info-text strong {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .info-text p {
          margin: 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .info-contact {
          margin-left: auto;
          text-align: right;
        }

        .info-contact span {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 5px;
        }

        .info-contact strong {
          font-size: 1rem;
          color: #00d4ff;
        }

        .video-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          color: #fff;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.4);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #6a00ff;
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          padding: 80px 20px;
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }

        .stat-card {
          text-align: center;
        }

        .stat-icon {
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-icon svg {
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        }

        .stat-number {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 10px;
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.95;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .custom-video {
            height: 300px;
          }

          .video-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .info-contact {
            margin-left: 0;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;