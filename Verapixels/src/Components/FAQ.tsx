import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VeeAIChatbot from "./VeeAIChatbot";
import "./FAQ.css";

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
    answer: "We require full payment upfront to dedicate our full resources and deliver premium quality work without compromise.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))].filter(Boolean) as string[];

  const filteredFaqs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      {/* Animated Background */}
      <div className="faq-background">
        <div className="faq-background-circle circle-1"></div>
        <div className="faq-background-circle circle-2"></div>
        <div className="faq-background-circle circle-3"></div>
        <div className="faq-grid-overlay"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Get answers about our services, process, and payment policies</p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="faq-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map(category => (
          <button
            key={category}
            className={`faq-category ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* FAQ List */}
      <div className="faq-list">
        {filteredFaqs.map((item: FaqItem, index: number) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="faq-card">
              <div className="faq-card-inner">
                <div className="faq-header-content">
                  <h3 className="faq-question">{item.question}</h3>
                  <motion.button
                    className="toggle-btn"
                    onClick={() => toggleFaq(index)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer-container"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <motion.div
                        className="faq-answer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        className="faq-cta"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="cta-content">
          <h3>Ready to get started?</h3>
          <p>Begin your project with Verapixels - full payment ensures our dedicated premium service</p>
          <motion.button
            className="cta-button"
            onClick={() => window.location.href = '/#contact'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Project</span>
            <span className="cta-arrow">→</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Vee AI Chatbot */}
      <VeeAIChatbot />
    </section>
  );
}