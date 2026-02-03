import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsultationBooking from './ConsultationBooking';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiVideo
} from 'react-icons/fi';

const Contact = () => {
  const navigate = useNavigate(); // Add this line
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    try {
      const response = await fetch('https://formspree.io/f/mldylrwj', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <FiMail />, title: 'Email Us', value: 'info@verapixels.com', link: 'mailto:info@verapixels.com', color: '#007AFF', delay: '0s' },
    { icon: <FiPhone />, title: 'Call Us', value: '+234 816 084 7613 ', link: 'tel:+2348160847613', color: '#FF6B9D', delay: '0.2s' },
    { icon: <FiMapPin />, title: 'Visit Us', value: 'Lagos, Nigeria', link: '#map', color: '#3DDC84', delay: '0.4s' }
  ];

  return (
    <div className="contact-page">
      <div className="bg-effects">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        {/* Hero */}
        <section className="hero animate fade-up">
          <div className="hero-badge">
            <FiMail />
            <span>Get in Touch</span>
          </div>
          <h1>
            Let's Build Something
            <span className="gradient-text"> Amazing Together</span>
          </h1>
          <p>Have a project in mind? We'd love to hear about it. Get in touch and let's make it happen.</p>
        </section>

        {/* Book Consultation CTA */}
        <section className="consultation-cta animate zoom-in">
          <div className="cta-glow"></div>
          <div className="cta-icon">
            <FiCalendar />
          </div>
          <h2>Ready to Start Your Project?</h2>
          <p>Book a free 30-minute consultation with our experts. No commitment required.</p>
          <div className="cta-features">
            <div className="feature">
              <FiVideo />
              <span>Video/Phone</span>
            </div>
            <div className="feature">
              <FiClock />
              <span>30 Min Free</span>
            </div>
            <div className="feature">
              <FiCheckCircle />
              <span>Expert Advice</span>
            </div>
          </div>
          <button 
            className="cta-btn" 
            onClick={() => navigate('/consultationbooking')}
          >
            <FiCalendar />
            <span>Book Free Consultation</span>
            <div className="btn-glow"></div>
          </button>
        </section>

        {/* Contact Info */}
        <section className="contact-info">
          {contactInfo.map((info, idx) => (
            <a 
              key={idx} 
              href={info.link} 
              className="info-card animate slide-up"
              style={{ 
                animationDelay: info.delay,
                '--card-color': info.color
              } as React.CSSProperties}
            >
              <div className="card-shine"></div>
              <div className="icon-wrapper">
                <div className="icon">{info.icon}</div>
              </div>
              <h3>{info.title}</h3>
              <p>{info.value}</p>
              <div className="card-glow"></div>
            </a>
          ))}
        </section>

        {/* Contact Form */}
        <section className="form-section">
          <div className="form-card animate zoom-in">
            <div className="form-glow"></div>
            <div className="form-header">
              <div className="icon-pulse">
                <FiMessageSquare className="form-icon" />
              </div>
              <h2>Send us a Message</h2>
              <p>Fill out the form and we'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiUser />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FiMail />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  <FiMessageSquare />
                  <span>Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>
                  <FiMessageSquare />
                  <span>Your Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FiSend />
                    <span>Send Message</span>
                    <div className="btn-shine"></div>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Map */}
        <section className="map-section animate fade-up" id="map">
          <div className="map-info">
            <div className="map-icon">
              <FiMapPin />
            </div>
            <h3>Our Location</h3>
           <p>
          Remote-First Company<br />
          Based in Lagos, Nigeria
           </p>

            <button className="map-btn">Our Base Location</button>

          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62022494493!2d3.2406440682923!3d6.524378999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      </div>

      {showSuccess && (
        <div className="modal">
          <div className="modal-backdrop" onClick={() => setShowSuccess(false)}></div>
          <div className="modal-content">
            <div className="success-icon-wrapper">
              <FiCheckCircle className="success-icon" />
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <button onClick={() => setShowSuccess(false)}>Got it!</button>
          </div>
        </div>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .contact-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          padding: 100px 0 60px;
          overflow-x: hidden;
        }

        /* Background Effects */
        .bg-effects {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.25;
          animation: float 25s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #007AFF, #0051cc);
          top: -300px;
          left: -300px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #FF6B9D, #cc5580);
          bottom: -250px;
          right: -250px;
          animation-delay: -12s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #8B5CF6, #6b47c4);
          top: 40%;
          left: 50%;
          animation-delay: -7s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -80px) scale(1.1); }
          66% { transform: translate(-60px, 60px) scale(0.9); }
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Animation Classes */
        .animate {
          opacity: 0;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate.visible {
          opacity: 1;
        }

        .fade-up {
          transform: translateY(60px);
        }

        .fade-up.visible {
          transform: translateY(0);
        }

        .slide-up {
          transform: translateY(80px);
        }

        .slide-up.visible {
          transform: translateY(0);
        }

        .zoom-in {
          transform: scale(0.85);
        }

        .zoom-in.visible {
          transform: scale(1);
        }

        /* Hero */
        .hero {
          text-align: center;
          margin-bottom: 100px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(0, 122, 255, 0.1);
          border: 1px solid rgba(0, 122, 255, 0.3);
          border-radius: 50px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          font-weight: 600;
          animation: badgeFloat 3s ease-in-out infinite;
        }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-badge svg {
          color: #007AFF;
          font-size: 20px;
        }

        .hero h1 {
          font-size: clamp(40px, 7vw, 80px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 25%, #FF6B9D 50%, #8B5CF6 75%, #007AFF 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 5s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .hero p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Consultation CTA */
        .consultation-cta {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.12), rgba(139, 92, 246, 0.12));
          border: 2px solid rgba(0, 122, 255, 0.4);
          border-radius: 40px;
          padding: 70px 50px;
          text-align: center;
          margin-bottom: 100px;
          backdrop-filter: blur(30px);
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          inset: -100%;
          background: radial-gradient(circle, rgba(0, 122, 255, 0.3), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .consultation-cta:hover .cta-glow {
          opacity: 1;
        }

        .cta-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          margin-bottom: 32px;
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.5);
          animation: iconPulse 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(5deg); }
        }

        .consultation-cta h2 {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 900;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .consultation-cta p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 36px;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }

        .feature svg {
          color: #007AFF;
          font-size: 24px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 22px 50px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.5);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .btn-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #5AC8FA, #007AFF);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .cta-btn:hover .btn-glow {
          opacity: 1;
        }

        .cta-btn:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 70px rgba(0, 122, 255, 0.7);
        }

        .cta-btn svg,
        .cta-btn span {
          position: relative;
          z-index: 1;
        }

        /* Contact Info */
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 100px;
        }

        .info-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.04);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          text-align: center;
          text-decoration: none;
          color: white;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .card-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.08), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
        }

        .info-card:hover .card-shine {
          transform: rotate(45deg) translate(50%, 50%);
        }

        .info-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: var(--card-color);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 25px 80px rgba(0, 122, 255, 0.3);
        }

        .icon-wrapper {
          margin-bottom: 28px;
          display: inline-block;
          position: relative;
        }

        .info-card .icon {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card-color);
          border-radius: 24px;
          font-size: 40px;
          color: white;
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.4);
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .info-card:hover .icon {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 20px 70px var(--card-color);
        }

        .card-glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, var(--card-color), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .info-card:hover .card-glow {
          opacity: 0.3;
        }

        .info-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .info-card p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 1;
        }

        /* Form */
        .form-section {
          margin-bottom: 100px;
        }

        .form-card {
          max-width: 900px;
          margin: 0 auto;
          padding: 70px;
          background: rgba(255, 255, 255, 0.04);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          backdrop-filter: blur(30px);
          position: relative;
          overflow: hidden;
        }

        .form-glow {
          position: absolute;
          inset: -100%;
          background: radial-gradient(circle at 50% 50%, rgba(0, 122, 255, 0.1), transparent 70%);
          animation: glowPulse 8s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .form-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .icon-pulse {
          display: inline-block;
          animation: iconPulse 3s ease-in-out infinite;
        }

        .form-icon {
          font-size: 64px;
          color: #007AFF;
          margin-bottom: 24px;
          filter: drop-shadow(0 10px 30px rgba(0, 122, 255, 0.5));
        }

        .form-card h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .form-card > .form-header > p {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.75);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.95);
        }

        .form-group label svg {
          color: #007AFF;
          font-size: 20px;
        }

        input, textarea {
          padding: 18px 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          color: white;
          font-size: 1.05rem;
          font-family: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #007AFF;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.15), 0 10px 30px rgba(0, 122, 255, 0.2);
          transform: translateY(-2px);
        }

        textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px 50px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.4);
        }

        .btn-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.6s ease;
        }

        .submit-btn:hover .btn-shine {
          transform: rotate(45deg) translateX(100%);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 70px rgba(0, 122, 255, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-btn svg,
        .submit-btn span {
          position: relative;
          z-index: 1;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Map */
        .map-section {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
        }

        .map-container {
          position: relative;
          filter: grayscale(0.3) brightness(0.9);
          transition: all 0.5s ease;
        }

        .map-section:hover .map-container {
          filter: grayscale(0) brightness(1);
        }

        .map-info {
          position: absolute;
          top: 40px;
          left: 40px;
          padding: 40px;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 28px;
          backdrop-filter: blur(30px);
          z-index: 10;
          max-width: 350px;
          transition: all 0.5s ease;
        }

        .map-info:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .map-icon {
          width: 70px;
          height: 70px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #FF6B9D, #FF3366);
          border-radius: 20px;
          margin-bottom: 20px;
          animation: iconPulse 3s ease-in-out infinite;
        }

        .map-icon svg {
          font-size: 36px;
          color: white;
        }

        .map-info h3 {
          font-size: 1.7rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .map-info p {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 24px;
        }

        .map-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .map-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.5);
        }

        /* Modal */
        .modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
        }

        .modal-content {
          max-width: 450px;
          padding: 60px 50px;
          background: rgba(255, 255, 255, 0.06);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 36px;
          text-align: center;
          backdrop-filter: blur(30px);
          position: relative;
          z-index: 1;
          animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-icon-wrapper {
          width: 120px;
          height: 120px;
          margin: 0 auto 28px;
          background: linear-gradient(135deg, #3DDC84, #07C160);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: successPulse 2s ease-in-out infinite;
          box-shadow: 0 20px 60px rgba(61, 220, 132, 0.5);
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .success-icon {
          font-size: 72px;
          color: white;
        }

        .modal-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .modal-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .modal-content button {
          padding: 16px 48px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 16px;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
        }

        .modal-content button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.6);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contact-page { padding: 80px 0 40px; }
          .hero-badge {margin-top: 40px; }
          .hero { margin-bottom: 60px; }
          .hero h1 { font-size: 40px; }
          .hero p { font-size: 1.1rem; }
          .consultation-cta { padding: 50px 30px; margin-bottom: 60px; }
          .cta-icon { width: 80px; height: 80px; font-size: 40px; }
          .cta-features { gap: 20px; }
          .contact-info { gap: 24px; margin-bottom: 60px; }
          .form-card { padding: 50px 30px; }
          .form-row { grid-template-columns: 1fr; }
          .map-info { 
            position: static; 
            margin-bottom: 24px; 
            max-width: 100%;
            border-radius: 20px;
          }
        }

        @media (max-width: 480px) {
          .contact-page { padding: 60px 0 30px; }
          .container { padding: 0 20px; }
          .hero-badge { padding: 10px 20px; font-size: 0.9rem; }
          .hero h1 { font-size: 32px; }
          .hero p { font-size: 1rem; }
          .consultation-cta { padding: 40px 24px; border-radius: 28px; }
          .cta-icon { width: 70px; height: 70px; font-size: 36px; margin-bottom: 24px; }
          .consultation-cta h2 { font-size: 24px; }
          .consultation-cta p { font-size: 1rem; }
          .cta-features { flex-direction: column; gap: 12px; }
          .feature { width: 100%; justify-content: center; }
          .cta-btn { padding: 18px 36px; font-size: 1.1rem; }
          .contact-info { grid-template-columns: 1fr; }
          .info-card { padding: 40px 30px; }
          .form-card { padding: 40px 24px; border-radius: 28px; }
          .form-card h2 { font-size: 2rem; }
          .form-card > .form-header > p { font-size: 1rem; }
          input, textarea { padding: 16px 20px; font-size: 1rem; }
          .submit-btn { padding: 18px 40px; font-size: 1.1rem; }
          .map-info { padding: 32px 24px; }
          .modal-content { margin: 0 20px; padding: 50px 30px; }
          .success-icon-wrapper { width: 100px; height: 100px; }
          .success-icon { font-size: 60px; }
        }
      `}</style>
    </div>
  );
};

export default Contact;