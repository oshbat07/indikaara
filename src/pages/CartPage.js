import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
/**
 * CartPage Component - Shopping cart page with items and summary
 */
const CartPage = () => {
  const { items, itemCount, total, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle checkout with authentication check
  const handleProceedToCheckout = () => {
    if (!user) {
      // Store the intended redirect path
      localStorage.setItem("redirect_after_login", "/address");
      navigate("/login");
      return;
    }
    navigate("/address");
  };

  // Handle quantity change
  const MIN_QTY = 1;
  const handleQuantityChange = (cartItemId, newQuantity) => {
    const clamped = Math.max(MIN_QTY, newQuantity);
    updateQuantity(cartItemId, clamped);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Determine if any rugs are in cart
  const hasRugs = useMemo(
    () => items.some((i) => (i.category || "").toLowerCase() === "rugs"),
    [items],
  );

  if (items.length === 0) {
    return (
      <main className="page-bleed bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-32">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-10">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Discover beautiful handcrafted items from talented Indian
                artisans.
              </p>
              <div className="space-y-4">
                <Link to="/catalogue">
                  <Button variant="primary" size="lg" className="w-full">
                    Browse Products
                  </Button>
                </Link>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Need ideas? Try:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      to="/catalogue?category=home-decor"
                      className="text-sm text-gray-700 underline"
                    >
                      Home Decor
                    </Link>
                    <span className="text-gray-400">•</span>
                    <Link
                      to="/catalogue?category=rugs"
                      className="text-sm text-gray-700 underline"
                    >
                      Rugs
                    </Link>
                    <span className="text-gray-400">•</span>
                    <Link
                      to="/catalogue?category=wall-hanging"
                      className="text-sm text-gray-700 underline"
                    >
                      Wall Hanging
                    </Link>
                  </div>
                </div>
                <div className="text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <p className="mb-1">Tips:</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed">
                    <li>Check product details for dimensions and materials.</li>
                    <li>Add items to your wishlist to save for later.</li>
                    <li>Contact us for custom orders or bulk enquiries.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-bleed bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 mt-4">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="text-gray-900 hover:underline font-medium">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Cart</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="pb-6 border-b border-black last:border-b-0 last:pb-0"
                  >
                    {/* Mobile-optimized layout */}
                    <div className="flex flex-col gap-4">
                      {/* Product Info and Controls Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Product Image and Info Section - flex-1 to take available space */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0">
                            <div
                              className="w-24 h-24 sm:w-20 sm:h-20 bg-center bg-cover rounded-lg"
                              style={{ backgroundImage: `url("${item.image}")` }}
                              role="img"
                              aria-label={item.title}
                            />
                          </div>

                          {/* Product Info - takes remaining space */}
                          <div className="flex-1 min-w-0">
                            {/* Product Name - Larger and more prominent */}
                            <h3 className="text-gray-900 font-bold text-lg sm:text-xl leading-tight mb-2 tracking-tight">
                              {item.title}
                            </h3>

                            {/* Category */}
                            <p className="text-gray-600 text-sm mb-3">
                              {item.category || "Handcrafted Item"}
                            </p>

                            {/* Key Product Details - More prominent */}
                            <div className="space-y-2 mb-3">
                              {item.dimensions && (
                                <div className="flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 text-gray-600 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                    />
                                  </svg>
                                  <span className="text-gray-900 font-medium text-sm">
                                    Size:{" "}
                                    <span className="text-gray-700">
                                      {typeof item.dimensions === "object"
                                        ? `${item.dimensions.width} x ${item.dimensions.height}`
                                        : item.dimensions}
                                    </span>
                                  </span>
                                </div>
                              )}
                              {item.color && item.color !== "Standard" && (
                                <div className="flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 text-gray-600 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                                    />
                                  </svg>
                                  <span className="text-gray-900 font-medium text-sm">
                                    Color:{" "}
                                    <span className="text-gray-700">
                                      {item.color}
                                    </span>
                                  </span>
                                </div>
                              )}
                              {item.material &&
                                item.material !== "Handcrafted" && (
                                  <div className="flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4 text-gray-600 flex-shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                      />
                                    </svg>
                                    <span className="text-gray-900 font-medium text-sm">
                                      Material:{" "}
                                      <span className="text-gray-700">
                                        {item.material}
                                      </span>
                                    </span>
                                  </div>
                                )}
                            </div>

                            {/* Price - Hidden for Rugs */}
                            <p className="text-gray-900 font-bold text-lg">
                              {(item.category || "").toLowerCase() === "rugs" ? (
                                <span className="text-gray-600 font-normal text-sm tracking-wide">
                                  Price on enquiry
                                </span>
                              ) : (
                                formatCurrency(item.price)
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Quantity and Remove Controls - Aligned to extreme right */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:flex-shrink-0">
                          <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-md p-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.cartItemId, item.quantity - 1)
                              }
                              disabled={item.quantity <= MIN_QTY}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                item.quantity <= MIN_QTY
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white"
                              }`}
                              aria-label="Decrease quantity"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="w-10 text-center text-gray-900 font-bold">
                              {Math.max(item.quantity, MIN_QTY)}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.cartItemId, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button - Always visible on right */}
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm lg:sticky lg:top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-900 font-bold text-lg">
                      Total Amount
                    </span>
                    <span className="text-[#ac1f23] font-bold text-lg">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {/* Enquiry + Payment Actions */}
                <div className="flex flex-col gap-3">
                  <button onClick={handleProceedToCheckout} className="w-full">
                    <Button variant="primary" size="lg" className="w-full">
                      {user ? "Proceed to Checkout" : "Login to Checkout"}
                    </Button>
                  </button>
                  <div className="flex items-center gap-3 justify-center text-xs uppercase tracking-wider text-gray-600 font-semibold">
                    <span
                      className="flex-1 h-px bg-gray-300"
                      aria-hidden="true"
                    />
                    <span>OR</span>
                    <span
                      className="flex-1 h-px bg-gray-300"
                      aria-hidden="true"
                    />
                  </div>
                  <Link
                    to="/enquiry"
                    className="block"
                    aria-label="Review items and create an enquiry"
                  >
                    <Button variant="secondary" size="lg" className="w-full">
                      Enquire Now
                    </Button>
                  </Link>
                  <Link to="/catalogue" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Authenticity Badge */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-300">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-semibold">
                      Authenticity Guaranteed
                    </p>
                    <p className="text-gray-600 text-xs">
                      Fair Trade with Artisans
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
