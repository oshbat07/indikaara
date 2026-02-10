import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "../styles/blog.css";
import { getPublishedPosts, getPublishedTags } from "../api/blogApi";

/**
 * BlogPage Component - Main blog listing page
 * Features: Blog post listing, search, tag filtering, sorting
 */
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sort, setSort] = useState("newest");

  // Fetch published posts and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch posts with search and tag filters
        const params = {
          sort,
        };
        if (searchTerm) params.q = searchTerm;
        if (selectedTag) params.tag = selectedTag;
        
        const [postsData, tagsData] = await Promise.all([
          getPublishedPosts(params),
          getPublishedTags(),
        ]);
        
        setBlogs(postsData.posts || []);
        setTags(tagsData.tags || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.response?.data?.message || "Failed to load blog posts");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedTag, sort]);

  // Debounced search - update searchTerm after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      // Search is handled by API, so we just need to trigger refetch
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle search input with debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle tag filter
  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-8 pt-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 -mt-[110px] md:-mt-[126px] lg:-mt-[142px] pt-[110px] md:pt-[146px] lg:pt-[162px]">
      {/* Breadcrumb */}
      {/* <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="text-[var(--primary-color)] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--primary-color)] font-medium">Blog</span>
        </div>
      </nav> */}

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Craft Stories & Insights
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
              Discover the rich heritage, techniques, and stories behind India's
              finest handicrafts through our blog.
            </p>
          </div>

          {/* Create Blog Button - Always visible */}
          <div className="flex-shrink-0">
            <Link
              to="/blog/create"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Write a Blog Post
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Blogs Section */}
      {/* {featuredBlogs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredBlogs.slice(0, 2).map((blog) => (
              <BlogCard key={blog.id} blog={blog} featured={true} />
            ))}
          </div>
        </section>
      )} */}

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-[var(--text-secondary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-3 text-sm bg-[#2a2a2a] border border-gray-600 placeholder-gray-400 text-[var(--text-primary)] rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
          />
        </div>

        {/* Tag Filter and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedTag
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a] hover:text-[var(--text-primary)]"
                }`}
              >
                All
              </button>
              {tags.slice(0, 10).map((tagObj) => (
                <button
                  key={tagObj.tag}
                  onClick={() => handleTagClick(tagObj.tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tagObj.tag
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tagObj.tag} ({tagObj.count})
                </button>
              ))}
            </div>
          )}
          
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] text-sm focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Blog Grid */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {searchTerm || selectedTag
              ? `${blogs.length} ${
                  blogs.length === 1 ? "post" : "posts"
                } found`
              : "Latest Posts"}
          </h2>
        </div>

        {blogs.length === 0 && !loading ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-[var(--text-secondary)] mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              No posts found
            </h3>
            <p className="text-[var(--text-secondary)]">
              {searchTerm || selectedTag
                ? "Try adjusting your search or filter criteria."
                : "No blog posts have been published yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* TODO: Add pagination when API is integrated */}
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-8 right-8 lg:hidden">
        <Link
          to="/blog/create"
          className="flex items-center justify-center w-14 h-14 bg-[var(--primary-color)] text-white rounded-full shadow-2xl hover:bg-[var(--secondary-color)] transition-all duration-300 transform hover:scale-110"
          aria-label="Create new blog post"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
};

export default BlogPage;
