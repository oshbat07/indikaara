import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BlogCard Component - Individual blog post card
 * Features: Blog preview, author info, reading time, engagement stats
 * Props: blog (object), featured (boolean)
 */
const BlogCard = ({ blog, featured = false }) => {
  const {
    _id,
    slug,
    title,
    excerpt,
    coverImage,
    tags = [],
    publishedAt,
    createdAt,
  } = blog;
  
  // Use slug for URL, fallback to _id
  const blogId = slug || _id;
  
  // Default values for missing fields
  const image = coverImage || "/api/placeholder/400/300";
  const author = {
    name: "Indikaara Team",
    avatar: "/api/placeholder/40/40",
  };
  
  // Calculate read time from content length (if available)
  const readTime = 5; // Default, can be calculated from content if needed

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <article className={`group cursor-pointer ${featured ? 'md:col-span-1' : ''}`}>
      <Link to={`/blog/${blogId}`} className="block">
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl overflow-hidden hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary-color)]/20">
          {/* Blog Image */}
          <div className="relative overflow-hidden">
            <div 
              className={`w-full ${featured ? 'h-64' : 'h-48'} bg-gray-700 bg-cover bg-center group-hover:scale-105 transition-transform duration-300`}
              style={{ backgroundImage: `url("${image}")` }}
              role="img"
              aria-label={title}
            >
              {/* Tags Badge */}
              {tags.length > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-[var(--primary-color)]">
                    {tags[0]}
                  </span>
                </div>
              )}

              {/* Featured Badge */}
              {featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-[var(--primary-color)] text-white rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className={`font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary-color)] transition-colors ${featured ? 'text-xl' : 'text-lg'} line-clamp-2`}>
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs bg-[#1a1a1a] text-[var(--text-secondary)] rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 bg-gray-600 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${author.avatar}")` }}
                  role="img"
                  aria-label={author.name}
                />
                <div>
                  <p className="text-[var(--text-primary)] text-sm font-medium">
                    {author.name}
                  </p>
                  <p className="text-[var(--text-secondary)] text-xs">
                    {formatDate(publishedAt)}
                  </p>
                </div>
              </div>

              <div className="text-[var(--text-secondary)] text-xs">
                {readTime} min read
              </div>
            </div>

            {/* Published Date */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700 text-[var(--text-secondary)] text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(publishedAt || createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
