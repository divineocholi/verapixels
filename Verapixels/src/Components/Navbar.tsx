import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiPhone, FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [portfolioDropdown, setPortfolioDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setMobileAboutOpen(false);
      setMobileServicesOpen(false);
      setMobilePortfolioOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileServicesOpen(false);
    setMobilePortfolioOpen(false);
  };

  return (
    <header className="vp-nav">
      <div className="vp-nav-inner">
        <div className="vp-brand">
          <div className="vp-brand-left">
            <img src="/src/assets/verapixels_logo_icon.jpg" alt="Verapixel" />
            <span className="vp-name">Verapixels</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="vp-links">
            <Link to="/">Home</Link>
            
            {/* About with Dropdown */}
            <div 
              className="vp-dropdown-wrapper"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <span className="vp-dropdown-trigger">
                About <FiChevronDown className="dropdown-icon" />
              </span>
              
              {aboutDropdown && (
                <div className="vp-dropdown-menu">
                  <Link to="/aboutverapixels" className="vp-dropdown-item">About Verapixels</Link>
                  <Link to="/ourcoreteam" className="vp-dropdown-item">Our Core Team</Link>
                  <Link to="/howweworkandfunction" className="vp-dropdown-item">How We Work and Function</Link>
                </div>
              )}
            </div>

            {/* Services with Dropdown */}
            <div 
              className="vp-dropdown-wrapper"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <span className="vp-dropdown-trigger">
                Services <FiChevronDown className="dropdown-icon" />
              </span>
              
              {servicesDropdown && (
                <div className="vp-dropdown-menu">
                  <Link to="/webdevelopment" className="vp-dropdown-item">Web Development</Link>
                  <Link to="/mobileappdevelopment" className="vp-dropdown-item">Mobile App Development</Link>
                  <Link to="/uiuxdesign" className="vp-dropdown-item">UI/UX Design</Link>
                  <Link to="/graphicdesign" className="vp-dropdown-item">Graphic Design</Link>
                  <Link to="/cybersecurity" className="vp-dropdown-item">Cybersecurity</Link>
                  <Link to="/digitalmarketing" className="vp-dropdown-item">Digital Marketing</Link>
                </div>
              )}
            </div>

            {/* Portfolio with Dropdown */}
            <div 
              className="vp-dropdown-wrapper"
              onMouseEnter={() => setPortfolioDropdown(true)}
              onMouseLeave={() => setPortfolioDropdown(false)}
            >
              <span className="vp-dropdown-trigger">
                Portfolio <FiChevronDown className="dropdown-icon" />
              </span>
              
              {portfolioDropdown && (
                <div className="vp-dropdown-menu">
                  <Link to="/allprojects" className="vp-dropdown-item">All Projects</Link>
                  <Link to="/casestudies" className="vp-dropdown-item">Case Studies</Link>
                </div>
              )}
            </div>
        
            <Link to="/career">Career</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="vp-mobile-menu-btn" onClick={toggleMobileMenu}>
            <FiMenu className="menu-icon" />
            <span className="menu-text">Menu</span>
          </button>

          <div className="vp-phone">
            <Link to="/contact" className="vp-phone-btn">
              <FiPhone className="phone-icon" />
              <span className="phone-text">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="vp-nav-underline" />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="vp-mobile-overlay" onClick={closeMobileMenu} />
          <div className="vp-mobile-menu">
            <div className="vp-mobile-header">
              <span className="vp-mobile-title">Navigation</span>
              <button className="vp-mobile-close" onClick={closeMobileMenu}>
                <FiX />
              </button>
            </div>

            <nav className="vp-mobile-nav">
              <Link to="/" className="vp-mobile-link" onClick={closeMobileMenu}>Home</Link>

              {/* Mobile About Accordion */}
              <div className="vp-mobile-accordion">
                <button 
                  className="vp-mobile-link vp-accordion-trigger"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                >
                  About 
                  <FiChevronDown className={`accordion-icon ${mobileAboutOpen ? 'open' : ''}`} />
                </button>
                {mobileAboutOpen && (
                  <div className="vp-mobile-submenu">
                    <Link to="/aboutverapixels" className="vp-mobile-sublink" onClick={closeMobileMenu}>About Verapixels</Link>
                    <Link to="/ourcoreteam" className="vp-mobile-sublink" onClick={closeMobileMenu}>Our Core Team</Link>
                    <Link to="/howweworkandfunction" className="vp-mobile-sublink" onClick={closeMobileMenu}>How We Work and Function</Link>
                  </div>
                )}
              </div>

              {/* Mobile Services Accordion */}
              <div className="vp-mobile-accordion">
                <button 
                  className="vp-mobile-link vp-accordion-trigger"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services 
                  <FiChevronDown className={`accordion-icon ${mobileServicesOpen ? 'open' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="vp-mobile-submenu">
                    <Link to="/webdevelopment" className="vp-mobile-sublink" onClick={closeMobileMenu}>Web Development</Link>
                    <Link to="/mobileappdevelopment" className="vp-mobile-sublink" onClick={closeMobileMenu}>Mobile App Development</Link>
                    <Link to="/uiuxdesign" className="vp-mobile-sublink" onClick={closeMobileMenu}>UI/UX Design</Link>
                    <Link to="/graphicdesign" className="vp-mobile-sublink" onClick={closeMobileMenu}>Graphic Design</Link>
                    <Link to="/cybersecurity" className="vp-mobile-sublink" onClick={closeMobileMenu}>Cybersecurity</Link>
                    <Link to="/digitalmarketing" className="vp-mobile-sublink" onClick={closeMobileMenu}>Digital Marketing</Link>
                  </div>
                )}
              </div>

              {/* Mobile Portfolio Accordion */}
              <div className="vp-mobile-accordion">
                <button 
                  className="vp-mobile-link vp-accordion-trigger"
                  onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
                >
                  Portfolio 
                  <FiChevronDown className={`accordion-icon ${mobilePortfolioOpen ? 'open' : ''}`} />
                </button>
                {mobilePortfolioOpen && (
                  <div className="vp-mobile-submenu">
                    <Link to="/allprojects" className="vp-mobile-sublink" onClick={closeMobileMenu}>All Projects</Link>
                    <Link to="/casestudies" className="vp-mobile-sublink" onClick={closeMobileMenu}>Case Studies</Link>
                  </div>
                )}
              </div>

              <Link to="/career" className="vp-mobile-link" onClick={closeMobileMenu}>Career</Link>

              <Link to="/contact" className="vp-mobile-cta" onClick={closeMobileMenu}>
                <FiPhone /> Contact Us
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;