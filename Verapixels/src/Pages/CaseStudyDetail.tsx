import React, { useState, useEffect, useRef } from 'react';
import { 
  FiArrowLeft,
  FiExternalLink,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiAward,
  FiTarget,
  FiBarChart2,
  FiCheckCircle,
  FiZap,
  FiShoppingCart,
  FiSmartphone,
  FiCode,
  FiLayers,
  FiPackage,
  FiTool,
  FiHeart,
  FiStar,
  FiActivity
} from 'react-icons/fi';

const CaseStudyDetail = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      const sections = ['overview', 'challenge', 'solution', 'process', 'results', 'testimonials'];
      const scrollPosition = window.scrollY + 200;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const caseStudy = {
    id: 1,
    title: 'TechMart E-Commerce Transformation',
    subtitle: 'From struggling online store to industry-leading e-commerce platform',
    client: 'TechMart Inc.',
    industry: 'E-Commerce & Retail',
    duration: '6 months',
    team: '12 specialists',
    location: 'San Francisco, CA',
    year: '2024',
    color: '#0063f4',
    hero: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=900&fit=crop',
    
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop'
    ],

    overview: {
      description: 'TechMart, a mid-sized electronics retailer, was struggling with an outdated e-commerce platform that couldn\'t keep up with modern consumer expectations. High cart abandonment rates, poor mobile experience, and declining sales threatened their business survival in an increasingly competitive market.',
      goals: [
        'Reduce cart abandonment by at least 50%',
        'Improve mobile conversion rates by 200%',
        'Decrease page load times to under 2 seconds',
        'Implement personalized shopping experiences',
        'Scale infrastructure to handle 10x traffic'
      ]
    },

    challenge: {
      primary: 'TechMart was losing $2.3M annually due to a 60% cart abandonment rate and poor mobile experience',
      problems: [
        {
          title: 'Severe Cart Abandonment',
          description: '60% of users abandoned carts due to slow checkout process and technical issues',
          icon: <FiShoppingCart />,
          impact: '$2.3M annual loss'
        },
        {
          title: 'Mobile Catastrophe',
          description: 'Only 15% of mobile visitors completed purchases compared to 45% on desktop',
          icon: <FiSmartphone />,
          impact: '70% revenue gap'
        },
        {
          title: 'Performance Crisis',
          description: 'Average page load time of 8.5 seconds driving users to competitors',
          icon: <FiActivity />,
          impact: '45% bounce rate'
        },
        {
          title: 'Legacy Technology',
          description: 'Outdated tech stack unable to scale or integrate modern features',
          icon: <FiCode />,
          impact: 'Zero flexibility'
        }
      ],
      metrics: [
        { label: 'Cart Abandonment', value: '60%', status: 'critical' },
        { label: 'Mobile Conversion', value: '15%', status: 'critical' },
        { label: 'Page Load Time', value: '8.5s', status: 'critical' },
        { label: 'Monthly Revenue', value: '$450K', status: 'declining' }
      ]
    },

    solution: {
      approach: 'We implemented a comprehensive digital transformation using cutting-edge technologies and user-centric design principles',
      strategies: [
        {
          title: 'Modern Tech Stack',
          description: 'Built on React for lightning-fast UI, Node.js backend for scalability, and MongoDB for flexible data management',
          icon: <FiLayers />,
          technologies: ['React', 'Node.js', 'MongoDB', 'Redis']
        },
        {
          title: 'Headless CMS Architecture',
          description: 'Decoupled content management for better performance and omnichannel delivery',
          icon: <FiPackage />,
          technologies: ['Contentful', 'GraphQL', 'REST APIs']
        },
        {
          title: 'Optimized Checkout',
          description: 'Streamlined one-page checkout with multiple payment options and guest checkout',
          icon: <FiCheckCircle />,
          technologies: ['Stripe', 'PayPal', 'Apple Pay']
        },
        {
          title: 'AI Personalization',
          description: 'Machine learning algorithms for product recommendations and dynamic pricing',
          icon: <FiTarget />,
          technologies: ['TensorFlow', 'Python', 'ML Models']
        }
      ]
    },

    process: [
      {
        phase: 'Discovery & Research',
        duration: '2 weeks',
        activities: [
          'User interviews and behavior analysis',
          'Competitor analysis and market research',
          'Technical audit of existing infrastructure',
          'Pain point identification and prioritization'
        ],
        deliverables: ['Research Report', 'User Personas', 'Technical Assessment']
      },
      {
        phase: 'Design & Prototyping',
        duration: '3 weeks',
        activities: [
          'Wireframing and user flow mapping',
          'High-fidelity UI/UX design',
          'Interactive prototypes and testing',
          'Design system creation'
        ],
        deliverables: ['Design System', 'Clickable Prototypes', 'User Testing Results']
      },
      {
        phase: 'Development Sprint 1',
        duration: '6 weeks',
        activities: [
          'Frontend development with React',
          'Backend API development',
          'Database architecture implementation',
          'Payment gateway integration'
        ],
        deliverables: ['Core Platform', 'API Documentation', 'Payment System']
      },
      {
        phase: 'Development Sprint 2',
        duration: '6 weeks',
        activities: [
          'Mobile optimization and PWA features',
          'AI recommendation engine',
          'Performance optimization',
          'Security hardening'
        ],
        deliverables: ['Mobile App', 'AI Engine', 'Security Audit']
      },
      {
        phase: 'Testing & Launch',
        duration: '3 weeks',
        activities: [
          'Comprehensive QA testing',
          'Load testing and optimization',
          'User acceptance testing',
          'Phased rollout and monitoring'
        ],
        deliverables: ['Test Reports', 'Launch Plan', 'Monitoring Dashboard']
      }
    ],

    results: {
      headline: 'Transformed a struggling platform into an industry-leading e-commerce powerhouse',
      metrics: [
        { 
          metric: 'Sales Increase', 
          before: '$450K/mo',
          after: '$1.28M/mo',
          change: '+185%',
          icon: <FiTrendingUp />,
          color: '#00ff88'
        },
        { 
          metric: 'Cart Abandonment', 
          before: '60%',
          after: '23%',
          change: '-62%',
          icon: <FiShoppingCart />,
          color: '#0063f4'
        },
        { 
          metric: 'Mobile Conversion', 
          before: '15%',
          after: '51%',
          change: '+240%',
          icon: <FiSmartphone />,
          color: '#ffd700'
        },
        { 
          metric: 'Page Load Time', 
          before: '8.5s',
          after: '2.1s',
          change: '-75%',
          icon: <FiZap />,
          color: '#ff6b9d'
        },
        { 
          metric: 'Customer Satisfaction', 
          before: '3.2/5',
          after: '4.8/5',
          change: '+50%',
          icon: <FiHeart />,
          color: '#9d4edd'
        },
        { 
          metric: 'Monthly Traffic', 
          before: '125K',
          after: '420K',
          change: '+236%',
          icon: <FiUsers />,
          color: '#00bfff'
        }
      ],
      roi: {
        investment: '$180K',
        firstYearReturn: '$6.2M',
        roi: '3,344%',
        breakEven: '28 days'
      }
    },

    testimonials: [
      {
        text: 'Verapixels didn\'t just build us a new website - they transformed our entire business. The results exceeded our wildest expectations. We saw a 185% increase in sales within the first three months.',
        author: 'Sarah Johnson',
        role: 'CEO, TechMart',
        image: 'https://i.pravatar.cc/150?img=5',
        rating: 5
      },
      {
        text: 'The attention to detail and technical expertise was outstanding. They solved problems we didn\'t even know we had and delivered a platform that scales beautifully.',
        author: 'Marcus Lee',
        role: 'CTO, TechMart',
        image: 'https://i.pravatar.cc/150?img=12',
        rating: 5
      },
      {
        text: 'Our customers love the new platform. The mobile experience is phenomenal, and our support tickets have dropped by 70%. This was worth every penny.',
        author: 'Jennifer Martinez',
        role: 'Head of Customer Success, TechMart',
        image: 'https://i.pravatar.cc/150?img=9',
        rating: 5
      }
    ],

    technologies: [
      { name: 'React', category: 'Frontend', icon: <FiCode /> },
      { name: 'Node.js', category: 'Backend', icon: <FiCode /> },
      { name: 'MongoDB', category: 'Database', icon: <FiPackage /> },
      { name: 'Redis', category: 'Cache', icon: <FiZap /> },
      { name: 'AWS', category: 'Cloud', icon: <FiLayers /> },
      { name: 'Stripe', category: 'Payment', icon: <FiDollarSign /> },
      { name: 'TensorFlow', category: 'AI/ML', icon: <FiTarget /> },
      { name: 'Docker', category: 'DevOps', icon: <FiTool /> }
    ]
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="case-detail-page">
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <nav className="floating-nav">
        <button className="back-btn">
          <FiArrowLeft /> Back
        </button>
        <div className="nav-dots">
          {['overview', 'challenge', 'solution', 'process', 'results', 'testimonials'].map(section => (
            <button
              key={section}
              className={`nav-dot ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </div>
      </nav>

      <div className="detail-bg">
        <div 
          className="bg-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="bg-orb orb-2"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`
          }}
        />
      </div>

      <section className="detail-hero">
        <div className="hero-overlay" style={{ background: `linear-gradient(135deg, ${caseStudy.color}22, transparent)` }} />
        <img src={caseStudy.hero} alt={caseStudy.title} className="hero-bg-image" />
        
        <div className="detail-container">
          <div className="hero-content">
            <div className="hero-badge" style={{ borderColor: caseStudy.color, color: caseStudy.color }}>
              <FiAward /> Featured Case Study
            </div>
            <h1 className="hero-title">{caseStudy.title}</h1>
            <p className="hero-subtitle">{caseStudy.subtitle}</p>
            
            <div className="hero-meta">
              <div className="meta-item">
                <FiUsers />
                <div>
                  <div className="meta-label">Client</div>
                  <div className="meta-value">{caseStudy.client}</div>
                </div>
              </div>
              <div className="meta-item">
                <FiClock />
                <div>
                  <div className="meta-label">Duration</div>
                  <div className="meta-value">{caseStudy.duration}</div>
                </div>
              </div>
              <div className="meta-item">
                <FiTarget />
                <div>
                  <div className="meta-label">Industry</div>
                  <div className="meta-value">{caseStudy.industry}</div>
                </div>
              </div>
              <div className="meta-item">
                <FiBarChart2 />
                <div>
                  <div className="meta-label">Team Size</div>
                  <div className="meta-value">{caseStudy.team}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="image-gallery">
        <div className="detail-container">
          <div className="gallery-main">
            <img 
              src={caseStudy.images[selectedImage]} 
              alt="Project screenshot" 
              className="gallery-main-image"
            />
            <div className="image-nav">
              <button 
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
              >
                ←
              </button>
              <span>{selectedImage + 1} / {caseStudy.images.length}</span>
              <button 
                onClick={() => setSelectedImage(Math.min(caseStudy.images.length - 1, selectedImage + 1))}
                disabled={selectedImage === caseStudy.images.length - 1}
              >
                →
              </button>
            </div>
          </div>
          <div className="gallery-thumbs">
            {caseStudy.images.map((img, idx) => (
              <div
                key={idx}
                className={`thumb ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
                style={{ borderColor: selectedImage === idx ? caseStudy.color : 'transparent' }}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="content-section overview-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>01</div>
            <h2 className="section-title">Project Overview</h2>
          </div>
          
          <div className="overview-grid">
            <div className="overview-content">
              <p className="overview-text">{caseStudy.overview.description}</p>
              
              <div className="goals-section">
                <h3 style={{ color: caseStudy.color }}>Project Goals</h3>
                <ul className="goals-list">
                  {caseStudy.overview.goals.map((goal, idx) => (
                    <li key={idx} className="goal-item">
                      <FiCheckCircle style={{ color: caseStudy.color }} />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="project-info-card">
              <h3>Project Details</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{caseStudy.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Year</span>
                  <span className="info-value">{caseStudy.year}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Team</span>
                  <span className="info-value">{caseStudy.team}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{caseStudy.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="challenge" className="content-section challenge-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>02</div>
            <h2 className="section-title">The Challenge</h2>
          </div>

          <div className="challenge-highlight">
            <h3>{caseStudy.challenge.primary}</h3>
          </div>

          <div className="problems-grid">
            {caseStudy.challenge.problems.map((problem, idx) => (
              <div key={idx} className="problem-card">
                <div className="problem-icon" style={{ background: caseStudy.color }}>
                  {problem.icon}
                </div>
                <h4>{problem.title}</h4>
                <p>{problem.description}</p>
                <div className="problem-impact" style={{ color: caseStudy.color }}>
                  Impact: {problem.impact}
                </div>
              </div>
            ))}
          </div>

          <div className="metrics-before">
            <h3>Key Metrics (Before)</h3>
            <div className="metrics-grid">
              {caseStudy.challenge.metrics.map((metric, idx) => (
                <div key={idx} className={`metric-card ${metric.status}`}>
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-status">{metric.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="content-section solution-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>03</div>
            <h2 className="section-title">Our Solution</h2>
          </div>

          <p className="solution-intro">{caseStudy.solution.approach}</p>

          <div className="strategies-grid">
            {caseStudy.solution.strategies.map((strategy, idx) => (
              <div key={idx} className="strategy-card">
                <div className="strategy-icon" style={{ color: caseStudy.color }}>
                  {strategy.icon}
                </div>
                <h4>{strategy.title}</h4>
                <p>{strategy.description}</p>
                <div className="strategy-tech">
                  {strategy.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge" style={{ borderColor: caseStudy.color }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="content-section process-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>04</div>
            <h2 className="section-title">Development Process</h2>
          </div>

          <div className="process-timeline">
            {caseStudy.process.map((phase, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker" style={{ background: caseStudy.color }}>
                  {idx + 1}
                </div>
                <div className="timeline-content">
                  <div className="phase-header">
                    <h3>{phase.phase}</h3>
                    <span className="phase-duration" style={{ color: caseStudy.color }}>
                      <FiClock /> {phase.duration}
                    </span>
                  </div>
                  <div className="phase-details">
                    <div className="activities">
                      <h4>Activities</h4>
                      <ul>
                        {phase.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="deliverables">
                      <h4>Deliverables</h4>
                      <div className="deliverable-tags">
                        {phase.deliverables.map((deliverable, i) => (
                          <span key={i} className="deliverable-tag">
                            <FiCheckCircle /> {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="content-section results-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>05</div>
            <h2 className="section-title">The Results</h2>
          </div>

          <div className="results-headline">
            <h3>{caseStudy.results.headline}</h3>
          </div>

          <div className="results-metrics">
            {caseStudy.results.metrics.map((metric, idx) => (
              <div key={idx} className="result-card">
                <div className="result-icon" style={{ color: metric.color }}>
                  {metric.icon}
                </div>
                <div className="result-metric">{metric.metric}</div>
                <div className="result-comparison">
                  <div className="before">
                    <span className="label">Before</span>
                    <span className="value">{metric.before}</span>
                  </div>
                  <div className="arrow" style={{ color: metric.color }}>→</div>
                  <div className="after">
                    <span className="label">After</span>
                    <span className="value">{metric.after}</span>
                  </div>
                </div>
                <div className="result-change" style={{ color: metric.color }}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>

          <div className="roi-section">
            <h3>Return on Investment</h3>
            <div className="roi-grid">
              <div className="roi-item">
                <div className="roi-label">Investment</div>
                <div className="roi-value" style={{ color: caseStudy.color }}>
                  {caseStudy.results.roi.investment}
                </div>
              </div>
              <div className="roi-item">
                <div className="roi-label">First Year Return</div>
                <div className="roi-value" style={{ color: '#00ff88' }}>
                  {caseStudy.results.roi.firstYearReturn}
                </div>
              </div>
              <div className="roi-item">
                <div className="roi-label">ROI</div>
                <div className="roi-value" style={{ color: '#ffd700' }}>
                  {caseStudy.results.roi.roi}
                </div>
              </div>
              <div className="roi-item">
                <div className="roi-label">Break Even</div>
                <div className="roi-value" style={{ color: '#ff6b9d' }}>
                  {caseStudy.results.roi.breakEven}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="content-section testimonials-section">
        <div className="detail-container">
          <div className="section-header">
            <div className="section-number" style={{ color: caseStudy.color }}>06</div>
            <h2 className="section-title">Client Testimonials</h2>
          </div>

          <div className="testimonials-grid">
            {caseStudy.testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} style={{ fill: caseStudy.color, color: caseStudy.color }} />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="technologies-section">
        <div className="detail-container">
          <h3>Technologies Used</h3>
          <div className="tech-grid">
            {caseStudy.technologies.map((tech, idx) => (
              <div key={idx} className="tech-item">
                <div className="tech-icon" style={{ color: caseStudy.color }}>
                  {tech.icon}
                </div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-category">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="detail-container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's create something amazing together</p>
            <div className="cta-buttons">
              <button className="cta-primary" style={{ background: caseStudy.color }}>
                Start Your Project <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button className="cta-secondary">
                View More Cases <FiExternalLink />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .case-detail-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #0063f4, #00ff88, #ffd700);
          z-index: 1000;
          transition: width 0.3s ease;
        }

        .floating-nav {
          position: fixed;
          top: 30px;
          right: 40px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: flex-end;
        }

        .back-btn {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(0, 99, 244, 0.2);
          border-color: rgba(0, 99, 244, 0.5);
          transform: translateX(-5px);
        }

        .nav-dots {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .nav-dot:hover {
          background: rgba(0, 99, 244, 0.5);
          transform: scale(1.3);
        }

        .nav-dot.active {
          background: #0063f4;
          border-color: rgba(0, 99, 244, 0.3);
          transform: scale(1.5);
        }

        .detail-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          animation: float 12s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: 10%;
          left: -10%;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          bottom: 10%;
          right: -10%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .detail-hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.15;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.6;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 100px 0;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 2px solid;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .hero-subtitle {
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin-bottom: 50px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .meta-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
        }

        .meta-item > svg {
          font-size: 24px;
          color: #0063f4;
        }

        .meta-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 4px;
        }

        .meta-value {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .image-gallery {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.02);
        }

        .gallery-main {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 30px;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
        }

        .gallery-main-image {
          width: 100%;
          height: 600px;
          object-fit: cover;
          display: block;
          animation: imageZoom 0.6s ease;
        }

        @keyframes imageZoom {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }

        .image-nav {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px 24px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          color: #fff;
          font-weight: 600;
        }

        .image-nav button {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-nav button:hover:not(:disabled) {
          background: #0063f4;
          transform: scale(1.1);
        }

        .image-nav button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .gallery-thumbs {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .thumb {
          min-width: 150px;
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .thumb:hover {
          transform: scale(1.05);
        }

        .thumb.active {
          border-width: 3px;
          border-style: solid;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-section {
          padding: 100px 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 60px;
        }

        .section-number {
          font-size: 80px;
          font-weight: 900;
          opacity: 0.1;
          line-height: 1;
        }

        .section-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
        }

        .overview-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
        }

        .goals-section h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .goals-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .goal-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .goal-item svg {
          font-size: 24px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .project-info-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .project-info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 30px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .info-value {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .challenge-section {
          background: rgba(255, 255, 255, 0.02);
        }

        .challenge-highlight {
          padding: 40px;
          background: rgba(255, 0, 0, 0.1);
          border-left: 4px solid #ff4444;
          border-radius: 16px;
          margin-bottom: 60px;
        }

        .challenge-highlight h3 {
          font-size: 1.5rem;
          line-height: 1.6;
          color: #ff6b6b;
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .problem-card {
          padding: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .problem-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .problem-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          font-size: 28px;
          color: #fff;
          margin-bottom: 20px;
        }

        .problem-card h4 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        .problem-card p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }

        .problem-impact {
          font-size: 1rem;
          font-weight: 700;
        }

        .metrics-before h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .metric-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-5px);
        }

        .metric-card.critical {
          border-color: rgba(255, 68, 68, 0.5);
          background: rgba(255, 68, 68, 0.05);
        }

        .metric-card.declining {
          border-color: rgba(255, 165, 0, 0.5);
          background: rgba(255, 165, 0, 0.05);
        }

        .metric-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 10px;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .metric-status {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
        }

        .solution-intro {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 60px;
          max-width: 900px;
        }

        .strategies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .strategy-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
        }

        .strategy-card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-10px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        }

        .strategy-icon {
          font-size: 48px;
          margin-bottom: 24px;
        }

        .strategy-card h4 {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }

        .strategy-card p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .strategy-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-badge {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-badge:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .process-section {
          background: rgba(255, 255, 255, 0.02);
        }

        .process-timeline {
          position: relative;
        }

        .process-timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #0063f4, #00ff88, #ffd700);
          opacity: 0.3;
        }

        .timeline-item {
          display: flex;
          gap: 40px;
          margin-bottom: 60px;
          position: relative;
        }

        .timeline-marker {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 900;
          color: #fff;
          flex-shrink: 0;
          z-index: 1;
          box-shadow: 0 0 0 8px rgba(0, 99, 244, 0.2);
        }

        .timeline-content {
          flex: 1;
          padding: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .phase-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .phase-header h3 {
          font-size: 1.5rem;
        }

        .phase-duration {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 600;
        }

        .phase-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .activities h4,
        .deliverables h4 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.8);
        }

        .activities ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .activities li {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          padding-left: 20px;
          position: relative;
        }

        .activities li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0063f4;
        }

        .deliverable-tags {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .deliverable-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #00ff88;
        }

        .results-headline {
          text-align: center;
          margin-bottom: 60px;
        }

        .results-headline h3 {
          font-size: clamp(24px, 3vw, 36px);
          line-height: 1.4;
          max-width: 900px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0063f4, #00ff88, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .results-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .result-card {
          padding: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
        }

        .result-card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .result-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .result-metric {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.8);
        }

        .result-comparison {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .before,
        .after {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .before .label,
        .after .label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .before .value,
        .after .value {
          font-size: 1.3rem;
          font-weight: 900;
        }

        .arrow {
          font-size: 2rem;
          font-weight: 900;
        }

        .result-change {
          font-size: 1.8rem;
          font-weight: 900;
        }

        .roi-section {
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
        }

        .roi-section h3 {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 40px;
        }

        .roi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }

        .roi-item {
          text-align: center;
        }

        .roi-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 12px;
        }

        .roi-value {
          font-size: 2.5rem;
          font-weight: 900;
        }

        .testimonials-section {
          background: rgba(255, 255, 255, 0.02);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }

        .testimonial-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-10px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        }

        .testimonial-stars {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 20px;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonial-author img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .author-role {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .technologies-section {
          padding: 80px 0;
        }

        .technologies-section h3 {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 50px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 30px;
        }

        .tech-item {
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-10px) rotate(5deg);
        }

        .tech-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .tech-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .tech-category {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .cta-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0.5;
        }

        .cta-content h2 {
          font-size: 2.8rem;
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-content p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-primary,
        .cta-secondary {
          padding: 18px 40px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-primary {
          color: #fff;
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
        }

        .cta-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-5px);
        }

        @media (max-width: 1200px) {
          .overview-grid {
            grid-template-columns: 1fr;
          }

          .project-info-card {
            position: relative;
            top: 0;
          }

          .phase-details {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .detail-container {
            padding: 0 20px;
          }

          .floating-nav {
            top: 20px;
            right: 20px;
          }

          .back-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .hero-meta {
            grid-template-columns: 1fr;
          }

          .gallery-main-image {
            height: 400px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-number {
            font-size: 60px;
          }

          .section-title {
            font-size: 32px;
          }

          .problems-grid,
          .strategies-grid,
          .results-metrics,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .process-timeline::before {
            left: 20px;
          }

          .timeline-marker {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .timeline-item {
            gap: 20px;
          }

          .roi-section {
            padding: 40px 30px;
          }

          .roi-grid {
            grid-template-columns: 1fr 1fr;
          }

          .cta-content {
            padding: 50px 30px;
          }

          .cta-content h2 {
            font-size: 2rem;
          }

          .cta-content p {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.85rem;
            padding: 8px 16px;
          }

          .meta-item {
            padding: 16px;
          }

          .gallery-main-image {
            height: 300px;
          }

          .overview-text {
            font-size: 1.1rem;
          }

          .challenge-highlight {
            padding: 30px 20px;
          }

          .challenge-highlight h3 {
            font-size: 1.2rem;
          }

          .solution-intro {
            font-size: 1.1rem;
          }

          .results-headline h3 {
            font-size: 20px;
          }

          .result-comparison {
            flex-direction: column;
            gap: 10px;
          }

          .arrow {
            transform: rotate(90deg);
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .tech-item {
            padding: 20px 15px;
          }

          .tech-icon {
            font-size: 32px;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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

        .content-section {
          animation: slideInLeft 0.8s ease;
        }

        .problem-card {
          animation: scaleIn 0.6s ease;
          animation-fill-mode: both;
        }

        .problem-card:nth-child(1) { animation-delay: 0.1s; }
        .problem-card:nth-child(2) { animation-delay: 0.2s; }
        .problem-card:nth-child(3) { animation-delay: 0.3s; }
        .problem-card:nth-child(4) { animation-delay: 0.4s; }

        .strategy-card {
          animation: slideInRight 0.8s ease;
          animation-fill-mode: both;
        }

        .strategy-card:nth-child(1) { animation-delay: 0.1s; }
        .strategy-card:nth-child(2) { animation-delay: 0.2s; }
        .strategy-card:nth-child(3) { animation-delay: 0.3s; }
        .strategy-card:nth-child(4) { animation-delay: 0.4s; }

        .result-card {
          animation: scaleIn 0.6s ease;
          animation-fill-mode: both;
        }

        .result-card:nth-child(1) { animation-delay: 0.1s; }
        .result-card:nth-child(2) { animation-delay: 0.2s; }
        .result-card:nth-child(3) { animation-delay: 0.3s; }
        .result-card:nth-child(4) { animation-delay: 0.4s; }
        .result-card:nth-child(5) { animation-delay: 0.5s; }
        .result-card:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default CaseStudyDetail;