import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/blog.css';
import '../styles/quill-editor.css';
import { createBlogPost } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';

/**
 * CreateBlogPage Component - Blog creation form
 * Features: Rich text editor, image upload, tags, categories
 * Ready for API integration and authentication
 */
const CreateBlogPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});

  // Quill editor modules configuration - Industry standard setup
  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: function() {
          const tooltip = this.quill.theme.tooltip;
          const originalHide = tooltip.hide;
          
          tooltip.save = function() {
            const range = this.quill.getSelection(true);
            const value = this.textbox.value;
            if (value) {
              // Validate URL
              if (value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || value.startsWith('http://') || value.startsWith('https://')) {
                this.quill.insertEmbed(range.index, 'image', value, 'user');
              } else {
                alert('Please enter a valid image URL');
                return;
              }
            }
            tooltip.hide();
          };
          tooltip.hide = originalHide;
          tooltip.edit('image');
          tooltip.textbox.placeholder = 'Enter image URL';
        }
      }
    },
    clipboard: {
      matchVisual: false
    },
    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: function() {
            return true; // Allow tab to work normally
          }
        }
      }
    }
  }), []);

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  // Calculate word and character count
  const contentStats = useMemo(() => {
    const textContent = formData.content.replace(/<[^>]*>/g, '').trim();
    const words = textContent.split(/\s+/).filter(word => word.length > 0);
    return {
      characters: textContent.length,
      words: words.length,
      charactersNoSpaces: textContent.replace(/\s/g, '').length
    };
  }, [formData.content]);

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

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      coverImage: url
    }));
    
    // Set preview if valid URL
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      coverImage: ''
    }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));

    // Clear error when user starts typing
    if (errors.content) {
      setErrors(prev => ({
        ...prev,
        content: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Check if content has actual text (not just HTML tags)
    const textContent = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      alert('You must be logged in to create blog posts.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare tags array from comma-separated string
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // Prepare post data
      // formData.content is already HTML from Quill editor
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(), // This is HTML from Quill
      };

      if (formData.excerpt.trim()) {
        postData.excerpt = formData.excerpt.trim();
      }

      if (formData.coverImage.trim()) {
        postData.coverImage = formData.coverImage.trim();
      }

      if (tagsArray.length > 0) {
        postData.tags = tagsArray;
      }

      // Create blog post
      const newPost = await createBlogPost(token, postData);

      // Navigate to the new post (using slug)
      navigate(`/blog/${newPost.slug}`);
    } catch (err) {
      console.error('Error creating blog:', err);
      setError(err.response?.data?.message || 'Failed to create blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}
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

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleImageUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
          />
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Enter the URL of the cover image for your blog post.
          </p>
          {imagePreview && (
            <div className="mt-4 relative">
              <div className="rounded-lg overflow-hidden border-2 border-gray-600">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover"
                  onError={() => setImagePreview(null)}
                />
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Content *
          </label>
          <div className={`quill-editor-container ${errors.content ? 'error' : ''}`}>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write your blog content here. Use the toolbar to format your text."
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
              <span>{contentStats.words} {contentStats.words === 1 ? 'word' : 'words'}</span>
              <span>{contentStats.characters.toLocaleString()} characters</span>
              <span>{contentStats.charactersNoSpaces.toLocaleString()} characters (no spaces)</span>
            </div>
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content}</p>
            )}
          </div>
          <div className="mt-2 text-sm text-[var(--text-secondary)]">
            <p className="mb-1">
              Use the toolbar to format your content. Keyboard shortcuts: <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] border border-gray-600 rounded text-xs">Ctrl+B</kbd> Bold, <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] border border-gray-600 rounded text-xs">Ctrl+I</kbd> Italic, <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] border border-gray-600 rounded text-xs">Ctrl+K</kbd> Link
            </p>
          </div>
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
                Creating...
              </span>
            ) : (
              'Create Blog Post (Draft)'
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
