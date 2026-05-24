import React, { useState, useMemo, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProduct";
import axios from "axios";
import { getFirstImage } from "../utils/imageUtils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HandicraftShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();

  // If the homepage should show a fixed set of handicraft products, fetch them here.
  const HARDCODED_IDS = [
    "68ef93fa69f2a591336e2df6",
    "6a0624cbfdf4038feaf66c87",
    "6a0624cbfdf4038feaf66c87",
    "6a0624cbfdf4038feaf66ca0",
    "6a0624cbfdf4038feaf66caa",
    "6a0624cbfdf4038feaf66caa",
    "6a0624cbfdf4038feaf66cd2",
    "6a0624cbfdf4038feaf66c9c",
    "6a0624cbfdf4038feaf66c8e",
    "68ef93fa69f2a591336e2e14",
  ];

  const [fetchedItems, setFetchedItems] = useState(null);
  const [isFetchingIds, setIsFetchingIds] = useState(false);

  useEffect(() => {
    // dedupe while preserving order
    const deduped = [];
    const seen = new Set();
    for (const id of HARDCODED_IDS) {
      if (!seen.has(id)) {
        seen.add(id);
        deduped.push(id);
      }
    }

    const fetchAll = async () => {
      setIsFetchingIds(true);
      try {
        const results = await Promise.all(
          deduped.map((id) =>
            axios.get(`/api/products/${id}`).then((r) => r.data).catch(() => null),
          ),
        );
        const valid = results.filter(Boolean);
        setFetchedItems(valid);
      } catch (err) {
        console.error("Failed to fetch fixed handicraft IDs:", err);
        setFetchedItems([]);
      } finally {
        setIsFetchingIds(false);
      }
    };

    fetchAll();
  }, []);

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

    return unique.length > 0 ? unique : [];
  }, [products]);
  // Use fetchedItems (if available) as the single source of truth for this showcase.
  const itemsToUse = Array.isArray(fetchedItems) ? fetchedItems : items;

  // Support paging through the set of handicraft items so users can "replace" the view
  const PAGE_SIZE = 6;
  const [pageIndex, setPageIndex] = React.useState(0);
  const pages = [];
  for (let i = 0; i < itemsToUse.length; i += PAGE_SIZE) {
    pages.push(itemsToUse.slice(i, i + PAGE_SIZE));
  }
  const displayed = pages.length > 0 ? pages[pageIndex % pages.length] : [];

  // Return null while loading or no items
  // If we're still fetching the specific IDs, show nothing (or could show a loader)
  if (isFetchingIds) return null;

  if (!itemsToUse || itemsToUse.length === 0) return null;

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
        className="pointer-events-none absolute inset-0"
        style={{
          // subtle highlight so product imagery stays prominent
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.02), transparent 60%)",
          mixBlendMode: "overlay",
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
            {displayed.map((item, idx) => (
              <div key={item.id || idx} className="px-2 select-none">
                <div className="relative flex items-end justify-center h-[320px] sm:h-[380px]">
                  <img
                    src={getFirstImage(item.imageUrl || item.image)}
                    alt={item.name}
                    loading="lazy"
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="rug-stack-image relative z-20 transition-all duration-500 ease-out object-cover rounded shadow-lg cursor-pointer"
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
            {displayed[activeIndex % displayed.length]?.name}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                (window.location.href = "/catalogue?category=handicraftproducts")
              }
              className="inline-block text-[11px] tracking-wide font-semibold uppercase text-gray-200 border-b-2 border-gray-400/60 hover:border-white transition-colors px-2 py-1"
            >
              Shop Collection
            </button>

            {pages.length > 1 && (
              <button
                onClick={() => {
                  setPageIndex((p) => (p + 1) % pages.length);
                  setActiveIndex(0);
                }}
                className="inline-block text-[11px] tracking-wide font-semibold uppercase text-gray-200 bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors"
              >
                Show Other Handicrafts
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HandicraftShowcase;
