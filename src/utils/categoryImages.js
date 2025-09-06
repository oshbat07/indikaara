/**
 * Category Images - Maps category names to their respective images
 */

// Import category images from assets
import rugsImage from '../assets/category-select-rugs.png';
import homeDecorImage from '../assets/category-select-home-decor.png';

// Category image mapping
export const categoryImages = {
  'Rugs': rugsImage,
  'Home Decor': homeDecorImage, // Merged category now includes wall hangings
  'Vintage Collections': homeDecorImage, // Use home decor image for vintage collections as fallback
  // Legacy mappings for backward compatibility
  'Wall_Hanging': homeDecorImage, // Redirect to Home Decor
  'Home_Decor': homeDecorImage,
  'Wall Hanging': homeDecorImage, // Redirect to Home Decor
  // Case variants
  'rugs': rugsImage,
  'home decor': homeDecorImage,
  'vintage collections': homeDecorImage
};

// Function to get category image by name
export const getCategoryImage = (categoryName) => {
  if (!categoryName) return null;
  
  // Try exact match first
  if (categoryImages[categoryName]) {
    return categoryImages[categoryName];
  }
  
  // Try case-insensitive match
  const normalizedName = categoryName.toLowerCase();
  const exactMatch = Object.keys(categoryImages).find(
    key => key.toLowerCase() === normalizedName
  );
  
  if (exactMatch) {
    return categoryImages[exactMatch];
  }
  
  // Try partial match for common variations
  if (normalizedName.includes('rug')) {
    return categoryImages['Rugs'];
  }
  if (normalizedName.includes('wall') || normalizedName.includes('hanging')) {
    return categoryImages['Home Decor']; // Redirect wall hangings to Home Decor
  }
  if (normalizedName.includes('home') || normalizedName.includes('decor')) {
    return categoryImages['Home Decor'];
  }
  if (normalizedName.includes('vintage') || normalizedName.includes('collection')) {
    return categoryImages['Vintage Collections'];
  }
  
  return null;
};

// Default fallback image
export const getDefaultCategoryImage = () => {
  return 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
