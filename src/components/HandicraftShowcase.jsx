import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProduct";
import { getFirstImage } from "../utils/imageUtils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HandicraftShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();

  // Filter products for handicrafts
  const items = useMemo(() => {
    if (!products || products.length === 0) return [];

    const primary = products.filter(
      (p) => p.category && p.category.toLowerCase() === "handicraft items",
    );
    const extended = products.filter(
      (p) =>
        /decor|wall|vintage|craft|handicraft/i.test(p.category || "") ||
        (p.tags || []).some((t) =>
          /decor|wall|vintage|craft|handicraft/i.test(t),
        ),
    );

    const merged = [...primary, ...extended];
    const unique = Array.from(new Map(merged.map((m) => [m._id, m])).values());

    return unique.length > 0 ? unique.slice(0, 6) : [];
  }, [products]);

  // Return null while loading or no items
  if (isLoading || items.length === 0) return null;

  if (!items.length) return null;

  const ArrowBtn = ({ onClick, dir }) => (
    <button
      aria-label={dir === "prev" ? "Previous handicraft" : "Next handicraft"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/60 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors ${
        dir === "prev" ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
      }`}
      type="button"
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );

  const settings = {
    className: "rugs-center-slider",
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4800,
    pauseOnHover: true,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: true,
    prevArrow: <ArrowBtn dir="prev" />,
    nextArrow: <ArrowBtn dir="next" />,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 820, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 3800,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 3800,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 3800,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 3800,
        },
      },
    ],
  };

  return (
    <section
      aria-labelledby="handicraft-showcase-title"
      className="relative bg-gradient-to-b from-[#101010] via-[#0d0d0d] to-gray-900 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2
            id="handicraft-showcase-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Discover Handicraft Highlights
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
            A curated glimpse of handcrafted decor & wall art.
          </p>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {items.map((item, idx) => (
              <div key={item.id || idx} className="px-2 select-none">
                <div className="relative flex items-end justify-center h-[320px] sm:h-[380px]">
                  <img
                    src={getFirstImage(item.imageUrl || item.image)}
                    alt={item.name}
                    loading="lazy"
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="rug-stack-image transition-all duration-500 ease-out object-cover rounded shadow-lg cursor-pointer"
                    style={{
                      height:
                        idx === activeIndex % items.length ? "90%" : "80%",
                      width: "auto",
                      filter:
                        idx === activeIndex % items.length
                          ? "none"
                          : "grayscale(15%) brightness(0.9)",
                      opacity: idx === activeIndex % items.length ? 1 : 0.85,
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-200">
            {items[activeIndex % items.length]?.name}
          </p>
          <button
            onClick={() =>
              (window.location.href = "/catalogue?category=handicraftproducts")
            }
            className="mt-4 inline-block text-[11px] tracking-wide font-semibold uppercase text-gray-200 border-b-2 border-gray-400/60 hover:border-white transition-colors"
          >
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
};
export default HandicraftShowcase;
