import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social links SVG details
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/p/Lennox-Real-Estate-LTD-61556613850623/",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/lennox_real_estate/",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://x.com/EstateLennox",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@lennoxrealestate?si=mUCCpcsW7Y6hkeGr",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://ke.linkedin.com/in/lennox-real-estate-ltd-36316a340",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/tag/lennoxrealestated",
      svg: (
        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    }
  ];

  return (
    <footer style={{ backgroundColor: "#0b0f19", color: "#e2e8f0", paddingTop: "5rem", paddingBottom: "2rem", borderTop: "3px solid #F0A500" }}>
      <div className="container">
        {/* Top Footer Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          
          {/* Brand & Social Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <img src="/logo.jpg" alt="Lennox Real Estate Logo" style={{ height: "60px", width: "60px", borderRadius: "50%", border: "2px solid #F0A500", objectFit: "cover" }} />
              <div>
                <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#FFFFFF", letterSpacing: "1px", display: "block" }}>
                  LENNOX
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#F0A500", letterSpacing: "2.5px", textTransform: "uppercase", display: "block" }}>
                  REAL ESTATE LTD
                </span>
              </div>
            </div>
            
            <p style={{ color: "#a0aec0", fontSize: "0.925rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Premium real estate firm offering trusted, transparent, and value-driven property solutions across Kenya. Transforming property ownership through excellence and innovation.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Mission & Vision Column */}
          <div>
            <h3 style={{ fontSize: "1.15rem", color: "#FFFFFF", marginBottom: "1.5rem", borderLeft: "3px solid #F0A500", paddingLeft: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Our Purpose
            </h3>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.95rem", color: "#F0A500", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.4rem" }}>
                Our Mission
              </h4>
              <p style={{ color: "#a0aec0", fontSize: "0.875rem", lineHeight: "1.5" }}>
                Provide trusted, transparent, and value-driven real estate solutions by helping clients acquire, invest in, and own quality property while delivering exceptional customer service, integrity, professionalism, and sustainable growth in the communities we serve.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", color: "#F0A500", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.4rem" }}>
                Our Vision
              </h4>
              <p style={{ color: "#a0aec0", fontSize: "0.875rem", lineHeight: "1.5" }}>
                To become the leading and most trusted real estate company in Kenya, transforming property ownership and investment through excellence, innovation, integrity, and sustainable development.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div style={{ paddingLeft: "1.5rem" }} className="footer-links-col">
            <h3 style={{ fontSize: "1.15rem", color: "#FFFFFF", marginBottom: "1.5rem", borderLeft: "3px solid #F0A500", paddingLeft: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.925rem" }}>
              <li><Link to="/" className="footer-link">Home Dashboard</Link></li>
              <li><Link to="/properties" className="footer-link">Featured Properties</Link></li>
              <li><Link to="/holiday-rentals" className="footer-link">Holiday Retreats</Link></li>
              <li><Link to="/services" className="footer-link">Our Services</Link></li>
              <li><Link to="/blog" className="footer-link">Blog & Insights</Link></li>
              <li><Link to="/about" className="footer-link">About Lennox</Link></li>
              <li><Link to="/contact" className="footer-link">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 style={{ fontSize: "1.15rem", color: "#FFFFFF", marginBottom: "1.5rem", borderLeft: "3px solid #F0A500", paddingLeft: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Contact Details
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.2rem", fontSize: "0.925rem" }}>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <MapPin size={20} style={{ color: "#F0A500", flexShrink: 0, marginTop: "0.15rem" }} />
                <span style={{ color: "#a0aec0" }}>
                  Lennox Real Estate Ltd Office,<br />Diani Beach Road, Kwale County, Kenya
                </span>
              </li>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Phone size={18} style={{ color: "#F0A500" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a href="tel:0737796886" className="footer-link">0737 796886</a>
                  <a href="tel:0795673809" className="footer-link">0795 673809</a>
                </div>
              </li>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Mail size={18} style={{ color: "#F0A500" }} />
                <a href="mailto:lennoxrealestate7@gmail.com" className="footer-link">
                  lennoxrealestate7@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Section */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "#718096" }}>
          <p>&copy; {currentYear} Lennox Real Estate Ltd. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/about" className="footer-link" style={{ fontSize: "0.85rem" }}>Privacy Policy</Link>
            <Link to="/contact" className="footer-link" style={{ fontSize: "0.85rem" }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Styled Classes */}
      <style>{`
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.05);
          color: #a0aec0;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .social-btn:hover {
          background-color: #F0A500;
          color: #1C2333;
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(240, 165, 0,0.25);
        }
        .footer-link {
          color: #a0aec0;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #F0A500;
        }
        @media (max-width: 768px) {
          .footer-links-col {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
