import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo1.png";

/**
 * Header Component - Main navigation header for the application
 * Features: Logo, navigation menu, search bar, user actions, and profile
 * Responsive: Includes burger menu for mobile devices
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();

  // Track wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(wishlist.length);
      } catch (error) {
        setWishlistCount(0);
      }
    };

    // Initial load
    updateWishlistCount();

    // Listen for localStorage changes (from other tabs)
    window.addEventListener("storage", updateWishlistCount);

    // Listen for custom wishlist update events
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  // Track scroll position for sticky header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Apply/remove body class to neutralize header backdrop when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  // Prevent side-nav from becoming transparent on scroll, and optionally close it
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Force the menu to stay opaque on scroll
    const handleScroll = () => {
      // Force opacity refresh by accessing the DOM element
      const sideNav = document.querySelector(
        '.fixed[style*="z-index: 9999995"]'
      );
      if (sideNav) {
        sideNav.style.backgroundColor = "#1a1a1a";
        sideNav.style.opacity = "1";
      }

      // Uncommenting the line below would close the menu on scroll
      // setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // also listen for touchmove for some mobile browser behaviours
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${
        isMobileMenuOpen ? "z-40" : "z-50"
      } transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-surface-primary border-b border-gray-700"
      }`}
    >
      {/* Glass effect overlay when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none"></div>
      )}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl mx-auto relative">
        {/* Mobile Left Section - Burger Menu Only */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Hamburger Menu Button */}
          <button
            className="flex items-center justify-center p-2 text-secondary hover:text-primary transition-colors focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo and Navigation Section */}
        <div className="flex items-center gap-8">
          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <div className="flex items-center gap-4 text-primary md:static absolute left-1/2 md:left-auto transform -translate-x-1/2 md:transform-none">
            <Link
              to="/"
              className="text-primary text-xl font-bold leading-tight tracking-[-0.015em] hover:text-[var(--accent-color)] transition-colors focus:outline-none"
              onClick={closeMobileMenu}
            >
              {/* Mobile Logo - logo2.png with adjusted size to fit between icons */}
              <img
                src={logo}
                alt="Indikaara Logo"
                className="h-12 w-auto md:hidden"
              />
              {/* Desktop Logo - logo1.png */}
              <img
                src={logo}
                alt="Indikaara Logo"
                className="hidden md:block h-10 lg:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav
            className="hidden lg:flex items-center gap-9"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/catalogue"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Catalogue
            </Link>
            <Link
              to="/artisans"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Artisans
            </Link>
            {/* <Link 
              to="/blog" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Blog
            </Link> */}
          </nav>
        </div>

        {/* Desktop Search and Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-surface-secondary rounded-[var(--border-radius-full)] px-4 py-2 min-w-[300px]">
            <svg
              className="w-5 h-5 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for handcrafted treasures..."
              className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors relative focus:outline-none"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <div className="relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors relative focus:outline-none"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <div className="relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4.5"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors focus:outline-none"
              aria-label="User profile"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Cart and User Icons */}
          <Link
            to="/cart"
            className="relative focus:outline-none"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <svg
              className="w-6 h-6 text-secondary hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4.5"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile User/Login Icon */}
          <button
            className="flex items-center justify-center p-2 text-secondary hover:text-primary transition-colors focus:outline-none"
            aria-label="User profile"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 md:hidden" style={{ zIndex: 9999999 }}>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90"
            onClick={closeMobileMenu}
            style={{ zIndex: 9999990 }}
          ></div>

          {/* Side Navigation Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-70 bg-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-700 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ zIndex: 9999995, backgroundColor: "#1a1a1a", opacity: 1 }}
          >
            {/* Solid background overlay to prevent transparency */}
            <div className="fixed inset-0 right-[224px] w-70 bg-[#1a1a1a]"></div>
            <div
              className="flex flex-col h-full bg-[#1a1a1a] relative z-30"
              style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
            >
              {/* Header with Search */}
              <div
                className="p-4 border-b border-gray-800"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {/* Search Section at Top */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-3">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav
                className="flex-1 px-4 py-4 bg-[#1a1a1a]"
                role="navigation"
                aria-label="Mobile navigation"
                style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
              >
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>

                  <Link
                    to="/catalogue"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Catalogue
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>

                  <Link
                    to="/artisans"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Artisans
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>

                  <Link
                    to="/blog"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Blog
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                </div>

                {/* Account Section */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account
                  </div>

                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Wishlist
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </span>
                    )}
                  </Link>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}

                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4.5"
                        />
                      </svg>
                      Cart
                    </div>
                    {itemCount > 0 && (
                      <span className="bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </Link>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}

                  <button
                    className="flex items-center w-full px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </button>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}
                </div>
              </nav>
              {/* Made in India with Love - Footer */}
              <div
                className="px-4 py-4 border-t border-gray-800 bg-[#1a1a1a] relative z-40"
                style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
              >
                <div
                  className="absolute inset-0 bg-[#1a1a1a]"
                  style={{ opacity: 1 }}
                ></div>
                <div
                  className="flex items-center justify-center space-x-2 text-xs text-gray-400 relative z-50"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <span>Made in India with</span>
                  <svg
                    className="w-3 h-3 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
