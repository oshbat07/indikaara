import React from "react";
import "./OfferBanner.css";

// Fixed top announcement bar with continuous scrolling text (marquee-style)
const messages = [
  "Authentic Artisan Crafts",
  "Heritage Preservation",
  "Handmade Excellence",
  "Cultural Legacy",
  "Sustainable Craftsmanship",
  "Traditional Techniques",
  "Artisan Empowerment",
  "Timeless Beauty",
];

const OfferBanner = () => {
  return (
    <div
      role="status"
      aria-label="Promotional offer"
      className="offer-banner fixed top-0 left-0 right-0 z-[60] bg-black/95 text-white"
      style={{ height: 35 }}
    >
      <div className="h-full overflow-hidden select-none">
        <div className="offer-marquee h-full">
          {/* Duplicate tracks for seamless loop */}
          {[0, 1].map((i) => (
            <div className="offer-marquee-track px-4" key={i}>
              {messages.map((msg, idx) => (
                <span
                  key={`${i}-${idx}`}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-wide"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-fuchsia-500/80" />
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
