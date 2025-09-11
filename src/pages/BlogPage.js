import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import '../styles/blog.css';

/**
 * BlogPage Component - Main blog listing page
 * Features: Blog post listing, search, categories, pagination
 * Ready for API integration
 */
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo - Will be updated when auth is integrated

  // Mock data - Replace with API call later
  const mockBlogs = [
    {
      id: 1,
      title: 'The Art of Handcrafted Pottery: A Journey Through Clay',
      excerpt: 'Discover the ancient techniques and modern innovations in pottery making that bring beautiful ceramic pieces to life.',
      content: 'Full blog content here...',
      author: {
        name: 'Priya Sharma',
        avatar: '/api/placeholder/40/40',
        bio: 'Master potter from Rajasthan'
      },
      category: 'Crafts',
      tags: ['pottery', 'ceramics', 'handmade'],
      publishedAt: '2024-01-15',
      readTime: 5,
      image: '/api/placeholder/600/300',
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: 'Preserving Traditional Textile Weaving in Modern Times',
      excerpt: 'How contemporary artisans are keeping age-old weaving traditions alive while adapting to modern market demands.',
      content: 'Full blog content here...',
      author: {
        name: 'Rajesh Kumar',
        avatar: '/api/placeholder/40/40',
        bio: 'Textile artist from Gujarat'
      },
      category: 'Textiles',
      tags: ['weaving', 'textiles', 'tradition'],
      publishedAt: '2024-01-12',
      readTime: 8,
      image: '/api/placeholder/600/300',
      likes: 67,
      comments: 23,
      featured: false
    },
    {
      id: 3,
      title: 'Sustainable Crafting: Eco-Friendly Materials in Indian Handicrafts',
      excerpt: 'Exploring how Indian artisans are incorporating sustainable practices and eco-friendly materials into their craft.',
      content: 'Full blog content here...',
      author: {
        name: 'Meera Patel',
        avatar: '/api/placeholder/40/40',
        bio: 'Environmental activist and craft enthusiast'
      },
      category: 'Sustainability',
      tags: ['sustainability', 'eco-friendly', 'environment'],
      publishedAt: '2024-01-10',
      readTime: 6,
      image: '/api/placeholder/600/300',
      likes: 89,
      comments: 34,
      featured: true
    },
    {
      id: 4,
      title: 'The Revival of Block Printing: From Tradition to Trend',
      excerpt: 'How block printing has evolved from a traditional craft to a modern fashion statement while maintaining its cultural roots.',
      content: 'Full blog content here...',
      author: {
        name: 'Arjun Singh',
        avatar: '/api/placeholder/40/40',
        bio: 'Block printing artist from Jaipur'
      },
      category: 'Crafts',
      tags: ['block-printing', 'fashion', 'tradition'],
      publishedAt: '2024-01-08',
      readTime: 7,
      image: '/api/placeholder/600/300',
      likes: 52,
      comments: 18,
      featured: false
    }
  ];

  const categories = ['all', 'Crafts', 'Textiles', 'Sustainability', 'Culture', 'Artists'];

  // Simulate API call
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchBlogs();
    
    const timer = setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // TODO: Implement actual API call
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // const response = await fetch('/api/blogs');
      // const data = await response.json();
      // setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured blogs
  const featuredBlogs = blogs.filter(blog => blog.featured);

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
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="text-[var(--primary-color)] hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[var(--primary-color)] font-medium">Blog</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Craft Stories & Insights
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
              Discover the rich heritage, techniques, and stories behind India's finest handicrafts through our blog.
            </p>
          </div>
          
          {/* Create Blog Button - Always visible */}
          <div className="flex-shrink-0">
            <Link
              to="/blog/create"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Write a Blog Post
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredBlogs.slice(0, 2).map((blog) => (
              <BlogCard key={blog.id} blog={blog} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 text-sm bg-[#2a2a2a] border border-gray-600 placeholder-gray-400 text-[var(--text-primary)] rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a] hover:text-[var(--text-primary)]'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {searchTerm || selectedCategory !== 'all' 
              ? `${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'post' : 'posts'} found`
              : 'Latest Posts'
            }
          </h2>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-[var(--text-secondary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No posts found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </main>
  );
};

export default BlogPage;
