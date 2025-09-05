import React, { useState } from 'react';

/**
 * ImageGallery Component - Product image gallery with main image and thumbnails
 * @param {Array} images - Array of image URLs
 * @param {string} productName - Product name for alt text
 */
const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <div className="text-secondary">No images available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="rounded-xl overflow-hidden group cursor-pointer">
        <div 
          className="w-full h-96 bg-center bg-no-repeat bg-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url("${images[selectedImage]}")` }}
          role="img"
          aria-label={`${productName} - Main image`}
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 3).map((image, index) => (
            <div 
              key={index + 1}
              className={`rounded-xl overflow-hidden group cursor-pointer ${
                selectedImage === index + 1 ? 'ring-2 ring-[var(--primary-color)]' : ''
              }`}
              onClick={() => setSelectedImage(index + 1)}
            >
              <div 
                className="w-full h-32 bg-center bg-no-repeat bg-cover aspect-square transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url("${image}")` }}
                role="img"
                aria-label={`${productName} - Image ${index + 2}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
