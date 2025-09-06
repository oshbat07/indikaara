import productsJson from './products.json';
import { rawProductData } from './productsdata.js';
import { getImagePath } from '../utils/imageUtils.js';
import { getCategoryImage, getDefaultCategoryImage } from '../utils/categoryImages.js';
import { getRegionImage, getDefaultRegionImage } from '../utils/regionImages.js';

/**
 * Data Service - Handles all data operations for products, categories, and regions
 * Features: Product filtering, search, category management, and data retrieval
 */

class DataService {
  constructor() {
    this.data = productsJson;
    this.rawData = rawProductData;
    this.transformedData = this.transformRawData();
  }

  // Transform rawProductData to flat structure compatible with existing code
  transformRawData() {
    const products = [];
    const categories = [];
    const regions = new Set();

    this.rawData.products.forEach(categoryData => {
      // Add category to categories array
      categories.push({
        id: categoryData.categoryId,
        name: categoryData.category,
        image: this.getDefaultCategoryImage(categoryData.category)
      });

      // Transform each item in the category
      categoryData.items.forEach(item => {
        const transformedProduct = {
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.priceRange ? null : item.price * 1.2, // Simulate original price
          category: categoryData.category,
          region: item.manufacturer || "India", // Use manufacturer as region fallback
          artisan: item.manufacturer,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating 3-5
          reviews: Math.floor(Math.random() * 200 + 10), // Random reviews 10-210
          images: item.image.map(img => this.convertImagePath(img)),
          description: item.description,
          features: item.details || [],
          specifications: {
            Material: Array.isArray(item.material) ? item.material.join(', ') : item.material,
            Dimensions: Array.isArray(item.dimensionsAvailable) ? item.dimensionsAvailable.join(', ') : item.dimensionsAvailable,
            Color: Array.isArray(item.color) ? item.color.join(', ') : item.color,
            Technique: item.weavingTechnique || "Handcrafted",
            SKU: item.SKU
          },
          tags: item.tags || [],
          featured: Math.random() > 0.8, // 20% chance of being featured
          inStock: true,
          story: item.story,
          priceRange: item.priceRange
        };

        products.push(transformedProduct);
        
        // Add region to set
        if (item.manufacturer) {
          regions.add(item.manufacturer);
        }
      });
    });

    return {
      products,
      categories,
      regions: Array.from(regions).map((region, index) => ({
        id: index + 1,
        name: region,
        image: this.getDefaultRegionImage(region)
      }))
    };
  }

  // Convert relative image paths to absolute URLs or use placeholder
  convertImagePath(imagePath) {
    // Convert the relative path to public folder path
    return getImagePath(imagePath);
  }

  // Get default category images
  getDefaultCategoryImage(category) {
    // Try to get image from local assets first
    const localImage = getCategoryImage(category);
    if (localImage) {
      return localImage;
    }
    
    // Fallback to default category image
    return getDefaultCategoryImage();
  }

  // Get default region images  
  getDefaultRegionImage(region) {
    // Try to get image from local assets first
    const localImage = getRegionImage(region);
    if (localImage) {
      return localImage;
    }
    
    // Fallback to default region image
    return getDefaultRegionImage();
  }

  // Product Methods
  getAllProducts() { 
    return this.transformedData.products;
  }

  getProductById(id) {
    return this.transformedData.products.find(product => product.id === parseInt(id));
  }

  getRawProductById(id) {
    // Find raw product data by searching through rawData.products
    for (const categoryData of this.rawData.products) {
      const product = categoryData.items.find(item => item.id === parseInt(id));
      if (product) {
        return product;
      }
    }
    return null;
  }

  getFeaturedProducts() {
    return this.transformedData.products.filter(product => product.featured);
  }

  getProductsByCategory(category) {
    return this.transformedData.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  getProductsByRegion(region) {
    return this.transformedData.products.filter(product => 
      product.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  searchProducts(query) {
    if (!query) return this.transformedData.products;
    
    const searchTerm = query.toLowerCase();
    return this.transformedData.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.region.toLowerCase().includes(searchTerm) ||
      product.artisan.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  filterProducts(filters) {
    let filteredProducts = this.transformedData.products;

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(product => {
        // Handle both display format ("Wall Hanging") and raw format ("Wall_Hanging")
        const productCategory = product.category;
        const filterCategory = filters.category;
        
        // Try exact match first
        if (productCategory === filterCategory) {
          return true;
        }
        
        // Try comparing normalized versions (replace underscores with spaces and vice versa)
        const normalizedProductCategory = productCategory.replace(/_/g, ' ');
        const normalizedFilterCategory = filterCategory.replace(/\s/g, '_');
        
        return normalizedProductCategory === filterCategory || 
               productCategory === normalizedFilterCategory;
      });
    }

    // Filter by region
    if (filters.region && filters.region !== 'All') {
      filteredProducts = filteredProducts.filter(product =>
        product.region === filters.region
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(product =>
        product.price >= min && product.price <= max
      );
    }

    // Filter by rating
    if (filters.minRating) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= filters.minRating
      );
    }

    // Filter by availability
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product =>
        product.inStock
      );
    }

    // Sort results
    if (filters.sortBy) {
      filteredProducts = this.sortProducts(filteredProducts, filters.sortBy);
    }

    return filteredProducts;
  }

  sortProducts(products, sortBy) {
    const productsCopy = [...products];
    
    switch (sortBy) {
      case 'price-low-high':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return productsCopy.sort((a, b) => b.reviews - a.reviews);
      case 'name':
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return productsCopy.sort((a, b) => b.id - a.id);
      default:
        return productsCopy;
    }
  }

  // Category Methods
  getAllCategories() {
    return this.transformedData.categories;
  }

  getCategoryById(id) {
    return this.transformedData.categories.find(category => category.id === id);
  }

  getCategoryNames() {
    return this.transformedData.categories.map(category => category.name);
  }

  // Region Methods
  getAllRegions() {
    return this.transformedData.regions;
  }

  getRegionById(id) {
    return this.transformedData.regions.find(region => region.id === id);
  }

  getRegionNames() {
    return this.transformedData.regions.map(region => region.name);
  }

  getUniqueRegionsFromProducts() {
    const regions = [...new Set(this.transformedData.products.map(product => product.region))];
    return regions.sort();
  }

  // Statistics Methods
  getProductCount() {
    return this.transformedData.products.length;
  }

  getCategoryCount() {
    return this.transformedData.categories.length;
  }

  getAveragePrice() {
    const productsWithPrice = this.transformedData.products.filter(product => product.price);
    const total = productsWithPrice.reduce((sum, product) => sum + product.price, 0);
    return Math.round(total / productsWithPrice.length);
  }

  getPriceRange() {
    const productsWithPrice = this.transformedData.products.filter(product => product.price);
    const prices = productsWithPrice.map(product => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  // Related Products
  getRelatedProducts(productId, limit = 4) {
    const product = this.getProductById(productId);
    if (!product) return [];

    // Get products from same category, excluding current product
    const related = this.transformedData.products.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.region === product.region)
    );

    // Sort by rating and return limited results
    return related
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Recommendations
  getRecommendations(limit = 6) {
    // Return highest rated products that are in stock
    return this.transformedData.products
      .filter(product => product.inStock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

// Create and export a singleton instance
const dataService = new DataService();
export default dataService;

// Also export the class for testing purposes
export { DataService };
