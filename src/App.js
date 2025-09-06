import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound from './pages/NotFound';
import './styles/globals.css';

/**
 * App Component - Main application component with routing
 * Features: React Router setup, cart context provider, layout wrapper, and page routing
 */
function App() {
  return (
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
            
            {/* Checkout Route */}
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* Artisan Routes - Placeholder for future implementation */}
            <Route path="/artisans" element={<div className="p-8 text-center text-primary">Artisans page coming soon...</div>} />
            
            {/* Other Routes - Placeholder for future implementation */}
            <Route path="/about" element={<div className="p-8 text-center text-primary">About Us page coming soon...</div>} />
            <Route path="/contact" element={<div className="p-8 text-center text-primary">Contact page coming soon...</div>} />
            <Route path="/privacy" element={<div className="p-8 text-center text-primary">Privacy Policy page coming soon...</div>} />
            <Route path="/terms" element={<div className="p-8 text-center text-primary">Terms of Service page coming soon...</div>} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
