import React, { useState, useEffect } from "react";
import { 
  FiCode, 
  FiZap, 
  FiTarget,
  FiLayers,
  FiTrendingUp,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiArrowRight,
  FiStar,
  FiHeart,
  FiAward,
  FiBook
} from "react-icons/fi";
import Navbar from "../Components/Navbar";
import VeeAIChatbot from "../Components/VeeAIChatbot";
import FAQ from "../Components/FAQ";

const AboutPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const values = [
    {
      icon: <FiZap />,
      title: "Innovation First",
      description: "We push boundaries with cutting-edge technology, creating solutions that define the future of digital experiences.",
      color: "#FFD700"
    },
    {
      icon: <FiHeart />,
      title: "Client-Centric Approach",
      description: "Your success is our mission. We build lasting partnerships through transparency, dedication, and exceptional results.",
      color: "#FF6B9D"
    },
    {
      icon: <FiTarget />,
      title: "Pixel-Perfect Execution",
      description: "Every detail matters. We craft solutions with precision, ensuring flawless design and seamless functionality.",
      color: "#00D1FF"
    },
    {
      icon: <FiAward />,
      title: "Excellence Driven",
      description: "We don't just meet expectations—we exceed them. Quality and innovation are at the heart of everything we build.",
      color: "#00FF88"
    }
  ];

  const milestones = [
    { year: "2025", title: "Foundation", description: "Verapixels was born from a vision to transform digital experiences" },
    { year: "2025", title: "First Client", description: "Delivered our first project, setting the standard for excellence" },
    { year: "2025+", title: "Growing Impact", description: "Expanding our reach and building the future of tech solutions" }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Animated Background */}
      <div className="about-bg-particles">
        <div 
          className="particle particle-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="particle particle-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="particle particle-3"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * -0.02}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="hero-content">
            <div 
              className="hero-badge"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            >
              <FiStar /> Founded in 2025
            </div>
            <h1 className="hero-title">
              The Story Behind
              <br />
              <span className="gradient-text">Verapixels</span>
            </h1>
            <p className="hero-subtitle">
              Where innovation meets precision, and every pixel tells a story of excellence.
            </p>
          </div>
          
          <div 
            className="hero-visual"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg) rotateX(${mousePosition.y * -0.01}deg)`
            }}
          >
            <div className="floating-cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face left"></div>
              <div className="cube-face right"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="founder-section">
        <div className="about-container">
          <div className="founder-grid">
            <div className="founder-image-wrapper">
              <div className="founder-frame">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop" 
                  alt="Ocholi Divine"
                  className="founder-image"
                />
                <div className="founder-glow"></div>
              </div>
            </div>
            
            <div className="founder-content">
              <div className="founder-label">
                <FiBook /> Our Founder
              </div>
              <h2 className="section-title">
                Meet <span className="gradient-text">Ocholi Divine</span>
              </h2>
              <p className="founder-text">
                In 2025, Ocholi Divine embarked on a journey to revolutionize the digital landscape. 
                With a passion for technology and an eye for perfection, he founded Verapixels with 
                a clear vision: to create digital experiences that don't just work—they inspire.
              </p>
              <p className="founder-text">
                "I wanted to build a company where innovation meets craftsmanship, where every line 
                of code and every design element serves a purpose. Verapixels represents that commitment 
                to excellence."
              </p>
              <div className="founder-stats">
                <div className="stat-box">
                  <FiCode className="stat-icon" />
                  <div className="stat-label">Tech Visionary</div>
                </div>
                <div className="stat-box">
                  <FiTarget className="stat-icon" />
                  <div className="stat-label">Problem Solver</div>
                </div>
                <div className="stat-box">
                  <FiTrendingUp className="stat-icon" />
                  <div className="stat-label">Innovation Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="origin-section">
        <div className="about-container">
          <div className="origin-header">
            <h2 className="section-title text-center">
              The Birth of <span className="gradient-text">Verapixels</span>
            </h2>
            <p className="section-subtitle">How a late-night scroll became a tech revolution</p>
          </div>

          <div className="origin-story">
            <div className="story-card">
              <div className="story-number">01</div>
              <div className="story-icon">
                <FiBook />
              </div>
              <h3 className="story-title">The Search Begins</h3>
              <p className="story-text">
                It started with a prayer and a simple question: "What should I name my business?" 
                Late one night, scrolling through TikTok for inspiration, I searched "how to name a business." 
                That's when I discovered "Vera"—a word that resonated with truth and authenticity.
              </p>
            </div>

            <div className="story-card">
              <div className="story-number">02</div>
              <div className="story-icon">
                <FiLayers />
              </div>
              <h3 className="story-title">The Pixel Moment</h3>
              <p className="story-text">
                Then came the memory—my first day at tech school. A close friend asked our teacher about 
                "pixels," and that word stuck with me. Pixels are the building blocks of everything digital. 
                They're what make designs come alive, what turn concepts into reality.
              </p>
            </div>

            <div className="story-card">
              <div className="story-number">03</div>
              <div className="story-icon">
                <FiStar />
              </div>
              <h3 className="story-title">Perfect Fusion</h3>
              <p className="story-text">
                I combined "Vera" with "Pixels" because that's what we do—we create truth through pixels. 
                When you give a design element the right padding, the right spacing, the perfect 20px—and 
                it looks absolutely flawless—that's the Verapixels standard. We make things look not just 
                good, but perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Name Meaning Section */}
      <section className="meaning-section">
        <div className="about-container">
          <div className="meaning-content">
            <div className="meaning-visual">
              <div className="pixel-grid">
                {[...Array(25)].map((_, i) => (
                  <div 
                    key={i} 
                    className="pixel-dot"
                    style={{
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="meaning-text">
              <h2 className="section-title">
                What <span className="gradient-text">Verapixels</span> Means
              </h2>
              <div className="meaning-breakdown">
                <div className="word-part">
                  <h3 className="word-title">VERA</h3>
                  <p className="word-description">
                    Derived from Latin, meaning "truth" and "authenticity." It represents our commitment 
                    to honest, transparent partnerships and genuine innovation.
                  </p>
                </div>
                <div className="plus-sign">+</div>
                <div className="word-part">
                  <h3 className="word-title">PIXELS</h3>
                  <p className="word-description">
                    The fundamental building blocks of digital design. Every great interface, every stunning 
                    visual—it all starts with pixels perfectly placed.
                  </p>
                </div>
              </div>
              <div className="meaning-result">
                <h3 className="result-title">= Authentic Digital Excellence</h3>
                <p className="result-text">
                  Verapixels embodies the perfect union of truth and precision. We believe that great 
                  technology isn't just about functionality—it's about creating experiences that are 
                  authentic, beautiful, and meticulously crafted down to the last pixel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="about-container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <FiTarget />
              </div>
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-text">
                To empower businesses with cutting-edge digital solutions that drive growth, inspire 
                innovation, and deliver measurable results. We're here to transform your vision into 
                pixel-perfect reality.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <FiZap />
              </div>
              <h3 className="mission-title">Our Vision</h3>
              <p className="mission-text">
                To become the leading force in digital innovation, setting new standards for excellence 
                in web development, design, and technology solutions. We envision a future where every 
                business has access to world-class digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="about-container">
          <h2 className="section-title text-center">
            Our Core <span className="gradient-text">Values</span>
          </h2>
          <p className="section-subtitle">The principles that drive everything we do</p>
          
          <div className="values-grid">
            {values.map((value, i) => (
              <div 
                key={i} 
                className="value-card"
                style={{
                  animationDelay: `${i * 0.15}s`
                }}
              >
                <div 
                  className="value-icon"
                  style={{ color: value.color }}
                >
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
                <div className="value-glow" style={{ background: value.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="about-container">
          <h2 className="section-title text-center">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">Building the future, one pixel at a time</p>
          
          <div className="timeline">
            {milestones.map((milestone, i) => (
              <div 
                key={i} 
                className="timeline-item"
                style={{
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-text">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="about-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Create Something Amazing?</h2>
            <p className="cta-description">
              Let's bring your vision to life with pixel-perfect precision
            </p>
            <div className="cta-buttons">
              <button className="btn-primary-large">
                Start Your Project <FiArrowRight />
              </button>
              <button className="btn-secondary-large">
                View Our Work
              </button>
            </div>
            <div className="social-section">
              <span className="social-label">Connect With Us:</span>
              <div className="social-links">
                <a href="#" className="social-link-large"><FiGithub /></a>
                <a href="#" className="social-link-large"><FiLinkedin /></a>
                <a href="#" className="social-link-large"><FiTwitter /></a>
                <a href="#" className="social-link-large"><FiInstagram /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          background: #000;
          color: #fff;
          overflow-x: hidden;
          position: relative;
        }

        /* Animated Background */
        .about-bg-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          animation: float 10s ease-in-out infinite;
        }

        .particle-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: 10%;
          left: -15%;
        }

        .particle-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 3s;
        }

        .particle-3 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: 10%;
          left: 40%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .about-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
        }

        .hero-content {
          flex: 1;
          animation: slideInLeft 1s ease;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 25px;
          color: #00bfff;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 24px;
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }

        /* 3D Floating Cube */
        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.1s ease;
        }

        .floating-cube {
          width: 220px;
          height: 220px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 25s infinite linear;
        }

        @keyframes rotateCube {
          from { transform: rotateX(0) rotateY(0) rotateZ(0); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-face {
          position: absolute;
          width: 220px;
          height: 220px;
          border: 2px solid rgba(0, 99, 244, 0.6);
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.15), rgba(0, 191, 255, 0.08));
          backdrop-filter: blur(15px);
          box-shadow: 0 0 40px rgba(0, 99, 244, 0.3);
        }

        .cube-face.front  { transform: translateZ(110px); }
        .cube-face.back   { transform: rotateY(180deg) translateZ(110px); }
        .cube-face.left   { transform: rotateY(-90deg) translateZ(110px); }
        .cube-face.right  { transform: rotateY(90deg) translateZ(110px); }
        .cube-face.top    { transform: rotateX(90deg) translateZ(110px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(110px); }

        /* Founder Section */
        .founder-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .founder-image-wrapper {
          position: relative;
        }

        .founder-frame {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          border: 3px solid rgba(0, 99, 244, 0.3);
          box-shadow: 0 30px 80px rgba(0, 99, 244, 0.2);
          animation: fadeInUp 1s ease;
        }

        .founder-image {
          width: 100%;
          height: 600px;
          object-fit: cover;
          display: block;
        }

        .founder-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.2), rgba(0, 191, 255, 0.1));
        }

        .founder-content {
          animation: fadeInUp 1s ease 0.2s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .founder-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 99, 244, 0.1);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          color: #00bfff;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 28px;
        }

        .text-center {
          text-align: center;
        }

        .section-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin: -16px 0 60px;
        }

        .founder-text {
          font-size: 1.1rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
        }

        .founder-stats {
          display: flex;
          gap: 20px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .stat-box {
          flex: 1;
          min-width: 140px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          background: rgba(0, 99, 244, 0.1);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 32px;
          color: #00bfff;
          margin-bottom: 12px;
        }

        .stat-label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Origin Story Section */
        .origin-section {
          padding: 120px 0;
        }

        .origin-header {
          margin-bottom: 80px;
        }

        .origin-story {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .story-card {
          position: relative;
          padding: 50px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          transition: all 0.4s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
        }

        .story-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .story-number {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 64px;
          font-weight: 900;
          color: rgba(0, 99, 244, 0.1);
          line-height: 1;
        }

        .story-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 18px;
          color: #fff;
          font-size: 32px;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.3);
        }

        .story-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 16px;
        }

        .story-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* Name Meaning Section */
        .meaning-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .meaning-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: center;
        }

        .meaning-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pixel-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .pixel-dot {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 12px;
          animation: pixelPulse 2s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        @keyframes pixelPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.6; }
        }

        .meaning-breakdown {
          display: flex;
          align-items: center;
          gap: 30px;
          margin: 40px 0;
          flex-wrap: wrap;
        }

        .word-part {
          flex: 1;
          min-width: 200px;
        }

        .word-title {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 12px;
        }

        .word-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .plus-sign {
          font-size: 3rem;
          font-weight: 900;
          color: #00bfff;
        }

        .meaning-result {
          padding: 35px;
          background: rgba(0, 99, 244, 0.08);
          border: 2px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          margin-top: 40px;
        }

        .result-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #00bfff;
          margin: 0 0 16px;
        }

        .result-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        /* Mission Section */
        .mission-section {
          padding: 120px 0;
        }

      .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
        }

        .mission-card {
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .mission-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .mission-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .mission-card:hover::before {
          opacity: 1;
        }

        .mission-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 20px;
          color: #fff;
          font-size: 36px;
          margin-bottom: 28px;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
          position: relative;
          z-index: 1;
        }

        .mission-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 20px;
          position: relative;
          z-index: 1;
        }

        .mission-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Values Section */
        .values-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin-top: 60px;
        }

        .value-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
        }

        .value-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
        }

        .value-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(60px);
          transition: opacity 0.4s ease;
        }

        .value-card:hover .value-glow {
          opacity: 0.3;
        }

        .value-icon {
          font-size: 48px;
          margin-bottom: 24px;
          display: block;
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 16px;
          position: relative;
          z-index: 1;
        }

        .value-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Timeline Section */
        .timeline-section {
          padding: 120px 0;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 80px auto 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #0063f4, #00bfff, #00ff88);
        }

        .timeline-item {
          position: relative;
          padding-left: 90px;
          margin-bottom: 80px;
          animation: fadeInUp 0.8s ease both;
        }

        .timeline-dot {
          position: absolute;
          left: 18px;
          top: 8px;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: 4px solid #000;
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(0, 99, 244, 0.6);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(0, 99, 244, 0.6); }
          50% { transform: scale(1.1); box-shadow: 0 0 50px rgba(0, 99, 244, 0.8); }
        }

        .timeline-content {
          padding: 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
        }

        .timeline-content:hover {
          background: rgba(0, 99, 244, 0.05);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateX(10px);
        }

        .timeline-year {
          display: inline-block;
          padding: 8px 18px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          margin-bottom: 16px;
          color: #fff;
        }

        .timeline-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .timeline-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0 80px;
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .cta-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 50px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-primary-large, .btn-secondary-large {
          padding: 18px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .btn-primary-large {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
        }

        .btn-primary-large:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.6);
        }

        .btn-secondary-large {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .social-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .social-label {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link-large {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          font-size: 22px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link-large:hover {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .about-hero .about-container {
            flex-direction: column;
            text-align: center;
          }

          .hero-subtitle {
            max-width: 100%;
          }

          .floating-cube {
            margin-top: 60px;
          }

          .founder-grid,
          .meaning-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .founder-image {
            height: 500px;
          }

          .mission-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }

          .origin-story {
            grid-template-columns: 1fr;
          }

          .meaning-breakdown {
            flex-direction: column;
            align-items: flex-start;
          }

          .plus-sign {
            align-self: center;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 36px;
          }

          .section-title {
            font-size: 32px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary-large,
          .btn-secondary-large {
            width: 100%;
            justify-content: center;
          }

          .timeline::before {
            left: 15px;
          }

          .timeline-dot {
            left: 3px;
          }

          .timeline-item {
            padding-left: 60px;
          }

          .founder-stats {
            flex-direction: column;
          }

          .stat-box {
            min-width: 100%;
          }
        }
      `}</style>
      <VeeAIChatbot />
      <FAQ />
    </div>
  );
};

export default AboutPage;