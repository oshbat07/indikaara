import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

/**
 * CheckoutPage Component - Checkout page with shipping and payment details
 */
const CheckoutPage = () => {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    
    // Payment Information
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      alert('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
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

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-3">No Items to Checkout</h2>
          <p className="text-text-secondary text-lg mb-8">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
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
          <Link to="/cart" className="text-primary hover:underline">Cart</Link>
          <span>/</span>
          <span className="text-primary font-medium">Checkout</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Checkout</h1>
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border-color rounded-full px-4 py-2">
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-primary text-sm font-medium">
            Authenticity Guaranteed – Fair Trade with Artisans
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-text-secondary mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-text-secondary mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                      placeholder="Postal code"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'credit-card', label: 'Credit Card' },
                  { id: 'net-banking', label: 'Net Banking' },
                  { id: 'upi', label: 'UPI' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-accent bg-card-bg'
                        : 'border-border-color hover:border-text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => handlePaymentMethodChange(e.target.value)}
                      className="w-5 h-5 text-accent border-border-color focus:ring-accent"
                    />
                    <span className="text-primary font-medium">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Credit Card Fields */}
              {formData.paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-text-secondary mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                      placeholder="1234 5678 9101 1121"
                      required={formData.paymentMethod === 'credit-card'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-text-secondary mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                        placeholder="MM/YY"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-text-secondary mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                        placeholder="123"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card-bg border border-border-color rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 bg-center bg-cover rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      role="img"
                      aria-label={item.title}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-primary font-medium truncate">{item.title}</h3>
                      <p className="text-text-secondary text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-primary font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border-color pt-4 space-y-3">
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
                <div className="border-t border-border-color pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                type="submit"
                variant="primary" 
                size="lg" 
                className="w-full mt-8"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;
