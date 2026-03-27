import React, { useState, useEffect } from "react";
const SizeSelector = ({
  priceOptions = [],
  onSizeSelect,
  selectedSize,
  hidePrices = false,
}) => {
  const [internalSelectedSize, setInternalSelectedSize] = useState(
    selectedSize || null,
  );

  const isSameSize = (a, b) => {
    // For string sizes (non-rugs)
    if (typeof a === "string" && typeof b === "string") {
      return a === b;
    }
    // For object sizes (rugs)
    if (!a || !b || typeof a !== "object" || typeof b !== "object")
      return false;
    return a.width === b.width && a.height === b.height;
  };

  useEffect(() => {
    setInternalSelectedSize(selectedSize || null);
  }, [selectedSize]);

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const toRoundedCm = (feet) => {
    const cm = Number(feet) * 30.48;
    return Math.round(cm / 5) * 5;
  };

  const parseSizeToFeet = (size) => {
    if (size && typeof size === "object") {
      return {
        width: Number(size.width) || 0,
        height: Number(size.height) || 0,
      };
    }

    if (typeof size === "string") {
      const match = size.match(
        /(\d+(?:\.\d+)?)\s*['"]?\s*[xX×]\s*(\d+(?:\.\d+)?)\s*['"]?/,
      );
      if (match) {
        return {
          width: Number(match[1]) || 0,
          height: Number(match[2]) || 0,
        };
      }
    }

    return null;
  };

  const getSizeText = (size) => {
    const parsed = parseSizeToFeet(size);

    if (!parsed || !parsed.width || !parsed.height) {
      return {
        primary: typeof size === "string" ? size : "Standard",
        secondary: "",
      };
    }

    return {
      primary: `${parsed.width}' x ${parsed.height}' ft`,
      secondary: `${toRoundedCm(parsed.width)} x ${toRoundedCm(parsed.height)} cm`,
    };
  };

  const handleSizeSelect = (size, amount) => {
    const alreadySelected = isSameSize(internalSelectedSize, size);
    const newSize = alreadySelected ? null : size;
    const newAmount = alreadySelected ? 0 : amount;

    setInternalSelectedSize(newSize);
    if (onSizeSelect) {
      onSizeSelect(newSize, newAmount);
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
    <div className="space-y-4 w-full">
      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
        Size (Feet / cm)
      </h3>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {priceOptions.map((option, index) => {
          const isSelected = isSameSize(internalSelectedSize, option.size);
          const sizeText = getSizeText(option.size);

          const getKey = () => {
            if (typeof option.size === "string")
              return `${option.size}-${index}`;
            return `${option.size.width || 0}x${option.size.height || 0}-${index}`;
          };

          return (
            <button
              key={getKey()}
              onClick={() => handleSizeSelect(option.size, option.amount)}
              className={`min-h-[70px] min-w-[118px] sm:min-w-[132px] flex flex-col items-center justify-center border rounded-sm text-center px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-transparent ${
                isSelected
                  ? "border-[#ac1f23] bg-[#0b0b0f] text-white shadow-md"
                  : "border-white/20 bg-gray-800/60 text-gray-200 hover:border-[#ac1f23]/70 hover:bg-gray-800"
              }`}
            >
              <span className="font-medium text-[13px] sm:text-[15px] leading-tight">
                {sizeText.primary}
              </span>
              <span
                className={`text-[11px] sm:text-[13px] leading-tight ${
                  isSelected ? "text-white/90" : "text-gray-300"
                }`}
              >
                {sizeText.secondary || " "}
              </span>
              {!hidePrices && option.amount > 0 && (
                <span className="mt-1 font-semibold text-[10px] sm:text-xs text-accent">
                  {formatPrice(option.amount)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {internalSelectedSize && (
        <div className="mt-2 p-2 bg-accent/5 border border-accent/30 rounded-md text-center max-w-sm mx-auto">
          <p className="text-[11px] sm:text-xs md:text-sm text-secondary">
            Selected Size:{" "}
            <span className="font-medium text-primary">
              {typeof internalSelectedSize === "object"
                ? `${internalSelectedSize.width} x ${internalSelectedSize.height}`
                : internalSelectedSize}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
