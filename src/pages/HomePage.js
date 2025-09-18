import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ArtisanStorySection from "../components/ArtisanStorySection";
import CategoryCarousel from "../components/CategoryCarousel";
import FeaturedArtisan from "../components/FeaturedArtisan";
import dataService from "../data/dataService";

/**
 * HomePage
 * --------------------------------------------------------------------------
 * Purpose:
 * - Acts as the primary landing page for Indikaara.
 * - Composes major homepage sections: Hero carousel, Brand Story, Brand Values,
 *   Category discovery grid, and a Featured Artisan highlight.
 *
 * Data Flow:
 * - Synchronously imports presentational components.
 * - On mount, fetches category metadata from dataService (local JSON layer),
 *   derives product counts per category, and stores a denormalized array of
 *   category items for rendering the discovery grid.
 *
 * Routing/Navigation:
 * - Leverages React Router's useNavigate to deep-link into Catalogue with a
 *   category query param (e.g., /catalogue?category=rugs).
 *
 * Accessibility & Semantics:
 * - Wraps page content in a <main role="main"> landmark for screen readers.
 * - Section headings use id/aria-labelledby pairs to improve nav and announce.
 *
 * Responsiveness:
 * - Tailwind utility classes drive spacing/typography per breakpoint.
 * - Hero and Brand Story are full-width; content sections are constrained to a
 *   max width container for readability.
 *
 * Performance Considerations:
 * - Simple client-side mapping; no eager network calls beyond dataService.
 * - Minimal state; derived props computed once on load.
 */
const HomePage = () => {
  const navigate = useNavigate();

  // State: list of category objects projected for the grid. Each item shape:
  // { id: string|number, title: string, image: string, link: string, count: number }
  const [categories, setCategories] = useState([]);

  // State: simple UI flag to guard content rendering while computing/collecting data.
  const [loading, setLoading] = useState(true);

  // Effect: bootstrap page data (categories) once on initial mount.
  // - Reads raw categories from dataService
  // - Computes product counts per category (via dataService.getProductsByCategory)
  // - Normalizes underscore_names to human titles
  // - Stores result and clears loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Source category metadata (local JSON-backed service)
        const categoriesData = dataService.getAllCategories();

        // Enrich with computed product counts and friendly titles
        const categoriesWithCount = categoriesData.map((category) => {
          const productCount = dataService.getProductsByCategory(
            category.name
          ).length;
          return {
            id: category.id,
            // Transform snake_case to Title Case friendly label for display
            title: category.name.replace(/_/g, " "),
            image: category.image,
            link: `/categories/${category.id}`,
            count: productCount,
          };
        });

        setCategories(categoriesWithCount);
        setLoading(false);
      } catch (error) {
        // Defensive: ensure UI continues rendering even if data fails
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handler: when a category tile is clicked, navigate to Catalogue filtered
  // by category. We normalize the title to a compact param (lowercase, no spaces)
  // e.g., "Vintage Rugs" -> /catalogue?category=vendagerugs
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.title}`);

    const categoryParam = category.title.toLowerCase().replace(/\s+/g, "");
    navigate(`/catalogue?category=${categoryParam}`);
  };

  // NOTE (Future): Regions discovery section
  // The regions block is intentionally disabled. To re-enable:
  // - Add `const [regions, setRegions] = useState([])` state
  // - Populate via dataService.getAllRegions() (shape: id, title, image, link)
  // - Render a grid of CategoryCard with onClick navigating similarly to categories
  // - Ensure aria-labelledby+heading structure mirrors other sections

  return (
    <main role="main">
      {/* HERO: Full-bleed carousel with slides, text overlays, and nav dots.
          - Composed in HeroSection
          - Visually anchors the page and sets brand tone
          - Full-viewport width irrespective of container constraints */}
      <HeroSection />
      {/* BRAND STORY: Full-width storytelling band directly under hero.
          - Provides short narrative of brand ethos
          - Has a soft gradient background for separation without heavy contrast
          - Center-constrained text for readability */}
      <section
        className="py-8 md:py-12 bg-gradient-to-b from-gray-900/50 to-gray-800/30 border-b border-gray-700/30"
        aria-labelledby="brand-story"
      >
        <div className="container mx-auto max-w-4xl px-4">
          {/* Lead-in sentence styled with a script font to create an emotional hook
              followed by a supporting paragraph in a serif for warmth. */}
          <p className="text-text-primary text-sm md:text-xl leading-relaxed text-center">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2rem",
                fontWeight: "700",
                color: "var(--accent-color)",
              }}
            >
              Every piece tells a tale.
            </span>{" "}
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                marginTop: "0.8rem",
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
      {/* WHAT WE DO: Modern section showcasing our core services and values
          - Clean, minimalist design with modern typography
          - Icon-based service cards with hover effects
          - Progressive disclosure pattern for better UX */}
      <section
        className="py-16 md:py-24 bg-white"
        aria-labelledby="what-we-do"
      >
        <div className="container mx-auto max-w-6xl px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              id="what-we-do"
              className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What we do?
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
            <p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: "300" }}
            >
              We bridge the gap between traditional Indian craftsmanship and modern homes, 
              bringing you authentic handmade pieces that tell stories of heritage and artistry.
            </p>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Service 1 */}
            <div className="group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3
                className="text-xl font-medium text-gray-900 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Curated Collections
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: "300" }}
              >
                Hand-selected artisan pieces that blend traditional craftsmanship 
                with contemporary aesthetics for your modern home.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3
                className="text-xl font-medium text-gray-900 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Artisan Stories
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: "300" }}
              >
                Connect with the makers behind each piece through authentic stories 
                of heritage, skill, and passion passed down through generations.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="text-xl font-medium text-gray-900 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cultural Preservation
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: "300" }}
              >
                Supporting traditional Indian crafts and artisan communities, 
                ensuring these timeless skills continue to thrive in the modern world.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => navigate('/catalogue')}
            >
              Explore Our Collection
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>



      {/* MAIN CONTENT CONTAINER: constrains reading width for dense sections */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* FOUNDATION PREVIEW: Brief introduction with link to dedicated page */}
        <section className="pt-16 mb-16" aria-labelledby="foundation-preview">
          <div className="text-center mb-12">
            <h2
              id="foundation-preview"
              className="text-4xl font-bold text-primary mb-3"
            >
              Our Foundation
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              The values that guide our journey in preserving Indian craftsmanship
            </p>
            <a
              href="/foundation"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More About Our Mission
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Loading gate: keeps layout stable while category data is prepared. */}
        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-primary text-xl">Loading...</div>
          </div>
        ) : (
          <>
            {/* CATEGORY DISCOVERY CAROUSEL
                - A beautiful carousel of CategoryCard tiles enabling quick nav.
                - Auto-scrolling with navigation controls and responsive design
                - Keyed by stable category id; click navigates to Catalogue with
                  a category query param. */}
            <section className="mt-16" aria-labelledby="categories-title">
              <div className="mb-12 text-center">
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

              <CategoryCarousel 
                categories={categories}
                onCategoryClick={handleCategoryClick}
              />
            </section>
      {/* ARTISAN STORY: Compelling section with scrolling banner and powerful messaging
          - Highlights the authentic craftsmanship narrative
          - Features scrolling text banner with key values
          - Call-to-action to explore artisan stories */}
          <section className="artisan-story-section" style={{marginTop: "4rem"}}>
            <ArtisanStorySection />
          </section>
            {/* FEATURED ARTISAN: spotlight module highlighting a maker/story. */}
            <FeaturedArtisan />
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
