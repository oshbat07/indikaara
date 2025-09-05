import React, { useState } from 'react';

/**
 * FilterDropdown Component - Reusable dropdown filter component
 * @param {string} label - Filter label
 * @param {Array} options - Array of filter options
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 */
const FilterDropdown = ({ label, options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-[var(--border-radius-full)] bg-gray-800 hover:bg-gray-700 transition-colors px-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Filter by ${label}`}
      >
        <p className="text-primary text-sm font-medium">{label}</p>
        <svg 
          fill="currentColor" 
          height="20px" 
          viewBox="0 0 256 256" 
          width="20px" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </button>
      
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-[var(--border-radius-md)] shadow-lg z-10 min-w-full">
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-700 first:rounded-t-[var(--border-radius-md)] last:rounded-b-[var(--border-radius-md)]"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
