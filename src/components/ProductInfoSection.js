import React from 'react';

/**
 * ProductInfoSection Component - Displays detailed product information
 * @param {string} title - Section title
 * @param {string} content - Section content
 */
const ProductInfoSection = ({ title, content, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h2 className="text-2xl font-bold text-[var(--accent-color)]">
        {title}
      </h2>
      <p className="text-secondary leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default ProductInfoSection;
