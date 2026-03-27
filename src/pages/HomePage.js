import HeroSection from "../components/HeroSection";
import ArtisanStorySection from "../components/ArtisanStorySection";
import FeaturedArtisan from "../components/FeaturedArtisan";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WhyConnectCards } from "../components/WhyConnectCards";
import RugsShowcase from "../components/RugsShowcase";
import HandicraftShowcase from "../components/HandicraftShowcase";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useEffect } from "react";
import ShippingAndReturn from "../components/ShippingAndReturn";
gsap.registerPlugin(SplitText);

// Main Home Page
const HomePage = () => {
  useEffect(() => {
    let split = SplitText.create(".split", { type: "words, chars" });

    // now animate the characters in a staggered fashion
    gsap.from(split.chars, {
      duration: 2,
      x: 100, // animate from 100px to the right
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
    });
  }, []);
  // split elements with the class "split" into words and characters

  return (
    <main role="main">
      {/*HERO section */}
      <HeroSection />

      {/*WHY CONNECT WITH INDIKAARA section */}
      <section className="why-connect-section w-full bg-[radial-gradient(circle_at_top_right,_rgba(172,31,35,0.08),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#f3f4f6_100%)] py-[clamp(2.25rem,7vw,5rem)]">
        <div className="mx-auto w-full max-w-7xl px-[clamp(0.75rem,4vw,2rem)]">
          <div className="w-full rounded-2xl border border-white/70 bg-white/80 p-[clamp(1.25rem,4vw,2.5rem)] text-center shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <h1 className="text-[clamp(1.16rem,3.6vw,1.92rem)] font-extrabold text-gray-900 mb-[clamp(0.75rem,2vw,1rem)] leading-tight">
              Why Connect with{" "}
              <span className="text-[#ac1f23] split">Indikaara?</span>
            </h1>
            <p className="mx-auto max-w-3xl text-[clamp(0.72rem,1.84vw,0.85rem)] text-gray-600 leading-relaxed mb-[clamp(1.2rem,3vw,1.9rem)]">
              We bridge the world and India's finest artisans—built on
              authenticity, empowerment, and timeless craft.
            </p>
            <WhyConnectCards />
            <div className="mx-auto mt-[clamp(1.5rem,4vw,2.2rem)] max-w-4xl rounded-xl border border-orange-100 bg-orange-50/80 p-[clamp(1rem,3vw,1.35rem)]">
              <p className="italic text-gray-700 leading-relaxed text-[clamp(0.64rem,1.76vw,0.8rem)]">
                "Indikaara didn't just sell my art; they shared my story. It's a
                partnership that honors my craft and heritage."
              </p>
              <p className="mt-[clamp(0.7rem,2vw,1rem)] font-semibold text-gray-800 text-[clamp(0.64rem,1.76vw,0.8rem)]">
                - A. Kumar, Weaver from Varanasi
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/foundation")}
              className="mt-[clamp(1.8rem,4vw,2.2rem)] inline-flex w-full max-w-sm items-center justify-center rounded-full bg-primary px-[clamp(1.1rem,3vw,1.45rem)] py-[clamp(0.7rem,2vw,0.95rem)] text-[clamp(0.76rem,1.84vw,0.86rem)] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/45"
            >
              Know Our Foundation
            </button>
          </div>
        </div>
      </section>

      {/*RUGS SHOWCASE section */}
      <RugsShowcase />

      {/*HANDICRAFT ITEMS SHOWCASE section */}
      <HandicraftShowcase />

      {/*FOUNDATION + ARTISAN STORY + FEATURED ARTISAN + QUALITY & SUSTAINABILITY + CERTIFICATIONS section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/*ARTISAN STORY section */}
        <section
          className="artisan-story-section w-full"
          // style={{ marginTop: "4rem" }}
        >
          <ArtisanStorySection />
        </section>

        {/*FEATURED ARTISAN section */}
        <section className="w-full">
          <FeaturedArtisan />
        </section>

        {/*QUALITY & SUSTAINABILITY section */}
        <section className="my-4 w-full">
          <div className="bg-[#111827] rounded-none sm:rounded-xl p-6 sm:p-8 md:p-12 w-full">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
                Quality & Sustainability
              </h2>
              <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                Our commitment goes beyond beautiful products—every piece meets
                the highest standards while supporting sustainable practices &
                fair trade.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Quality Assured",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ),
                  color: "green",
                  text: "Every piece undergoes rigorous checks",
                },
                {
                  title: "Sustainable",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                    />
                  ),
                  color: "blue",
                  text: "Eco-friendly materials & processes",
                },
                {
                  title: "Fair Trade",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  ),
                  color: "purple",
                  text: "Direct artisan partnerships",
                },
                {
                  title: "Authentic",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  color: "orange",
                  text: "Genuine craftsmanship guaranteed",
                },
              ].map((item) => (
                <div key={item.title} className="text-center px-1">
                  <div
                    className={`bg-${item.color}-600/20 text-${item.color}-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                  >
                    <svg
                      className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.svg}
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*SHIPPING AND RETURN POLICY SECTION */}
        <section className="my-24 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <ShippingAndReturn />
          </div>
        </section>

        {/*CERTIFICATIONS section */}
        <section
          aria-labelledby="certifications-title"
          className="mt-24 mb-12 w-full"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2
                id="certifications-title"
                className="text-3xl md:text-4xl font-bold text-primary mb-4"
              >
                Our Certifications
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
                Recognitions and compliance frameworks reflecting quality,
                transparency & ethical trade.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 items-center w-full">
              {[
                {
                  file: require("../assets/certifications/EPC-logo.png"),
                  alt: "EPC",
                },
                {
                  file: require("../assets/certifications/ISO-logo.png"),
                  alt: "ISO",
                },
                {
                  file: require("../assets/certifications/IEC-logo.webp"),
                  alt: "IEC",
                },
                {
                  file: require("../assets/certifications/GST-logo.webp"),
                  alt: "GST",
                },
              ].map((c) => (
                <div
                  key={c.alt}
                  className="group relative flex items-center justify-center rounded-lg bg-[#191919]/80 backdrop-blur-sm aspect-square p-2 sm:p-3 lg:p-4 border border-white/10 shadow-sm hover:shadow-md hover:border-white/20 transition-all duration-300 overflow-hidden max-w-[120px] sm:max-w-[140px] lg:max-w-[160px] mx-auto"
                >
                  <img
                    src={c.file}
                    alt={`${c.alt} Certification`}
                    className="w-full h-full object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-orange-400 via-pink-400 to-yellow-300 transition-opacity duration-300 mix-blend-multiply" />
                  <span className="sr-only">{c.alt} certification logo</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-xs uppercase tracking-wider text-text-secondary/60">
                Independently verified | Trade & Quality Compliance
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
