import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

/**
 * WishlistPage Component - Displays user's saved/wishlisted products
 * Features: View saved items, remove from wishlist, add to cart
 */
const WishlistPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistItems(savedWishlist);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
      
      // Dispatch custom event to update header count
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      priceRange: item.priceRange,
      image: item.image,
      category: item.category,
      quantity: 1
    });
  };

  // Navigate to product detail page
  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Clear entire wishlist
  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      localStorage.removeItem('wishlist');
      setWishlistItems([]);
      
      // Dispatch custom event to update header count
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-8" role="main">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-primary text-xl">Loading your wishlist...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24" role="main">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-3">My Wishlist</h1>
        <p className="text-text-secondary text-lg">Your saved favorite products</p>
      </div>
      <div>
        {wishlistItems.length === 0 ? (
          // Empty wishlist state
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-2xl font-bold text-primary mb-4">Your wishlist is empty</h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Start browsing our beautiful collection and save your favorite items to see them here.
            </p>
            <Button
              onClick={() => navigate('/catalogue')}
              className="bg-primary text-background px-8 py-3 rounded-full hover:bg-secondary transition-colors font-medium"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          // Wishlist with items
          <>
            {/* Wishlist Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
              </h2>
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-400 border-red-400 hover:bg-red-900 hover:bg-opacity-20 font-medium"
              >
                Clear All
              </Button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-700">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 sm:h-48 object-cover cursor-pointer"
                      onClick={() => handleViewProduct(item.id)}
                    />
                    {/* Remove from wishlist button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gray-900 bg-opacity-80 text-red-400 hover:bg-red-900 hover:bg-opacity-80 rounded-full p-1 sm:p-2 shadow-md transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4">
                    <h3 
                      className="font-semibold text-primary mb-2 cursor-pointer hover:text-accent transition-colors text-sm sm:text-base line-clamp-2"
                      onClick={() => handleViewProduct(item.id)}
                    >
                      {item.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-3">{item.category}</p>
                    
                    {/* Price */}
                    <div className="mb-3 sm:mb-4">
                      {item.priceRange ? (
                        <p className="text-sm sm:text-lg font-bold text-primary">{item.priceRange}</p>
                      ) : (
                        <p className="text-sm sm:text-lg font-bold text-primary">₹{item.price?.toLocaleString()}</p>
                      )}
                    </div>

                    {/* Added date */}
                    <p className="text-xs text-text-secondary mb-3 sm:mb-4">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProduct(item.id)}
                        className="flex-1 text-xs sm:text-sm border-primary text-primary hover:bg-primary hover:text-background transition-colors font-medium py-1 sm:py-2"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-primary text-background hover:bg-secondary text-xs sm:text-sm font-medium transition-colors py-1 sm:py-2"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
