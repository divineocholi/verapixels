import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Brain, Zap, Shield, Cpu, ArrowRight, Code, MessageSquare, Database } from 'lucide-react';
import veravideo from "../../public/vera -video.mp4";

const VeraAISection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-hide controls after 2 seconds
  useEffect(() => {
    if (showControls) {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showControls]);

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(true); // Trigger the timeout again
  };

  const toggleVideo = () => {
    if (videoRef.current && posterVideoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        posterVideoRef.current.style.opacity = '1';
      } else {
        videoRef.current.play().catch(err => {
          console.log('Play was prevented:', err);
        });
        setIsPlaying(true);
        posterVideoRef.current.style.opacity = '0';
      }
    }
  };

  const features = [
    {
      icon: MessageSquare,
      title: 'Talk Like Friends',
      description: 'Chat naturally in English, Pidgin, Yoruba, Igbo, Hausa and more—VERA gets you',
      color: '#6a00ff',
      animation: 'fade-left'
    },
    {
      icon: Code,
      title: 'Code Wizard',
      description: 'Write, debug and explain code in any programming language instantly',
      color: '#00d4ff',
      animation: 'fade-right'
    },
    {
      icon: Brain,
      title: 'Naija Smart',
      description: 'Understands Nigerian systems, culture, and local context perfectly',
      color: '#6a00ff',
      animation: 'fade-up'
    },
    {
      icon: Zap,
      title: 'Multi-Language Pro',
      description: 'Speaks 100+ foreign languages fluently while keeping it real',
      color: '#00d4ff',
      animation: 'fade-down'
    },
    {
      icon: Shield,
      title: 'Your Privacy Matters',
      description: 'Your conversations stay private with top-level security',
      color: '#6a00ff',
      animation: 'zoom-in'
    },
    {
      icon: Database,
      title: 'Always Learning',
      description: 'Gets smarter with every chat, adapting to how you communicate',
      color: '#00d4ff',
      animation: 'zoom-in'
    }
  ];

  return (
    <div className="vera-ai-root" ref={sectionRef}>
      {/* Animated Background */}
      <div className="vera-bg-grid"></div>
      <div className="vera-bg-gradient"></div>

      <div className="vera-ai-container">
        {/* Header */}
        <div className={`vera-ai-header ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-status-badge">
            <div className="vera-pulse-dot"></div>
            <span>IN DEVELOPMENT</span>
          </div>
          
          <h1 className="vera-ai-title">
            Meet <span className="vera-gradient-text">VERA</span>
            <Sparkles className="vera-sparkle-icon" size={40} />
          </h1>
          
          <p className="vera-ai-subtitle">
            Your Next-Generation AI Assistant
          </p>
          
          <p className="vera-ai-description">
            VERA (Virtual Enhanced Reasoning Assistant) is your revolutionary AI companion 
            that feels like talking to a real friend. Whether you need help with coding, 
            conversations in Nigerian Pidgin, understanding local systems, or speaking 
            multiple foreign languages, VERA is here for you—smart, relatable, and truly Nigerian.
          </p>
        </div>

        {/* Video and Features Grid */}
        <div className="vera-content-grid">
          {/* Video Section */}
          <div className={`vera-video-section ${isInView ? 'vera-animate-in' : ''}`}>
            <div className="vera-video-container">
              <div 
                className="vera-video-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleVideo}
              >
                {/* Poster Video (loops in background) */}
                <video
                  ref={posterVideoRef}
                  className="vera-poster-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://res.cloudinary.com/dpqntm1tb/video/upload/v1770682624/Blue_Neon_Futuristic_Technology_Video_jnmjob.mp4" type="video/mp4" />
                </video>

                {/* Main Video (plays when user clicks) */}
                <video
                  ref={videoRef}
                  className="vera-ai-video"
                  style={{ opacity: isPlaying ? 1 : 0 }}
                >
                  <source src={veravideo} type="video/mp4" />
                </video>

                <button 
                  className={`vera-play-button ${showControls ? 'vera-show' : 'vera-hide'}`}
                  onClick={toggleVideo}
                >
                  {isPlaying ? <Pause size={36} /> : <Play size={36} />}
                </button>

              </div>

              <div className="vera-video-info">
                <div className="vera-info-badge">
                  <Play size={16} />
                  <span>1:06 Demo Video</span>
                </div>
                <h3>See VERA in Action</h3>
                <p>Watch how VERA revolutionizes everyday conversations</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className={`vera-features-section ${isInView ? 'vera-animate-in' : ''}`}>
            <div className="vera-features-grid">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index} 
                    className={`vera-feature-card vera-${feature.animation}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="vera-feature-icon" style={{ 
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` 
                    }}>
                      <IconComponent size={24} strokeWidth={2} />
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`vera-cta-section ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-cta-content vera-slide-right">
            <h2>Ready to Meet Your New AI Friend?</h2>
            <p>Experience conversations that feel real, in the language you love</p>
          </div>
          <button className="vera-cta-button vera-slide-left">
            <span>Start Chatting with VERA</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className={`vera-stats-bar ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-stat-item">
            <div className="vera-stat-number">99.9%</div>
            <div className="vera-stat-label">Accuracy</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">&lt;10ms</div>
            <div className="vera-stat-label">Response Time</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">24/7</div>
            <div className="vera-stat-label">Available</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">100+</div>
            <div className="vera-stat-label">Languages</div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .vera-ai-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Animated Background */
        .vera-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: veraGridMove 20s linear infinite;
        }

        @keyframes veraGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .vera-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 20% 50%, 
            rgba(106, 0, 255, 0.15) 0%, 
            transparent 50%
          ),
          radial-gradient(
            circle at 80% 50%, 
            rgba(0, 212, 255, 0.15) 0%, 
            transparent 50%
          );
        }

        .vera-ai-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .vera-ai-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-ai-header.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .vera-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .vera-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          animation: veraPulse 2s ease-in-out infinite;
        }

        @keyframes veraPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .vera-ai-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          margin: 0 0 20px;
          position: relative;
          display: inline-block;
        }

        .vera-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .vera-sparkle-icon {
          position: absolute;
          top: -10px;
          right: -50px;
          color: #00d4ff;
          animation: veraSparkle 3s ease-in-out infinite;
        }

        @keyframes veraSparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        .vera-ai-subtitle {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 30px;
        }

        .vera-ai-description {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Content Grid */
        .vera-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        .vera-video-section,
        .vera-features-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-video-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .vera-features-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        /* Video Section */
        .vera-video-container {
          position: relative;
        }

        .vera-video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          aspect-ratio: 16/9;
          cursor: pointer;
        }

        .vera-poster-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: opacity 0.5s ease;
        }

        .vera-ai-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .vera-play-button {
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
          transition: all 0.3s ease, opacity 0.5s ease, visibility 0.5s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
          z-index: 3;
          opacity: 0;
          visibility: hidden;
        }

        .vera-play-button.vera-show {
          opacity: 1;
          visibility: visible;
        }

        .vera-play-button.vera-hide {
          opacity: 0;
          visibility: hidden;
        }

        .vera-play-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 15px 60px rgba(106, 0, 255, 0.6);
        }

        .vera-ai-indicator {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(106, 0, 255, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          animation: veraFloat 3s ease-in-out infinite;
          z-index: 3;
        }

        .vera-indicator-1 {
          top: 20px;
          left: 20px;
          color: #00d4ff;
        }

        .vera-indicator-2 {
          bottom: 20px;
          right: 20px;
          color: #6a00ff;
          animation-delay: 1.5s;
        }

        @keyframes veraFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .vera-video-info {
          margin-top: 30px;
        }

        .vera-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #00d4ff;
          margin-bottom: 15px;
        }

        .vera-video-info h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 10px;
        }

        .vera-video-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Features Grid */
        .vera-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .vera-feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          opacity: 0;
        }

        /* Scroll Animation Classes */
        .vera-fade-left {
          animation: veraFadeLeft 0.8s ease forwards;
        }

        .vera-fade-right {
          animation: veraFadeRight 0.8s ease forwards;
        }

        .vera-fade-up {
          animation: veraFadeUp 0.8s ease forwards;
        }

        .vera-fade-down {
          animation: veraFadeDown 0.8s ease forwards;
        }

        .vera-zoom-in {
          animation: veraZoomIn 0.8s ease forwards;
        }

        @keyframes veraFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraFadeRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraFadeUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes veraFadeDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes veraZoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .vera-feature-card:hover {
          transform: translateY(-15px) scale(1.03);
          border-color: #6a00ff;
          box-shadow: 0 25px 70px rgba(106, 0, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        .vera-feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.3);
        }

        .vera-feature-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .vera-feature-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* CTA Section */
        .vera-cta-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 24px;
          padding: 60px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
          position: relative;
          overflow: hidden;
        }

        .vera-cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: veraCtaShine 6s ease-in-out infinite;
        }

        @keyframes veraCtaShine {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-30%, -30%) rotate(180deg); }
        }

        .vera-cta-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .vera-slide-right {
          animation: veraSlideRight 0.8s ease forwards;
          animation-delay: 0.7s;
          opacity: 0;
        }

        .vera-slide-left {
          animation: veraSlideLeft 0.8s ease forwards;
          animation-delay: 0.9s;
          opacity: 0;
        }

        @keyframes veraSlideRight {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraSlideLeft {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .vera-cta-content {
          position: relative;
          z-index: 1;
        }

        .vera-cta-content h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          margin: 0 0 10px;
        }

        .vera-cta-content p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.95;
        }

        .vera-cta-button {
          background: #fff;
          color: #6a00ff;
          border: none;
          padding: 20px 40px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .vera-cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(106, 0, 255, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .vera-cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .vera-cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .vera-cta-button span {
          position: relative;
          z-index: 1;
        }

        .vera-cta-button svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .vera-cta-button:hover svg {
          transform: translateX(5px);
        }

        /* Stats Bar */
        .vera-stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-stats-bar.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.8s;
        }

        .vera-stat-item {
          text-align: center;
        }

        .vera-stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 10px;
        }

        .vera-stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .vera-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .vera-features-grid {
            grid-template-columns: 1fr;
          }

          .vera-cta-section {
            flex-direction: column;
            text-align: center;
            padding: 40px;
          }

          .vera-stats-bar {
            flex-wrap: wrap;
            gap: 30px;
          }

          .vera-stat-divider {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .vera-ai-root {
            padding: 60px 20px;
          }

          .vera-sparkle-icon {
            right: -30px;
            top: -5px;
          }

          .vera-features-grid {
            grid-template-columns: 1fr;
          }
          
          .vera-ai-indicator {
            font-size: 0.75rem;
            padding: 8px 12px;
          }
          
          .vera-ai-indicator svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default VeraAISection;