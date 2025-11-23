import React, { useState, useEffect } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiAward,
  FiCode,
  FiLayout,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiHeart,
  FiZap,
} from "react-icons/fi";
import VeeAIChatbot from "../Components/VeeAIChatbot";

const OurCoreTeam = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const teamMembers = [
    {
      name: "Ocholi Divine",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      bio: "Visionary leader driving innovation and excellence at Verapixels",
      specialties: ["Strategy", "Innovation", "Leadership"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "divine@verapixels.com",
      },
      color: "#0063f4",
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
      bio: "Full-stack wizard crafting elegant solutions to complex problems",
      specialties: ["React", "Node.js", "Cloud"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "sarah@verapixels.com",
      },
      color: "#00bfff",
    },
    {
      name: "Marcus Johnson",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
      bio: "Design genius transforming ideas into stunning visual experiences",
      specialties: ["UI/UX", "Branding", "Animation"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "marcus@verapixels.com",
      },
      color: "#00ff88",
    },
    {
      name: "Amara Williams",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",
      bio: "Architecture expert building scalable systems that power the future",
      specialties: ["DevOps", "Security", "Microservices"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "amara@verapixels.com",
      },
      color: "#ffd700",
    },
    {
      name: "David Park",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",
      bio: "Strategic thinker aligning technology with business goals",
      specialties: ["Product Strategy", "Agile", "Analytics"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "david@verapixels.com",
      },
      color: "#ff6b9d",
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
      bio: "Brand storyteller connecting technology with human experiences",
      specialties: ["Digital Marketing", "Content", "Growth"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "elena@verapixels.com",
      },
      color: "#9d4edd",
    },
  ];

  const stats = [
    {
      icon: <FiUsers />,
      value: "15+",
      label: "Team Members",
      color: "#0063f4",
    },
    {
      icon: <FiAward />,
      value: "50+",
      label: "Projects Delivered",
      color: "#00ff88",
    },
    {
      icon: <FiStar />,
      value: "98%",
      label: "Client Satisfaction",
      color: "#ffd700",
    },
    {
      icon: <FiZap />,
      value: "24/7",
      label: "Support Available",
      color: "#ff6b9d",
    },
  ];

  return (
    <div className="team-page">
      {/* Animated Background */}
      <div className="team-bg">
        <div
          className="bg-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="bg-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${
              mousePosition.y * -0.03
            }px)`,
          }}
        />
        <div
          className="bg-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${
              mousePosition.y * -0.02
            }px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-container">
          <div className="hero-badge">
            <FiHeart /> Meet the Minds Behind Verapixels
          </div>
          <h1 className="hero-title">
            Our <span className="gradient-text">Core Team</span>
          </h1>
          <p className="hero-subtitle">
            A collective of passionate innovators, creators, and problem solvers
            dedicated to building the future of digital experiences
          </p>

          {/* Floating Icons Animation */}
          <div className="floating-icons">
            <div className="float-icon" style={{ animationDelay: "0s" }}>
              <FiCode />
            </div>
            <div className="float-icon" style={{ animationDelay: "0.5s" }}>
              <FiLayout />
            </div>
            <div className="float-icon" style={{ animationDelay: "1s" }}>
              <FiTrendingUp />
            </div>
            <div className="float-icon" style={{ animationDelay: "1.5s" }}>
              <FiZap />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="team-container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div
                  className="stat-glow"
                  style={{ background: stat.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="team-grid-section">
        <div className="team-container">
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`member-card ${activeCard === i ? "active" : ""}`}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Card Glow Effect */}
                <div
                  className="card-glow"
                  style={{ background: member.color }}
                ></div>

                {/* Member Image */}
                <div className="member-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image"
                  />
                  <div
                    className="image-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}33, transparent)`,
                    }}
                  ></div>

                  {/* Hover Social Links */}
                  <div className="social-overlay">
                    <a href={member.social.github} className="social-icon">
                      <FiGithub />
                    </a>
                    <a href={member.social.linkedin} className="social-icon">
                      <FiLinkedin />
                    </a>
                    <a href={member.social.twitter} className="social-icon">
                      <FiTwitter />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="social-icon"
                    >
                      <FiMail />
                    </a>
                  </div>
                </div>

                {/* Member Info */}
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <div className="member-role" style={{ color: member.color }}>
                    {member.role}
                  </div>
                  <p className="member-bio">{member.bio}</p>

                  {/* Specialties Tags */}
                  <div className="specialties">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="specialty-tag"
                        style={{
                          borderColor: member.color,
                          color: member.color,
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className="card-corner"
                  style={{ borderColor: member.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="join-section">
        <div className="team-container">
          <div className="join-content">
            <div className="join-icon">
              <FiUsers />
            </div>
            <h2 className="join-title">Want to Join Our Team?</h2>
            <p className="join-text">
              We're always looking for talented individuals who share our
              passion for innovation and excellence. Join us in building the
              future of digital experiences.
            </p>
            <button className="join-button">
              View Open Positions <FiZap />
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

        .team-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .team-bg {
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
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 40%;
          right: -10%;
          animation-delay: 4s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 30%;
          animation-delay: 8s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .team-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .team-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 0 80px;
          position: relative;
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
          margin: 0 auto;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Floating Icons */
        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          font-size: 40px;
          color: rgba(0, 99, 244, 0.3);
          animation: floatAround 15s ease-in-out infinite;
        }

        .float-icon:nth-child(1) { top: 20%; left: 10%; }
        .float-icon:nth-child(2) { top: 15%; right: 15%; }
        .float-icon:nth-child(3) { bottom: 25%; left: 15%; }
        .float-icon:nth-child(4) { bottom: 20%; right: 10%; }

        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(20px, 20px) rotate(270deg); }
        }

        /* Stats Section */
        .stats-section {
          padding: 60px 0;
        }

        .stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.stat-card {
  position: relative;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s ease;
  overflow: hidden;
  animation: fadeInUp 0.8s ease both;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
        }

        .stat-glow {
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

        .stat-card:hover .stat-glow {
          opacity: 0.3;
        }

        .stat-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Team Grid */
        .team-grid-section {
          padding: 100px 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 50px;
        }

        .member-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.8s ease both;
        }

        .member-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.6);
          box-shadow: 0 30px 80px rgba(0, 99, 244, 0.4);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .member-card:hover .card-glow {
          opacity: 0.15;
        }

        /* Member Image */
        .member-image-wrapper {
          position: relative;
          width: 100%;
          height: 420px;
          overflow: hidden;
        }

        .member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .member-card:hover .member-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .image-overlay {
          opacity: 0.8;
        }

        /* Social Overlay */
        .social-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .social-overlay {
          opacity: 1;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          font-size: 22px;
          text-decoration: none;
          transition: all 0.3s ease;
          transform: translateY(20px);
        }

        .member-card:hover .social-icon {
          transform: translateY(0);
        }

        .social-icon:nth-child(1) { transition-delay: 0.1s; }
        .social-icon:nth-child(2) { transition-delay: 0.15s; }
        .social-icon:nth-child(3) { transition-delay: 0.2s; }
        .social-icon:nth-child(4) { transition-delay: 0.25s; }

        .social-icon:hover {
          background: #00bfff;
          border-color: #00bfff;
          transform: translateY(0) scale(1.15);
        }

        /* Member Info */
        .member-info {
          padding: 35px 30px;
        }

        .member-name {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .member-role {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .member-bio {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        /* Specialties */
        .specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .specialty-tag {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .specialty-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Card Corner Decoration */
        .card-corner {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-top: 3px solid;
          border-right: 3px solid;
          border-radius: 0 10px 0 0;
          opacity: 0.3;
          transition: all 0.4s ease;
        }

        .member-card:hover .card-corner {
          opacity: 1;
          width: 60px;
          height: 60px;
        }

        /* Join Section */
        .join-section {
          padding: 100px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .join-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
        }

        .join-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0.5;
        }
          
        .join-icon {
  font-size: 72px;
  color: #00bfff;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  animation: bounce 2s ease infinite;
}

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .join-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .join-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .join-button {
          padding: 18px 45px;
          font-size: 1.15rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
        }

        .join-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .team-grid {
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .team-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .member-image-wrapper {
            height: 350px;
          }

          .join-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 2.5rem;
          }
        }
      `}</style>
      <VeeAIChatbot />
    </div>
  );
};

export default OurCoreTeam;
