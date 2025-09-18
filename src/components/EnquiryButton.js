import React, { useState } from "react";
import ContactModal from "./ContactModal";

/**
 * EnquiryButton Component - Sticky floating button for enquiries
 * Features: 
 * - Fixed position in bottom right corner
 * - Smooth animations and hover effects
 * - Responsive design
 * - Opens contact modal with company details
 */
const EnquiryButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquiryClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleEnquiryClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Enquiry Now"
      >
        {/* Main Button */}
        <div className={`
          bg-primary hover:bg-primary/90 text-white 
          px-6 py-3 rounded-full shadow-lg hover:shadow-xl
          flex items-center space-x-2
          transition-all duration-300 ease-in-out
          transform hover:scale-105
          ${isHovered ? 'pr-8' : ''}
        `}>
          {/* Icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          
          {/* Text */}
          <span className="font-medium text-sm sm:text-base whitespace-nowrap">
            Enquiry Now
          </span>
          
          {/* Arrow Icon - appears on hover */}
          <svg
            className={`w-4 h-4 transition-all duration-300 ${
              isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
        
        {/* Tooltip - appears on hover */}
        <div className={`
          absolute bottom-full right-0 mb-2
          bg-gray-900 text-white text-xs
          px-3 py-1 rounded-lg
          transition-all duration-200
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          pointer-events-none
          whitespace-nowrap
        `}>
          Get in touch with us
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EnquiryButton;
