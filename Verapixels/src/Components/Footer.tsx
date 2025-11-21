import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/verapixels_logo_icon.jpg";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiArrowRight,
  FiCheckCircle,
  FiHeart
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaGithub
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your actual newsletter API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }, 1500);
  };

  const aboutLinks = [
    { name: 'About Verapixels', path: '/aboutverapixels' },
    { name: 'Our Core Team', path: '/ourcoreteam' },
    { name: 'How We Work', path: '/howweworkandfunction' },
    { name: 'Client Portfolio', path: '/clientportfolio' },
    { name: 'Testimonials', path: '/clienttestimonials' },
    { name: 'CSR', path: '/corporatesocialresponsibility' },
    { name: 'Careers', path: '/startyourcareerwithus' }
  ];

  const serviceLinks = [
    { name: 'Web Development', path: '/webdevelopment' },
    { name: 'Mobile App Development', path: '/mobileappdevelopment' },
    { name: 'UI/UX Design', path: '/uiuxdesign' },
    { name: 'Cloud Solutions', path: '/cloudsolutions' },
    { name: 'DevOps Services', path: '/devopsservices' },
    { name: 'Cybersecurity', path: '/cybersecurity' },
    { name: 'Digital Marketing', path: '/digitalmarketing' }
  ];

  const portfolioLinks = [
    { name: 'All Projects', path: '/allprojects' },
    { name: 'Web Applications', path: '/webapplications' },
    { name: 'Mobile Apps', path: '/mobileapps' },
    { name: 'E-commerce Solutions', path: '/ecommercesolutions' },
    { name: 'Enterprise Software', path: '/enterprisesoftware' },
    { name: 'Case Studies', path: '/casestudies' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: '#', color: '#1877F2', name: 'Facebook' },
    { icon: <FaTwitter />, url: '#', color: '#1DA1F2', name: 'Twitter' },
    { icon: <FaInstagram />, url: '#', color: '#E4405F', name: 'Instagram' },
    { icon: <FaLinkedinIn />, url: '#', color: '#0A66C2', name: 'LinkedIn' },
    { icon: <FaTiktok />, url: '#', color: '#000000', name: 'TikTok' },
    { icon: <FaWhatsapp />, url: '#', color: '#25D366', name: 'WhatsApp' },
    { icon: <FaYoutube />, url: '#', color: '#FF0000', name: 'YouTube' },
    { icon: <FaGithub />, url: '#', color: '#333333', name: 'GitHub' }
  ];

  return (
    <footer className="vp-footer">
      {/* Animated Background */}
      <div className="footer-bg">
        <div className="footer-orbs">
          <div className="footer-orb orb-1"></div>
          <div className="footer-orb orb-2"></div>
          <div className="footer-orb orb-3"></div>
        </div>
        <div className="footer-grid-pattern"></div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <div className="newsletter-icon">
                <FiMail />
              </div>
              <div className="newsletter-text">
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get the latest updates, insights, and exclusive offers delivered to your inbox</p>
              </div>
            </div>
            <div className="newsletter-form-wrapper">
              <div className="newsletter-input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubmit(e)}
                />
                <button onClick={handleNewsletterSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
              {isSubscribed && (
                <div className="newsletter-success">
                  <FiCheckCircle />
                  <span>Successfully subscribed! Check your email for confirmation.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col footer-brand">
              <div className="brand-logo">
                <img src={logo} alt="Verapixels" />
                <span>Verapixels</span>
              </div>
              <p className="brand-description">
                Transforming ideas into powerful digital solutions. We build cutting-edge web and mobile applications that drive business growth.
              </p>
              
              <div className="contact-info">
                <a href="tel:+15551234567" className="contact-item">
                  <FiPhone />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a href="mailto:hello@verapixels.com" className="contact-item">
                  <FiMail />
                  <span>hello@verapixels.com</span>
                </a>
                <div className="contact-item">
                  <FiMapPin />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link"
                    style={{ '--social-color': social.color } as React.CSSProperties}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* About Links */}
            <div className="footer-col">
              <h4 className="footer-title">About Us</h4>
              <ul className="footer-links">
                {aboutLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <FiArrowRight className="link-icon" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="footer-col">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                {serviceLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <FiArrowRight className="link-icon" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio Links */}
            <div className="footer-col">
              <h4 className="footer-title">Portfolio</h4>
              <ul className="footer-links">
                {portfolioLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <FiArrowRight className="link-icon" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <FiArrowRight className="link-icon" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Verapixels. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FiHeart className="heart-icon" /> by Verapixels Team
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms</Link>
              <span className="separator">•</span>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
         .vp-footer {
          background: #000000;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .footer-orbs {
          position: absolute;
          inset: 0;
        }

        .footer-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: orbPulse 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: #007AFF;
          top: -300px;
          left: -300px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #FF6B9D;
          bottom: -250px;
          right: -250px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        .footer-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Newsletter Section */
        .newsletter-section {
          padding: 80px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .newsletter-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #007AFF, #FF6B9D, transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        .newsletter-content {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .newsletter-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 20px;
          font-size: 36px;
          flex-shrink: 0;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconBounce 3s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .newsletter-text h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-text p {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .newsletter-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .newsletter-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .newsletter-input-wrapper:focus-within {
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .input-icon {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.5);
          margin-left: 16px;
        }

        .newsletter-input-wrapper input {
          flex: 1;
          padding: 16px;
          background: transparent;
          border: none;
          color: white;
          font-size: 1rem;
          outline: none;
        }

        .newsletter-input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input-wrapper button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-input-wrapper button:hover:not(:disabled) {
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.5);
        }

        .newsletter-input-wrapper button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(61, 220, 132, 0.1);
          border: 1px solid rgba(61, 220, 132, 0.3);
          border-radius: 12px;
          color: #3DDC84;
          font-weight: 600;
          animation: slideInUp 0.4s ease-out;
        }

        .newsletter-success svg {
          font-size: 24px;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Main Footer */
        .footer-main {
          padding: 80px 0 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(4, 1fr);
          gap: 60px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Brand Column */
        .footer-brand {
          padding-right: 40px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .brand-logo img {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
        }

        .brand-logo span {
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-description {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          color: #007AFF;
          transform: translateX(5px);
        }

        .contact-item svg {
          font-size: 20px;
          color: #007AFF;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 20px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--social-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          border-color: var(--social-color);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.3);
        }

        .social-link:hover::before {
          opacity: 0.2;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
        }

        /* Footer Links */
        .footer-title {
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: 4px;
          color: white;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #007AFF, #FF6B9D);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links li a {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-links li a:hover {
          color: #007AFF;
          transform: translateX(5px);
        }

        .link-icon {
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-links li a:hover .link-icon {
          opacity: 1;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding: 32px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright,
        .made-with {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .heart-icon {
          color: #FF6B9D;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #007AFF;
        }

        .separator {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 40px;
          }

          .footer-col:nth-child(4),
          .footer-col:nth-child(5) {
            grid-column: span 1;
          }
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }

          .footer-brand {
            grid-column: span 2;
            padding-right: 0;
          }
        }

        @media (max-width: 768px) {
          .newsletter-section {
            padding: 60px 0;
          }

          .newsletter-wrapper {
            padding: 40px 24px;
          }

          .newsletter-content {
            flex-direction: column;
            text-align: center;
          }

          .newsletter-text h3 {
            font-size: 1.5rem;
          }

          .newsletter-input-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .newsletter-input-wrapper button {
            width: 100%;
            justify-content: center;
          }

          .footer-main {
            padding: 60px 0 40px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-brand {
            grid-column: span 1;
          }

          .social-links {
            justify-content: center;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .newsletter-icon {
            width: 64px;
            height: 64px;
            font-size: 28px;
          }

          .newsletter-text h3 {
            font-size: 1.25rem;
          }

          .newsletter-text p {
            font-size: 0.95rem;
          }

          .brand-logo img {
            width: 40px;
            height: 40px;
          }

          .brand-logo span {
            font-size: 1.25rem;
          }

          .social-link {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .footer-title {
            font-size: 1.1rem;
          }

          .footer-links li a {
            font-size: 0.9rem;
          }

          .footer-bottom-links {
            flex-direction: column;
            gap: 8px;
          }

          .separator {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;