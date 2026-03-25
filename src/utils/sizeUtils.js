/**
 * Utility functions for handling product sizes
 */

/**
 * Parse size string (e.g., "6 x 9 ft") into width and height numbers
 * @param {string} sizeStr - Size string like "6 x 9 ft" or "6 x 9"
 * @returns {Object|null} - { width: number, height: number } or null if parsing fails
 */
export const parseSizeString = (sizeStr) => {
  if (!sizeStr || typeof sizeStr !== "string") {
    return null;
  }

  // Normalize the string by removing quotes and units, then trim
  const cleaned = sizeStr
    .replace(/[“”’']/g, "") // remove curly and straight quotes
    .replace(/\s*(ft|feet)\s*/gi, "")
    .trim();

  // Match pattern like "6 x 9", "6x9", "6' x 9'" or "6 ft x 9 ft"
  const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)$/i);

  if (!match) {
    console.warn(`Could not parse size string: "${sizeStr}"`);
    return null;
  }

  const width = parseFloat(match[1]);
  const height = parseFloat(match[2]);

  return {
    width: isNaN(width) ? null : width,
    height: isNaN(height) ? null : height,
  };
};

/**
 * Format size object for API payload
 * @param {string|Object} size - Size string or already parsed size object
 * @returns {Object|null} - Formatted size object { width: number, height: number } or null
 */
export const formatSizeForAPI = (size) => {
  if (!size) {
    return null;
  }

  // If already an object with width/height, validate and return
  if (typeof size === "object" && size.width && size.height) {
    return {
      width: parseFloat(size.width),
      height: parseFloat(size.height),
    };
  }

  // Parse string format
  if (typeof size === "string") {
    return parseSizeString(size);
  }

  return null;
};
