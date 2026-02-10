import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAdminPosts,
  deleteBlogPost,
  publishBlogPost,
  unpublishBlogPost,
} from '../api/blogApi';
import '../styles/blog.css';

const AdminBlogPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('newest');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token, statusFilter, searchTerm, sort]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        status: statusFilter,
        sort,
      };
      if (searchTerm) params.q = searchTerm;
      
      const data = await getAdminPosts(token, params);
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.message || 'Failed to load blog posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(postId);
      await deleteBlogPost(token, postId);
      // Remove from list
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert(err.response?.data?.message || 'Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const handlePublish = async (postId) => {
    try {
      await publishBlogPost(token, postId);
      // Update post status in list
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, status: 'published', publishedAt: new Date().toISOString() }
          : post
      ));
    } catch (err) {
      console.error('Error publishing post:', err);
      alert(err.response?.data?.message || 'Failed to publish post');
    }
  };

  const handleUnpublish = async (postId) => {
    try {
      await unpublishBlogPost(token, postId);
      // Update post status in list
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, status: 'draft', publishedAt: null }
          : post
      ));
    } catch (err) {
      console.error('Error unpublishing post:', err);
      alert(err.response?.data?.message || 'Failed to unpublish post');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading && posts.length === 0) {
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
              Blog Management
            </h1>
            <p className="text-[var(--text-secondary)]">
              Manage all blog posts, drafts, and published content.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/blog/admin/comments"
              className="inline-flex items-center gap-2 bg-[#2a2a2a] text-[var(--text-primary)] px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Moderate Comments
            </Link>
            <Link
              to="/blog/create"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 text-sm bg-[#2a2a2a] border border-gray-600 placeholder-gray-400 text-[var(--text-primary)] rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
          />
        </div>

        {/* Status Filter and Sort */}
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] text-sm focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          
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

      {/* Posts Table */}
      <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)]">No posts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-[#3a3a3a] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-[var(--text-primary)] font-medium hover:text-[var(--primary-color)] transition-colors"
                        >
                          {post.title}
                        </Link>
                        {post.excerpt && (
                          <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blog/admin/edit/${post._id}`}
                          className="px-3 py-1 text-sm text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 rounded transition-colors"
                        >
                          Edit
                        </Link>
                        {post.status === 'published' ? (
                          <button
                            onClick={() => handleUnpublish(post._id)}
                            className="px-3 py-1 text-sm text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublish(post._id)}
                            className="px-3 py-1 text-sm text-green-400 hover:bg-green-400/10 rounded transition-colors"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={deletingId === post._id}
                          className="px-3 py-1 text-sm text-red-400 hover:bg-red-400/10 rounded transition-colors disabled:opacity-50"
                        >
                          {deletingId === post._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminBlogPage;
