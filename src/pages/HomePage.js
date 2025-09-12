import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import FeaturedArtisan from "../components/FeaturedArtisan";
import dataService from "../data/dataService";

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
        const categoriesWithCount = categoriesData.map((category) => {
          const productCount = dataService.getProductsByCategory(
            category.name
          ).length;
          return {
            id: category.id,
            title: category.name.replace(/_/g, " "), // Remove underscores and replace with spaces
            image: category.image,
            link: `/categories/${category.id}`,
            count: productCount,
          };
        });

        // Load regions data - removed since regions section is hidden

        setCategories(categoriesWithCount);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.title}`);

    // Navigate to catalogue page with category filter
    const categoryParam = category.title.toLowerCase().replace(/\s+/g, "");
    navigate(`/catalogue?category=${categoryParam}`);
  };

  // Handle region click
  // const handleRegionClick = (region) => {
  //   console.log(`Region clicked: ${region.title}`);
  //   // Future: Navigate to region page
  // };

  return (
    <main role="main">
      {/* Hero Section - Full Width */}
      <HeroSection />

      {/* Brand Story Section - Full Width */}
      <section
        className="py-8 md:py-12 bg-gradient-to-b from-gray-900/50 to-gray-800/30 border-b border-gray-700/30"
        aria-labelledby="brand-story"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-text-primary text-lg md:text-xl leading-relaxed text-center">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "3rem",
                fontWeight: "700",
                color: "var(--accent-color)",
              }}
            >
              Every piece tells a tale.
            </span>{" "}
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                marginTop: "1rem",
                fontStyle: "italic",
              }}
            >
              Our handpicked collection of unique rugs, vintage finds, and
              beautiful decor is here to help you create a home that feels
              uniquely you. We've traveled to find the perfect blend of warmth
              and character, so you can fill your space with items that bring
              you joy and comfort.
            </p>
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {" "}
        {/* Brand Values Section */}
        <section className="pt-16 mb-16" aria-labelledby="brand-values">
          <div className="text-center mb-12">
            <h2
              id="brand-values"
              className="text-4xl font-bold text-primary mb-3"
            >
              Our Foundation
            </h2>
            <p className="text-text-secondary text-lg">
              The values that guide our journey in preserving Indian
              craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand Vision Card */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-green-800/20 backdrop-blur-sm border border-emerald-700/30 rounded-xl p-6 text-center hover:from-emerald-800/40 hover:to-green-700/30 hover:border-emerald-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-emerald-500/30">
                <img
                  src={require("../assets/artisan-potter.png")}
                  alt="Brand Vision"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Our Vision
              </h3>
              <p className="text-text-secondary leading-relaxed">
                To preserve and celebrate India's rich artisan heritage by
                connecting traditional craftspeople with modern homes, ensuring
                every piece carries forward centuries of cultural wisdom and
                artistic excellence.
              </p>
            </div>

            {/* Brand Motto Card */}
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-800/20 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 text-center hover:from-amber-800/40 hover:to-orange-700/30 hover:border-amber-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-500/30">
                <img
                  src={require("../assets/artisan-rug-weaver.png")}
                  alt="Brand Motto"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Our Motto
              </h3>
              <p className="text-text-secondary leading-relaxed font-medium italic text-lg mb-2">
                "Handcrafted with Heart, Treasured Forever"
              </p>
              <p className="text-text-secondary leading-relaxed text-sm">
                Every piece we curate is more than just decor—it's a testament
                to the passion, skill, and soul of Indian artisans who pour
                their heritage into every creation.
              </p>
            </div>

            {/* Brand Values Card */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-800/20 backdrop-blur-sm border border-blue-700/30 rounded-xl p-6 text-center hover:from-blue-800/40 hover:to-indigo-700/30 hover:border-blue-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500/30">
                <img
                  src={require("../assets/artisan-wood-carver.png")}
                  alt="Brand Values"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Our Values
              </h3>
              <div className="text-text-secondary leading-relaxed space-y-2">
                <p className="font-medium">• Authenticity in every thread</p>
                <p className="font-medium">
                  • Sustainable artisan partnerships
                </p>
                <p className="font-medium">• Cultural heritage preservation</p>
                <p className="font-medium">
                  • Quality craftsmanship excellence
                </p>
                <p className="font-medium">• Empowering local communities</p>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-primary text-xl">Loading...</div>
          </div>
        ) : (
          <>
            {/* Shop by Category Section */}
            <section className="mt-16" aria-labelledby="categories-title">
              <div className="mb-8 text-center">
                <h2
                  id="categories-title"
                  className="text-4xl font-bold text-primary mb-3"
                >
                  Shop by Category
                </h2>
                <p className="text-text-secondary text-lg">
                  Discover authentic Indian handicrafts by category
                </p>
              </div>

              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 max-w-none">
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
      </div>
    </main>
  );
};

export default HomePage;
