import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import leelaDeviImage from '../assets/featured-artisan-homepage.jpg';

/**
 * FeaturedArtisan Component - Showcases a featured artisan
 * Features: Artisan image, story excerpt, and call-to-action
 */
const FeaturedArtisan = () => {
  const navigate = useNavigate();

  // Featured artisan data - Leela Devi from ArtisansPage
  const featuredArtisan = {
    id: 2, // Matches Leela Devi's ID in ArtisansPage
    name: "Leela Devi",
    title: "Textile Weaver",
    image: leelaDeviImage,
    story: "The rhythmic click of Leela's loom is a song her village has known for decades. She transforms threads into vibrant tapestries, each one a canvas of intricate patterns and bold colors. Leela uses only natural dyes, a skill she learned from her grandmother, ensuring every piece is as kind to the earth as it is beautiful to behold.",
    craft: "Textile Weaving",
    location: "Bhuj, Gujarat"
  };

  const handleReadStoryClick = () => {
    // Navigate to artisans page with artisan ID to open specific dialog
    navigate(`/artisans?openDialog=${featuredArtisan.id}`);
  };

  return (
    <section 
      className="mt-16 bg-gray-800 p-8 rounded-[var(--border-radius-2xl)] border border-gray-700"
      aria-labelledby="featured-artisan-title"
    >
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 
          id="featured-artisan-title"
          className="text-4xl font-bold text-primary mb-3"
        >
          Featured Artisan
        </h2>
      </div>
      
      {/* Artisan Content */}
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Artisan Image */}
        <div className="w-full md:w-1/2">
          <div 
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-[var(--border-radius-xl)] shadow-lg"
            style={{
              backgroundImage: `url("${featuredArtisan.image}")`
            }}
            role="img"
            aria-label={`${featuredArtisan.name}, ${featuredArtisan.title} from ${featuredArtisan.location}`}
          />
        </div>
        
        {/* Artisan Story */}
        <div className="flex flex-col gap-4 text-center md:text-left md:w-1/2">
          <div className="mb-2">
            <span className="inline-block bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
              {featuredArtisan.craft}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-primary mb-2">
            {featuredArtisan.name}
          </h3>
          <p className="text-[var(--secondary-color)] font-medium mb-4">
            {featuredArtisan.title} • {featuredArtisan.location}
          </p>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            {featuredArtisan.story}
          </p>
          
          {/* Call-to-Action */}
          <Button
            variant="outline"
            size="md"
            onClick={handleReadStoryClick}
            className="mt-2 self-center md:self-start"
            aria-label={`Read ${featuredArtisan.name}'s full story and meet other artisans`}
          >
            Read Her Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisan;
