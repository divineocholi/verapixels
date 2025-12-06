// BacktoTop.tsx
import React, { useState, useEffect } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const BacktoTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="back-to-top-icon" />
        </button>
      )}

      <style>{`
        .back-to-top {
          position: fixed;
          bottom: 100px; /* Position ABOVE the chatbot (adjust as needed) */
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          z-index: 1001; /* HIGHER than chatbot's z-index */
          box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }

        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 6px 30px rgba(0, 122, 255, 0.5);
          background: linear-gradient(135deg, #5AC8FA, #007AFF);
        }

        .back-to-top:active {
          transform: translateY(-2px) scale(1.05);
        }

        .back-to-top-icon {
          transition: transform 0.3s ease;
        }

        .back-to-top:hover .back-to-top-icon {
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Make sure chatbot has lower z-index */
        /* Add this to your chatbot component CSS: */
        /* 
        .vp-chatbot-button {
          z-index: 1000 !important;
        }
        */

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .back-to-top {
            bottom: 90px; /* Slightly higher on mobile */
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .back-to-top {
            bottom: 80px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }

        /* Adjust if chatbot is larger */
        @media (max-width: 768px) and (min-height: 700px) {
          .back-to-top {
            bottom: 120px; /* More space on taller mobile screens */
          }
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .back-to-top {
            box-shadow: 0 4px 20px rgba(0, 122, 255, 0.5);
          }
        }
      `}</style>
    </>
  );
};

export default BacktoTop;