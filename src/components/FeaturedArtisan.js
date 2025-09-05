import React from 'react';
import Button from './Button';

/**
 * FeaturedArtisan Component - Showcases a featured artisan
 * Features: Artisan image, story excerpt, and call-to-action
 */
const FeaturedArtisan = () => {
  const handleReadStoryClick = () => {
    // Handle read story action - could navigate to artisan profile
    console.log('Read Her Story clicked');
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
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-[var(--border-radius-xl)]"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFW6qZutv6UDIzT0tSBsalJoT_IO7gUzXm7XTJR8-atjb978hgqweinKOGxsCYpfLFtbtWP7RQwraxpkUufJY6KsvYWxC0QaT1ft0zHS7h-SvZk4etMZsGd9Gqo7uKsqvi8H2BAjgnhJWouSfISTrKVA0Gm5A0KARNA0GOH1ROcb2-vIX_VruzRc9FJxYleUHBTWdAAIZGZ3GqOo8ZyyWg1kQ3_fg2D6LatNLEC9xGe3rR7tDHKywsPzqSHf60pZCyjx5glz3Oaoc")'
            }}
            role="img"
            aria-label="Fatima Khan, master weaver from Rajasthan"
          />
        </div>
        
        {/* Artisan Story */}
        <div className="flex flex-col gap-4 text-center md:text-left md:w-1/2">
          <h3 className="text-2xl font-bold text-primary">
            The Weaver of Dreams
          </h3>
          <p className="text-lg text-secondary leading-relaxed">
            Meet Fatima Khan, a master weaver from Rajasthan, whose intricate textiles preserve a centuries-old tradition.
          </p>
          
          {/* Call-to-Action */}
          <Button
            variant="outline"
            size="md"
            onClick={handleReadStoryClick}
            className="mt-2 self-center md:self-start"
            aria-label="Read Fatima Khan's full story"
          >
            Read Her Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisan;
