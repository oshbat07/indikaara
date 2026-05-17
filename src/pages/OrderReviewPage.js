import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

/**
 * OrderReviewPage Component - Review order details and select delivery address
 */
const OrderReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const MIN_QTY = 1;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "number" ? item.price : 0) *
        Math.max(item.quantity, MIN_QTY),
    0,
  );

  const shipping = subtotal > 0 ? 0 : 0; // Free shipping example
  const total = subtotal + shipping;

  // Fetch addresses on mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/users/addresses");
        const addressList = Array.isArray(res.data) ? res.data : [];

        if (addressList.length === 0) {
          navigate("/address");
          return;
        }

        setAddresses(addressList);
        // Select default address or first one
        const defaultAddr = addressList.find((addr) => addr.isDefault);
        setSelectedAddressId(
          defaultAddr?._id ||
            defaultAddr?.id ||
            addressList[0]?._id ||
            addressList[0]?.id,
        );
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
        setError("Failed to load addresses. Please try again.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [user, navigate]);

  // Redirect if cart is empty
  if (items.length === 0 && !isLoading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 text-center bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Add some items before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate("/catalogue")}
            className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
          >
            Browse Products
          </button>
        </div>
      </main>
    );
  }

  // Handle proceed to payment
  const handleProceedToPayment = async () => {
    if (!selectedAddressId) {
      setError("Please select a delivery address.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const selectedAddr = addresses.find(
        (addr) =>
          addr._id === selectedAddressId || addr.id === selectedAddressId,
      );

      if (!selectedAddr) {
        setError("Selected address not found.");
        setIsProcessing(false);
        return;
      }

      // Build order products
      const orderProducts = items.map((item) => {
        const itemQuantity = parseInt(item.quantity, 10) || 1;
        const orderItem = {
          product: item._id || item.id,
          quantity: itemQuantity,
        };

        const category = (item.category || "").toString().toLowerCase();
        const isRug = category === "rugs";

        const deriveRugSize = (rawSize) => {
          if (!rawSize) return { width: 0, height: 0 };
          if (typeof rawSize === "object" && rawSize.width && rawSize.height) {
            return {
              width: Number(rawSize.width),
              height: Number(rawSize.height),
            };
          }
          if (typeof rawSize === "string") {
            const parsed = parseSize(rawSize);
            if (parsed) return parsed;
          }
          return { width: 0, height: 0 };
        };

        const deriveNonRugSize = (rawSize) => {
          if (!rawSize) return "Standard";
          if (typeof rawSize === "string") return rawSize;
          if (typeof rawSize === "object" && rawSize.width && rawSize.height) {
            return `${rawSize.width} x ${rawSize.height}`;
          }
          return "Standard";
        };

        if (isRug) {
          if (item.size) {
            orderItem.size = deriveRugSize(item.size);
          } else if (item.dimensions) {
            orderItem.size = deriveRugSize(item.dimensions);
          } else {
            orderItem.size = { width: 0, height: 0 };
          }
        } else {
          if (item.size) {
            orderItem.size = deriveNonRugSize(item.size);
          } else if (item.dimensions) {
            orderItem.size = deriveNonRugSize(item.dimensions);
          } else {
            orderItem.size = "Standard";
          }
        }

        return orderItem;
      });

      // Create pending order
      const orderPayload = {
        products: orderProducts,
        shippingAddress: {
          fullName: selectedAddr.fullName || selectedAddr.name || "",
          addressLine1: selectedAddr.address || "",
          addressLine2: "",
          city: selectedAddr.city || "",
          state: selectedAddr.state || "",
          pincode: selectedAddr.postalCode || "",
          phone: selectedAddr.phone || "",
          email: user?.email || "",
          additionalInfo: selectedAddr.label || "",
        },
      };

      const response = await axios.post(
        "/api/orders/create-pending",
        orderPayload,
      );
      const { txnid, order } = response.data;

      // Store order data
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(orderPayload.shippingAddress),
      );
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          txnid,
          totalPrice: order?.totalPrice || total,
          _id: order?._id || order?.id || null,
        }),
      );

      // Clear cart
      try {
        clearCart();
      } catch (e) {
        // no-op
      }

      // Navigate to payment page
      navigate("/checkout", {
        state: {
          txnid,
          totalPrice: order?.totalPrice || total,
          _id: order?._id,
        },
      });
    } catch (err) {
      console.error("Failed to proceed to payment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create order. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to parse size strings
  const parseSize = (sizeStr) => {
    if (!sizeStr || typeof sizeStr !== "string") return null;
    const cleaned = sizeStr
      .replace(/[""'']/g, "")
      .replace(/\s*(ft|feet)\s*/gi, "")
      .trim();
    const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)$/i);
    if (!match) return null;
    return {
      width: parseFloat(match[1]),
      height: parseFloat(match[2]),
    };
  };

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 bg-white min-h-screen">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ac1f23]"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24 bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="text-gray-900 hover:underline font-medium"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/cart")}
            className="text-gray-900 hover:underline font-medium"
          >
            Cart
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Order Review</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Review Your Order
        </h1>
        <p className="text-gray-600">
          Verify your items and select a delivery address
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              Order Items
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 border-b border-gray-200 pb-4 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    {item.size && (
                      <p className="text-sm text-gray-600">
                        Size:{" "}
                        {typeof item.size === "string" ? item.size : "Standard"}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Qty: {Math.max(item.quantity, MIN_QTY)}
                    </p>
                    {typeof item.price === "number" && item.price > 0 ? (
                      <p className="font-bold text-gray-900 mt-2">
                        {formatCurrency(
                          item.price * Math.max(item.quantity, MIN_QTY),
                        )}
                      </p>
                    ) : (
                      <p className="font-bold text-gray-900 mt-2">Enquiry</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Selection */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              Delivery Address
            </h2>

            {addresses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">No saved addresses found.</p>
                <button
                  onClick={() => navigate("/address")}
                  className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-2 rounded"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr._id || addr.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedAddressId === (addr._id || addr.id)
                        ? "border-[#ac1f23] bg-[#fff6f3]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr._id || addr.id}
                      checked={selectedAddressId === (addr._id || addr.id)}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="mt-1 h-4 w-4 text-[#ac1f23]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {addr.fullName || addr.name}
                        </p>
                        {addr.isDefault && (
                          <span className="inline-flex items-center rounded-full bg-[#ac1f23] px-2 py-0.5 text-[11px] font-semibold text-white">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {addr.label || "Address"}
                      </p>
                      <p className="text-sm text-gray-700">{addr.address}</p>
                      <p className="text-sm text-gray-700">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-sm text-gray-700">{addr.country}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Phone: {addr.phone}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {addresses.length > 0 && (
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-4 text-sm text-[#ac1f23] hover:underline font-medium"
              >
                Manage Addresses
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(shipping)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#ac1f23]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing || !selectedAddressId}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                isProcessing || !selectedAddressId
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#ac1f23] hover:bg-[#a46840] text-white"
              }`}
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 py-3 px-4 rounded-lg font-semibold border border-gray-300 text-gray-900 hover:bg-gray-50"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderReviewPage;
