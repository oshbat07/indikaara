import React, { useState, useEffect } from 'react';
const SizeSelector = ({ priceOptions = [], onSizeSelect, selectedSize }) => {
  const [internalSelectedSize, setInternalSelectedSize] = useState(selectedSize || '');

  useEffect(() => {
    setInternalSelectedSize(selectedSize || '');
  }, [selectedSize]);

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleSizeSelect = (size, amount) => {
    setInternalSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size, amount);
    }
  };

  if (!priceOptions || priceOptions.length === 0) {
    return (
      <div className="text-secondary">
        <p>No size options available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary mb-4">Select Size</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {priceOptions.map((option, index) => {
          const isSelected = internalSelectedSize === option.size;
          
          return (
            <button
              key={option.size + '-' + index}
              onClick={() => handleSizeSelect(option.size, option.amount)}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                isSelected
                  ? 'border-accent bg-accent/10 text-primary'
                  : 'border-gray-300 hover:border-accent/50 text-secondary hover:text-primary'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-base">{option.size}</span>
                  {isSelected && (
                    <div className="text-sm text-accent mt-1">
                      ✓ Selected
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-accent">
                    {formatPrice(option.amount)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {internalSelectedSize && (
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-secondary">
            Selected: <span className="font-medium text-primary">{internalSelectedSize}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;