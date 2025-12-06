import React, { useEffect, useRef, useState } from 'react';
import { Cpu, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

const TechSolutionBanner = () => {
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

  const reasons = [
    {
      icon: Cpu,
      title: "We're Recognized IT Solutions Company",
      subtitle: "Industry Leader"
    },
    {
      icon: TrendingUp,
      title: "We're Boosting Your Business Growth",
      subtitle: "Proven Results"
    },
    {
      icon: Users,
      title: "We're Leading Your Team with Care",
      subtitle: "Expert Support"
    }
  ];

  return (
    <div className="tech-banner-root">
      <div className="tech-banner-container">
        {/* Left Content */}
        <div className="tech-content-section">
          <div className="tech-content-header">
            <div 
              className={`tech-header-badge ${isVisible['badge'] ? 'animate-zoom-in' : ''}`}
              data-animate-id="badge"
            >
              <CheckCircle size={20} />
              <span>TRUSTED BY 1000+ BUSINESSES</span>
            </div>
            <h2 
              className={`tech-main-title ${isVisible['title'] ? 'animate-text-split' : ''}`}
              data-animate-id="title"
            >
              Why Our Technology Solutions
              <br />
              <span className="tech-gradient-text">Company Stands Out?</span>
            </h2>
          </div>

          <div className="tech-reasons-list">
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              const animateId = `reason-${index}`;
              const direction = index % 2 === 0 ? 'left' : 'right';
              return (
                <div 
                  key={index} 
                  className={`tech-reason-item ${isVisible[animateId] ? `animate-fade-${direction}` : ''}`}
                  data-animate-id={animateId}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="tech-reason-icon">
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  <div className="tech-reason-content">
                    <h3>{reason.title}</h3>
                    <p>{reason.subtitle}</p>
                  </div>
                  <div className="tech-reason-arrow">
                    <ArrowRight size={24} />
                  </div>
                </div>
              );
            })}
          </div>

          <div 
            className={`tech-website-link ${isVisible['website'] ? 'animate-zoom-in' : ''}`}
            data-animate-id="website"
          >
            <span className="tech-link-icon">🌐</span>
            <span className="tech-link-text">www.YourTechCompany.com</span>
          </div>

          {/* CTA Section */}
          <div 
            className={`tech-cta-section ${isVisible['cta'] ? 'animate-zoom-in' : ''}`}
            data-animate-id="cta"
          >
            <div className="tech-cta-content">
              <h3>Get The Best Source for IT Solutions and Service</h3>
              <p>Transform your business with cutting-edge technology solutions</p>
            </div>
            <button className="tech-cta-button">
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="tech-image-section">
          <div 
            className={`tech-image-wrapper ${isVisible['image'] ? 'animate-zoom-in' : ''}`}
            data-animate-id="image"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop" 
              alt="Tech team collaboration"
              className="tech-main-image"
            />
            <div className="tech-image-overlay"></div>
            
            {/* Floating Stats */}
            <div 
              className={`tech-floating-stat tech-stat-1 ${isVisible['stat1'] ? 'animate-fade-left' : ''}`}
              data-animate-id="stat1"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="tech-stat-icon">💼</div>
              <div className="tech-stat-content">
                <div className="tech-stat-number">500K+</div>
                <div className="tech-stat-label">Projects</div>
              </div>
            </div>
            
            <div 
              className={`tech-floating-stat tech-stat-2 ${isVisible['stat2'] ? 'animate-fade-right' : ''}`}
              data-animate-id="stat2"
              style={{ animationDelay: '0.7s' }}
            >
              <div className="tech-stat-icon">⚡</div>
              <div className="tech-stat-content">
                <div className="tech-stat-number">99%</div>
                <div className="tech-stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tech-banner-root {
          background: #000;
          color: #fff;
          padding: 80px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .tech-banner-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* Content Section */
        .tech-content-section {
          padding: 40px;
        }

        .tech-content-header {
          margin-bottom: 50px;
        }

        .tech-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #00d4ff;
          margin-bottom: 30px;
        }

        .tech-header-badge svg {
          color: #00d4ff;
        }

        .tech-main-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0;
        }

        .tech-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Reasons List */
        .tech-reasons-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .tech-reason-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tech-reason-item:hover {
          background: rgba(106, 0, 255, 0.1);
          border-color: #6a00ff;
          transform: translateX(10px);
        }

        .tech-reason-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tech-reason-content {
          flex: 1;
        }

        .tech-reason-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 5px;
        }

        .tech-reason-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .tech-reason-arrow {
          color: #00d4ff;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .tech-reason-item:hover .tech-reason-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Website Link */
        .tech-website-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00d4ff;
          margin-bottom: 50px;
          padding: 15px 0;
        }

        .tech-link-icon {
          font-size: 1.5rem;
        }

        /* CTA Section */
        .tech-cta-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.4);
        }

        .tech-cta-content h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .tech-cta-content p {
          margin: 0;
          opacity: 0.95;
          font-size: 0.95rem;
        }

        .tech-cta-button {
          background: #fff;
          color: #6a00ff;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .tech-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Image Section */
        .tech-image-section {
          position: relative;
          height: 700px;
        }

        .tech-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
        }

        .tech-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tech-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(106, 0, 255, 0.3) 0%,
            rgba(0, 212, 255, 0.3) 100%
          );
        }

        /* Floating Stats */
        .tech-floating-stat {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          animation: techFloat 3s ease-in-out infinite;
        }

        .tech-stat-1 {
          top: 50px;
          left: -30px;
          animation-delay: 0s;
        }

        .tech-stat-2 {
          bottom: 80px;
          right: -30px;
          animation-delay: 1.5s;
        }

        @keyframes techFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .tech-stat-icon {
          font-size: 2rem;
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.5));
        }

        .tech-stat-number {
          font-size: 1.8rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .tech-stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 5px;
        }

        /* Scroll Animations */
        [data-animate-id] {
          opacity: 0;
        }

        /* Fade from Left */
        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-left {
          animation: fadeLeft 0.8s ease-out forwards;
        }

        /* Fade from Right */
        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-right {
          animation: fadeRight 0.8s ease-out forwards;
        }

        /* Zoom In Effect */
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-zoom-in {
          animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Text Split Effect - Letters spreading from center */
        @keyframes textSplit {
          from {
            opacity: 0;
            transform: scale(0.8);
            letter-spacing: -0.5em;
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            letter-spacing: normal;
            filter: blur(0);
          }
        }

        .animate-text-split {
          animation: textSplit 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-text-split span {
          display: inline-block;
          animation: textSplit 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .tech-banner-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .tech-image-section {
            height: 500px;
          }

          .tech-cta-section {
            flex-direction: column;
            text-align: center;
          }

          .tech-stat-1 {
            left: 20px;
          }

          .tech-stat-2 {
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .tech-banner-root {
            padding: 40px 20px;
          }

          .tech-content-section {
            padding: 20px;
          }

          .tech-cta-section {
            padding: 30px 20px;
          }

          .tech-cta-content h3 {
            font-size: 1.1rem;
          }

          .tech-reason-item {
            padding: 15px;
          }

          .tech-reason-icon {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default TechSolutionBanner;