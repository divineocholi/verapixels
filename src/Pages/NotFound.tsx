import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Mail, Sparkles } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#6a00ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00d4ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-[#6a00ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#6a00ff]/10 border border-[#6a00ff]/30 px-4 py-2 rounded-full mb-8 animate-fadeInUp">
          <Sparkles size={16} className="text-[#00d4ff]" />
          <span className="text-sm font-bold text-white/90">ERROR 404</span>
        </div>

        {/* 404 Number with glitch effect */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6a00ff] via-[#00d4ff] to-[#6a00ff] animate-pulse leading-none">
            404
          </h1>
          <div className="absolute inset-0 text-[120px] md:text-[180px] font-black text-[#6a00ff] opacity-20 animate-glitch leading-none">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 animate-fadeInUp animation-delay-300">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers get lost sometimes!
          </p>
          <p className="text-sm text-white/50 font-mono bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
            Path: <span className="text-[#00d4ff] font-semibold">{window.location.pathname}</span>
          </p>
        </div>

        {/* Animated illustration */}
        <div className="my-16 animate-float">
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              stroke="url(#gradient404)" 
              strokeWidth="3" 
              strokeDasharray="10 5" 
              className="animate-spin-slow" 
            />
            <path
              d="M70 100 L85 85 M85 85 L100 70 M115 130 L130 115"
              stroke="url(#gradient404)"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <circle cx="70" cy="100" r="10" fill="url(#gradient404)" className="animate-bounce" />
            <circle cx="130" cy="115" r="10" fill="url(#gradient404)" className="animate-bounce animation-delay-1000" />
            
            {/* Sparkles */}
            <circle cx="50" cy="50" r="3" fill="#6a00ff" className="animate-ping" opacity="0.8" />
            <circle cx="150" cy="60" r="2" fill="#00d4ff" className="animate-ping animation-delay-500" opacity="0.6" />
            <circle cx="140" cy="150" r="3" fill="#6a00ff" className="animate-ping animation-delay-1000" opacity="0.7" />
            
            <defs>
              <linearGradient id="gradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a00ff" />
                <stop offset="50%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#6a00ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-500">
          <Link
            to="/"
            className="group relative px-10 py-4 bg-gradient-to-r from-[#6a00ff] to-[#00d4ff] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg shadow-[#6a00ff]/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={20} />
              Back to Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#6a00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          <Link
            to="/contact"
            className="px-10 py-4 bg-white/5 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/10 hover:bg-white/10 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Mail size={20} />
            Contact Support
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-16 animate-fadeInUp animation-delay-1000">
          <p className="text-white/60 text-base mb-6 font-semibold">Popular Pages You Might Be Looking For:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/aboutverapixels" 
              className="px-6 py-3 bg-white/5 border border-white/10 text-white/90 rounded-lg hover:bg-gradient-to-r hover:from-[#6a00ff]/20 hover:to-[#00d4ff]/20 hover:border-[#6a00ff]/50 transition-all text-sm font-semibold hover:shadow-lg hover:shadow-[#6a00ff]/30"
            >
              About Us
            </Link>
            <Link 
              to="/allprojects" 
              className="px-6 py-3 bg-white/5 border border-white/10 text-white/90 rounded-lg hover:bg-gradient-to-r hover:from-[#6a00ff]/20 hover:to-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-sm font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/30"
            >
              Our Projects
            </Link>
            <Link 
              to="/webdevelopment" 
              className="px-6 py-3 bg-white/5 border border-white/10 text-white/90 rounded-lg hover:bg-gradient-to-r hover:from-[#6a00ff]/20 hover:to-[#00d4ff]/20 hover:border-[#6a00ff]/50 transition-all text-sm font-semibold hover:shadow-lg hover:shadow-[#6a00ff]/30"
            >
              Services
            </Link>
            <Link 
              to="/career" 
              className="px-6 py-3 bg-white/5 border border-white/10 text-white/90 rounded-lg hover:bg-gradient-to-r hover:from-[#6a00ff]/20 hover:to-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-sm font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/30"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-glitch {
          animation: glitch 1s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default NotFound
