import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageGalleryCarousel.css";
import {
  getAllImages,
  getDefaultImage,
  getAllImagesOptimized,
} from "../utils/imageUtils";

/**
 * ImageGallery Component - Product image gallery with main image and thumbnails
 * @param {Array} images - Array of image URLs
 * @param {string} productName - Product name for alt text
 */
const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [processedImages, setProcessedImages] = useState([]);
  const mainSliderRef = useRef(null);

  // Function to process images based on current device
  const processImages = () => {
    let processed;
    if (
      images &&
      images.length > 0 &&
      typeof images[0] === "string" &&
      images[0].startsWith("https://")
    ) {
      // Images are already processed by dataService, apply device optimization
      processed = images.map((img) => getAllImagesOptimized([img])[0]);
    } else {
      // Process raw images using utilities with device optimization
      processed = getAllImagesOptimized(images || []);
    }
    setProcessedImages(processed);
  };

  // Process images on mount and when images prop changes
  useEffect(() => {
    processImages();
  }, [images]);

  // Re-process images on window resize to handle device changes
  useEffect(() => {
    const handleResize = () => {
      processImages();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // If no processed images, use default
  if (!processedImages || processedImages.length === 0) {
    const defaultImg = getDefaultImage();
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
          style={{ backgroundImage: `url("${defaultImg}")` }}
          role="img"
          aria-label={`${productName} - Default image`}
        />
      </div>
    );
  }

  const showArrows = processedImages.length > 1;

  const settings = {
    dots: false,
    arrows: showArrows,
    infinite: processedImages.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: (_, next) => setSelectedImage(next),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: processedImages.length > 1,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    swipe: true,
    lazyLoad: "ondemand",
  };
  return (
    <div className="relative">
      <div className="relative">
        <Slider ref={mainSliderRef} {...settings}>
          {processedImages.map((img, idx) => (
            <div key={idx}>
              <div
                className="gallery-slide-bg"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={`${productName} - Image ${idx + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {processedImages.length > 1 && (
        <div className="gallery-thumbs-wrapper grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-3">
          {processedImages.map((thumb, tIdx) => (
            <button
              key={tIdx}
              type="button"
              className="gallery-thumb-button"
              data-active={selectedImage === tIdx}
              onClick={() => {
                setSelectedImage(tIdx);
                if (mainSliderRef.current)
                  mainSliderRef.current.slickGoTo(tIdx);
              }}
              aria-label={`View image ${tIdx + 1}`}
            >
              <img
                src={thumb}
                alt={`${productName} thumbnail ${tIdx + 1}`}
                className="gallery-thumb-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom arrows to match theme
const ArrowBase = ({ className, style, onClick, direction }) => {
  return (
    <button
      type="button"
      aria-label={direction === "next" ? "Next image" : "Previous image"}
      className={`!flex !items-center !justify-center !w-12 !h-12 !rounded-full !backdrop-blur-sm !bg-black/30 hover:!bg-black/50 !border !border-white/10 transition-colors shadow-lg absolute ${
        direction === "next" ? "!right-4" : "!left-4"
      } !top-1/2 -translate-y-1/2 z-30`}
      style={style}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-[var(--accent-color)]"
      >
        {direction === "next" ? (
          <path d="M9 18l6-6-6-6" />
        ) : (
          <path d="M15 18l-6-6 6-6" />
        )}
      </svg>
    </button>
  );
};

const SampleNextArrow = (props) => <ArrowBase {...props} direction="next" />;
const SamplePrevArrow = (props) => <ArrowBase {...props} direction="prev" />;

export default ImageGallery;
