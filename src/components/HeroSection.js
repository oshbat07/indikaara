import React, { useState, useEffect } from "react";
import "../styles/hero.css";
/**
 * HeroSection Component - Hero carousel with new arrivals
 * Features: Image carousel, navigation dots, arrow controls, auto-play
 */
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample carousel images - using actual product images
  const slides = [
    {
      id: 1,
      category: "Rugs",
      image:
        "https://imagedelivery.net/H565DrCZdQzOpEYoxfVenQ/50013eca-9726-4af3-1459-a0a80affbf00/public",
      cta: "Shop Rugs",
    },
    {
      id: 2,
      category: "Vintage Art",
      image:
        "https://imagedelivery.net/H565DrCZdQzOpEYoxfVenQ/caed5894-1e93-4a77-5cfd-6e3dd031cd00/public",
      cta: "Explore Decor",
    },
    {
      id: 3,
      category: "Vintage Art",
      image:
        "https://imagedelivery.net/H565DrCZdQzOpEYoxfVenQ/c5adbfa6-acdb-4d6d-fbb7-e90c8c4d2100/public",
      cta: "Browse Vintage",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  // const handleHeroClick = (e) => {
  //   console.log("e", e);
  // };
  return (
    <section className="relative pt-1 w-screen overflow-hidden hero-carousel bg-transparent">
      {/* NEW ARRIVALS Header */}
      <div className="absolute top-6 md:top-8 left-0 right-0 z-30 text-center"></div>

      {/* Carousel Container */}
      <div className="relative h-[400px] sm:h-[460px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden w-full">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full hero-slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Background Image (cover ensures full-bleed responsive images) */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center w-full h-full"
                style={{ backgroundImage: `url("${slide.image}")` }}
              />

              {/* Content */}
              {/* <div className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-24 lg:pb-32 text-center px-4">
                  <div className="max-w-4xl mx-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleHeroClick}
                      className="bg-white text-black hover:bg-gray-100 border-none font-medium px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300"
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div> */}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/30 hover:bg-white/70 rounded-full flex items-center justify-center text-black/80 transition-all duration-200 hero-nav-arrow"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/30 hover:bg-white/70 rounded-full flex items-center justify-center text-black/80 transition-all duration-200 hero-nav-arrow"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
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
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 hero-nav-dot ${
                index === currentSlide
                  ? "bg-[#ac1f23] scale-110 active"
                  : "bg-white/70 border border-white/20 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-[#ac1f23]/60 transition-all duration-100 ease-out"
            style={{
              width: isAutoPlaying
                ? `${((currentSlide + 1) / slides.length) * 100}%`
                : "0%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
