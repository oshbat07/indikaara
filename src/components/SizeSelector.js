import React from 'react';

/**
 * SizeSelector Component - Allows users to select product size with respective pricing
 * @param {Array} dimensions - Available dimensions for the product
 * @param {string} priceRange - Price range string (e.g., "₹42,525.00 to ₹99,225.00")
 * @param {string} selectedSize - Currently selected size
 * @param {function} onSizeChange - Callback when size is changed
 * @param {function} onPriceChange - Callback when price changes based on size
 */
const SizeSelector = ({ 
  dimensions = [], 
  priceRange, 
  selectedSize, 
  onSizeChange, 
  onPriceChange 
}) => {
  // Extract min and max prices from price range string
  const extractPrices = (priceRangeString) => {
    if (!priceRangeString) return null;
    
    // Match prices in format "₹42,525.00 to ₹99,225.00" or "₹42,525.00 – ₹99,225.00"
    const priceRegex = /₹([\d,]+\.?\d*)\s*(?:to|–|-)\s*₹([\d,]+\.?\d*)/i;
    const match = priceRangeString.match(priceRegex);
    
    if (match) {
      const minPrice = parseFloat(match[1].replace(/,/g, ''));
      const maxPrice = parseFloat(match[2].replace(/,/g, ''));
      return { minPrice, maxPrice };
    }
    
    return null;
  };

  // Calculate price for a specific dimension based on size (assuming larger sizes cost more)
  const calculatePriceForDimension = (dimension, index, totalDimensions) => {
    const prices = extractPrices(priceRange);
    if (!prices) return null;
    
    const { minPrice, maxPrice } = prices;
    
    // Distribute prices evenly across dimensions (smallest to largest)
    const priceIncrement = (maxPrice - minPrice) / (totalDimensions - 1);
    const calculatedPrice = minPrice + (priceIncrement * index);
    
    return Math.round(calculatedPrice);
  };

  // Parse dimension to get area for sorting (e.g., "4 x 6 ft" -> 24)
  const getDimensionArea = (dimension) => {
    const match = dimension.match(/([\d.]+)\s*x\s*([\d.]+)/i);
    if (match) {
      return parseFloat(match[1]) * parseFloat(match[2]);
    }
    return 0;
  };

  // Sort dimensions by area (smallest to largest)
  const sortedDimensions = [...dimensions].sort((a, b) => {
    return getDimensionArea(a) - getDimensionArea(b);
  });

  // Handle size selection
  const handleSizeSelect = (dimension, index) => {
    onSizeChange(dimension);
    
    // Calculate and update price
    const calculatedPrice = calculatePriceForDimension(dimension, index, sortedDimensions.length);
    if (calculatedPrice && onPriceChange) {
      onPriceChange(calculatedPrice);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Don't render if only one dimension available
  if (!dimensions || dimensions.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Select Size</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {sortedDimensions.map((dimension, index) => {
          const calculatedPrice = calculatePriceForDimension(dimension, index, sortedDimensions.length);
          const isSelected = selectedSize === dimension;
          
          return (
            <button
              key={dimension}
              onClick={() => handleSizeSelect(dimension, index)}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10 text-primary'
                  : 'border-gray-300 hover:border-[var(--primary-color)]/50 text-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-base">{dimension}</span>
                  {isSelected && (
                    <div className="text-sm text-[var(--accent-color)] mt-1">
                      ✓ Selected
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {calculatedPrice && (
                    <span className="font-bold text-lg text-[var(--accent-color)]">
                      {formatPrice(calculatedPrice)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {priceRange && (
        <div className="text-sm text-gray-500 mt-2">
          <span>Price range: {priceRange}</span>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
