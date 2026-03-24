import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ImageGallery from "../components/ImageGallery";
import Breadcrumb from "../components/Breadcrumb";
import ProductInfoSection from "../components/ProductInfoSection";
import SizeSelector from "../components/SizeSelector";
import Button from "../components/Button";
import { getAllImagesOptimized } from "../utils/imageUtils";
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
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const galleryWrapperRef = useRef(null); // outer normal flow container
  const galleryInnerRef = useRef(null); // element that becomes fixed
  const placeholderRef = useRef(null); // placeholder to preserve height when fixed
  const craftingRef = useRef(null); // anchor to release sticky
  const careRef = useRef(null); // Care Instructions release anchor
  const [headerHeight, setHeaderHeight] = useState(0); // dynamic header height

  // Measure header height (supports responsive height changes & future shrink-on-scroll)
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (header) {
        const h = header.getBoundingClientRect().height;
        setHeaderHeight(h);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    // slight delay to capture any late layout adjustments
    const t = setTimeout(measure, 150);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // JS fallback sticky for browsers / layout where CSS sticky fails
  useEffect(() => {
    const handleScroll = () => {
      const minWidth = 1024; // lg breakpoint
      if (window.innerWidth < minWidth) {
        // reset any fixed state on small screens
        if (galleryInnerRef.current) {
          galleryInnerRef.current.style.position = "";
          galleryInnerRef.current.style.top = "";
          galleryInnerRef.current.style.width = "";
        }
        if (placeholderRef.current)
          placeholderRef.current.style.display = "none";
        return;
      }
      if (!galleryWrapperRef.current || !galleryInnerRef.current) return;
      const offsetBuffer = 20; // breathing room below header
      const headerOffset = (headerHeight || 100) + offsetBuffer;
      const rect = galleryWrapperRef.current.getBoundingClientRect();
      const viewportTop = rect.top;
      // Determine release point based on Care Instructions section bottom (preferred)
      let releaseMode = null; // null=fixed eligible, 'absolute'=anchor at bottom, 'reset'=normal flow
      const galleryHeight = galleryInnerRef.current?.offsetHeight || 0;

      const anchorEl = careRef.current || craftingRef.current; // fallback to crafting if care not mounted
      if (anchorEl) {
        const anchorRect = anchorEl.getBoundingClientRect();
        // If bottom of anchor is above the space the fixed gallery would occupy -> release
        if (anchorRect.bottom <= headerOffset + galleryHeight - 8) {
          releaseMode = "absolute";
        }
      }

      if (releaseMode === "absolute") {
        // Pin the gallery to the bottom of its wrapper smoothly
        const wrapperRect = galleryWrapperRef.current.getBoundingClientRect();
        const absoluteTop = wrapperRect.height - galleryHeight; // position within wrapper
        galleryInnerRef.current.style.position = "absolute";
        galleryInnerRef.current.style.top = absoluteTop + "px";
        galleryInnerRef.current.style.width = "100%";
        galleryInnerRef.current.style.transition = "top 180ms ease-out";
        if (placeholderRef.current)
          placeholderRef.current.style.display = "none";
        return;
      }

      const stopPoint = rect.height - (window.innerHeight - headerOffset); // legacy guard
      if (viewportTop <= headerOffset && stopPoint > 0) {
        // activate fixed
        if (placeholderRef.current) {
          placeholderRef.current.style.display = "block";
          placeholderRef.current.style.height =
            galleryInnerRef.current.offsetHeight + "px";
        }
        galleryInnerRef.current.style.position = "fixed";
        galleryInnerRef.current.style.top = headerOffset + "px";
        galleryInnerRef.current.style.width =
          galleryWrapperRef.current.offsetWidth + "px";
        galleryInnerRef.current.style.transition = "top 120ms ease-out";
      } else {
        // reset
        if (galleryInnerRef.current) {
          galleryInnerRef.current.style.position = "";
          galleryInnerRef.current.style.top = "";
          galleryInnerRef.current.style.width = "";
          galleryInnerRef.current.style.transition = "";
        }
        if (placeholderRef.current)
          placeholderRef.current.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headerHeight]);

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      try {
        // Get product from API
        const productData = await axios
          .get(`/api/products/${id}`)
          .then((res) => res.data);

        if (productData) {
          // Transform product data to match component expectations
          const transformedProduct = {
            id: productData.id,
            _id: productData._id,
            name: productData.name,
            description: productData.description,
            price: productData.price[0]?.price || null,
            priceOptions: productData.price.map((p) => ({
              size: p.size,
              amount: p.price,
            })),
            SKU: productData.SKU,
            images: getAllImagesOptimized(productData.imageUrl || []),
            category: productData.category,
            subcategory: productData.manufacturer,
            region: "India", // From details: "Made in India"
            rating: null,
            reviews: [],
            inStock: true,
            features: productData.tags || [],
            tags: productData.tags,
            dimensions: [productData.price[0]?.size || ""],
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
              careInstructions: "Handle with care",
              dimensions: productData.price[0]?.size || "Standard size",
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
            setSelectedSize(firstOption.size);
            setCurrentPrice(parseFloat(firstOption.amount) || 0);
          } else if (transformedProduct.price) {
            setCurrentPrice(parseFloat(transformedProduct.price) || 0);
            setSelectedSize("Standard");
          } else {
            // Fallback: ensure currentPrice is always set to a number
            setCurrentPrice(0);
            setSelectedSize("Standard");
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

  // Determine minimum quantity based on product category
  const getMinQty = (prod) => {
    if (!prod || !prod.category) return 1;
    const cat = String(prod.category).toLowerCase();
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
    if (product.priceOptions) {
      const selectedOption = product.priceOptions.find(
        (option) => option.size === size,
      );
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
          size: selectedSize || product.dimensions[0] || "Standard",
          color: product.specifications.color || "Standard",
          material: product.specifications.material || "Handcrafted",
          dimensions: selectedSize || product.dimensions[0] || null,
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
      <main className="container mx-auto px-4 py-8 max-w-6xl" role="main">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary">Loading product details...</p>
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
      className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 -mt-[130px] md:-mt-[146px] lg:-mt-[162px] max-w-7xl"
      role="main"
      style={{ paddingTop: (headerHeight || 120) + 48 + 130 }}
    >
      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Product Images (Sticky on large screens) */}
        <div
          className="lg:col-span-5 xl:col-span-5 relative"
          ref={galleryWrapperRef}
        >
          <div
            ref={placeholderRef}
            style={{ display: "none" }}
            aria-hidden="true"
          ></div>
          <div className="lg:top-36 xl:top-40" ref={galleryInnerRef}>
            <ImageGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* Product Header */}
          <div className="flex flex-col justify-between items-start bg-gray-800/60 backdrop-blur-sm w-full rounded-2xl border border-white/10 p-6 shadow-lg space-y-4">
            <h1 className="sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              {product.name}
            </h1>
            {/* <p className="text-secondary text-xl leading-relaxed my-5">
              {product.description}
            </p> */}
            {/* Price Display: Rugs => Price per sq ft (fixed), others => dynamic price */}
            {product.category && product.category.toLowerCase() === "rugs" ? (
              <div className="inline-block text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-[var(--border-radius-lg)] shadow-lg border-2 border-[#ac1f23]">
                ₹ {Number(product.price || 0).toLocaleString()} / sq ft
              </div>
            ) : currentPrice ? (
              <div className="inline-block text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-[var(--border-radius-lg)] shadow-lg border-2 border-[#ac1f23]">
                ₹ {currentPrice.toLocaleString()}
              </div>
            ) : product.price ? (
              <div className="inline-block text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-[var(--border-radius-lg)] shadow-lg border-2 border-[#ac1f23]">
                ₹ {product.price.toLocaleString()}
              </div>
            ) : (
              <div className="inline-block text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-[var(--border-radius-lg)] shadow-lg border-2 border-[var(--accent-color]">
                Price on request
              </div>
            )}
            {/* Minimum Order Quantity notice - only show when minQty > 1 */}
            {minQty > 1 && (
              <div className="mt-4 inline-flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm border border-[var(--accent-color)]/40 rounded-full px-4 py-2 text-sm text-secondary shadow-sm">
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
              <h2 className="text-2xl font-bold text-[#ac1f23]">
                Specifications
              </h2>
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
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
            <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md border border-white/5">
              <h3 className="text-2xl font-bold text-[#ac1f23] mb-6">
                Size Chart & Pricing
              </h3>
              <p className="text-secondary text-sm mb-4">
                Prices are calculated based on ₹ {product.price} per sq ft
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { size: "3' X 5'", sqft: 15 },
                  { size: "4' X 6'", sqft: 24 },
                  { size: "5' X 7'", sqft: 35 },
                  { size: "6' X 9'", sqft: 54 },
                  { size: "7' X 9'", sqft: 63 },
                  { size: "8' X 10'", sqft: 80 },
                  { size: "9' X 12'", sqft: 108 },
                  { size: "10' X 13'", sqft: 130 },
                  { size: "12' X 15'", sqft: 180 },
                ].map((item) => {
                  const basePrice = parseFloat(product.price) || 0;
                  const totalPrice = Math.round(basePrice * item.sqft);
                  const isSelected = selectedSize === item.size;
                  return (
                    <div
                      key={item.size}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setCurrentPrice(totalPrice > 0 ? totalPrice : 0);
                      }}
                      className={`bg-card-bg border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#ac1f23] bg-[#ac1f23]/10 shadow-lg shadow-[#ac1f23]/20"
                          : "border-border-color hover:border-primary/50"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedSize(item.size);
                          setCurrentPrice(totalPrice);
                        }
                      }}
                    >
                      <p className="text-primary font-semibold text-sm mb-2">
                        {item.size}
                      </p>
                      <p className="text-secondary text-xs mb-2">
                        {item.sqft} sq ft
                      </p>
                      <p className="text-[#ac1f23] font-bold text-sm mb-2">
                        ₹ {totalPrice.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-medium text-center ${
                          isSelected
                            ? "text-green-500"
                            : "text-secondary"
                        }`}
                      >
                        {isSelected ? "Selected" : "Tap to select"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Quantity Selector */}
          <div className="pt-4">
            <div className="flex flex-col items-center text-center">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-secondary mb-1 tracking-wide"
              >
                Quantity
              </label>
              {minQty > 1 && (
                <p className="text-[11px] sm:text-xs text-secondary/70 mb-4 max-w-xs">
                  This product has a minimum order quantity of {minQty} units.
                </p>
              )}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card-bg border border-border-color text-primary transition-colors flex items-center justify-center text-xl font-semibold ${
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
                    className="w-7 h-7"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="w-20 sm:w-24 text-center text-primary font-bold text-2xl select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card-bg border border-border-color text-primary hover:bg-border-color transition-colors flex items-center justify-center text-xl font-semibold"
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
                    className="w-7 h-7"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
            {selectedSize ? (
              <div className="mb-4 text-center">
                <p className="text-sm text-secondary">Current Size Selection</p>
                <p className="text-lg font-semibold text-primary">{selectedSize}</p>
              </div>
            ) : (
              <div className="mb-4 text-center text-sm text-yellow-400">
                Select a size before adding to cart
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="min-w-[260px] sm:min-w-[320px]"
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
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              size="md"
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
              size="md"
              onClick={handleShare}
              className="flex-1"
            >
              📤 Share
            </Button>
          </div>
          {/* Product Specifications */}

          {/* Product Details Sections */}
          <div className="space-y-6 mt-4">
            {/* Product Description */}
            <ProductInfoSection
              title="Product Description"
              content={product.description}
            />

            {/* Cultural Context */}
            <ProductInfoSection
              title="Cultural Context"
              content={product.culturalContext}
            />

            {/* Artisan's Story */}
            <ProductInfoSection
              title="Artisan's Story"
              content={product.artisan.story}
            />
          </div>

          {/* Purchase Button (Buy Now hidden as requested) */}

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
          {/* Additional Product Information (moved inside right column for alignment) */}
          <div className="mt-14 flex flex-col gap-8">
            {/* Care Instructions Card */}
            <div
              ref={careRef}
              className="bg-gray-800 rounded-lg p-6 shadow-md border border-white/5 min-h-[220px] w-full"
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                Care Instructions
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {(rawProductData?.details && rawProductData.details.length > 0
                  ? rawProductData.details
                  : product.specifications?.careInstructions
                    ? [product.specifications.careInstructions]
                    : ["Handle with care"]
                ).map((line, idx) => (
                  <li key={idx} className="text-secondary text-sm leading-snug">
                    {line}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-secondary/60 mt-3 tracking-wide">
                Following these guidelines helps preserve the craftsmanship and
                longevity of this piece.
              </p>
            </div>
            {/* Origin Card */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-white/5 min-h-[160px] w-full">
              <h3 className="text-xl font-bold text-primary mb-3">Origin</h3>
              <div className="space-y-2">
                <p className="text-secondary">
                  <span className="font-medium">Region:</span> {product.region}
                </p>
                <p className="text-secondary">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-secondary">
                  <span className="font-medium">Type:</span>{" "}
                  {product.subcategory}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
