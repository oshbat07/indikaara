import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ImageGallery from "../components/ImageGallery";
import Breadcrumb from "../components/Breadcrumb";
import SizeSelector from "../components/SizeSelector";
import Button from "../components/Button";
import { getAllImagesOptimized } from "../utils/imageUtils";
import { formatSizeForAPI } from "../utils/sizeUtils";
import axios from "axios";

// Removed unused MUI icon imports to clean up warnings
/**;
 * ProductDetailPage Component - Detailed product view with images, description, and purchase option
 * Features: Image gallery, breadcrumb navigation, product details, cultural context, artisan story
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [rawProductData, setRawProductData] = useState(null);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Quantity (will be adjusted to category minimum when product loads)
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [recommendedRugs, setRecommendedRugs] = useState([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const buildRecentlyViewedCard = (item) => {
    const firstPrice = Array.isArray(item?.price) ? item.price[0] : null;
    const price = Number(
      firstPrice?.price ?? firstPrice?.amount ?? item?.price ?? 0,
    );

    return {
      id: item?._id || item?.id,
      name: item?.name || "Product",
      image:
        (Array.isArray(item?.images) ? item.images[0] : "") ||
        (Array.isArray(item?.imageUrl)
          ? getAllImagesOptimized(item.imageUrl)[0]
          : "") ||
        item?.image ||
        "",
      materialText: Array.isArray(item?.materials)
        ? item.materials.filter(Boolean).join(" & ")
        : Array.isArray(item?.material)
          ? item.material.filter(Boolean).join(" & ")
          : "",
      category: item?.category || "",
      price,
    };
  };

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      try {
        // Get product from API
        const productData = await axios
          .get(`/api/products/${id}`)
          .then((res) => res.data);
        console.log("productdata", productData);
        if (productData) {
          // Transform product data to match component expectations
          const isRug =
            productData.category &&
            productData.category.toLowerCase() === "rugs";

          const basePrice = Array.isArray(productData.price)
            ? Number(
                productData.price[0]?.price ??
                  productData.price[0]?.amount ??
                  productData.price[0]?.value ??
                  0,
              )
            : Number(productData.price ?? 0);

          const transformedProduct = {
            id: productData.id,
            _id: productData._id,
            name: productData.name,
            description: productData.description,
            isRug: isRug,
            price: basePrice,
            priceOptions: Array.isArray(productData.price)
              ? productData.price.map((p) => ({
                  size: isRug ? formatSizeForAPI(p.size) : p.size,
                  label: p.size || "Standard",
                  amount: Number(p.price ?? p.amount ?? p.value ?? 0),
                }))
              : [
                  {
                    size: isRug ? { width: 0, height: 0 } : "Standard",
                    label: "Standard",
                    amount: Number(productData.price ?? 0),
                  },
                ],
            SKU: productData.SKU,
            images: getAllImagesOptimized(
              productData.imageUrl || productData.image || [],
            ),
            category: productData.category,
            subcategory: productData.manufacturer,
            region: "India", // From details: "Made in India"
            rating: null,
            reviews: [],
            inStock: true,
            features: productData.tags || [],
            tags: productData.tags,
            materials: Array.isArray(productData.material)
              ? productData.material.filter(Boolean)
              : [],
            dimensions: [isRug ? { width: 0, height: 0 } : "Standard"],
            artisan: {
              name: productData.manufacturer,
              location: "India",
              experience: "Expert Craftsmen",
              story: `Crafted by ${productData.manufacturer}, this piece exemplifies the finest in Indian craftsmanship. Each product is meticulously created using traditional techniques and premium materials.`,
            },
            culturalContext: `This ${productData.name.toLowerCase()} showcases the rich heritage of Indian craftsmanship. Made with ${
              productData.material?.[0]?.toLowerCase() || "premium materials"
            }, it represents the perfect blend of traditional artistry and contemporary design.`,
            craftingTechnique: `Created by skilled artisans at ${productData.manufacturer}, this piece is crafted using traditional metalworking techniques. Each detail is carefully considered to ensure both aesthetic appeal and durability.`,
            specifications: {
              material: productData.material?.[0] || "Traditional materials",
              color: productData.color?.[0] || "Standard",
              dimensions: Array.isArray(productData.price)
                ? productData.price[0]?.size || "Standard size"
                : productData.price || "Standard size",
              SKU: productData.SKU,
            },
          };

          setProduct(transformedProduct);
          setRawProductData(productData);

          // Set initial size and price from new priceOptions structure
          if (
            transformedProduct.priceOptions &&
            transformedProduct.priceOptions.length > 0
          ) {
            const firstOption = transformedProduct.priceOptions[0];
            setCurrentPrice(parseFloat(firstOption.amount) || 0);
            if (!isRug) {
              setSelectedSize(firstOption.size);
            } else {
              // Keep rug selection empty until user action
              setSelectedSize(null);
            }
          } else if (transformedProduct.price) {
            setCurrentPrice(parseFloat(transformedProduct.price) || 0);
            setSelectedSize(isRug ? null : "Standard");
          } else {
            // Fallback: ensure currentPrice is always set to a number
            setCurrentPrice(0);
            setSelectedSize(isRug ? null : "Standard");
          }

          // Load related products
          // const related = dataService.getRelatedProducts(parseInt(id), 4);
          // setRelatedProducts(related);

          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      }

      setLoading(false);
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // Update product images on window resize for device optimization
  useEffect(() => {
    if (!rawProductData) return;

    const handleResize = () => {
      const optimizedImages = getAllImagesOptimized(
        rawProductData.imageUrl || [],
      );
      setProduct((prev) =>
        prev ? { ...prev, images: optimizedImages } : null,
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rawProductData]);

  // Load 4 recommended products from the same category (or rugs for rug products).
  useEffect(() => {
    if (!product) return;

    const loadRecommendedRugs = async () => {
      try {
        const allProducts = await axios
          .get("/api/products")
          .then((res) => (Array.isArray(res.data) ? res.data : []));

        const currentId = String(product._id || product.id || id);
        const currentCategory = String(product.category || "")
          .trim()
          .toLowerCase();

        const rugs = allProducts
          .filter(
            (item) =>
              String(item._id || item.id) !== currentId &&
              String(item.category || "")
                .trim()
                .toLowerCase() === currentCategory,
          )
          .slice(0, 4)
          .map((item) => {
            const pricePerSqFt = Array.isArray(item.price)
              ? Number(item.price[0]?.price ?? item.price[0]?.amount ?? 0)
              : Number(item.price ?? 0);

            return {
              id: item._id || item.id,
              name: item.name || "Rug",
              image:
                getAllImagesOptimized(item.imageUrl || item.image || [])[0] ||
                "",
              materialText: Array.isArray(item.material)
                ? item.material.filter(Boolean).join(" & ")
                : "",
              category: item.category || "",
              pricePerSqFt,
            };
          });

        setRecommendedRugs(rugs);
      } catch (err) {
        console.error("Failed to load recommended rugs:", err);
        setRecommendedRugs([]);
      }
    };

    loadRecommendedRugs();
  }, [id, product]);

  // Track recently viewed product IDs and cache current product card payload.
  useEffect(() => {
    if (!product) return;

    const HISTORY_KEY = "indikaara-recently-viewed-product-ids";
    const CACHE_KEY = "indikaara-product-preview-cache";

    const currentPreview = buildRecentlyViewedCard({
      _id: product._id,
      id: product.id,
      name: product.name,
      images: product.images,
      materials: product.materials,
      category: product.category,
      price: product.price,
    });
    const currentId = String(currentPreview.id || "");
    if (!currentId) return;

    try {
      const existingIds = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      const normalizedIds = Array.isArray(existingIds)
        ? existingIds.map((value) => String(value))
        : [];

      const mergedIds = [
        currentId,
        ...normalizedIds.filter((value) => value !== currentId),
      ].slice(0, 20);

      localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedIds));

      const existingCache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
      const cache =
        existingCache && typeof existingCache === "object" ? existingCache : {};
      cache[currentId] = {
        cachedAt: Date.now(),
        data: currentPreview,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

      setRecentlyViewedIds(
        mergedIds.filter((value) => value !== currentId).slice(0, 4),
      );
    } catch (err) {
      console.error("Failed to update recently viewed products:", err);
      setRecentlyViewedIds([]);
      setRecentlyViewed([]);
    }
  }, [product]);

  // Resolve recently viewed cards by product ID using cache first, then API.
  useEffect(() => {
    if (!recentlyViewedIds.length) {
      setRecentlyViewed([]);
      return;
    }

    const CACHE_KEY = "indikaara-product-preview-cache";
    const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
    let isCancelled = false;

    const loadRecentlyViewedByIds = async () => {
      try {
        const existingCache = JSON.parse(
          localStorage.getItem(CACHE_KEY) || "{}",
        );
        const cache =
          existingCache && typeof existingCache === "object"
            ? existingCache
            : {};
        const now = Date.now();

        const cardMap = {};
        const idsToFetch = [];

        recentlyViewedIds.forEach((viewedId) => {
          const cacheEntry = cache[viewedId];
          if (
            cacheEntry &&
            cacheEntry.data &&
            typeof cacheEntry.cachedAt === "number" &&
            now - cacheEntry.cachedAt < CACHE_TTL_MS
          ) {
            cardMap[viewedId] = cacheEntry.data;
          } else {
            idsToFetch.push(viewedId);
          }
        });

        await Promise.all(
          idsToFetch.map(async (viewedId) => {
            try {
              const productData = await axios
                .get(`/api/products/${viewedId}`)
                .then((res) => res.data);
              if (!productData) return;

              const card = buildRecentlyViewedCard(productData);
              cardMap[viewedId] = card;
              cache[viewedId] = { cachedAt: now, data: card };
            } catch (fetchErr) {
              console.error(
                `Failed to fetch recently viewed product ${viewedId}:`,
                fetchErr,
              );
            }
          }),
        );

        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

        const orderedCards = recentlyViewedIds
          .map((viewedId) => cardMap[viewedId])
          .filter(Boolean)
          .slice(0, 4);

        if (!isCancelled) {
          setRecentlyViewed(orderedCards);
        }
      } catch (err) {
        console.error("Failed to load recently viewed products:", err);
        if (!isCancelled) {
          setRecentlyViewed([]);
        }
      }
    };

    loadRecentlyViewedByIds();

    return () => {
      isCancelled = true;
    };
  }, [recentlyViewedIds]);

  // Generate breadcrumb items dynamically
  const breadcrumbItems = product
    ? [
        { label: "Home", path: "/" },
        { label: "Catalogue", path: "/catalogue" },
        {
          label: product.category,
          path: `/catalogue?categories=${product.category.toLowerCase()}`,
        },
        { label: product.name, path: "" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Catalogue", path: "/catalogue" },
      ];

  const normalizedCategory = String(product?.category || "").trim();
  const recommendedHeading = normalizedCategory
    ? `Recommended from ${normalizedCategory} collection`
    : "Recommended Products";

  // Compare size objects by width and height (for rugs only)
  const isSameSize = (a, b) => {
    if (!product.isRug) return a === b; // String comparison for non-rugs
    if (!a || !b || typeof a !== "object" || typeof b !== "object")
      return false;
    return a.width === b.width && a.height === b.height;
  };

  // Determine minimum quantity based on product category
  const getMinQty = (prod) => {
    if (!prod || !prod.category) return 1;
    // All products have minimum order quantity of 1
    return 1;
  };

  // Compute minQty for rendering
  const minQty = getMinQty(product);

  // When product loads, ensure quantity meets min requirement
  useEffect(() => {
    if (product) {
      const min = getMinQty(product);
      setQuantity((q) => Math.max(min, q));
    }
  }, [product]);

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Update price based on selected size from priceOptions
    if (product.priceOptions && product.priceOptions.length > 0) {
      const selectedOption = product.priceOptions.find((option) => {
        // For rugs: compare width/height objects; for others: compare strings
        if (product.isRug) {
          return (
            option.size &&
            size &&
            typeof option.size === "object" &&
            typeof size === "object" &&
            option.size.width === size.width &&
            option.size.height === size.height
          );
        } else {
          return option.size === size;
        }
      });
      if (selectedOption) {
        setCurrentPrice(parseFloat(selectedOption.amount) || 0);
      }
    }
  };

  // Handle price change when size is selected
  const handlePriceChange = (price) => {
    const numericPrice = parseFloat(price) || 0;
    setCurrentPrice(numericPrice);
  };

  // Handle purchase action
  const handleAddToCart = () => {
    if (product) {
      // Get numeric price - ensure it's always a number
      let priceToUse = currentPrice;

      // Fallback to product price (which is the base price unit)
      if (!priceToUse || isNaN(priceToUse)) {
        priceToUse = product.price || 0;
      }

      // Final safety check to ensure it's a valid number
      if (typeof priceToUse !== "number" || isNaN(priceToUse)) {
        priceToUse = 0;
      }

      addToCart(
        {
          _id: product._id,
          id: product.id,
          title: product.name,
          price: priceToUse,
          image: product.images[0],
          category: product.category,
          size:
            selectedSize ||
            product.dimensions[0] ||
            (product.isRug ? { width: 0, height: 0 } : "Standard"),
          dimensions: product.isRug
            ? selectedSize && typeof selectedSize === "object"
              ? `${selectedSize.width} x ${selectedSize.height}`
              : "Standard"
            : selectedSize || product.dimensions?.[0] || "Standard",
          color: product.specifications.color || "Standard",
          material: product.specifications.material || "Handcrafted",
          SKU: product.SKU,
        },
        quantity,
      );

      setAddedToCart(true);

      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  // Handle navigation back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    try {
      // Get existing wishlist from localStorage
      const existingWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      );

      // Check if product is already in wishlist
      const isAlreadyInWishlist = existingWishlist.some(
        (item) => item._id === product._id,
      );

      if (isAlreadyInWishlist) {
        // Remove from wishlist
        const updatedWishlist = existingWishlist.filter(
          (item) => item._id !== product._id,
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
        setWishlistMessage("Removed from wishlist");

        // Dispatch custom event to update header count
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        // Add to wishlist
        const wishlistItem = {
          _id: product._id,
          id: product.id,
          name: product.name,
          price: currentPrice || product.price,
          image: product.images?.[0] || "",
          category: product.category,
          SKU: product.SKU,
          addedAt: new Date().toISOString(),
        };

        const updatedWishlist = [...existingWishlist, wishlistItem];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsInWishlist(true);
        setWishlistMessage("Added to wishlist");

        // Dispatch custom event to update header count
        window.dispatchEvent(new Event("wishlistUpdated"));
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setWishlistMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error managing wishlist:", error);
      setWishlistMessage("Error updating wishlist");
      setTimeout(() => {
        setWishlistMessage("");
      }, 3000);
    }
  };

  // Handle share product
  const handleShare = async () => {
    try {
      const shareData = {
        title: product.name,
        text: `Check out this beautiful ${product.category.toLowerCase()} - ${
          product.name
        }`,
        url: window.location.href,
      };

      // Check if Web Share API is supported
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        setShareMessage("Shared successfully");
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied to clipboard");
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setShareMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback: Try to copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied to clipboard");
      } catch (clipboardError) {
        setShareMessage("Unable to share or copy link");
      }

      setTimeout(() => {
        setShareMessage("");
      }, 3000);
    }
  };

  // Check if product is in wishlist on component mount
  useEffect(() => {
    if (product) {
      try {
        const existingWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]",
        );
        const isInWishlist = existingWishlist.some(
          (item) => item.id === product.id,
        );
        setIsInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    }
  }, [product]);

  // Loading state
  if (loading) {
    return (
      <main
        className="container mx-auto px-4 py-8 max-w-7xl"
        role="main"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <h1 className="text-3xl font-bold text-primary mb-2">
            Loading product details
          </h1>
          <p className="text-secondary text-sm md:text-base">
            Getting craftsmanship details ready...
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full rounded-xl bg-gray-700/65 mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`thumb-skeleton-${idx}`}
                  className="aspect-square rounded-lg bg-gray-700/60"
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-1/4 rounded bg-gray-700/60" />
            <div className="h-10 w-3/4 rounded bg-gray-700/70" />
            <div className="h-4 w-2/5 rounded bg-gray-700/60" />
            <div className="h-24 w-full rounded bg-gray-700/60" />
            <div className="h-12 w-40 rounded-full bg-gray-700/65" />
            <div className="h-14 w-full rounded-xl bg-gray-700/55" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl" role="main">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Product Not Found
          </h2>
          <p className="text-secondary mb-6">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={handleGoBack}>
              Go Back
            </Button>
            <Button variant="primary" onClick={() => navigate("/catalogue")}>
              Browse Catalogue
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 max-w-7xl"
      role="main"
    >
      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Product Images (Sticky on large screens) */}
        <div className="lg:col-span-5 xl:col-span-5 lg:self-start">
          <div className="lg:sticky lg:top-4">
            <ImageGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 mt-1">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* Product Header */}
          <div className="flex flex-col justify-between items-start bg-gray-800/60 backdrop-blur-sm w-full rounded-2xl border border-white/10 p-6 shadow-lg space-y-4">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-1">
              {product.name}
            </h1>
            {((product.category || "").toLowerCase() === "rugs" ||
              (Array.isArray(product.materials) &&
                product.materials.length > 0)) && (
              <div className="space-y-3">
                <p className="text-secondary text-base sm:text-lg font-medium leading-tight">
                  {(product.category || "").toLowerCase() === "rugs"
                    ? "Hand Tufted"
                    : ""}
                  {Array.isArray(product.materials) &&
                  product.materials.length > 0
                    ? `${(product.category || "").toLowerCase() === "rugs" ? ", " : ""}${product.materials.join(" & ")}`
                    : ""}
                </p>
                {product.description && (
                  <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                )}
              </div>
            )}
            {/* Minimum Order Quantity notice - only show when minQty > 1 */}
            {minQty > 1 && (
              <div className="mt-3 inline-flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm border border-[var(--accent-color)]/40 rounded-full px-4 py-2 text-sm text-secondary shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#ac1f23]"
                  aria-hidden="true"
                >
                  )
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
                <span className="text-[#ac1f23] font-semibold">
                  Minimum Order Quantity:
                </span>
                <span className="text-primary font-medium">{minQty} units</span>
              </div>
            )}
          </div>
          {product.specifications && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#ac1f23]">
                Specifications
              </h2>
              <div className="bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
                {Object.entries(product.specifications)
                  .filter(
                    ([key]) =>
                      !["material", "dimensions", "description"].includes(key),
                  )
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4">
                      <span className="text-secondary capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-primary">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {/* Size Selector (moved above info sections) */}
          {product.priceOptions && product.priceOptions.length > 1 && (
            <div className="mt-2">
              <SizeSelector
                priceOptions={product.priceOptions}
                selectedSize={selectedSize}
                hidePrices={
                  product.category && product.category.toLowerCase() === "rugs"
                }
                onSizeSelect={(size, amount) => {
                  handleSizeChange(size);
                  handlePriceChange(amount);
                }}
              />
            </div>
          )}
          {/* Size Chart for Rugs */}
          {product.category && product.category.toLowerCase() === "rugs" && (
            <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-md border border-white/5">
              <h3 className="text-lg font-bold text-[#ac1f23] mb-5">
                Size Chart & Pricing
              </h3>
              <p className="text-primary text-sm font-medium mb-2">
                Size (Feet / cm)
              </p>
              <p className="text-secondary text-sm mb-4">
                Prices are calculated based on ₹ {product.price} per sq ft
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { size: { width: 3, height: 5 }, sqft: 15 },
                  { size: { width: 4, height: 6 }, sqft: 24 },
                  { size: { width: 5, height: 7 }, sqft: 35 },
                  { size: { width: 6, height: 9 }, sqft: 54 },
                  { size: { width: 8, height: 10 }, sqft: 80 },
                  { size: { width: 9, height: 12 }, sqft: 108 },
                  { size: { width: 10, height: 13 }, sqft: 130 },
                  { size: { width: 12, height: 15 }, sqft: 180 },
                ].map((item) => {
                  const basePrice = parseFloat(product.price) || 0;
                  const totalPrice = Math.round(basePrice * item.sqft);
                  const isSelected = isSameSize(selectedSize, item.size);
                  const cmWidth = Math.round(item.size.width * 30.48);
                  const cmHeight = Math.round(item.size.height * 30.48);
                  return (
                    <div
                      key={`${item.size.width}x${item.size.height}`}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedSize(null);
                          setCurrentPrice(0);
                        } else {
                          setSelectedSize(item.size);
                          setCurrentPrice(totalPrice > 0 ? totalPrice : 0);
                        }
                      }}
                      className={`w-[124px] min-h-[78px] shrink-0 border text-center px-2.5 py-1.5 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-[#ac1f23] border-[#ac1f23] text-white shadow-lg shadow-[#ac1f23]/45 ring-2 ring-[#ac1f23]/60 ring-offset-2 ring-offset-gray-800 scale-[1.08]"
                          : "bg-gray-900/60 border-white/20 text-gray-100 hover:border-[#ac1f23]/80 hover:scale-[1.02]"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isSelected) {
                            setSelectedSize(null);
                            setCurrentPrice(0);
                          } else {
                            setSelectedSize(item.size);
                            setCurrentPrice(totalPrice);
                          }
                        }
                      }}
                    >
                      <p
                        className={`text-[13px] font-semibold leading-tight ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      >
                        {item.size.width}' x {item.size.height}' ft
                      </p>
                      <p
                        className={`text-xs leading-tight ${
                          isSelected ? "text-white/90" : "text-gray-300"
                        }`}
                      >
                        {cmWidth} x {cmHeight} cm
                      </p>
                      <p
                        className={`mt-1 text-sm font-bold ${
                          isSelected ? "text-white" : "text-[#ac1f23]"
                        }`}
                      >
                        ₹ {totalPrice.toLocaleString()}
                      </p>
                      <span
                        className={`mt-1 text-xs font-medium ${
                          isSelected ? "text-white" : "text-secondary"
                        }`}
                      >
                        {isSelected ? "Selected" : "Tap to select"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Quantity Selector */}
          <div className="pt-4">
            {selectedSize && product.isRug ? (
              <div className="mb-4 mx-auto w-full max-w-md rounded-xl border border-[#ac1f23]/45 bg-[#ac1f23]/10 px-4 py-3 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.1em] text-[#f2b6b8] font-semibold">
                  Current Size Selection
                </p>
                <p className="mt-1 text-lg font-semibold text-primary">
                  {typeof selectedSize === "object"
                    ? `${selectedSize.width} x ${selectedSize.height}`
                    : selectedSize}
                </p>
                {Number(currentPrice) > 0 && (
                  <p className="mt-1 text-base font-bold text-[#e45a5d]">
                    ₹ {Number(currentPrice).toLocaleString()}
                  </p>
                )}
              </div>
            ) : product.isRug && selectedSize ? (
              <div className="mb-4 text-center text-sm text-yellow-400">
                Select a size before adding to cart
              </div>
            ) : null}

            <div className="flex flex-col items-center text-center">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-secondary mb-1 tracking-wide"
              >
                Quantity
              </label>
              {minQty > 1 && (
                <p className="text-xs text-secondary/70 mb-4 max-w-xs">
                  This product has a minimum order quantity of {minQty} units.
                </p>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card-bg border border-border-color text-primary transition-colors flex items-center justify-center text-lg font-semibold ${
                    quantity > 1
                      ? "hover:bg-border-color cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                  aria-label="Decrease quantity (minimum 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="w-16 sm:w-20 text-center text-primary font-bold text-lg select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card-bg border border-border-color text-primary hover:bg-border-color transition-colors flex items-center justify-center text-lg font-semibold"
                  aria-label="Increase quantity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                size="md"
                onClick={handleAddToCart}
                className="w-full max-w-[280px]"
                aria-label={`Add ${product.name} to cart`}
                disabled={addedToCart || !selectedSize}
              >
                {addedToCart ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Added to Cart!
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToWishlist}
              className={`flex-1 transition-colors ${
                isInWishlist
                  ? "bg-red-100 border-red-300 text-red-700 hover:bg-red-200"
                  : ""
              }`}
            >
              {isInWishlist ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1"
            >
              📤 Share
            </Button>
          </div>

          {/* Feedback Messages */}
          {wishlistMessage && (
            <div className="mt-2 p-2 bg-teal-100 border border-teal-300 text-teal-700 rounded text-sm text-center">
              {wishlistMessage}
            </div>
          )}
          {shareMessage && (
            <div className="mt-2 p-2 bg-amber-100 border border-amber-300 text-amber-700 rounded text-sm text-center">
              {shareMessage}
            </div>
          )}
        </div>
      </div>

      <section className="mt-10 w-full">
        <h3 className="mb-4 text-lg font-bold text-[#ac1f23]">
          {recommendedHeading}
        </h3>

        {recommendedRugs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedRugs.map((rug) => (
              <button
                key={rug.id}
                onClick={() => navigate(`/product/${rug.id}`)}
                className="group overflow-hidden rounded-md border border-white/10 bg-gray-800/60 text-left transition-all duration-200 hover:border-[#ac1f23]/80"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-900/70">
                  {rug.image ? (
                    <img
                      src={rug.image}
                      alt={rug.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-secondary">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-1 p-2.5">
                  <p className="line-clamp-1 text-sm font-semibold text-primary">
                    {rug.name}
                  </p>
                  {rug.materialText && (
                    <p className="line-clamp-1 text-xs text-secondary">
                      {rug.materialText}
                    </p>
                  )}
                  {rug.pricePerSqFt > 0 && (
                    <p className="text-sm font-bold text-[#ac1f23]">
                      ₹ {rug.pricePerSqFt.toLocaleString()}
                      {(rug.category || "").toLowerCase() === "rugs"
                        ? " / sq ft"
                        : ""}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-gray-800/40 p-4 text-sm text-secondary">
            No recommended products available right now.
          </div>
        )}
      </section>

      <section className="mt-8 w-full">
        <h3 className="mb-4 text-lg font-bold text-[#ac1f23]">
          Recently Viewed
        </h3>

        {recentlyViewed.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group overflow-hidden rounded-md border border-white/10 bg-gray-800/60 text-left transition-all duration-200 hover:border-[#ac1f23]/80"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-900/70">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-secondary">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-1 p-2.5">
                  <p className="line-clamp-1 text-sm font-semibold text-primary">
                    {item.name}
                  </p>
                  {item.materialText && (
                    <p className="line-clamp-1 text-xs text-secondary">
                      {item.materialText}
                    </p>
                  )}
                  {item.price > 0 && (
                    <p className="text-sm font-bold text-[#ac1f23]">
                      ₹ {item.price.toLocaleString()}
                      {(item.category || "").toLowerCase() === "rugs"
                        ? " / sq ft"
                        : ""}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-gray-800/40 p-4 text-sm text-secondary">
            No recently viewed products yet.
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductDetailPage;
