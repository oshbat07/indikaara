import productsData from './products.json';

/**
 * Data Service - Handles all data operations for products, categories, and regions
 * Features: Product filtering, search, category management, and data retrieval
 */

class DataService {
  constructor() {
    this.data = productsData;
  }

  // Product Methods
  getAllProducts() { 
    return this.data.products;
  }

  getProductById(id) {
    return this.data.products.find(product => product.id === parseInt(id));
  }

  getFeaturedProducts() {
    return this.data.products.filter(product => product.featured);
  }

  getProductsByCategory(category) {
    return this.data.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  getProductsByRegion(region) {
    return this.data.products.filter(product => 
      product.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  searchProducts(query) {
    if (!query) return this.data.products;
    
    const searchTerm = query.toLowerCase();
    return this.data.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.region.toLowerCase().includes(searchTerm) ||
      product.artisan.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  filterProducts(filters) {
    let filteredProducts = this.data.products;

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
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
    return this.data.categories;
  }

  getCategoryById(id) {
    return this.data.categories.find(category => category.id === id);
  }

  getCategoryNames() {
    return this.data.categories.map(category => category.name);
  }

  // Region Methods
  getAllRegions() {
    return this.data.regions;
  }

  getRegionById(id) {
    return this.data.regions.find(region => region.id === id);
  }

  getRegionNames() {
    return this.data.regions.map(region => region.name);
  }

  getUniqueRegionsFromProducts() {
    const regions = [...new Set(this.data.products.map(product => product.region))];
    return regions.sort();
  }

  // Statistics Methods
  getProductCount() {
    return this.data.products.length;
  }

  getCategoryCount() {
    return this.data.categories.length;
  }

  getAveragePrice() {
    const total = this.data.products.reduce((sum, product) => sum + product.price, 0);
    return Math.round(total / this.data.products.length);
  }

  getPriceRange() {
    const prices = this.data.products.map(product => product.price);
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
    const related = this.data.products.filter(p => 
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
    return this.data.products
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
