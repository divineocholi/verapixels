import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VeeAIChatbot from '../Components/VeeAIChatbot';

// Project data structure
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  caseStudyUrl: string;
  liveUrl?: string;
  year: string;
  client: string;
}

const AllProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "TechFlow SaaS Platform",
      category: "Web Application",
      description: "A comprehensive project management platform with real-time collaboration, built with React and Node.js. Features include task tracking, team communication, and advanced analytics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "UI/UX", "SaaS"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "TechFlow Inc."
    },
    {
      id: 2,
      title: "ShopEase E-commerce",
      category: "Website",
      description: "Modern e-commerce platform with seamless checkout experience, inventory management, and customer analytics. Increased conversion rates by 45%.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["E-commerce", "Stripe", "SEO", "Mobile-First"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "ShopEase"
    },
    {
      id: 3,
      title: "FitTrack Mobile App",
      category: "Mobile App",
      description: "iOS and Android fitness tracking app with personalized workout plans, nutrition tracking, and social features. Over 50K downloads in first month.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      tags: ["React Native", "iOS", "Android", "Health"],
      caseStudyUrl: "/casestudies",
      year: "2023",
      client: "FitTrack"
    },
    {
      id: 4,
      title: "BrandCo Identity System",
      category: "Branding",
      description: "Complete brand identity including logo design, color system, typography, and brand guidelines. Created a cohesive visual language across all touchpoints.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      tags: ["Logo Design", "Brand Identity", "Style Guide"],
      caseStudyUrl: "/casestudies",
      year: "2024",
      client: "BrandCo"
    },
    {
      id: 5,
      title: "HealthHub Dashboard",
      category: "UI/UX Design",
      description: "Patient management dashboard for healthcare providers. Focused on clarity, accessibility, and efficient workflows. Reduced task completion time by 60%.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      tags: ["Healthcare", "Dashboard", "Accessibility", "Figma"],
      caseStudyUrl: "/casestudies",
      year: "2023",
      client: "HealthHub"
    },
    {
      id: 6,
      title: "Crypto Wallet App",
      category: "Mobile App",
      description: "Secure cryptocurrency wallet with multi-chain support, real-time price tracking, and seamless trading. Bank-grade security with biometric authentication.",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
      tags: ["Blockchain", "Security", "iOS", "Android"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "CryptoVault"
    },
    {
      id: 7,
      title: "EduLearn Platform",
      category: "Web Application",
      description: "Online learning platform with video streaming, interactive quizzes, progress tracking, and certificate generation. Served over 100K students.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      tags: ["EdTech", "Video Streaming", "LMS", "React"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2023",
      client: "EduLearn"
    },
    {
      id: 8,
      title: "Luxury Hotel Website",
      category: "Website",
      description: "Premium hotel booking website with immersive visuals, seamless reservation system, and virtual tours. Booking conversion increased by 38%.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      tags: ["Hospitality", "Booking System", "3D", "Premium"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "Grand Luxury Hotels"
    },
    {
      id: 9,
      title: "StartupX Brand Kit",
      category: "Branding",
      description: "Modern tech startup branding with logo variations, color palette, typography system, and application examples across digital and print media.",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",
      tags: ["Startup", "Logo", "Tech Branding", "Modern"],
      caseStudyUrl: "/casestudies",
      year: "2023",
      client: "StartupX"
    },
    {
      id: 10,
      title: "FoodieHub Delivery App",
      category: "Mobile App",
      description: "Food delivery app with real-time tracking, smart recommendations, and seamless payment. Optimized for speed and reliability during peak hours.",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop",
      tags: ["Food Tech", "Maps", "Real-time", "Payment"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "FoodieHub"
    },
    {
      id: 11,
      title: "Finance Dashboard UI",
      category: "UI/UX Design",
      description: "Investment portfolio dashboard with data visualization, market insights, and transaction management. Clean, professional interface for financial data.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["FinTech", "Data Viz", "Dashboard", "Professional"],
      caseStudyUrl: "/casestudies",
      year: "2023",
      client: "InvestPro"
    },
    {
      id: 12,
      title: "Real Estate Portal",
      category: "Website",
      description: "Property listing platform with advanced search filters, 3D virtual tours, mortgage calculator, and agent matching. Revolutionary property browsing experience.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      tags: ["Real Estate", "3D Tours", "Search", "Maps"],
      caseStudyUrl: "/casestudies",
      liveUrl: "https://example.com",
      year: "2024",
      client: "HomeFinder"
    }
  ];

  const categories = ['All', 'Website', 'Web Application', 'Mobile App', 'UI/UX Design', 'Branding'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-64 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >                                             
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-semibold backdrop-blur-sm">

            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            All Projects
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse portfolio of successful projects spanning websites, mobile apps, branding, and UI/UX design. 
            Each project showcases our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500"
              style={{
                transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex items-end p-6"
                >
                  <div className="flex gap-3">
                    <motion.a
                      href={project.caseStudyUrl}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredProject === project.id ? 0 : 20, opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ delay: 0.1 }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                    >
                      <span>📖</span> Case Study
                    </motion.a>
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: hoveredProject === project.id ? 0 : 20, opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                      >
                        <span>🚀</span> Live Project
                      </motion.a>
                    )}
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
                    {project.category}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-slate-400 mb-3">Client: {project.client}</p>
                
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 border border-slate-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3D Effect Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: hoveredProject === project.id
                    ? '0 20px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.5)'
                    : '0 0 0 1px rgba(71, 85, 105, 0.5)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
            <div className="bg-slate-900 rounded-xl p-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Start Your Project?
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Contact us for a free consultation and quote.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <span>🚀</span> Get Started
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      

      {/* Animated Particles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
      
};

export default AllProjects;