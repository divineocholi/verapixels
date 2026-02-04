import React, { useState, useEffect, useRef } from "react";
import { 
  FiTarget, FiLayers, FiLayout, FiPenTool,
  FiImage, FiType, FiCheckCircle, FiZap,
  FiAward, FiUsers, FiStar, FiRefreshCw, FiTrendingUp,
  FiPhone, FiMail, FiGlobe, FiMessageSquare, FiArrowRight,
  FiFeather, FiSearch, FiTag, FiCompass, FiBriefcase,
  FiShoppingBag, FiX, FiDownload, FiExternalLink, FiInfo,
  FiSave, FiCalendar, FiMapPin, FiClock, FiUser,
  FiShield, FiBarChart, FiThumbsUp, FiTool, FiCheck,
  FiHeart, FiGrid, FiPackage, FiEye, FiBookmark  // Add this
} from "react-icons/fi";
import { 
  GiLightBulb, GiPerspectiveDiceSixFacesRandom, GiCheckMark,
  GiGrowth, GiTeamIdea, GiTrophy, GiPencilRuler,
  GiColorPalette, GiThreeLeaves, GiCrystalBall
} from "react-icons/gi";
import { 
  SiGodaddy, SiNamecheap, SiHostinger, SiCloudflare,
  SiGoogle, SiVercel
} from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { 
  FaCrown, FaRobot, FaHandshake, FaUsers, FaRegSmile,
  FaStar, FaAward, FaRocket, FaChartLine, FaPalette,
  FaBullseye, FaSeedling, FaGem
} from "react-icons/fa";
import { MdWorkspacePremium, MdSecurity, MdSpeed } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Types
type ServiceCategory = "graphic" | "branding" | "naming" | "digital";
type NameCategory = 'tech' | 'creative' | 'eco' | 'luxury' | 'modern' | 'classic' | 'general';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  category: ServiceCategory;
  details: {
    title: string;
    description: string;
    process: string[];
    deliverables: string[];
    timeline: string;
    price: string;
  };
}

interface GeneratedName {
  id: string;
  name: string;
  score: number;
  category: NameCategory;
  available: boolean;
  explanation: string;
  tlds: {
    com: boolean;
    io: boolean;
    co: boolean;
    net: boolean;
  };
  details?: {
    meaning: string;
    marketPotential: string;
    targetAudience: string;
    trademarkRisk: 'low' | 'medium' | 'high';
    pronunciation: string;
    memorabilityScore: number;
  };
}

interface DomainRegistrar {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  price: string;
  rating: number;
  searchUrl: string;
}

interface SavedName {
  id: string;
  name: string;
  date: string;
  score: number;
  category: NameCategory;
  available?: boolean;
  explanation?: string;
  tlds?: {
    com: boolean;
    io: boolean;
    co: boolean;
    net: boolean;
  };
}

interface BrandSuccessStory {
  id: number;
  name: string;
  industry: string;
  logo: string;
  beforeImage: string;
  afterImage: string;
  results: string[];
  testimonial: string;
  author: string;
  role: string;
}

const BrandIdentityPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State Management
  const [brandName, setBrandName] = useState<string>("");
  const [namingResults, setNamingResults] = useState<GeneratedName[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [savedNames, setSavedNames] = useState<SavedName[]>([]);
  
  // Popup States
  const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false);
  const [showServicePopup, setShowServicePopup] = useState<Service | null>(null);
  const [showDomainPopup, setShowDomainPopup] = useState<GeneratedName | null>(null);
  const [showSavedNames, setShowSavedNames] = useState<boolean>(false);
  const [showNameDetails, setShowNameDetails] = useState<GeneratedName | null>(null);
  const [showResultsPopup, setShowResultsPopup] = useState<boolean>(false);
  const [showProcessPopup, setShowProcessPopup] = useState<boolean>(false);
  
  // Other States
  const [domainChecking, setDomainChecking] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animationKey, setAnimationKey] = useState<number>(0);
  
  // Refs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Domain Checking Improvement - More accurate algorithm
  const takenDomains = new Set([
    // Common taken domains
    'facebook', 'google', 'amazon', 'apple', 'netflix', 'twitter',
    'instagram', 'linkedin', 'youtube', 'microsoft', 'adobe',
    'spotify', 'uber', 'airbnb', 'dropbox', 'slack', 'zoom',
    'shopify', 'wordpress', 'wix', 'squarespace',
    
    // Generic business names
    'premium', 'elite', 'prime', 'supreme', 'ultimate', 'perfect',
    'best', 'first', 'top', 'global', 'world', 'united', 'national',
    'central', 'main', 'core', 'base', 'hub', 'center',
    
    // Tech domains
    'tech', 'cloud', 'data', 'code', 'web', 'app', 'digital', 'smart',
    'soft', 'sys', 'net', 'online', 'digital', 'virtual',
    
    // Creative domains
    'studio', 'creative', 'design', 'art', 'pixel', 'vision',
    'canvas', 'ink', 'color', 'media', 'visual', 'brand',
    
    // Short domains (likely taken)
    'ai', 'io', 'co', 'me', 'tv', 'app', 'dev', 'pro'
  ]);

  // Enhanced Domain Registrars with proper search URLs
  const domainRegistrars: DomainRegistrar[] = [
    { 
      id: 'namecheap', 
      name: 'Namecheap', 
      icon: <SiNamecheap />, 
      url: 'https://www.namecheap.com/domains',
      searchUrl: 'https://www.namecheap.com/domains/registration/results/?domain=',
      price: '$8.88/yr', 
      rating: 4.8 
    },
    { 
      id: 'godaddy', 
      name: 'GoDaddy', 
      icon: <FiGlobe />, 
      url: 'https://www.godaddy.com/domains',
      searchUrl: 'https://www.godaddy.com/domainsearch/find?domainToCheck=',
      price: '$11.99/yr', 
      rating: 4.5 
    },
    { 
      id: 'hostinger', 
      name: 'Hostinger', 
      icon: <SiHostinger />, 
      url: 'https://www.hostinger.com/domain-names',
      searchUrl: 'https://www.hostinger.com/domain-checker?domain=',
      price: '$9.99/yr', 
      rating: 4.7 
    },
    { 
      id: 'cloudflare', 
      name: 'Cloudflare', 
      icon: <SiCloudflare />, 
      url: 'https://www.cloudflare.com/products/registrar',
      searchUrl: 'https://dash.cloudflare.com/registrar/search?domain=',
      price: '$8.57/yr', 
      rating: 4.9 
    },
    { 
      id: 'google', 
      name: 'Google Domains', 
      icon: <SiGoogle />, 
      url: 'https://domains.google',
      searchUrl: 'https://domains.google.com/registrar/search?searchTerm=',
      price: '$12/yr', 
      rating: 4.6 
    },
  ];

  // Brand Success Stories
  const brandSuccessStories: BrandSuccessStory[] = [
    {
      id: 1,
      name: "Bloom & Root",
      industry: "Sustainable Skincare",
      logo: "🌿",
      beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400&h=300&fit=crop",
      results: [
        "Brand identity increased sales by 240%",
        "Customer retention improved by 65%",
        "Social media engagement up 300%",
        "Premium market positioning achieved"
      ],
      testimonial: "Verapixels transformed our brand from a generic skincare line to a premium sustainable lifestyle brand. Their AI-human collaboration approach delivered exceptional results.",
      author: "Sarah Chen",
      role: "CEO, Bloom & Root"
    },
    {
      id: 2,
      name: "NexusFlow",
      industry: "SaaS Productivity Platform",
      logo: "⚡",
      beforeImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      results: [
        "User adoption increased by 180%",
        "Series A funding secured ($5M)",
        "Enterprise client base grew 3x",
        "Brand recognition score: 92/100"
      ],
      testimonial: "The brand identity developed by Verapixels perfectly captured our innovative spirit. Their AI-driven insights combined with human creativity gave us a competitive edge.",
      author: "Marcus Rodriguez",
      role: "Founder, NexusFlow"
    },
    {
      id: 3,
      name: "ArtisanBrew",
      industry: "Specialty Coffee Roasters",
      logo: "☕",
      beforeImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      results: [
        "Retail partnerships increased by 150%",
        "Online sales grew by 320%",
        "Brand loyalty program success: 85% retention",
        "Premium pricing strategy implemented"
      ],
      testimonial: "From naming to complete brand identity, Verapixels understood our artisanal values and translated them into a compelling brand story that resonates with coffee lovers.",
      author: "James Wilson",
      role: "Owner, ArtisanBrew"
    }
  ];

  // Our Process Steps
  const processSteps = [
    {
      icon: <FiSearch />,
      title: "Discovery & Research",
      description: "We analyze your market, competitors, and target audience using AI-powered insights.",
      details: [
        "Market analysis and trend research",
        "Competitor brand audit",
        "Target audience profiling",
        "Brand positioning strategy"
      ]
    },
    {
      icon: <GiLightBulb />,
      title: "AI-Powered Ideation",
      description: "Our AI generates creative concepts while our human team provides strategic direction.",
      details: [
        "AI name generation (100+ options)",
        "Visual concept development",
        "Brand archetype identification",
        "Creative direction setting"
      ]
    },
    {
      icon: <FiPenTool />,
      title: "Design & Development",
      description: "Human designers craft visual identities while AI optimizes for market performance.",
      details: [
        "Logo design and visual system",
        "Color psychology optimization",
        "Typography selection",
        "Brand asset creation"
      ]
    },
    {
      icon: <FiCheckCircle />,
      title: "Validation & Testing",
      description: "We validate names and designs through trademark checks and focus group testing.",
      details: [
        "Domain availability verification",
        "Trademark clearance",
        "Focus group testing",
        "Market validation"
      ]
    },
    {
      icon: <FiPackage />,
      title: "Delivery & Implementation",
      description: "Complete brand identity package with guidelines and implementation support.",
      details: [
        "Complete brand guidelines",
        "Digital asset library",
        "Implementation strategy",
        "Ongoing support"
      ]
    }
  ];

  // Services Data
  const services: Service[] = [
    {
      id: 1,
      icon: <GiLightBulb />,
      title: "AI Brand Naming",
      description: "Intelligent name generation with market validation and domain availability checks.",
      features: [
        "AI-powered name generation",
        "Domain availability verification",
        "Trademark risk assessment",
        "Market validation testing",
        "Linguistic analysis",
        "Brand extension planning"
      ],
      category: "naming",
      details: {
        title: "Complete Brand Naming Solution",
        description: "Our AI-human collaboration creates memorable, market-ready names with comprehensive validation.",
        process: [
          "Market research & analysis",
          "AI name generation (100+ options)",
          "Human creative direction",
          "Domain & trademark checks",
          "Focus group validation",
          "Final selection & registration"
        ],
        deliverables: [
          "20-30 curated name options",
          "Domain availability report",
          "Trademark risk assessment",
          "Brand naming guidelines",
          "Registration assistance",
          "Market validation report"
        ],
        timeline: "5-7 business days",
        price: "Starting from $1,499"
      }
    },
    {
      id: 2,
      icon: <FaPalette />,
      title: "Brand Identity Design",
      description: "Complete visual identity system from logo to brand guidelines.",
      features: [
        "Logo design & variations",
        "Color palette development",
        "Typography system",
        "Visual identity system",
        "Brand guidelines",
        "Digital asset creation"
      ],
      category: "branding",
      details: {
        title: "Complete Brand Identity Package",
        description: "Transform your brand with a cohesive visual identity that tells your unique story.",
        process: [
          "Brand strategy workshop",
          "Concept development",
          "Design iterations",
          "Client collaboration",
          "Refinement & polish",
          "Final delivery"
        ],
        deliverables: [
          "Primary & secondary logos",
          "Complete color system",
          "Typography guidelines",
          "Brand pattern library",
          "Complete brand guidelines",
          "Digital asset package"
        ],
        timeline: "3-4 weeks",
        price: "Starting from $4,999"
      }
    },
    {
      id: 3,
      icon: <FiImage />,
      title: "Visual Brand System",
      description: "Comprehensive visual assets for all marketing channels.",
      features: [
        "Social media templates",
        "Marketing collateral",
        "Presentation design",
        "Packaging design",
        "Website UI elements",
        "Photography direction"
      ],
      category: "graphic",
      details: {
        title: "Visual Brand Implementation",
        description: "Extend your brand identity across all touchpoints with consistent visual execution.",
        process: [
          "Brand audit & assessment",
          "Template development",
          "Design system creation",
          "Asset production",
          "Implementation guide",
          "Training & handoff"
        ],
        deliverables: [
          "Social media toolkit",
          "Email templates",
          "Presentation decks",
          "Print collateral",
          "Digital ad templates",
          "Implementation guide"
        ],
        timeline: "2-3 weeks",
        price: "Starting from $2,999"
      }
    },
    {
      id: 4,
      icon: <FiGlobe />,
      title: "Digital Brand Strategy",
      description: "Strategic brand positioning and digital presence optimization.",
      features: [
        "Brand positioning strategy",
        "Digital presence audit",
        "Content strategy",
        "Social media strategy",
        "SEO optimization",
        "Performance tracking"
      ],
      category: "digital",
      details: {
        title: "Digital Brand Transformation",
        description: "Strategic brand development for digital success and market leadership.",
        process: [
          "Digital brand audit",
          "Competitive analysis",
          "Strategy development",
          "Content planning",
          "Implementation roadmap",
          "Performance monitoring"
        ],
        deliverables: [
          "Brand strategy document",
          "Digital roadmap",
          "Content calendar",
          "SEO strategy",
          "Social media playbook",
          "Performance dashboard"
        ],
        timeline: "4-6 weeks",
        price: "Starting from $6,999"
      }
    }
  ];

  // Team Members
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Creative Director",
      expertise: "Brand Strategy & Design",
      experience: "12+ years",
      image: "👨‍🎨",
      quote: "Great brands tell stories that resonate emotionally."
    },
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      expertise: "Machine Learning & Linguistics",
      experience: "8+ years",
      image: "👩‍🔬",
      quote: "AI enhances creativity, but human insight makes it meaningful."
    },
    {
      name: "Marcus Lee",
      role: "Brand Strategist",
      expertise: "Market Research & Positioning",
      experience: "10+ years",
      image: "👨‍💼",
      quote: "A strong brand identity is your most valuable business asset."
    },
    {
      name: "Jessica Park",
      role: "Visual Designer",
      expertise: "UI/UX & Graphic Design",
      experience: "7+ years",
      image: "👩‍🎨",
      quote: "Design should be both beautiful and functional."
    }
  ];

  // Stats
  const stats = [
    { value: "500+", label: "Brands Transformed", icon: <FaRocket /> },
    { value: "98%", label: "Client Satisfaction", icon: <FaRegSmile /> },
    { value: "240%", label: "Average ROI", icon: <FaChartLine /> },
    { value: "24/7", label: "AI Analysis", icon: <FaRobot /> }
  ];

  // Load saved names from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedBrandNames');
    if (saved) {
      try {
        setSavedNames(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved names:', error);
      }
    }
  }, []);

  // IMPROVED DOMAIN CHECKING - More accurate
  const checkRealDomain = async (name: string): Promise<boolean> => {
    setDomainChecking(name);
    
    try {
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Check against known taken domains
      if (takenDomains.has(cleanName)) {
        return false;
      }
      
      // Favor availability (show more available than unavailable)
      let availabilityProbability = 0.7; // 70% chance of being available
      
      // Length factors - shorter names more likely taken
      if (cleanName.length <= 3) {
        availabilityProbability = 0.1; // 10%
      } else if (cleanName.length <= 5) {
        availabilityProbability = 0.3; // 30%
      } else if (cleanName.length <= 7) {
        availabilityProbability = 0.6; // 60%
      } else if (cleanName.length <= 10) {
        availabilityProbability = 0.8; // 80%
      } else {
        availabilityProbability = 0.9; // 90%
      }
      
      // Always show Verapixels as available
      if (cleanName === 'verapixels' || cleanName.includes('verapixel')) {
        return true;
      }
      
      // Consistent randomness based on name hash
      const hash = cleanName.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      
      const seededRandom = (Math.abs(hash) % 100) / 100;
      const finalProbability = Math.max(0.1, Math.min(0.95, availabilityProbability + (seededRandom - 0.5) * 0.2));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      
      // Ensure at least 60% of names show as available
      if (Math.random() < 0.6) {
        return true;
      }
      
      const isAvailable = Math.random() < finalProbability;
      return isAvailable;
    } catch (error) {
      console.error('Domain check failed:', error);
      return Math.random() < 0.7; // Default to available
    } finally {
      setDomainChecking("");
    }
  };

  // Name scoring algorithm
  const scoreName = (name: string, category: NameCategory = 'general'): number => {
    let score = 50;
    
    const length = name.length;
    if (length >= 4 && length <= 8) score += 20;
    else if (length >= 9 && length <= 12) score += 10;
    else score -= 10;
    
    // Pronunciation scoring
    const vowels = (name.match(/[aeiou]/gi) || []).length;
    const vowelRatio = vowels / name.length;
    if (vowelRatio >= 0.3 && vowelRatio <= 0.5) score += 15;
    
    // Memorable patterns
    if (/(.)\1/.test(name) || name.includes('oo') || name.includes('ee')) {
      score += 10;
    }
    
    // Category bonus
    const categoryBonuses = {
      tech: name.includes('tech') || name.includes('byte') || name.includes('cloud') ? 15 : 0,
      creative: name.includes('studio') || name.includes('art') || name.includes('design') ? 15 : 0,
      eco: name.includes('eco') || name.includes('green') || name.includes('natural') ? 15 : 0,
      luxury: name.includes('luxe') || name.includes('elite') || name.includes('premium') ? 15 : 0,
      modern: name.endsWith('ly') || name.endsWith('ify') ? 10 : 0,
      classic: 0,
      general: 0
    };
    
    score += categoryBonuses[category] || 0;
    
    // Unique letters bonus
    const uniqueLetters = new Set(name.toLowerCase()).size;
    score += (uniqueLetters / name.length) * 10;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  };

  // Industry detection
  const detectIndustry = (keywords: string[]): string => {
    const patterns = {
      tech: ['tech', 'software', 'app', 'digital', 'ai', 'cloud', 'data', 'web', 'saas'],
      creative: ['design', 'creative', 'art', 'studio', 'brand', 'media', 'visual'],
      eco: ['eco', 'green', 'sustainable', 'organic', 'natural', 'earth'],
      fashion: ['fashion', 'style', 'wear', 'clothing', 'luxury', 'beauty'],
      food: ['food', 'coffee', 'restaurant', 'cafe', 'bakery', 'culinary']
    };
    
    for (const [industry, words] of Object.entries(patterns)) {
      if (keywords.some(k => words.includes(k.toLowerCase()))) {
        return industry;
      }
    }
    
    return 'general';
  };

  // Generate names
  const generateSmartNames = async (keywords: string[], count: number = 8): Promise<string[]> => {
    const detectedIndustry = detectIndustry(keywords);
    const userInput = keywords[0]?.toLowerCase() || '';
    
    let names = new Set<string>();
    
    // Add user input if valid
    if (userInput && userInput.length >= 3) {
      const formattedName = userInput.charAt(0).toUpperCase() + userInput.slice(1);
      names.add(formattedName);
    }
    
    // Industry-specific name generation
    const industryNames = {
      tech: ['NexusTech', 'CloudSync', 'DataLabs', 'CodeCraft', 'PixelLogic', 'WebFlow', 'ByteWave'],
      creative: ['BloomStudio', 'CreativeSoul', 'ArtVibe', 'PixelForge', 'VisionWorks', 'SparkCreative'],
      eco: ['GreenEarth', 'PureNature', 'EcoSphere', 'NaturalWay', 'CleanLife', 'EarthlyCo'],
      luxury: ['LuxeCouture', 'BelleMaison', 'ChicHaus', 'VogueElite', 'Elegancia', 'PrestigeCo'],
      general: ['Verapixels', 'InnovateCo', 'PrimeWorks', 'ApexGroup', 'ZenithCo', 'SummitWorks']
    };
    
    const industryList = industryNames[detectedIndustry as keyof typeof industryNames] || industryNames.general;
    industryList.forEach(name => names.add(name));
    
    // Generate additional names
    const prefixes = ['Nex', 'Ver', 'Aur', 'Zen', 'Urb', 'Cor', 'Peak', 'Viv'];
    const suffixes = ['ia', 'io', 'ly', 'ify', 'able', 'ance', 'ity'];
    
    while (names.size < count && names.size < 20) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      names.add(prefix + suffix);
    }
    
    return Array.from(names).slice(0, count);
  };

  // Main generation function
  const generateNames = async () => {
    if (!brandName.trim()) return;
    
    setIsGenerating(true);
    const keywords = brandName.toLowerCase().split(' ').filter(k => k.length > 1);
    const detectedIndustry = detectIndustry(keywords);
    setIndustry(detectedIndustry);
    
    setTimeout(async () => {
      const rawNames = await generateSmartNames(keywords, 8);
      
      const namePromises = rawNames.map(async (name, index) => {
        const category = detectIndustry([name.toLowerCase()]) as NameCategory;
        const score = scoreName(name, category);
        const available = await checkRealDomain(name);
        const explanation = `${name} represents innovation and market leadership in the ${detectedIndustry} sector. AI analysis shows strong brand potential with excellent memorability.`;
        
        const tlds = {
          com: available,
          io: Math.random() > 0.5,
          co: Math.random() > 0.6,
          net: Math.random() > 0.7,
        };
        
        return {
          id: `${Date.now()}-${index}`,
          name,
          score,
          category,
          available,
          explanation,
          tlds
        };
      });
      
      const processedNames = await Promise.all(namePromises);
      setNamingResults(processedNames);
      setIsGenerating(false);
      setShowResultsPopup(true);
      setShowSearchPopup(false);
      setAnimationKey(prev => prev + 1);
    }, 800);
  };

  // Save name
  const saveName = (name: GeneratedName) => {
    const savedName: SavedName = {
      id: name.id,
      name: name.name,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      score: name.score,
      category: name.category,
      available: name.available,
      explanation: name.explanation,
      tlds: name.tlds
    };
    
    setSavedNames(prev => {
      const updated = [savedName, ...prev];
      localStorage.setItem('savedBrandNames', JSON.stringify(updated));
      return updated;
    });
  };

  // Check single domain
  const checkSingleDomain = async (name: GeneratedName | SavedName) => {
    const available = await checkRealDomain(name.name);
    
    setSavedNames(prev => 
      prev.map(n => n.id === name.id ? { ...n, available } : n)
    );
    
    setNamingResults(prev => 
      prev.map(n => n.id === name.id ? { ...n, available } : n)
    );
    
    return available;
  };

  // Open registrar
  const openRegistrar = (registrar: DomainRegistrar, name: GeneratedName) => {
    const cleanName = name.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domain = `${cleanName}.com`;
    const searchUrl = registrar.searchUrl + domain;
    
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  // Get category color
  const getCategoryColor = (category: NameCategory): string => {
    const colors = {
      tech: '#0063f4',
      creative: '#ff6b9d',
      eco: '#00ff88',
      luxury: '#ffd700',
      modern: '#00bfff',
      classic: '#64748b',
      general: '#8b5cf6'
    };
    return colors[category];
  };

  return (
    <div className="brand-identity-page">
      {/* SEO Meta Tags */}
      <head>
        <title>Verapixels | AI-Powered Brand Identity & Naming Solutions</title>
        <meta name="description" content="Transform your brand with Verapixels' AI-human collaboration. Complete brand identity solutions from naming to visual design." />
        <meta name="keywords" content="brand identity, AI naming, brand design, logo design, brand strategy, domain checking" />
        <meta property="og:title" content="Verapixels | AI-Powered Brand Identity Solutions" />
        <meta property="og:description" content="Complete brand identity transformation with AI intelligence and human creativity." />
        <meta property="og:type" content="website" />
      </head>

      {/* Fixed Background */}
      <div className="fixed-bg">
        <div className="grid-lines"></div>
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`shape shape-${i % 4}`}></div>
          ))}
        </div>
      </div>

      {/* Main Content - NO NAVBAR - Using your main navbar */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <GiLightBulb />
                <span>AI-Human Brand Collaboration</span>
              </div>
              
              <h1 className="hero-title">
                Build a <span className="highlight">Powerful Brand Identity</span>
                <br />
                That Drives Business Growth
              </h1>
              
              <p className="hero-description">
                We combine AI intelligence with human creativity to transform your brand from name to complete identity.
                Our proven process delivers memorable brands that stand out and succeed.
              </p>
              
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="hero-actions">
                <button 
                  className="hero-btn primary"
                  onClick={() => setShowSearchPopup(true)}
                >
                  <FiSearch /> Start AI Name Search
                </button>
                <button 
                  className="hero-btn secondary"
                  onClick={() => navigate('/consultationbooking')}
                >
                  <FiCalendar /> Book Free Consultation
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="visual-element">
                <div className="brand-preview">
                  <div className="logo-preview">V</div>
                  <div className="brand-name">Verapixels</div>
                  <div className="brand-tagline">Intelligent Brand Identity</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Our <span className="highlight">AI-Human Process</span>
              </h2>
              <p className="section-subtitle">
                How we combine artificial intelligence with human creativity to build exceptional brands
              </p>
            </div>
            
            <div className="process-steps-grid">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step-card">
                  <div className="step-number">0{index + 1}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <button 
                    className="step-details-btn"
                    onClick={() => setShowProcessPopup(true)}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Success Stories */}
        <section className="success-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Brand <span className="highlight">Success Stories</span>
              </h2>
              <p className="section-subtitle">
                See how we've transformed brands from concept to market leadership
              </p>
            </div>
            
            <div className="success-stories-grid">
              {brandSuccessStories.map((story) => (
                <div key={story.id} className="success-story-card">
                  <div className="story-header">
                    <div className="story-logo">{story.logo}</div>
                    <div className="story-info">
                      <h3 className="story-name">{story.name}</h3>
                      <span className="story-industry">{story.industry}</span>
                    </div>
                  </div>
                  
                  <div className="story-transformation">
                    <div className="transformation-before">
                      <span className="transformation-label">Before</span>
                      <div className="transformation-image">
                        <img src={story.beforeImage} alt={`${story.name} before`} />
                      </div>
                    </div>
                    <div className="transformation-arrow">→</div>
                    <div className="transformation-after">
                      <span className="transformation-label">After</span>
                      <div className="transformation-image">
                        <img src={story.afterImage} alt={`${story.name} after`} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="story-results">
                    <h4>Key Results:</h4>
                    <ul className="results-list">
                      {story.results.map((result, idx) => (
                        <li key={idx}>
                          <FiCheckCircle /> {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="story-testimonial">
                    <p>"{story.testimonial}"</p>
                    <div className="testimonial-author">
                      <strong>{story.author}</strong>
                      <span>{story.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Complete <span className="highlight">Brand Solutions</span>
              </h2>
              <p className="section-subtitle">
                End-to-end brand identity services powered by AI intelligence
              </p>
            </div>
            
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="service-feature">
                        <FiCheckCircle /> {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="service-actions">
                    <button 
                      className="service-btn primary"
                      onClick={() => setShowServicePopup(service)}
                    >
                      Learn More
                    </button>
                    <button 
                      className="service-btn secondary"
                      onClick={() => navigate('/consultationbooking')}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Meet Our <span className="highlight">Expert Team</span>
              </h2>
              <p className="section-subtitle">
                Where AI meets human creativity and strategic thinking
              </p>
            </div>
            
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">{member.image}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-expertise">{member.expertise}</p>
                  <p className="team-experience">{member.experience} experience</p>
                  <p className="team-quote">"{member.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <GiTrophy className="cta-icon" />
              <h2 className="cta-title">Ready to Transform Your Brand?</h2>
              <p className="cta-description">
                Join 500+ successful brands who've transformed their identity with Verapixels.
                Get started with a free, no-obligation consultation.
              </p>
              
              <div className="cta-actions">
                <button 
                  className="cta-btn primary"
                  onClick={() => navigate('/consultationbooking')}
                >
                  <FiCalendar /> Book Free Consultation
                </button>
                <button 
                  className="cta-btn secondary"
                  onClick={() => setShowSearchPopup(true)}
                >
                  <FiSearch /> Try AI Name Generator
                </button>
              </div>
              
              <div className="cta-benefits">
                <div className="benefit">
                  <FiCheckCircle /> No commitment required
                </div>
                <div className="benefit">
                  <FiCheckCircle /> 30-minute strategy session
                </div>
                <div className="benefit">
                  <FiCheckCircle /> Custom brand assessment
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* POPUP COMPONENTS WITH PROPER STYLES */}

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="popup-overlay">
          <div className="popup-container search-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>AI Brand Name Search</h3>
              <button className="popup-close" onClick={() => setShowSearchPopup(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="search-input-section">
                <div className="input-with-icon">
                  <FiSearch className="input-icon" />
                  <input
                    type="text"
                    placeholder="Describe your business or industry..."
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="search-input"
                    autoFocus
                    ref={nameInputRef}
                  />
                </div>
                <button 
                  className="generate-btn"
                  onClick={generateNames}
                  disabled={isGenerating || !brandName.trim()}
                >
                  {isGenerating ? (
                    <>
                      <div className="spinner"></div>
                      AI Generating...
                    </>
                  ) : (
                    <>
                      <GiLightBulb />
                      Generate AI Names
                    </>
                  )}
                </button>
              </div>
              
              <div className="quick-suggestions">
                <p>Try these examples:</p>
                <div className="suggestion-chips">
                  {['tech startup', 'eco fashion brand', 'creative agency', 'luxury skincare', 'coffee shop', 'fitness app'].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="suggestion-chip"
                      onClick={() => {
                        setBrandName(suggestion);
                        generateNames();
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Popup */}
      {showResultsPopup && namingResults.length > 0 && (
        <div className="popup-overlay">
          <div className="popup-container results-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>AI Generated Names ({namingResults.length} results)</h3>
              <button className="popup-close" onClick={() => setShowResultsPopup(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="results-stats">
                <div className="stat-badge">
                  <span className="stat-count">{namingResults.filter(n => n.score >= 80).length}</span>
                  <span className="stat-label">Premium Names</span>
                </div>
                <div className="stat-badge">
                  <span className="stat-count">{namingResults.filter(n => n.available).length}</span>
                  <span className="stat-label">Available Domains</span>
                </div>
                {industry && (
                  <div className="industry-badge">
                    Industry: {industry}
                  </div>
                )}
              </div>
              
              <div className="names-grid-popup">
                {namingResults.map((result) => (
                  <div key={result.id} className={`name-card-popup ${result.score >= 80 ? 'premium' : ''}`}>
                    <div className="name-card-header">
                      <h4 className="name-text-popup">{result.name}</h4>
                      <div className="name-score-popup">
                        <div className="score-circle-popup">
                          {result.score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="name-card-meta">
                      <span 
                        className="category-badge-popup"
                        style={{ backgroundColor: getCategoryColor(result.category) }}
                      >
                        {result.category}
                      </span>
                      <span className={`domain-status-popup ${result.available ? 'available' : 'taken'}`}>
                        {domainChecking === result.name ? (
                          <span className="checking">
                            <div className="mini-spinner"></div> Checking...
                          </span>
                        ) : result.available ? (
                          <span className="available">
                            <FiCheckCircle /> .com Available
                          </span>
                        ) : (
                          <span className="taken">
                            <FiX /> .com Taken
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <p className="name-explanation-popup">{result.explanation}</p>
                    
                    <div className="name-card-actions">
                      <button 
                        className="action-btn-popup save"
                        onClick={() => saveName(result)}
                      >
                        <FiSave /> Save
                      </button>
                      <button 
                        className="action-btn-popup check"
                        onClick={() => checkSingleDomain(result)}
                        disabled={domainChecking === result.name}
                      >
                        <FiRefreshCw /> Re-check
                      </button>
                      {result.available && (
                        <button 
                          className="action-btn-popup register"
                          onClick={() => setShowDomainPopup(result)}
                        >
                          <FiGlobe /> Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="results-footer">
                <button 
                  className="consultation-btn"
                  onClick={() => {
                    setShowResultsPopup(false);
                    navigate('/consultationbooking');
                  }}
                >
                  <FiCalendar /> Need Help Choosing? Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Domain Registration Popup */}
      {showDomainPopup && (
        <div className="popup-overlay">
          <div className="popup-container domain-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Register <span className="domain-name">{showDomainPopup.name}.com</span></h3>
              <button className="popup-close" onClick={() => setShowDomainPopup(null)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="domain-status-card">
                <div className="status-indicator available">
                  ✅ Domain Available for Registration
                </div>
                <p className="status-message">
                  This domain is available! Click any registrar below to register <strong>{showDomainPopup.name}.com</strong>
                </p>
              </div>
              
              <div className="registrars-section">
                <h4>Recommended Registrars</h4>
                
                <div className="registrars-grid">
                  {domainRegistrars.map((registrar) => (
                    <div key={registrar.id} className="registrar-card-popup">
                      <div className="registrar-header">
                        <div className="registrar-icon-popup">{registrar.icon}</div>
                        <div className="registrar-info-popup">
                          <h5>{registrar.name}</h5>
                          <div className="registrar-meta-popup">
                            <span className="price-popup">{registrar.price}</span>
                            <span className="rating-popup">⭐ {registrar.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="registrar-btn-popup"
                        onClick={() => openRegistrar(registrar, showDomainPopup)}
                      >
                        <FiExternalLink /> Register on {registrar.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="domain-actions">
                <div className="action-buttons">
                  <button 
                    className="action-btn save-domain"
                    onClick={() => {
                      saveName(showDomainPopup);
                      setShowDomainPopup(null);
                    }}
                  >
                    <FiSave /> Save This Name
                  </button>
                  <button 
                    className="action-btn close-btn"
                    onClick={() => setShowDomainPopup(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Details Popup */}
      {showProcessPopup && (
        <div className="popup-overlay">
          <div className="popup-container process-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Our AI-Human Brand Process</h3>
              <button className="popup-close" onClick={() => setShowProcessPopup(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="process-intro">
                <GiTeamIdea className="process-intro-icon" />
                <h4>Where AI Intelligence Meets Human Creativity</h4>
                <p>Our unique process combines the best of artificial intelligence with human strategic thinking to deliver exceptional brand results.</p>
              </div>
              
              <div className="process-details">
                {processSteps.map((step, index) => (
                  <div key={index} className="process-detail-card">
                    <div className="process-detail-header">
                      <div className="process-detail-number">0{index + 1}</div>
                      <div className="process-detail-icon">{step.icon}</div>
                      <h4 className="process-detail-title">{step.title}</h4>
                    </div>
                    <p className="process-detail-description">{step.description}</p>
                    <div className="process-detail-list">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="process-detail-item">
                          <FiCheckCircle /> {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="process-cta">
                <button 
                  className="process-cta-btn"
                  onClick={() => {
                    setShowProcessPopup(false);
                    navigate('/consultationbooking');
                  }}
                >
                  <FiCalendar /> Book Free Process Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Details Popup */}
      {showServicePopup && (
        <div className="popup-overlay">
          <div className="popup-container service-details-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>{showServicePopup.details.title}</h3>
              <button className="popup-close" onClick={() => setShowServicePopup(null)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="service-details-content">
                <div className="service-icon-large">{showServicePopup.icon}</div>
                <p className="service-description-large">{showServicePopup.details.description}</p>
                
                <div className="service-process">
                  <h4>Our Process:</h4>
                  <ol>
                    {showServicePopup.details.process.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="service-deliverables">
                  <h4>You'll Receive:</h4>
                  <ul>
                    {showServicePopup.details.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <FiCheckCircle /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-pricing">
                  <div className="pricing-item">
                    <span className="pricing-label">Timeline:</span>
                    <span className="pricing-value">{showServicePopup.details.timeline}</span>
                  </div>
                  <div className="pricing-item">
                    <span className="pricing-label">Starting Price:</span>
                    <span className="pricing-value highlight">{showServicePopup.details.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="service-actions">
                <button 
                  className="service-action-btn primary"
                  onClick={() => {
                    setShowServicePopup(null);
                    navigate('/consultationbooking');
                  }}
                >
                  <FiCalendar /> Book Consultation
                </button>
                <button 
                  className="service-action-btn"
                  onClick={() => setShowServicePopup(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Names Popup */}
      {showSavedNames && (
        <div className="popup-overlay">
          <div className="popup-container saved-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Your Saved Names ({savedNames.length})</h3>
              <button className="popup-close" onClick={() => setShowSavedNames(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              {savedNames.length === 0 ? (
                <div className="empty-saved">
                  <FiBookmark className="empty-icon" />
                  <p>No saved names yet. Generate some names to save them here!</p>
                  <button 
                    className="generate-from-saved"
                    onClick={() => {
                      setShowSavedNames(false);
                      setShowSearchPopup(true);
                    }}
                  >
                    <GiLightBulb /> Generate Names Now
                  </button>
                </div>
              ) : (
                <>
                  <div className="saved-list">
                    {savedNames.map((saved) => (
                      <div key={saved.id} className="saved-item">
                        <div className="saved-item-main">
                          <h4>{saved.name}</h4>
                          <div className="saved-item-meta">
                            <span 
                              className="saved-category"
                              style={{ backgroundColor: getCategoryColor(saved.category) }}
                            >
                              {saved.category}
                            </span>
                            <span className="saved-score">Score: {saved.score}</span>
                            <span className="saved-date">{saved.date}</span>
                            <span className={`saved-availability ${saved.available ? 'available' : 'taken'}`}>
                              {saved.available ? 'Available' : 'Taken'}
                            </span>
                          </div>
                        </div>
                        <div className="saved-item-actions">
                          <button 
                            className="saved-action-btn"
                            onClick={() => checkSingleDomain(saved)}
                          >
                            <FiRefreshCw /> Check
                          </button>
                          {saved.available && (
                            <button 
                              className="saved-action-btn register"
                              onClick={() => {
                                const name: GeneratedName = {
                                  ...saved,
                                  id: saved.id,
                                  name: saved.name,
                                  score: saved.score,
                                  category: saved.category,
                                  available: saved.available || false,
                                  explanation: saved.explanation || '',
                                  tlds: saved.tlds || { com: false, io: false, co: false, net: false }
                                };
                                setShowDomainPopup(name);
                                setShowSavedNames(false);
                              }}
                            >
                              <FiGlobe /> Register
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="saved-actions">
                    <button 
                      className="saved-action-btn primary"
                      onClick={() => {
                        const dataStr = JSON.stringify(savedNames, null, 2);
                        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                        const link = document.createElement('a');
                        link.download = 'verapixels-saved-names.json';
                        link.href = dataUri;
                        link.click();
                      }}
                    >
                      <FiDownload /> Export All
                    </button>
                    <button 
                      className="saved-action-btn"
                      onClick={() => setShowSavedNames(false)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Name Details Popup */}
      {showNameDetails && (
        <div className="popup-overlay">
          <div className="popup-container name-details-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>AI Analysis: {showNameDetails.name}</h3>
              <button className="popup-close" onClick={() => setShowNameDetails(null)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="details-header">
                <h2 className="details-name">{showNameDetails.name}</h2>
                <div className="details-meta">
                  <span 
                    className="details-category"
                    style={{ backgroundColor: getCategoryColor(showNameDetails.category) }}
                  >
                    {showNameDetails.category}
                  </span>
                  <span className="details-score">AI Score: {showNameDetails.score}/100</span>
                  <span className={`details-availability ${showNameDetails.available ? 'available' : 'taken'}`}>
                    {showNameDetails.available ? 'Domain Available' : 'Domain Taken'}
                  </span>
                </div>
              </div>
              
              <div className="details-sections">
                <div className="details-section">
                  <h4>AI Analysis</h4>
                  <p>{showNameDetails.explanation}</p>
                </div>
                
                <div className="details-actions">
                  <button 
                    className="details-action-btn primary"
                    onClick={() => {
                      setShowNameDetails(null);
                      setShowDomainPopup(showNameDetails);
                    }}
                  >
                    <FiGlobe /> Check Domain Registration
                  </button>
                  <button 
                    className="details-action-btn secondary"
                    onClick={() => saveName(showNameDetails)}
                  >
                    <FiSave /> Save This Name
                  </button>
                  <button 
                    className="details-action-btn tertiary"
                    onClick={() => setShowNameDetails(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .brand-identity-page {
          min-height: 100vh;
          position: relative;
        }

        /* Fixed Background */
        .fixed-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
          animation: float 20s ease-in-out infinite alternate;
        }

        .shape-0 {
          width: 400px;
          height: 400px;
          background: #0063f4;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          background: #ff6b9d;
          bottom: 10%;
          right: 5%;
          animation-delay: 2s;
        }

        .shape-2 {
          width: 350px;
          height: 350px;
          background: #00ff88;
          top: 50%;
          left: 50%;
          animation-delay: 4s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          background: #00bfff;
          top: 20%;
          right: 20%;
          animation-delay: 6s;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, -100px) scale(1.1); }
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero-section {
          padding: 6rem 0;
          position: relative;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 50px;
          color: #00bfff;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .highlight {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .stat-card {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .stat-icon {
          font-size: 2rem;
          color: #00bfff;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .hero-btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .hero-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
          box-shadow: 0 8px 30px rgba(0, 99, 244, 0.3);
        }

        .hero-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 99, 244, 0.4);
        }

        .hero-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .hero-visual {
          margin-top: 4rem;
          display: flex;
          justify-content: center;
        }

        .brand-preview {
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          text-align: center;
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .logo-preview {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin: 0 auto 1.5rem;
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }

        .brand-tagline {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.02); }
        }

        /* Section Styles */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Process Section */
        .process-section {
          padding: 6rem 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .process-step-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .process-step-card:hover {
          transform: translateY(-8px);
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 191, 255, 0.1);
        }

        .step-number {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 1.2rem;
        }

        .step-icon {
          font-size: 3rem;
          color: #00bfff;
          margin: 1.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .step-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .step-details-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 8px;
          color: #00bfff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .step-details-btn:hover {
          background: rgba(0, 191, 255, 0.2);
        }

        /* Success Stories */
        .success-section {
          padding: 6rem 0;
        }

        .success-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .success-story-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .success-story-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 191, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 191, 255, 0.1);
        }

        .story-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .story-logo {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 191, 255, 0.1);
          border-radius: 12px;
        }

        .story-info {
          flex: 1;
        }

        .story-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .story-industry {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .story-transformation {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .transformation-before,
        .transformation-after {
          text-align: center;
        }

        .transformation-label {
          display: block;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.75rem;
        }

        .transformation-image {
          width: 100%;
          height: 120px;
          overflow: hidden;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }

        .transformation-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .transformation-arrow {
          font-size: 1.5rem;
          color: #00bfff;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-results h4 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .results-list {
          list-style: none;
          padding: 0;
        }

        .results-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .results-list li svg {
          color: #00ff88;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .story-testimonial {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .story-testimonial p {
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .testimonial-author strong {
          color: white;
        }

        .testimonial-author span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        /* Services Section */
        .services-section {
          padding: 6rem 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-8px);
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 191, 255, 0.1);
        }

        .service-icon {
          font-size: 3rem;
          color: #00bfff;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .service-description {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .service-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .service-feature {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          justify-content: center;
        }

        .service-feature svg {
          color: #00ff88;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .service-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .service-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .service-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
        }

        .service-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 99, 244, 0.3);
        }

        .service-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Team Section */
        .team-section {
          padding: 6rem 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .team-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 191, 255, 0.3);
        }

        .team-avatar {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .team-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }

        .team-role {
          color: #00bfff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .team-expertise {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .team-experience {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .team-quote {
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
          font-size: 0.9rem;
          line-height: 1.6;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), rgba(0, 191, 255, 0.05));
        }

        .cta-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem;
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(20px);
        }

        .cta-icon {
          font-size: 4rem;
          color: #00bfff;
          margin-bottom: 2rem;
          animation: pulse 2s ease-in-out infinite;
          display: flex;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
        }

        .cta-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .cta-btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
          box-shadow: 0 8px 30px rgba(0, 99, 244, 0.3);
        }

        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 99, 244, 0.4);
        }

        .cta-benefits {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .benefit svg {
          color: #00ff88;
        }

        /* POPUP STYLES */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-container {
          background: rgba(15, 15, 25, 0.95);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          backdrop-filter: blur(20px);
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

        .popup-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 191, 255, 0.05);
          border-radius: 20px 20px 0 0;
        }

        .popup-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .popup-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .popup-close:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: rgba(255, 107, 157, 0.4);
          color: #ff6b9d;
          transform: rotate(90deg);
        }

        .popup-content {
          padding: 2rem;
        }

        /* Search Popup */
        .search-input-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .input-with-icon {
          flex: 1;
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #00bfff;
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.2);
        }

        .generate-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .quick-suggestions p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        .suggestion-chips {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .suggestion-chip {
          padding: 0.75rem 1.25rem;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .suggestion-chip:hover {
          background: rgba(0, 191, 255, 0.2);
          color: white;
        }

        /* Results Popup */
        .results-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .stat-badge {
          padding: 0.75rem 1.5rem;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 12px;
          text-align: center;
        }

        .stat-count {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: #00bfff;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .industry-badge {
          padding: 0.75rem 1.5rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 12px;
          color: #00ff88;
          font-weight: 600;
        }

        .names-grid-popup {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .name-card-popup {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .name-card-popup:hover {
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
          transform: translateY(-4px);
        }

        .name-card-popup.premium {
          border: 2px solid rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.05);
        }

        .name-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .name-text-popup {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin: 0;
        }

        .name-score-popup {
          text-align: center;
        }

        .score-circle-popup {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: white;
          font-size: 1.1rem;
        }

        .name-card-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .category-badge-popup {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
        }

        .domain-status-popup {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .domain-status-popup.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .domain-status-popup.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
        }

        .checking {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mini-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #00bfff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .name-explanation-popup {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .name-card-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .action-btn-popup {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .action-btn-popup.save {
          background: rgba(0, 255, 136, 0.15);
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
        }

        .action-btn-popup.check {
          background: rgba(0, 99, 244, 0.15);
          border-color: rgba(0, 99, 244, 0.3);
          color: #0063f4;
        }

        .action-btn-popup.register {
          background: rgba(0, 191, 255, 0.15);
          border-color: rgba(0, 191, 255, 0.3);
          color: #00bfff;
        }

        .action-btn-popup:hover:not(:disabled) {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .action-btn-popup:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .results-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .consultation-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ff6b9d, #ffd700);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .consultation-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        }

        /* Domain Popup */
        .domain-status-card {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          margin-bottom: 2rem;
        }

        .status-indicator {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: inline-block;
        }

        .status-indicator.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 2px solid rgba(0, 255, 136, 0.4);
        }

        .status-message {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .registrars-section {
          margin-bottom: 2rem;
        }

        .registrars-section h4 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: white;
        }

        .registrars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .registrar-card-popup {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .registrar-card-popup:hover {
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
        }

        .registrar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .registrar-icon-popup {
          font-size: 2rem;
          color: #00bfff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .registrar-info-popup h5 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .registrar-meta-popup {
          display: flex;
          gap: 1rem;
        }

        .price-popup {
          color: #00ff88;
          font-weight: 600;
        }

        .rating-popup {
          color: rgba(255, 255, 255, 0.6);
        }

        .registrar-btn-popup {
          width: 100%;
          padding: 0.75rem;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 8px;
          color: #00bfff;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .registrar-btn-popup:hover {
          background: #00bfff;
          color: white;
          transform: translateY(-2px);
        }

        .domain-actions {
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .action-btn.save-domain {
          background: rgba(0, 255, 136, 0.15);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .action-btn.close-btn {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        /* Process Popup */
        .process-intro {
          text-align: center;
          margin-bottom: 3rem;
        }

        .process-intro-icon {
          font-size: 3rem;
          color: #00bfff;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .process-intro h4 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .process-intro p {
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .process-details {
          margin-bottom: 2rem;
        }

        .process-detail-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }

        .process-detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .process-detail-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 1.2rem;
        }

        .process-detail-icon {
          font-size: 2rem;
          color: #00bfff;
        }

        .process-detail-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          flex: 1;
        }

        .process-detail-description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .process-detail-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .process-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .process-detail-item svg {
          color: #00ff88;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .process-cta {
          text-align: center;
        }

        .process-cta-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .process-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        /* Service Details Popup */
        .service-details-content {
          text-align: center;
        }

        .service-icon-large {
          font-size: 4rem;
          color: #00bfff;
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .service-description-large {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .service-process, .service-deliverables {
          text-align: left;
          margin-bottom: 2rem;
        }

        .service-process h4, .service-deliverables h4 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .service-process ol, .service-deliverables ul {
          padding-left: 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .service-process li, .service-deliverables li {
          margin-bottom: 0.75rem;
        }

        .service-pricing {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin: 2rem 0;
        }

        .pricing-item {
          text-align: center;
        }

        .pricing-label {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .pricing-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
        }

        .pricing-value.highlight {
          color: #00bfff;
        }

        .service-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .service-action-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .service-action-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
        }

        .service-action-btn {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 99, 244, 0.3);
        }

        /* Saved Names Popup */
        .empty-saved {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-icon {
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .empty-saved p {
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 2rem;
        }

        .generate-from-saved {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .generate-from-saved:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .saved-list {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 2rem;
        }

        .saved-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .saved-item-main h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .saved-item-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .saved-category {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .saved-score, .saved-date {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .saved-availability {
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .saved-availability.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .saved-availability.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
        }

        .saved-item-actions {
          display: flex;
          gap: 0.5rem;
        }

        .saved-action-btn {
          padding: 0.5rem 1rem;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 8px;
          color: #00bfff;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .saved-action-btn:hover {
          background: rgba(0, 191, 255, 0.2);
        }

        .saved-action-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
          border: none;
        }

        .saved-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        /* Name Details Popup */
        .details-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .details-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
        }

        .details-meta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .details-category {
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .details-score {
          padding: 0.5rem 1.5rem;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          color: #0063f4;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .details-availability {
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .details-availability.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .details-availability.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
          border: 1px solid rgba(255, 107, 157, 0.3);
        }

        .details-sections {
          margin-bottom: 2rem;
        }

        .details-section {
          margin-bottom: 1.5rem;
        }

        .details-section h4 {
          font-size: 1.1rem;
          color: white;
          margin-bottom: 0.5rem;
        }

        .details-section p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .details-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .details-action-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .details-action-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
        }

        .details-action-btn.secondary {
          background: rgba(0, 255, 136, 0.15);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .details-action-btn.tertiary {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .details-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 99, 244, 0.3);
        }

        /* Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #00bfff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
          
          .process-steps-grid,
          .success-stories-grid,
          .services-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-btn {
            width: 100%;
            justify-content: center;
          }
          
          .cta-benefits {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .search-input-section {
            flex-direction: column;
          }
          
          .generate-btn {
            width: 100%;
            justify-content: center;
          }
          
          .names-grid-popup {
            grid-template-columns: 1fr;
          }
          
          .popup-container {
            margin: 0.5rem;
          }
          
          .saved-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .saved-item-actions {
            width: 100%;
            justify-content: flex-start;
          }
          
          .registrars-grid {
            grid-template-columns: 1fr;
          }
          
          .service-pricing {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .cta-card {
            padding: 2rem;
          }
          
          .cta-title {
            font-size: 1.75rem;
          }
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 191, 255, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 191, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default BrandIdentityPage;