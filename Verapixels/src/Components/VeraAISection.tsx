import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Brain, Zap, Shield, Cpu, ArrowRight, Code, MessageSquare, Database } from 'lucide-react';

const VeraAISection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => {
          console.log('Play was prevented:', err);
        });
        setIsPlaying(true);
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Neural Learning',
      description: 'Advanced machine learning algorithms that adapt to your needs',
      color: '#6a00ff'
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Human-like interactions powered by cutting-edge NLP',
      color: '#00d4ff'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with end-to-end encryption',
      color: '#6a00ff'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time responses with millisecond processing speed',
      color: '#00d4ff'
    },
    {
      icon: Code,
      title: 'Smart Automation',
      description: 'Automate complex workflows with intelligent decision-making',
      color: '#6a00ff'
    },
    {
      icon: Database,
      title: 'Data Intelligence',
      description: 'Extract insights from massive datasets effortlessly',
      color: '#00d4ff'
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
            VERA (Virtual Enhanced Reasoning Assistant) is our revolutionary AI system 
            currently in development. Designed to transform how businesses operate, 
            VERA combines cutting-edge artificial intelligence with intuitive design 
            to deliver unprecedented automation and insights.
          </p>
        </div>

        {/* Video and Features Grid */}
        <div className="vera-content-grid">
          {/* Video Section */}
          <div className={`vera-video-section ${isInView ? 'vera-animate-in' : ''}`}>
            <div className="vera-video-container">
              <div className="vera-video-wrapper">
                <video
                  ref={videoRef}
                  className="vera-ai-video"
                  poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
                  onClick={toggleVideo}
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>

                <button className="vera-play-button" onClick={toggleVideo}>
                  {isPlaying ? <Pause size={36} /> : <Play size={36} />}
                </button>

                {/* Floating AI Indicators */}
                <div className="vera-ai-indicator vera-indicator-1">
                  <Cpu size={20} />
                  <span>Processing...</span>
                </div>
                
                <div className="vera-ai-indicator vera-indicator-2">
                  <Brain size={20} />
                  <span>Learning</span>
                </div>
              </div>

              <div className="vera-video-info">
                <div className="vera-info-badge">
                  <Play size={16} />
                  <span>2:30 Demo Video</span>
                </div>
                <h3>See VERA in Action</h3>
                <p>Watch how VERA revolutionizes business automation</p>
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
                    className="vera-feature-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
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
          <div className="vera-cta-content">
            <h2>Ready to Experience the Future?</h2>
            <p>Discover everything VERA can do for your business</p>
          </div>
          <button className="vera-cta-button">
            <span>Explore VERA</span>
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
        .vera-ai-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
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
        }

        .vera-ai-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
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
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
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
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 0;
          animation: veraFadeInUp 0.6s ease forwards;
        }

        @keyframes veraFadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-feature-card {
          transform: translateY(20px);
        }

        .vera-feature-card:hover {
          transform: translateY(-10px);
          border-color: #6a00ff;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.3);
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
        }

        .vera-cta-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
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
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .vera-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
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
        }
      `}</style>
    </div>
  );
};

export default VeraAISection;