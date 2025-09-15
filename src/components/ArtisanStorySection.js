import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollingBanner from './ScrollingBanner';
import './ArtisanStorySection.css';

/**
 * ArtisanStorySection Component - Main hero section with scrolling banner and compelling headline
 * Inspired by Revival Rugs' design but adapted for Indikaara's Indian handicrafts theme
 */
const ArtisanStorySection = () => {
  const navigate = useNavigate();

  const handleExploreArtisans = () => {
    navigate('/artisans');
  };

  return (
    <section className="artisan-story-section">
      {/* Scrolling Banner */}
      <ScrollingBanner />
      
      {/* Main Hero Content */}
      <div className="hero-content">
        <div className="hero-container">
          <h1 className="hero-headline">
            They don't make crafts
            <br />
            like they used to.
          </h1>
          <p className="hero-subtitle">
            We're preserving ancient Indian artisan traditions, from village to home. 
            Discover the authentic craftsmanship.
          </p>
          <div className="hero-cta">
            <button className="cta-button" onClick={handleExploreArtisans}>
              EXPLORE OUR ARTISANS
            </button>
          </div>
        </div>
        
        {/* Background Gradient Overlay */}
        <div className="hero-overlay"></div>
      </div>
    </section>
  );
};

export default ArtisanStorySection;
