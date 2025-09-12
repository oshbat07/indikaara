import React, { useState } from "react";

/**
 * FAQPage Component - Frequently Asked Questions page
 * Features: Expandable FAQ sections, search functionality, organized categories
 * Uses global CSS variables for consistent theming
 */
const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      category: "Ordering & Shopping",
      questions: [
        {
          id: 1,
          question: "How do I place an order?",
          answer:
            "Browse our catalogue, add items to your cart, and proceed to checkout. You can pay securely using various payment methods including credit cards, PayPal, and bank transfers.",
        },
        {
          id: 2,
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or cancelled within 2 hours of placement. After this time, please contact our customer service team for assistance.",
        },
        {
          id: 3,
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship worldwide! Shipping costs and delivery times vary by location. Check our shipping page for detailed information about your region.",
        },
      ],
    },
    {
      category: "Products & Authenticity",
      questions: [
        {
          id: 4,
          question: "Are all products handmade by artisans?",
          answer:
            "Yes, every product in our collection is handcrafted by skilled Indian artisans. We work directly with craftspeople to ensure authenticity and fair compensation.",
        },
        {
          id: 5,
          question: "How do you ensure product quality?",
          answer:
            "Our team personally inspects each item before shipping. We maintain strict quality standards and work closely with our artisan partners to ensure consistent excellence.",
        },
        {
          id: 6,
          question: "Can I request custom modifications?",
          answer:
            "Many of our artisans can accommodate custom requests for colors, sizes, or designs. Contact us with your specific requirements for a personalized quote.",
        },
      ],
    },
    {
      category: "Shipping & Returns",
      questions: [
        {
          id: 7,
          question: "How long does shipping take?",
          answer:
            "Domestic shipping typically takes 3-7 business days. International shipping ranges from 7-21 business days depending on your location and chosen shipping method.",
        },
        {
          id: 8,
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items in original condition. Custom or personalized items may have different return conditions. Please see our Returns page for full details.",
        },
        {
          id: 9,
          question: "How do I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard.",
        },
      ],
    },
    {
      category: "Account & Support",
      questions: [
        {
          id: 10,
          question: "Do I need an account to shop?",
          answer:
            "While you can browse as a guest, creating an account allows you to track orders, save favorites, and enjoy a personalized shopping experience.",
        },
        {
          id: 11,
          question: "How can I contact customer support?",
          answer:
            "You can reach us through our Contact page, email us at support@indikaara.com, or use the live chat feature during business hours (9 AM - 6 PM IST).",
        },
        {
          id: 12,
          question: "Are my payment details secure?",
          answer:
            "Absolutely. We use industry-standard SSL encryption and partner with trusted payment processors to ensure your personal and financial information is always protected.",
        },
      ],
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our handcrafted products,
            ordering process, and artisan partnerships.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-primary mb-6 border-b border-gray-600 pb-3">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-600 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left bg-gray-700/30 hover:bg-gray-700/50 transition-colors focus:outline-none focus:bg-gray-700/50"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-text-primary pr-4">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-text-secondary transform transition-transform ${
                            openFAQ === faq.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {openFAQ === faq.id && (
                      <div className="px-6 py-4 bg-gray-800/30">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Still have questions?
          </h3>
          <p className="text-text-secondary mb-6">
            Our customer support team is here to help you with any additional
            questions.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Support
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
