import React, { useState, useEffect } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiHeadphones,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';
import VeeAIChatbot from '../Components/VeeAIChatbot';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the inquiry type label from activeTab
    const inquiryType = contactTabs.find(tab => tab.id === activeTab)?.label || 'General Inquiry';

    // Formspree integration
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('inquiry_type', inquiryType);
    formDataToSend.append('_subject', `New ${inquiryType} - Contact Form Submission`);
    
    try {
      const response = await fetch('https://formspree.io/f/mldylrwj', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setActiveTab('general'); // Reset to default tab
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You can add error handling here, like showing an error message
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF />, name: 'Facebook', url: '#', color: '#5918f2ff' },
    { icon: <FaTwitter />, name: 'Twitter/X', url: '#', color: '#1DA1F2' },
    { icon: <FaInstagram />, name: 'Instagram', url: '#', color: '#E4405F' },
    { icon: <FaLinkedinIn />, name: 'LinkedIn', url: '#', color: '#0A66C2' },
    { icon: <FaTiktok />, name: 'TikTok', url: '#', color: '#3a0808ff' },
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: '#', color: '#25D366' }
  ];

  const contactInfo = [
    { icon: <FiMail />, title: 'Email', value: 'hello@yourcompany.com', link: 'mailto:hello@yourcompany.com', color: '#007AFF' },
    { icon: <FiPhone />, title: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567', color: '#FF6B9D' },
    { icon: <FiMapPin />, title: 'Location', value: 'Lagos, Nigeria', link: '#map', color: '#3DDC84' }
  ];

  const workingHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  const whyChooseUs = [
    { icon: <FiZap />, title: 'Fast Response', desc: '24-hour response guarantee', color: '#FF6B9D' },
    { icon: <FiShield />, title: 'Secure & Private', desc: 'Your data is always protected', color: '#007AFF' },
    { icon: <FiTrendingUp />, title: 'Proven Results', desc: '500+ successful projects', color: '#3DDC84' },
    { icon: <FiUsers />, title: 'Expert Team', desc: '50+ professionals ready to help', color: '#8B5CF6' }
  ];

  const contactTabs = [
    { id: 'general', label: 'General Inquiry', icon: <FiMessageSquare /> },
    { id: 'support', label: 'Technical Support', icon: <FiHeadphones /> },
    { id: 'sales', label: 'Sales & Pricing', icon: <FiTrendingUp /> },
    { id: 'partnership', label: 'Partnership', icon: <FiUsers /> }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      image: 'https://i.pravatar.cc/150?img=1',
      text: 'Working with this team was an absolute pleasure. They delivered our mobile app ahead of schedule and exceeded all expectations!'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, AppVenture',
      image: 'https://i.pravatar.cc/150?img=2',
      text: 'Outstanding communication and technical expertise. Our app now has over 100K downloads thanks to their brilliant development work.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CTO, Digital Dreams',
      image: 'https://i.pravatar.cc/150?img=3',
      text: 'The best development team we\'ve worked with. Professional, responsive, and truly committed to our success.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Animated Background */}
      <div className="bg-container">
        <div className="hexagon-pattern"></div>
        <div className="particle-field">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="contact-badge">
              <FiMail className="badge-icon" />
              <span>Get in Touch</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-line" data-text="Contact">Contact</span>
              <span className="title-line gradient-text" data-text="Us">Us</span>
            </h1>
            
            <p className="hero-subtitle">
              Let's turn your ideas into reality. We're here to help you build something amazing.
            </p>

            {/* Social Media Links */}
            <div className="social-grid">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  className="social-card"
                  style={{ '--hover-color': social.color } as React.CSSProperties}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">{social.icon}</div>
                  <span className="social-name">{social.name}</span>
                  <div className="social-glow" style={{ background: social.color }}></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="why-grid">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="why-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="why-icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, idx) => (
              <a 
                key={idx} 
                href={info.link}
                className="info-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="info-icon" style={{ background: `linear-gradient(135deg, ${info.color}, ${info.color}dd)` }}>
                  {info.icon}
                </div>
                <h3 className="info-title">{info.title}</h3>
                <p className="info-value">{info.value}</p>
                <div className="card-shine"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="hours-section">
        <div className="container">
          <div className="hours-wrapper">
            <div className="hours-header">
              <div className="hours-icon-container">
                <FiClock className="hours-icon" />
              </div>
              <h2>Business Hours</h2>
              <p>We're here when you need us</p>
            </div>
            <div className="hours-list">
              {workingHours.map((schedule, idx) => (
                <div key={idx} className="hours-item">
                  <span className="hours-day">{schedule.day}</span>
                  <span className="hours-dots"></span>
                  <span className="hours-time">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form with Tabs */}
      <section className="form-section">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-container">
              <div className="form-header">
                <div className="form-header-icon-container">
                  <FiMessageSquare className="form-header-icon" />
                </div>
                <h2>Send us a Message</h2>
                <p>Choose your inquiry type and we'll route it to the right team</p>
              </div>

              {/* Tabs */}
              <div className="contact-tabs">
                {contactTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Display selected inquiry type */}
              <div className="selected-inquiry">
                <span className="inquiry-badge">
                  Selected: {contactTabs.find(tab => tab.id === activeTab)?.label}
                </span>
              </div>

              <form 
                onSubmit={handleSubmit} 
                className="contact-form"
                action="https://formspree.io/f/your-form-id"
                method="POST"
              >
                {/* Hidden input for inquiry type */}
                <input 
                  type="hidden" 
                  name="inquiry_type" 
                  value={contactTabs.find(tab => tab.id === activeTab)?.label || 'General Inquiry'} 
                />
                <input 
                  type="hidden" 
                  name="_subject" 
                  value={`New ${contactTabs.find(tab => tab.id === activeTab)?.label || 'General Inquiry'} - Contact Form Submission`} 
                />
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FiUser />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FiMail />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <FiMessageSquare />
                    <span>Subject</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <FiMessageSquare />
                    <span>Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project..."
                    rows={6}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="form-decoration">
              <div className="deco-circle deco-1"></div>
              <div className="deco-circle deco-2"></div>
              <div className="deco-circle deco-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section" id="map">
        <div className="container">
          <div className="map-wrapper">
            <div className="map-overlay">
              <div className="map-info">
                <FiMapPin className="map-pin-icon" />
                <h3>Visit Our Office</h3>
                <p>123 Tech Boulevard, Victoria Island</p>
                <p>Lagos, Nigeria</p>
                <button className="map-btn">Get Directions</button>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62022494493!2d3.2406440682923!3d6.524378999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We'll get back to you soon!</p>
            <button onClick={() => setShowSuccess(false)} className="success-close">
              Got it!
            </button>
          </div>
        </div>
      )}

      <VeeAIChatbot />

      <style>{`
        /* Add this new CSS for the selected inquiry display */
        .selected-inquiry {
          text-align: center;
          margin-bottom: 24px;
        }

        .inquiry-badge {
          display: inline-block;
          padding: 8px 16px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          color: white;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 122, 255, 0.3);
        }

        /* Rest of your existing CSS remains the same */
        * {
          scroll-behavior: smooth;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .bg-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hexagon-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px);
          animation: hexMove 20s linear infinite;
        }

        @keyframes hexMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .gradient-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: orbFloat 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: #007AFF;
          top: -250px;
          left: -250px;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #FF6B9D;
          bottom: -200px;
          right: -200px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 450px;
          height: 450px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -10s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .section-title {
          text-align: center;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 60px;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Hero Section */
        .hero-section {
          padding: 120px 0 80px;
          position: relative;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.6s ease-out;
        }

        .badge-icon {
          font-size: 20px;
          color: #007AFF;
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .title-line {
          display: block;
          position: relative;
          animation: fadeInUp 0.8s ease-out backwards;
        }

        .title-line:nth-child(1) {
          animation-delay: 0.2s;
        }

        .title-line:nth-child(2) {
          animation-delay: 0.4s;
        }

        .title-line::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-shadow: 
            2px 2px 0 rgba(255, 107, 157, 0.5),
            -2px -2px 0 rgba(0, 122, 255, 0.5);
          z-index: -1;
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(20% 0 60% 0); transform: translateX(2px); }
          20% { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
          30% { clip-path: inset(40% 0 40% 0); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #007AFF, #FF6B9D, #8B5CF6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 60px;
          animation: fadeInUp 1s ease-out backwards;
          animation-delay: 0.6s;
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

        /* Social Links - Fixed Icon Centering */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .social-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 28px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-decoration: none;
          color: white;
          transition: all 0.4s ease;
          overflow: hidden;
          backdrop-filter: blur(10px);
          min-height: 120px;
        }

        .social-card:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: var(--hover-color);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.3);
        }

        .social-icon {
          font-size: 32px;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-card:hover .social-icon {
          transform: rotateY(360deg) scale(1.2);
          color: var(--hover-color);
        }

        .social-name {
          font-size: 0.95rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .social-glow {
          position: absolute;
          inset: -100%;
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.4s ease;
        }

        .social-card:hover .social-glow {
          opacity: 0.3;
        }

        /* Why Choose Us - Fixed Icon Centering */
        .why-section {
          padding: 80px 0;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .why-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .why-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .why-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          font-size: 36px;
          color: white;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        .why-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        .why-card p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* Contact Info - Fixed Icon Centering */
        .info-section {
          padding: 60px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-card {
          position: relative;
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          text-align: center;
          overflow: hidden;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
          text-decoration: none;
          color: white;
          display: block;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .info-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .info-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          font-size: 36px;
          color: white;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        .info-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .card-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        /* Working Hours - Fixed Icon Centering */
        .hours-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .hours-wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
        }

        .hours-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .hours-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .hours-icon {
          font-size: 56px;
          color: #007AFF;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .hours-header h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .hours-header p {
          color: rgba(255, 255, 255, 0.7);
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hours-item {
          display: flex;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .hours-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .hours-day {
          font-weight: 700;
          min-width: 150px;
        }

        .hours-dots {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0, rgba(255, 255, 255, 0.3) 4px, transparent 4px, transparent 8px);
          margin: 0 16px;
        }

        .hours-time {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Form Section - Fixed Icon Centering */
        .form-section {
          padding: 80px 0 120px;
        }

        .form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .form-container {
          position: relative;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }

        .form-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .form-header-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .form-header-icon {
          font-size: 56px;
          color: #007AFF;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .form-header h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .form-header p {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Tabs */
        .contact-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-color: #007AFF;
          color: white;
        }

        .tab-btn svg {
          font-size: 18px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
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
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-group label svg {
          font-size: 18px;
          color: #007AFF;
        }

        .form-group input,
        .form-group textarea {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007AFF;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 40px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .submit-btn:hover::before {
          transform: translateX(100%);
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

        .form-decoration {
          position: absolute;
          inset: -100px;
          pointer-events: none;
          z-index: 1;
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          animation: decoFloat 15s ease-in-out infinite;
        }

        .deco-1 {
          width: 300px;
          height: 300px;
          background: #007AFF;
          top: -150px;
          right: -150px;
        }

        .deco-2 {
          width: 250px;
          height: 250px;
          background: #FF6B9D;
          bottom: -125px;
          left: -125px;
          animation-delay: -5s;
        }

        .deco-3 {
          width: 200px;
          height: 200px;
          background: #8B5CF6;
          top: 50%;
          right: -100px;
          animation-delay: -10s;
        }

        @keyframes decoFloat {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-30px, 30px); }
        }

        /* Testimonials */
        .testimonials-section {
          padding: 80px 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .testimonial-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .testimonial-content {
          margin-bottom: 24px;
        }

        .testimonial-content p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonial-author img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid #007AFF;
        }

        .testimonial-author h4 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .testimonial-author p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Map Section */
        .map-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .map-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .map-overlay {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
        }

        .map-info {
          padding: 32px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          max-width: 320px;
        }

        .map-pin-icon {
          font-size: 40px;
          color: #FF6B9D;
          margin-bottom: 16px;
        }

        .map-info h3 {
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .map-info p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .map-btn {
          margin-top: 20px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .map-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.5);
        }

        /* Success Modal */
        .success-modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .success-content {
          max-width: 500px;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          text-align: center;
          backdrop-filter: blur(20px);
          animation: scaleIn 0.4s ease-out;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .success-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3DDC84, #07C160);
          border-radius: 50%;
          font-size: 56px;
          color: white;
          box-shadow: 0 20px 60px rgba(61, 220, 132, 0.5);
          animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .success-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .success-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .success-close {
          padding: 16px 48px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
        }

        .success-close:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.6);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-tabs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
          }

          .hero-title {
            font-size: clamp(36px, 10vw, 64px);
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 40px;
          }

          .social-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .why-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .hours-wrapper {
            padding: 40px 24px;
          }

          .hours-day {
            min-width: 120px;
          }

          .form-container {
            padding: 40px 24px;
          }

          .form-header-icon {
            font-size: 48px;
          }

          .form-header h2 {
            font-size: 2rem;
          }

          .contact-tabs {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .submit-btn {
            padding: 16px 32px;
            font-size: 1rem;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .map-overlay {
            position: static;
            padding: 24px;
          }

          .map-info {
            max-width: 100%;
          }

          .success-content {
            margin: 0 20px;
            padding: 40px 24px;
          }

          .success-icon {
            width: 80px;
            height: 80px;
            font-size: 48px;
          }

          .success-content h3 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-badge {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .badge-icon {
            font-size: 18px;
          }

          .hero-title {
            margin-bottom: 20px;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }

          .social-card {
            padding: 20px 16px;
          }

          .social-icon {
            font-size: 28px;
          }

          .info-card {
            padding: 32px 24px;
          }

          .info-icon {
            width: 70px;
            height: 70px;
            font-size: 32px;
          }

          .hours-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .hours-dots {
            display: none;
          }

          .form-container {
            padding: 32px 20px;
          }

          .form-header h2 {
            font-size: 1.75rem;
          }

          .form-header p {
            font-size: 0.95rem;
          }

          .form-group input,
          .form-group textarea {
            padding: 14px 16px;
            font-size: 0.95rem;
          }

          .tab-btn {
            font-size: 0.85rem;
            padding: 14px 16px;
          }

          .testimonial-card {
            padding: 28px 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;