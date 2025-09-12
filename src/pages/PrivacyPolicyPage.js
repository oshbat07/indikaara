import React from "react";

/**
 * PrivacyPolicyPage Component - Privacy policy and data protection information
 * Features: Comprehensive privacy policy, data handling practices, user rights
 * Uses global CSS variables for consistent theming
 */
const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-text-secondary">
            Last updated: September 12, 2025
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800/50 rounded-xl p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Introduction
              </h2>
              <p className="text-text-secondary leading-relaxed">
                At Indikaara ("we," "our," or "us"), we are committed to
                protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, make a purchase, or interact with our
                services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Information We Collect
              </h2>

              <h3 className="text-xl font-medium text-text-primary mb-3">
                Personal Information
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide
                to us, including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6">
                <li>Name, email address, and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>
                  Payment information (processed securely through third-party
                  providers)
                </li>
                <li>Account credentials and preferences</li>
                <li>Communication preferences and marketing consents</li>
              </ul>

              <h3 className="text-xl font-medium text-text-primary mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                When you visit our website, we automatically collect certain
                information, including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>IP address and browser information</li>
                <li>Device and operating system details</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources and search terms</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                How We Use Your Information
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Improving our website and services</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Detecting and preventing fraud or security threats</li>
                <li>Complying with legal obligations</li>
                <li>Analyzing website usage and performance</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party
                  service providers who assist with payment processing,
                  shipping, email marketing, and website analytics
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or government regulation
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with
                  mergers, acquisitions, or asset sales
                </li>
                <li>
                  <strong>Protection:</strong> To protect our rights, privacy,
                  safety, or property, and that of our users
                </li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your browsing
                experience, analyze site traffic, and personalize content. You
                can control cookies through your browser settings, though some
                features may not function properly if cookies are disabled.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We use both session cookies (which expire when you close your
                browser) and persistent cookies (which remain on your device
                until deleted or expired).
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Data Security
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Your Rights and Choices
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your
                  information in a portable format
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your
                  personal information
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications
                </li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                To exercise these rights, please contact us at
                privacy@indikaara.com.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Children's Privacy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children under 18. If we become aware that we have collected
                personal information from a child without parental consent, we
                will take steps to delete such information.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                International Data Transfers
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your country of residence. We ensure that
                such transfers comply with applicable data protection laws and
                implement appropriate safeguards.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any material changes by posting the updated policy on our
                website and updating the "Last updated" date. Your continued use
                of our services after such changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Contact Us
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-700/50 rounded-lg p-6">
                <p className="text-text-primary mb-2">
                  <strong>Indikaara Handicrafts Pvt Ltd</strong>
                </p>
                <p className="text-text-secondary">
                  Email: privacy@indikaara.com
                </p>
                <p className="text-text-secondary">Phone: +91 98765 43210</p>
                <p className="text-text-secondary">
                  Address: 123 Artisan Street, Craft Quarter
                  <br />
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

export default PrivacyPolicyPage;
