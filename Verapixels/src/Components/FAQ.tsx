import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
  category?: string;
};

const faqData: FaqItem[] = [
  // About Verapixels
  {
    question: "What is Verapixels and what do you do?",
    answer: "Verapixels is a technology & creative agency that builds websites, digital products, and brand systems.",
    category: "About"
  },
  {
    question: "Who founded Verapixels and what's your mission?",
    answer: "Founded by Ocholi Divine and team, our mission is creating beautiful, performant digital products that solve business problems.",
    category: "About"
  },
  // Services
  {
    question: "What services does Verapixels offer?",
    answer: "Web Design, Frontend Development, UI/UX Design, Branding, Graphic Design, Video Editing, and Tech Consultation.",
    category: "Services"
  },
  {
    question: "Do you offer e-commerce website development?",
    answer: "Yes! We build secure e-commerce storefronts with payment integrations and optimized checkout experiences.",
    category: "Services"
  },
  {
    question: "Do you provide branding and logo design?",
    answer: "Yes. We create complete brand identities including logos, color palettes, typography, and visual guidelines.",
    category: "Services"
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes. We offer maintenance plans for updates, security patches, and ongoing improvements.",
    category: "Services"
  },
  // Technical
  {
    question: "What technology stack does Verapixels use?",
    answer: "We use modern technologies like React, TypeScript, and Node.js, choosing the right stack for each project.",
    category: "Technical"
  },
  {
    question: "Are your websites mobile-friendly and responsive?",
    answer: "Yes. Every website we build is fully responsive and optimized for all devices.",
    category: "Technical"
  },
  {
    question: "Do you implement SEO best practices?",
    answer: "Yes. Our sites include semantic HTML, proper metadata, performance optimizations, and analytics setup.",
    category: "Technical"
  },
  {
    question: "Do you offer content management systems (CMS)?",
    answer: "Yes. We integrate headless CMS or WordPress for easy content updates.",
    category: "Technical"
  },
  // Process & Pricing
  {
    question: "What's your typical project timeline?",
    answer: "Simple sites take 2-4 weeks; complex projects 6-8 weeks.",
    category: "Process & Pricing"
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes! We work globally and accept multiple currencies.",
    category: "Process & Pricing"
  },
  {
    question: "What's your design process like?",
    answer: "Discovery → prototype → user testing → iterate → handoff. We validate designs with real users.",
    category: "Process & Pricing"
  },
  {
    question: "Do you create custom designs or use templates?",
    answer: "Fully custom designs only. No templates.",
    category: "Process & Pricing"
  },
  {
    question: "How do you ensure website accessibility?",
    answer: "We use semantic markup, keyboard navigation, ARIA labels, and WCAG-compliant contrast ratios.",
    category: "Process & Pricing"
  },
  // Payment
  {
    question: "What is your payment policy?",
    answer: "We require an upfront payment to begin the project, followed by the remaining balance at completion. This helps us dedicate our resources and deliver high-quality work.",
    category: "Payment"
  },
  {
    question: "What payment methods do you accept?",
    answer: "Bank transfers, credit cards, and digital payments.",
    category: "Payment"
  },
  {
    question: "Do you offer refunds?",
    answer: "No. Due to the custom nature and full resource commitment, refunds are not available. We ensure satisfaction through detailed planning and continuous communication.",
    category: "Payment"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))].filter(Boolean) as string[];

  const filteredFaqs = faqData.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (question: string) => {
    setOpenIndex(openIndex === question ? null : question);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%)",
      color: "#fff",
      padding: "6rem 1.5rem 4rem",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(0,99,244,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(100px)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-15%",
        left: "-10%",
        width: "700px",
        height: "700px",
        background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(100px)",
        animation: "float 10s ease-in-out infinite 2s",
        pointerEvents: "none"
      }} />

      {/* Container */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{
            display: "inline-block",
            padding: "0.5rem 1.25rem",
            background: "rgba(0,99,244,0.1)",
            border: "1px solid rgba(0,99,244,0.3)",
            borderRadius: "50px",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#00d4ff",
            marginBottom: "1.5rem",
            letterSpacing: "0.05em"
          }}>
            SUPPORT CENTER
          </div>
          
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #fff 0%, #00d4ff 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            Frequently Asked Questions
          </h1>
          
          <p style={{
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: 1.6
          }}>
            Everything you need to know about our services, process, and policies
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: "600px",
            margin: "0 auto",
            position: "relative"
          }}>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem 1.5rem 1rem 3.5rem",
                background: "rgba(15,23,42,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "16px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#64748b"
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "3rem"
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "0.75rem 1.5rem",
                background: selectedCategory === category 
                  ? "linear-gradient(135deg, #0063f4, #8b5cf6)" 
                  : "rgba(15,23,42,0.6)",
                backdropFilter: "blur(20px)",
                border: selectedCategory === category 
                  ? "1px solid transparent" 
                  : "1px solid rgba(99,102,241,0.2)",
                borderRadius: "50px",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: selectedCategory === category 
                  ? "0 8px 24px rgba(99,102,241,0.3)" 
                  : "none"
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div style={{
          columnCount: window.innerWidth >= 1024 ? 2 : 1,
          columnGap: "1.5rem",
          marginBottom: "4rem"
        }}>
          {filteredFaqs.length === 0 ? (
            <div style={{
              breakInside: "avoid",
              textAlign: "center",
              padding: "3rem",
              background: "rgba(15,23,42,0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(99,102,241,0.1)",
              borderRadius: "20px"
            }}>
              <p style={{ fontSize: "1.125rem", color: "#94a3b8" }}>
                No questions found. Try a different search or category.
              </p>
            </div>
          ) : (
            filteredFaqs.map((item) => (
              <div
                key={item.question}
                style={{
                  background: "rgba(15,23,42,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  breakInside: "avoid",
                  marginBottom: "1.5rem",
                  display: "inline-block",
                  width: "100%"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
                }}
              >
                <div
                  onClick={() => toggleFaq(item.question)}
                  style={{
                    padding: "1.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem"
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#a78bfa",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.05em"
                    }}>
                      {item.category}
                    </div>
                    <h3 style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#f1f5f9",
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {item.question}
                    </h3>
                  </div>
                  
                  <button
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(99,102,241,0.3)",
                      background: "rgba(15,23,42,0.8)",
                      color: "#00d4ff",
                      fontSize: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: openIndex === item.question ? "rotate(45deg)" : "rotate(0deg)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#00d4ff";
                      e.currentTarget.style.background = "rgba(0,212,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                      e.currentTarget.style.background = "rgba(15,23,42,0.8)";
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Answer */}
                <div style={{
                  maxHeight: openIndex === item.question ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                  opacity: openIndex === item.question ? 1 : 0
                }}>
                  <div style={{
                    padding: "0 1.75rem 1.75rem",
                    borderTop: openIndex === item.question ? "1px solid rgba(99,102,241,0.1)" : "none",
                    paddingTop: openIndex === item.question ? "1.5rem" : "0"
                  }}>
                    <p style={{
                      color: "#cbd5e1",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                      margin: 0
                    }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: "center",
          padding: "3rem 2rem",
          background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(0,212,255,0.05))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem"
            }}>
              Still have questions?
            </h2>
            <p style={{
              fontSize: "1.125rem",
              color: "#94a3b8",
              marginBottom: "2rem",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              Can't find the answer you're looking for? Our team is here to help you get started.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 2rem",
                  background: "linear-gradient(135deg, #0063f4, #8b5cf6)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(99,102,241,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>Contact Us</span>
                <span>→</span>
              </a>
              
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 2rem",
                  background: "rgba(15,23,42,0.6)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "14px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>View All Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-30px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}