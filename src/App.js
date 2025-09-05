import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFound from './pages/NotFound';
import './styles/globals.css';

/**
 * App Component - Main application component with routing
 * Features: React Router setup, layout wrapper, and page routing
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Catalogue Route */}
          <Route path="/catalogue" element={<CataloguePage />} />
          
          {/* Product Detail Route */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Category Routes - Placeholder for future implementation */}
          <Route path="/categories" element={<CataloguePage />} />
          <Route path="/categories/:category" element={<div className="p-8 text-center text-primary">Category details coming soon...</div>} />
          
          {/* Region Routes - Placeholder for future implementation */}
          <Route path="/regions" element={<div className="p-8 text-center text-primary">Regions page coming soon...</div>} />
          <Route path="/regions/:region" element={<div className="p-8 text-center text-primary">Region details coming soon...</div>} />
          
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
  );
}

export default App;
