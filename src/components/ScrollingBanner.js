import React from 'react';
import './ScrollingBanner.css';

/**
 * ScrollingBanner Component - Animated scrolling text banner with key features
 * Similar to Revival Rugs' design but adapted for Indikaara's Indian handicrafts theme
 */
const ScrollingBanner = () => {
  const features = [
    "Authentic Artisan Crafts",
    "Heritage Preservation",
    "Handmade Excellence", 
    "Cultural Legacy",
    "Sustainable Craftsmanship",
    "Traditional Techniques",
    "Artisan Empowerment",
    "Timeless Beauty"
  ];

  return (
    <div className="scrolling-banner-container">
      <div className="scrolling-banner">
        <div className="scrolling-content">
          {/* Duplicate the content for seamless loop */}
          {[...features, ...features].map((feature, index) => (
            <span key={index} className="banner-item">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
