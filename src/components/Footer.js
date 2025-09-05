import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component - Site footer with links and copyright information
 * Features: Navigation links, legal links, and copyright notice
 */
const Footer = () => {
  return (
    <footer className="border-t border-solid border-gray-700 py-8" role="contentinfo">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 mb-6" aria-label="Footer navigation">
          <Link 
            to="/contact" 
            className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
          >
            Contact Us
          </Link>
          <Link 
            to="/privacy" 
            className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors"
          >
            Terms of Service
          </Link>
        </nav>

        {/* Copyright Notice */}
        <p className="text-sm text-secondary">
          ©2024 Artisan's Emporium. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
