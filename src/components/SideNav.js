import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContext";
// Simple icon placeholders (replace with themed icons later if needed)

export default function SideNav({ isOpen, setIsOpen, toggleDrawer }) {
  const handleClose = () => setIsOpen(false);
  const [openBusinesses, setOpenBusinesses] = React.useState(false);
  const { user, isAuthenticated } = useAuth();

  // Navigation link config
  const primaryLinks = [
    { label: "Home", to: "/" },
    {
      label: "Our Businesses",
      to: "/businesses",
      items: [
        { id: 1, name: "Rugs", to: "/catalogue?category=rugs" },
        {
          id: 2,
          name: "Handicraft Products",
          to: "/catalogue?category=homedecor",
        },
        // { id: 3, name: "Biomass Pellets & Briquettes", to: "/biomass" },
        // { id: 4, name: "Clothing", comingSoon: true },
        // { id: 5, name: "Millet Foods", comingSoon: true },
      ],
    },
    { label: "Our Foundation", to: "/foundation" },
    { label: "Artisans", to: "/artisans" },
    { label: "Blog", to: "/blog" },
  ];
  const secondaryLinks = [
    {
      label: isAuthenticated ? "Profile" : "Login",
      to: isAuthenticated ? "/dashboard" : "/login",
      icon: <PersonIcon fontSize="large" />,
    },
    { label: "Cart", to: "/cart", icon: <ShoppingCartIcon fontSize="large" /> },
    {
      label: "Wishlist",
      to: "/wishlist",
      icon: <FavoriteIcon fontSize="large" />,
    },
  ];

  // Responsive width: 100% (<md), 50% (md>=), 25% (lg>=)
  const drawerPaperStyles = {
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent !important",
      backdropFilter: "none !important",
      WebkitBackdropFilter: "none !important",
      opacity: "0 !important",
      transition: "opacity 300ms ease",
    },
    "& .MuiDrawer-paper": {
      background:
        "linear-gradient(135deg, rgba(17,17,17,0.94), rgba(20,20,20,0.88))",
      // backdropFilter: "blur(14px)",
      // WebkitBackdropFilter: "blur(14px)",
      width: "100%",
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.06), 0 12px 36px -6px rgba(0,0,0,0.65)",
      transition:
        "transform 380ms cubic-bezier(0.22,0.72,0.28,1), width 300ms ease",
    },
    "@media (min-width: 768px)": {
      // md
      "& .MuiDrawer-paper": { width: "50%" },
    },
    "@media (min-width: 1024px)": {
      // lg
      "& .MuiDrawer-paper": { width: "35%" },
    },
  };

  const LinkBlock = ({ item }) => {
    // Special handling for expandable 'Our Businesses'
    if (item.label === "Our Businesses" && item.items) {
      return (
        <div className="w-full">
          <button
            type="button"
            onClick={() => setOpenBusinesses((o) => !o)}
            aria-expanded={openBusinesses}
            aria-controls="businesses-submenu"
            className="group relative w-full px-4 py-5 flex flex-col items-center justify-center text-center focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-white group-hover:text-[#ac1f23] transition-colors duration-200">
                {item.label}
              </span>
              <span
                className={`transition-transform duration-300 text-white/70 group-hover:text-[#ac1f23] ${
                  openBusinesses ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </span>
            <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </button>
          <div
            id="businesses-submenu"
            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
              openBusinesses ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!openBusinesses}
          >
            <ul className="py-2 space-y-1">
              {item.items.map((sub) => {
                return (
                  <li key={sub.id} className="px-6">
                    <Link
                      to={sub.to}
                      onClick={handleClose}
                      aria-label={
                        sub.comingSoon ? `${sub.name} (Coming Soon)` : sub.name
                      }
                      className="relative flex justify-center items-center gap-2 block w-full text-left rounded-md px-3 py-3 bg-white/5 hover:bg-white/10 active:bg-white/15 text-sm md:text-base lg:text-lg font-medium tracking-wide text-white/80 hover:text-[#ac1f23] transition-colors"
                    >
                      <span>{sub.name}</span>
                      {sub.comingSoon && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#ac1f23] bg-[#ac1f23]/10 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <Link
        to={item.to}
        onClick={handleClose}
        className="group relative px-4 py-5 flex flex-col items-center justify-center text-center"
      >
        <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-white group-hover:text-[#ac1f23] transition-colors duration-200">
          {item.icon ? item.icon : null}
          {"  "}
          {item.label}
        </span>
        <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Link>
    );
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      ModalProps={{ keepMounted: true }}
      sx={drawerPaperStyles}
    >
      <div className="h-full flex flex-col">
        {/* Top bar with close */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleClose}
            aria-label="Close navigation"
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <CloseIcon fontSize="large" />
          </button>
        </div>
        {/* Scrollable nav area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <nav className="pt-2" aria-label="Primary">
            {primaryLinks.map((item) => (
              <LinkBlock key={item.label} item={item} />
            ))}
          </nav>
          <div className="my-4 mx-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <nav aria-label="Secondary" className="pb-4 m-2">
            {secondaryLinks.map((item) => (
              <LinkBlock key={item.label} item={item} />
            ))}
          </nav>
        </div>
        {/* Footer / brand accent */}
        <div className="px-4 py-4 border-t border-white/10 text-center text-xs text-white/40 tracking-wide">
          © 2025 Indikaara
        </div>
      </div>
    </Drawer>
  );
}
