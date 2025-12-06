
import React, { useState, useEffect } from 'react';
import { 
  FiArrowRight,
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
  FiGlobe,
  FiShoppingCart,
  FiSmartphone,
  FiCloud,
  FiLayers
} from 'react-icons/fi';

// Import your detail component
// import CaseStudyDetail from './CaseStudyDetail';

const CaseStudies = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = ['All', 'E-Commerce', 'Mobile App', 'Web Platform', 'Enterprise'];

  const caseStudies = [
    {
      id: 1,
      title: 'TechMart E-Commerce Transformation',
      category: 'E-Commerce',
      client: 'TechMart Inc.',
      duration: '6 months',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      icon: <FiShoppingCart />,
      color: '#0063f4',
      challenge: 'Outdated platform causing 60% cart abandonment and poor mobile experience',
      solution: 'Complete redesign with React, headless CMS, and optimized checkout flow',
      results: [
        { metric: 'Sales Increase', value: '+185%', icon: <FiTrendingUp /> },
        { metric: 'Cart Abandonment', value: '-62%', icon: <FiShoppingCart /> },
        { metric: 'Mobile Traffic', value: '+240%', icon: <FiSmartphone /> },
        { metric: 'Page Load Time', value: '-75%', icon: <FiZap /> }
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe'],
      testimonial: {
        text: 'Verapixels transformed our business. The new platform exceeded all expectations.',
        author: 'Sarah Johnson',
        role: 'CEO, TechMart'
      }
    },
    {
      id: 2,
      title: 'HealthTrack Mobile App Launch',
      category: 'Mobile App',
      client: 'HealthTrack Solutions',
      duration: '4 months',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      icon: <FiSmartphone />,
      color: '#00ff88',
      challenge: 'Need for HIPAA-compliant health monitoring app with real-time sync',
      solution: 'Native iOS/Android apps with secure cloud infrastructure and AI insights',
      results: [
        { metric: 'Active Users', value: '50K+', icon: <FiUsers /> },
        { metric: 'App Rating', value: '4.9/5', icon: <FiAward /> },
        { metric: 'Data Sync Speed', value: '<2s', icon: <FiZap /> },
        { metric: 'User Retention', value: '89%', icon: <FiTarget /> }
      ],
      technologies: ['React Native', 'Firebase', 'TensorFlow', 'AWS', 'Node.js'],
      testimonial: {
        text: 'The app has revolutionized how our patients track their health metrics.',
        author: 'Dr. Michael Chen',
        role: 'CTO, HealthTrack'
      }
    },
    {
      id: 3,
      title: 'FinanceHub Banking Platform',
      category: 'Web Platform',
      client: 'FinanceHub Corp',
      duration: '8 months',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      icon: <FiDollarSign />,
      color: '#ffd700',
      challenge: 'Legacy banking system with security vulnerabilities and poor UX',
      solution: 'Modern fintech platform with microservices architecture and enhanced security',
      results: [
        { metric: 'Transaction Volume', value: '+320%', icon: <FiBarChart2 /> },
        { metric: 'Security Score', value: '99.9%', icon: <FiCheckCircle /> },
        { metric: 'Customer Satisfaction', value: '+95%', icon: <FiUsers /> },
        { metric: 'Processing Time', value: '-85%', icon: <FiClock /> }
      ],
      technologies: ['Angular', 'Java', 'PostgreSQL', 'Kubernetes', 'Redis'],
      testimonial: {
        text: 'Security, speed, and user experience - they nailed all three perfectly.',
        author: 'David Martinez',
        role: 'Head of Digital, FinanceHub'
      }
    },
    {
      id: 4,
      title: 'GlobalLogistics Supply Chain System',
      category: 'Enterprise',
      client: 'GlobalLogistics Inc',
      duration: '10 months',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      icon: <FiGlobe />,
      color: '#ff6b9d',
      challenge: 'Inefficient tracking system leading to delays and lost shipments',
      solution: 'Real-time IoT-enabled tracking platform with AI-powered route optimization',
      results: [
        { metric: 'Delivery Speed', value: '+145%', icon: <FiTrendingUp /> },
        { metric: 'Cost Reduction', value: '-42%', icon: <FiDollarSign /> },
        { metric: 'Tracking Accuracy', value: '99.8%', icon: <FiTarget /> },
        { metric: 'Customer NPS', value: '+78', icon: <FiAward /> }
      ],
      technologies: ['Vue.js', 'Python', 'IoT', 'TensorFlow', 'Azure'],
      testimonial: {
        text: 'This system has completely transformed our supply chain operations.',
        author: 'Amanda Williams',
        role: 'COO, GlobalLogistics'
      }
    },
    {
      id: 5,
      title: 'EduLearn Online Platform',
      category: 'Web Platform',
      client: 'EduLearn Academy',
      duration: '5 months',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
      icon: <FiLayers />,
      color: '#00bfff',
      challenge: 'Need for scalable e-learning platform supporting 100K+ concurrent users',
      solution: 'Cloud-native platform with video streaming, live classes, and AI tutoring',
      results: [
        { metric: 'Student Enrollment', value: '+450%', icon: <FiUsers /> },
        { metric: 'Course Completion', value: '+78%', icon: <FiTarget /> },
        { metric: 'System Uptime', value: '99.99%', icon: <FiCheckCircle /> },
        { metric: 'Engagement Rate', value: '+210%', icon: <FiBarChart2 /> }
      ],
      technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'WebRTC', 'AWS'],
      testimonial: {
        text: 'The platform handles our massive user base flawlessly. Exceptional work!',
        author: 'Prof. Robert Taylor',
        role: 'Founder, EduLearn'
      }
    },
    {
      id: 6,
      title: 'CloudSync Enterprise Suite',
      category: 'Enterprise',
      client: 'CloudSync Technologies',
      duration: '7 months',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      icon: <FiCloud />,
      color: '#9d4edd',
      challenge: 'Fragmented tools causing collaboration issues across global teams',
      solution: 'Unified workspace with real-time collaboration, automation, and integrations',
      results: [
        { metric: 'Productivity Gain', value: '+165%', icon: <FiTrendingUp /> },
        { metric: 'Tool Consolidation', value: '-87%', icon: <FiLayers /> },
        { metric: 'Team Satisfaction', value: '94%', icon: <FiUsers /> },
        { metric: 'Time Saved', value: '15hrs/week', icon: <FiClock /> }
      ],
      technologies: ['React', 'WebSocket', 'Redis', 'Docker', 'GCP'],
      testimonial: {
        text: 'Our teams are now more connected and productive than ever before.',
        author: 'Lisa Anderson',
        role: 'VP Operations, CloudSync'
      }
    }
  ];

  const filteredCases = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === selectedCategory);

  const handleViewCase = (caseId: number) => {
    setSelectedCaseId(caseId);
    setShowDetail(true);
    window.scrollTo(0, 0);
  };

  // If detail view is active, show detail component
  // Replace this with your actual CaseStudyDetail component
  if (showDetail && selectedCaseId) {
    return (
      <div>
        {/* This is where your CaseStudyDetail component would go */}
        {/* <CaseStudyDetail caseId={selectedCaseId} onBack={() => setShowDetail(false)} /> */}
        
        {/* Temporary placeholder - replace with actual component */}
        <div style={{ padding: '100px 40px', textAlign: 'center', background: '#000', color: '#fff', minHeight: '100vh' }}>
          <button 
            onClick={() => setShowDetail(false)}
            style={{
              padding: '12px 24px',
              background: '#0063f4',
              border: 'none',
              borderRadius: '30px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '40px'
            }}
          >
            ← Back to Case Studies
          </button>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Case Study Detail Page</h1>
          <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.7)' }}>
            Showing details for Case ID: {selectedCaseId}
          </p>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
            Import and use your CaseStudyDetail component here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="case-studies-page">
      <div className="case-bg">
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
        <div 
          className="bg-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      <section className="case-hero">
        <div className="case-container">
          <div className="hero-badge">
            <FiAward /> Success Stories That Inspire
          </div>
          <h1 className="hero-title">
            Our <span className="gradient-text">Case Studies</span>
          </h1>
          <p className="hero-subtitle">
            Real results from real clients. Discover how we've helped businesses transform 
            their digital presence and achieve remarkable growth.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-icon" style={{ background: '#0063f4' }}><FiTarget /></div>
              <div className="stat-value">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon" style={{ background: '#00ff88' }}><FiTrendingUp /></div>
              <div className="stat-value">250%</div>
              <div className="stat-label">Avg Growth</div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon" style={{ background: '#ffd700' }}><FiUsers /></div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <div className="case-container">
          <div className="category-filters">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="cases-grid-section">
        <div className="case-container">
          <div className="cases-grid">
            {filteredCases.map((study, i) => (
              <div
                key={study.id}
                className={`case-card ${activeCase === i ? 'active' : ''}`}
                onMouseEnter={() => setActiveCase(i)}
                onMouseLeave={() => setActiveCase(null)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="card-glow" style={{ background: study.color }}></div>

                <div className="case-image-wrapper">
                  <img src={study.image} alt={study.title} className="case-image" />
                  <div className="image-gradient" style={{ background: `linear-gradient(135deg, ${study.color}66, transparent)` }}></div>
                  
                  <div className="case-icon-badge" style={{ background: study.color }}>
                    {study.icon}
                  </div>

                  <div className="category-tag" style={{ borderColor: study.color, color: study.color }}>
                    {study.category}
                  </div>
                </div>

                <div className="case-content">
                  <h3 className="case-title">{study.title}</h3>
                  
                  <div className="case-meta">
                    <span className="meta-item">
                      <FiUsers />
                      {study.client}
                    </span>
                    <span className="meta-item">
                      <FiClock />
                      {study.duration}
                    </span>
                  </div>

                  <div className="case-section">
                    <h4 className="section-title" style={{ color: study.color }}>Challenge</h4>
                    <p className="section-text">{study.challenge}</p>
                  </div>

                  <div className="case-section">
                    <h4 className="section-title" style={{ color: study.color }}>Solution</h4>
                    <p className="section-text">{study.solution}</p>
                  </div>

                  <div className="results-grid">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="result-item">
                        <div className="result-icon" style={{ color: study.color }}>
                          {result.icon}
                        </div>
                        <div className="result-value" style={{ color: study.color }}>
                          {result.value}
                        </div>
                        <div className="result-label">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  <div className="tech-stack">
                    <h4 className="section-title" style={{ color: study.color }}>Technologies</h4>
                    <div className="tech-tags">
                      {study.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag" style={{ borderColor: study.color }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="testimonial" style={{ borderLeftColor: study.color }}>
                    <p className="testimonial-text">"{study.testimonial.text}"</p>
                    <div className="testimonial-author">
                      <strong>{study.testimonial.author}</strong>
                      <span>{study.testimonial.role}</span>
                    </div>
                  </div>

                  <button 
                    className="view-case-btn" 
                    style={{ background: study.color }}
                    onClick={() => handleViewCase(study.id)}
                  >
                    View Full Case Study
                    <FiExternalLink />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-inquiry-section">
        <div className="case-container">
          <div className="inquiry-content">
            <div className="inquiry-icon">
              <FiZap />
            </div>
            <h2 className="inquiry-title">Ready to Write Your Success Story?</h2>
            <p className="inquiry-text">
              Let's collaborate to create exceptional digital experiences that drive real results for your business.
            </p>
            <button className="inquiry-button">
              <span>Start Your Project</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .case-studies-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .case-bg {
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
          top: -10%;
          left: -10%;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          top: 40%;
          right: -10%;
          animation-delay: 4s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ff6b9d, #9d4edd);
          bottom: -10%;
          left: 30%;
          animation-delay: 8s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .case-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .case-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 0 80px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00ff88 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 60px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-stats {
          display: flex;
          gap: 60px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          font-size: 28px;
          color: #fff;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Filter Section */
        .filter-section {
          padding: 40px 0;
        }

        .category-filters {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 30px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(0, 99, 244, 0.2);
          border-color: rgba(0, 99, 244, 0.5);
          color: #00bfff;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          color: #fff;
        }

        /* Cases Grid */
        .cases-grid-section {
          padding: 80px 0;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 60px;
        }

        .case-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.8s ease both;
        }

        .case-card:hover {
          transform: translateY(-20px);
          border-color: rgba(0, 99, 244, 0.5);
          box-shadow: 0 40px 100px rgba(0, 99, 244, 0.4);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          filter: blur(100px);
          transition: opacity 0.6s ease;
          pointer-events: none;
        }

        .case-card:hover .card-glow {
          opacity: 0.2;
        }

        /* Case Image */
        .case-image-wrapper {
          position: relative;
          height: 350px;
          overflow: hidden;
        }

        .case-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-card:hover .case-image {
          transform: scale(1.15) rotate(2deg);
        }

        .image-gradient {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          transition: opacity 0.6s ease;
        }

        .case-card:hover .image-gradient {
          opacity: 0.7;
        }

        .case-icon-badge {
          position: absolute;
          top: 30px;
          left: 30px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 32px;
          color: #fff;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .category-tag {
          position: absolute;
          top: 30px;
          right: 30px;
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 2px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Case Content */
        .case-content {
          padding: 40px;
        }

        .case-title {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .case-meta {
          display: flex;
          gap: 24px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .case-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .section-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Results Grid */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 30px 0;
        }

        .result-item {
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .result-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
        }

        .result-icon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .result-value {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .result-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Tech Stack */
        .tech-stack {
          margin: 30px 0;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .tech-tag {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Testimonial */
        .testimonial {
          margin: 30px 0;
          padding: 24px;
          padding-left: 30px;
          background: rgba(255, 255, 255, 0.03);
          border-left: 4px solid;
          border-radius: 12px;
        }

        .testimonial-text {
          font-size: 1.05rem;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 16px;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .testimonial-author strong {
          font-size: 1rem;
          color: #fff;
        }

        .testimonial-author span {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* View Case Button */
        .view-case-btn {
          width: 100%;
          padding: 16px 32px;
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .view-case-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }

        /* Project Inquiry Section */
.project-inquiry-section {
  padding: 120px 0;
  background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
}

.inquiry-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 60px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
}

.inquiry-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
  opacity: 0.5;
}

.inquiry-icon {
  font-size: 64px;
  color: #0063f4;
  margin: 0 auto 32px;
  animation: iconBounce 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
  display: block;
  width: fit-content;
}

.inquiry-title {
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.inquiry-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.inquiry-button {
  padding: 18px 48px;
  background: linear-gradient(135deg, #0063f4, #00bfff);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 50px rgba(0, 99, 244, 0.4);
}

.inquiry-button span {
  position: relative;
  z-index: 3;
}

.inquiry-button svg {
  position: relative;
  z-index: 3;
}

.inquiry-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
}

/* Responsive styles for tablet */
@media (max-width: 768px) {
  .inquiry-content {
    padding: 60px 40px;
  }

  .inquiry-icon {
    font-size: 60px;
  }

  .inquiry-title {
    font-size: 2rem;
  }

  .inquiry-text {
    font-size: 1.1rem;
  }
}

/* Responsive styles for mobile */
@media (max-width: 480px) {
  .inquiry-content {
    padding: 50px 30px;
  }

  .inquiry-icon {
    font-size: 50px;
  }

  .inquiry-title {
    font-size: 1.8rem;
  }

  .inquiry-button {
    padding: 16px 40px;
    font-size: 1rem;
  }
}

        /* Responsive Design */
        @media (max-width: 1200px) {
          .cases-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }

        @media (max-width: 768px) {
          .case-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-stats {
            gap: 30px;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .category-filters {
            gap: 10px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .case-image-wrapper {
            height: 280px;
          }

          .case-icon-badge {
            width: 60px;
            height: 60px;
            font-size: 28px;
            top: 20px;
            left: 20px;
          }

          .category-tag {
            top: 20px;
            right: 20px;
            padding: 6px 16px;
            font-size: 0.8rem;
          }

          .case-content {
            padding: 30px 24px;
          }

          .case-title {
            font-size: 1.5rem;
          }

          .results-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .result-value {
            font-size: 1.8rem;
          }

          .cta-content {
            padding: 60px 40px;
          }

          .cta-icon {
            font-size: 60px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-text {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .case-image-wrapper {
            height: 240px;
          }

          .case-meta {
            flex-direction: column;
            gap: 12px;
          }

          .section-title {
            font-size: 1rem;
          }

          .section-text {
            font-size: 1rem;
          }

          .tech-tags {
            gap: 8px;
          }

          .tech-tag {
            padding: 6px 14px;
            font-size: 0.85rem;
          }

          .testimonial {
            padding: 20px;
            padding-left: 24px;
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .view-case-btn {
            padding: 14px 28px;
            font-size: 1rem;
          }

          .cta-content {
            padding: 50px 30px;
          }

          .cta-icon {
            font-size: 50px;
          }

          .cta-title {
            font-size: 1.8rem;
          }

          .cta-button {
            padding: 16px 40px;
            font-size: 1rem;
          }
        }

        /* Additional 3D Effects */
        @keyframes rotate3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        .case-card.active .case-icon-badge {
          animation: rotate3d 1s ease-in-out;
        }

        /* Parallax Effect on Scroll */
        .case-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .case-card:hover .case-content {
          transform: translateZ(20px);
        }

        .case-card:hover .case-image {
          transform: scale(1.15) rotate(2deg) translateZ(10px);
        }

        /* Shimmer Effect */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .view-case-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .view-case-btn:hover::before {
          left: 100%;
        }

        /* Glitch Effect on Hover */
        .case-title {
          position: relative;
        }

        .case-card:hover .case-title::before,
        .case-card:hover .case-title::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        /* Floating Animation for Stats */
        .hero-stat {
          animation: floatStat 3s ease-in-out infinite;
        }

        .hero-stat:nth-child(1) { animation-delay: 0s; }
        .hero-stat:nth-child(2) { animation-delay: 0.5s; }
        .hero-stat:nth-child(3) { animation-delay: 1s; }

        @keyframes floatStat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        /* Glow Pulse Effect */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 99, 244, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 99, 244, 0.8); }
        }

        .filter-btn.active {
          animation: glowPulse 2s ease-in-out infinite;
        }

        /* Smooth Reveal Animation */
        @keyframes smoothReveal {
          from {
            opacity: 0;
            transform: translateY(40px) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .case-card {
          animation: smoothReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Hover Lift Effect */
        .result-item {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .result-item:hover {
          transform: translateY(-5px) translateZ(20px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Border Animation */
        @keyframes borderFlow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }

        .case-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 30px;
          padding: 1px;
          background: linear-gradient(135deg, transparent, rgba(0, 99, 244, 0.5), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .case-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CaseStudies;