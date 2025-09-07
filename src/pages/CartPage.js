import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

/**
 * CartPage Component - Shopping cart page with items and summary
 */
const CartPage = () => {
  const { items, itemCount, subtotal, shipping, tax, total, updateQuantity, removeFromCart } = useCart();

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <svg 
              className="w-24 h-24 mx-auto text-text-secondary mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4.5" 
              />
            </svg>
            <h2 className="text-3xl font-bold text-primary mb-3">Your Cart is Empty</h2>
            <p className="text-text-secondary text-lg">
              Discover beautiful handcrafted items from talented Indian artisans
            </p>
          </div>
          <Link to="/catalogue">
            <Button variant="primary" size="lg" className="w-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">Cart</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Shopping Cart</h1>
        <p className="text-text-secondary">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card-bg border border-border-color rounded-xl p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="pb-6 border-b border-border-color last:border-b-0 last:pb-0">
                  {/* Mobile-optimized layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Product Image and Remove Button Row */}
                    <div className="flex items-start gap-4 sm:items-center">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-24 h-24 sm:w-20 sm:h-20 bg-center bg-cover rounded-lg"
                          style={{ backgroundImage: `url("${item.image}")` }}
                          role="img"
                          aria-label={item.title}
                        />
                      </div>

                      {/* Product Info - takes remaining space */}
                      <div className="flex-1 min-w-0">
                        {/* Product Name - Larger and more prominent */}
                        <h3 className="text-primary font-semibold text-lg sm:text-xl leading-tight mb-2">
                          {item.title}
                        </h3>
                        
                        {/* Category */}
                        <p className="text-text-secondary text-sm mb-3">
                          {item.category || 'Handcrafted Item'}
                        </p>
                        
                        {/* Key Product Details - More prominent */}
                        <div className="space-y-2 mb-3">
                          {item.dimensions && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              <span className="text-primary font-medium text-sm">
                                Size: <span className="text-accent">{item.dimensions}</span>
                              </span>
                            </div>
                          )}
                          {item.color && item.color !== 'Standard' && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                              </svg>
                              <span className="text-primary font-medium text-sm">
                                Color: <span className="text-accent">{item.color}</span>
                              </span>
                            </div>
                          )}
                          {item.material && item.material !== 'Handcrafted' && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                              <span className="text-primary font-medium text-sm">
                                Material: <span className="text-accent">{item.material}</span>
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Price - More prominent */}
                        <p className="text-primary font-bold text-lg">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      {/* Remove Button - Top right on mobile */}
                      <div className="flex-shrink-0 sm:hidden">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls Row - Better spacing on mobile */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3 lg:flex-row lg:items-center lg:justify-end">
                      <div className="flex items-center gap-3 bg-card-bg border border-border-color rounded-lg p-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-border-color text-primary hover:bg-text-secondary hover:text-background transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-primary font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-border-color text-primary hover:bg-text-secondary hover:text-background transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button - Hidden on mobile, shown on larger screens */}
                      <div className="hidden sm:block">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-border-color rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-primary font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-primary font-medium">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax</span>
                <span className="text-primary font-medium">{formatCurrency(tax)}</span>
              </div>
              
              <div className="border-t border-border-color pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-primary">Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link to="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link to="/catalogue" className="block">
                <Button variant="secondary" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Authenticity Badge */}
            <div className="mt-6 p-4 bg-background rounded-lg border border-border-color">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-primary text-sm font-medium">Authenticity Guaranteed</p>
                  <p className="text-text-secondary text-xs">Fair Trade with Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
