/**
 * Category Images - Maps category names to their respective images
 */

// Import category images from assets
import rugsImage from '../assets/category-select-rugs.png';
import wallHangingImage from '../assets/category-select-wall-hanging.png';
import homeDecorImage from '../assets/category-select-home-decor.png';

// Category image mapping
export const categoryImages = {
  'Rugs': rugsImage,
  'Wall_Hanging': wallHangingImage,
  'Home_Decor': homeDecorImage,
  // Add fallback variants for different naming conventions
  'Wall Hanging': wallHangingImage,
  'Home Decor': homeDecorImage,
  'rugs': rugsImage,
  'wall_hanging': wallHangingImage,
  'home_decor': homeDecorImage
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
    return categoryImages['Wall_Hanging'];
  }
  if (normalizedName.includes('home') || normalizedName.includes('decor')) {
    return categoryImages['Home_Decor'];
  }
  
  return null;
};

// Default fallback image
export const getDefaultCategoryImage = () => {
  return 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
