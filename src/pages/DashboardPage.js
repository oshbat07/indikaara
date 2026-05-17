import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { countries } from "../data/countries";

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
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    label: "Home",
    customLabel: "",
    isDefault: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    label: "",
  });
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

  // Fetch addresses when user opens the Addresses tab
  useEffect(() => {
    if (!isAuthenticated || activeTab !== "addresses") return;
    const fetchAddresses = async () => {
      try {
        setAddressesLoading(true);
        const res = await axios.get("/api/users/addresses");
        setAddresses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setAddresses([]);
        console.error("Failed to fetch addresses", err);
      } finally {
        setAddressesLoading(false);
      }
    };
    fetchAddresses();
  }, [isAuthenticated, activeTab]);

  // Auto-hide status messages
  useEffect(() => {
    if (!status.show) return;
    const t = setTimeout(() => setStatus((s) => ({ ...s, show: false })), 3000);
    return () => clearTimeout(t);
  }, [status.show]);

  const addAddress = () => {
    setForm({
      fullName: user?.name || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      label: "Home",
      customLabel: "",
      isDefault: false,
    });
    setShowAddModal(true);
  };

  const saveAddress = async () => {
    // validate required fields
    const required = [
      "fullName",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];
    for (const key of required) {
      if (!form[key] || String(form[key]).trim() === "") {
        setStatus({
          show: true,
          type: "error",
          message: "Please fill in all required fields.",
        });
        return;
      }
    }

    const labelToSend =
      form.label === "Other" ? form.customLabel || "Other" : form.label;

    try {
      if (editingId) {
        const res = await axios.put(`/api/users/addresses/${editingId}`, {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
          label: labelToSend,
          isDefault: form.isDefault,
        });
        const updated = res.data;
        setAddresses((prev) =>
          prev.map((p) =>
            p._id === editingId || p.id === editingId
              ? { ...p, ...updated }
              : form.isDefault
                ? { ...p, isDefault: false }
                : p,
          ),
        );
        setStatus({ show: true, type: "success", message: "Address updated" });
      } else {
        const res = await axios.post("/api/users/addresses", {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
          label: labelToSend,
          isDefault: form.isDefault,
        });
        const created = res.data;
        setAddresses((prev) => {
          const updated = form.isDefault
            ? prev.map((p) => ({ ...p, isDefault: false }))
            : prev;
          return [created, ...updated];
        });
        setStatus({ show: true, type: "success", message: "Address added" });
      }
      setShowAddModal(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setStatus({
        show: true,
        type: "error",
        message: "Failed to save address",
      });
    }
  };

  const editAddress = (id) => {
    const addr = addresses.find((a) => a._id === id || a.id === id);
    if (!addr) return;
    setEditingId(id);
    setForm({
      fullName: addr.fullName || addr.name || "",
      phone: addr.phone || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      country: addr.country || "India",
      label: ["Home", "Office"].includes(addr.label)
        ? addr.label
        : addr.label || "Other",
      customLabel: ["Home", "Office"].includes(addr.label)
        ? ""
        : addr.label || "",
      isDefault: !!addr.isDefault,
    });
    setShowAddModal(true);
  };

  const openDeleteModal = (id, label) =>
    setDeleteModal({ show: true, id, label });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    try {
      await axios.delete(`/api/users/addresses/${id}`);
      setAddresses((prev) =>
        prev.filter((a) => !(a._id === id || a.id === id)),
      );
      setStatus({ show: true, type: "success", message: "Address deleted" });
    } catch (err) {
      console.error(err);
      setStatus({
        show: true,
        type: "error",
        message: "Failed to delete address",
      });
    } finally {
      setDeleteModal({ show: false, id: null, label: "" });
    }
  };

  const setDefault = async (id) => {
    try {
      await axios.put(`/api/users/addresses/${id}/default`);
      setAddresses((prev) =>
        prev.map((p) => ({ ...p, isDefault: p._id === id || p.id === id })),
      );
      setStatus({
        show: true,
        type: "success",
        message: "Default address updated",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        show: true,
        type: "error",
        message: "Failed to set default address",
      });
    }
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
                {addressesLoading ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ac1f23]" />
                    <p className="mt-4 text-gray-600">Loading addresses...</p>
                  </div>
                ) : addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <div
                      key={addr._id || addr.id}
                      className="border border-gray-200 rounded-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {addr.isDefault ? "Default address" : "Address"}
                        </div>
                        <div className="mt-2 text-gray-700">
                          <div>{addr.fullName || addr.name}</div>
                          <div>{addr.address}</div>
                          <div>
                            {addr.city} {addr.state} {addr.postalCode}
                          </div>
                          <div>{addr.country}</div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-4 text-sm">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefault(addr._id || addr.id)}
                            className="text-gray-600 hover:text-black"
                          >
                            Make default
                          </button>
                        )}
                        <button
                          onClick={() => editAddress(addr._id || addr.id)}
                          className="text-gray-600 hover:text-black"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            openDeleteModal(
                              addr._id || addr.id,
                              addr.fullName || addr.name,
                            )
                          }
                          className="text-gray-600 hover:text-black"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No saved addresses
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Add an address to make checkout faster.
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={addAddress}
                        className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
                      >
                        Add address
                      </button>
                    </div>
                  </div>
                )}
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center py-5 px-4 sm:px-6">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-slate-50 shrink-0">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-950">
                {editingId ? "Edit Address" : "Add Address"}
              </h3>
              <button
                aria-label="Close"
                onClick={() => setShowAddModal(false)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Full name *
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    Phone *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Address *
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-2.5 py-2 h-20 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    City *
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    State *
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    Postal Code *
                  </label>
                  <input
                    value={form.postalCode}
                    onChange={(e) =>
                      setForm({ ...form, postalCode: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Label
                  </label>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <select
                      value={form.label}
                      onChange={(e) =>
                        setForm({ ...form, label: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                    >
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                    {form.label === "Other" && (
                      <input
                        placeholder="Custom label"
                        value={form.customLabel}
                        onChange={(e) =>
                          setForm({ ...form, customLabel: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                      />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                  <input
                    id="isDefault"
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) =>
                      setForm({ ...form, isDefault: e.target.checked })
                    }
                    className="h-4 w-4 text-[#ac1f23] rounded border-gray-300 focus:ring-[#ac1f23]"
                  />
                  <label htmlFor="isDefault" className="text-sm text-slate-900">
                    Make default address
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-md border border-gray-200 bg-white text-slate-900 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="w-full sm:w-auto px-3 py-2.5 rounded-md bg-[#ac1f23] hover:bg-[#8f1a1d] text-white"
              >
                {editingId ? "Update address" : "Save address"}
              </button>
            </div>
          </div>
        </div>
      )}

      {status.show && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`px-4 py-2 rounded-md shadow ${status.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          >
            {status.message}
          </div>
        </div>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteModal({ show: false, id: null, label: "" })}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md z-10 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-slate-950">
              Delete address
            </h3>
            <p className="text-sm text-slate-800 mb-4">
              Are you sure you want to delete{" "}
              <strong>{deleteModal.label}</strong>?
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({ show: false, id: null, label: "" })
                }
                className="w-full sm:w-auto px-4 py-3 rounded-md border border-gray-200 bg-white text-slate-900 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-4 py-3 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
