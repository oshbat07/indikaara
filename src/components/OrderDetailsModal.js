import React from "react";
import { formatCurrency } from "../utils/formatters";

const OrderDetailsModal = ({ order, onClose, onRetryPayment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  console.log("order", order);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono text-gray-900">
                #{order._id.slice(-8)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Order Date</span>
              <span className="text-gray-900">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.isPaid
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
            <div className="text-gray-600">
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              {/* <p>Phone: {order.shippingAddress.phoneNumber}</p> */}
            </div>
          </div>

          {/* Products List */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-4">
              {order.products.map((item) => (
                <div key={item._id} className="flex gap-4">
                  {/* <div
                    className="w-16 h-16 bg-center bg-cover rounded-lg flex-shrink-0"
                    style={{ backgroundImage: `url("${item.product.image}")` }}
                  /> */}
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-6">
            <div className="bg-[#ac1f23]/5 rounded-lg p-4 border-2 border-[#ac1f23]/10">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">
                  Order Total
                </span>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block mb-1">
                    Final Amount
                  </span>
                  <span className="text-2xl font-bold text-[#ac1f23]">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          {!order.isPaid && (
            <button
              onClick={() => onRetryPayment(order.txnid)}
              className="bg-[#ac1f23] hover:bg-[#a46840] text-white px-4 py-2 rounded-md transition-colors"
            >
              Retry Payment
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
