import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/blog.css';

/**
 * CreateBlogPage Component - Blog creation form
 * Features: Rich text editor, image upload, tags, categories
 * Ready for API integration and authentication
 */
const CreateBlogPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo - Will be updated when auth is integrated
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Crafts',
    tags: '',
    image: null,
    featured: false
  });
  const [errors, setErrors] = useState({});

  const categories = ['Crafts', 'Textiles', 'Sustainability', 'Culture', 'Artists'];

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      // TODO: Replace with actual auth check
      // For now, show a message that authentication is required
    }
  }, [isAuthenticated]);

  // Cleanup image preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('Image size must be less than 10MB');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 50) {
      newErrors.excerpt = 'Excerpt must be at least 50 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 200) {
      newErrors.content = 'Content must be at least 200 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual API call
      // const formDataToSend = new FormData();
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('excerpt', formData.excerpt);
      // formDataToSend.append('content', formData.content);
      // formDataToSend.append('category', formData.category);
      // formDataToSend.append('tags', formData.tags);
      // formDataToSend.append('featured', formData.featured);
      // if (formData.image) {
      //   formDataToSend.append('image', formData.image);
      // }

      // const response = await fetch('/api/blogs', {
      //   method: 'POST',
      //   body: formDataToSend,
      //   headers: {
      //     'Authorization': `Bearer ${authToken}`
      //   }
      // });

      // if (response.ok) {
      //   const newBlog = await response.json();
      //   navigate(`/blog/${newBlog.id}`);
      // }

      // For now, simulate success
      setTimeout(() => {
        alert('Blog post created successfully!');
        navigate('/blog');
      }, 2000);

    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show authentication required message
  if (!isAuthenticated) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <div className="mb-8">
            <svg className="w-16 h-16 mx-auto text-[var(--text-secondary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Authentication Required</h2>
            <p className="text-[var(--text-secondary)] text-lg mb-6">
              You need to sign in to create blog posts.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
                Sign In
              </button>
              <Link 
                to="/blog"
                className="px-6 py-3 bg-[#2a2a2a] text-[var(--text-primary)] rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Link to="/" className="text-[var(--primary-color)] hover:underline">Home</Link>
          <span>/</span>
          <Link to="/blog" className="text-[var(--primary-color)] hover:underline">Blog</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium">Create Post</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Create New Blog Post
        </h1>
        <p className="text-[var(--text-secondary)]">
          Share your craft knowledge and stories with the community.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter an engaging title for your blog post"
            className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            placeholder="Write a brief summary of your blog post (50-200 characters)"
            className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors resize-none ${
              errors.excerpt ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          <div className="flex justify-between mt-2">
            {errors.excerpt && (
              <p className="text-sm text-red-400">{errors.excerpt}</p>
            )}
            <p className="text-sm text-[var(--text-secondary)] ml-auto">
              {formData.excerpt.length}/200
            </p>
          </div>
        </div>

        {/* Category and Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors ${
                errors.category ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-400">{errors.category}</p>
            )}
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-[var(--primary-color)] bg-[#2a2a2a] border-gray-600 rounded focus:ring-[var(--primary-color)] focus:ring-2"
              />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                Mark as Featured
              </span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Enter tags separated by commas (e.g., pottery, ceramics, handmade)"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
          />
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Separate tags with commas. This helps readers find your content.
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Featured Image
          </label>
          
          {imagePreview ? (
            /* Image Preview */
            <div className="relative">
              <div className="rounded-lg overflow-hidden border-2 border-gray-600">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-4 p-4 bg-[#2a2a2a] rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-[var(--text-primary)] font-medium text-sm">
                      {formData.image?.name}
                    </p>
                    <p className="text-[var(--text-secondary)] text-xs">
                      {formData.image?.size ? (formData.image.size / (1024 * 1024)).toFixed(2) + ' MB' : ''}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            /* Upload Area */
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/5' 
                  : 'border-gray-600 hover:border-[var(--primary-color)]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('image').click()}
            >
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="space-y-4">
                <div className={`transition-colors duration-300 ${isDragOver ? 'text-[var(--primary-color)]' : 'text-[var(--text-secondary)]'}`}>
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-[var(--text-primary)] font-medium text-lg mb-2">
                    {isDragOver ? 'Drop your image here' : 'Upload Featured Image'}
                  </p>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Drag and drop an image or click to browse
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Choose File
                  </div>
                </div>
                
                <div className="text-xs text-[var(--text-secondary)] space-y-1">
                  <p>Supported formats: PNG, JPG, GIF, WebP</p>
                  <p>Maximum size: 10MB</p>
                  <p>Recommended dimensions: 1200x600px for best quality</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={20}
            placeholder="Write your blog content here. You can use HTML tags for formatting."
            className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors resize-y ${
              errors.content ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          <div className="flex justify-between mt-2">
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content}</p>
            )}
            <p className="text-sm text-[var(--text-secondary)] ml-auto">
              {formData.content.length} characters
            </p>
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Tip: You can use basic HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt; for formatting.
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-8 border-t border-gray-700">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Publishing...
              </span>
            ) : (
              'Publish Blog Post'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-8 py-4 bg-[#2a2a2a] text-[var(--text-primary)] rounded-lg hover:bg-[#3a3a3a] transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateBlogPage;
