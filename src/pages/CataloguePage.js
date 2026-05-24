import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProduct";

const CataloguePage = () => {
  const ITEMS_PER_BATCH = 30;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products = [], isLoading, isError } = useProducts();
  const loadMoreRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  // ✅ Handle category from URL (same logic as before)
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && products.length > 0) {
      const allCategories = [
        ...new Set(products.map((p) => p.category?.replace(/_/g, " "))),
      ];

      const matchedCategory = allCategories.find(
        (cat) =>
          cat?.toLowerCase().replace(/\s+/g, "") ===
          categoryParam.toLowerCase(),
      );

      if (matchedCategory) setSelectedCategory(matchedCategory);
    }
  }, [searchParams, products]);

  // ✅ Derive filter options dynamically from products
  const categories = useMemo(() => {
    const allCats = [
      ...new Set(products.map((p) => p.category?.replace(/_/g, " "))),
    ];
    return ["All", ...allCats.filter(Boolean)];
  }, [products]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
    { value: "newest", label: "Newest First" },
  ];

  const normalizeProductPrice = (price) => {
    if (Array.isArray(price) && price.length > 0) {
      const values = price
        .map((item) =>
          item && typeof item === "object"
            ? Number(item.amount ?? item.price ?? 0)
            : Number(item) || 0,
        )
        .filter((val) => !Number.isNaN(val));
      return values.length > 0 ? Math.min(...values) : 0;
    }

    return Number(price) || 0;
  };

  // ✅ Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category?.replace(/_/g, " ") === selectedCategory,
      );
    }

    // Sorting
    if (selectedSort === "price-low-high") {
      result.sort((a, b) => {
        const priceA = normalizeProductPrice(a.price);
        const priceB = normalizeProductPrice(b.price);
        return priceA - priceB;
      });
    } else if (selectedSort === "price-high-low") {
      result.sort((a, b) => {
        const priceA = normalizeProductPrice(a.price);
        const priceB = normalizeProductPrice(b.price);
        return priceB - priceA;
      });
    } else if (selectedSort === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (selectedSort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(b.createdAt || 0);
        const dateB = new Date(a.createdAt || 0);
        return dateA - dateB;
      });
    }

    return result;
  }, [products, searchTerm, selectedCategory, selectedSort]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount],
  );

  const hasMoreProducts = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [searchTerm, selectedCategory, selectedSort, products, ITEMS_PER_BATCH]);

  useEffect(() => {
    if (!hasMoreProducts || !loadMoreRef.current) return;

    // Incrementally render products as user reaches the sentinel.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_BATCH, filteredProducts.length),
        );
      },
      {
        root: null,
        rootMargin: "280px 0px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMoreProducts, filteredProducts.length, ITEMS_PER_BATCH]);

  // ✅ Handlers (same as before)
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === "All") newSearchParams.delete("category");
    else
      newSearchParams.set("category", value.toLowerCase().replace(/\s+/g, ""));
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (value) => setSelectedSort(value);

  // ✅ Handle product click (for navigation or modal)
  const handleProductClick = (product) => {};

  // ✅ Loading / Error states
  if (isLoading) {
    return (
      <main
        className="container mx-auto px-4 pt-6 md:pt-8 lg:pt-10 max-w-7xl"
        role="main"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
            Loading products
          </h1>
          <p className="text-sm md:text-base text-secondary">
            Curating handcrafted treasures for you...
          </p>
        </div>

        <div className="mb-8 h-11 w-full max-w-md mx-auto rounded-full border border-gray-700 bg-gray-800/70 animate-pulse" />

        <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
          <div className="h-10 w-32 rounded-full border border-gray-700 bg-gray-800/70 animate-pulse" />
          <div className="h-10 w-32 rounded-full border border-gray-700 bg-gray-800/70 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-12 min-h-[55vh]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`catalogue-skeleton-${index}`}
              className="rounded-xl border border-gray-700 bg-gray-800/60 p-3 animate-pulse"
            >
              <div className="aspect-[4/5] w-full rounded-lg bg-gray-700/70 mb-3" />
              <div className="h-4 w-4/5 rounded bg-gray-700/70 mb-2" />
              <div className="h-3 w-3/5 rounded bg-gray-700/60 mb-3" />
              <div className="h-4 w-2/5 rounded bg-gray-700/70" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 pt-6 md:pt-8 lg:pt-10 max-w-7xl"
      role="main"
    >
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 leading-tight">
          Handcrafted Treasures
        </h1>
        <p className="text-base md:text-[1.05rem] text-secondary">
          Discover the soul of India through its rich heritage of arts and
          crafts.
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
        <FilterDropdown
          label="Sort By"
          options={sortOptions.map((opt) => opt.label)}
          value={
            sortOptions.find((opt) => opt.value === selectedSort)?.label ||
            "Featured"
          }
          onChange={(label) => {
            const sortOption = sortOptions.find((opt) => opt.label === label);
            if (sortOption) handleSortChange(sortOption.value);
          }}
        />
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== "All" || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center px-3 py-1 text-sm bg-[var(--primary-color)] text-white rounded-[var(--border-radius-full)]">
              Category: {selectedCategory}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setSelectedCategory("All")}
                aria-label="Remove category filter"
              >
                ×
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 text-sm bg-[var(--primary-color)] text-white rounded-[var(--border-radius-full)]">
              Search: {searchTerm}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            </span>
          )}
          <button
            className="text-sm text-secondary hover:text-primary underline"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedRegion("All");
              setSearchTerm("");
              setSelectedSort("featured");
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-secondary">
          Showing {visibleProducts.length} of {filteredProducts.length} filtered
          products ({products.length} total)
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              ...product,
              category: product.category,
              storyTitle: product.name,
              storyDescription: product.description,
            }}
            compact
            onClick={handleProductClick}
          />
        ))}
      </div>

      {hasMoreProducts && (
        <div ref={loadMoreRef} className="py-8 text-center text-secondary">
          Loading more products...
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-primary mb-2">
            No products found
          </h3>
          <p className="text-secondary mb-4">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--accent-color)] underline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchTerm("");
              setSelectedSort("featured");
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
