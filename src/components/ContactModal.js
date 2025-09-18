import React from "react";

/**
 * ContactModal Component - Modal displaying company contact information
 * Features: 
 * - Company contact details
 * - Email and phone information
 * - Responsive design
 * - Close on backdrop click or ESC key
 */
const ContactModal = ({ isOpen, onClose }) => {
  // Close modal on ESC key press
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-surface-primary rounded-xl shadow-2xl max-w-sm w-full mx-4 p-5 transform transition-all duration-300 scale-100 border border-surface-secondary">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Get in Touch</h2>
          <p className="text-text-secondary text-sm">We'd love to hear from you. Send us a message!</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-secondary/80 transition-colors border border-surface-secondary">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">Email</p>
              <a 
                href="mailto:info@indikaara.com" 
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                info@indikaara.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-secondary/80 transition-colors border border-surface-secondary">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">Phone</p>
              <a 
                href="tel:+919179219231" 
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                +91 9179219231
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-secondary/80 transition-colors border border-surface-secondary">
            <div className="w-8 h-8 bg-green-600/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">WhatsApp</p>
              <button 
                onClick={() => {
                  const message = encodeURIComponent("Hello! I'm interested in your products and would like to make an enquiry.");
                  window.open(`https://wa.me/919179219231?text=${message}`, '_blank');
                }}
                className="text-xs text-green-500 hover:text-green-400 transition-colors"
              >
                Chat with us
              </button>
            </div>
          </div>

          {/* Address */}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-surface-secondary text-center">
          <p className="text-xs text-text-secondary">
            We typically respond within 24 hours
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactModal;
