import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProduct";

const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products = [], isLoading, isError } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedSort, setSelectedSort] = useState("featured");

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
      result.sort((a, b) => a.price[0]?.amount - b.price[0]?.amount);
    } else if (selectedSort === "price-high-low") {
      result.sort((a, b) => b.price[0]?.amount - a.price[0]?.amount);
    } else if (selectedSort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, searchTerm, selectedCategory, selectedSort]);

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
      <div className="container mx-auto px-4 py-8 max-w-7xl text-center">
        <div className="text-primary text-xl">Loading products...</div>
      </div>
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
      className="container mx-auto px-4 -mt-[130px] md:-mt-[146px] lg:-mt-[162px] pt-[130px] md:pt-[146px] lg:pt-[162px] max-w-7xl"
      role="main"
    >
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
          Handcrafted Treasures
        </h1>
        <p className="text-lg text-secondary">
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
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              ...product,
              category: product.category,
              storyTitle: product.name,
              storyDescription: product.description,
            }}
            onClick={handleProductClick}
          />
        ))}
      </div>

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
