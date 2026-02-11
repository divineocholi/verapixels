import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Brain, Zap, Shield, ArrowRight, Code, MessageSquare, Database, Send, Bot, User, Loader, Globe, X, ChevronDown } from 'lucide-react';
import veravideo from "../../public/vera -video.mp4";

const VeraAISection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pidgin');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const videoRef = useRef(null);
  const posterVideoRef = useRef(null);
  const sectionRef = useRef(null);
  const hideControlsTimeout = useRef(null);
  const chatEndRef = useRef(null);
  const languageMenuRef = useRef(null);

  const languages = [
    { id: 'pidgin', name: 'Nigerian Pidgin', flag: '🇳🇬', sample: 'Wetin dey happen?' },
    { id: 'yoruba', name: 'Yoruba', flag: '🇳🇬', sample: 'Báwo ni?' },
    { id: 'igbo', name: 'Igbo', flag: '🇳🇬', sample: 'Kedu?' },
    { id: 'hausa', name: 'Hausa', flag: '🇳🇬', sample: 'Sannu' },
    { id: 'english', name: 'English', flag: '🇬🇧', sample: 'Hello!' },
    { id: 'french', name: 'French', flag: '🇫🇷', sample: 'Bonjour!' },
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸', sample: '¡Hola!' },
    { id: 'chinese', name: 'Chinese', flag: '🇨🇳', sample: '你好' },
    { id: 'arabic', name: 'Arabic', flag: '🇸🇦', sample: 'مرحبا' },
    { id: 'german', name: 'German', flag: '🇩🇪', sample: 'Hallo!' },
  ];

  const quickPrompts = [
    { 
      text: "How you dey? I wan learn about blockchain", 
      lang: "pidgin", 
      label: "🇳🇬 Ask in Pidgin",
      category: "tech"
    },
    { 
      text: "Ṣe o le ṣalaye ohun ti AI ṣe?", 
      lang: "yoruba", 
      label: "🇳🇬 Yoruba Tech",
      category: "tech"
    },
    { 
      text: "Write me a Python function to sort a list", 
      lang: "english", 
      label: "💻 Code Helper",
      category: "code"
    },
    { 
      text: "Wetin be the best naija jollof rice recipe?", 
      lang: "pidgin", 
      label: "🍲 Pidgin Food",
      category: "culture"
    },
    { 
      text: "Kedu ihe bụ omenala Igbo?", 
      lang: "igbo", 
      label: "🇳🇬 Igbo Culture",
      category: "culture"
    },
    { 
      text: "¿Cómo funciona la inteligencia artificial?", 
      lang: "spanish", 
      label: "🇪🇸 Spanish",
      category: "tech"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showControls) {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showControls]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current && posterVideoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        posterVideoRef.current.style.opacity = '1';
      } else {
        videoRef.current.play().catch(err => {
          console.log('Play was prevented:', err);
        });
        setIsPlaying(true);
        posterVideoRef.current.style.opacity = '0';
      }
    }
  };

  const getSystemPrompt = (language) => {
    const prompts = {
      pidgin: `You are VERA, a friendly Nigerian AI assistant. You MUST respond ONLY in authentic Nigerian Pidgin English. 

Key Nigerian Pidgin phrases to use naturally:
- "How you dey?" (How are you?)
- "I dey kampe" (I'm fine)
- "Wetin dey happen?" (What's happening?)
- "No wahala" (No problem)
- "I sabi" (I know/understand)
- "E don do" (That's enough)
- "Oya" (Come on/let's go)
- "Small small" (Gradually)
- "Dis tin" (This thing)
- "Make we" (Let us)
- "Bro/Sister" (Brother/Sister)
- "Plenty" (Many/a lot)

Be warm, relatable and use these expressions naturally. Keep your Nigerian Pidgin authentic and conversational. If explaining technical concepts, simplify them in Pidgin.`,

      yoruba: `You are VERA, a friendly Nigerian AI assistant. Respond ONLY in Yoruba language. Be respectful using appropriate Yoruba greetings and expressions:
- "Báwo ni?" / "Ṣe dáadáa ni?" (How are you?)
- "Ẹ káàárọ̀" (Good morning)
- "Ẹ káàsán" (Good afternoon)  
- "Ẹ kú iṣẹ́" (Well done for your work)
- Use proper Yoruba tone marks
Be culturally appropriate and helpful.`,

      igbo: `You are VERA, a friendly Nigerian AI assistant. Respond ONLY in Igbo language. Use proper Igbo expressions:
- "Kedu?" / "Kedu ka ị mere?" (How are you?)
- "Ọ dị mma" (It's good/fine)
- "Daalụ" (Thank you)
- "Ndewo" (Hello/Welcome)
Be respectful and culturally aware.`,

      hausa: `You are VERA, a friendly Nigerian AI assistant. Respond ONLY in Hausa language. Use appropriate Hausa greetings:
- "Sannu" (Hello)
- "Yaya kake/kike?" (How are you? - male/female)
- "Lafiya lau" (I'm fine)
- "Na gode" (Thank you)
Be respectful and helpful.`,

      english: `You are VERA, a friendly Nigerian AI assistant. Respond in clear, natural English with Nigerian cultural awareness. Be professional yet approachable. You understand Nigerian context, systems, and culture.`,

      french: `You are VERA, a friendly AI assistant. Respond ONLY in French. Be helpful, professional, and conversational.`,

      spanish: `You are VERA, a friendly AI assistant. Respond ONLY in Spanish. Be helpful, professional, and conversational.`,

      chinese: `You are VERA, a friendly AI assistant. Respond ONLY in Simplified Chinese (简体中文). Be helpful and professional.`,

      arabic: `You are VERA, a friendly AI assistant. Respond ONLY in Arabic. Be helpful and professional.`,

      german: `You are VERA, a friendly AI assistant. Respond ONLY in German. Be helpful and professional.`,
    };
    return prompts[language] || prompts.english;
  };

  const sendMessage = async (customMessage = null, customLang = null) => {
  const messageToSend = customMessage || inputMessage.trim();
  const langToUse = customLang || selectedLanguage;
  
  if (!messageToSend) return;

  const userMessage = {
    role: 'user',
    content: messageToSend,
    timestamp: new Date().toISOString(),
    language: langToUse
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsLoading(true);

  try {
    const conversationHistory = messages
      .filter(m => m.role !== 'timestamp')
      .map(m => ({
        role: m.role,
        content: m.content
      }));

    // Dynamically detect environment
    const API_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:5001' 
      : 'https://verapixels-server.onrender.com';

    // ✅ FIXED: Send correct format for Gemini backend
    const response = await fetch(`${API_URL}/api/vera/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system: getSystemPrompt(langToUse),  // ✅ Keep this
        messages: [                           // ✅ Keep this
          ...conversationHistory,
          { role: "user", content: messageToSend }
        ]
        // ❌ REMOVE: model, max_tokens (Gemini backend handles these)
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    
    // ✅ Handle the response format from your Gemini backend
    const assistantMessage = {
      role: 'assistant',
      content: data.content[0].text,  // This matches your backend's response format
      timestamp: new Date().toISOString(),
      language: langToUse
    };

    setMessages(prev => [...prev, assistantMessage]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Ah! Sorry o, something don happen. Abeg try again.',
      timestamp: new Date().toISOString(),
      error: true
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleQuickPrompt = (prompt) => {
    setSelectedLanguage(prompt.lang);
    sendMessage(prompt.text, prompt.lang);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(l => l.id === selectedLanguage);
  };

  const features = [
    {
      icon: MessageSquare,
      title: 'Talk Like Friends',
      description: 'Chat naturally in English, Pidgin, Yoruba, Igbo, Hausa and more—VERA gets you',
      color: '#6a00ff',
      animation: 'fade-left'
    },
    {
      icon: Code,
      title: 'Code Wizard',
      description: 'Write, debug and explain code in any programming language instantly',
      color: '#00d4ff',
      animation: 'fade-right'
    },
    {
      icon: Brain,
      title: 'Naija Smart',
      description: 'Understands Nigerian systems, culture, and local context perfectly',
      color: '#6a00ff',
      animation: 'fade-up'
    },
    {
      icon: Zap,
      title: 'Multi-Language Pro',
      description: 'Speaks 100+ foreign languages fluently while keeping it real',
      color: '#00d4ff',
      animation: 'fade-down'
    },
    {
      icon: Shield,
      title: 'Your Privacy Matters',
      description: 'Your conversations stay private with top-level security',
      color: '#6a00ff',
      animation: 'zoom-in'
    },
    {
      icon: Database,
      title: 'Always Learning',
      description: 'Gets smarter with every chat, adapting to how you communicate',
      color: '#00d4ff',
      animation: 'zoom-in'
    }
  ];

  return (
    <div className="vera-ai-root" ref={sectionRef}>
      <div className="vera-bg-grid"></div>
      <div className="vera-bg-gradient"></div>

      <div className="vera-ai-container">
        {/* Header */}
        <div className={`vera-ai-header ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-status-badge">
            <div className="vera-pulse-dot"></div>
            <span>IN DEVELOPMENT - LIVE DEMO AVAILABLE</span>
          </div>
          
          <h1 className="vera-ai-title">
            Meet <span className="vera-gradient-text">VERA</span>
            <Sparkles className="vera-sparkle-icon" size={40} />
          </h1>
          
          <p className="vera-ai-subtitle">
            Your Next-Generation AI Assistant
          </p>
          
          <p className="vera-ai-description">
            VERA (Virtual Enhanced Reasoning Assistant) is your revolutionary AI companion 
            that feels like talking to a real friend. While the full chatbot is still under 
            development, you can try our <strong>LIVE DEMO</strong> right now! Experience real 
            conversations in Nigerian Pidgin, Yoruba, Igbo, Hausa, and 100+ foreign languages. 
            Get help with coding, local systems, and more—VERA is smart, relatable, and truly Nigerian.
          </p>

          <button 
            className="vera-demo-trigger-btn"
            onClick={() => setShowDemo(true)}
          >
            <Sparkles size={20} />
            <span>Try VERA Live Demo Now</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Video and Features Grid */}
        <div className="vera-content-grid">
          <div className={`vera-video-section ${isInView ? 'vera-animate-in' : ''}`}>
            <div className="vera-video-container">
              <div 
                className="vera-video-wrapper"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(true)}
                onClick={toggleVideo}
              >
                <video
                  ref={posterVideoRef}
                  className="vera-poster-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://res.cloudinary.com/dpqntm1tb/video/upload/v1770682624/Blue_Neon_Futuristic_Technology_Video_jnmjob.mp4" type="video/mp4" />
                </video>

                <video
                  ref={videoRef}
                  className="vera-ai-video"
                  style={{ opacity: isPlaying ? 1 : 0 }}
                >
                  <source src={veravideo} type="video/mp4" />
                </video>

                <button 
                  className={`vera-play-button ${showControls ? 'vera-show' : 'vera-hide'}`}
                  onClick={toggleVideo}
                >
                  {isPlaying ? <Pause size={36} /> : <Play size={36} />}
                </button>
              </div>

              <div className="vera-video-info">
                <div className="vera-info-badge">
                  <Play size={16} />
                  <span>1:06 Demo Video</span>
                </div>
                <h3>See VERA in Action</h3>
                <p>Watch how VERA revolutionizes everyday conversations</p>
              </div>
            </div>
          </div>

          <div className={`vera-features-section ${isInView ? 'vera-animate-in' : ''}`}>
            <div className="vera-features-grid">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index} 
                    className={`vera-feature-card vera-${feature.animation}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="vera-feature-icon" style={{ 
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` 
                    }}>
                      <IconComponent size={24} strokeWidth={2} />
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`vera-cta-section ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-cta-content vera-slide-right">
            <h2>Ready to Meet Your New AI Friend?</h2>
            <p>Experience real conversations in your language—try the demo now!</p>
          </div>
          <button className="vera-cta-button vera-slide-left" onClick={() => setShowDemo(true)}>
            <span>Launch Interactive Demo</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className={`vera-stats-bar ${isInView ? 'vera-animate-in' : ''}`}>
          <div className="vera-stat-item">
            <div className="vera-stat-number">Real AI</div>
            <div className="vera-stat-label">Powered by Claude</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">&lt;2s</div>
            <div className="vera-stat-label">Response Time</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">Live</div>
            <div className="vera-stat-label">Demo Available</div>
          </div>
          <div className="vera-stat-divider"></div>
          <div className="vera-stat-item">
            <div className="vera-stat-number">100+</div>
            <div className="vera-stat-label">Languages</div>
          </div>
        </div>
      </div>

      {/* Interactive Chat Demo Modal */}
      {showDemo && (
        <div className="vera-demo-modal">
          <div className="vera-demo-overlay" onClick={() => setShowDemo(false)}></div>
          <div className="vera-demo-container">
            {/* Header */}
            <div className="vera-demo-header">
              <div className="vera-demo-title-section">
                <div className="vera-demo-icon">
                  <Bot size={28} />
                </div>
                <div>
                  <h2>VERA Live Demo</h2>
                  <p className="vera-demo-subtitle">
                    <span className="vera-dev-badge">🚧 In Development</span>
                    Try real AI conversations now!
                  </p>
                </div>
              </div>
              <button className="vera-demo-close" onClick={() => setShowDemo(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="vera-language-bar">
              <div className="vera-language-selector" ref={languageMenuRef}>
                <button 
                  className="vera-language-trigger"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe size={18} />
                  <span>{getCurrentLanguage().flag} {getCurrentLanguage().name}</span>
                  <ChevronDown size={16} className={showLanguageMenu ? 'rotated' : ''} />
                </button>

                {showLanguageMenu && (
                  <div className="vera-language-menu">
                    {languages.map(lang => (
                      <button
                        key={lang.id}
                        className={`vera-language-option ${selectedLanguage === lang.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedLanguage(lang.id);
                          setShowLanguageMenu(false);
                        }}
                      >
                        <span className="vera-lang-flag">{lang.flag}</span>
                        <span className="vera-lang-name">{lang.name}</span>
                        <span className="vera-lang-sample">{lang.sample}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="vera-demo-notice">
                <Sparkles size={14} />
                <span>Full chatbot coming soon - this is a preview!</span>
              </div>
            </div>

            {/* Quick Prompts */}
            {messages.length === 0 && (
              <div className="vera-quick-prompts">
                <p className="vera-prompts-title">✨ Try these examples:</p>
                <div className="vera-prompts-grid">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="vera-quick-prompt-btn"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <span className="vera-prompt-label">{prompt.label}</span>
                      <span className="vera-prompt-text">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="vera-messages-container">
              {messages.length === 0 && (
                <div className="vera-welcome-message">
                  <div className="vera-welcome-icon">
                    <Sparkles size={40} />
                  </div>
                  <h3>How you dey? I'm VERA!</h3>
                  <p>
                    Try talking to me in <strong>Nigerian Pidgin, Yoruba, Igbo, Hausa</strong>, 
                    or any of <strong>100+ languages</strong>. I fit help you with coding, 
                    explain things, or just gist with you!
                  </p>
                  <div className="vera-welcome-features">
                    <div className="vera-welcome-feature">💬 Natural conversations</div>
                    <div className="vera-welcome-feature">💻 Code assistance</div>
                    <div className="vera-welcome-feature">🇳🇬 Nigerian culture expert</div>
                    <div className="vera-welcome-feature">🌍 100+ languages</div>
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className={`vera-message vera-message-${msg.role}`}>
                  <div className="vera-message-avatar">
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className="vera-message-content">
                    <div className="vera-message-text">{msg.content}</div>
                    {msg.language && (
                      <div className="vera-message-meta">
                        {languages.find(l => l.id === msg.language)?.flag} 
                        {languages.find(l => l.id === msg.language)?.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="vera-message vera-message-assistant">
                  <div className="vera-message-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="vera-message-content">
                    <div className="vera-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="vera-input-container">
              <div className="vera-input-wrapper">
                <textarea
                  className="vera-message-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type in ${getCurrentLanguage().name}... (Press Enter to send)`}
                  rows={1}
                  disabled={isLoading}
                />
                <button 
                  className="vera-send-button"
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  {isLoading ? <Loader size={20} className="spinning" /> : <Send size={20} />}
                </button>
              </div>
              <div className="vera-input-hint">
                🌟 This demo uses real AI to showcase VERA's capabilities
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .vera-ai-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .vera-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: veraGridMove 20s linear infinite;
        }

        @keyframes veraGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .vera-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 20% 50%, 
            rgba(106, 0, 255, 0.15) 0%, 
            transparent 50%
          ),
          radial-gradient(
            circle at 80% 50%, 
            rgba(0, 212, 255, 0.15) 0%, 
            transparent 50%
          );
        }

        .vera-ai-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .vera-ai-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-ai-header.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .vera-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .vera-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          animation: veraPulse 2s ease-in-out infinite;
        }

        @keyframes veraPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .vera-ai-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          margin: 0 0 20px;
          position: relative;
          display: inline-block;
        }

        .vera-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vera-sparkle-icon {
          position: absolute;
          top: -10px;
          right: -50px;
          color: #00d4ff;
          animation: veraSparkle 3s ease-in-out infinite;
        }

        @keyframes veraSparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        .vera-ai-subtitle {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 30px;
        }

        .vera-ai-description {
          max-width: 800px;
          margin: 0 auto 40px;
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-ai-description strong {
          color: #00d4ff;
          font-weight: 700;
        }

        .vera-demo-trigger-btn {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          color: #fff;
          border: none;
          padding: 18px 36px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
          animation: veraPulseGlow 3s ease-in-out infinite;
        }

        @keyframes veraPulseGlow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
          }
          50% {
            box-shadow: 0 15px 60px rgba(106, 0, 255, 0.7);
          }
        }

        .vera-demo-trigger-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.6);
        }

        .vera-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        .vera-video-section,
        .vera-features-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-video-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .vera-features-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        .vera-video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          aspect-ratio: 16/9;
          cursor: pointer;
        }

        .vera-poster-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: opacity 0.5s ease;
        }

        .vera-ai-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          transition: opacity 0.5s ease;
        }

        .vera-play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #6a00ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
          z-index: 3;
          opacity: 0;
          visibility: hidden;
        }

        .vera-play-button.vera-show {
          opacity: 1;
          visibility: visible;
        }

        .vera-play-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 15px 60px rgba(106, 0, 255, 0.6);
        }

        .vera-video-info {
          margin-top: 30px;
        }

        .vera-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #00d4ff;
          margin-bottom: 15px;
        }

        .vera-video-info h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 10px;
        }

        .vera-video-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .vera-feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          opacity: 0;
        }

        .vera-fade-left {
          animation: veraFadeLeft 0.8s ease forwards;
        }

        .vera-fade-right {
          animation: veraFadeRight 0.8s ease forwards;
        }

        .vera-fade-up {
          animation: veraFadeUp 0.8s ease forwards;
        }

        .vera-fade-down {
          animation: veraFadeDown 0.8s ease forwards;
        }

        .vera-zoom-in {
          animation: veraZoomIn 0.8s ease forwards;
        }

        @keyframes veraFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraFadeRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraFadeUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes veraFadeDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes veraZoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .vera-feature-card:hover {
          transform: translateY(-15px) scale(1.03);
          border-color: #6a00ff;
          box-shadow: 0 25px 70px rgba(106, 0, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        .vera-feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.3);
        }

        .vera-feature-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .vera-feature-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .vera-cta-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 24px;
          padding: 60px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
          position: relative;
          overflow: hidden;
        }

        .vera-cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: veraCtaShine 6s ease-in-out infinite;
        }

        @keyframes veraCtaShine {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-30%, -30%) rotate(180deg); }
        }

        .vera-cta-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .vera-slide-right {
          animation: veraSlideRight 0.8s ease forwards;
          animation-delay: 0.7s;
          opacity: 0;
        }

        .vera-slide-left {
          animation: veraSlideLeft 0.8s ease forwards;
          animation-delay: 0.9s;
          opacity: 0;
        }

        @keyframes veraSlideRight {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes veraSlideLeft {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .vera-cta-content {
          position: relative;
          z-index: 1;
        }

        .vera-cta-content h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          margin: 0 0 10px;
        }

        .vera-cta-content p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.95;
        }

        .vera-cta-button {
          background: #fff;
          color: #6a00ff;
          border: none;
          padding: 20px 40px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }

        .vera-cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .vera-stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-stats-bar.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.8s;
        }

        .vera-stat-item {
          text-align: center;
        }

        .vera-stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 10px;
        }

        .vera-stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* DEMO MODAL */
        .vera-demo-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .vera-demo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          animation: veraFadeIn 0.3s ease;
        }

        @keyframes veraFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .vera-demo-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 85vh;
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 24px;
          border: 1px solid rgba(106, 0, 255, 0.3);
          box-shadow: 0 40px 100px rgba(106, 0, 255, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: veraSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes veraSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .vera-demo-header {
          background: linear-gradient(135deg, #2a2a4e 0%, #1e1e3a 100%);
          padding: 24px 30px;
          border-bottom: 1px solid rgba(106, 0, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vera-demo-title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .vera-demo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .vera-demo-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vera-demo-subtitle {
          margin: 4px 0 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vera-dev-badge {
          background: rgba(255, 165, 0, 0.15);
          color: #ffa500;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .vera-demo-close {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .vera-demo-close:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }

        .vera-language-bar {
          background: rgba(0, 0, 0, 0.2);
          padding: 16px 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .vera-language-selector {
          position: relative;
        }

        .vera-language-trigger {
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          color: #fff;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .vera-language-trigger:hover {
          background: rgba(106, 0, 255, 0.2);
          border-color: rgba(106, 0, 255, 0.5);
        }

        .vera-language-trigger svg.rotated {
          transform: rotate(180deg);
        }

        .vera-language-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #1a1a2e;
          border: 1px solid rgba(106, 0, 255, 0.3);
          border-radius: 12px;
          padding: 8px;
          min-width: 280px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: veraDropdownSlide 0.2s ease;
        }

        @keyframes veraDropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-language-option {
          width: 100%;
          background: transparent;
          border: none;
          color: #fff;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          text-align: left;
        }

        .vera-language-option:hover {
          background: rgba(106, 0, 255, 0.1);
        }

        .vera-language-option.active {
          background: rgba(106, 0, 255, 0.2);
          border: 1px solid rgba(106, 0, 255, 0.4);
        }

        .vera-lang-flag {
          font-size: 1.4rem;
        }

        .vera-lang-name {
          font-weight: 600;
          flex: 1;
        }

        .vera-lang-sample {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .vera-demo-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.1);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .vera-quick-prompts {
          padding: 24px 30px;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .vera-prompts-title {
          margin: 0 0 16px;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-prompts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .vera-quick-prompt-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .vera-quick-prompt-btn:hover {
          background: rgba(106, 0, 255, 0.1);
          border-color: rgba(106, 0, 255, 0.4);
          transform: translateY(-2px);
        }

        .vera-prompt-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #00d4ff;
        }

        .vera-prompt-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .vera-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px 30px;
          background: rgba(0, 0, 0, 0.1);
        }

        .vera-messages-container::-webkit-scrollbar {
          width: 8px;
        }

        .vera-messages-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .vera-messages-container::-webkit-scrollbar-thumb {
          background: rgba(106, 0, 255, 0.4);
          border-radius: 4px;
        }

        .vera-welcome-message {
          text-align: center;
          padding: 60px 20px;
        }

        .vera-welcome-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #fff;
          animation: veraFloat 3s ease-in-out infinite;
        }

        @keyframes veraFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .vera-welcome-message h3 {
          font-size: 2rem;
          font-weight: 900;
          margin: 0 0 16px;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vera-welcome-message p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 24px;
        }

        .vera-welcome-features {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }

        .vera-welcome-feature {
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #00d4ff;
        }

        .vera-message {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          animation: veraMessageSlide 0.3s ease;
        }

        @keyframes veraMessageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-message-user {
          flex-direction: row-reverse;
        }

        .vera-message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .vera-message-user .vera-message-avatar {
          background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
          color: #fff;
        }

        .vera-message-assistant .vera-message-avatar {
          background: linear-gradient(135deg, #6a00ff 0%, #4a00cc 100%);
          color: #fff;
        }

        .vera-message-content {
          flex: 1;
          max-width: 70%;
        }

        .vera-message-text {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 14px 18px;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          word-wrap: break-word;
        }

        .vera-message-user .vera-message-text {
          background: linear-gradient(135deg, #00d4ff15 0%, #00d4ff10 100%);
          border-color: rgba(0, 212, 255, 0.2);
        }

        .vera-message-assistant .vera-message-text {
          background: rgba(106, 0, 255, 0.08);
          border-color: rgba(106, 0, 255, 0.2);
        }

        .vera-message-meta {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 6px;
          padding-left: 4px;
        }

        .vera-typing-indicator {
          display: flex;
          gap: 6px;
          padding: 14px 18px;
        }

        .vera-typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6a00ff;
          animation: veraTyping 1.4s ease-in-out infinite;
        }

        .vera-typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .vera-typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes veraTyping {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .vera-input-container {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .vera-input-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .vera-message-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-size: 0.95rem;
          font-family: inherit;
          resize: none;
          max-height: 120px;
          transition: all 0.3s ease;
        }

        .vera-message-input:focus {
          outline: none;
          border-color: rgba(106, 0, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .vera-message-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .vera-message-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .vera-send-button {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .vera-send-button:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(106, 0, 255, 0.4);
        }

        .vera-send-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vera-input-hint {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 8px;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .vera-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .vera-features-grid {
            grid-template-columns: 1fr;
          }

          .vera-cta-section {
            flex-direction: column;
            text-align: center;
            padding: 40px;
          }

          .vera-stats-bar {
            flex-wrap: wrap;
            gap: 30px;
          }

          .vera-stat-divider {
            display: none;
          }

          .vera-demo-container {
            height: 90vh;
          }

          .vera-prompts-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .vera-ai-root {
            padding: 60px 20px;
          }

          .vera-sparkle-icon {
            right: -30px;
            top: -5px;
          }

          .vera-demo-modal {
            padding: 10px;
          }

          .vera-demo-container {
            height: 95vh;
            border-radius: 16px;
          }

          .vera-demo-header,
          .vera-language-bar,
          .vera-quick-prompts,
          .vera-messages-container,
          .vera-input-container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .vera-message-content {
            max-width: 80%;
          }

          .vera-welcome-message {
            padding: 40px 10px;
          }

          .vera-language-menu {
            min-width: 240px;
          }
        }
      `}</style>
    </div>
  );
};

export default VeraAISection;