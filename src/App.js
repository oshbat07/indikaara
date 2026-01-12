import React, { useEffect } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/globals.css";
import ScrollToTop from "./utils/scrollToTop";
import axiosClient from "./api/axiosClient";
import LogoLoader from "./components/LogoLoader";
import ProductDetailPage from "./pages/ProductDetailPage";
import CataloguePage from "./pages/CataloguePage";
// Lazy import all pages for code-splitting
const HomePage = lazy(() => import("./pages/HomePage"));
// const CataloguePage = lazy(() => import("./pages/CataloguePage"));
// const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AddressPage = lazy(() => import("./pages/AddressPage"));
const ArtisansPage = lazy(() => import("./pages/ArtisansPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const CreateBlogPage = lazy(() => import("./pages/CreateBlogPage"));
const AdminBlogPage = lazy(() => import("./pages/AdminBlogPage"));
const EditBlogPage = lazy(() => import("./pages/EditBlogPage"));
const CommentModerationPage = lazy(() => import("./pages/CommentModerationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const FoundationPage = lazy(() => import("./pages/FoundationPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const EnquiryPage = lazy(() => import("./pages/EnquiryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BiomassPage = lazy(() => import("./pages/BiomassPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PaymentFailurePage = lazy(() => import("./pages/PaymentFailurePage"));

/**
 * App Component - Main application component with routing
 * Features: React Router setup, cart context provider, layout wrapper, and page routing
 */
function App() {
  useEffect(() => {
    axiosClient
      .get("/api/health")
      .catch((err) => console.error("Health check failed:", err));
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Suspense fallback={<LogoLoader />}>
            <ScrollToTop />
            <Layout>
              <Routes>
                {/* Home Page Route */}
                <Route path="/" element={<HomePage />} />

                {/* Catalogue Route */}
                <Route path="/catalogue" element={<CataloguePage />} />

                {/* Product Detail Route */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/biomass" element={<BiomassPage />} />
                {/* Cart Route */}
                <Route path="/cart" element={<CartPage />} />

                {/* Enquiry Route */}
                <Route path="/enquiry" element={<EnquiryPage />} />

                {/* Wishlist Route */}
                <Route path="/wishlist" element={<WishlistPage />} />

                {/* Address and Checkout Routes */}
                <Route path="/address" element={<AddressPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/payment/success"
                  element={<PaymentSuccessPage />}
                />
                <Route
                  path="/payment/failure"
                  element={<PaymentFailurePage />}
                />

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
                
                {/* Admin Blog Routes */}
                <Route path="/blog/admin" element={<AdminBlogPage />} />
                <Route path="/blog/admin/edit/:id" element={<EditBlogPage />} />
                <Route path="/blog/admin/comments" element={<CommentModerationPage />} />

                {/* Support & Legal Pages */}
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/foundation" element={<FoundationPage />} />
                <Route path="/coming-soon/:slug" element={<ComingSoonPage />} />
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
                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
