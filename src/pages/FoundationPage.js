import React from "react";

/**
 * FoundationPage Component - Dedicated page for company foundation, vision, mission, and values
 * Features: 
 * - Company vision and mission statement
 * - Core values and principles
 * - Brand story and foundation
 * - Rich visual presentation with artisan imagery
 */
const FoundationPage = () => {
  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Foundation
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            The values, vision, and principles that guide our journey in preserving 
            and celebrating India's rich artisan heritage.
          </p>
        </div>

        {/* Hero Content - Brand Story */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6">
                <span
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "var(--accent-color)",
                    display: "block",
                    marginBottom: "1rem"
                  }}
                >
                  Every piece tells a tale.
                </span>
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                At Indikaara, we believe that every product tells a story. Our artisans are not just creators; 
                they are custodians of ancient traditions, passing down skills through generations. When you 
                purchase from us, you're not just buying a product – you're supporting a legacy, a family, 
                and the continuation of India's rich cultural heritage.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mt-4">
                Our handpicked collection of unique rugs, vintage finds, and beautiful decor is here to help you 
                create a home that feels uniquely you. We've traveled to find the perfect blend of warmth and 
                character, so you can fill your space with items that bring you joy and comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Foundation Cards - Vision, Mission, Values */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card: Vision */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-8 text-center hover:from-red-800/40 hover:to-red-700/30 hover:border-red-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-red-500/30">
                <img
                  src={require("../assets/artisan-potter.png")}
                  alt="Brand Vision"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                To preserve and celebrate India's rich artisan heritage by
                connecting traditional craftspeople with modern homes, ensuring
                every piece carries forward centuries of cultural wisdom and
                artistic excellence.
              </p>
            </div>

            {/* Card: Mission */}
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-800/20 backdrop-blur-sm border border-amber-700/30 rounded-xl p-8 text-center hover:from-amber-800/40 hover:to-orange-700/30 hover:border-amber-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-amber-500/30">
                <img
                  src={require("../assets/artisan-rug-weaver.png")}
                  alt="Brand Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-text-secondary leading-relaxed font-medium italic text-xl mb-4">
                "Handcrafted with Heart, Treasured Forever"
              </p>
              <p className="text-text-secondary leading-relaxed text-lg">
                Every piece we curate is more than just decor—it's a testament
                to the passion, skill, and soul of Indian artisans who pour
                their heritage into every creation.
              </p>
            </div>

            {/* Card: Values */}
            <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/20 backdrop-blur-sm border border-teal-700/30 rounded-xl p-8 text-center hover:from-teal-800/40 hover:to-teal-700/30 hover:border-teal-600/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-teal-500/30">
                <img
                  src={require("../assets/artisan-wood-carver.png")}
                  alt="Brand Values"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Our Values
              </h3>
              <div className="text-text-secondary leading-relaxed space-y-3 text-lg">
                <p className="font-medium">• Authenticity in every thread</p>
                <p className="font-medium">• Sustainable artisan partnerships</p>
                <p className="font-medium">• Cultural heritage preservation</p>
                <p className="font-medium">• Quality craftsmanship excellence</p>
                <p className="font-medium">• Empowering local communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="space-y-16">
          {/* Artisan Heritage */}
          <div className="bg-gray-800/50 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Preserving Artisan Heritage
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  For generations, Indian artisans have mastered their crafts, passing down 
                  techniques through families and communities. These skills represent more 
                  than just methods of creation—they are living traditions that connect us 
                  to our cultural roots.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  At Indikaara, we work directly with these master craftspeople, ensuring 
                  their knowledge and techniques continue to thrive in the modern world. 
                  Each purchase directly supports these artisan families and helps preserve 
                  these invaluable traditions for future generations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-primary">500+</h3>
                    <p className="text-text-secondary text-sm">Artisan Families</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-primary">15+</h3>
                    <p className="text-text-secondary text-sm">Craft Traditions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-primary">10+</h3>
                    <p className="text-text-secondary text-sm">Indian States</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={require("../assets/artisan-potter.png")}
                    alt="Pottery Artisan"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <img
                    src={require("../assets/artisan-wood-carver.png")}
                    alt="Wood Carving Artisan"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src={require("../assets/artisan-rug-weaver.png")}
                    alt="Rug Weaving Artisan"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <img
                    src={require("../assets/artisan-wheat-stem-art.png")}
                    alt="Wheat Stem Art Artisan"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quality & Sustainability */}
          <div className="bg-gray-800/50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Quality & Sustainability
              </h2>
              <p className="text-text-secondary text-lg max-w-3xl mx-auto">
                Our commitment goes beyond beautiful products. We ensure every piece meets 
                the highest standards while supporting sustainable practices and fair trade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-600/20 text-green-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Quality Assured</h3>
                <p className="text-text-secondary">Every piece undergoes rigorous quality checks</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600/20 text-blue-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Sustainable</h3>
                <p className="text-text-secondary">Eco-friendly materials and processes</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600/20 text-purple-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Fair Trade</h3>
                <p className="text-text-secondary">Direct partnerships with artisan communities</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-600/20 text-orange-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Authentic</h3>
                <p className="text-text-secondary">Genuine traditional craftsmanship guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Join Our Mission
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Every purchase you make helps preserve centuries-old traditions and supports 
              artisan families across India. Be part of keeping these beautiful crafts alive 
              for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalogue"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Our Collection
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="/artisans"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Meet Our Artisans
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FoundationPage;
