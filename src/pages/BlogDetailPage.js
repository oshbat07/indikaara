import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/blog.css";
import { getPostBySlug, getPostComments, createComment } from "../api/blogApi";
import { useAuth } from "../context/AuthContext";

/**
 * BlogDetailPage Component - Individual blog post view
 * Features: Full blog content, author info, comments, related posts
 * Ready for API integration and authentication
 */
const BlogDetailPage = () => {
  const { id } = useParams(); // This is actually a slug from the API
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  // Fetch blog post and comments
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog post by slug
        const postData = await getPostBySlug(id);
        setBlog(postData);
        
        // Fetch comments for this post
        if (postData._id) {
          try {
            setCommentsLoading(true);
            const commentsData = await getPostComments(postData._id);
            setComments(commentsData.comments || []);
          } catch (err) {
            console.error("Error fetching comments:", err);
            setComments([]);
          } finally {
            setCommentsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.response?.data?.message || "Blog post not found");
        if (err.response?.status === 404) {
          // Post not found
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!blog?._id) return;
    
    if (!newComment.content.trim()) {
      alert("Please enter a comment");
      return;
    }
    
    if (!newComment.name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setSubmittingComment(true);
      
      const commentData = {
        name: newComment.name.trim(),
        content: newComment.content.trim(),
      };
      
      if (newComment.email.trim()) {
        commentData.email = newComment.email.trim();
      }
      
      const createdComment = await createComment(blog._id, commentData);
      
      // Add to comments list (it will be pending, so won't show until approved)
      setComments((prev) => [createdComment, ...prev]);
      
      // Reset form
      setNewComment({
        name: "",
        email: "",
        content: "",
      });
      
      alert("Comment submitted! It will be visible after admin approval.");
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert(err.response?.data?.message || "Failed to submit comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return formatDate(dateString);
      }
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

  if (error || !blog) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Blog post not found
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link
            to="/blog"
            className="text-[var(--primary-color)] hover:underline"
          >
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
            <Link
              to="/"
              className="text-[var(--primary-color)] hover:underline"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/blog"
              className="text-[var(--primary-color)] hover:underline"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium truncate max-w-xs">
              {blog.title}
            </span>
          </div>
        </nav>

      </div>

      {/* Article Header */}
      <header className="mb-8">
        {/* Tags Badge */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[var(--primary-color)] text-white rounded-full">
              {blog.tags[0]}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm text-[var(--text-secondary)]">
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
          {comments.length > 0 && (
            <>
              <span>•</span>
              <span>{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
            </>
          )}
        </div>

        {/* Featured Image */}
        {blog.coverImage && (
          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}
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


      {/* Comments Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name *"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
                className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
              />
              <input
                type="email"
                placeholder="Your email (optional)"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
              />
            </div>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              placeholder="Share your thoughts..."
              required
              rows={4}
              className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={!newComment.name.trim() || !newComment.content.trim() || submittingComment}
            className="mt-4 px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submittingComment ? "Submitting..." : "Post Comment"}
          </button>
        </form>

        {/* Comments List */}
        {commentsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 text-[var(--text-primary)] font-semibold">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {comment.name}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)]">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Back to Blog Link */}
      <div className="text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </main>
  );
};

export default BlogDetailPage;
