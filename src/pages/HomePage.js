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

      {/* MAIN CONTENT CONTAINER: constrains reading width for dense sections */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* BRAND VALUES: Three themed cards describing Vision, Motto, Values
            - Each card uses a subtle gradient and matching border
            - Content is balanced, centered, and responsive across breakpoints */}
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
            {/* Card: Vision */}
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

            {/* Card: Motto */}
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

            {/* Card: Values */}
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
