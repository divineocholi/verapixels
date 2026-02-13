import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import founderImage from '@/assets/founder.jpeg';
import familyPhoto from "@/assets/verapixels family.jpeg";
import { 
  FiCode, 
  FiZap, 
  FiTarget,
  FiLayers,
  FiTrendingUp,
  FiArrowRight,
  FiStar,
  FiHeart,
  FiAward,
  FiBook,
  FiUsers,
  FiCamera,
  FiEdit3,
  FiGlobe,
  FiSmartphone,
  FiHeadphones
} from "react-icons/fi";

const AboutPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isReady, setIsReady] = useState(false);

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    founder: useRef<HTMLElement>(null),
    origin: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    meaning: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    mission: useRef<HTMLElement>(null),
    values: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  const cardRefs = {
    story: useRef<(HTMLDivElement | null)[]>([]),
    service: useRef<(HTMLDivElement | null)[]>([]),
    value: useRef<(HTMLDivElement | null)[]>([]),
    mission: useRef<(HTMLDivElement | null)[]>([]),
    timeline: useRef<(HTMLDivElement | null)[]>([]),
    highlight: useRef<(HTMLDivElement | null)[]>([]),
  };

  // Initialize card refs arrays
  useEffect(() => {
    cardRefs.story.current = [];
    cardRefs.service.current = [];
    cardRefs.value.current = [];
    cardRefs.mission.current = [];
    cardRefs.timeline.current = [];
    cardRefs.highlight.current = [];
  }, []);

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setScrollY(0);
    setVisibleSections(new Set());
    setVisibleCards(new Set());
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsReady(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Section visibility observer
  useEffect(() => {
    if (!isReady) return;

    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isReady]);

  // Card visibility observer
  useEffect(() => {
    if (!isReady) return;

    const allCardObservers: IntersectionObserver[] = [];

    Object.entries(cardRefs).forEach(([type, ref]) => {
      ref.current.forEach((card, index) => {
        if (!card) return;
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const cardId = `${type}-${index}`;
                setVisibleCards((prev) => new Set(prev).add(parseInt(cardId.split('-')[1])));
              }
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(card);
        allCardObservers.push(observer);
      });
    });

    return () => {
      allCardObservers.forEach((observer) => observer.disconnect());
    };
  }, [isReady]);

  // Navigation handlers
  const handleStartProject = () => {
    navigate("/consultationbooking");
  };

  const handleViewWork = () => {
    navigate("/allprojects");
  };

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Verapixels - Digital Innovation Company",
    "description": "Learn about Verapixels, our founder Ocholi Divine, and our mission to create pixel-perfect digital solutions.",
    "publisher": {
      "@type": "Organization",
      "name": "Verapixels",
      "logo": "https://verapixels.com/logo.png",
      "url": "https://verapixels.com",
      "founder": {
        "@type": "Person",
        "name": "Ocholi Divine",
        "jobTitle": "Founder & CEO",
        "image": "https://verapixels.com/founder.jpg",
        "url": "https://verapixels.com/about#founder",
        "sameAs": [
          "https://linkedin.com/in/ocholi-divine",
          "https://twitter.com/ocholidivine"
        ],
        "description": "Founder and CEO of Verapixels, a digital innovation company creating pixel-perfect solutions for businesses worldwide."
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Verapixels",
      "foundingDate": "2025",
      "foundingLocation": "Nigeria",
      "founder": {
        "@type": "Person",
        "name": "Ocholi Divine"
      },
      "description": "Verapixels is a digital innovation company specializing in business naming, logo design, website development, app development, and ongoing support.",
      "url": "https://verapixels.com",
      "logo": "https://verapixels.com/logo.png"
    }
  };

  // Open Graph data for social sharing
  const openGraphData = {
    title: "Ocholi Divine - Founder & CEO of Verapixels | Digital Innovation Leader",
    description: "Meet Ocholi Divine, Founder & CEO of Verapixels. Learn about our journey in digital innovation and pixel-perfect solutions.",
    url: "https://verapixels.com/about",
    image: "https://verapixels.com/founder.jpg",
    type: "profile",
    profile: {
      firstName: "Ocholi",
      lastName: "Divine",
      username: "ocholidivine",
      gender: "male"
    }
  };

  const services = [
    {
      icon: <FiEdit3 />,
      title: "Business Naming",
      description: "We help you craft the perfect name that captures your brand's essence and resonates with your audience.",
      color: "#FFD700"
    },
    {
      icon: <FiLayers />,
      title: "Logo Design",
      description: "Professional logo design that represents your brand identity and makes a lasting impression.",
      color: "#FF6B9D"
    },
    {
      icon: <FiGlobe />,
      title: "Website Development",
      description: "Stunning, responsive websites that convert visitors into customers and elevate your online presence.",
      color: "#00D1FF"
    },
    {
      icon: <FiSmartphone />,
      title: "App Development",
      description: "Custom mobile and web applications built with cutting-edge technology for seamless user experiences.",
      color: "#00FF88"
    },
    {
      icon: <FiCode />,
      title: "Graphic Design",
      description: "Eye-catching graphics and visual content that communicates your message effectively.",
      color: "#9D4EDD"
    },
    {
      icon: <FiHeadphones />,
      title: "Ongoing Support",
      description: "Continuous support and maintenance to keep your digital assets running smoothly and evolving with your needs.",
      color: "#06FFA5"
    }
  ];

  const values = [
    {
      icon: <FiZap />,
      title: "Innovation First",
      description: "We push boundaries with cutting-edge technology, creating solutions that define the future of digital experiences.",
      color: "#FFD700"
    },
    {
      icon: <FiHeart />,
      title: "Client-Centric Approach",
      description: "Your success is our mission. We build lasting partnerships through transparency, dedication, and exceptional results.",
      color: "#FF6B9D"
    },
    {
      icon: <FiTarget />,
      title: "Pixel-Perfect Execution",
      description: "Every detail matters. We craft solutions with precision, ensuring flawless design and seamless functionality.",
      color: "#00D1FF"
    },
    {
      icon: <FiAward />,
      title: "Excellence Driven",
      description: "We don't just meet expectations—we exceed them. Quality and innovation are at the heart of everything we build.",
      color: "#00FF88"
    }
  ];

  const milestones = [
    { year: "2025", title: "Foundation", description: "Verapixels was born from a vision to transform digital experiences", color: "#0063f4" },
    { year: "2025", title: "First Client", description: "Delivered our first project, setting the standard for excellence", color: "#00bfff" },
    { year: "2026+", title: "Growing Impact", description: "Expanding our reach and building the future of tech solutions", color: "#00ff88" }
  ];

  const parallaxOffset = scrollY * 0.3;

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Ocholi Divine - Founder & CEO of Verapixels | Digital Innovation Leader</title>
        <meta 
          name="description" 
          content="Ocholi Divine is the Founder and CEO of Verapixels, a digital innovation company established in 2025. Leading a team of 10+ experts in creating pixel-perfect digital solutions including business naming, logo design, and web development." 
        />
        <meta 
          name="keywords" 
          content="Ocholi Divine, Verapixels Founder, CEO Verapixels, Digital Innovation Leader, Tech Entrepreneur Nigeria, Web Development Expert, Business Naming Specialist" 
        />
        <meta name="author" content="Ocholi Divine" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://verapixels.com/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={openGraphData.title} />
        <meta property="og:description" content={openGraphData.description} />
        <meta property="og:image" content={openGraphData.image} />
        <meta property="og:url" content={openGraphData.url} />
        <meta property="og:site_name" content="Verapixels" />
        <meta property="profile:first_name" content={openGraphData.profile.firstName} />
        <meta property="profile:last_name" content={openGraphData.profile.lastName} />
        <meta property="profile:username" content={openGraphData.profile.username} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@verapixels_" />
        <meta name="twitter:creator" content="@ocholidivine" />
        <meta name="twitter:title" content={openGraphData.title} />
        <meta name="twitter:description" content={openGraphData.description} />
        <meta name="twitter:image" content={openGraphData.image} />
        <meta name="twitter:label1" content="Position" />
        <meta name="twitter:data1" content="Founder & CEO" />
        <meta name="twitter:label2" content="Company" />
        <meta name="twitter:data2" content="Verapixels" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        
        {/* Additional SEO Meta Tags */}
        <meta name="article:author" content="Ocholi Divine" />
        <meta name="article:published_time" content="2025-01-01" />
        <meta name="article:modified_time" content={new Date().toISOString()} />
        <meta name="article:section" content="About Us" />
        <meta name="article:tag" content="Digital Innovation" />
        <meta name="article:tag" content="Web Development" />
        <meta name="article:tag" content="Tech Leadership" />
      </Helmet>

      <div className="about-page" itemScope itemType="https://schema.org/AboutPage">
        <div className="about-bg-particles">
          <div 
            className="particle particle-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02 + parallaxOffset}px)`
            }}
          />
          <div 
            className="particle particle-2"
            style={{
              transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03 - parallaxOffset * 0.8}px)`
            }}
          />
          <div 
            className="particle particle-3"
            style={{
              transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * -0.02 + parallaxOffset * 1.2}px)`
            }}
          />
        </div>

        <section 
          className={`about-hero ${visibleSections.has('hero') ? 'visible' : ''}`}
          ref={sectionRefs.hero}
        >
          <div className="about-container">
            <div className="hero-badge">
              <FiStar /> Founded in 2025
            </div>
            <h1 className="hero-title">
              The Story Behind
              <br />
              <span className="gradient-text">Verapixels</span>
            </h1>
            <p className="hero-subtitle">
              Where innovation meets precision, and every pixel tells a story of excellence.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="stat-number">10+</div>
                <div className="stat-text">Team Members</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">20+</div>
                <div className="stat-text">Projects</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">100%</div>
                <div className="stat-text">Dedication</div>
              </div>
            </div>
          </div>
        </section>

        <section 
          className={`founder-section ${visibleSections.has('founder') ? 'visible' : ''}`}
          ref={sectionRefs.founder}
          id="founder"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="about-container">
            <div className="founder-grid">
              <div className="founder-image-wrapper">
                <div className="founder-frame">
                  <img 
                    src={founderImage} 
                    alt="Ocholi Divine - Founder & CEO of Verapixels"
                    title="Ocholi Divine, Founder and CEO of Verapixels"
                    className="founder-image"
                    itemProp="image"
                    loading="lazy"
                    width="400"
                    height="600"
                  />
                  <div className="founder-overlay"></div>
                  <figcaption className="sr-only">
                    Ocholi Divine, Founder and CEO of Verapixels - Digital Innovation Company
                  </figcaption>
                </div>
              </div>
              
              <div className="founder-content">
                <div className="founder-label">
                  <FiBook /> Our Founder
                </div>
                <h1 className="section-title" itemProp="name">
                  Meet <span className="gradient-text" itemProp="givenName">Ocholi</span> <span itemProp="familyName">Divine</span>
                </h1>
                <meta itemProp="jobTitle" content="Founder & CEO of Verapixels" />
                <meta itemProp="worksFor" content="Verapixels" />
                <meta itemProp="url" content="https://verapixels.com/about" />
                
                <p className="founder-text" itemProp="description">
                  <strong itemProp="name">Ocholi Divine</strong> is the visionary <strong>Founder and CEO of Verapixels</strong>. 
                  In 2025, he embarked on a journey to revolutionize the digital landscape. 
                  With a passion for technology and an eye for perfection, he founded Verapixels with 
                  a clear vision: to create digital experiences that don't just work—they inspire.
                </p>
                
                <blockquote className="founder-quote" itemProp="description">
                  "I wanted to build a company where innovation meets craftsmanship, where every line 
                  of code and every design element serves a purpose. Verapixels represents that commitment 
                  to excellence."
                  <cite className="quote-cite">— Ocholi Divine, Founder & CEO</cite>
                </blockquote>
                
                <div className="founder-stats">
                  <div className="stat-box" itemProp="knowsAbout" itemScope itemType="https://schema.org/Thing">
                    <FiCode className="stat-icon" />
                    <div className="stat-label">Tech Visionary</div>
                    <meta itemProp="name" content="Technology Innovation" />
                  </div>
                  <div className="stat-box" itemProp="knowsAbout" itemScope itemType="https://schema.org/Thing">
                    <FiTarget className="stat-icon" />
                    <div className="stat-label">Problem Solver</div>
                    <meta itemProp="name" content="Digital Solutions" />
                  </div>
                  <div className="stat-box" itemProp="knowsAbout" itemScope itemType="https://schema.org/Thing">
                    <FiTrendingUp className="stat-icon" />
                    <div className="stat-label">Innovation Leader</div>
                    <meta itemProp="name" content="Business Innovation" />
                  </div>
                </div>
                
                {/* Breadcrumb with hidden links for SEO */}
               {/* Breadcrumb with hidden links for SEO */}
<nav 
  className="breadcrumb" 
  aria-label="Breadcrumb" 
  style={{ 
    opacity: 0, 
    pointerEvents: 'none', 
    position: 'absolute', 
    width: '1px', 
    height: '1px', 
    overflow: 'hidden' 
  }}
>
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="https://verapixels.com">
        <span itemProp="name">Home</span>
      </a>
      <meta itemProp="position" content="1" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="https://verapixels.com/about">
        <span itemProp="name">About</span>
      </a>
      <meta itemProp="position" content="2" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <span itemProp="name">Founder</span>
      <meta itemProp="position" content="3" />
    </li>
  </ol>
</nav>
              </div>
            </div>
          </div>
        </section>

        <section 
          className={`origin-section ${visibleSections.has('origin') ? 'visible' : ''}`}
          ref={sectionRefs.origin}
        >
          <div className="about-container">
            <div className="origin-header">
              <h2 className="section-title text-center">
                The Birth of <span className="gradient-text">Verapixels</span>
              </h2>
              <p className="section-subtitle">How a late-night scroll became a tech revolution</p>
            </div>

            <div className="origin-story">
              {[
                {
                  number: "01",
                  icon: <FiBook />,
                  title: "The Search Begins",
                  text: "It started with a simple question: \"What should I name my business?\" Late one night, scrolling through TikTok for inspiration, I searched \"how to name a business.\" That's when I discovered \"Vera\"—a word that resonated with truth and authenticity."
                },
                {
                  number: "02",
                  icon: <FiLayers />,
                  title: "The Pixel Moment",
                  text: "Then came the memory—my first day at tech school. A close friend asked our teacher about \"pixels,\" and that word stuck with me. Pixels are the building blocks of everything digital. They're what make designs come alive, what turn concepts into reality."
                },
                {
                  number: "03",
                  icon: <FiStar />,
                  title: "Perfect Fusion",
                  text: "I combined \"Vera\" with \"Pixels\" because that's what we do—we create truth through pixels. When you give a design element the right padding, the right spacing, the perfect 20px—and it looks absolutely flawless—that's the Verapixels standard."
                }
              ].map((story, i) => (
                <div
                  key={i}
                  ref={(el) => { if (cardRefs.story.current) cardRefs.story.current[i] = el; }}
                  className={`story-card ${visibleCards.has(i) ? 'card-visible' : ''}`}
                  style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                >
                  <div className="story-number">{story.number}</div>
                  <div className="story-icon">{story.icon}</div>
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-text">{story.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          className={`services-section ${visibleSections.has('services') ? 'visible' : ''}`}
          ref={sectionRefs.services}
        >
          <div className="about-container">
            <h2 className="section-title text-center">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="section-subtitle">Complete digital solutions from concept to continuous support</p>
            
            <div className="services-grid">
              {services.map((service, i) => (
                <div 
                  key={i}
                  ref={(el) => { if (cardRefs.service.current) cardRefs.service.current[i] = el; }}
                  className={`service-card ${visibleCards.has(i) ? 'card-visible' : ''}`}
                  style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                >
                  <div 
                    className="service-icon"
                    style={{ color: service.color }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-glow" style={{ background: service.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          className={`meaning-section ${visibleSections.has('meaning') ? 'visible' : ''}`}
          ref={sectionRefs.meaning}
        >
          <div className="about-container">
            <h2 className="section-title text-center">
              What <span className="gradient-text">Verapixels</span> Means
            </h2>
            
            <div className="meaning-content">
              <div className="meaning-breakdown">
                <div className="word-part">
                  <h3 className="word-title">VERA</h3>
                  <p className="word-description">
                    Derived from Latin, meaning "truth" and "authenticity." It represents our commitment 
                    to honest, transparent partnerships and genuine innovation.
                  </p>
                </div>
                <div className="plus-sign">+</div>
                <div className="word-part">
                  <h3 className="word-title">PIXELS</h3>
                  <p className="word-description">
                    The fundamental building blocks of digital design. Every great interface, every stunning 
                    visual—it all starts with pixels perfectly placed.
                  </p>
                </div>
              </div>
              
              <div className="meaning-result">
                <h3 className="result-title">= Authentic Digital Excellence</h3>
                <p className="result-text">
                  Verapixels embodies the perfect union of truth and precision. We believe that great 
                  technology isn't just about functionality—it's about creating experiences that are 
                  authentic, beautiful, and meticulously crafted down to the last pixel.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section 
          className={`team-photo-section ${visibleSections.has('team') ? 'visible' : ''}`}
          ref={sectionRefs.team}
        >
          <div className="about-container">
            <div className="team-header">
              <div className="team-badge">
                <FiCamera /> Our Team
              </div>
              <h2 className="section-title text-center">
                Meet the <span className="gradient-text">Dream Team</span>
              </h2>
              <p className="section-subtitle">
                The passionate minds driving innovation at Verapixels
              </p>
            </div>

            <div className="team-photo-wrapper">
              <div className="photo-container">
                <img
                  src={familyPhoto}
                  alt="Verapixels Team - Digital Innovation Experts"
                  title="Verapixels Team working on digital solutions"
                  className="team-photo"
                  loading="lazy"
                  width="1400"
                  height="700"
                />
                <div className="photo-overlay-gradient"></div>
                <div className="photo-caption">
                  <FiUsers className="caption-icon" />
                  <span>The Verapixels Family - United by Innovation</span>
                </div>
              </div>

              <div className="team-highlights">
                {[
                  { icon: <FiUsers />, number: "10+", label: "Talented Members", color: "#0063f4" },
                  { icon: <FiHeart />, number: "100%", label: "Team Spirit", color: "#00ff88" },
                  { icon: <FiZap />, number: "24/7", label: "Innovation Drive", color: "#ffd700" }
                ].map((highlight, i) => (
                  <div 
                    key={i}
                    ref={(el) => { if (cardRefs.highlight.current) cardRefs.highlight.current[i] = el; }}
                    className={`highlight-card ${visibleCards.has(i) ? 'card-visible' : ''}`}
                    style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                  >
                    <div className="highlight-icon" style={{ color: highlight.color }}>
                      {highlight.icon}
                    </div>
                    <div className="highlight-content">
                      <div className="highlight-number">{highlight.number}</div>
                      <div className="highlight-label">{highlight.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section 
          className={`mission-section ${visibleSections.has('mission') ? 'visible' : ''}`}
          ref={sectionRefs.mission}
        >
          <div className="about-container">
            <div className="mission-grid">
              {[
                {
                  icon: <FiTarget />,
                  title: "Our Mission",
                  text: "To empower businesses with cutting-edge digital solutions that drive growth, inspire innovation, and deliver measurable results. We're here to transform your vision into pixel-perfect reality."
                },
                {
                  icon: <FiZap />,
                  title: "Our Vision",
                  text: "To become the leading force in digital innovation, setting new standards for excellence in web development, design, and technology solutions. We envision a future where every business has access to world-class digital experiences."
                }
              ].map((mission, i) => (
                <div 
                  key={i}
                  ref={(el) => { if (cardRefs.mission.current) cardRefs.mission.current[i] = el; }}
                  className={`mission-card ${visibleCards.has(i) ? 'card-visible' : ''}`}
                  style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                >
                  <div className="mission-icon">{mission.icon}</div>
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-text">{mission.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          className={`values-section ${visibleSections.has('values') ? 'visible' : ''}`}
          ref={sectionRefs.values}
        >
          <div className="about-container">
            <div className="values-header">
              <div className="values-badge">
                <FiStar /> Our Core Values
              </div>
            </div>
            <h2 className="section-title text-center">
              The principles that <span className="gradient-text">drive us</span>
            </h2>
            <p className="section-subtitle">The foundation of everything we build</p>
            
            <div className="values-grid">
              {values.map((value, i) => (
                <div 
                  key={i}
                  ref={(el) => { if (cardRefs.value.current) cardRefs.value.current[i] = el; }}
                  className={`value-card ${visibleCards.has(i) ? 'card-visible' : ''}`}
                  style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                >
                  <div 
                    className="value-icon"
                    style={{ color: value.color }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                  <div className="value-glow" style={{ background: value.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          className={`timeline-section ${visibleSections.has('timeline') ? 'visible' : ''}`}
          ref={sectionRefs.timeline}
        >
          <div className="about-container">
            <h2 className="section-title text-center">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="section-subtitle">Building the future, one pixel at a time</p>
            
            <div className="timeline">
              <div className="timeline-line"></div>
              {milestones.map((milestone, i) => (
                <div 
                  key={i}
                  ref={(el) => { if (cardRefs.timeline.current) cardRefs.timeline.current[i] = el; }}
                  className={`timeline-item ${visibleCards.has(i) ? 'card-visible' : ''}`}
                  style={{ transitionDelay: visibleCards.has(i) ? `${i * 0.15}s` : '0s' }}
                >
                  <div className="timeline-connector" style={{ background: milestone.color }}></div>
                  <div className="timeline-dot" style={{ background: milestone.color }}></div>
                  <div className="timeline-content">
                    <div className="timeline-year" style={{ background: milestone.color }}>{milestone.year}</div>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-text">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
          ref={sectionRefs.cta}
        >
          <div className="about-container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Create Something Amazing?</h2>
              <p className="cta-description">
                Let's bring your vision to life with pixel-perfect precision
              </p>
              <div className="cta-buttons">
                <button 
                  className="btn-primary-large"
                  onClick={handleStartProject}
                >
                  Start Your Project <FiArrowRight />
                </button>
                <button 
                  className="btn-secondary-large"
                  onClick={handleViewWork}
                >
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden SEO Content */}
        <section className="seo-content" style={{ display: 'none' }}>
          <h2>Ocholi Divine - Founder & CEO of Verapixels</h2>
          <p>
            Ocholi Divine is the Founder and Chief Executive Officer of Verapixels, 
            a leading digital innovation company specializing in comprehensive digital 
            solutions including business naming, logo design, website development, 
            app development, and ongoing technical support.
          </p>
          <p>
            As the CEO of Verapixels, Ocholi Divine leads a team of  expert 
            professionals dedicated to creating pixel-perfect digital experiences 
            for clients worldwide. Under his leadership, Verapixels has delivered 
            20+ successful projects since its founding in 2025.
          </p>
          <p>
            Keywords: Ocholi Divine, Founder Ocholi Divine, CEO of Verapixels, 
            Verapixels Founder, Tech Entrepreneur Nigeria, Digital Innovation Leader, 
            Web Development Expert, Business Naming Specialist, Logo Design Expert, 
            App Development Nigeria.
          </p>
        </section>

        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            overflow-x: hidden;
            width: 100%;
            max-width: 100vw;
          }

          .about-page {
            background: #000;
            color: #fff;
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
            width: 100%;
            max-width: 100vw;
          }

          .about-bg-particles {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .particle {
            position: absolute;
            border-radius: 50%;
            filter: blur(140px);
            opacity: 0.15;
            animation: float 12s ease-in-out infinite;
            transition: transform 0.3s ease-out;
          }

          .particle-1 {
            width: 600px;
            height: 600px;
            background: linear-gradient(135deg, #0063f4, #00bfff);
            top: 10%;
            left: -15%;
          }

          .particle-2 {
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, #00ff88, #0063f4);
            top: 50%;
            right: -10%;
            animation-delay: 4s;
          }

          .particle-3 {
            width: 550px;
            height: 550px;
            background: linear-gradient(135deg, #ffd700, #ff6b9d);
            bottom: 10%;
            left: 40%;
            animation-delay: 8s;
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -40px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
          }

          section {
            opacity: 0;
            transform: translateY(60px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            width: 100%;
            overflow: hidden;
          }

          section.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .about-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 1;
            width: 100%;
            overflow: hidden;
          }

          .about-hero {
            min-height: 85vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 160px 0 100px;
          }

          .breadcrumb {
  margin-top: 40px;
  padding: 15px;
  background: transparent;
  border: none;
}

.breadcrumb ol {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  position: relative;
}

.breadcrumb li:not(:last-child):after {
  content: "›";
  margin-left: 15px;
  color: transparent;
}

.breadcrumb a, .breadcrumb span {
  color: transparent !important;
  background-color: transparent !important;
  text-decoration: none;
}

          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 28px;
            background: rgba(0, 99, 244, 0.15);
            border: 1px solid rgba(0, 99, 244, 0.4);
            border-radius: 30px;
            color: #00bfff;
            font-weight: 700;
            font-size: 1rem;
            margin-bottom: 30px;
            transition: all 0.3s ease;
          }

          .hero-badge:hover {
            background: rgba(0, 99, 244, 0.25);
            transform: translateY(-3px);
          }

          .hero-title {
            font-size: clamp(48px, 8vw, 88px);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 30px;
            letter-spacing: -0.02em;
          }

          .gradient-text {
            background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .hero-subtitle {
            font-size: clamp(1.15rem, 2.5vw, 1.4rem);
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.8);
            max-width: 800px;
            margin: 0 auto 60px;
          }

          .hero-stats {
            display: flex;
            gap: 60px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-stat {
            text-align: center;
            opacity: 0;
            animation: fadeInUp 0.8s ease forwards;
          }

          .hero-stat:nth-child(1) { animation-delay: 0.2s; }
          .hero-stat:nth-child(2) { animation-delay: 0.4s; }
          .hero-stat:nth-child(3) { animation-delay: 0.6s; }

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

          .stat-number {
            font-size: clamp(3rem, 6vw, 4rem);
            font-weight: 900;
            background: linear-gradient(135deg, #0063f4, #00bfff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            margin-bottom: 10px;
          }

          .stat-text {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 600;
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          .founder-section {
            padding: 120px 0;
            background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
          }

          .founder-grid {
            display: grid;
            grid-template-columns: 1fr 1.3fr;
            gap: 80px;
            align-items: center;
          }

          @media (max-width: 1024px) {
            .founder-grid {
              grid-template-columns: 1fr;
              gap: 50px;
            }
          }

          .founder-frame {
            position: relative;
            border-radius: 30px;
            overflow: hidden;
            border: 2px solid rgba(0, 99, 244, 0.3);
            box-shadow: 0 30px 80px rgba(0, 99, 244, 0.2);
            transition: all 0.5s ease;
          }

          .founder-section.visible .founder-frame {
            animation: zoomIn 1s ease;
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .founder-frame:hover {
            transform: translateY(-10px);
            box-shadow: 0 40px 100px rgba(0, 99, 244, 0.4);
          }

          .founder-image {
            width: 100%;
            height: auto;
            aspect-ratio: 3/4;
            object-fit: cover;
            object-position: center center;
            display: block;
            transition: transform 0.8s ease;
          }

          .founder-frame:hover .founder-image {
            transform: scale(1.05);
          }

          .founder-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 60%, rgba(0, 99, 244, 0.3));
            pointer-events: none;
          }

          .founder-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: rgba(0, 99, 244, 0.1);
            border: 1px solid rgba(0, 99, 244, 0.3);
            border-radius: 25px;
            color: #00bfff;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 25px;
          }

          .section-title {
            font-size: clamp(36px, 6vw, 64px);
            font-weight: 900;
            line-height: 1.2;
            margin-bottom: 30px;
          }

          .text-center {
            text-align: center;
          }

          .section-subtitle {
            font-size: clamp(1.05rem, 2vw, 1.2rem);
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            margin: -10px 0 60px;
          }

          .founder-text {
            font-size: clamp(1.05rem, 2vw, 1.15rem);
            line-height: 1.9;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 25px;
          }

          .founder-quote {
            border-left: 4px solid #0063f4;
            padding-left: 20px;
            margin: 30px 0;
            font-style: italic;
            color: rgba(255, 255, 255, 0.9);
          }

          .quote-cite {
            display: block;
            margin-top: 10px;
            font-style: normal;
            font-weight: 600;
            color: #00bfff;
          }

          .founder-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 40px;
          }

          @media (max-width: 768px) {
            .founder-stats {
              grid-template-columns: 1fr;
            }
          }

          .stat-box {
            padding: 25px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            text-align: center;
            transition: all 0.4s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .stat-box:hover {
            background: rgba(0, 99, 244, 0.1);
            border-color: rgba(0, 99, 244, 0.4);
            transform: translateY(-8px);
          }

          .stat-icon {
            font-size: 2.5rem;
            color: #00bfff;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }

          .stat-box:hover .stat-icon {
            transform: scale(1.15) rotate(5deg);
          }

          .stat-label {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
          }

          .breadcrumb {
            margin-top: 40px;
            padding: 15px;
            background: #000;
            border: none;
          }

          .breadcrumb ol {
            display: flex;
            gap: 15px;
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .breadcrumb li {
            position: relative;
          }

          .breadcrumb li:not(:last-child):after {
            content: "›";
            margin-left: 15px;
            color: #000;
          }

          .breadcrumb a, .breadcrumb span {
            color: #000 !important;
            background-color: #000 !important;
            text-decoration: none;
          }

          .origin-section {
            padding: 120px 0;
          }

          .origin-header {
            margin-bottom: 80px;
          }

          .origin-story {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
          }

          .story-card {
            position: relative;
            padding: 50px 35px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 30px;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            opacity: 0;
            transform: translateY(50px);
          }

          .story-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .story-card:hover {
            transform: translateY(-15px);
            border-color: rgba(0, 99, 244, 0.5);
            background: rgba(255, 255, 255, 0.04);
            box-shadow: 0 25px 60px rgba(0, 99, 244, 0.3);
          }

          .story-number {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 5rem;
            font-weight: 900;
            background: linear-gradient(135deg, #0063f4, #00bfff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            opacity: 0.15;
            line-height: 1;
          }

          .story-icon {
            font-size: 3.5rem;
            color: #00bfff;
            margin-bottom: 25px;
            transition: transform 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .story-card:hover .story-icon {
            transform: scale(1.15) rotate(10deg);
          }

          .story-title {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 20px;
            color: #fff;
          }

          .story-text {
            font-size: 1.05rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.75);
          }

          .services-section {
            padding: 120px 0;
            background: linear-gradient(180deg, transparent, rgba(0, 255, 136, 0.02), transparent);
          }

          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
            margin-top: 60px;
          }

          .service-card {
            position: relative;
            padding: 50px 35px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            opacity: 0;
            transform: translateY(50px);
          }

          .service-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .service-card:hover {
            transform: translateY(-20px);
            border-color: rgba(0, 255, 136, 0.6);
            box-shadow: 0 25px 60px rgba(0, 255, 136, 0.3);
          }

          .service-glow {
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

          .service-card:hover .service-glow {
            opacity: 0.3;
          }

          .service-icon {
            font-size: 3.5rem;
            margin-bottom: 25px;
            transition: transform 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .service-card:hover .service-icon {
            transform: scale(1.2) rotate(10deg);
          }

          .service-title {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 15px;
            color: #fff;
          }

          .service-description {
            font-size: 1.05rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.75);
          }

          .meaning-section {
            padding: 120px 0;
            background: linear-gradient(180deg, transparent, rgba(0, 191, 255, 0.03), transparent);
          }

          .meaning-content {
            max-width: 1100px;
            margin: 60px auto 0;
          }

          .meaning-breakdown {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 60px;
            align-items: center;
            margin-bottom: 80px;
          }

          @media (max-width: 768px) {
            .meaning-breakdown {
              grid-template-columns: 1fr;
              gap: 30px;
            }
          }

          .word-part {
            padding: 50px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            text-align: center;
            transition: all 0.4s ease;
          }

          .meaning-section.visible .word-part {
            animation: scaleIn 1s ease both;
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .word-part:nth-child(1) { animation-delay: 0.2s; }
          .word-part:nth-child(3) { animation-delay: 0.4s; }

          .word-part:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 191, 255, 0.4);
            background: rgba(0, 191, 255, 0.05);
          }

          .word-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(135deg, #0063f4, #00bfff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            letter-spacing: 2px;
          }

          .word-description {
            font-size: 1.05rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.75);
          }

          .plus-sign {
            font-size: 4rem;
            font-weight: 900;
            color: #00bfff;
            opacity: 0.5;
            animation: pulse 2s ease infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }

          .meaning-result {
            padding: 60px;
            background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), rgba(0, 191, 255, 0.05));
            border: 2px solid rgba(0, 191, 255, 0.2);
            border-radius: 30px;
            text-align: center;
          }

          .meaning-section.visible .meaning-result {
            animation: fadeInUp 1s ease 0.6s both;
          }

          .result-title {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #0063f4, #00ff88);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .result-text {
            font-size: 1.15rem;
            line-height: 1.9;
            color: rgba(255, 255, 255, 0.85);
          }

          .team-photo-section {
            padding: 120px 0;
          }

          .team-header {
            margin-bottom: 70px;
            text-align: center;
          }

          .team-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 28px;
            background: rgba(0, 191, 255, 0.15);
            border: 1px solid rgba(0, 191, 255, 0.4);
            border-radius: 30px;
            color: #00bfff;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .team-badge:hover {
            background: rgba(0, 191, 255, 0.25);
            transform: translateY(-3px);
          }

          .team-photo-wrapper {
            max-width: 1200px;
            margin: 0 auto;
          }

          .photo-container {
            position: relative;
            border-radius: 30px;
            overflow: hidden;
            margin-bottom: 50px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            aspect-ratio: 4/3;
            width: 100%;
          }

          .team-photo-section.visible .photo-container {
            animation: zoomIn 1s ease;
          }

          .photo-container:hover {
            transform: translateY(-10px);
            box-shadow: 0 40px 100px rgba(0, 99, 244, 0.3);
          }
             
          .team-photo {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center 15%;
            transition: transform 0.8s ease;
          }

          .photo-container:hover .team-photo {
            transform: scale(1.05);
          }

          .photo-overlay-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.8));
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .photo-container:hover .photo-overlay-gradient {
            opacity: 1;
          }

          .photo-caption {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.3rem;
            font-weight: 700;
            color: #fff;
            opacity: 0;
            transition: all 0.4s ease;
          }

          .photo-container:hover .photo-caption {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }

          .caption-icon {
            font-size: 2rem;
            color: #00bfff;
          }

          .team-highlights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
          }

          .highlight-card {
            display: flex;
            align-items: center;
            gap: 25px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(50px);
          }

          .highlight-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .highlight-card:hover {
            transform: translateY(-15px);
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(0, 191, 255, 0.5);
            box-shadow: 0 20px 50px rgba(0, 191, 255, 0.3);
          }

          .highlight-icon {
            font-size: 48px;
            transition: transform 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .highlight-card:hover .highlight-icon {
            transform: scale(1.2) rotate(10deg);
          }

          .highlight-content {
            flex: 1;
          }

          .highlight-number {
            font-size: 2.5rem;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.6));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .highlight-label {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 600;
          }

          .mission-section {
            padding: 120px 0;
            background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
          }

          .mission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 50px;
            max-width: 1200px;
            margin: 0 auto;
          }

          @media (max-width: 768px) {
            .mission-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
          }

          .mission-card {
            padding: 60px 45px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            opacity: 0;
            transform: translateY(50px);
          }

          .mission-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .mission-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .mission-card:hover::before {
            opacity: 1;
          }

          .mission-card:hover {
            transform: translateY(-20px);
            border-color: rgba(0, 99, 244, 0.6);
            box-shadow: 0 30px 70px rgba(0, 99, 244, 0.4);
          }

          .mission-icon {
            font-size: 4rem;
            color: #00bfff;
            margin-bottom: 30px;
            transition: transform 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .mission-card:hover .mission-icon {
            transform: scale(1.15) rotate(10deg);
          }

          .mission-title {
            font-size: 2.2rem;
            font-weight: 900;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }

          .mission-text {
            font-size: 1.1rem;
            line-height: 1.9;
            color: rgba(255, 255, 255, 0.8);
            position: relative;
            z-index: 1;
          }

          .values-section {
            padding: 120px 0;
          }

          .values-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .values-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 28px;
            background: rgba(255, 215, 0, 0.15);
            border: 1px solid rgba(255, 215, 0, 0.4);
            border-radius: 30px;
            color: #FFD700;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .values-badge:hover {
            background: rgba(255, 215, 0, 0.25);
            transform: translateY(-3px);
          }

          .values-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
          }

          .value-card {
            position: relative;
            padding: 50px 35px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            opacity: 0;
            transform: translateY(50px);
          }

          .value-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .value-card:hover {
            transform: translateY(-20px);
            border-color: rgba(0, 99, 244, 0.6);
            box-shadow: 0 25px 60px rgba(0, 99, 244, 0.4);
          }

          .value-glow {
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

          .value-card:hover .value-glow {
            opacity: 0.3;
          }

          .value-icon {
            font-size: 3.5rem;
            margin-bottom: 25px;
            transition: transform 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .value-card:hover .value-icon {
            transform: scale(1.2) rotate(10deg);
          }

          .value-title {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 15px;
            color: #fff;
          }

          .value-description {
            font-size: 1.05rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.75);
          }

          .timeline-section {
            padding: 120px 0;
            background: linear-gradient(180deg, transparent, rgba(0, 191, 255, 0.03), transparent);
          }

          .timeline {
            max-width: 800px;
            margin: 60px auto 0;
            position: relative;
          }

          .timeline-line {
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, #0063f4, #00bfff, #00ff88);
          }

          .timeline-item {
            position: relative;
            padding-left: 100px;
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .timeline-item.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .timeline-connector {
            position: absolute;
            left: 32px;
            top: 12px;
            width: 68px;
            height: 3px;
          }

          .timeline-dot {
            position: absolute;
            left: 18px;
            top: 8px;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            box-shadow: 0 0 20px currentColor;
            animation: dotPulse 2s ease infinite;
            z-index: 2;
          }

          @keyframes dotPulse {
            0%, 100% { 
              box-shadow: 0 0 20px currentColor;
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 40px currentColor;
              transform: scale(1.1);
            }
          }

          .timeline-content {
            padding: 35px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            transition: all 0.5s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .timeline-content:hover {
            transform: translateX(15px);
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(0, 191, 255, 0.5);
            box-shadow: 0 20px 50px rgba(0, 191, 255, 0.3);
          }

          .timeline-year {
            display: inline-block;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.95rem;
            color: #000;
            margin-bottom: 15px;
          }

          .timeline-title {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 12px;
            color: #fff;
          }

          .timeline-text {
            font-size: 1.05rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.75);
          }

          .cta-section {
            padding: 120px 0 140px;
          }

          .cta-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            padding: 80px 60px;
            background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), rgba(0, 191, 255, 0.05));
            border: 2px solid rgba(0, 99, 244, 0.3);
            border-radius: 40px;
            position: relative;
            overflow: hidden;
          }

          .cta-section.visible .cta-content {
            animation: scaleIn 1s ease;
          }

          .cta-content::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0, 191, 255, 0.1), transparent 70%);
            animation: rotate 10s linear infinite;
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .cta-title {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 900;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }

          .cta-description {
            font-size: 1.2rem;
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

          .btn-primary-large {
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
            box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
          }

          .btn-primary-large:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
          }

          .btn-secondary-large {
            padding: 18px 45px;
            font-size: 1.15rem;
            font-weight: 700;
            background: transparent;
            color: #00bfff;
            border: 2px solid #00bfff;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-secondary-large:hover {
            background: rgba(0, 191, 255, 0.1);
            transform: translateY(-5px);
          }

          .seo-content {
            position: absolute;
            opacity: 0.001;
            pointer-events: none;
            height: 1px;
            overflow: hidden;
          }

          /* Responsive Styles */
          @media (max-width: 1024px) {
            .founder-grid {
              grid-template-columns: 1fr;
              gap: 50px;
            }

            .founder-stats {
              grid-template-columns: repeat(3, 1fr);
            }

            .meaning-breakdown {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .plus-sign {
              transform: rotate(0deg);
              font-size: 3rem;
              padding: 20px 0;
            }

            .mission-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .about-container {
              padding: 0 20px;
            }

            .hero-stats {
              gap: 40px;
            }

            .origin-story {
              grid-template-columns: 1fr;
            }

            .services-grid {
              grid-template-columns: 1fr;
            }

            .values-grid {
              grid-template-columns: 1fr;
            }

            .timeline-line {
              left: 15px;
            }

            .timeline-item {
              padding-left: 60px;
            }

            .timeline-dot {
              left: 3px;
            }

            .timeline-connector {
              left: 17px;
              width: 43px;
            }

            .cta-buttons {
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: 15px;
            }

            .btn-primary-large,
            .btn-secondary-large {
              width: auto;
              min-width: 200px;
              padding: 16px 32px;
              font-size: 1rem;
              justify-content: center;
            }

            .founder-stats {
              grid-template-columns: 1fr;
            }

            .meaning-breakdown {
              gap: 30px;
            }

            .word-part {
              padding: 40px 30px;
            }

            .word-title {
              font-size: 2.5rem;
            }

            .plus-sign {
              font-size: 2.5rem;
              padding: 15px 0;
            }

            .meaning-result {
              padding: 40px 30px;
            }

            .team-highlights {
              grid-template-columns: 1fr;
            }

            .highlight-card {
              justify-content: center;
            }

            .particle {
              filter: blur(100px);
              opacity: 0.1;
            }
          }

          @media (max-width: 640px) {
            .cta-buttons {
              flex-direction: column;
              width: 100%;
            }

            .btn-primary-large,
            .btn-secondary-large {
              width: 100%;
              max-width: 280px;
              padding: 14px 28px;
            }
          }

          @media (max-width: 480px) {
            .hero-stats {
              flex-direction: column;
              gap: 30px;
            }

            .cta-content {
              padding: 50px 30px;
            }

            .story-number {
              font-size: 4rem;
              top: 20px;
              right: 20px;
            }

            .story-icon,
            .service-icon,
            .value-icon {
              font-size: 3rem;
            }

            .mission-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .mission-card {
              padding: 40px 30px;
            }

            .mission-icon {
              font-size: 3rem;
            }
          }

          /* Card visibility class */
          .card-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default AboutPage;