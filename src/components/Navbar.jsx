import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Home, Building, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = isHomePage ? 10 : 80;
      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Holiday Rentals", path: "/holiday-rentals" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* Floating logo for Home Page Immersive Mode */}
      {isHomePage && (
        <div
          style={{
            position: "absolute",
            top: "2.5rem",
            left: 0,
            width: "100%",
            zIndex: 1100,
            pointerEvents: "none"
          }}
        >
          <div className="container" style={{ display: "flex", justifyContent: "flex-start" }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                opacity: isSticky ? 0 : 1,
                pointerEvents: isSticky ? "none" : "auto",
                transition: "opacity 0.6s ease"
              }}
            >
              <img
                src="/logo.jpg"
                alt="Lennox Logo"
                className="floating-logo-img"
                style={{
                  borderRadius: "50%",
                  border: "2px solid rgba(240, 165, 0, 0.8)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  objectFit: "cover",
                  filter: "brightness(1.1)"
                }}
              />
              <div style={{ pointerEvents: "none" }} className="floating-brand-text">
                <span style={{ fontSize: "1.35rem", fontWeight: "800", color: "#FFFFFF", letterSpacing: "1px", display: "block", fontFamily: "var(--font-heading)" }}>
                  LENNOX
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#F0A500", letterSpacing: "2.5px", textTransform: "uppercase", display: "block", marginTop: "-3px" }}>
                  REAL ESTATE LTD
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}

      <header 
        className="navbar-wrapper" 
        style={{ 
          position: "fixed", 
          top: 0, 
          width: "100%", 
          zIndex: 1000,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          transform: isHomePage && !isSticky ? "translateY(-100%)" : "translateY(0)",
          opacity: isHomePage && !isSticky ? 0 : 1,
          pointerEvents: isHomePage && !isSticky ? "none" : "auto"
        }}
      >
      {/* Top Bar for Contact Info */}
      <div 
        style={{ 
          backgroundColor: "#1C2333", 
          color: "#a0aec0", 
          borderBottom: "1px solid rgba(255,255,255,0.05)", 
          transition: "all 0.3s ease",
          height: isSticky ? "0" : "auto",
          opacity: isSticky ? 0 : 1,
          overflow: "hidden",
          padding: isSticky ? "0" : "0.4rem 0"
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.825rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href="tel:0737796886" style={{ display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#F0A500"} onMouseLeave={(e) => e.target.style.color = "#a0aec0"}>
              <Phone size={14} style={{ color: "#F0A500" }} /> 0737 796886
            </a>
            <a href="tel:0795673809" style={{ display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#F0A500"} onMouseLeave={(e) => e.target.style.color = "#a0aec0"}>
              <Phone size={14} style={{ color: "#F0A500" }} /> 0795 673809
            </a>
            <a href="mailto:lennoxrealestate7@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#F0A500"} onMouseLeave={(e) => e.target.style.color = "#a0aec0"}>
              <Mail size={14} style={{ color: "#F0A500" }} /> lennoxrealestate7@gmail.com
            </a>
          </div>
          <div>
            <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#a0aec0" }} onMouseEnter={(e) => e.target.style.color = "#F0A500"} onMouseLeave={(e) => e.target.style.color = "#a0aec0"}>
              <ShieldCheck size={14} style={{ color: "#F0A500" }} /> Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        style={{ 
          backgroundColor: "#1C2333", 
          boxShadow: isSticky ? "0 10px 30px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.15)", 
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          transition: "background-color 0.3s, box-shadow 0.3s"
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "76px" }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/logo.jpg" alt="Lennox Real Estate Ltd Logo" style={{ height: "55px", width: "55px", borderRadius: "50%", border: "2px solid #F0A500", objectFit: "cover" }} />
            <div>
              <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#FFFFFF", letterSpacing: "1px", display: "block", fontFamily: "var(--font-heading)" }}>
                LENNOX
              </span>
              <span style={{ fontSize: "0.725rem", fontWeight: "600", color: "#F0A500", letterSpacing: "2.5px", textTransform: "uppercase", display: "block", marginTop: "-3px" }}>
                REAL ESTATE LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: "none" }} className="desktop-nav-menu">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  color: isActive(link.path) ? "#F0A500" : "#F1F5F9",
                  fontWeight: isActive(link.path) ? "700" : "500",
                  padding: "0.5rem 1rem",
                  fontSize: "0.95rem",
                  transition: "var(--transition-smooth)",
                  borderBottom: isActive(link.path) ? "2px solid #F0A500" : "2px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.color = "#F0A500";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.color = "#F1F5F9";
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div style={{ display: "none" }} className="desktop-nav-cta">
            <Link to="/contact" className="btn btn-primary" style={{ padding: "0.55rem 1.25rem", fontSize: "0.875rem", borderRadius: "4px" }}>
              Inquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            style={{
              display: "block",
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer"
            }}
            className="mobile-menu-toggle"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div style={{ backgroundColor: "#1C2333", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1rem 0" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: isActive(link.path) ? "#F0A500" : "#F1F5F9",
                    fontWeight: isActive(link.path) ? "700" : "500",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.03)"
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary"
                style={{ textAlign: "center", width: "100%", marginTop: "0.5rem" }}
              >
                Inquire Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global CSS adjustments for Nav display triggers (since we use vanilla css variables) */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-menu { display: flex !important; gap: 0.5rem; }
          .desktop-nav-cta { display: block !important; }
          .mobile-menu-toggle { display: none !important; }
        }
        .floating-logo-img {
          height: 70px;
          width: 70px;
        }
        @media (max-width: 768px) {
          .floating-logo-img {
            height: 50px !important;
            width: 50px !important;
          }
          .floating-brand-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  </>
  );
};

export default Navbar;
