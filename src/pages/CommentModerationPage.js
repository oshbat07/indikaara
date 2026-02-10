import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAdminComments,
  approveComment,
  deleteComment,
} from '../api/blogApi';
import '../styles/blog.css';

const CommentModerationPage = () => {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchComments();
    }
  }, [token, statusFilter]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAdminComments(token, { status: statusFilter });
      setComments(data.comments || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err.response?.data?.message || 'Failed to load comments');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (commentId) => {
    try {
      setProcessingId(commentId);
      await approveComment(token, commentId);
      // Update comment status in list
      setComments(comments.map(comment => 
        comment._id === commentId 
          ? { ...comment, status: 'approved' }
          : comment
      ));
      // If filtering by pending, remove from list
      if (statusFilter === 'pending') {
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    } catch (err) {
      console.error('Error approving comment:', err);
      alert(err.response?.data?.message || 'Failed to approve comment');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }

    try {
      setProcessingId(commentId);
      await deleteComment(token, commentId);
      // Remove from list
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert(err.response?.data?.message || 'Failed to delete comment');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && comments.length === 0) {
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Comment Moderation
            </h1>
            <p className="text-[var(--text-secondary)]">
              Review and moderate comments on blog posts.
            </p>
          </div>
          <Link
            to="/blog/admin"
            className="inline-flex items-center gap-2 bg-[#2a2a2a] text-[var(--text-primary)] px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-colors"
          >
            Back to Blog Admin
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Status Filter */}
      <div className="mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'pending'
                ? 'bg-[var(--primary-color)] text-white'
                : 'bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a]'
            }`}
          >
            Pending ({comments.filter(c => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'approved'
                ? 'bg-[var(--primary-color)] text-white'
                : 'bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a]'
            }`}
          >
            Approved ({comments.filter(c => c.status === 'approved').length})
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-[#2a2a2a] rounded-lg border border-gray-700">
            <p className="text-[var(--text-secondary)]">
              {statusFilter === 'pending' 
                ? 'No pending comments to review.'
                : 'No approved comments.'}
            </p>
          </div>
        ) : (
          comments.map((comment) => (
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
                    {comment.email && (
                      <span className="text-sm text-[var(--text-secondary)]">
                        ({comment.email})
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        comment.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {comment.status}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  
                  {/* Post Reference */}
                  {comment.post && typeof comment.post === 'object' && (
                    <div className="mb-3">
                      <Link
                        to={`/blog/${comment.post.slug}`}
                        className="text-sm text-[var(--primary-color)] hover:underline"
                      >
                        Post: {comment.post.title}
                      </Link>
                      <span className="text-sm text-[var(--text-secondary)] ml-2">
                        ({comment.post.status})
                      </span>
                    </div>
                  )}
                  
                  <p className="text-[var(--text-secondary)] mb-4 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {comment.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(comment._id)}
                        disabled={processingId === comment._id}
                        className="px-4 py-2 text-sm bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                      >
                        {processingId === comment._id ? 'Processing...' : 'Approve'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={processingId === comment._id}
                      className="px-4 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    >
                      {processingId === comment._id ? 'Processing...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default CommentModerationPage;
