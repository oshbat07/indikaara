/**
 * Image utilities for handling product images from public assets folder
 */

// Function to get the correct image path for React
export const getImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // Remove the relative path prefix and convert to public folder path
  let cleanPath = imagePath.replace(/^\.\.\/\.\.\//, '');
  
  // Ensure the path starts with /assets/ for public folder access
  if (!cleanPath.startsWith('assets/')) {
    cleanPath = `assets/${cleanPath}`;
  }
  
  // Return the path with leading slash for public folder access
  return `/${cleanPath}`;
};

// Function to get the first available image from an array
export const getFirstImage = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }
  
  // Get the first image path and convert it
  return getImagePath(images[0]);
};

// Function to get all available images from an array
export const getAllImages = (images) => {
  if (!images || !Array.isArray(images)) {
    return [];
  }
  
  return images.map(imagePath => getImagePath(imagePath));
};

// Default fallback image
export const getDefaultImage = () => {
  return 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
};
