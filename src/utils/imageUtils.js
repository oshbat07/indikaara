/**
 * Image utilities for handling product images from public assets folder
 */

// Function to get the correct image path for React

export const getImagePath = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return null;

  // If the value is already an absolute URL (CDN or full URL), keep it as-is
  if (/^(https?:)?\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Remove the relative path prefix and convert to public folder path
  let cleanPath = imagePath.replace(/^\.\.\/\.\.\//, "");

  // Remove leading slash if present
  if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.slice(1);
  }

  // Ensure the path starts with assets/ for public folder access
  if (!cleanPath.startsWith("assets/")) {
    cleanPath = `assets/${cleanPath}`;
  }

  // Return the path with leading slash for public folder access
  return `/${cleanPath}`;
};

// Normalize an image entry for both old (string array) and new objects.
const extractImageUrl = (entry) => {
  if (!entry) return null;
  if (typeof entry === "string") return entry;
  if (typeof entry === "object") {
    return entry.url || entry.imageUrl || entry.path || null;
  }
  return null;
};

// Function to get the first available image from an array
export const getFirstImage = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const firstImageRaw = extractImageUrl(images[0]);
  const processedPath = getImagePath(firstImageRaw);

  const optimizedImage = getOptimizedImageUrl(processedPath);
  if (optimizedImage) {
    return optimizedImage;
  }

  return processedPath;
};

// Function to get all available images from an array
export const getAllImages = (images) => {
  if (!images || !Array.isArray(images)) {
    return [];
  }

  return images
    .map((imageEntry) => {
      const rawUrl = extractImageUrl(imageEntry);
      const adjusted = getImagePath(rawUrl);
      return getOptimizedImageUrl(adjusted);
    })
    .filter(Boolean);
};

// Default fallback image
export const getDefaultImage = () => {
  return "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
};

// Function to detect if device is mobile
export const isMobileDevice = () => {
  return window.innerWidth <= 768; // Common mobile breakpoint
};

// Function to get optimized image URL based on device
export const getOptimizedImageUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  // Normalize /public or /mob suffix (add missing slash if omitted)
  const normalizedUrl = url.replace(/\/?(public|mob)(?=$|[?#])/i, "/$1");

  // Handle CDN image delivery endpoint with public/mob variant tags
  const cdnPattern =
    /^https:\/\/imagedelivery\.net\/[^\/]+\/[^\/]+\/(public|mob)(?:$|[?#])/i;
  if (cdnPattern.test(normalizedUrl)) {
    const isMobile = isMobileDevice();
    return normalizedUrl.replace(
      /\/(public|mob)(?=$|[?#])/i,
      isMobile ? "/mob" : "/public",
    );
  }

  return normalizedUrl;
};

// Function to get all available images with device optimization
export const getAllImagesOptimized = (images) => {
  if (!images || !Array.isArray(images)) {
    return [];
  }

  return images
    .map((imageEntry) => {
      const rawUrl = extractImageUrl(imageEntry);
      const processedPath = getImagePath(rawUrl);
      return getOptimizedImageUrl(processedPath);
    })
    .filter(Boolean);
};
