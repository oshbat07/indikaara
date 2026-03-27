import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SideNav from "./SideNav";
import CombinedLogo from "./CombinedLogo";
import OfferBanner from "./OfferBanner";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0); // total quantity
  const [cartPulse, setCartPulse] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to deepen glass effect after slight scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wishlist/cart count fetch (simple localStorage placeholders)
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    } catch {}
    try {
      const cartRaw = JSON.parse(
        localStorage.getItem("indikaara-cart") || '{"items":[]}',
      );
      const itemsArr = cartRaw.items || [];
      const totalQty = itemsArr.reduce(
        (sum, it) => sum + (Number(it.quantity) || 0),
        0,
      );
      setCartCount(totalQty);
    } catch {}
    const handler = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(wishlist.length);
      } catch {}
      try {
        const cartRaw = JSON.parse(
          localStorage.getItem("indikaara-cart") || '{"items":[]}',
        );
        const itemsArr = cartRaw.items || [];
        const totalQty = itemsArr.reduce(
          (sum, it) => sum + (Number(it.quantity) || 0),
          0,
        );
        setCartCount((prev) => {
          if (prev !== totalQty) {
            setCartPulse(true);
            setTimeout(() => setCartPulse(false), 500);
          }
          return totalQty;
        });
      } catch {}
    };
    window.addEventListener("storage", handler);
    window.addEventListener("wishlistUpdated", handler);
    window.addEventListener("cartUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("wishlistUpdated", handler);
      window.removeEventListener("cartUpdated", handler);
    };
  }, []);

  // (Search removed) Keyboard shortcut previously opening search now unused.

  return (
    <>
      <OfferBanner />
      <header
        className={`header-contrast ${
          scrolled ? "scrolled" : ""
        } fixed top-[35px] left-0 right-0 z-50 h-[51px] md:h-[62px] lg:h-[72px] transition-all duration-300 border-b overflow-hidden
        ${
          scrolled
            ? "backdrop-blur-2xl bg-[#0b0b0f]/72 border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_24px_-4px_rgba(255,255,255,0.12),0_8px_40px_-8px_rgba(172,31,35,0.35)]"
            : "backdrop-blur-xl bg-[#111418]/55 border-white/10 shadow-lg"
        }
        before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.12),transparent_60%)] before:pointer-events-none
        after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:via-white/0 after:to-white/10 after:opacity-60 after:pointer-events-none
        ${scrolled ? "before:animate-pulse slow-glow" : ""}
        `}
        style={{
          WebkitBackdropFilter: scrolled
            ? "blur(26px) saturate(180%)"
            : "blur(18px) saturate(160%)",
        }}
      >
        {/* Glow outline ring (extra subtle) */}
        {scrolled && (
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
        )}
        {/* Glass inner border accent */}
        <div className="absolute inset-0 border-t border-white/5/30 pointer-events-none" />
        {/* Burger extreme left; stable vertical alignment using flex instead of translate */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className="flex items-center gap-1 pl-1.5 pr-1.5">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              className="p-1.5 text-white hover:text-[#ac1f3] focus:outline-none focus:ring-2 focus:ring-[#ac1f23]/40 rounded-md z-50 relative"
            >
              <span
                className="block leading-none text-[1.25rem] md:text-[1.4rem] lg:text-[1.7rem] w-[1.3rem] md:w-[1.5rem] lg:w-[1.9rem] h-[1.3rem] md:h-[1.55rem] lg:h-[1.95rem] transition-transform duration-300 ease-out"
                aria-hidden="true"
              >
                <MenuIcon fontSize="inherit" className="w-full h-full" />
              </span>
            </button>
            {/* Search icon removed as requested */}
          </div>
        </div>
        <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8">
          {/* Centered Logo */}
          <div className="flex items-center select-none">
            <Link
              to="/"
              className="block h-6 md:h-8 lg:h-12 transition-all duration-300"
            >
              <CombinedLogo className="h-full" />
            </Link>
          </div>

          {/* Right side actions (full-bleed) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white pr-1.5 md:pr-3">
            {/* Small / Medium screens: essential icons */}
            <div className="flex items-center gap-3 lg:hidden pr-1">
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <FavoriteBorderIcon fontSize="small" className="text-white" />
                {wishlistCount > 0 && (
                  <span className="icon-badge wishlist-badge">
                    {wishlistCount > 999 ? "999+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <ShoppingCartIcon fontSize="small" className="text-white" />
                {cartCount > 0 && (
                  <span
                    className={`icon-badge cart-badge ${
                      cartPulse ? "icon-badge-pulse" : ""
                    }`}
                  >
                    {cartCount > 999 ? "999+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
            {/* Right-side icons (wishlist, cart, profile) */}
            <div className="hidden lg:flex items-center gap-7 pr-7">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <FavoriteBorderIcon className="text-white" fontSize="medium" />
                {wishlistCount > 0 && (
                  <span className="icon-badge wishlist-badge">
                    {wishlistCount > 999 ? "999+" : wishlistCount}
                  </span>
                )}
              </Link>
              {/* Cart */}
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <ShoppingCartIcon className="text-white" fontSize="medium" />
                {cartCount > 0 && (
                  <span
                    className={`icon-badge cart-badge ${
                      cartPulse ? "icon-badge-pulse" : ""
                    }`}
                  >
                    {cartCount > 999 ? "999+" : cartCount}
                  </span>
                )}
              </Link>
              {/* Profile */}
              <Link
                to="/dashboard"
                aria-label="Profile / Login"
                className="text-white/70 hover:text-white transition-colors"
              >
                <PersonIcon className="text-white" fontSize="medium" />
              </Link>
            </div>

            {/* Side Navigation */}
            <SideNav
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleDrawer={(open) =>
                open ? setIsOpen(true) : setIsOpen(false)
              }
            />
          </div>
        </div>
      </header>
      {/* Search overlay removed */}
    </>
  );
}
