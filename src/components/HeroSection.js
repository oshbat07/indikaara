import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import heroBg from '../assets/hero-bg.png';

/**
 * HeroSection Component - Main hero banner with call-to-action
 * Features: Background image, overlay, title, subtitle, and CTA button
 */
const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/catalogue');
  };

  return (
    <section className="@container">
      <div className="@[480px]:p-4">
        <div 
          className="relative flex min-h-[400px] md:min-h-[520px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[var(--border-radius-2xl)] bg-cover bg-center p-4 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url(${heroBg})`
          }}
          role="banner"
          aria-labelledby="hero-title"
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col gap-4 px-4">
            <h1 
              id="hero-title"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
            >
              Discover the Soul of India
            </h1>
            <h2 className="text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Explore a curated collection of handcrafted treasures, each telling a story of tradition and artistry.
            </h2>
          </div>
          
          {/* Call-to-Action Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleShopNowClick}
            className="relative z-10"
            aria-label="Start shopping for handcrafted products"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
