import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterDropdown from '../components/FilterDropdown';
import ProductCard from '../components/ProductCard';
import dataService from '../data/dataService';

/**
 * CataloguePage Component - Main product catalogue page
 * Features: Product grid, filtering, search, and product stories
 */
const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Load products on component mount and handle URL parameters
  useEffect(() => {
    const loadProducts = () => {
      try {
        const allProducts = dataService.getAllProducts();
        setProducts(allProducts);
        
        // Check for category parameter in URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          // Convert URL param back to display format
          const rawCategoryNames = dataService.getCategoryNames();
          const displayCategoryNames = rawCategoryNames.map(name => name.replace(/_/g, ' '));
          
          // Find matching category by comparing URL param with display names
          const matchedCategory = displayCategoryNames.find(cat => 
            cat.toLowerCase().replace(/\s+/g, '') === categoryParam.toLowerCase()
          );
          
          if (matchedCategory) {
            setSelectedCategory(matchedCategory);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  // Get filter options from data
  const categories = useMemo(() => {
    const rawCategoryNames = dataService.getCategoryNames();
    const displayCategoryNames = rawCategoryNames.map(name => name.replace(/_/g, ' '));
    return ['All', ...displayCategoryNames];
  }, []);

  const regions = useMemo(() => {
    return ['All', ...dataService.getUniqueRegionsFromProducts()];
  }, []);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = dataService.searchProducts(searchTerm);
    }

    // Apply filters
    const filters = {
      category: selectedCategory,
      region: selectedRegion,
      sortBy: selectedSort
    };

    result = dataService.filterProducts(filters);
    return result;
  }, [products, searchTerm, selectedCategory, selectedRegion, selectedSort]);

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === 'All') {
      newSearchParams.delete('category');
    } else {
      // Convert display name to URL param (e.g., "Wall Hanging" -> "wallhanging")
      const urlParam = value.toLowerCase().replace(/\s+/g, '');
      newSearchParams.set('category', urlParam);
    }
    setSearchParams(newSearchParams);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  // Handle product click
  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    // Navigation is handled by ProductCard component
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-primary text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl" role="main">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
          Handcrafted Treasures
        </h1>
        <p className="text-lg text-secondary">
          Discover the soul of India through its rich heritage of arts and crafts.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg 
              aria-hidden="true" 
              className="w-5 h-5 text-secondary" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                clipRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                fillRule="evenodd"
              />
            </svg>
          </div>
          <input 
            className="block w-full p-3 pl-10 text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white rounded-[var(--border-radius-full)] focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors" 
            placeholder="Search products, artisans, categories..." 
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-center gap-3 p-3 flex-wrap mb-8">
        <FilterDropdown
          label="Category"
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
        {/* Region filter hidden as requested */}
        {/* 
        <FilterDropdown
          label="Region"
          options={regions}
          value={selectedRegion}
          onChange={handleRegionChange}
        />
        */}
        <FilterDropdown
          label="Sort By"
          options={sortOptions.map(opt => opt.label)}
          value={sortOptions.find(opt => opt.value === selectedSort)?.label || 'Featured'}
          onChange={(label) => {
            const sortOption = sortOptions.find(opt => opt.label === label);
            if (sortOption) handleSortChange(sortOption.value);
          }}
        />
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'All' || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 text-sm bg-[var(--primary-color)] text-white rounded-[var(--border-radius-full)]">
              Category: {selectedCategory}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setSelectedCategory('All')}
                aria-label="Remove category filter"
              >
                ×
              </button>
            </span>
          )}
          {/* Region filter badge hidden as requested */}
          {/* 
          {selectedRegion !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 text-sm bg-[var(--primary-color)] text-white rounded-[var(--border-radius-full)]">
              Region: {selectedRegion}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setSelectedRegion('All')}
                aria-label="Remove region filter"
              >
                ×
              </button>
            </span>
          )}
          */}
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 text-sm bg-[var(--primary-color)] text-white rounded-[var(--border-radius-full)]">
              Search: {searchTerm}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ×
              </button>
            </span>
          )}
          <button
            className="text-sm text-secondary hover:text-primary underline"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedRegion('All');
              setSearchTerm('');
              setSelectedSort('featured');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-secondary">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              category: product.category,
              state: product.region,
              craftType: product.category,
              artisan: product.artisan,
              storyTitle: product.name,
              storyDescription: product.description
            }}
            onClick={handleProductClick}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-primary mb-2">No products found</h3>
          <p className="text-secondary mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--accent-color)] underline"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedRegion('All');
              setSearchTerm('');
              setSelectedSort('featured');
            }}
          >
            Clear all filters and search
          </button>
        </div>
      )}
    </main>
  );
};

export default CataloguePage;
