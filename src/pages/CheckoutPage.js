import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import PaymentModal from "../components/PaymentModal";

/**
 * CheckoutPage Component - Checkout page with shipping and payment details
 */
const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from location state or localStorage
    const orderFromState = location.state;
    const orderFromStorage = JSON.parse(localStorage.getItem("pendingOrder"));

    if (orderFromState) {
      setOrderDetails(orderFromState);
    } else if (orderFromStorage) {
      setOrderDetails(orderFromStorage);
    } else {
      // If no order details found, redirect to cart
      navigate("/cart");
    }
  }, [location, navigate]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failure' | null

  // Check for payment status in URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const payuStatus = params.get("payuStatus");

    // Clear the URL parameters without reloading the page
    window.history.replaceState({}, "", window.location.pathname);

    if (status === "success" || payuStatus === "success") {
      setPaymentStatus("success");
      // Clear cart on successful payment
      clearCart();
    } else if (status === "failure" || payuStatus === "failure") {
      setPaymentStatus("failure");
    }
  }, [clearCart]);

  // Reset payment status
  const handleCloseModal = () => {
    setPaymentStatus(null);
    setIsProcessing(false);
  };

  // Handle form submission and PayU payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!orderDetails) {
        throw new Error("No order details found");
      }

      const API_BASE = "https://backend-wei5.onrender.com";
      const jwt = localStorage.getItem("token");

      // Initiate payment on server
      const successUrl = `${window.location.origin}/payment/success`;
      const failureUrl = `${window.location.origin}/payment/failure`;

      const initResp = await fetch(`${API_BASE}/api/payu/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body: JSON.stringify({
          orderId: orderDetails._id,
          txnid: orderDetails.txnid,
          // Request server to set PayU return URLs to these frontend routes
          successUrl,
          failureUrl,
        }),
      });

      if (!initResp.ok) {
        throw new Error("Failed to initiate payment");
      }

      const { formData, paymentUrl } = await initResp.json();

      // Create and submit form to PayU
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;

      // Add form fields
      Object.entries(formData || {}).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
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

  // Redirect if cart is empty AND there is no pending order (from state/localStorage)
  const hasPendingOrder =
    !!location.state ||
    !!localStorage.getItem("pendingOrder") ||
    !!orderDetails;

  if (items.length === 0 && !hasPendingOrder) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 text-center bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            No Items to Checkout
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
          <Link to="/catalogue">
            <Button variant="primary" size="lg" className="w-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24 bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="text-gray-900 hover:underline font-medium">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/cart"
            className="text-gray-900 hover:underline font-medium"
          >
            Cart
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Checkout</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Checkout
        </h1>
        <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-gray-900 text-sm font-semibold">
            Authenticity Guaranteed – Fair Trade with Artisans
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Payment and Transaction Details */}
          <div className="space-y-8">
            <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                Transaction Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-300">
                  <span className="text-gray-700 font-medium">
                    Transaction ID
                  </span>
                  <span className="font-mono text-gray-900 bg-white px-3 py-1 rounded-md border border-gray-300 font-semibold">
                    {orderDetails?.txnid || "Loading..."}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-300">
                  <span className="text-gray-700 font-medium">Order Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(orderDetails?.totalPrice || 0)}
                  </span>
                </div>
              </div>
            </section>

            {/* Payment Method - Only PayU */}
            <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                Payment Method
              </h2>
              <div className="p-4 border rounded-md bg-white border-yellow-400">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-8 h-8 text-yellow-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        strokeWidth="2"
                      />
                      <path d="M3 10H21" strokeWidth="2" />
                    </svg>
                    <span className="text-gray-900 font-semibold">
                      PayU Payment Gateway
                    </span>
                  </div>
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  You'll be redirected to PayU's secure payment gateway to
                  complete your purchase.
                </p>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-6 sticky top-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 bg-center bg-cover rounded-md flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      role="img"
                      aria-label={item.title}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-semibold truncate">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-gray-900 font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transaction Details */}
              <div className="border-t border-gray-300 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Transaction ID
                  </span>
                  <span className="text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded-md border border-gray-300 font-semibold text-xs">
                    {orderDetails?.txnid || "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-gray-900">Order Total</span>
                  <span className="text-gray-900">
                    {formatCurrency(orderDetails?.totalPrice || 0)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-8"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Payment Status Modal */}
      {paymentStatus && (
        <PaymentModal status={paymentStatus} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CheckoutPage;
