import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import OrderDetailsModal from "../components/OrderDetailsModal";

// Utility functions for order display
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getTotalItems = (products) => {
  return products.reduce((sum, item) => sum + (item.quantity || 0), 0);
};

const DashboardPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'addresses'
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 10;

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleRetryPayment = (txnid) => {
    window.open(`/checkout?txnid=${txnid}`, "_blank");
    handleCloseModal();
  };

  // Derived caption for breadcrumb
  const breadcrumb = useMemo(
    () => (activeTab === "orders" ? "Account" : "Addresses"),
    [activeTab],
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const res = await axios.get("/api/orders/my");
        const ordersData = Array.isArray(res.data)
          ? res.data
          : res.data?.orders || [];
        // Sort orders by date in descending order before setting state
        const sortedOrders = ordersData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setOrders(sortedOrders);
      } catch (e) {
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  // Seed one default address from user data if available (local-only demo)
  useEffect(() => {
    if (addresses.length === 0) {
      setAddresses((prev) => {
        if (prev.length) return prev;
        return [
          {
            id: "default",
            name: user?.name || "Anonymous",
            country: "India",
            isDefault: true,
          },
        ];
      });
    }
  }, [user, addresses.length, orders]);

  const addAddress = () => {
    const name = window.prompt("Full Name", user?.name || "");
    if (!name) return;
    const country = window.prompt("Country", "India") || "India";
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        country,
        isDefault: prev.length === 0,
      },
    ]);
  };

  const editAddress = (id) => {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;
    const name = window.prompt("Full Name", addr.name) || addr.name;
    const country = window.prompt("Country", addr.country) || addr.country;
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name, country } : a)),
    );
  };

  const deleteAddress = (id) => {
    if (!window.confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="min-h-screen bg-white py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Top bar: Tabs + Logout */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-8">
            <button
              className={`relative py-4 text-sm md:text-base font-semibold ${
                activeTab === "orders"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
              {activeTab === "orders" && (
                <span className="absolute left-0 -bottom-px h-[2px] w-full bg-black" />
              )}
            </button>
            <button
              className={`relative py-4 text-sm md:text-base font-semibold ${
                activeTab === "addresses"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
              {activeTab === "addresses" && (
                <span className="absolute left-0 -bottom-px h-[2px] w-full bg-black" />
              )}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm md:text-base font-medium text-gray-600 hover:text-black"
          >
            Logout
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-4">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-black"
          >
            Home
          </span>
          <span className="mx-2">›</span>
          <span className="text-black">{breadcrumb}</span>
        </div>

        {/* User info */}
        <div className="mt-6 border border-gray-200 rounded-md px-4 py-4 flex items-start justify-between">
          <div>
            <div className="text-base md:text-lg font-semibold text-black">
              {`Welcome, ${
                user?.name ||
                user?.userName ||
                [user?.given_name, user?.family_name]
                  .filter(Boolean)
                  .join(" ") ||
                (user?.email ? user.email.split("@")[0] : "Anonymous")
              }`}
            </div>
            <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
              {user?.email || "No email on file"}
              {(user?.emailVerified || user?.email_verified) && (
                <VerifiedIcon fontSize="small" sx={{ color: "#16a34a" }} />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10">
          {activeTab === "orders" && (
            <div className="max-w-4xl mx-auto">
              {/* Welcome Card */}
              <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold">
                  Welcome, {user?.name || "Guest"}
                </h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>

              {/* Orders Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      You have {orders?.length || 0} orders
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/catalogue")}
                  className="bg-[#ac1f23] hover:bg-[#a46840] text-white text-sm font-medium px-4 py-2 rounded"
                >
                  Continue shopping
                </button>
              </div>

              {/* Orders Section */}
              {ordersLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ac1f23]"></div>
                  <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
              ) : orders?.length > 0 ? (
                <div className="mt-6">
                  <div className="space-y-4">
                    {orders
                      // Sort orders by date in descending order (most recent first)
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                      )
                      .slice(
                        (currentPage - 1) * ordersPerPage,
                        currentPage * ordersPerPage,
                      )
                      .map((order) => (
                        <div
                          key={order._id}
                          className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              {/* Order info */}
                              <div>
                                <p className="text-sm text-gray-500">
                                  Order placed on {formatDate(order.createdAt)}
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {getTotalItems(order.products)} items
                                </p>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Total Amount
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {formatCurrency(order.totalPrice)}
                                </p>
                              </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                              <div className="flex items-center space-x-2">
                                <span className="flex-shrink-0">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      order.isPaid
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {order.isPaid ? "Paid" : "Pending"}
                                  </span>
                                </span>
                                <span className="text-sm text-gray-500">
                                  Order #{order._id.slice(-8)}
                                </span>
                              </div>

                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={() => handleViewDetails(order)}
                                  className="text-sm font-medium text-[#ac1f23] hover:text-[#a46840]"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Pagination */}
                  {orders.length > ordersPerPage && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        Previous
                      </button>

                      {Array.from(
                        { length: Math.ceil(orders.length / ordersPerPage) },
                        (_, i) => i + 1,
                      ).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded ${
                            currentPage === pageNum
                              ? "bg-[#ac1f23] text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(
                              prev + 1,
                              Math.ceil(orders.length / ordersPerPage),
                            ),
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(orders.length / ordersPerPage)
                        }
                        className={`px-3 py-1 rounded ${
                          currentPage ===
                          Math.ceil(orders.length / ordersPerPage)
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4m8-8v16m9-8l-3 3m0 0l-3-3m3 3V8m0 8l-3-3m3 3l3-3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start shopping to see your orders here.
                  </p>
                  <button
                    onClick={() => navigate("/catalogue")}
                    className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
                  >
                    Browse Products
                  </button>
                </div>
              )}

              {/* Benefits row */}
              <div className="flex flex-col sm:flex-row gap-10 mt-20 text-center text-black/80">
                <div>
                  <div className="flex justify-center mb-3">
                    <LoyaltyIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    PREMIUM & ETHICAL{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Sourced ethically with the finest, authentic materials.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <VerifiedIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUALITY ASSURED{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Every piece undergoes a multi-point quality inspection.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <RocketLaunchIcon
                      fontSize="large"
                      sx={{ color: "#ac1f23" }}
                    />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUICK DISPATCH
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Orders dispatched within 48 hours
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="py-10">
              <h2 className="text-3xl md:text-4xl text-center font-semibold text-black">
                Addresses{" "}
                <span className="text-gray-400">{addresses.length}</span>
              </h2>

              <div className="max-w-2xl mx-auto mt-10 space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-gray-200 rounded-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {addr.isDefault ? "Default address" : "Address"}
                      </div>
                      <div className="mt-2 text-gray-700">
                        <div>{addr.name}</div>
                        <div>{addr.country}</div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4 text-sm">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefault(addr.id)}
                          className="text-gray-600 hover:text-black"
                        >
                          Make default
                        </button>
                      )}
                      <button
                        onClick={() => editAddress(addr.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={addAddress}
                  className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
                >
                  Add address
                </button>
              </div>

              {/* Benefits row (mirrors screenshot layout) */}
              <div className="flex flex-col sm:flex-row gap-10 mt-20 text-center text-black/80 ">
                <div>
                  <div className="flex justify-center mb-3">
                    <LoyaltyIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    PREMIUM & ETHICAL{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Sourced ethically with the finest, authentic materials.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <VerifiedIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUALITY ASSURED{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Every piece undergoes a multi-point quality inspection.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <RocketLaunchIcon
                      fontSize="large"
                      sx={{ color: "#ac1f23" }}
                    />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUICK DISPATCH
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Orders dispatched within 48 hours
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onRetryPayment={handleRetryPayment}
        />
      )}
    </div>
  );
};

export default DashboardPage;
