import React, { useState, useEffect, useRef } from 'react';
import './CategoryCarousel.css';

/**
 * CategoryCarousel Component - Beautiful slidable carousel for category selection
 * Features: Auto-scroll, navigation dots, arrow controls, touch/swipe support, responsive design
 * @param {Array} categories - Array of category objects
 * @param {function} onCategoryClick - Callback when category is clicked
 */
const CategoryCarousel = ({ categories, onCategoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef(null);

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerSlide(1); // Mobile: 1 item
      } else if (width < 1024) {
        setItemsPerSlide(2); // Tablet: 2 items
      } else {
        setItemsPerSlide(3); // Desktop: 3 items
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(categories.length / itemsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Touch/Swipe functionality
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diffX = startX - currentX;
    const threshold = 50; // Minimum distance for swipe
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrevious();
      }
    } else {
      // Resume auto-play if no significant swipe
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
    
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse drag functionality for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diffX = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    } else {
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
    
    setStartX(0);
    setCurrentX(0);
  };

  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto category-carousel">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Slides Container */}
        <div 
          className={`flex carousel-slides ${isDragging ? 'dragging' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className={`grid gap-6 px-4 ${
                itemsPerSlide === 1 ? 'grid-cols-1' :
                itemsPerSlide === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {categories
                  .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                  .map((category) => (
                    <div
                      key={category.id}
                      className="group cursor-pointer category-card"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {/* Enhanced Category Card */}
                      <div className="relative bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[var(--accent-color)]/20 transition-all duration-300">
                        {/* Image Container with Overlay */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url("${category.image}")` }}
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                          
                          {/* Product Count Badge */}
                          <div className="absolute top-4 right-4 bg-[var(--accent-color)]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {category.count} {category.count === 1 ? 'item' : 'items'}
                          </div>
                          
                          {/* Hover Effect Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-[var(--accent-color)] transition-colors duration-300 capitalize">
                            {category.title}
                          </h3>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            Discover authentic {category.title.toLowerCase()} crafted by skilled artisans
                          </p>
                          
                          {/* Explore Button */}
                          <div className="mt-4 flex items-center text-[var(--accent-color)] text-sm font-medium group-hover:text-white transition-colors duration-300">
                            <span>Explore Collection</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-[var(--accent-color)]/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-lg border border-white/10 carousel-nav-arrow"
            aria-label="Previous categories"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-[var(--accent-color)]/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-lg border border-white/10 carousel-nav-arrow"
            aria-label="Next categories"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Swipe Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 md:opacity-100 transition-opacity duration-300">
        <span className="hidden md:inline">← Swipe or click arrows to navigate →</span>
        <span className="md:hidden">← Swipe to navigate →</span>
      </div>

      {/* Navigation Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[var(--accent-color)] scale-125 shadow-lg shadow-[var(--accent-color)]/50"
                  : "bg-gray-400/50 hover:bg-gray-400/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {totalSlides > 1 && (
        <div className="mt-6 mx-4">
          <div className="h-1 bg-gray-700/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/70 rounded-full carousel-progress-bar"
              style={{
                width: isAutoPlaying ? `${((currentSlide + 1) / totalSlides) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
