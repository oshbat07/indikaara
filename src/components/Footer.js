import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer Component - Site footer with sitemap, social links, and copyright
 * Features: Comprehensive sitemap, social media icons, and legal information
 */
const Footer = () => {
  return (
    <footer
      className="bg-gray-900/50 border-t border-solid border-gray-700 py-12"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Company</h3>
            <nav className="space-y-3" aria-label="Company navigation">
              <Link
                to="/"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                to="/catalogue"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Catalogue
              </Link>
              <Link
                to="/artisans"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Artisans
              </Link>
              <Link
                to="/foundation"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Foundation
              </Link>
              <Link
                to="/blog"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Support</h3>
            <nav className="space-y-3" aria-label="Support navigation">
              <Link
                to="/contact"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/shipping"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                to="/returns"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Returns & Exchanges
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Legal</h3>
            <nav className="space-y-3" aria-label="Legal navigation">
              <Link
                to="/privacy"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                to="/accessibility"
                className="block text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Accessibility
              </Link>
            </nav>
          </div>

          {/* Social Media & Brand Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Connect With Us
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Follow us for the latest updates on handcrafted treasures and
              artisan stories.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/indikaara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324C5.901 8.246 7.052 7.756 8.449 7.756s2.448.49 3.324 1.297c.807.876 1.297 2.027 1.297 3.324s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297zm7.098 0c-1.297 0-2.448-.49-3.324-1.297-.807-.876-1.297-2.027-1.297-3.324s.49-2.448 1.297-3.324c.876-.807 2.027-1.297 3.324-1.297s2.448.49 3.324 1.297c.807.876 1.297 2.027 1.297 3.324s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297z" />
                  <path d="M12 7.378c-2.552 0-4.622 2.069-4.622 4.622S9.448 16.622 12 16.622s4.622-2.069 4.622-4.622S14.552 7.378 12 7.378zM12 14.756c-1.497 0-2.711-1.214-2.711-2.711S10.503 9.334 12 9.334s2.711 1.214 2.711 2.711-1.214 2.711-2.711 2.711z" />
                  <circle cx="16.804" cy="7.217" r="1.078" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/indikaara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/indikaara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-sm text-text-secondary mb-4 md:mb-0">
            ©2025 Indikaara. All rights reserved. Handcrafted with ❤️ for
            artisan heritage.
          </p>

          {/* Quick Links */}
          <nav className="flex space-x-6" aria-label="Quick footer links">
            <Link
              to="/sitemap"
              className="text-text-secondary hover:text-primary text-sm transition-colors"
            >
              Sitemap
            </Link>
            <Link
              to="/newsletter"
              className="text-text-secondary hover:text-primary text-sm transition-colors"
            >
              Newsletter
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
