import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ArtisansPage from "./pages/ArtisansPage";
import WishlistPage from "./pages/WishlistPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/globals.css";

/**
 * App Component - Main application component with routing
 * Features: React Router setup, cart context provider, layout wrapper, and page routing
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Home Page Route */}
              <Route path="/" element={<HomePage />} />

              {/* Catalogue Route */}
              <Route path="/catalogue" element={<CataloguePage />} />

              {/* Product Detail Route */}
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* Cart Route */}
              <Route path="/cart" element={<CartPage />} />

              {/* Wishlist Route */}
              <Route path="/wishlist" element={<WishlistPage />} />

              {/* Checkout Route */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Artisan Routes */}
              <Route path="/artisans" element={<ArtisansPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} />
              <Route path="/login/success" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              {/* Blog Routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/blog/create" element={<CreateBlogPage />} />

              {/* Support & Legal Pages */}
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />

              {/* Other Routes - Placeholder for future implementation */}
              <Route
                path="/about"
                element={
                  <div className="p-8 text-center text-primary">
                    About Us page coming soon...
                  </div>
                }
              />
              <Route
                path="/shipping"
                element={
                  <div className="p-8 text-center text-primary">
                    Shipping Info page coming soon...
                  </div>
                }
              />
              <Route
                path="/returns"
                element={
                  <div className="p-8 text-center text-primary">
                    Returns & Exchanges page coming soon...
                  </div>
                }
              />
              <Route
                path="/cookies"
                element={
                  <div className="p-8 text-center text-primary">
                    Cookie Policy page coming soon...
                  </div>
                }
              />
              <Route
                path="/accessibility"
                element={
                  <div className="p-8 text-center text-primary">
                    Accessibility page coming soon...
                  </div>
                }
              />
              <Route
                path="/sitemap"
                element={
                  <div className="p-8 text-center text-primary">
                    Sitemap page coming soon...
                  </div>
                }
              />
              <Route
                path="/newsletter"
                element={
                  <div className="p-8 text-center text-primary">
                    Newsletter page coming soon...
                  </div>
                }
              />

              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
