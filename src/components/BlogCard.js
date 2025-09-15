import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BlogCard Component - Individual blog post card
 * Features: Blog preview, author info, reading time, engagement stats
 * Props: blog (object), featured (boolean)
 */
const BlogCard = ({ blog, featured = false }) => {
  const {
    id,
    title,
    excerpt,
    author,
    category,
    tags,
    publishedAt,
    readTime,
    image,
    likes,
    comments
  } = blog;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Crafts': 'bg-teal-500',
      'Textiles': 'bg-purple-500',
      'Sustainability': 'bg-teal-500',
      'Culture': 'bg-orange-500',
      'Artists': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <article className={`group cursor-pointer ${featured ? 'md:col-span-1' : ''}`}>
      <Link to={`/blog/${id}`} className="block">
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl overflow-hidden hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary-color)]/20">
          {/* Blog Image */}
          <div className="relative overflow-hidden">
            <div 
              className={`w-full ${featured ? 'h-64' : 'h-48'} bg-gray-700 bg-cover bg-center group-hover:scale-105 transition-transform duration-300`}
              style={{ backgroundImage: `url("${image}")` }}
              role="img"
              aria-label={title}
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(category)}`}>
                  {category}
                </span>
              </div>

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

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likes}</span>
              </div>
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
