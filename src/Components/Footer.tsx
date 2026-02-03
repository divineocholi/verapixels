import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  CheckCircle,
  Heart,
  AlertCircle
} from 'lucide-react';
import logo from "../assets/verapixels_icon_logo_final.jpg";
import { Client, Databases, ID, Query } from 'appwrite';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6933f4610012182c4b1d');

  const databases = new Databases(client);

  const DATABASE_ID = '6933f49b00278d1abf56';
  const COLLECTION_ID = '693443360011a536a28f';

  const handleNewsletterSubmit = async () => {
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('email', email.toLowerCase())]
      );

      if (response.documents.length > 0) {
        setError('This email is already subscribed to our newsletter');
        setIsSubmitting(false);
        return;
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          email: email.toLowerCase(),
          subscribedAt: new Date().toISOString(),
        }
      );

      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err) {
      console.error('Error subscribing:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewsletterSubmit();
    }
  };

  const aboutLinks = [
    { name: 'About Verapixels', path: '/aboutverapixels' },
    { name: 'Our Core Team', path: '/ourcoreteam' },
    { name: 'How We Work', path: '/howweworkandfunction' }
  ];

  const serviceLinks = [
    { name: 'Web Development', path: '/webdevelopment' },
    { name: 'Mobile App Development', path: '/mobileappdevelopment' },
    { name: 'UI/UX Design', path: '/uiuxdesign' },
    { name: 'Graphic Design', path: '/graphicsdesign' }
  ];

  const portfolioLinks = [
    { name: 'All Projects', path: '/allprojects' },
    { name: 'Case Studies', path: '/casestudies' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: 'facebook', url: '#', color: '#1877F2', name: 'Facebook' },
    { icon: 'twitter', url: '#', color: '#1DA1F2', name: 'Twitter' },
    { icon: 'instagram', url: '#', color: '#E4405F', name: 'Instagram' },
    { icon: 'linkedin', url: '#', color: '#0A66C2', name: 'LinkedIn' },
    { icon: 'tiktok', url: '#', color: '#000000', name: 'TikTok' },
    { icon: 'whatsapp', url: '#', color: '#25D366', name: 'WhatsApp' },
    { icon: 'youtube', url: '#', color: '#FF0000', name: 'YouTube' },
    { icon: 'github', url: '#', color: '#333333', name: 'GitHub' }
  ];

  const renderSocialIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
      twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      instagram: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a5 5 0 015 5v11a5 5 0 01-5 5h-11a5 5 0 01-5-5v-11a5 5 0 015-5z',
      linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
      tiktok: 'M9 12a4 4 0 104 4V6a8 8 0 006 2',
      whatsapp: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
      youtube: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l0-6.53 5.75 3.27-5.75 3.26z',
      github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'
    };

    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={iconMap[icon]} />
      </svg>
    );
  };

  return (
    <footer className="vp-footer">
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
          <div className="newsletter-card">
            <div className="newsletter-header">
              <div className="newsletter-badge">
                <Mail size={16} />
                <span>Newsletter</span>
              </div>
              <h3>Stay Updated with Verapixels</h3>
              <p>Get exclusive insights, tech trends, and project updates delivered straight to your inbox</p>
            </div>
            
            <div className="newsletter-form">
              <div className="newsletter-input-group">
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
                <button onClick={handleNewsletterSubmit} disabled={isSubmitting} className="subscribe-btn">
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="newsletter-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {isSubscribed && (
                <div className="newsletter-success">
                  <CheckCircle size={18} />
                  <span>Successfully subscribed! Check your email for confirmation.</span>
                </div>
              )}
            </div>

            <div className="newsletter-features">
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Weekly tech insights</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Exclusive offers</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>No spam, unsubscribe anytime</span>
              </div>
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
                <img src={logo} alt="Verapixels Logo" />
                <span>Verapixels</span>
              </div>
              <p className="brand-description">
                Transforming ideas into powerful digital solutions. We build cutting-edge web and mobile applications that drive business growth.
              </p>
              
              <div className="contact-info">
                <a href="tel:+2348160847613" className="contact-item">
                  <Phone size={20} />
                  <span>+234 816 084 7613</span>
                </a>
                <a href="mailto:info@verapixels.com" className="contact-item">
                  <Mail size={20} />
                  <span>info@verapixels.com</span>
                </a>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

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
                    {renderSocialIcon(social.icon)}
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
                      <ArrowRight className="link-icon" size={14} />
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
                      <ArrowRight className="link-icon" size={14} />
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
                      <ArrowRight className="link-icon" size={14} />
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
                      <ArrowRight className="link-icon" size={14} />
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
             <p>© 2025–{new Date().getFullYear()} Verapixels. All rights reserved.</p>
            </p>
            <p className="made-with">
              Made with <Heart className="heart-icon" size={16} /> by Verapixels Team
            </p>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .vp-footer {
          background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
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
          filter: blur(100px);
          opacity: 0.15;
          animation: orbFloat 25s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -250px;
          left: -250px;
        }

        .orb-2 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: -200px;
          right: -200px;
          animation-delay: -10s;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -15s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .footer-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
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
          padding: 100px 0 80px;
        }

        .newsletter-card {
          max-width: 900px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .newsletter-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        }

        .newsletter-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .newsletter-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(102, 126, 234, 0.2);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #a5b4fc;
          margin-bottom: 16px;
        }

        .newsletter-header h3 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-header p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .newsletter-input-group {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        .input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
          z-index: 1;
        }

        .input-wrapper input {
          width: 100%;
          padding: 16px 20px 16px 52px;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-wrapper input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: rgba(0, 0, 0, 0.4);
        }

        .input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-wrapper input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .subscribe-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .subscribe-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
        }

        .subscribe-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .newsletter-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.875rem;
          font-weight: 500;
          animation: slideInUp 0.3s ease-out;
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 10px;
          color: #86efac;
          font-size: 0.875rem;
          font-weight: 500;
          animation: slideInUp 0.3s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .newsletter-features {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .feature-item svg {
          color: #86efac;
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
          background: linear-gradient(135deg, #667eea, #764ba2);
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
          color: #667eea;
          transform: translateX(5px);
        }

        .contact-item svg {
          color: #667eea;
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
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .social-link:hover::before {
          opacity: 0.2;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
        }

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
          background: linear-gradient(90deg, #667eea, #764ba2);
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
          color: #667eea;
          transform: translateX(5px);
        }

        .link-icon {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-links li a:hover .link-icon {
          opacity: 1;
        }

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
          color: #f5576c;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
        }

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

          .newsletter-features {
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
        }

        @media (max-width: 768px) {
          .newsletter-section {
            padding: 80px 0 60px;
          }

          .newsletter-card {
            padding: 32px 24px;
          }

          .newsletter-header h3 {
            font-size: 1.5rem;
          }

          .newsletter-input-group {
            flex-direction: column;
          }

          .subscribe-btn {
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
          .newsletter-badge {
            font-size: 0.75rem;
            padding: 6px 12px;
          }

          .newsletter-header h3 {
            font-size: 1.25rem;
          }

          .newsletter-header p {
            font-size: 0.9rem;
          }

          .input-wrapper input {
            font-size: 0.9rem;
            padding: 14px 18px 14px 48px;
          }

          .subscribe-btn {
            font-size: 0.9rem;
            padding: 14px 24px;
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
          }

          .footer-title {
            font-size: 1.1rem;
          }

          .footer-links li a {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;