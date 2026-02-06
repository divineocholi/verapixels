import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Rocket, Target, Shield, Zap, TrendingUp, Award } from 'lucide-react';

const TechSolutionBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const animateId = entry.target.dataset.animateId;
            if (animateId) {
              setIsVisible((prev) => ({
                ...prev,
                [animateId]: true,
              }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features = [
    {
      icon: Rocket,
      title: "Launch Your Brand with Impact",
      subtitle: "From naming to logo design, we build your identity",
      color: "#6a00ff"
    },
    {
      icon: Target,
      title: "Precision-Crafted Digital Experiences",
      subtitle: "Custom websites & apps that convert visitors to customers",
      color: "#00d4ff"
    },
    {
      icon: Shield,
      title: "Reliable Support, Always",
      subtitle: "Ongoing maintenance keeps your business running smoothly",
      color: "#06d6a0"
    }
  ];

  const stats = [
    { icon: "🎯", number: "15+", label: "Projects Delivered" },
    { icon: "⚡", number: "12+", label: "Happy Clients" },
    { icon: "🏆", number: "100%", label: "Client Satisfaction" }
  ];

  const handleStartProject = () => {
    navigate('/consultationbooking');
  };

  return (
    <div className="banner-root">
      {/* Background Elements */}
      <div className="banner-bg-grid"></div>
      <div className="banner-bg-gradient"></div>
      
      <div className="banner-container">
        {/* Left Content */}
        <div className="banner-content">
          <div 
            className={`banner-badge ${isVisible['badge'] ? 'reveal-zoom' : ''}`}
            data-animate-id="badge"
          >
            <Sparkles size={16} />
            <span>TRANSFORMING BUSINESSES DIGITALLY</span>
            <Sparkles size={16} />
          </div>

          <h1 
            className={`banner-title ${isVisible['title'] ? 'reveal-slide-up' : ''}`}
            data-animate-id="title"
          >
            Why Choose Us for Your
            <span className="banner-gradient-text"> Digital Journey?</span>
          </h1>

          <p 
            className={`banner-description ${isVisible['desc'] ? 'reveal-fade' : ''}`}
            data-animate-id="desc"
          >
            We're not just developers—we're your partners in growth. From crafting your brand identity 
            to building powerful digital solutions, we handle it all with expertise and care.
          </p>

          {/* Feature Cards - No Arrows */}
          <div className="banner-features">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const animateId = `feature-${index}`;
              return (
                <div 
                  key={index}
                  className={`feature-card ${isVisible[animateId] ? 'reveal-slide-left' : ''}`}
                  data-animate-id={animateId}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    '--feature-color': feature.color
                  } as React.CSSProperties}
                >
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon-glow"></div>
                    <IconComponent size={24} strokeWidth={2.5} />
                  </div>
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.subtitle}</p>
                  </div>
                  {/* Arrow removed - Feature doesn't link anywhere */}
                </div>
              );
            })}
          </div>

          {/* CTA Button - Now Linked to Consultation Booking */}
          <div 
            className={`banner-cta-wrapper ${isVisible['cta'] ? 'reveal-zoom' : ''}`}
            data-animate-id="cta"
          >
            <button 
              className="banner-cta-button"
              onClick={handleStartProject}
            >
              <span>Start Your Project</span>
              <div className="cta-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <div className="cta-shimmer"></div>
            </button>
            <p className="banner-cta-subtext">Free consultation • No commitment required</p>
          </div>
        </div>

        {/* Right Visual Section */}
        <div className="banner-visual">
          <div 
            className={`visual-main ${isVisible['visual'] ? 'reveal-zoom' : ''}`}
            data-animate-id="visual"
          >
            {/* Main Image Container */}
            <div className="visual-image-container">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=900&fit=crop" 
                alt="Creative team collaboration"
                className="visual-image"
              />
              <div className="visual-overlay"></div>
              
              {/* Decorative Elements */}
              <div className="visual-decoration visual-decoration-1"></div>
              <div className="visual-decoration visual-decoration-2"></div>
            </div>

            {/* Floating Stats Cards */}
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`floating-stat stat-${index + 1} ${isVisible[`stat${index}`] ? 'reveal-float' : ''}`}
                data-animate-id={`stat${index}`}
                style={{ animationDelay: `${0.5 + index * 0.2}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-pulse"></div>
              </div>
            ))}

            {/* Quality Badge */}
            <div 
              className={`quality-badge ${isVisible['badge-quality'] ? 'reveal-zoom' : ''}`}
              data-animate-id="badge-quality"
              style={{ animationDelay: '1s' }}
            >
              <Award size={32} strokeWidth={2} />
              <div className="badge-text">
                <div className="badge-title">Quality Driven</div>
                <div className="badge-subtitle">Every Project</div>
              </div>
            </div>
          </div>

          {/* Animated Dots Pattern */}
          <div className="dots-pattern">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="dot"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .banner-root {
          background: #0a0a0f;
          color: #fff;
          padding: 100px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Background Elements */
        .banner-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
        }

        .banner-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 30% 50%,
            rgba(106, 0, 255, 0.15) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 70% 50%,
            rgba(0, 212, 255, 0.1) 0%,
            transparent 50%
          );
          animation: gradientPulse 8s ease-in-out infinite;
        }

        @keyframes gradientPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .banner-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }

        /* Content Section */
        .banner-content {
          max-width: 650px;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.15);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #a855f7;
          margin-bottom: 30px;
        }

        .banner-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 25px;
        }

        .banner-gradient-text {
          display: block;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .banner-description {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 50px;
        }

        /* Feature Cards - Without Arrows */
        .banner-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 50px;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default; /* Changed from pointer since no link */
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--feature-color);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover {
          transform: translateX(10px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .feature-card:hover::before {
          opacity: 0.05;
        }

        .feature-icon-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }

        .feature-icon-glow {
          position: absolute;
          inset: 0;
          background: var(--feature-color);
          border-radius: 14px;
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.4s ease;
        }

        .feature-card:hover .feature-icon-glow {
          opacity: 0.4;
        }

        .feature-icon-wrapper svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper svg {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-text {
          flex: 1;
          z-index: 1;
        }

        .feature-text h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 6px;
          color: #fff;
        }

        .feature-text p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* No feature-arrow styles since we removed it */

        /* CTA Section - Updated for navigation */
        .banner-cta-wrapper {
          text-align: left;
        }

        .banner-cta-button {
          position: relative;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          padding: 20px 45px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.05rem;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.3);
        }

        .banner-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.5);
          background: linear-gradient(135deg, #5a00e0 0%, #00b8e6 100%);
        }

        .cta-icon {
          transition: transform 0.3s ease;
        }

        .banner-cta-button:hover .cta-icon {
          transform: translateX(5px);
        }

        .cta-icon svg {
          stroke: currentColor;
        }

        .cta-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
        }

        .banner-cta-button:hover .cta-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }

        @keyframes shimmer {
          to { transform: translateX(100%); }
        }

        .banner-cta-subtext {
          margin-top: 15px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Visual Section */
        .banner-visual {
          position: relative;
          height: 650px;
        }

        .visual-main {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .visual-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .visual-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease-out;
        }

        .visual-main:hover .visual-image {
          transform: scale(1.05);
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(106, 0, 255, 0.2) 0%,
            rgba(0, 212, 255, 0.2) 100%
          );
          mix-blend-mode: overlay;
        }

        /* Decorative Elements */
        .visual-decoration {
          position: absolute;
          border-radius: 20px;
          opacity: 0.1;
        }

        .visual-decoration-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          top: -50px;
          right: -50px;
          filter: blur(60px);
          animation: float 6s ease-in-out infinite;
        }

        .visual-decoration-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #00d4ff, #06d6a0);
          bottom: -30px;
          left: -30px;
          filter: blur(50px);
          animation: float 6s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        /* Floating Stats */
        .floating-stat {
          position: absolute;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .stat-1 {
          top: 40px;
          left: -40px;
          animation: floatStat 4s ease-in-out infinite;
        }

        .stat-2 {
          top: 50%;
          right: -50px;
          transform: translateY(-50%);
          animation: floatStat 4s ease-in-out infinite 1.3s;
        }

        .stat-3 {
          bottom: 60px;
          left: -30px;
          animation: floatStat 4s ease-in-out infinite 2.6s;
        }

        @keyframes floatStat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .stat-icon {
          font-size: 2rem;
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.6));
        }

        .stat-content {
          min-width: 80px;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .stat-pulse {
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          border: 2px solid rgba(106, 0, 255, 0.5);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Quality Badge */
        .quality-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.95);
          color: #0a0a0f;
          border-radius: 20px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .quality-badge svg {
          color: #6a00ff;
        }

        .badge-title {
          font-size: 1.2rem;
          font-weight: 900;
          color: #0a0a0f;
          line-height: 1;
          margin-bottom: 4px;
        }

        .badge-subtitle {
          font-size: 0.85rem;
          color: rgba(10, 10, 15, 0.6);
          font-weight: 600;
        }

        /* Dots Pattern */
        .dots-pattern {
          position: absolute;
          bottom: -50px;
          right: -50px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          opacity: 0.3;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-radius: 50%;
          animation: dotPulse 3s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* Animation States */
        [data-animate-id] {
          opacity: 0;
        }

        @keyframes revealZoom {
          from {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        .reveal-zoom {
          animation: revealZoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes revealSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .reveal-slide-up {
          animation: revealSlideUp 0.8s ease-out forwards;
        }

        @keyframes revealFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal-fade {
          animation: revealFade 0.8s ease-out forwards;
        }

        @keyframes revealSlideLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .reveal-slide-left {
          animation: revealSlideLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes revealFloat {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .reveal-float {
          animation: revealFloat 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .banner-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .banner-visual {
            height: 500px;
          }

          .floating-stat {
            padding: 16px 20px;
          }

          .stat-1, .stat-2, .stat-3 {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            transform: none !important;
          }

          .quality-badge {
            position: relative;
            transform: none;
            margin-top: 30px;
          }
        }

        @media (max-width: 768px) {
          .banner-root {
            padding: 60px 20px;
          }

          .banner-content {
            max-width: 100%;
          }

          .banner-badge {
            font-size: 0.65rem;
            padding: 10px 18px;
          }

          .banner-title {
            font-size: clamp(2rem, 4vw, 3rem);
          }

          .banner-description {
            font-size: 1rem;
          }

          .feature-card {
            padding: 18px;
          }

          .feature-icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .banner-visual {
            height: 400px;
          }

          .dots-pattern {
            display: none;
          }

          .banner-cta-button {
            width: 100%;
            justify-content: center;
          }

          /* Adjust floating stats for mobile */
          .floating-stat {
            position: static !important;
            width: 100%;
            margin-bottom: 15px;
          }

          .stat-1, .stat-2, .stat-3 {
            animation: none !important;
          }
        }

        @media (max-width: 480px) {
          .banner-title {
            font-size: 2rem;
          }
          
          .banner-badge {
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
            gap: 8px;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .feature-text h3 {
            font-size: 1rem;
          }

          .feature-text p {
            font-size: 0.85rem;
          }

          .banner-cta-button {
            padding: 18px 30px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TechSolutionBanner;