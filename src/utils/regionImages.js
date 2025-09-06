/**
 * Region Images - Maps region names to representative images from product catalog
 */

// Region image mapping using product images from public folder
export const regionImages = {
  'India': '/assets/products/rugs/mirzapur_rugs/apiya/1.webp',
  'Mirzapur': '/assets/products/rugs/mirzapur_rugs/impression/1.webp',
  'Rajasthan': '/assets/products/wall_hanging/vintage_crafts/wooden_wall_clock/1.jpg',
  'Gujarat': '/assets/products/home_decor/heritage_crafts/copper_brass_tray/1.jpg',
  'Punjab': '/assets/products/rugs/mirzapur_rugs/volcano/1.webp',
  'Uttar Pradesh': '/assets/products/rugs/mirzapur_rugs/skye/1.webp',
  'Maharashtra': '/assets/products/home_decor/artisan_collection/decorative_vase/1.jpg',
  'Karnataka': '/assets/products/wall_hanging/artisan_collection/fabric_wall_art/1.jpg'
};

// Function to get region image by name
export const getRegionImage = (regionName) => {
  if (!regionName) return null;
  
  // Try exact match first
  if (regionImages[regionName]) {
    return regionImages[regionName];
  }
  
  // Try case-insensitive match
  const normalizedName = regionName.toLowerCase();
  const exactMatch = Object.keys(regionImages).find(
    key => key.toLowerCase() === normalizedName
  );
  
  if (exactMatch) {
    return regionImages[exactMatch];
  }
  
  // Return India as default for any Indian region
  return regionImages['India'];
};

// Default fallback region image
export const getDefaultRegionImage = () => {
  return 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
