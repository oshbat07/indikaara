import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/blog.css';
import '../styles/quill-editor.css';
import { getAdminPostById, updateBlogPost } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (token && id) {
      fetchPost();
    }
  }, [token, id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const post = await getAdminPostById(token, id);
      
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        tags: post.tags ? post.tags.join(', ') : '',
      });
      
      if (post.coverImage) {
        setImagePreview(post.coverImage);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.response?.data?.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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

    setSaving(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // formData.content is already HTML from Quill editor
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(), // This is HTML from Quill
      };

      if (formData.excerpt.trim()) {
        postData.excerpt = formData.excerpt.trim();
      } else {
        postData.excerpt = '';
      }

      if (formData.coverImage.trim()) {
        postData.coverImage = formData.coverImage.trim();
      } else {
        postData.coverImage = '';
      }

      if (tagsArray.length > 0) {
        postData.tags = tagsArray;
      } else {
        postData.tags = [];
      }

      const updatedPost = await updateBlogPost(token, id, postData);
      navigate(`/blog/${updatedPost.slug}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setError(err.response?.data?.message || 'Failed to update blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </main>
    );
  }

  if (error && !formData.title) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Blog post not found
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">{error}</p>
          <Link
            to="/blog/admin"
            className="text-[var(--primary-color)] hover:underline"
          >
            ← Back to Admin
          </Link>
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
          <Link to="/blog/admin" className="text-[var(--primary-color)] hover:underline">Admin</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium">Edit Post</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Edit Blog Post
        </h1>
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
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            placeholder="Write a brief summary of your blog post"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors resize-none"
          />
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
            disabled={saving}
            className="flex-1 py-4 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog/admin')}
            className="px-8 py-4 bg-[#2a2a2a] text-[var(--text-primary)] rounded-lg hover:bg-[#3a3a3a] transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditBlogPage;
