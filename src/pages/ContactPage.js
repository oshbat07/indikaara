import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
/**
 * ContactPage Component - Contact information and form
 * Features: Contact form, business information, social links, map integration
 * Uses global CSS variables for consistent theming
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have questions about our handcrafted products or need assistance?
            We're here to help connect you with India's finest artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-secondary/20 border border-secondary/30 rounded-lg">
                <p className="text-secondary font-medium">
                  ✓ Thank you! Your message has been sent successfully. We'll
                  get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="custom">Custom Order Request</option>
                  <option value="artisan">Artisan Partnership</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Business Info */}
            <div className="bg-gray-800/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                  <div>
                    <h3 className="font-semibold text-text-primary">Email</h3>
                    <p className="text-text-secondary">support@indikaara.com</p>
                    <p className="text-text-secondary">info@indikaara.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Phone</h3>
                    <p className="text-text-secondary">+91-91792192311</p>
                    <p className="text-text-secondary text-sm">
                      Mon-Fri: 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Follow Us
              </h2>
              <p className="text-text-secondary mb-6">
                Stay connected for the latest artisan stories and handcrafted
                collections.
              </p>

              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/indikaara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon fontSize="large" />
                </a>

                <a
                  href="https://facebook.com/indikaara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  {" "}
                  <FacebookIcon fontSize="large" />
                </a>

                <a
                  href="https://linkedin.com/company/indikaara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <LinkedInIcon fontSize="large" />
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-800/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Business Hours
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monday - Friday</span>
                  <span className="text-text-primary">
                    9:00 AM - 6:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Saturday</span>
                  <span className="text-text-primary">
                    10:00 AM - 4:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Sunday</span>
                  <span className="text-text-primary">Closed</span>
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-gray-800/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Legal Information
              </h2>

              <div className="space-y-3 text-text-secondary text-sm">
                <div>
                  <strong className="text-text-primary">Brand Name:</strong>
                  <div>Indikaara</div>
                </div>

                <div>
                  <strong className="text-text-primary">
                    Registered Business Name:
                  </strong>
                  <div>Indikaara Exports</div>
                </div>

                <div>
                  <strong className="text-text-primary">GSTIN:</strong>
                  <div>23GDNPS5669R2Z7</div>
                </div>

                <div>
                  <strong className="text-text-primary">
                    Registered Address:
                  </strong>
                  <div>
                    11, Amrit Complex, Raisen Road, near Prabhat Petrol Pump,
                    Old Ashoka Garden, Bhopal (M.P), 462023
                  </div>
                </div>

                <div>
                  <strong className="text-text-primary">Email:</strong>
                  <div>support@indikaara.com</div>
                </div>

                <div>
                  <strong className="text-text-primary">Phone:</strong>
                  <div>+91-91792192311</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
