import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import FeaturedArtisan from '../components/FeaturedArtisan';
import dataService from '../data/dataService';

/**
 * HomePage Component - Main landing page for Indikaara
 * Features: Hero section, category browsing, regional shopping, and featured artisan
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load categories from JSON
        const categoriesData = dataService.getAllCategories();
        
        // Add product count for each category
        const categoriesWithCount = categoriesData.map(category => {
          const productCount = dataService.getProductsByCategory(category.name).length;
          return {
            id: category.id,
            title: category.name.replace(/_/g, ' '), // Remove underscores and replace with spaces
            image: category.image,
            link: `/categories/${category.id}`,
            count: productCount
          };
        });

        // Load regions data - removed since regions section is hidden

        setCategories(categoriesWithCount);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.title}`);
    
    // Navigate to catalogue page with category filter
    const categoryParam = category.title.toLowerCase().replace(/\s+/g, '');
    navigate(`/catalogue?category=${categoryParam}`);
  };

  // Handle region click
  // const handleRegionClick = (region) => {
  //   console.log(`Region clicked: ${region.title}`);
  //   // Future: Navigate to region page
  // };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8" role="main">
      {/* Hero Section */}
      <HeroSection />

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-primary text-xl">Loading...</div>
        </div>
      ) : (
        <>
          {/* Shop by Category Section */}
          <section className="mt-16" aria-labelledby="categories-title">
            <div className="mb-8 text-center">
              <h2 id="categories-title" className="text-4xl font-bold text-primary mb-3">
                Shop by Category
              </h2>
              <p className="text-text-secondary text-lg">
                Discover authentic Indian handicrafts by category
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-1 gap-16 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-none">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    image={category.image}
                    title={category.title}
                    link={category.link}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Region Section - Hidden */}
          {/* 
          <section className="mt-16" aria-labelledby="regions-title">
            <div className="mb-8 text-center">
              <h2 id="regions-title" className="text-4xl font-bold text-primary mb-3">
                Shop by Region
              </h2>
              <p className="text-text-secondary text-lg">
                Explore crafts from different regions of India
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((region) => (
                <CategoryCard
                  key={region.id}
                  image={region.image}
                  title={region.title}
                  link={region.link}
                  onClick={() => handleRegionClick(region)}
                />
              ))}
            </div>
          </section>
          */}

          {/* Featured Artisan Section */}
          <FeaturedArtisan />
        </>
      )}
    </main>
  );
};

export default HomePage;
