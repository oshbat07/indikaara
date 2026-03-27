import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import EnquiryButton from "./EnquiryButton";

/**
 * Layout Component - Main layout wrapper for all pages
 * Features: Header, main content area, footer, and sticky enquiry button
 * @param {React.ReactNode} children - Page content to render
 */
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background text-primary">
      <div className="flex h-full grow flex-col">
        {/* Header */}
        <Header />
        {/* Main Content; pad top to clear fixed OfferBanner (35px) + Header (~51/62/72px) */}
        <main className="pt-[86px] md:pt-[97px] lg:pt-[107px]">{children}</main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Sticky Enquiry Button (Homepage only) */}
      {isHomePage && <EnquiryButton />}
    </div>
  );
};

export default Layout;
