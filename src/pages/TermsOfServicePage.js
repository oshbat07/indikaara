import React from 'react';

/**
 * TermsOfServicePage Component - Terms and conditions for website usage
 * Features: Comprehensive terms of service, user agreements, legal information
 * Uses global CSS variables for consistent theming
 */
const TermsOfServicePage = () => {
  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-text-secondary">
            Last updated: September 12, 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800/50 rounded-xl p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
              <p className="text-text-secondary leading-relaxed">
                Welcome to Indikaara. These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our services.
              </p>
            </section>

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Definitions</h2>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li><strong>"Company"</strong> refers to Indikaara Handicrafts Pvt Ltd</li>
                <li><strong>"Service"</strong> refers to our website, products, and related services</li>
                <li><strong>"User"</strong> refers to anyone who accesses or uses our Service</li>
                <li><strong>"Products"</strong> refers to handcrafted items sold through our platform</li>
                <li><strong>"Content"</strong> refers to text, images, videos, and other materials on our platform</li>
              </ul>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By creating an account, making a purchase, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and customers of our Service.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">User Accounts</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To access certain features of our Service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Products and Orders */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Products and Orders</h2>
              
              <h3 className="text-xl font-medium text-text-primary mb-3">Product Information</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                We strive to provide accurate product descriptions, images, and pricing. However, due to the handcrafted nature of our products, slight variations in color, size, and design may occur. We reserve the right to correct any errors in product information or pricing.
              </p>

              <h3 className="text-xl font-medium text-text-primary mb-3">Orders and Payment</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                When you place an order, you are making an offer to purchase products. We reserve the right to accept or decline any order. Payment must be received before order processing begins. All prices are in Indian Rupees (INR) unless otherwise specified.
              </p>

              <h3 className="text-xl font-medium text-text-primary mb-3">Order Modifications and Cancellations</h3>
              <p className="text-text-secondary leading-relaxed">
                Orders may be modified or cancelled within 2 hours of placement. After this period, orders enter production and cannot be modified. Custom orders cannot be cancelled once production begins.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Shipping and Delivery</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We offer shipping within India and internationally. Delivery times are estimates and may vary due to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
                <li>Product availability and customization requirements</li>
                <li>Shipping destination and method selected</li>
                <li>Customs procedures for international orders</li>
                <li>Weather conditions and unforeseen circumstances</li>
              </ul>
              <p className="text-text-secondary leading-relaxed">
                Risk of loss and title pass to you upon delivery to the shipping carrier. We are not responsible for delays or damages during shipping.
              </p>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Returns and Refunds</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We want you to be completely satisfied with your purchase. Our return policy includes:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
                <li>30-day return window for most items in original condition</li>
                <li>Custom or personalized items are non-returnable unless defective</li>
                <li>Return shipping costs are the responsibility of the customer unless items are defective</li>
                <li>Refunds will be processed within 5-7 business days after return verification</li>
              </ul>
              <p className="text-text-secondary leading-relaxed">
                For detailed return instructions, please contact our customer service team.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property Rights</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Indikaara and are protected by international copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Reproduce, distribute, or create derivative works from our content</li>
                <li>Use our trademarks or logos without written permission</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use automated systems to access or scrape our website</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Prohibited Uses</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You may not use our Service:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>For any unlawful purpose or to solicit unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit harmful code, viruses, or malicious software</li>
                <li>To harass, abuse, insult, harm, defame, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To infringe upon intellectual property rights</li>
                <li>To spam or send unsolicited communications</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Limitation of Liability</h2>
              <p className="text-text-secondary leading-relaxed">
                To the fullest extent permitted by law, Indikaara shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising from your use of the Service. Our total liability shall not exceed the amount you paid for the specific product or service giving rise to the claim.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Disclaimer</h2>
              <p className="text-text-secondary leading-relaxed">
                The information on this website is provided on an "as is" basis. We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Indemnification</h2>
              <p className="text-text-secondary leading-relaxed">
                You agree to defend, indemnify, and hold harmless Indikaara and its affiliates from any claims, damages, obligations, losses, liabilities, costs, or fees arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Termination</h2>
              <p className="text-text-secondary leading-relaxed">
                We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Governing Law</h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Changes to Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by email or through prominent notices on our website. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-700/50 rounded-lg p-6">
                <p className="text-text-primary mb-2"><strong>Indikaara Handicrafts Pvt Ltd</strong></p>
                <p className="text-text-secondary">Email: legal@indikaara.com</p>
                <p className="text-text-secondary">Phone: +91 98765 43210</p>
                <p className="text-text-secondary">
                  Address: 123 Artisan Street, Craft Quarter<br />
                  New Delhi, India - 110001
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
