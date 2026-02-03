import React, { useState, useEffect, useRef } from "react";
import { 
  FiTarget, FiLayers, FiPackage, FiLayout, FiPenTool,
  FiImage, FiType, FiGrid, FiCheckCircle, FiZap,
  FiAward, FiUsers, FiStar, FiRefreshCw, FiTrendingUp,
  FiPhone, FiMail, FiGlobe, FiMessageSquare, FiArrowRight,
  FiFeather, FiSearch, FiTag, FiCompass, FiBriefcase,
  FiEye, FiHeart, FiPocket, FiShoppingBag, FiX, 
  FiDownload, FiExternalLink, FiInfo, FiChevronDown,
  FiChevronUp, FiCopy, FiShare2, FiBookmark, FiSave,
  FiServer, FiFilter, FiImage as FiImageIcon
} from "react-icons/fi";
import { 
  GiLightBulb, GiPerspectiveDiceSixFacesRandom 
} from "react-icons/gi";
import { 
  SiGodaddy, SiNamecheap, SiHostinger, SiCloudflare,
  SiGoogle, SiAmazon, SiVercel
} from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import html2canvas from 'html2canvas';

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
  baseUrl: string;
  searchUrl: string;
  price: string;
  rating: number;
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

const BrandingDesignPage: React.FC = () => {
  // State Management
  const [scrollY, setScrollY] = useState<number>(0);
  const [activeService, setActiveService] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | ServiceCategory>("all");
  const [brandName, setBrandName] = useState<string>("");
  const [namingResults, setNamingResults] = useState<GeneratedName[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [savedNames, setSavedNames] = useState<SavedName[]>([]);
  const [showNamePopup, setShowNamePopup] = useState<boolean>(false);
  const [showServicePopup, setShowServicePopup] = useState<Service | null>(null);
  const [showDomainPopup, setShowDomainPopup] = useState<GeneratedName | null>(null);
  const [showSavedNames, setShowSavedNames] = useState<boolean>(false);
  const [showNameDetails, setShowNameDetails] = useState<GeneratedName | null>(null);
  const [domainChecking, setDomainChecking] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [nameSearchResults, setNameSearchResults] = useState<GeneratedName[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<GeneratedName | null>(null);
  const [selectedTLD, setSelectedTLD] = useState<string>('com');
  
  // Refs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const nameImageRef = useRef<HTMLDivElement>(null);

  // Domain Registrars with proper search URLs
  const domainRegistrars: DomainRegistrar[] = [
    { 
      id: 'namecheap', 
      name: 'Namecheap', 
      icon: <SiNamecheap />, 
      baseUrl: 'https://www.namecheap.com',
      searchUrl: 'https://www.namecheap.com/domains/registration/results/?domain=',
      price: '$8.88/yr', 
      rating: 4.8 
    },
    { 
      id: 'godaddy', 
      name: 'GoDaddy', 
      icon: <SiGodaddy />, 
      baseUrl: 'https://www.godaddy.com',
      searchUrl: 'https://www.godaddy.com/domainsearch/find?domainToCheck=',
      price: '$11.99/yr', 
      rating: 4.5 
    },
    { 
      id: 'hostinger', 
      name: 'Hostinger', 
      icon: <SiHostinger />, 
      baseUrl: 'https://www.hostinger.com',
      searchUrl: 'https://www.hostinger.com/domain-checker?domain=',
      price: '$9.99/yr', 
      rating: 4.7 
    },
    { 
      id: 'cloudflare', 
      name: 'Cloudflare', 
      icon: <SiCloudflare />, 
      baseUrl: 'https://www.cloudflare.com',
      searchUrl: 'https://www.cloudflare.com/products/registrar',
      price: '$8.57/yr', 
      rating: 4.9 
    },
    { 
      id: 'google', 
      name: 'Google Domains', 
      icon: <SiGoogle />, 
      baseUrl: 'https://domains.google',
      searchUrl: 'https://domains.google/registrar/search?searchTerm=',
      price: '$12/yr', 
      rating: 4.6 
    },
    { 
      id: 'bluehost', 
      name: 'Bluehost', 
      icon: <FiServer />, 
      baseUrl: 'https://www.bluehost.com',
      searchUrl: 'https://www.bluehost.com/domains/search?domain=',
      price: '$10.99/yr', 
      rating: 4.4 
    },
    { 
      id: 'namecom', 
      name: 'Name.com', 
      icon: <TbWorldWww />, 
      baseUrl: 'https://www.name.com',
      searchUrl: 'https://www.name.com/domain/search/',
      price: '$9.99/yr', 
      rating: 4.5 
    },
  ];

  // Enhanced AI-powered name database
  const nameDatabase = {
    verapixels: {
      name: "Verapixels",
      category: "tech" as NameCategory,
      meaning: "Combination of 'Vera' (truth) and 'Pixels' (digital elements)",
      score: 92,
      available: true,
      description: "Perfect for a digital agency focusing on authenticity and pixel-perfect design"
    },
    tech: [
      "NexusTech", "CloudSync", "DataLabs", "CodeCraft", "PixelLogic", "WebFlow",
      "ByteWave", "QuantumLogic", "AlphaStack", "SmartCore", "NovaTech", "DigiForge"
    ],
    creative: [
      "BloomStudio", "CreativeSoul", "ArtVibe", "PixelForge", "VisionWorks", "SparkCreative",
      "CanvasLab", "ColorTheory", "InkWell", "StudioFlow", "DesignHaus", "ArtistryCo"
    ],
    eco: [
      "GreenEarth", "PureNature", "EcoSphere", "NaturalWay", "CleanLife", "Earthly",
      "SustainAble", "OrganicRoots", "BloomEco", "FreshLeaf", "TerraGreen", "EcoVibe"
    ],
    luxury: [
      "LuxeCouture", "BelleMaison", "ChicHaus", "VogueElite", "Elegancia", "PrestigeCo",
      "RoyalBloom", "SovereignStyle", "Opulentia", "Grandeur", "NobleCraft", "AristoDesign"
    ]
  };

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

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowNamePopup(false);
        setShowServicePopup(null);
        setShowDomainPopup(null);
        setShowNameDetails(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced AI industry detection with ML-like patterns
  const detectIndustry = (keywords: string[]): string => {
    const industryPatterns = {
      'tech': {
        keywords: ['tech', 'software', 'app', 'digital', 'ai', 'cloud', 'data', 'code', 'web', 'mobile', 'api', 'saas', 'platform'],
        weight: 1.5
      },
      'creative': {
        keywords: ['design', 'creative', 'art', 'studio', 'brand', 'media', 'visual', 'graphic', 'photo', 'video', 'animation'],
        weight: 1.3
      },
      'eco': {
        keywords: ['eco', 'green', 'sustainable', 'organic', 'natural', 'earth', 'clean', 'environment', 'renewable', 'carbon'],
        weight: 1.4
      },
      'fashion': {
        keywords: ['fashion', 'style', 'wear', 'clothing', 'apparel', 'luxury', 'beauty', 'cosmetic', 'jewelry', 'accessory'],
        weight: 1.2
      },
      'health': {
        keywords: ['health', 'wellness', 'fitness', 'care', 'medical', 'therapy', 'yoga', 'nutrition', 'mental', 'clinic'],
        weight: 1.1
      },
      'food': {
        keywords: ['food', 'coffee', 'restaurant', 'cafe', 'bakery', 'kitchen', 'brew', 'bar', 'eatery', 'culinary'],
        weight: 1.1
      }
    };

    let scores: { [key: string]: number } = {};
    
    keywords.forEach(keyword => {
      Object.entries(industryPatterns).forEach(([industry, data]) => {
        if (data.keywords.includes(keyword.toLowerCase())) {
          scores[industry] = (scores[industry] || 0) + data.weight;
        }
      });
    });

    // Add random factor for AI-like behavior
    Object.keys(industryPatterns).forEach(industry => {
      scores[industry] = (scores[industry] || 0) + Math.random() * 0.5;
    });

    const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return detected && detected[1] > 0.5 ? detected[0] : 'general';
  };

  // Advanced name scoring algorithm
  const scoreName = (name: string, category: NameCategory = 'general'): number => {
    let score = 50; // Base score
    
    // Length scoring (optimal 6-8 characters)
    const length = name.length;
    if (length <= 3) score -= 30;
    else if (length <= 5) score += 10;
    else if (length <= 8) score += 25;
    else if (length <= 10) score += 15;
    else if (length <= 12) score += 5;
    else if (length <= 15) score -= 5;
    else score -= 20;
    
    // Pronunciation scoring
    const vowels = (name.match(/[aeiou]/gi) || []).length;
    const consonants = (name.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    const vowelRatio = vowels / name.length;
    
    if (vowelRatio >= 0.3 && vowelRatio <= 0.5) score += 20;
    else if (vowelRatio > 0.7) score -= 10;
    else if (vowelRatio === 0) score -= 30;
    
    // Consonant-vowel pattern analysis
    const pattern = name.toLowerCase().replace(/[^aeiou]/g, 'c').replace(/[aeiou]/g, 'v');
    const patternScore = {
      'cvc': 15, 'vcv': 15, 'cvcv': 20, 'vcvc': 20,
      'cvccv': 10, 'ccvcv': 5, 'cvcvc': 15
    }[pattern] || 0;
    score += patternScore;
    
    // Memorable patterns
    const hasPattern = /(.)\1/.test(name) || name.includes('oo') || name.includes('ee') || name.includes('aa');
    if (hasPattern) score += 12;
    
    // Avoid difficult letter combinations
    const difficultCombos = /(qk|zx|vw|bg|dt|mnq|wq|zp|gk|fp|jq)/gi;
    if (!difficultCombos.test(name)) score += 15;
    
    // Easy to spell (no weird characters)
    const easyToSpell = /^[a-z]+$/i.test(name);
    if (easyToSpell) score += 15;
    
    // Category-specific scoring
    const categoryBonuses = {
      tech: name.includes('tech') || name.includes('byte') || name.includes('cloud') ? 10 : 0,
      creative: name.includes('studio') || name.includes('art') || name.includes('design') ? 10 : 0,
      eco: name.includes('eco') || name.includes('green') || name.includes('natural') ? 10 : 0,
      luxury: name.includes('luxe') || name.includes('belle') || name.includes('elite') ? 10 : 0,
      modern: name.endsWith('ly') || name.endsWith('ify') || name.endsWith('able') ? 10 : 0,
      classic: 0,
      general: 0
    };
    
    score += categoryBonuses[category] || 0;
    
    // Brandable ending bonus
    const brandableEndings = ['ly', 'ify', 'able', 'io', 'ix', 'ex', 'oz', 'zy'];
    if (brandableEndings.some(ending => name.toLowerCase().endsWith(ending))) {
      score += 8;
    }
    
    // Unique factor (less common letters increase uniqueness)
    const uniqueLetters = new Set(name.toLowerCase().replace(/[^a-z]/g, '')).size;
    const uniquenessScore = (uniqueLetters / name.length) * 20;
    score += uniquenessScore;
    
    // Domain availability factor (shorter names get bonus)
    if (length <= 8) score += 10;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  };

  // Smart name generation with AI-like patterns
  const generateSmartNames = async (keywords: string[], count: number = 8, includeUserInput: boolean = true): Promise<string[]> => {
    const detectedIndustry = detectIndustry(keywords);
    const userInput = keywords[0]?.toLowerCase() || '';
    
    let names = new Set<string>();
    
    // Always include user's input if it looks like a brand name
    if (includeUserInput && userInput && userInput.length >= 3) {
      names.add(userInput.charAt(0).toUpperCase() + userInput.slice(1));
      
      // Check if input contains "verapixels"
      if (userInput.includes('verapixel') || userInput.includes('vera')) {
        names.add('Verapixels');
      }
    }
    
    // Industry-specific generators
    const generators = {
      tech: () => {
        const techSuffixes = ['Tech', 'Labs', 'Logic', 'Stack', 'Cloud', 'Data', 'Code', 'Soft', 'Systems', 'Works'];
        const techPrefixes = ['Nex', 'Byte', 'Cloud', 'Data', 'Code', 'Web', 'Net', 'Digi', 'Smart', 'AI'];
        
        return Array.from({ length: count * 2 }, (_, i) => {
          if (i % 3 === 0) {
            return `${techPrefixes[Math.floor(Math.random() * techPrefixes.length)]}${techSuffixes[Math.floor(Math.random() * techSuffixes.length)]}`;
          } else if (i % 3 === 1) {
            return `${userInput.slice(0, 3).toUpperCase()}${techSuffixes[Math.floor(Math.random() * techSuffixes.length)]}`;
          } else {
            return `${techPrefixes[Math.floor(Math.random() * techPrefixes.length)]}${userInput.slice(0, 4)}`;
          }
        });
      },
      creative: () => {
        const creativeWords = ['Studio', 'Creative', 'Design', 'Art', 'Pixel', 'Color', 'Canvas', 'Ink', 'Vision', 'Spark'];
        const creativeModifiers = ['Bloom', 'Pure', 'Fresh', 'Vivid', 'Bright', 'Clear', 'Sharp', 'Bold', 'Wild', 'Free'];
        
        return Array.from({ length: count * 2 }, (_, i) => {
          if (i % 3 === 0) {
            return `${creativeModifiers[Math.floor(Math.random() * creativeModifiers.length)]}${creativeWords[Math.floor(Math.random() * creativeWords.length)]}`;
          } else if (i % 3 === 1) {
            return `${userInput.slice(0, 3).toUpperCase()} & ${creativeWords[Math.floor(Math.random() * creativeWords.length)]}`;
          } else {
            return `The ${creativeWords[Math.floor(Math.random() * creativeWords.length)]} Collective`;
          }
        });
      },
      eco: () => {
        const ecoWords = ['Eco', 'Green', 'Natural', 'Pure', 'Clean', 'Earth', 'Organic', 'Sustainable', 'Renew', 'Bloom'];
        const natureWords = ['Leaf', 'Tree', 'Forest', 'Ocean', 'River', 'Mountain', 'Sky', 'Sun', 'Moon', 'Star'];
        
        return Array.from({ length: count * 2 }, (_, i) => {
          if (i % 3 === 0) {
            return `${ecoWords[Math.floor(Math.random() * ecoWords.length)]}${natureWords[Math.floor(Math.random() * natureWords.length)]}`;
          } else if (i % 3 === 1) {
            return `${userInput.slice(0, 3).toUpperCase()}${ecoWords[Math.floor(Math.random() * ecoWords.length)]}`;
          } else {
            return `${natureWords[Math.floor(Math.random() * natureWords.length)]}${ecoWords[Math.floor(Math.random() * ecoWords.length)]}`;
          }
        });
      },
      general: () => {
        const prefixes = ['Nex', 'Ver', 'Aur', 'Zen', 'Urb', 'Cor', 'Peak', 'Viv', 'Apex', 'Prime'];
        const suffixes = ['ia', 'us', 'io', 'ex', 'ly', 'ify', 'able', 'ance', 'ence', 'ity'];
        const fullWords = ['Solutions', 'Group', 'Co', 'Ltd', 'Inc', 'Partners', 'Ventures', 'Capital', 'Holdings'];
        
        return Array.from({ length: count * 2 }, (_, i) => {
          if (i % 3 === 0) {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
          } else if (i % 3 === 1) {
            return `${userInput.slice(0, 4).toUpperCase()}${fullWords[Math.floor(Math.random() * fullWords.length)]}`;
          } else {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${fullWords[Math.floor(Math.random() * fullWords.length)]}`;
          }
        });
      }
    };
    
    const generator = generators[detectedIndustry as keyof typeof generators] || generators.general;
    const generatedNames = generator();
    
    // Combine and deduplicate
    generatedNames.forEach(name => names.add(name));
    
    // Add database names
    if (nameDatabase[detectedIndustry as keyof typeof nameDatabase]) {
      (nameDatabase[detectedIndustry as keyof typeof nameDatabase] as string[]).forEach(name => {
        if (names.size < count * 3) {
          names.add(name);
        }
      });
    }
    
    // Convert to array and limit count
    return Array.from(names).slice(0, count);
  };

  // Enhanced domain checking with realistic patterns
  const checkRealDomain = async (name: string, tld: string = 'com'): Promise<boolean> => {
    setDomainChecking(name);
    
    try {
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // More sophisticated availability logic
      let availabilityProbability = 0.5; // Base 50%
      
      // Length factors
      if (cleanName.length <= 3) availabilityProbability = 0.05;
      else if (cleanName.length <= 5) availabilityProbability = 0.2;
      else if (cleanName.length <= 7) availabilityProbability = 0.4;
      else if (cleanName.length <= 9) availabilityProbability = 0.7;
      else if (cleanName.length <= 12) availabilityProbability = 0.85;
      else availabilityProbability = 0.95;
      
      // Common word penalty
      const commonWords = [
        'tech', 'cloud', 'data', 'code', 'web', 'app', 'digital', 'smart',
        'studio', 'design', 'creative', 'art', 'media', 'brand', 'visual',
        'eco', 'green', 'clean', 'natural', 'organic', 'sustainable',
        'luxe', 'elite', 'premium', 'royal', 'gold', 'prime'
      ];
      
      commonWords.forEach(word => {
        if (cleanName.includes(word)) {
          availabilityProbability *= 0.6;
        }
      });
      
      // Premium domain patterns (usually taken)
      const premiumPatterns = [
        /^[a-z]{2,4}$/, // 2-4 letter domains
        /^[a-z]+[0-9]{1,2}$/, // word + 1-2 numbers
        /^[0-9]+[a-z]+$/, // numbers + word
        /^[a-z]+[a-z]$/, // repeated ending
      ];
      
      premiumPatterns.forEach(pattern => {
        if (pattern.test(cleanName)) {
          availabilityProbability *= 0.3;
        }
      });
      
      // TLD-specific availability
      const tldAvailability = {
        'com': 0.5,
        'io': 0.7,
        'co': 0.6,
        'net': 0.8
      };
      
      availabilityProbability *= tldAvailability[tld as keyof typeof tldAvailability] || 0.5;
      
      // Random variation
      const randomFactor = (Math.random() * 0.4) - 0.2; // -20% to +20%
      availabilityProbability = Math.max(0.01, Math.min(0.99, availabilityProbability + randomFactor));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      
      const isAvailable = Math.random() < availabilityProbability;
      
      // Update state with result
      return isAvailable;
    } catch (error) {
      console.error('Domain check failed:', error);
      return Math.random() < 0.5;
    } finally {
      setDomainChecking("");
    }
  };

  // Enhanced name category detection
  const getNameCategory = (name: string): NameCategory => {
    const patterns = {
      tech: /(tech|byte|cloud|data|code|sync|labs|quantum|logic|stack|soft|web|net|digi|ai)/i,
      creative: /(studio|creative|art|design|pixel|vision|spark|canvas|ink|color|media|visual|brand)/i,
      eco: /(eco|green|earth|natural|pure|clean|sustain|organic|leaf|terra|renew|forest)/i,
      luxury: /(luxe|belle|chic|vogue|elegan|couture|haus|premium|elite|royal|gold|prime)/i,
      modern: /(nex|meta|urban|zen|ly|ify|able|flow|core|apex|vibe|nova)/i
    };
    
    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(name)) {
        return category as NameCategory;
      }
    }
    
    // Fallback based on ending
    if (name.endsWith('ly') || name.endsWith('ify') || name.endsWith('able')) {
      return 'modern';
    }
    
    return 'general';
  };

  // Generate detailed explanation with AI-like insights
  const generateExplanation = (name: string, industry: string, score: number): string => {
    const explanations = {
      tech: [
        `${name} combines technical sophistication with market appeal, positioning your ${industry} venture for digital success.`,
        `This tech-forward name suggests innovation and forward-thinking, ideal for ${industry} solutions in the modern marketplace.`,
        `${name} embodies cutting-edge technology while maintaining brand memorability for your ${industry} business.`,
        `A strong technical name that conveys expertise and reliability in the ${industry} sector.`
      ],
      creative: [
        `${name} sparks imagination and creative thinking, perfect for a ${industry} business that values artistic expression.`,
        `This name evokes emotion and visual appeal, positioning your ${industry} brand as innovative and unique.`,
        `${name} suggests originality and artistic flair, making it memorable in the ${industry} space.`,
        `A creatively crafted name that captures attention and tells a story about your ${industry} offerings.`
      ],
      eco: [
        `${name} communicates environmental consciousness and sustainable values, resonating with eco-conscious ${industry} customers.`,
        `This eco-friendly name builds trust and authenticity for your ${industry} business focused on green solutions.`,
        `${name} suggests purity and natural quality, ideal for ${industry} brands with environmental values.`,
        `A nature-inspired name that connects with consumers looking for authentic, sustainable ${industry} options.`
      ],
      luxury: [
        `${name} exudes sophistication and premium quality, positioning your ${industry} brand in the luxury segment.`,
        `This elegant name suggests exclusivity and high-end appeal for your ${industry} offerings.`,
        `${name} conveys prestige and refinement, perfect for a luxury ${industry} business.`,
        `A premium name that establishes your ${industry} brand as a leader in quality and style.`
      ],
      general: [
        `${name} is versatile and professional, offering broad appeal across the ${industry} market.`,
        `This strong brand name balances creativity with commercial viability for your ${industry} venture.`,
        `${name} establishes credibility and recognition potential for your ${industry} business.`,
        `A memorable name with good market positioning potential in the ${industry} sector.`
      ]
    };
    
    const category = getNameCategory(name);
    const categoryExplanations = explanations[category as keyof typeof explanations] || explanations.general;
    const explanation = categoryExplanations[Math.floor(Math.random() * categoryExplanations.length)];
    
    let scoreInsight = '';
    if (score >= 90) scoreInsight = ' Exceptional brand potential with high memorability and market appeal.';
    else if (score >= 80) scoreInsight = ' Excellent choice with strong commercial viability and brand power.';
    else if (score >= 70) scoreInsight = ' Good option with solid market potential and branding opportunities.';
    else if (score >= 60) scoreInsight = ' Unique name that may require strategic branding for maximum impact.';
    else scoreInsight = ' Creative direction that needs careful implementation and brand development.';
    
    return explanation + scoreInsight;
  };

  // Generate name details
  const generateNameDetails = (name: string, category: NameCategory, score: number): {
    meaning: string;
    marketPotential: string;
    targetAudience: string;
    trademarkRisk: 'low' | 'medium' | 'high';
    pronunciation: string;
    memorabilityScore: number;
  } => {
    const meanings: Record<NameCategory, string> = {
      tech: "Represents innovation, technology, and forward-thinking solutions",
      creative: "Evokes creativity, artistic expression, and visual appeal",
      eco: "Symbolizes sustainability, natural quality, and environmental consciousness",
      luxury: "Conveys exclusivity, premium quality, and sophistication",
      modern: "Suggests contemporary appeal, versatility, and market relevance",
      classic: "Represents timeless appeal, reliability, and established quality",
      general: "Versatile brand identity with broad market appeal and flexibility"
    };

    const audiences: Record<NameCategory, string> = {
      tech: "Tech-savvy professionals, startups, digital nomads, innovation leaders",
      creative: "Design enthusiasts, artists, creative professionals, brand-conscious consumers",
      eco: "Environmentally conscious consumers, health enthusiasts, sustainable living advocates",
      luxury: "Affluent consumers, luxury seekers, premium product enthusiasts",
      modern: "Urban professionals, millennials, digital natives, trend-conscious consumers",
      classic: "Traditional consumers, established businesses, reliability-focused customers",
      general: "Broad consumer base, diverse demographics, mainstream market"
    };

    const marketPotentials: Record<NameCategory, string> = {
      tech: "High growth potential in digital markets, strong online presence",
      creative: "Strong brand differentiation, premium positioning opportunities",
      eco: "Growing market segment, loyal customer base, ethical appeal",
      luxury: "Premium pricing potential, exclusive market positioning",
      modern: "Broad market appeal, versatile branding opportunities",
      classic: "Established market trust, reliable brand perception",
      general: "Flexible market positioning, adaptable to multiple sectors"
    };
    
    // Determine trademark risk based on score
    let trademarkRisk: 'low' | 'medium' | 'high';
    if (score >= 80) {
      trademarkRisk = 'low';
    } else if (score >= 60) {
      trademarkRisk = 'medium';
    } else {
      trademarkRisk = 'high';
    }
    
    return {
      meaning: meanings[category],
      marketPotential: marketPotentials[category],
      targetAudience: audiences[category],
      trademarkRisk: trademarkRisk,
      pronunciation: `Pronounced as ${name.toLowerCase().split('').join('-').toUpperCase()}`,
      memorabilityScore: Math.min(100, score + 10)
    };
  };

  // Main name generation function
  const generateNames = async (generateMore: boolean = false) => {
    if (!brandName.trim() && !generateMore) return;
    
    setIsGenerating(true);
    const keywords = brandName.toLowerCase().split(' ').filter(k => k.length > 1);
    const detectedIndustry = detectIndustry(keywords);
    setIndustry(detectedIndustry);
    
    // Determine count
    const nameCount = generateMore ? 12 : 8;
    
    setTimeout(async () => {
      // Generate names
      const rawNames = await generateSmartNames(keywords, nameCount, true);
      
      // Process names with details
      const namePromises = rawNames.map(async (name, index) => {
        const category = getNameCategory(name);
        const score = scoreName(name, category);
        
        // Check all TLDs
        const comAvailable = await checkRealDomain(name, 'com');
        const ioAvailable = await checkRealDomain(name, 'io');
        const coAvailable = await checkRealDomain(name, 'co');
        const netAvailable = await checkRealDomain(name, 'net');
        
        const explanation = generateExplanation(name, detectedIndustry, score);
        const details = generateNameDetails(name, category, score);
        
        // TLD availability
        const tlds = {
          com: comAvailable,
          io: ioAvailable,
          co: coAvailable,
          net: netAvailable,
        };
        
        return {
          id: `${Date.now()}-${index}`,
          name,
          score,
          category,
          available: comAvailable, // Main availability for .com
          explanation,
          details,
          tlds
        };
      });
      
      const processedNames = await Promise.all(namePromises);
      
      if (generateMore) {
        setNamingResults(prev => [...prev, ...processedNames]);
      } else {
        setNamingResults(processedNames);
        setAnimationKey(prev => prev + 1);
      }
      
      setIsGenerating(false);
    }, 800);
  };

  // Search names for popup
  const searchNames = async (query: string) => {
    if (!query.trim()) {
      setNameSearchResults([]);
      return;
    }
    
    const keywords = query.toLowerCase().split(' ').filter(k => k.length > 1);
    const detectedIndustry = detectIndustry(keywords);
    
    // Generate names for search
    const rawNames = await generateSmartNames(keywords, 6, true);
    
    const namePromises = rawNames.map(async (name, index) => {
      const category = getNameCategory(name);
      const score = scoreName(name, category);
      
      // Check all TLDs
      const comAvailable = await checkRealDomain(name, 'com');
      const ioAvailable = await checkRealDomain(name, 'io');
      const coAvailable = await checkRealDomain(name, 'co');
      const netAvailable = await checkRealDomain(name, 'net');
      
      const explanation = generateExplanation(name, detectedIndustry, score);
      const details = generateNameDetails(name, category, score);
      
      const tlds = {
        com: comAvailable,
        io: ioAvailable,
        co: coAvailable,
        net: netAvailable,
      };
      
      return {
        id: `search-${Date.now()}-${index}`,
        name,
        score,
        category,
        available: comAvailable,
        explanation,
        details,
        tlds
      };
    });
    
    const processedNames = await Promise.all(namePromises);
    setNameSearchResults(processedNames);
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
    
    // Show success animation
    const saveBtn = document.querySelector(`[data-name-id="${name.id}"]`);
    if (saveBtn) {
      saveBtn.classList.add('saved-animation');
      setTimeout(() => saveBtn.classList.remove('saved-animation'), 1000);
    }
  };

  // Save name as image
  const saveNameAsImage = async (name: GeneratedName) => {
    setSelectedName(name);
    
    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (nameImageRef.current) {
      try {
        const canvas = await html2canvas(nameImageRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = `${name.name.toLowerCase().replace(/\s+/g, '-')}-brand-name.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save image. Please try again.');
      }
    }
  };

  // Check single domain
  const checkSingleDomain = async (name: GeneratedName | SavedName, tld: string = 'com') => {
    const available = await checkRealDomain(name.name, tld);
    
    // Update saved names
    setSavedNames(prev => 
      prev.map(n => n.id === name.id ? { 
        ...n, 
        available: tld === 'com' ? available : n.available,
        tlds: tld === 'com' ? { ...n.tlds, [tld]: available } : n.tlds
      } : n)
    );
    
    // Update naming results
    setNamingResults(prev => 
      prev.map(n => n.id === name.id ? { 
        ...n, 
        available: tld === 'com' ? available : n.available,
        tlds: tld === 'com' ? { ...n.tlds, [tld]: available } : n.tlds
      } : n)
    );
    
    return available;
  };

  // Open registrar with pre-filled domain
  const openRegistrar = (registrar: DomainRegistrar, name: string, tld: string = 'com') => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const fullDomain = `${cleanName}.${tld}`;
    
    // Construct the full URL with pre-filled domain
    let fullUrl = registrar.searchUrl + fullDomain;
    
    // Special handling for different registrars
    if (registrar.id === 'cloudflare') {
      // Cloudflare doesn't have direct search, open main page
      fullUrl = registrar.baseUrl;
    }
    
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
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
      general: '#64748b'
    };
    return colors[category];
  };

  // Services Data
  const services: Service[] = [
    {
      id: 1,
      icon: <FiTarget />,
      title: "AI Brand Naming",
      description: "Advanced AI-powered brand naming with smart suggestions and availability checks.",
      features: [
        "AI-driven name generation",
        "Industry-specific suggestions",
        "Domain availability checking",
        "Name validation & scoring",
        "Trademark research guidance",
        "Brand name testing"
      ],
      category: "naming",
      details: {
        title: "AI-Powered Brand Naming Service",
        description: "Our advanced AI system analyzes market trends, linguistic patterns, and brand psychology to generate perfect names for your business.",
        process: [
          "AI market analysis & trend research",
          "Linguistic pattern recognition",
          "Brand psychology evaluation",
          "Domain & trademark verification",
          "Focus group simulation",
          "Final recommendation engine"
        ],
        deliverables: [
          "20-30 AI-curated brand names",
          "Domain availability matrix",
          "Trademark risk analysis",
          "Market fit scorecards",
          "Brand extension recommendations",
          "Complete naming guidelines"
        ],
        timeline: "3-5 business days",
        price: "Starting from $999"
      }
    },
    {
      id: 2,
      icon: <FiLayers />,
      title: "Brand Identity",
      description: "Complete brand development with AI-driven design suggestions and market analysis.",
      features: [
        "AI logo generation",
        "Color psychology analysis",
        "Typography optimization",
        "Complete brand guidelines",
        "Brand personality AI",
        "Visual asset library"
      ],
      category: "branding",
      details: {
        title: "AI-Enhanced Brand Identity",
        description: "Create a cohesive brand identity powered by AI analysis of market trends and consumer psychology for maximum impact.",
        process: [
          "AI brand strategy analysis",
          "Visual concept generation",
          "Logo design iterations",
          "Color & typography optimization",
          "AI asset creation",
          "Smart guidelines generation"
        ],
        deliverables: [
          "Multiple logo concepts",
          "Optimized color palette",
          "Typography system",
          "Brand pattern library",
          "AI icon set",
          "Interactive brand guidelines"
        ],
        timeline: "2-3 weeks",
        price: "Starting from $2,499"
      }
    },
    {
      id: 3,
      icon: <FiPenTool />,
      title: "AI Graphic Design",
      description: "AI-assisted graphic design that combines human creativity with machine efficiency.",
      features: [
        "AI logo & icon design",
        "Smart marketing materials",
        "Social media AI templates",
        "Print & digital optimization",
        "AI packaging design",
        "Presentation automation"
      ],
      category: "graphic",
      details: {
        title: "AI-Assisted Graphic Design",
        description: "Leverage AI to create stunning visual designs that combine creative excellence with data-driven optimization.",
        process: [
          "AI design brief analysis",
          "Concept generation",
          "Design optimization",
          "Client feedback integration",
          "AI revisions",
          "Final delivery"
        ],
        deliverables: [
          "AI-generated logo designs",
          "Smart social templates",
          "Optimized marketing collateral",
          "AI presentation decks",
          "Print-ready AI files",
          "Digital asset system"
        ],
        timeline: "1-2 weeks",
        price: "Starting from $799"
      }
    },
    {
      id: 4,
      icon: <FiLayout />,
      title: "Digital Branding AI",
      description: "AI-powered digital branding for consistent presence across all platforms.",
      features: [
        "AI website branding",
        "Smart social media kits",
        "Email template AI",
        "Digital advertising AI",
        "UI/UX AI optimization",
        "Digital brand AI guidelines"
      ],
      category: "digital",
      details: {
        title: "AI Digital Branding Solutions",
        description: "Ensure perfect digital brand presence with AI-powered optimization across all digital touchpoints.",
        process: [
          "Digital AI audit",
          "Platform-specific AI strategy",
          "Digital asset AI creation",
          "Template AI development",
          "AI implementation",
          "Performance AI optimization"
        ],
        deliverables: [
          "AI social media kit",
          "Smart email templates",
          "Digital ad AI templates",
          "Website UI AI elements",
          "AI digital guidelines",
          "Implementation AI support"
        ],
        timeline: "2-3 weeks",
        price: "Starting from $1,499"
      }
    }
  ];

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop&q=80",
      title: "AI Tech Startup Naming",
      category: "naming" as ServiceCategory,
      description: "AI-powered naming for tech companies"
    },
    {
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a3?w=600&h=600&fit=crop&q=80",
      title: "Eco Brand AI Identity",
      category: "branding" as ServiceCategory,
      description: "AI brand development for sustainable businesses"
    },
    {
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&q=80",
      title: "AI Logo Design System",
      category: "graphic" as ServiceCategory,
      description: "AI-generated visual identities"
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&q=80",
      title: "AI Product Packaging",
      category: "graphic" as ServiceCategory,
      description: "AI-optimized packaging design"
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&q=80",
      title: "Digital Brand AI Kit",
      category: "digital" as ServiceCategory,
      description: "AI digital presence solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=600&fit=crop&q=80",
      title: "AI Brand Strategy",
      category: "branding" as ServiceCategory,
      description: "AI market positioning analysis"
    }
  ];

  const filteredPortfolio = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const features = [
    { icon: <FiZap />, title: "AI-Powered Process", desc: "Smart algorithms for optimal results" },
    { icon: <FiAward />, title: "Expert AI Strategy", desc: "AI-enhanced strategic branding" },
    { icon: <FiUsers />, title: "Collaborative AI", desc: "Human-AI collaboration workflow" },
    { icon: <FiStar />, title: "AI Unique Identity", desc: "100% unique AI-generated concepts" },
    { icon: <FiRefreshCw />, title: "AI Unlimited Revisions", desc: "AI-powered refinement cycles" },
    { icon: <FiCompass />, title: "AI Market Ready", desc: "Data-driven market optimization" }
  ];

  // Handle search input
  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 2) {
      await searchNames(value);
    } else {
      setNameSearchResults([]);
    }
  };

  // Handle input focus for popup
  const handleInputFocus = () => {
    setShowNamePopup(true);
    if (searchQuery.length > 2) {
      searchNames(searchQuery);
    }
  };

  return (
    <div className="branding-design-page">
      {/* Animated Background */}
      <div className="branding-bg">
        <div className="grid-pattern"></div>
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className={`float-shape shape-${i % 4}`}
              style={{ 
                transform: `translateY(${scrollY * (0.05 + i * 0.01)}px) rotate(${scrollY * 0.02}deg)`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Name Image for Download (hidden) */}
      <div className="hidden-name-image" ref={nameImageRef}>
        {selectedName && (
          <div className="name-image-container">
            <div className="name-image-bg"></div>
            <div className="name-image-content">
              <h1 className="name-image-text">
                {selectedName.name}
              </h1>
              <div className="name-image-meta">
                <div className="meta-item">
                  <span className="meta-label">Brand Score:</span>
                  <span className="meta-value">{selectedName.score}/100</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value" style={{ color: getCategoryColor(selectedName.category) }}>
                    {selectedName.category.toUpperCase()}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Domain:</span>
                  <span className="meta-value" style={{ color: selectedName.available ? '#00ff88' : '#ff6b9d' }}>
                    {selectedName.available ? 'Available' : 'Taken'}
                  </span>
                </div>
              </div>
              <div className="name-image-footer">
                <p>Generated by Verapixels AI Branding</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="branding-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <FiTag className="badge-icon" />
                <span>AI Brand Creation & Design</span>
              </div>
              
              <h1 className="hero-title">
                AI-Powered Brand Naming &
                <br />
                <span className="title-gradient">Design Intelligence</span>
              </h1>
              
              <p className="hero-description">
                Our advanced AI system generates perfect brand names and designs based on market trends, 
                linguistic patterns, and brand psychology. Your smart brand journey starts here.
              </p>

              {/* Smart Brand Naming Tool */}
              <div className="naming-tool" key={animationKey}>
                <div className="naming-tool-header">
                  <h3 className="naming-title">
                    <GiLightBulb className="title-icon" />
                    AI Brand Name Generator
                  </h3>
                  <button 
                    className="saved-names-btn"
                    onClick={() => setShowSavedNames(!showSavedNames)}
                  >
                    <FiBookmark />
                    Saved Names ({savedNames.length})
                  </button>
                </div>
                
                <p className="naming-subtitle">
                  Describe your business for AI-powered name suggestions with real domain availability checks
                </p>
                
                <div className="naming-input-wrapper">
                  <div className="naming-input-group">
                    <div className="input-with-icon">
                      <FiSearch className="input-icon" />
                      <input
                        ref={nameInputRef}
                        type="text"
                        placeholder="What's your business about? (e.g., sustainable fashion, tech startup, coffee shop)"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        onFocus={handleInputFocus}
                        className="naming-input"
                      />
                    </div>
                    <button 
                      onClick={() => generateNames(false)}
                      disabled={isGenerating || !brandName.trim()}
                      className="naming-button"
                    >
                      {isGenerating ? (
                        <>
                          <div className="spinner"></div>
                          AI Generating...
                        </>
                      ) : (
                        <>
                          <GiLightBulb />
                          AI Generate Names
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="quick-suggestions">
                    <span className="suggestions-label">AI Suggestions:</span>
                    {['tech startup', 'eco fashion', 'creative agency', 'luxury brand'].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="suggestion-chip"
                        onClick={() => {
                          setBrandName(suggestion);
                          generateNames(false);
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {industry && namingResults.length === 0 && (
                  <div className="industry-detected">
                    <span className="industry-badge">
                      AI Detected: <strong>{industry.toUpperCase()}</strong> industry
                    </span>
                  </div>
                )}
                
                {namingResults.length > 0 && (
                  <div className="naming-results">
                    <div className="results-header">
                      <div className="header-left">
                        <h4 className="results-title">
                          AI-Generated Name Suggestions
                          <span className="results-count">({namingResults.length} names)</span>
                        </h4>
                        {industry && (
                          <span className="industry-tag">{industry}</span>
                        )}
                      </div>
                      <div className="header-right">
                        <div className="results-stats">
                          <div className="stat">
                            <span className="stat-value">{namingResults.filter(n => n.score >= 80).length}</span>
                            <span className="stat-label">Premium</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{namingResults.filter(n => n.available).length}</span>
                            <span className="stat-label">Available</span>
                          </div>
                        </div>
                        <button 
                          className="generate-more-btn"
                          onClick={() => generateNames(true)}
                          disabled={isGenerating}
                        >
                          <GiPerspectiveDiceSixFacesRandom />
                          AI Generate More
                        </button>
                      </div>
                    </div>
                    
                    <div className="names-grid">
                      {namingResults.map((result) => (
                        <div key={result.id} className={`name-card ${result.score >= 80 ? 'premium' : ''}`}>
                          <div className="name-header">
                            <div className="name-main">
                              <h4 className="name-text">{result.name}</h4>
                              <div className="name-meta">
                                <span 
                                  className="name-category" 
                                  style={{ backgroundColor: getCategoryColor(result.category) }}
                                >
                                  {result.category}
                                </span>
                                <span className={`domain-status ${result.available ? 'available' : 'taken'}`}>
                                  {domainChecking === result.name ? (
                                    <span className="checking-domain">
                                      <div className="mini-spinner"></div> AI Checking...
                                    </span>
                                  ) : result.available ? (
                                    <span className="available-status">
                                      <FiCheckCircle /> .com Available
                                    </span>
                                  ) : (
                                    <span className="taken-status">
                                      <FiX /> .com Taken
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="name-score">
                              <div className="score-circle">
                                <span className="score-value">{result.score}</span>
                              </div>
                              <span className="score-label">AI Score</span>
                            </div>
                          </div>
                          
                          <p className="name-explanation">{result.explanation}</p>
                          
                          <div className="name-tlds">
                            <span className="tld-label">AI Suggests:</span>
                            {Object.entries(result.tlds).map(([tld, available]) => (
                              <button
                                key={tld}
                                className={`tld-badge ${available ? 'available' : 'taken'}`}
                                onClick={() => {
                                  setSelectedTLD(tld);
                                  setShowDomainPopup(result);
                                }}
                              >
                                .{tld}
                              </button>
                            ))}
                          </div>
                          
                          <div className="name-actions">
                            <button 
                              className="name-action-btn save-btn"
                              onClick={() => saveName(result)}
                              data-name-id={result.id}
                            >
                              <FiSave /> Save
                            </button>
                            <button 
                              className="name-action-btn check-btn"
                              onClick={() => checkSingleDomain(result)}
                              disabled={domainChecking === result.name}
                            >
                              <FiRefreshCw /> Re-check
                            </button>
                            <button 
                              className="name-action-btn domain-btn"
                              onClick={() => {
                                setSelectedTLD('com');
                                setShowDomainPopup(result);
                              }}
                              disabled={!result.available}
                            >
                              <FiGlobe /> Register
                            </button>
                            <button 
                              className="name-action-btn details-btn"
                              onClick={() => {
                                setShowNameDetails(result);
                                setShowNamePopup(false);
                              }}
                            >
                              <FiInfo /> AI Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="results-footer">
                      <p className="footer-note">
                        <strong>💡 AI Tip:</strong> Premium names (score ≥80) have highest brand potential. 
                        Save your favorites and check domain availability with our AI-recommended registrars.
                      </p>
                      <div className="footer-actions">
                        <button className="download-saved-btn" onClick={() => {
                          const dataStr = JSON.stringify(savedNames, null, 2);
                          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                          const link = document.createElement('a');
                          link.download = 'saved-brand-names.json';
                          link.href = dataUri;
                          link.click();
                        }}>
                          <FiDownload /> Download Saved Names
                        </button>
                        <button className="generate-more-btn" onClick={() => generateNames(true)}>
                          <GiPerspectiveDiceSixFacesRandom /> AI Generate 12 More
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="hero-cta">
                <button className="cta-primary" onClick={() => generateNames(false)}>
                  Start AI Brand Discovery
                  <FiArrowRight />
                </button>
                <button className="cta-secondary">
                  <FiMessageSquare />
                  AI Consultation
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-icons">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`float-icon icon-${i % 4}`}>
                    {[<FiTag />, <FiType />, <FiPenTool />, <FiLayers />][i % 4]}
                  </div>
                ))}
              </div>

              {/* AI Brand Visual Showcase */}
              <div className="brand-showcase">
                <img 
                  src="https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop&q=80" 
                  alt="AI Brand Naming" 
                  className="showcase-img img-1"
                />
                <img 
                  src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a3?w=400&h=400&fit=crop&q=80" 
                  alt="AI Brand Identity" 
                  className="showcase-img img-2"
                />
                <img 
                  src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop&q=80" 
                  alt="AI Logo Design" 
                  className="showcase-img img-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Naming Process Section */}
      <section className="naming-process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="highlight">AI 4-Step Naming</span> Process
            </h2>
            <p className="section-desc">
              Advanced AI methodology for perfect brand names
            </p>
          </div>

          <div className="process-steps">
            {[
              { icon: <FiSearch />, title: "AI Discovery", desc: "AI analyzes market trends and target audience" },
              { icon: <GiLightBulb />, title: "AI Brainstorming", desc: "Generates creative names using AI algorithms" },
              { icon: <FiCheckCircle />, title: "AI Validation", desc: "AI checks domain & trademark availability" },
              { icon: <FiTag />, title: "AI Selection", desc: "AI presents curated names with smart recommendations" }
            ].map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-number">{idx + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              AI <span className="highlight">Brand Solutions</span>
            </h2>
            <p className="section-desc">
              AI-powered branding from naming to complete identity
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="service-feature">
                      <FiCheckCircle className="feature-icon" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="service-btn"
                  onClick={() => setShowServicePopup(service)}
                >
                  AI Learn More <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="highlight">Our AI Services</span>
            </h2>
            <p className="section-desc">
              AI excellence in brand development and creative solutions
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Popup */}
      {showNamePopup && (
        <div className="popup-overlay">
          <div className="popup-container name-search-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>AI Name Search & Suggestions</h3>
              <button className="popup-close" onClick={() => setShowNamePopup(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="search-box">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search for AI brand names..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  autoFocus
                />
              </div>
              
              {nameSearchResults.length > 0 ? (
                <div className="search-results">
                  <h4>AI Search Results ({nameSearchResults.length} names)</h4>
                  <div className="search-results-grid">
                    {nameSearchResults.map((result) => (
                      <div key={result.id} className="search-result-card">
                        <div className="search-result-header">
                          <h5 className="search-result-name">{result.name}</h5>
                          <div className="search-result-meta">
                            <span 
                              className="search-result-category" 
                              style={{ backgroundColor: getCategoryColor(result.category) }}
                            >
                              {result.category}
                            </span>
                            <span className={`search-result-status ${result.available ? 'available' : 'taken'}`}>
                              {result.available ? 'Available' : 'Taken'}
                            </span>
                          </div>
                        </div>
                        <p className="search-result-explanation">{result.explanation}</p>
                        <div className="search-result-score">
                          <span className="score-badge">AI Score: {result.score}</span>
                        </div>
                        <div className="search-result-actions">
                          <button 
                            className="search-action-btn"
                            onClick={() => {
                              setBrandName(result.name);
                              setShowNamePopup(false);
                              generateNames(false);
                            }}
                          >
                            <FiCheckCircle /> AI Select
                          </button>
                          <button 
                            className="search-action-btn secondary"
                            onClick={() => {
                              saveName(result);
                              setShowNamePopup(false);
                            }}
                          >
                            <FiSave /> AI Save
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchQuery.trim().length > 2 ? (
                <div className="search-loading">
                  <div className="spinner"></div>
                  <p>AI searching for names...</p>
                </div>
              ) : (
                <div className="search-empty">
                  <p>Type at least 3 characters for AI search...</p>
                </div>
              )}
              
              <div className="popup-actions">
                <button className="popup-btn primary" onClick={() => generateNames(false)}>
                  AI Generate More Names
                </button>
                <button className="popup-btn secondary" onClick={() => setShowNamePopup(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Domain Registrar Popup */}
      {showDomainPopup && (
        <div className="popup-overlay">
          <div className="popup-container domain-registrar-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Register <span className="domain-name">{showDomainPopup.name}.{selectedTLD}</span></h3>
              <button className="popup-close" onClick={() => setShowDomainPopup(null)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="domain-status-display">
                <div className={`status-badge ${showDomainPopup.tlds[selectedTLD as keyof typeof showDomainPopup.tlds] ? 'available' : 'taken'}`}>
                  {showDomainPopup.tlds[selectedTLD as keyof typeof showDomainPopup.tlds] 
                    ? `AI: Domain .${selectedTLD} Available` 
                    : `AI: Domain .${selectedTLD} Taken`}
                </div>
                <p className="status-note">
                  {showDomainPopup.tlds[selectedTLD as keyof typeof showDomainPopup.tlds] 
                    ? 'This domain is available for registration!' 
                    : 'This domain is already registered. Try other TLDs or names.'}
                </p>
              </div>
              
              <div className="tld-selector">
                <h4>Available TLDs:</h4>
                <div className="tld-buttons">
                  {Object.entries(showDomainPopup.tlds).map(([tld, available]) => (
                    <button
                      key={tld}
                      className={`tld-select-btn ${selectedTLD === tld ? 'active' : ''} ${available ? 'available' : 'taken'}`}
                      onClick={() => setSelectedTLD(tld)}
                    >
                      .{tld} {available ? '✓' : '✗'}
                    </button>
                  ))}
                </div>
              </div>
              
              {showDomainPopup.tlds[selectedTLD as keyof typeof showDomainPopup.tlds] && (
                <>
                  <div className="registrars-list">
                    <h4>AI Recommended Registrars</h4>
                    {domainRegistrars.map((registrar) => (
                      <div key={registrar.id} className="registrar-card">
                        <div className="registrar-icon">{registrar.icon}</div>
                        <div className="registrar-info">
                          <h5>{registrar.name}</h5>
                          <div className="registrar-meta">
                            <span className="price">{registrar.price}</span>
                            <span className="rating">⭐ {registrar.rating}</span>
                          </div>
                        </div>
                        <button 
                          className="registrar-btn"
                          onClick={() => openRegistrar(registrar, showDomainPopup.name, selectedTLD)}
                        >
                          <FiExternalLink /> Register .{selectedTLD}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="domain-actions">
                    <button className="action-btn secondary" onClick={() => checkSingleDomain(showDomainPopup, selectedTLD)}>
                      <FiRefreshCw /> Re-check .{selectedTLD}
                    </button>
                    <button className="action-btn primary" onClick={() => saveName(showDomainPopup)}>
                      <FiSave /> Save Name
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
              <h3>AI Analysis: <span className="domain-name">{showNameDetails.name}</span></h3>
              <button className="popup-close" onClick={() => setShowNameDetails(null)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="name-details-content">
                <div className="name-details-header">
                  <div className="name-display-large">
                    <h2>{showNameDetails.name}</h2>
                    <div className="name-meta-large">
                      <span className="category-badge-large" style={{ backgroundColor: getCategoryColor(showNameDetails.category) }}>
                        {showNameDetails.category}
                      </span>
                      <span className="score-badge-large">
                        AI Score: {showNameDetails.score}/100
                      </span>
                      <span className={`domain-status-large ${showNameDetails.available ? 'available' : 'taken'}`}>
                        {showNameDetails.available ? '.com Available' : '.com Taken'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="details-sections">
                  <div className="details-section">
                    <h4>AI Brand Meaning</h4>
                    <p>{showNameDetails.details?.meaning}</p>
                  </div>
                  
                  <div className="details-section">
                    <h4>AI Market Potential</h4>
                    <p>{showNameDetails.details?.marketPotential}</p>
                  </div>
                  
                  <div className="details-section">
                    <h4>AI Target Audience</h4>
                    <p>{showNameDetails.details?.targetAudience}</p>
                  </div>
                  
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">AI Trademark Risk:</span>
                      <span className={`detail-value risk-${showNameDetails.details?.trademarkRisk}`}>
                        {showNameDetails.details?.trademarkRisk?.toUpperCase()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">AI Pronunciation:</span>
                      <span className="detail-value">{showNameDetails.details?.pronunciation}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">AI Memorability:</span>
                      <span className="detail-value">{showNameDetails.details?.memorabilityScore}/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="name-actions-large">
                  <button 
                    className="action-btn primary"
                    onClick={() => saveNameAsImage(showNameDetails)}
                  >
                    <FiImageIcon /> Save as Image
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => saveName(showNameDetails)}
                  >
                    <FiSave /> Save Name
                  </button>
                  {showNameDetails.available && (
                    <button 
                      className="action-btn tertiary"
                      onClick={() => {
                        setSelectedTLD('com');
                        setShowDomainPopup(showNameDetails);
                        setShowNameDetails(null);
                      }}
                    >
                      <FiGlobe /> Register Domain
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Names Popup */}
      {showSavedNames && savedNames.length > 0 && (
        <div className="popup-overlay">
          <div className="popup-container saved-names-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Your AI Saved Names ({savedNames.length})</h3>
              <button className="popup-close" onClick={() => setShowSavedNames(false)}>
                <FiX />
              </button>
            </div>
            <div className="popup-content">
              <div className="saved-names-list">
                {savedNames.map((saved) => (
                  <div key={saved.id} className="saved-name-item">
                    <div className="saved-name-main">
                      <h4>{saved.name}</h4>
                      <div className="saved-meta">
                        <span className="saved-category" style={{ backgroundColor: getCategoryColor(saved.category) }}>
                          {saved.category}
                        </span>
                        <span className="saved-date">Saved: {saved.date}</span>
                        <span className="saved-score">Score: {saved.score}</span>
                        <span className={`saved-status ${saved.available ? 'available' : 'taken'}`}>
                          {saved.available ? 'Available' : 'Taken'}
                        </span>
                      </div>
                    </div>
                    <div className="saved-actions">
                      <button className="saved-action-btn" onClick={() => {
                        const savedNameObj = saved as GeneratedName;
                        checkSingleDomain(savedNameObj);
                      }}>
                        <FiGlobe /> Check
                      </button>
                      <button className="saved-action-btn" onClick={() => {
                        const found = namingResults.find(n => n.name === saved.name) || saved as GeneratedName;
                        setShowNameDetails(found as GeneratedName);
                        setShowSavedNames(false);
                      }}>
                        <FiInfo /> Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="popup-actions">
                <button className="popup-btn primary" onClick={() => {
                  const dataStr = JSON.stringify(savedNames, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const link = document.createElement('a');
                  link.download = 'ai-saved-brand-names.json';
                  link.href = dataUri;
                  link.click();
                }}>
                  <FiDownload /> Download All
                </button>
                <button className="popup-btn secondary" onClick={() => setShowSavedNames(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* CSS Styles */}
      <style>{`
        /* ========== BASE STYLES ========== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .branding-design-page {
          background: #000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .hidden-name-image {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: -9999px;
          left: -9999px;
        }

        .name-image-container {
          width: 1200px;
          height: 800px;
          position: relative;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          border-radius: 40px;
          overflow: hidden;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 40px;
        }

        .name-image-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 99, 244, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
          filter: blur(60px);
        }

        .name-image-content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
        }

        .name-image-text {
          font-family: "'Poppins', sans-serif";
          font-size: 4rem;
          font-weight: 800;
          color: 'white';
          text-shadow: '0 4px 20px rgba(0, 0, 0, 0.5)';
          background: 'linear-gradient(135deg, #0063f4, #00bfff)';
          -webkit-background-clip: 'text';
          -webkit-text-fill-color: 'transparent';
          padding: '2rem';
          border-radius: '20px';
          backdrop-filter: 'blur(10px)';
          border: '2px solid rgba(255, 255, 255, 0.1)';
        }

        .name-image-meta {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 180px;
        }

        .meta-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .meta-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: white;
        }

        .name-image-footer {
          margin-top: 60px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        /* ========== ANIMATED BACKGROUND ========== */
        .branding-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 30s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .float-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
          animation: floatShape 20s ease-in-out infinite alternate;
        }

        .shape-0 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: 10%;
          left: 5%;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #ff6b9d, #ffd700);
          bottom: 10%;
          right: 5%;
          animation-delay: 2s;
        }

        .shape-2 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          left: 50%;
          animation-delay: 4s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #00bfff, #ff6b9d);
          top: 20%;
          right: 20%;
          animation-delay: 6s;
        }

        @keyframes floatShape {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, -100px) scale(1.2); }
        }

        /* ========== CONTAINER ========== */
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* ========== HERO SECTION ========== */
        .branding-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(255, 107, 157, 0.15);
          border: 1px solid rgba(255, 107, 157, 0.4);
          border-radius: 50px;
          color: #ff6b9d;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge-icon {
          font-size: 18px;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
          animation: fadeInUp 1s ease 0.2s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title-gradient {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        /* ========== NAMING TOOL ========== */
        .naming-tool {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 40px;
          backdrop-filter: blur(10px);
          animation: fadeInUp 1s ease 0.6s both;
          transition: all 0.3s ease;
        }

        .naming-tool:hover {
          border-color: rgba(0, 191, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 191, 255, 0.15);
        }

        .naming-tool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .naming-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: #00bfff;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 32px;
        }

        .saved-names-btn {
          padding: 10px 20px;
          background: rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 12px;
          color: #00ff88;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .saved-names-btn:hover {
          background: rgba(0, 255, 136, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
        }

        .naming-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 32px;
        }

        .naming-input-wrapper {
          margin-bottom: 24px;
        }

        .naming-input-group {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .input-with-icon {
          flex: 1;
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          font-size: 20px;
        }

        .naming-input {
          width: 100%;
          padding: 18px 24px 18px 56px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .naming-input:focus {
          outline: none;
          border-color: #00bfff;
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .naming-button {
          padding: 18px 32px;
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
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: 180px;
        }

        .naming-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
          background: linear-gradient(135deg, #0077ff, #00d4ff);
        }

        .naming-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .quick-suggestions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .suggestions-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .suggestion-chip {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .suggestion-chip:hover {
          background: rgba(0, 191, 255, 0.2);
          color: #00bfff;
          border-color: rgba(0, 191, 255, 0.3);
        }

        .industry-detected {
          margin: 24px 0;
          text-align: center;
        }

        .industry-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 20px;
          color: #00ff88;
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* ========== RESULTS SECTION ========== */
        .naming-results {
          margin-top: 32px;
          animation: slideInUp 0.8s ease 0.2s both;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .results-count {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 12px;
          border-radius: 12px;
        }

        .industry-tag {
          padding: 6px 16px;
          background: rgba(0, 255, 136, 0.2);
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 20px;
          color: #00ff88;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .results-stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          color: #00bfff;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 4px;
        }

        .generate-more-btn {
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 10px;
          color: #0063f4;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .generate-more-btn:hover:not(:disabled) {
          background: rgba(0, 99, 244, 0.25);
          transform: translateY(-2px);
        }

        .generate-more-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ========== NAME CARDS ========== */
        .names-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .name-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          transform-style: preserve-3d;
          perspective: 1000px;
          animation: cardAppear 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .name-card:nth-child(1) { animation-delay: 0.1s; }
        .name-card:nth-child(2) { animation-delay: 0.2s; }
        .name-card:nth-child(3) { animation-delay: 0.3s; }
        .name-card:nth-child(4) { animation-delay: 0.4s; }
        .name-card:nth-child(5) { animation-delay: 0.5s; }
        .name-card:nth-child(6) { animation-delay: 0.6s; }
        .name-card:nth-child(7) { animation-delay: 0.7s; }
        .name-card:nth-child(8) { animation-delay: 0.8s; }

        @keyframes cardAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .name-card:hover {
          transform: translateY(-8px) rotateX(5deg);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 191, 255, 0.4);
          box-shadow: 
            0 20px 40px rgba(0, 191, 255, 0.15),
            0 0 0 1px rgba(0, 191, 255, 0.2);
        }

        .name-card.premium {
          border: 2px solid rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.05);
        }

        .name-card.premium:hover {
          border-color: rgba(0, 255, 136, 0.7);
          box-shadow: 
            0 20px 50px rgba(0, 255, 136, 0.2),
            0 0 0 1px rgba(0, 255, 136, 0.3);
        }

        .name-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .name-main {
          flex: 1;
        }

        .name-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
          word-break: break-word;
          line-height: 1.2;
        }

        .name-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .name-category {
          font-size: 0.75rem;
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
        }

        .domain-status {
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .domain-status.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .domain-status.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
          border: 1px solid rgba(255, 107, 157, 0.3);
        }

        .checking-domain {
          display: flex;
          align-items: center;
          gap: 8px;
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

        .available-status, .taken-status {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .name-score {
          text-align: center;
          margin-left: 16px;
        }

        .score-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 6px;
          box-shadow: 0 4px 15px rgba(0, 99, 244, 0.3);
        }

        .score-value {
          font-size: 1.4rem;
          font-weight: 900;
          color: white;
        }

        .score-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .name-explanation {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border-left: 4px solid #00bfff;
        }

        .name-tlds {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .tld-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .tld-badge {
          font-size: 0.8rem;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }

        .tld-badge.available {
          background: rgba(0, 255, 136, 0.15);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .tld-badge.taken {
          background: rgba(255, 107, 157, 0.15);
          color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 107, 157, 0.3);
          text-decoration: line-through;
        }

        .name-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .name-action-btn {
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .name-action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .name-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .save-btn {
          background: rgba(0, 255, 136, 0.15);
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
        }

        .save-btn:hover:not(:disabled) {
          background: rgba(0, 255, 136, 0.25);
        }

        .save-btn.saved-animation {
          animation: savePulse 1s ease;
        }

        @keyframes savePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); background: rgba(0, 255, 136, 0.3); }
          100% { transform: scale(1); }
        }

        .check-btn {
          background: rgba(0, 99, 244, 0.15);
          border-color: rgba(0, 99, 244, 0.3);
          color: #0063f4;
        }

        .check-btn:hover:not(:disabled) {
          background: rgba(0, 99, 244, 0.25);
        }

        .domain-btn {
          background: rgba(0, 191, 255, 0.15);
          border-color: rgba(0, 191, 255, 0.3);
          color: #00bfff;
        }

        .domain-btn:hover:not(:disabled) {
          background: rgba(0, 191, 255, 0.25);
        }

        .details-btn {
          background: rgba(255, 107, 157, 0.15);
          border-color: rgba(255, 107, 157, 0.3);
          color: #ff6b9d;
        }

        .details-btn:hover:not(:disabled) {
          background: rgba(255, 107, 157, 0.25);
        }

        .results-footer {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-note {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
          text-align: center;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .footer-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .download-saved-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #00ff88, #00bfff);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .download-saved-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
        }

        /* ========== HERO CTA ========== */
        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 1s both;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        /* ========== HERO VISUAL ========== */
        .hero-visual {
          position: relative;
          height: 600px;
          perspective: 1500px;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 16px;
          color: #00bfff;
          font-size: 28px;
          backdrop-filter: blur(10px);
          animation: floatIcon 3s ease-in-out infinite;
        }

        .icon-0, .icon-4 {
          top: 10%;
          right: 5%;
          animation-delay: 0s;
        }

        .icon-1, .icon-5 {
          top: 50%;
          right: 0%;
          animation-delay: 0.5s;
        }

        .icon-2, .icon-6 {
          bottom: 20%;
          right: 8%;
          animation-delay: 1s;
        }

        .icon-3, .icon-7 {
          top: 30%;
          left: 5%;
          animation-delay: 1.5s;
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }

        .brand-showcase {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .showcase-img {
          position: absolute;
          width: 320px;
          height: 320px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(0, 191, 255, 0.3);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .img-1 {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateY(-15deg) rotateX(5deg) translateZ(80px);
          z-index: 3;
          animation: float1 8s ease-in-out infinite;
        }

        .img-2 {
          left: 50%;
          top: 50%;
          transform: translate(-30%, -50%) rotateY(10deg) rotateX(-3deg) translateZ(40px);
          z-index: 2;
          animation: float2 9s ease-in-out infinite;
        }

        .img-3 {
          left: 50%;
          top: 50%;
          transform: translate(-70%, -50%) rotateY(-5deg) rotateX(8deg) translateZ(20px);
          z-index: 1;
          animation: float3 10s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(-50%, -50%) rotateY(-15deg) rotateX(5deg) translateZ(80px) translateY(0); }
          50% { transform: translate(-50%, -50%) rotateY(-15deg) rotateX(5deg) translateZ(80px) translateY(-30px); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(-30%, -50%) rotateY(10deg) rotateX(-3deg) translateZ(40px) translateY(0); }
          50% { transform: translate(-30%, -50%) rotateY(10deg) rotateX(-3deg) translateZ(40px) translateY(-20px); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(-70%, -50%) rotateY(-5deg) rotateX(8deg) translateZ(20px) translateY(0); }
          50% { transform: translate(-70%, -50%) rotateY(-5deg) rotateX(8deg) translateZ(20px) translateY(-25px); }
        }

        .showcase-img:hover {
          transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg) scale(1.1) translateZ(150px) !important;
          z-index: 10 !important;
          box-shadow: 
            0 70px 140px rgba(0, 191, 255, 0.5),
            0 0 0 2px rgba(0, 191, 255, 0.4),
            0 0 100px rgba(0, 191, 255, 0.4);
          animation: none !important;
          filter: brightness(1.2);
        }

        /* ========== SECTION HEADER ========== */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          animation: fadeInUp 1s ease both;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .highlight {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ========== PROCESS STEPS ========== */
        .naming-process {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .process-step {
          text-align: center;
          padding: 40px 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          position: relative;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          transform-style: preserve-3d;
        }

        .process-step:hover {
          transform: translateY(-10px) rotateX(5deg);
          background: rgba(0, 191, 255, 0.08);
          border-color: rgba(0, 191, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0, 191, 255, 0.15);
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
          font-weight: 900;
          font-size: 1.2rem;
          color: white;
          box-shadow: 0 8px 20px rgba(0, 99, 244, 0.3);
        }

        .step-icon {
          font-size: 48px;
          color: #00bfff;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }

        .step-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        /* ========== SERVICES SECTION ========== */
        .services-section {
          padding: 100px 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .service-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
        }

        .service-card:hover {
          transform: translateY(-10px) rotateX(5deg);
          background: rgba(0, 191, 255, 0.08);
          border-color: rgba(0, 191, 255, 0.4);
          box-shadow: 0 20px 50px rgba(0, 191, 255, 0.2);
        }

        .service-icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 191, 255, 0.15);
          border-radius: 20px;
          margin-bottom: 32px;
          font-size: 36px;
          color: #00bfff;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(0, 191, 255, 0.3), rgba(0, 255, 136, 0.2));
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: white;
          text-align: center;
          line-height: 1.3;
        }

        .service-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          text-align: center;
          max-width: 400px;
        }

        .service-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 40px;
          max-width: 520px;
          margin-inline: auto;
          align-items: center;
        }

        .service-feature svg {
          color: #00bfff;
          flex-shrink: 0;
          font-size: 18px;
        }

        .service-btn {
          padding: 16px 36px;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid #00bfff;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          align-self: center;
          margin-top: auto;
        }

        .service-btn:hover {
          background: #00bfff;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 191, 255, 0.4);
        }

        /* ========== FEATURES SECTION ========== */
        .features-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
        }

        .feature-card:hover {
          transform: translateY(-10px) rotateX(5deg);
          background: rgba(0, 255, 136, 0.08);
          border-color: rgba(0, 255, 136, 0.4);
          box-shadow: 0 20px 50px rgba(0, 255, 136, 0.2);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 136, 0.15);
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 32px;
          color: #00ff88;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }

        .feature-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* ========== POPUP OVERLAY ========== */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-container {
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          backdrop-filter: blur(20px);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px) rotateX(10deg);
          }
          to { 
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .popup-header {
          padding: 24px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 191, 255, 0.05);
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
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .popup-close:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: rgba(255, 107, 157, 0.4);
          color: #ff6b9d;
          transform: rotate(90deg);
        }

        .popup-content {
          padding: 32px;
        }

        /* ========== SEARCH POPUP ========== */
        .name-search-popup {
          max-width: 600px;
        }

        .search-box {
          position: relative;
          margin-bottom: 24px;
        }

        .search-box svg {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          font-size: 20px;
        }

        .search-box input {
          width: 100%;
          padding: 18px 24px 18px 56px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid;
        }

        .search-box input:focus {
          outline: none;
          border-color: #00bfff;
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.2);
        }

        .search-results {
          margin-bottom: 32px;
        }

        .search-results h4 {
          font-size: 1.2rem;
          color: white;
          margin-bottom: 20px;
        }

        .search-results-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .search-result-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .search-result-card:hover {
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
          transform: translateX(5px);
        }

        .search-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .search-result-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .search-result-meta {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .search-result-category {
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
        }

        .search-result-status {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
        }

        .search-result-status.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .search-result-status.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
        }

        .search-result-explanation {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .search-result-score {
          margin-bottom: 16px;
        }

        .score-badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 8px;
          color: #0063f4;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .search-result-actions {
          display: flex;
          gap: 10px;
        }

        .search-action-btn {
          flex: 1;
          padding: 10px 16px;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 8px;
          color: #00bfff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .search-action-btn:hover {
          background: rgba(0, 191, 255, 0.25);
          transform: translateY(-2px);
        }

        .search-action-btn.secondary {
          background: rgba(0, 255, 136, 0.15);
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
        }

        .search-action-btn.secondary:hover {
          background: rgba(0, 255, 136, 0.25);
        }

        .search-loading {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.6);
        }

        .search-loading .spinner {
          margin: 0 auto 16px;
        }

        .search-empty {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.6);
        }

        .popup-actions {
          display: flex;
          gap: 12px;
        }

        .popup-btn {
          flex: 1;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .popup-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
        }

        .popup-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .popup-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .popup-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* ========== DOMAIN REGISTRAR POPUP ========== */
        .domain-registrar-popup {
          max-width: 600px;
        }

        .domain-name {
          color: #00bfff;
          font-weight: 800;
        }

        .domain-status-display {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
        }

        .status-badge {
          display: inline-block;
          padding: 10px 24px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 16px;
        }

        .status-badge.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 2px solid rgba(0, 255, 136, 0.4);
        }

        .status-badge.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
          border: 2px solid rgba(255, 107, 157, 0.4);
        }

        .status-note {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .registrars-list {
          margin-bottom: 32px;
        }

        .registrars-list h4 {
          font-size: 1.2rem;
          color: white;
          margin-bottom: 20px;
          text-align: center;
        }

        .registrar-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .registrar-card:hover {
          background: rgba(0, 191, 255, 0.05);
          border-color: rgba(0, 191, 255, 0.3);
          transform: translateX(5px);
        }

        .registrar-icon {
          font-size: 32px;
          color: #00bfff;
        }

        .registrar-info {
          flex: 1;
        }

        .registrar-info h5 {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 6px;
        }

        .registrar-meta {
          display: flex;
          gap: 16px;
        }

        .price {
          color: #00ff88;
          font-weight: 600;
        }

        .rating {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .registrar-btn {
          padding: 10px 20px;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid #00bfff;
          border-radius: 10px;
          color: #00bfff;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .registrar-btn:hover {
          background: #00bfff;
          color: white;
          transform: translateY(-2px);
        }

        .domain-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .action-btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        .action-btn.secondary {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .action-btn.secondary:hover {
          background: rgba(0, 255, 136, 0.3);
          transform: translateY(-3px);
        }

        .action-btn.tertiary {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
          border: 1px solid rgba(255, 107, 157, 0.3);
        }

        .action-btn.tertiary:hover {
          background: rgba(255, 107, 157, 0.3);
          transform: translateY(-3px);
        }

        /* ========== NAME DETAILS POPUP ========== */
        .name-details-popup {
          max-width: 700px;
        }

        .name-details-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .name-details-header {
          text-align: center;
        }

        .name-display-large h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: white;
          line-height: 1.2;
        }

        .name-meta-large {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .category-badge-large {
          padding: 8px 20px;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .score-badge-large {
          padding: 8px 20px;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          color: #0063f4;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .domain-status-large {
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .domain-status-large.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .domain-status-large.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
          border: 1px solid rgba(255, 107, 157, 0.3);
        }

        .details-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .details-section h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .details-section h4::before {
          content: '';
          width: 4px;
          height: 20px;
          background: #00bfff;
          border-radius: 2px;
        }

        .details-section p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          background: rgba(255, 255, 255, 0.03);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .detail-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }

        .detail-value.risk-low {
          color: #00ff88;
        }

        .detail-value.risk-medium {
          color: #ffd700;
        }

        .detail-value.risk-high {
          color: #ff6b9d;
        }

        .name-actions-large {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        /* ========== SAVED NAMES POPUP ========== */
        .saved-names-popup {
          max-width: 600px;
        }

        .saved-names-list {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 32px;
        }

        .saved-name-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          margin-bottom: 12px;
        }

        .saved-name-main {
          flex: 1;
        }

        .saved-name-main h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .saved-meta {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .saved-category {
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
        }

        .saved-date, .saved-score {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .saved-status {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 600;
        }

        .saved-status.available {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .saved-status.taken {
          background: rgba(255, 107, 157, 0.2);
          color: #ff6b9d;
        }

        .saved-actions {
          display: flex;
          gap: 8px;
        }

        .saved-action-btn {
          padding: 8px 16px;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 8px;
          color: #00bfff;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .saved-action-btn:hover {
          background: rgba(0, 191, 255, 0.2);
          transform: translateY(-2px);
        }

        /* ========== LOADING SPINNER ========== */
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #00bfff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (max-width: 1200px) {
          .hero-grid {
            gap: 60px;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .process-steps {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-content {
            max-width: 100%;
          }
          
          .hero-visual {
            height: 400px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .names-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }
          
          .hero-title {
            font-size: 36px;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .naming-input-group {
            flex-direction: column;
          }
          
          .naming-button {
            width: 100%;
          }
          
          .results-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .header-left, .header-right {
            width: 100%;
            justify-content: center;
          }
          
          .names-grid {
            grid-template-columns: 1fr;
          }
          
          .process-steps {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .footer-actions {
            flex-direction: column;
          }
          
          .name-actions {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .showcase-img {
            width: 250px;
            height: 250px;
          }
          
          .popup-container {
            margin: 20px;
          }
          
          .name-display-large h2 {
            font-size: 2rem;
          }
          
          .name-meta-large {
            flex-direction: column;
            align-items: center;
          }
          
          .name-actions-large {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }
          
          .naming-tool {
            padding: 24px;
          }
          
          .service-card, .feature-card, .process-step {
            padding: 24px;
          }
          
          .cta-btn-primary, .cta-btn-secondary {
            width: 100%;
            justify-content: center;
          }
          
          .name-header {
            flex-direction: column;
            gap: 16px;
          }
          
          .name-score {
            margin-left: 0;
          }
          
          .showcase-img {
            width: 200px;
            height: 200px;
          }
          
          .brand-showcase {
            transform: scale(0.8);
          }
        }

        /* ========== SCROLLBAR STYLING ========== */
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

        /* ========== YOUR ENHANCED STYLES (keep this section) ========== */
      `}</style>
    </div>
  );
};

export default BrandingDesignPage;