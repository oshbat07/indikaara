import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirstImage, getDefaultImage } from "../utils/imageUtils";

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
    navigate(`/product/${product._id}`);
  };

  // Get the first available image from the product
  const getProductImage = () => {
    // Check for transformed data structure (images property)
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images[0]; // Already converted by dataService
    }
    // Check if product has image array (raw data structure)
    if (
      product.image &&
      Array.isArray(product.image) &&
      product.image.length > 0
    ) {
      return getFirstImage(product.image);
    }
    // Check for single image property
    if (product.image && typeof product.image === "string") {
      return getFirstImage([product.image]);
    }
    // Return default fallback
    return getDefaultImage();
  };

  const productImageSrc = getProductImage();

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Display price or price range
  const displayPrice = () => {
    // Handle new price structure with multiple sizes
    if (product.category === "Rugs") {
      return <span className="border-5">Price on Request</span>;
    } else if (
      product.price &&
      Array.isArray(product.price) &&
      product.price.length > 0 &&
      product.price[0]?.amount
    ) {
      return formatPrice(product.price[0].amount);
    } else if (product.price && typeof product.price === "number") {
      return formatPrice(product.price);
    } else {
      return <span>Price unavailable</span>;
    }
  };

  return (
    <div
      className="flex flex-col gap-4 product-card rounded-[var(--border-radius-lg)] overflow-hidden group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View ${product.name}`}
    >
      {/* Product Image with Story Overlay */}
      <div className="relative w-full aspect-square bg-cover bg-center rounded-t-[var(--border-radius-lg)] bg-gray-800">
        <div
          className={`w-full h-full bg-cover bg-center transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
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
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            )}
            % OFF
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 space-y-2">
        <p className="text-primary text-base font-semibold mb-1 line-clamp-2">
          {product.name}
        </p>

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

        {/* Category*/}
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
