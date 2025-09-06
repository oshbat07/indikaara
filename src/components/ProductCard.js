import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirstImage, getDefaultImage } from '../utils/imageUtils';

/**
 * ProductCard Component - Displays individual product with hover overlay
 * @param {Object} product - Product data object
 * @param {function} onClick - Click handler for product selection
 */
const ProductCard = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
  };

  // Get the first available image from the product
  const getProductImage = () => {
    // Check for transformed data structure (images property)
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0]; // Already converted by dataService
    }
    // Check if product has image array (raw data structure)
    if (product.image && Array.isArray(product.image) && product.image.length > 0) {
      return getFirstImage(product.image);
    }
    // Check for single image property
    if (product.image && typeof product.image === 'string') {
      return getFirstImage([product.image]);
    }
    // Return default fallback
    return getDefaultImage();
  };

  const productImageSrc = getProductImage();

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Display price or price range
  const displayPrice = () => {
    // Handle new price structure with multiple sizes
    if (product.priceOptions && Array.isArray(product.priceOptions) && product.priceOptions.length > 0) {
      if (product.priceOptions.length === 1) {
        // Single size option
        return formatPrice(product.priceOptions[0].amount);
      } else {
        // Multiple size options - show range
        const prices = product.priceOptions.map(option => option.amount);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        if (minPrice === maxPrice) {
          return formatPrice(minPrice);
        }
        return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
      }
    } else if (product.price) {
      return formatPrice(product.price);
    }
    return 'Price on request';
  };

  return (
    <div 
      className="flex flex-col gap-4 product-card rounded-[var(--border-radius-lg)] overflow-hidden group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View ${product.name}`}
    >
      {/* Product Image with Story Overlay */}
      <div className="relative w-full aspect-square bg-cover bg-center rounded-t-[var(--border-radius-lg)] bg-gray-800">
        <div 
          className={`w-full h-full bg-cover bg-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url("${productImageSrc}")` }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Hidden image for loading detection */}
        <img 
          src={productImageSrc} 
          alt={product.name}
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Price badge if there's a discount */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        
        {/* Story Overlay */}
        <div className="story-overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-bold text-sm mb-1">{product.storyTitle || product.name}</h3>
          <p className="text-xs leading-relaxed">{product.storyDescription || product.description}</p>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-2 space-y-2">
        <p className="text-primary text-base font-semibold mb-1 line-clamp-2">{product.name}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-lg font-bold">
            {displayPrice()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Category and Region */}
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
            {product.category}
          </span>
          {/* Region tag hidden to avoid showing manufacturer names */}
          {/* {(product.region || product.state) && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
              {product.region || product.state}
            </span>
          )} */}
        </div>

        {/* Rating - Hidden as requested */}
        {/* {product.rating && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-400">
              {product.rating} ({product.reviews || 0})
            </span>
          </div>
        )} */}

        {/* Artisan/Manufacturer - Hidden as requested */}
        {/* {product.artisan && (
          <p className="text-gray-400 text-xs">
            By {product.artisan}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default ProductCard;
