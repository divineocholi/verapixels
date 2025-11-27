import React, { useState } from "react";
import {
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiAward,
  FiCoffee,
  FiGlobe,
  FiMonitor,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiTarget,
  FiCode,
  FiPenTool,
  FiBriefcase,
  FiTrendingDown,
  FiSmile,
  FiShield,
  FiBook,
} from "react-icons/fi";

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const benefits = [
    {
      icon: <FiDollarSign />,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with performance bonuses",
      color: "#0063f4",
    },
    {
      icon: <FiGlobe />,
      title: "Remote First",
      description: "Work from anywhere in the world with flexible hours",
      color: "#00bfff",
    },
    {
      icon: <FiCalendar />,
      title: "Unlimited PTO",
      description: "Take time off when you need it, no questions asked",
      color: "#00ff88",
    },
    {
      icon: <FiTrendingUp />,
      title: "Growth Opportunities",
      description: "Clear career paths with mentorship and skill development",
      color: "#ffd700",
    },
    {
      icon: <FiHeart />,
      title: "Health & Wellness",
      description: "Premium health insurance and wellness programs",
      color: "#ff6b9d",
    },
    {
      icon: <FiMonitor />,
      title: "Latest Tech",
      description: "MacBook Pro, monitors, and any tools you need",
      color: "#9d4edd",
    },
    {
      icon: <FiBook />,
      title: "Learning Budget",
      description: "$2,000 annual budget for courses, books, and conferences",
      color: "#00d1ff",
    },
    {
      icon: <FiUsers />,
      title: "Team Events",
      description: "Regular team retreats and fun activities",
      color: "#ff9f43",
    },
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: "Mission-Driven",
      description: "We're building products that make a real difference in people's lives",
    },
    {
      icon: <FiSmile />,
      title: "Work-Life Balance",
      description: "We believe great work comes from well-rested, happy people",
    },
    {
      icon: <FiShield />,
      title: "Trust & Autonomy",
      description: "We trust you to do your best work without micromanagement",
    },
    {
      icon: <FiUsers />,
      title: "Diversity & Inclusion",
      description: "We celebrate different perspectives and backgrounds",
    },
  ];

  const positions = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Build scalable web applications using React, Node.js, and cloud technologies",
      skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Create beautiful, user-centered designs that solve real problems",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Design Systems"],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build and maintain our infrastructure, CI/CD pipelines, and monitoring systems",
      skills: ["Kubernetes", "Docker", "AWS", "Terraform", "GitLab CI"],
    },
    {
      id: 4,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "4+ years",
      description: "Lead our marketing efforts and grow our brand presence globally",
      skills: ["SEO", "Content Marketing", "Analytics", "Social Media", "Strategy"],
    },
    {
      id: 5,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      description: "Craft pixel-perfect, performant user interfaces with modern frameworks",
      skills: ["React", "TypeScript", "CSS", "Responsive Design", "Animation"],
    },
    {
      id: 6,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Define product strategy and roadmap, working with cross-functional teams",
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
    },
  ];

  const departments = ["all", "Engineering", "Design", "Marketing", "Product"];

  const filteredPositions = selectedDepartment === "all" 
    ? positions 
    : positions.filter(pos => pos.department === selectedDepartment);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("coverLetter", formData.coverLetter);
    if (cvFile) {
      formDataToSend.append("cv", cvFile);
    }

    try {
      // Replace with your Formspree endpoint
      await fetch("https://submit-form.com/", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });
      
      setShowSuccessAlert(true);
      setShowApplicationForm(false);
      setFormData({ name: "", email: "", phone: "", position: "", coverLetter: "" });
      setCvFile(null);
      
      // Hide success alert after 5 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
    } catch (error) {
      alert("Error submitting application. Please try again.");
    }
  };

  const stats = [
    { icon: <FiUsers />, value: "50+", label: "Team Members" },
    { icon: <FiGlobe />, value: "15+", label: "Countries" },
    { icon: <FiTrendingUp />, value: "200%", label: "Growth YoY" },
    { icon: <FiStar />, value: "4.9/5", label: "Glassdoor Rating" },
  ];

  const getDepartmentIcon = (dept: string) => {
    switch(dept) {
      case "Engineering": return <FiCode />;
      case "Design": return <FiPenTool />;
      case "Marketing": return <FiTrendingUp />;
      case "Product": return <FiBriefcase />;
      default: return <FiBriefcase />;
    }
  };

  return (
    <div className="careers-page">
      {/* Animated Background */}
      <div className="careers-bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient gradient-1"></div>
        <div className="bg-gradient gradient-2"></div>
        <div className="bg-gradient gradient-3"></div>
      </div>

      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-container">
          <div className="hero-badge">
            <FiHeart /> Join Our Team
          </div>
          <h1 className="hero-title">
            Build the <span className="gradient-text">Future</span> With Us
          </h1>
          <p className="hero-subtitle">
            We're looking for passionate, talented people who want to make a real impact. 
            Join a team that values innovation, creativity, and work-life balance.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="careers-container">
          <div className="section-header">
            <h2 className="section-title">
              Why <span className="gradient-text">Work With Us?</span>
            </h2>
            <p className="section-subtitle">
              We're committed to creating an environment where you can do your best work
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="benefit-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="benefit-icon" style={{ color: benefit.color }}>
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
                <div className="benefit-glow" style={{ background: benefit.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="careers-container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, i) => (
              <div
                key={i}
                className="value-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section - Hidden */}
      <section className="positions-section" style={{ display: 'none' }}>
        <div className="careers-container">
          <div className="section-header">
            <h2 className="section-title">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="section-subtitle">
              Find your next opportunity and join our growing team
            </p>
          </div>

          {/* Department Filter */}
          <div className="department-filter">
            {departments.map((dept, i) => (
              <button
                key={i}
                className={`filter-btn ${selectedDepartment === dept ? "active" : ""}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept === "all" ? "All Positions" : dept}
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="positions-list">
            {filteredPositions.map((position, i) => (
              <div
                key={position.id}
                className="position-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="position-header">
                  <div className="position-left">
                    <div className="position-dept">
                      {getDepartmentIcon(position.department)}
                      <span>{position.department}</span>
                    </div>
                    <h3 className="position-title">{position.title}</h3>
                    <p className="position-description">{position.description}</p>
                  </div>
                </div>

                <div className="position-meta">
                  <div className="meta-item">
                    <FiMapPin />
                    <span>{position.location}</span>
                  </div>
                  <div className="meta-item">
                    <FiClock />
                    <span>{position.type}</span>
                  </div>
                  <div className="meta-item">
                    <FiAward />
                    <span>{position.experience}</span>
                  </div>
                </div>

                <div className="position-skills">
                  {position.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="apply-btn">
                  <span>Apply Now</span>
                  <FiArrowRight className="arrow-icon" />
                </button>
              </div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="no-positions">
              <p>No positions available in this department right now.</p>
              <p>Check back soon or view all positions!</p>
            </div>
          )}
        </div>
      </section>

      {/* No Openings Section */}
      <section className="no-openings-section">
        <div className="careers-container">
          <div className="no-openings-wrapper">
            <div className="no-openings-icon">
              <FiCoffee />
            </div>
            <h2 className="no-openings-title">No Open Positions Right Now</h2>
            <p className="no-openings-text">
              We're not actively hiring at the moment, but we're always looking for exceptional talent! 
              Follow us on social media to stay updated on future opportunities, company news, and insights.
            </p>
            
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="#000" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#000"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Submit CV Section */}
      <section className="submit-cv-section">
        <div className="careers-container">
          <div className="submit-cv-wrapper">
            <div className="submit-cv-content">
              <div className="submit-cv-badge">
                <FiZap /> Submit Your Application
              </div>
              <h2 className="submit-cv-title">Join Our Talent Pool</h2>
              <p className="submit-cv-text">
                Even though we don't have open positions right now, we'd love to hear from you! 
                Submit your CV and tell us about yourself. When the right opportunity opens up, 
                you'll be the first to know.
              </p>
              <button 
                className="upload-cv-btn"
                onClick={() => setShowApplicationForm(true)}
              >
                <span>Submit Your CV</span>
                <FiArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="modal-overlay" onClick={() => setShowApplicationForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowApplicationForm(false)}
            >
              ×
            </button>
            
            <div className="modal-header">
              <h3 className="modal-title">Submit Your Application</h3>
              <p className="modal-subtitle">We're excited to learn more about you!</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="position">Position You're Interested In *</label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a position</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cv">Upload Your CV/Resume *</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <label htmlFor="cv" className="file-upload-label">
                    <FiArrowRight />
                    {cvFile ? cvFile.name : "Choose File (PDF, DOC, DOCX)"}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us why you'd be a great fit for our team..."
                />
              </div>

              <button type="submit" className="submit-form-btn">
                <FiCheck />
                <span>Submit Application</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="success-alert">
          <div className="success-alert-content">
            <div className="success-icon">
              <FiCheck />
            </div>
            <div className="success-text">
              <h4>Application Submitted Successfully!</h4>
              <p>We'll review your application and get back to you soon.</p>
            </div>
            <button 
              className="success-close"
              onClick={() => setShowSuccessAlert(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* CTA Section - Hidden */}
      <section className="cta-section" style={{ display: 'none' }}>
        <div className="careers-container">
          <div className="cta-wrapper">
            <div className="cta-content">
              <div className="cta-badge">
                <FiZap /> Don't See Your Role?
              </div>
              <h2 className="cta-title">We're Always Looking for Talent</h2>
              <p className="cta-text">
                Can't find a position that matches your skills? We're always interested 
                in connecting with talented people. Send us your resume and let's talk!
              </p>
              <button className="cta-button">
                <span>Send General Application</span>
                <FiArrowRight className="arrow-icon" />
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

        .careers-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .careers-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .bg-gradient {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: floatGradient 15s ease-in-out infinite;
        }

        .gradient-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .gradient-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .gradient-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 40%;
          animation-delay: 10s;
        }

        @keyframes floatGradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .careers-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .careers-hero {       
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(255, 107, 157, 0.15);
          border: 1px solid rgba(255, 107, 157, 0.4);
          border-radius: 30px;
          color: #ff6b9d;
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
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
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

        /* Stats Grid */
        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          margin-top: 60px;
        }

        .stat-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          width: 240px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .stat-icon {
          font-size: 42px;
          color: #00bfff;
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Section Styles */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* Benefits Section */
        .benefits-section {
          padding: 120px 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          position: relative;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .benefit-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .benefit-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        .benefit-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .benefit-card:hover .benefit-glow {
          opacity: 0.2;
        }

        /* Values Section */
        .values-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .value-card {
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .value-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.05);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
        }

        .value-icon {
          font-size: 48px;
          color: #00ff88;
          margin-bottom: 24px;
        }

        .value-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .value-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Positions Section */
        .positions-section {
          padding: 120px 0;
        }

        .department-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          margin-bottom: 60px;
        }

        .filter-btn {
          padding: 14px 32px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(0, 99, 244, 0.1);
          border-color: rgba(0, 99, 244, 0.3);
          color: #00bfff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .positions-list {
          display: grid;
          gap: 30px;
        }

        .position-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
        }

        .position-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .position-header {
          margin-bottom: 24px;
        }

        .position-dept {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 99, 244, 0.1);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          color: #00bfff;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .position-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .position-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        .position-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .meta-item svg {
          color: #00bfff;
        }

        .position-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .skill-tag {
          padding: 8px 16px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 20px;
          color: #00ff88;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .apply-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 30px;
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.3);
        }

        .apply-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.5);
          background: linear-gradient(135deg, #0077ff, #00d4ff);
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }

        .apply-btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        .no-positions {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.6);
        }

        .no-positions p {
          font-size: 1.15rem;
          margin-bottom: 10px;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0;
        }

        .cta-wrapper {
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(255, 215, 0, 0.15);
          border: 1px solid rgba(255, 215, 0, 0.4);
          border-radius: 25px;
          color: #ffd700;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .cta-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .cta-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .cta-button {
          padding: 20px 50px;
          background: linear-gradient(135deg, #ffd700, #ff9f43);
          border: none;
          border-radius: 40px;
          color: #000;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(255, 215, 0, 0.6);
        }

        .cta-button .arrow-icon {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* No Openings Section */
        .no-openings-section {
          padding: 120px 0 60px;
        }

        .no-openings-wrapper {
          text-align: center;
          padding: 80px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .no-openings-icon {
          font-size: 80px;
          color: #00bfff;
          margin-bottom: 30px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .no-openings-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .no-openings-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .social-links {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .social-btn {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-btn svg {
          width: 24px;
          height: 24px;
        }

        .social-btn:hover {
          transform: translateY(-5px);
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        /* Submit CV Section */
        .submit-cv-section {
          padding: 60px 0 120px;
        }

        .submit-cv-wrapper {
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .submit-cv-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .submit-cv-content {
          position: relative;
          z-index: 1;
        }

        .submit-cv-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 25px;
          color: #00ff88;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .submit-cv-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .submit-cv-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .upload-cv-btn {
          padding: 20px 50px;
          background: linear-gradient(135deg, #00ff88, #00bfff);
          border: none;
          border-radius: 40px;
          color: #000;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 15px 40px rgba(0, 255, 136, 0.4);
        }

        .upload-cv-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0, 255, 136, 0.6);
        }

        .upload-cv-btn .arrow-icon {
          transition: transform 0.3s ease;
        }

        .upload-cv-btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 50px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          line-height: 1;
        }

        .modal-close:hover {
          background: rgba(255, 0, 0, 0.2);
          border-color: rgba(255, 0, 0, 0.5);
          transform: rotate(90deg);
        }

        .modal-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .modal-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Form Styles */
        .application-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group label {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
        }

        #position{
        background-color: #0a0a0a;}

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00bfff;
          background: rgba(0, 191, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group select {
          cursor: pointer;
        }

        /* File Upload Styles */
        .file-upload-wrapper {
          position: relative;
        }

        .file-upload-wrapper input[type="file"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .file-upload-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-upload-label:hover {
          border-color: #00bfff;
          background: rgba(0, 191, 255, 0.05);
          color: #00bfff;
        }

        .submit-form-btn {
          padding: 18px 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 30px;
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.3);
          margin-top: 10px;
        }

        .submit-form-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.5);
          background: linear-gradient(135deg, #0077ff, #00d4ff);
        }

        /* Success Alert */
        .success-alert {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 2000;
          animation: slideInRight 0.5s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(400px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .success-alert-content {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px 30px;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 191, 255, 0.15));
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.4);
          backdrop-filter: blur(10px);
          min-width: 400px;
          position: relative;
        }

        .success-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff88, #00bfff);
          border-radius: 50%;
          flex-shrink: 0;
          animation: scaleIn 0.5s ease 0.3s both;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-icon svg {
          font-size: 28px;
          color: #000;
          font-weight: bold;
        }

        .success-text {
          flex: 1;
          text-align: left;
        }

        .success-text h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #00ff88;
          margin-bottom: 5px;
        }

        .success-text p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .success-close {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          line-height: 1;
        }

        .success-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .values-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .careers-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .stats-grid {
            gap: 20px;
          }

          .stat-card {
            width: calc(50% - 10px);
          }

          .section-title {
            font-size: 36px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .department-filter {
            gap: 10px;
          }

          .filter-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
          }

          .position-card {
            padding: 30px 25px;
          }

          .position-title {
            font-size: 1.5rem;
          }

          .position-meta {
            gap: 16px;
          }

          .cta-wrapper {
            padding: 60px 40px;
          }

          .cta-title {
            font-size: 2.5rem;
          }

          .cta-text {
            font-size: 1.05rem;
          }

          .cta-button {
            padding: 18px 40px;
            font-size: 1.1rem;
          }

          .no-openings-wrapper {
            padding: 60px 30px;
          }

          .no-openings-icon {
            font-size: 60px;
          }

          .no-openings-title {
            font-size: 2.2rem;
          }

          .no-openings-text {
            font-size: 1.05rem;
          }

          .social-btn {
            width: 50px;
            height: 50px;
          }

          .social-btn svg {
            width: 20px;
            height: 20px;
          }

          .submit-cv-wrapper {
            padding: 60px 40px;
          }

          .submit-cv-title {
            font-size: 2.5rem;
          }

          .submit-cv-text {
            font-size: 1.05rem;
          }

          .upload-cv-btn {
            padding: 18px 40px;
            font-size: 1.1rem;
          }

          .modal-content {
            padding: 40px 30px;
          }

          .modal-title {
            font-size: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            flex-direction: column;
          }

          .stat-card {
            width: 100%;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 18px;
          }

          .position-meta {
            flex-direction: column;
            gap: 12px;
          }

          .cta-wrapper {
            padding: 50px 30px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .no-openings-title {
            font-size: 1.8rem;
          }

          .submit-cv-title {
            font-size: 2rem;
          }

          .modal-content {
            padding: 30px 20px;
          }

          .modal-title {
            font-size: 1.6rem;
          }

          .modal-close {
            width: 35px;
            height: 35px;
            font-size: 24px;
          }

          .success-alert-content {
            min-width: 320px;
            padding: 20px 25px;
          }

          .success-icon {
            width: 45px;
            height: 45px;
          }

          .success-icon svg {
            font-size: 24px;
          }

          .success-text h4 {
            font-size: 1rem;
          }

          .success-text p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;