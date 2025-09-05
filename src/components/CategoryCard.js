import React from 'react';

/**
 * CategoryCard Component - Displays a category with image and title
 * @param {string} image - Background image URL
 * @param {string} title - Category title
 * @param {string} link - Category link (for future routing)
 * @param {function} onClick - Click handler
 */
const CategoryCard = ({ image, title, link = '#', onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      {/* Image Container */}
      <div className="overflow-hidden rounded-[var(--border-radius-xl)]">
        <div 
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-[var(--border-radius-xl)] transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url("${image}")` }}
          role="img"
          aria-label={`${title} category`}
        />
      </div>
      
      {/* Category Title */}
      <p className="mt-4 text-center text-lg font-medium text-primary group-hover:text-[var(--accent-color)] transition-colors">
        {title}
      </p>
    </div>
  );
};

export default CategoryCard;
