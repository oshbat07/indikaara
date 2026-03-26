import React from "react";
import "./ShippingAndReturn.css";

const points = [
  {
    label: "Sabr",
    color: "#38bdf8",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
    text: "Your order is usually dispatched within 24 hours of placing the order.",
  },
  {
    label: "Raftaar",
    color: "#f59e42",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#f59e42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h20M12 2l4 4-4 4M12 22l-4-4 4-4" />
      </svg>
    ),
    text: "We offer express delivery, typically arriving in 2-5 days. Please keep your phone reachable.",
  },
  {
    label: "Sukoon",
    color: "#10b981",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    text: "Easy returns and replacements within 5 days.",
  },
  {
    label: "Dastoor",
    color: "#ef4444",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="7" rx="2" />
        <path d="M16 11V7a4 4 0 00-8 0v4" />
      </svg>
    ),
    text: "COD and shipping charges may apply to certain items.",
  },
];

const ShippingAndReturn = () => (
  <section className="shipping-return-section-modern dark-theme w-full py-16 px-4 sm:px-6 lg:px-8 mb-16">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="shipping-return-title text-4xl sm:text-5xl font-bold mb-3 text-white">
          Shipping & Return
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          Fast, reliable, and hassle-free. We've got you covered every step of
          the way.
        </p>
      </div>
      <ul className="shipping-return-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {points.map((point) => (
          <li
            key={point.label}
            className="shipping-return-item flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/40 shadow-lg hover:shadow-2xl hover:border-slate-500/60 transition-all duration-300 h-full hover:transform hover:scale-105 hover:from-slate-700/70 hover:to-slate-800/70"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-30"
                style={{
                  backgroundColor: point.color,
                  width: "60px",
                  height: "60px",
                  margin: "auto",
                }}
              />
              <span className="shipping-return-icon relative block">
                {point.icon}
              </span>
            </div>
            <div>
              <span
                className="font-bold text-xl sm:text-2xl block mb-2"
                style={{ color: point.color }}
              >
                {point.label}
              </span>
              <span className="text-gray-300 text-sm sm:text-base leading-relaxed block">
                {point.text}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ShippingAndReturn;
