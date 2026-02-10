import axios from "axios";

// Base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-wei5.onrender.com";

/**
 * Blog API Service
 * Handles all blog-related API calls (public and admin)
 */

// ==================== PUBLIC ENDPOINTS ====================

/**
 * List published blog posts
 * @param {Object} params - Query parameters (q, tag, sort)
 * @returns {Promise} Response with posts array
 */
export const getPublishedPosts = async (params = {}) => {
  const { q, tag, sort = "newest" } = params;
  const queryParams = new URLSearchParams();
  
  if (q) queryParams.append("q", q);
  if (tag) queryParams.append("tag", tag);
  if (sort) queryParams.append("sort", sort);
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/blog/posts${queryString ? `?${queryString}` : ""}`;
  
  const response = await axios.get(url);
  return response.data;
};

/**
 * Get published post by slug
 * @param {string} slug - Post slug
 * @returns {Promise} Post object with full content
 */
export const getPostBySlug = async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/api/blog/posts/${slug}`);
  return response.data;
};

/**
 * List published tags with counts
 * @returns {Promise} Response with tags array
 */
export const getPublishedTags = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/blog/tags`);
  return response.data;
};

/**
 * List approved comments for a post
 * @param {string} postId - MongoDB ObjectId of the post
 * @returns {Promise} Response with comments array
 */
export const getPostComments = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/api/blog/posts/${postId}/comments`);
  return response.data;
};

/**
 * Create a comment on a published post
 * @param {string} postId - MongoDB ObjectId of the post
 * @param {Object} commentData - Comment data (name, email, content)
 * @returns {Promise} Created comment object
 */
export const createComment = async (postId, commentData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/blog/posts/${postId}/comments`,
    commentData
  );
  return response.data;
};

// ==================== ADMIN ENDPOINTS ====================

/**
 * List all posts (admin) - includes drafts and published
 * @param {string} token - JWT token
 * @param {Object} params - Query parameters (status, q, tag, sort)
 * @returns {Promise} Response with posts array
 */
export const getAdminPosts = async (token, params = {}) => {
  const { status = "all", q, tag, sort = "newest" } = params;
  const queryParams = new URLSearchParams();
  
  if (status) queryParams.append("status", status);
  if (q) queryParams.append("q", q);
  if (tag) queryParams.append("tag", tag);
  if (sort) queryParams.append("sort", sort);
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/blog/admin/posts${queryString ? `?${queryString}` : ""}`;
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Get post by ID (admin) - includes full content regardless of status
 * @param {string} token - JWT token
 * @param {string} postId - MongoDB ObjectId
 * @returns {Promise} Post object with full content
 */
export const getAdminPostById = async (token, postId) => {
  const response = await axios.get(`${API_BASE_URL}/api/blog/admin/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Create a new blog post (admin)
 * @param {string} token - JWT token
 * @param {Object} postData - Post data (title, excerpt, content, coverImage, tags)
 * @returns {Promise} Created post object
 */
export const createBlogPost = async (token, postData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/blog/admin/posts`,
    postData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * Update a blog post (admin)
 * @param {string} token - JWT token
 * @param {string} postId - MongoDB ObjectId
 * @param {Object} postData - Partial post data to update
 * @returns {Promise} Updated post object
 */
export const updateBlogPost = async (token, postId, postData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/blog/admin/posts/${postId}`,
    postData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * Delete a blog post (admin)
 * @param {string} token - JWT token
 * @param {string} postId - MongoDB ObjectId
 * @returns {Promise} Success message
 */
export const deleteBlogPost = async (token, postId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/blog/admin/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Publish a blog post (admin)
 * @param {string} token - JWT token
 * @param {string} postId - MongoDB ObjectId
 * @returns {Promise} Updated post object with status: "published"
 */
export const publishBlogPost = async (token, postId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/blog/admin/posts/${postId}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Unpublish a blog post (admin)
 * @param {string} token - JWT token
 * @param {string} postId - MongoDB ObjectId
 * @returns {Promise} Updated post object with status: "draft"
 */
export const unpublishBlogPost = async (token, postId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/blog/admin/posts/${postId}/unpublish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ==================== COMMENT MODERATION ENDPOINTS ====================

/**
 * List all comments for moderation (admin)
 * @param {string} token - JWT token
 * @param {Object} params - Query parameters (status)
 * @returns {Promise} Response with comments array
 */
export const getAdminComments = async (token, params = {}) => {
  const { status = "pending" } = params;
  const queryParams = new URLSearchParams();
  
  if (status) queryParams.append("status", status);
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/blog/admin/comments${queryString ? `?${queryString}` : ""}`;
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Approve a comment (admin)
 * @param {string} token - JWT token
 * @param {string} commentId - MongoDB ObjectId
 * @returns {Promise} Updated comment object with status: "approved"
 */
export const approveComment = async (token, commentId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/blog/admin/comments/${commentId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Delete a comment (admin)
 * @param {string} token - JWT token
 * @param {string} commentId - MongoDB ObjectId
 * @returns {Promise} Success message
 */
export const deleteComment = async (token, commentId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/blog/admin/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
