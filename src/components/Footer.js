import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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
                Our Foundation
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
              {/* <Link
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
              </Link> */}
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
                <InstagramIcon fontSize="large" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61577220497565"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon fontSize="large" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/indikaara-exports-742107371/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon fontSize="large" />
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

          <p className="text-sm text-text-secondary mb-4 md:mb-0">
            This website is operated by Indikaara Exports
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
