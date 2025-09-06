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
    <main className="container mx-auto max-w-7xl px-4 py-8">
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
                <div key={item.id} className="flex items-center gap-4 pb-6 border-b border-border-color last:border-b-0 last:pb-0">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-20 h-20 bg-center bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      role="img"
                      aria-label={item.title}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-primary font-medium text-lg truncate">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1">
                      {item.category || 'Handcrafted Item'}
                    </p>
                    <p className="text-primary font-semibold mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
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

                  {/* Remove Button */}
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
