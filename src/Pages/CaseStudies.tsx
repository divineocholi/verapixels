import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  approach: string[];
  screenshots: { title: string; image: string; description: string; }[];
  results: { metric: string; value: string; description: string; }[];
  technologies: string[];
  testimonial: { text: string; author: string; role: string; image: string; };
  color: string;
}

const CaseStudies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get case study ID from URL or location state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const caseId = searchParams.get('caseId');
    
    if (caseId) {
      setSelectedCase(parseInt(caseId));
    } else if (location.state?.caseStudyId) {
      setSelectedCase(location.state.caseStudyId);
    }
    
    // Check localStorage for case study data from services page
    const storedCaseStudy = localStorage.getItem('selectedCaseStudy');
    if (storedCaseStudy) {
      const caseStudy = JSON.parse(storedCaseStudy);
      setSelectedCase(caseStudy.id);
      localStorage.removeItem('selectedCaseStudy'); // Clean up
    }
  }, [location]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "TechFlow Dashboard",
      category: "Website",
      client: "TechFlow Inc.",
      year: "2025",
      duration: "4 months",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=800&fit=crop",
      description: "A comprehensive SaaS platform designed to revolutionize how teams manage their workflows and analytics.",
      challenge: "TechFlow needed a modern, scalable dashboard that could handle real-time data from multiple sources while maintaining exceptional performance. Their legacy system was slow, unintuitive, and couldn't meet growing user demands.",
      solution: "We built a cutting-edge React-based dashboard with real-time WebSocket connections, micro-frontend architecture, and advanced data visualization. The platform features customizable widgets, AI-powered insights, and seamless third-party integrations.",
      approach: [
        "Conducted comprehensive user research with 50+ stakeholders",
        "Created interactive prototypes and tested with target users",
        "Implemented modular component architecture for scalability",
        "Optimized performance with code splitting and lazy loading",
        "Integrated advanced analytics and reporting features"
      ],
      screenshots: [
        { title: "Dashboard Overview", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop", description: "Clean, intuitive dashboard with real-time metrics" },
        { title: "Analytics Section", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop", description: "Advanced analytics with interactive charts" },
        { title: "Team Collaboration", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=700&fit=crop", description: "Real-time collaboration features" },
        { title: "Mobile Experience", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop", description: "Fully responsive design" }
      ],
      results: [
        { metric: "User Growth", value: "+250%", description: "Increase in active users within 6 months" },
        { metric: "Performance", value: "95/100", description: "Lighthouse performance score" },
        { metric: "Satisfaction", value: "4.9/5", description: "Average user rating" },
        { metric: "Load Time", value: "-70%", description: "Reduction in page load time" }
      ],
      technologies: ["React", "TypeScript", "Node.js", "WebSocket", "AWS", "MongoDB"],
      testimonial: {
        text: "Verapixels transformed our vision into reality. The dashboard exceeded all expectations.",
        author: "Sarah Mitchell",
        role: "CEO, TechFlow Inc.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
      },
      color: "#0063f4"
    },
    {
      id: 2,
      title: "Nexus Brand Identity",
      category: "Logo Design",
      client: "Nexus Corp",
      year: "2025",
      duration: "2 months",
      heroImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1400&h=800&fit=crop",
      description: "Complete brand identity system for a tech startup entering the AI automation space.",
      challenge: "Nexus Corp needed a distinctive brand identity that would stand out in the crowded tech market while conveying innovation, trust, and sophistication.",
      solution: "We created a modern, memorable brand identity featuring a dynamic logo that represents connectivity and innovation. The comprehensive system includes logo variations, color palette, typography, and brand guidelines.",
      approach: [
        "Market research and competitor analysis",
        "Brand strategy and positioning workshops",
        "Concept exploration with 15+ initial directions",
        "Iterative refinement based on stakeholder feedback",
        "Comprehensive brand guidelines documentation"
      ],
      screenshots: [
        { title: "Logo Design", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=700&fit=crop", description: "Primary logo with variations" },
        { title: "Color System", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=700&fit=crop", description: "Carefully curated color palette" },
        { title: "Brand Applications", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=700&fit=crop", description: "Logo across business materials" },
        { title: "Digital Presence", image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=1200&h=700&fit=crop", description: "Brand in digital contexts" }
      ],
      results: [
        { metric: "Recognition", value: "+320%", description: "Increase in brand awareness" },
        { metric: "Impact", value: "A+", description: "Top tier memorability rating" },
        { metric: "Consistency", value: "100%", description: "Guidelines adherence" },
        { metric: "Rollout", value: "8 weeks", description: "Concept to completion" }
      ],
      technologies: ["Adobe Illustrator", "Figma", "After Effects", "Photoshop"],
      testimonial: {
        text: "The brand identity perfectly captures who we are and where we're going.",
        author: "Marcus Chen",
        role: "Founder, Nexus Corp",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
      },
      color: "#00ff88"
    },
    {
      id: 3,
      title: "FinanceHub Portal",
      category: "Website",
      client: "FinanceHub",
      year: "2024",
      duration: "5 months",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=800&fit=crop",
      description: "Comprehensive financial management platform for modern businesses and entrepreneurs.",
      challenge: "FinanceHub needed a secure, intuitive platform to help businesses manage finances, track expenses, and generate reports.",
      solution: "We developed a modern web portal with bank-grade security, real-time synchronization, automated reporting, and intuitive data visualization.",
      approach: [
        "Security-first architecture with encrypted data",
        "User-centered design with usability testing",
        "Integration with banking APIs",
        "Automated workflows for financial tasks",
        "Advanced reporting with custom templates"
      ],
      screenshots: [
        { title: "Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop", description: "Financial dashboard with insights" },
        { title: "Transactions", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=700&fit=crop", description: "Transaction tracking" },
        { title: "Reports", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop", description: "Custom report generation" },
        { title: "Invoices", image: "https://images.unsplash.com/photo-1554224311-beee4f8a3fc7?w=1200&h=700&fit=crop", description: "Invoice management" }
      ],
      results: [
        { metric: "Users", value: "50K+", description: "Monthly active users" },
        { metric: "Uptime", value: "99.9%", description: "System reliability" },
        { metric: "Speed", value: "-85%", description: "Processing time reduction" },
        { metric: "Savings", value: "$2M+", description: "Annual client savings" }
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Plaid", "Stripe"],
      testimonial: {
        text: "This platform revolutionized how we handle finances. The automation saved us hundreds of hours.",
        author: "Jennifer Williams",
        role: "CFO, FinanceHub",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
      },
      color: "#ffd700"
    },
    {
      id: 4,
      title: "Design System Pro",
      category: "UI/UX Design",
      client: "DesignCo",
      year: "2025",
      duration: "6 months",
      heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=800&fit=crop",
      description: "Enterprise-grade design system serving multiple products and platforms.",
      challenge: "DesignCo had 12 different products with inconsistent design patterns, causing confusion and inefficiency.",
      solution: "We created a comprehensive design system with 200+ reusable components, detailed documentation, design tokens, and accessibility guidelines.",
      approach: [
        "Audit of existing products",
        "Collaborative design workshops",
        "Component library with atomic design",
        "Comprehensive documentation",
        "WCAG AA accessibility testing"
      ],
      screenshots: [
        { title: "Components", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=700&fit=crop", description: "Reusable UI components" },
        { title: "Design Tokens", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=700&fit=crop", description: "Centralized design tokens" },
        { title: "Documentation", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2c8?w=1200&h=700&fit=crop", description: "Interactive docs" },
        { title: "Accessibility", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=700&fit=crop", description: "Built-in a11y tools" }
      ],
      results: [
        { metric: "Components", value: "200+", description: "Reusable components" },
        { metric: "Adoption", value: "95%", description: "Team usage rate" },
        { metric: "Speed", value: "+60%", description: "Development efficiency" },
        { metric: "Consistency", value: "98%", description: "UI consistency score" }
      ],
      technologies: ["Figma", "React", "Storybook", "TypeScript", "CSS-in-JS"],
      testimonial: {
        text: "This design system transformed how we work. Our teams are more efficient and our products more consistent.",
        author: "Alex Rodriguez",
        role: "Head of Design, DesignCo",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      },
      color: "#9d4edd"
    }
  ];

  const selectedCaseData = caseStudies.find(cs => cs.id === selectedCase);

  // Handle back button click
  const handleBackClick = () => {
    setSelectedCase(null);
    navigate('/casestudies'); // Navigate back to overview
  };

  // Handle case study click from overview
  const handleCaseSelect = (id: number) => {
    setSelectedCase(id);
    // Update URL without page reload
    navigate(`/casestudies?caseId=${id}`, { replace: true });
  };

  if (selectedCase && selectedCaseData) {
    return (
      <div className="case-detail">
        <div className="bg-gradient">
          <div className="orb orb-1" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }} />
          <div className="orb orb-2" style={{ transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)` }} />
        </div>

        <section className="detail-hero" style={{ background: `linear-gradient(135deg, ${selectedCaseData.color}15, transparent)` }}>
          <button className="back-btn" onClick={handleBackClick}>← Back to All Cases</button>
          
          <div className="hero-content">
            <div className="hero-tags">
              <span className="tag" style={{ borderColor: selectedCaseData.color, color: selectedCaseData.color }}>{selectedCaseData.category}</span>
              <span className="tag" style={{ borderColor: selectedCaseData.color, color: selectedCaseData.color }}>{selectedCaseData.year}</span>
            </div>
            
            <h1 className="detail-title">{selectedCaseData.title}</h1>
            <p className="detail-subtitle">{selectedCaseData.description}</p>
            
            <div className="hero-meta">
              <div className="meta-item"><span className="meta-label">Client</span><span className="meta-value">{selectedCaseData.client}</span></div>
              <div className="meta-item"><span className="meta-label">Duration</span><span className="meta-value">{selectedCaseData.duration}</span></div>
              <div className="meta-item"><span className="meta-label">Year</span><span className="meta-value">{selectedCaseData.year}</span></div>
            </div>
          </div>

          <div className="hero-image-container">
            <img src={selectedCaseData.heroImage} alt={selectedCaseData.title} className="hero-image" />
            <div className="image-glow" style={{ background: selectedCaseData.color }} />
          </div>
        </section>

        <section className="content-section">
          <div className="content-grid">
            <div className="content-block">
              <h2 className="section-title" style={{ color: selectedCaseData.color }}>The Challenge</h2>
              <p className="section-text">{selectedCaseData.challenge}</p>
            </div>
            <div className="content-block">
              <h2 className="section-title" style={{ color: selectedCaseData.color }}>Our Solution</h2>
              <p className="section-text">{selectedCaseData.solution}</p>
            </div>
          </div>
        </section>

        <section className="approach-section">
          <h2 className="section-title centered" style={{ color: selectedCaseData.color }}>Our Approach</h2>
          <div className="approach-grid">
            {selectedCaseData.approach.map((step, idx) => (
              <div key={idx} className="approach-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="approach-number" style={{ background: selectedCaseData.color }}>{idx + 1}</div>
                <p className="approach-text">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="screenshots-section">
          <h2 className="section-title centered" style={{ color: selectedCaseData.color }}>Visual Journey</h2>
          <div className="screenshots-grid">
            {selectedCaseData.screenshots.map((screenshot, idx) => (
              <div key={idx} className="screenshot-item" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="screenshot-image-wrapper">
                  <img src={screenshot.image} alt={screenshot.title} className="screenshot-image" />
                  <div className="screenshot-overlay" style={{ background: `${selectedCaseData.color}20` }} />
                </div>
                <h3 className="screenshot-title">{screenshot.title}</h3>
                <p className="screenshot-desc">{screenshot.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="results-section" style={{ background: `linear-gradient(180deg, transparent, ${selectedCaseData.color}10, transparent)` }}>
          <h2 className="section-title centered" style={{ color: selectedCaseData.color }}>Impact & Results</h2>
          <div className="results-grid">
            {selectedCaseData.results.map((result, idx) => (
              <div key={idx} className="result-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="result-value" style={{ color: selectedCaseData.color }}>{result.value}</div>
                <div className="result-metric">{result.metric}</div>
                <div className="result-desc">{result.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="tech-section">
          <h2 className="section-title centered" style={{ color: selectedCaseData.color }}>Technologies Used</h2>
          <div className="tech-grid">
            {selectedCaseData.technologies.map((tech, idx) => (
              <div key={idx} className="tech-item" style={{ borderColor: selectedCaseData.color, animationDelay: `${idx * 0.05}s` }}>{tech}</div>
            ))}
          </div>
        </section>

        <section className="testimonial-section">
          <div className="testimonial-card" style={{ borderColor: selectedCaseData.color }}>
            <div className="quote-icon" style={{ color: selectedCaseData.color }}>"</div>
            <p className="testimonial-text">{selectedCaseData.testimonial.text}</p>
            <div className="testimonial-author-section">
              <img src={selectedCaseData.testimonial.image} alt={selectedCaseData.testimonial.author} className="author-image" />
              <div>
                <div className="author-name">{selectedCaseData.testimonial.author}</div>
                <div className="author-role">{selectedCaseData.testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-cta">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-text">Let's create something amazing together</p>
          <button className="cta-button" style={{ background: selectedCaseData.color }}>Get in Touch</button>
        </section>

        <style>{getDetailStyles()}</style>
      </div>
    );
  }

  return (
    <div className="cases-overview">
      <div className="bg-gradient">
        <div className="orb orb-1" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }} />
        <div className="orb orb-2" style={{ transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)` }} />
        <div className="orb orb-3" style={{ transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.02}px)` }} />
      </div>

      <section className="overview-hero">
        <div className="hero-badge">✨ Success Stories</div>
        <h1 className="overview-title">Our <span className="gradient-text">Case Studies</span></h1>
        <p className="overview-subtitle">
          Discover how we've helped businesses transform their digital presence and achieve remarkable growth
        </p>
      </section>

      <section className="cases-grid">
        {caseStudies.map((study, idx) => (
          <div 
            key={study.id} 
            className="case-card" 
            style={{ animationDelay: `${idx * 0.1}s` }} 
            onClick={() => handleCaseSelect(study.id)}
          >
            <div className="card-image-wrapper">
              <img src={study.heroImage} alt={study.title} className="card-image" />
              <div className="card-overlay" style={{ background: `linear-gradient(135deg, ${study.color}80, transparent)` }} />
              <span className="card-category" style={{ background: study.color }}>{study.category}</span>
            </div>
            
            <div className="card-content">
              <h3 className="card-title">{study.title}</h3>
              <p className="card-desc">{study.description}</p>
              
              <div className="card-meta">
                <span>{study.client}</span>
                <span>{study.year}</span>
              </div>
              
              <button 
                className="view-btn" 
                style={{ color: study.color, borderColor: study.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCaseSelect(study.id);
                }}
              >
                View Case Study →
              </button>
            </div>
          </div>
        ))}
      </section>

      <style>{getOverviewStyles()}</style>
    </div>
  );
};

const getDetailStyles = () => `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap');

  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  .case-detail { 
    background: #000; 
    color: #fff; 
    min-height: 100vh; 
    position: relative; 
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }
  
  .bg-gradient { 
    position: fixed; 
    inset: 0; 
    pointer-events: none; 
    z-index: 0; 
    overflow: hidden;
  }
  
  .orb { 
    position: absolute; 
    border-radius: 50%; 
    filter: blur(140px); 
    opacity: 0.2; 
    animation: float 20s ease-in-out infinite; 
    will-change: transform;
  }
  
  .orb-1 { 
    width: 700px; 
    height: 700px; 
    background: linear-gradient(135deg, #0063f4, #00bfff); 
    top: -15%; 
    left: -15%; 
  }
  
  .orb-2 { 
    width: 600px; 
    height: 600px; 
    background: linear-gradient(135deg, #00ff88, #ffd700); 
    bottom: -15%; 
    right: -15%; 
    animation-delay: 8s; 
  }
  
  @keyframes float { 
    0%, 100% { transform: translate(0, 0) scale(1); } 
    25% { transform: translate(60px, -60px) scale(1.1); }
    50% { transform: translate(-40px, 40px) scale(0.95); } 
    75% { transform: translate(40px, 60px) scale(1.05); }
  }
  
  /* Mobile Responsive Styles for Detail Page */
  @media (max-width: 768px) {
    .bg-gradient {
      display: none; /* Hide heavy animations on mobile */
    }
    
    .case-detail {
      overflow-x: hidden;
    }
  }
  
  .detail-hero { 
    padding: 80px 20px 60px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .detail-hero { 
      padding: 60px 20px 40px; 
    }
  }
  
  .back-btn { 
    padding: 12px 24px; 
    background: rgba(255, 255, 255, 0.08); 
    border: 1px solid rgba(255, 255, 255, 0.2); 
    border-radius: 50px; 
    color: #fff; 
    font-size: 1rem; 
    font-weight: 700; 
    font-family: 'Syne', sans-serif;
    cursor: pointer; 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    margin-bottom: 40px; 
    backdrop-filter: blur(10px);
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    .back-btn { 
      padding: 10px 20px; 
      font-size: 0.9rem; 
      margin-bottom: 30px;
    }
  }
  
  .back-btn:hover { 
    background: rgba(255, 255, 255, 0.15); 
    transform: translateX(-8px); 
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .hero-content { 
    max-width: 900px; 
    margin-bottom: 60px; 
  }
  
  .hero-tags { 
    display: flex; 
    gap: 12px; 
    margin-bottom: 25px; 
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .hero-tags { 
      gap: 8px; 
      margin-bottom: 20px;
    }
  }
  
  .tag { 
    padding: 8px 16px; 
    border: 2px solid; 
    border-radius: 30px; 
    font-size: 0.8rem; 
    font-weight: 800; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .tag { 
      padding: 6px 12px; 
      font-size: 0.7rem; 
    }
  }
  
  .tag:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255,255,255,0.1);
  }
  
  .detail-title { 
    font-size: clamp(2rem, 6vw, 4rem); 
    font-weight: 800; 
    line-height: 1.1; 
    margin-bottom: 20px; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 768px) {
    .detail-title { 
      font-size: clamp(1.8rem, 8vw, 2.5rem); 
      margin-bottom: 15px;
    }
  }
  
  .detail-subtitle { 
    font-size: clamp(1rem, 3vw, 1.3rem); 
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.75); 
    margin-bottom: 35px; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both; 
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    .detail-subtitle { 
      font-size: 1.1rem; 
      margin-bottom: 25px;
    }
  }
  
  .hero-meta { 
    display: flex; 
    gap: 30px; 
    flex-wrap: wrap; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both; 
  }
  
  @media (max-width: 768px) {
    .hero-meta { 
      gap: 20px; 
    }
  }
  
  .meta-item { 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
  }
  
  @media (max-width: 768px) {
    .meta-item { 
      min-width: 100px;
    }
  }
  
  .meta-label { 
    font-size: 0.8rem; 
    color: rgba(255, 255, 255, 0.5); 
    text-transform: uppercase; 
    letter-spacing: 1.5px; 
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .meta-label { 
      font-size: 0.7rem; 
    }
  }
  
  .meta-value { 
    font-size: 1.1rem; 
    font-weight: 700; 
  }
  
  @media (max-width: 768px) {
    .meta-value { 
      font-size: 1rem; 
    }
  }
  
  .hero-image-container { 
    position: relative; 
    border-radius: 20px; 
    overflow: hidden; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both; 
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: 768px) {
    .hero-image-container { 
      border-radius: 15px; 
    }
  }
  
  .hero-image { 
    width: 100%; 
    height: auto; 
    min-height: 300px; 
    max-height: 500px; 
    object-fit: cover; 
    display: block; 
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  @media (max-width: 768px) {
    .hero-image { 
      max-height: 350px; 
      min-height: 250px;
    }
  }
  
  .hero-image-container:hover .hero-image { 
    transform: scale(1.08); 
  }
  
  .image-glow { 
    position: absolute; 
    bottom: -60%; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 90%; 
    height: 90%; 
    opacity: 0.4; 
    filter: blur(120px); 
    pointer-events: none; 
  }
  
  .content-section { 
    padding: 80px 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .content-section { 
      padding: 60px 20px; 
    }
  }
  
  .content-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 40px; 
  }
  
  @media (max-width: 768px) {
    .content-grid { 
      grid-template-columns: 1fr; 
      gap: 30px;
    }
  }
  
  .content-block { 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  .section-title { 
    font-size: clamp(1.5rem, 4vw, 2.5rem); 
    font-weight: 800; 
    margin-bottom: 20px; 
    line-height: 1.2; 
    letter-spacing: -0.01em;
  }
  
  @media (max-width: 768px) {
    .section-title { 
      font-size: 1.8rem; 
      margin-bottom: 15px;
    }
  }
  
  .section-title.centered { 
    text-align: center; 
    margin-bottom: 50px; 
    font-size: clamp(1.8rem, 5vw, 3rem);
  }
  
  @media (max-width: 768px) {
    .section-title.centered { 
      margin-bottom: 40px; 
      font-size: 2rem;
    }
  }
  
  .section-text { 
    font-size: clamp(0.95rem, 2vw, 1.15rem); 
    line-height: 1.7; 
    color: rgba(255, 255, 255, 0.8); 
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    .section-text { 
      font-size: 1rem; 
      line-height: 1.6;
    }
  }
  
  .approach-section { 
    padding: 80px 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .approach-section { 
      padding: 60px 20px; 
    }
  }
  
  .approach-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 20px; 
  }
  
  @media (max-width: 768px) {
    .approach-grid { 
      grid-template-columns: 1fr; 
      gap: 15px;
    }
  }
  
  .approach-item { 
    padding: 25px; 
    background: rgba(255, 255, 255, 0.04); 
    border: 1px solid rgba(255, 255, 255, 0.12); 
    border-radius: 20px; 
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both; 
    backdrop-filter: blur(10px);
  }
  
  @media (max-width: 768px) {
    .approach-item { 
      padding: 20px; 
    }
  }
  
  .approach-item:hover { 
    background: rgba(255, 255, 255, 0.07); 
    transform: translateY(-8px); 
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
  
  .approach-number { 
    width: 45px; 
    height: 45px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border-radius: 12px; 
    font-size: 1.3rem; 
    font-weight: 800; 
    color: #000; 
    margin-bottom: 20px; 
    font-family: 'IBM Plex Mono', monospace;
  }
  
  @media (max-width: 768px) {
    .approach-number { 
      width: 40px; 
      height: 40px; 
      font-size: 1.2rem; 
      margin-bottom: 15px;
    }
  }
  
  .approach-text { 
    font-size: 0.95rem; 
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.85); 
  }
  
  @media (max-width: 768px) {
    .approach-text { 
      font-size: 0.9rem; 
    }
  }
  
  .screenshots-section { 
    padding: 80px 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .screenshots-section { 
      padding: 60px 20px; 
    }
  }
  
  .screenshots-grid { 
    display: grid; 
    gap: 50px; 
  }
  
  @media (max-width: 768px) {
    .screenshots-grid { 
      gap: 40px; 
    }
  }
  
  .screenshot-item { 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both; 
  }
  
  .screenshot-image-wrapper { 
    position: relative; 
    border-radius: 20px; 
    overflow: hidden; 
    margin-bottom: 20px; 
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); 
  }
  
  @media (max-width: 768px) {
    .screenshot-image-wrapper { 
      border-radius: 15px; 
      margin-bottom: 15px;
    }
  }
  
  .screenshot-image { 
    width: 100%; 
    height: auto; 
    min-height: 300px; 
    max-height: 450px; 
    object-fit: cover; 
    display: block; 
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  @media (max-width: 768px) {
    .screenshot-image { 
      max-height: 300px; 
      min-height: 250px;
    }
  }
  
  .screenshot-item:hover .screenshot-image { 
    transform: scale(1.04); 
  }
  
  .screenshot-overlay { 
    position: absolute; 
    inset: 0; 
    opacity: 0; 
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  .screenshot-item:hover .screenshot-overlay { 
    opacity: 1; 
  }
  
  .screenshot-title { 
    font-size: 1.5rem; 
    font-weight: 800; 
    margin-bottom: 10px; 
    letter-spacing: -0.01em;
  }
  
  @media (max-width: 768px) {
    .screenshot-title { 
      font-size: 1.3rem; 
    }
  }
  
  .screenshot-desc { 
    font-size: 1rem; 
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.7); 
  }
  
  @media (max-width: 768px) {
    .screenshot-desc { 
      font-size: 0.9rem; 
    }
  }
  
  .results-section { 
    padding: 80px 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .results-section { 
      padding: 60px 20px; 
    }
  }
  
  .results-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 20px; 
  }
  
  @media (max-width: 768px) {
    .results-grid { 
      grid-template-columns: 1fr; 
      gap: 15px;
    }
  }
  
  .result-card { 
    padding: 30px; 
    background: rgba(255, 255, 255, 0.04); 
    border: 1px solid rgba(255, 255, 255, 0.12); 
    border-radius: 20px; 
    text-align: center; 
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both; 
    backdrop-filter: blur(10px);
  }
  
  @media (max-width: 768px) {
    .result-card { 
      padding: 25px 20px; 
    }
  }
  
  .result-card:hover { 
    background: rgba(255, 255, 255, 0.07); 
    transform: translateY(-8px); 
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
  
  .result-value { 
    font-size: 2.5rem; 
    font-weight: 800; 
    margin-bottom: 10px; 
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 768px) {
    .result-value { 
      font-size: 2rem; 
    }
  }
  
  .result-metric { 
    font-size: 1rem; 
    font-weight: 700; 
    margin-bottom: 8px; 
  }
  
  @media (max-width: 768px) {
    .result-metric { 
      font-size: 0.9rem; 
    }
  }
  
  .result-desc { 
    font-size: 0.85rem; 
    color: rgba(255, 255, 255, 0.65); 
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .result-desc { 
      font-size: 0.8rem; 
    }
  }
  
  .tech-section { 
    padding: 80px 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .tech-section { 
      padding: 60px 20px; 
    }
  }
  
  .tech-grid { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 12px; 
    justify-content: center; 
  }
  
  @media (max-width: 768px) {
    .tech-grid { 
      gap: 8px; 
    }
  }
  
  .tech-item { 
    padding: 10px 20px; 
    background: rgba(255, 255, 255, 0.04); 
    border: 2px solid; 
    border-radius: 30px; 
    font-weight: 700; 
    font-size: 0.9rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  @media (max-width: 768px) {
    .tech-item { 
      padding: 8px 16px; 
      font-size: 0.8rem; 
    }
  }
  
  .tech-item:hover { 
    background: rgba(255, 255, 255, 0.1); 
    transform: translateY(-5px); 
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  .testimonial-section { 
    padding: 80px 20px; 
    max-width: 1200px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .testimonial-section { 
      padding: 60px 20px; 
    }
  }
  
  .testimonial-card { 
    padding: 40px; 
    background: rgba(255, 255, 255, 0.04); 
    border-left: 5px solid; 
    border-radius: 25px; 
    position: relative; 
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  
  @media (max-width: 768px) {
    .testimonial-card { 
      padding: 30px; 
    }
  }
  
  .quote-icon { 
    font-size: 4rem; 
    font-weight: 800; 
    line-height: 1; 
    opacity: 0.2; 
    margin-bottom: 15px; 
    font-family: Georgia, serif;
  }
  
  @media (max-width: 768px) {
    .quote-icon { 
      font-size: 3rem; 
    }
  }
  
  .testimonial-text { 
    font-size: 1.3rem; 
    line-height: 1.6; 
    margin-bottom: 30px; 
    font-style: italic; 
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    .testimonial-text { 
      font-size: 1.1rem; 
      line-height: 1.5;
    }
  }
  
  .testimonial-author-section { 
    display: flex; 
    align-items: center; 
    gap: 15px; 
  }
  
  .author-image { 
    width: 60px; 
    height: 60px; 
    border-radius: 50%; 
    object-fit: cover; 
    border: 3px solid rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    .author-image { 
      width: 50px; 
      height: 50px; 
    }
  }
  
  .author-name { 
    font-size: 1.1rem; 
    font-weight: 800; 
    margin-bottom: 4px; 
  }
  
  @media (max-width: 768px) {
    .author-name { 
      font-size: 1rem; 
    }
  }
  
  .author-role { 
    font-size: 0.9rem; 
    color: rgba(255, 255, 255, 0.6); 
  }
  
  @media (max-width: 768px) {
    .author-role { 
      font-size: 0.8rem; 
    }
  }
  
  .detail-cta { 
    padding: 80px 20px 100px; 
    max-width: 1000px; 
    margin: 0 auto; 
    text-align: center; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .detail-cta { 
      padding: 60px 20px 80px; 
    }
  }
  
  .cta-title { 
    font-size: clamp(1.8rem, 4vw, 3rem); 
    font-weight: 800; 
    margin-bottom: 15px; 
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 768px) {
    .cta-title { 
      font-size: 1.8rem; 
    }
  }
  
  .cta-text { 
    font-size: clamp(1rem, 2vw, 1.3rem); 
    color: rgba(255, 255, 255, 0.75); 
    margin-bottom: 30px; 
  }
  
  @media (max-width: 768px) {
    .cta-text { 
      font-size: 1.1rem; 
      margin-bottom: 25px;
    }
  }
  
  .cta-button { 
    padding: 15px 40px; 
    border: none; 
    border-radius: 50px; 
    font-size: 1rem; 
    font-weight: 700; 
    color: #000; 
    cursor: pointer; 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    font-family: 'Syne', sans-serif;
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
  
  @media (max-width: 768px) {
    .cta-button { 
      padding: 12px 30px; 
      font-size: 0.9rem; 
      width: 100%; 
      max-width: 300px;
    }
  }
  
  .cta-button:hover { 
    transform: translateY(-5px) scale(1.05); 
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
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
`;

const getOverviewStyles = () => `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap');

  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  .cases-overview { 
    background: #000; 
    color: #fff; 
    min-height: 100vh; 
    position: relative; 
    font-family: 'Syne', sans-serif;
    padding-bottom: 60px;
  }
  
  .bg-gradient { 
    position: fixed; 
    inset: 0; 
    pointer-events: none; 
    z-index: 0; 
    overflow: hidden;
  }
  
  .orb { 
    position: absolute; 
    border-radius: 50%; 
    filter: blur(140px); 
    opacity: 0.18; 
    animation: float 20s ease-in-out infinite; 
    will-change: transform;
  }
  
  .orb-1 { 
    width: 600px; 
    height: 600px; 
    background: linear-gradient(135deg, #0063f4, #00bfff); 
    top: -10%; 
    left: -10%; 
  }
  
  .orb-2 { 
    width: 550px; 
    height: 550px; 
    background: linear-gradient(135deg, #00ff88, #ffd700); 
    bottom: -10%; 
    right: -10%; 
    animation-delay: 8s; 
  }
  
  .orb-3 { 
    width: 500px; 
    height: 500px; 
    background: linear-gradient(135deg, #9d4edd, #ff006e); 
    top: 40%; 
    right: 5%; 
    animation-delay: 12s; 
  }
  
  @keyframes float { 
    0%, 100% { transform: translate(0, 0) scale(1); } 
    25% { transform: translate(60px, -60px) scale(1.1); }
    50% { transform: translate(-40px, 40px) scale(0.95); } 
    75% { transform: translate(40px, 60px) scale(1.05); }
  }
  
  /* Mobile Responsive Styles for Overview */
  @media (max-width: 768px) {
    .bg-gradient {
      display: none; /* Hide heavy animations on mobile */
    }
    
    .cases-overview {
      padding-bottom: 40px;
    }
  }
  
  .overview-hero { 
    padding: 100px 20px 60px; 
    max-width: 1200px; 
    margin: 0 auto; 
    text-align: center; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .overview-hero { 
      padding: 80px 20px 40px; 
    }
  }
  
  .hero-badge { 
    display: inline-block; 
    padding: 10px 20px; 
    background: rgba(255, 255, 255, 0.1); 
    border: 1px solid rgba(255, 255, 255, 0.2); 
    border-radius: 50px; 
    font-size: 0.8rem; 
    font-weight: 700; 
    margin-bottom: 25px; 
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    .hero-badge { 
      padding: 8px 16px; 
      font-size: 0.7rem; 
      margin-bottom: 20px;
    }
  }
  
  .overview-title { 
    font-size: clamp(2rem, 6vw, 4rem); 
    font-weight: 800; 
    line-height: 1.1; 
    margin-bottom: 20px; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both; 
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 768px) {
    .overview-title { 
      font-size: clamp(1.8rem, 8vw, 2.5rem); 
      margin-bottom: 15px;
    }
  }
  
  .gradient-text { 
    background: linear-gradient(135deg, #00bfff, #00ff88, #ffd700); 
    background-clip: text; 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    background-size: 200% auto;
    animation: gradient-shift 8s ease infinite;
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .overview-subtitle { 
    font-size: clamp(1rem, 3vw, 1.3rem); 
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.7); 
    max-width: 700px; 
    margin: 0 auto; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both; 
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    .overview-subtitle { 
      font-size: 1.1rem; 
    }
  }
  
  .cases-grid { 
    padding: 20px; 
    max-width: 1400px; 
    margin: 0 auto; 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
    gap: 30px; 
    position: relative; 
    z-index: 1; 
  }
  
  @media (max-width: 768px) {
    .cases-grid { 
      grid-template-columns: 1fr; 
      gap: 20px; 
      padding: 20px 15px;
    }
  }
  
  @media (max-width: 480px) {
    .cases-grid { 
      grid-template-columns: 1fr; 
      gap: 15px; 
    }
  }
  
  .case-card { 
    background: rgba(255, 255, 255, 0.04); 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    border-radius: 20px; 
    overflow: hidden; 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    cursor: pointer; 
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both; 
    backdrop-filter: blur(10px);
  }
  
  .case-card:hover { 
    transform: translateY(-10px); 
    background: rgba(255, 255, 255, 0.06); 
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  }
  
  @media (max-width: 768px) {
    .case-card:hover { 
      transform: translateY(-5px); 
    }
  }
  
  .card-image-wrapper { 
    position: relative; 
    height: 250px; 
    overflow: hidden; 
  }
  
  @media (max-width: 768px) {
    .card-image-wrapper { 
      height: 200px; 
    }
  }
  
  .card-image { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  .case-card:hover .card-image { 
    transform: scale(1.1); 
  }
  
  .card-overlay { 
    position: absolute; 
    inset: 0; 
    opacity: 0.6; 
    transition: opacity 0.5s ease; 
  }
  
  .case-card:hover .card-overlay { 
    opacity: 0.8; 
  }
  
  .card-category { 
    position: absolute; 
    top: 15px; 
    right: 15px; 
    padding: 6px 15px; 
    border-radius: 30px; 
    font-size: 0.75rem; 
    font-weight: 800; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    color: #000;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  @media (max-width: 768px) {
    .card-category { 
      top: 12px; 
      right: 12px; 
      padding: 5px 12px; 
      font-size: 0.7rem; 
    }
  }
  
  .card-content { 
    padding: 25px; 
  }
  
  @media (max-width: 768px) {
    .card-content { 
      padding: 20px; 
    }
  }
  
  .card-title { 
    font-size: 1.5rem; 
    font-weight: 800; 
    margin-bottom: 12px; 
    line-height: 1.2; 
    letter-spacing: -0.01em;
  }
  
  @media (max-width: 768px) {
    .card-title { 
      font-size: 1.3rem; 
    }
  }
  
  .card-desc { 
    font-size: 0.95rem; 
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.75); 
    margin-bottom: 20px; 
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @media (max-width: 768px) {
    .card-desc { 
      font-size: 0.9rem; 
      margin-bottom: 15px;
    }
  }
  
  .card-meta { 
    display: flex; 
    gap: 15px; 
    margin-bottom: 20px; 
    font-size: 0.85rem; 
    color: rgba(255, 255, 255, 0.6); 
    font-family: 'IBM Plex Mono', monospace;
  }
  
  @media (max-width: 768px) {
    .card-meta { 
      font-size: 0.8rem; 
      gap: 10px;
    }
  }
  
  .card-meta span::after {
    content: '•';
    margin-left: 15px;
  }
  
  @media (max-width: 768px) {
    .card-meta span::after {
      margin-left: 10px;
    }
  }
  
  .card-meta span:last-child::after {
    content: '';
  }
  
  .view-btn { 
    padding: 12px 25px; 
    background: transparent; 
    border: 2px solid; 
    border-radius: 50px; 
    font-size: 0.9rem; 
    font-weight: 700; 
    cursor: pointer; 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    font-family: 'Syne', sans-serif;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .view-btn { 
      padding: 10px 20px; 
      font-size: 0.85rem; 
    }
  }
  
  .view-btn:hover { 
    transform: translateX(5px); 
    background: rgba(255, 255, 255, 0.1);
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
`;

export default CaseStudies;