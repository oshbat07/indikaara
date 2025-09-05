import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Breadcrumb Component - Navigation breadcrumb for product pages
 * @param {Array} items - Array of breadcrumb items with label and path
 */
const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-secondary mb-8" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {index === items.length - 1 ? (
            <span className="text-primary" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.path} 
              className="hover:text-[var(--primary-color)] transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
