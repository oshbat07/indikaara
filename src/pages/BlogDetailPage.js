import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/blog.css';

/**
 * BlogDetailPage Component - Individual blog post view
 * Features: Full blog content, author info, comments, related posts
 * Ready for API integration and authentication
 */
const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo - Will be updated when auth is integrated
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog data - Replace with API call later
  const mockBlog = {
    id: parseInt(id),
    title: 'The Art of Handcrafted Pottery: A Journey Through Clay',
    content: `
      <div class="prose prose-invert max-w-none">
        <p>Pottery making is one of the oldest and most enduring crafts in human history. From the earliest civilizations to modern artisans, the art of shaping clay into functional and beautiful objects has captured the imagination of craftspeople worldwide.</p>
        
        <h2>The Ancient Roots</h2>
        <p>In India, pottery traditions date back thousands of years. Archaeological evidence from the Indus Valley Civilization shows sophisticated pottery techniques that laid the foundation for modern ceramic arts.</p>
        
        <blockquote>
          "Working with clay is like having a conversation with the earth itself. Each piece tells a story of transformation." - Priya Sharma, Master Potter
        </blockquote>
        
        <h2>Traditional Techniques</h2>
        <p>Indian pottery encompasses various regional styles, each with unique characteristics:</p>
        <ul>
          <li><strong>Terracotta work</strong> from West Bengal</li>
          <li><strong>Blue pottery</strong> from Jaipur</li>
          <li><strong>Black pottery</strong> from Nizamabad</li>
          <li><strong>Khurja pottery</strong> from Uttar Pradesh</li>
        </ul>
        
        <h2>Modern Innovations</h2>
        <p>Today's artisans are blending traditional techniques with contemporary designs, creating pieces that honor the past while meeting modern aesthetic preferences.</p>
        
        <p>The process involves careful selection of clay, precise timing in firing, and an understanding of glazes that can only come from years of practice and dedication.</p>
      </div>
    `,
    author: {
      name: 'Priya Sharma',
      avatar: '/api/placeholder/80/80',
      bio: 'Master potter from Rajasthan with over 20 years of experience in traditional ceramic arts.',
      socialLinks: {
        instagram: '@priya_pottery',
        website: 'www.priyaceramics.com'
      }
    },
    category: 'Crafts',
    tags: ['pottery', 'ceramics', 'handmade', 'tradition'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    image: '/api/placeholder/800/400',
    likes: 45,
    commentsCount: 12,
    featured: true,
    metaDescription: 'Discover the ancient techniques and modern innovations in pottery making that bring beautiful ceramic pieces to life.'
  };

  const mockComments = [
    {
      id: 1,
      author: {
        name: 'Arjun Patel',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Beautiful article! I\'ve been interested in learning pottery for a while now. Do you offer any workshops?',
      publishedAt: '2024-01-16T09:30:00Z',
      likes: 3,
      replies: [
        {
          id: 2,
          author: {
            name: 'Priya Sharma',
            avatar: '/api/placeholder/40/40',
            isAuthor: true
          },
          content: 'Thank you! Yes, I do offer workshops in Jaipur. You can check my website for upcoming dates.',
          publishedAt: '2024-01-16T14:20:00Z',
          likes: 1
        }
      ]
    },
    {
      id: 3,
      author: {
        name: 'Meera Singh',
        avatar: '/api/placeholder/40/40'
      },
      content: 'The history section was particularly fascinating. It\'s amazing how these traditions have survived for millennia.',
      publishedAt: '2024-01-17T11:15:00Z',
      likes: 8
    }
  ];

  // Simulate API calls
  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchBlog(id);
    // fetchComments(id);
    // fetchRelatedBlogs(id);
    
    const timer = setTimeout(() => {
      setBlog(mockBlog);
      setComments(mockComments);
      setRelatedBlogs([]); // Will be populated later
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // TODO: Implement actual API calls
  const fetchBlog = async (blogId) => {
    try {
      setLoading(true);
      // const response = await fetch(`/api/blogs/${blogId}`);
      // const data = await response.json();
      // setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      // TODO: Show login prompt
      alert('Please sign in to like posts');
      return;
    }

    // TODO: Implement like API call
    setIsLiked(!isLiked);
    setBlog(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    // TODO: Implement comment API call
    const comment = {
      id: Date.now(),
      author: {
        name: 'Current User', // Will come from auth context
        avatar: '/api/placeholder/40/40'
      },
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
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

  if (!blog) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-[var(--primary-color)] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
      {/* Breadcrumb and Actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <nav aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link to="/" className="text-[var(--primary-color)] hover:underline">Home</Link>
            <span>/</span>
            <Link to="/blog" className="text-[var(--primary-color)] hover:underline">Blog</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium truncate max-w-xs">{blog.title}</span>
          </div>
        </nav>
        
        {/* Write Your Own Button */}
        {isAuthenticated && (
          <Link
            to="/blog/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Write Your Own
          </Link>
        )}
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[var(--primary-color)] text-white rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 bg-gray-600 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url("${blog.author.avatar}")` }}
              role="img"
              aria-label={blog.author.name}
            />
            <div>
              <p className="text-[var(--text-primary)] font-semibold">{blog.author.name}</p>
              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>•</span>
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Engagement Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a]'
              }`}
            >
              <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{blog.likes}</span>
            </button>

            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{blog.commentsCount}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <div 
            className="w-full h-96 bg-gray-700 bg-cover bg-center"
            style={{ backgroundImage: `url("${blog.image}")` }}
            role="img"
            aria-label={blog.title}
          />
        </div>
      </header>

      {/* Article Content */}
      <article className="mb-12">
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-700">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 text-sm bg-[#2a2a2a] text-[var(--text-secondary)] rounded-full hover:bg-[#3a3a3a] transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Author Bio */}
      <section className="mb-12 p-6 bg-[#2a2a2a] rounded-xl border border-gray-700">
        <div className="flex items-start gap-4">
          <div 
            className="w-16 h-16 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url("${blog.author.avatar}")` }}
            role="img"
            aria-label={blog.author.name}
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              About {blog.author.name}
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">{blog.author.bio}</p>
            {blog.author.socialLinks && (
              <div className="flex gap-4">
                {blog.author.socialLinks.instagram && (
                  <span className="text-[var(--primary-color)] text-sm">
                    📷 {blog.author.socialLinks.instagram}
                  </span>
                )}
                {blog.author.socialLinks.website && (
                  <span className="text-[var(--primary-color)] text-sm">
                    🌐 {blog.author.socialLinks.website}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "Share your thoughts..." : "Please sign in to comment"}
              disabled={!isAuthenticated}
              rows={4}
              className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={!isAuthenticated || !newComment.trim()}
            className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticated ? 'Post Comment' : 'Sign in to Comment'}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url("${comment.author.avatar}")` }}
                  role="img"
                  aria-label={comment.author.name}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {comment.author.name}
                    </span>
                    {comment.author.isAuthor && (
                      <span className="px-2 py-1 text-xs bg-[var(--primary-color)] text-white rounded-full">
                        Author
                      </span>
                    )}
                    <span className="text-sm text-[var(--text-secondary)]">
                      {formatTimeAgo(comment.publishedAt)}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {comment.likes}
                    </button>
                    <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                      Reply
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-600 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div 
                            className="w-8 h-8 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url("${reply.author.avatar}")` }}
                            role="img"
                            aria-label={reply.author.name}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[var(--text-primary)] text-sm">
                                {reply.author.name}
                              </span>
                              {reply.author.isAuthor && (
                                <span className="px-1 py-0.5 text-xs bg-[var(--primary-color)] text-white rounded-full">
                                  Author
                                </span>
                              )}
                              <span className="text-xs text-[var(--text-secondary)]">
                                {formatTimeAgo(reply.publishedAt)}
                              </span>
                            </div>
                            <p className="text-[var(--text-secondary)] text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Blog Link */}
      <div className="text-center">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </main>
  );
};

export default BlogDetailPage;
