import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Add this import
import "../index.css";
import veraintro from "../assets/finalverapixels.mp4";
import Navbar from "./Navbar";
import ServicesSection from "./ServicesSection";
import TechSolutionBanner from "./TechSolutionBanner";
import VeraAISection from "./VeraAISection";
import TechBlogSection from "./TechBlogSection";
import VeeAIChatbot from "./VeeAIChatbot";
import FAQ from "./FAQ";
const slides = [
  {
    title: "IT Software Solutions & Technology",
    subtitle: "We craft scalable web apps, beautiful UI and powerful digital experiences.",
    cta: "Start Your Project",
    ctaLink: "/contact",
    learnMoreLink: "/services"
  },
  {
    title: "Mobile App Development",
    subtitle: "Build powerful iOS & Android apps with cutting-edge technology and seamless user experience.",
    cta: "Build Your App",
    ctaLink: "/contact",
    learnMoreLink: "/mobileappdevelopment"
  },
  {
    title: "Creative Design & Branding",
    subtitle: "Brand systems that stand out — from identity to motion design.",
    cta: "Design Your Brand",
    ctaLink: "/contact",
    learnMoreLink: "/uiuxdesign"
  },
];
const AUTOPLAY_DELAY = 6000;

const Index: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [active, setActive] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  function onSlideChange(swiper: any) {
    const idx = swiper.realIndex ?? swiper.activeIndex;
    setActive(idx);
  }

  const handleGetStarted = () => {
    // Navigate to Contact page
    navigate("/contact");
  };

  const handleLearnMore = () => {
    // Navigate to the specific page for the current slide
    const currentSlide = slides[active];
    if (currentSlide.learnMoreLink) {
      navigate(currentSlide.learnMoreLink);
    }
  };

  return (
    <div className="vp-root">
      {/* Import Navbar Component */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <main className="vp-hero">
        <video
          className="vp-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={veraintro} type="video/mp4" />
        </video>

        <div className="vp-bg-overlay" />

        <Swiper
          effect="fade"
          loop
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          modules={[Autoplay, EffectFade]}
          onSlideChange={onSlideChange}
          onSwiper={(s) => (swiperRef.current = s)}
          className="vp-swiper"
        >
          {slides.map((slide, i) => {
            const pos = i % 2 === 0 ? "left" : "right";
            return (
              <SwiperSlide key={i}>
                <div className={`vp-side-wrap ${pos}`}>
                  <div className="vp-geo" />
                  <div className="vp-content-wrap">
                    <h1 className="vp-title">{slide.title}</h1>
                    <p className="vp-sub">{slide.subtitle}</p>
                    <div className="vp-ctas">
                      <button className="vp-primary" onClick={handleGetStarted}>
                        {slide.cta} <FiChevronRight />
                      </button>
                      <button className="vp-secondary" onClick={handleLearnMore}>
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </main>
      
      
      <ServicesSection />
      <TechSolutionBanner />
      <VeraAISection />
      <TechBlogSection />
      <FAQ />
    </div>
  );
};

export default Index;