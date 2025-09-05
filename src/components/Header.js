import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

/**
 * Header Component - Main navigation header for the application
 * Features: Logo, navigation menu, search bar, user actions, and profile
 * Responsive: Includes burger menu for mobile devices
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-surface-primary border-b border-solid border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Logo and Navigation Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4 text-primary">
            <Link 
              to="/" 
              className="text-primary text-xl font-bold leading-tight tracking-[-0.015em] hover:text-[var(--accent-color)] transition-colors"
              onClick={closeMobileMenu}
            >
              <img src={logo} alt="Indikaara Logo" className="h-10 md:h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-9" role="navigation" aria-label="Main navigation">
            <Link 
              to="/" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
              aria-current="page"
            >
              Home
            </Link>
            <Link 
              to="/catalogue" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
            >
              Catalogue
            </Link>
            <Link 
              to="/categories" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/regions" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
            >
              Regions
            </Link>
            <Link 
              to="/artisans" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
            >
              Artisans
            </Link>
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
            <button 
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
              aria-label="Shopping cart"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m9.5-6v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </button>
            
            <button 
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
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
        <button
          className="lg:hidden flex items-center justify-center p-2 text-secondary hover:text-primary transition-colors"
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
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface-secondary border-t border-gray-700">
          <nav className="flex flex-col px-4 py-4 space-y-4" role="navigation" aria-label="Mobile navigation">
            <Link 
              to="/" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/catalogue" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Catalogue
            </Link>
            <Link 
              to="/categories" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Categories
            </Link>
            <Link 
              to="/regions" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Regions
            </Link>
            <Link 
              to="/artisans" 
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Artisans
            </Link>
            
            {/* Mobile Search */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 bg-surface-primary rounded-[var(--border-radius-full)] px-4 py-2">
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
                  placeholder="Search treasures..."
                  className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm w-full"
                />
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-700">
              <button 
                className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                aria-label="Shopping cart"
                onClick={closeMobileMenu}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m9.5-6v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <span className="text-sm">Cart</span>
              </button>
              
              <button 
                className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                aria-label="User profile"
                onClick={closeMobileMenu}
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
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
