import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCms } from "../context/CmsContext";
import { Bed, Bath, Square, MapPin, Calendar, Check, Send, Phone, Mail, ArrowLeft } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const { properties, isLoading } = useCms();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Only reset image loading spinner when loading a completely new property
    setImageLoaded(false);
  }, [id]);

  // Prefetch all property images for instant caching and smooth thumbnail switches
  useEffect(() => {
    if (property && property.images && property.images.length > 0) {
      property.images.forEach((imgUrl) => {
        const img = new Image();
        img.src = imgUrl;
      });
    }
  }, [property]);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (properties.length > 0) {
      const found = properties.find((p) => p.id === id);
      if (found) {
        setProperty(found);
        setActiveImage(found.image);
      }
    }
  }, [id, properties]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  if (isLoading || (!property && properties.length === 0)) {
    return (
      <div style={{ paddingTop: "150px", textAlign: "center", minHeight: "80vh" }} className="container">
        <div style={{ display: "inline-block", width: "32px", height: "32px", border: "4px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ paddingTop: "150px", textAlign: "center", minHeight: "80vh" }} className="container">
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Property Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>The property listing you are trying to view does not exist or has been removed.</p>
        <Link to="/properties" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

  const { title, priceLabel, location, type, propertyType, beds, baths, sqft, images, description, amenities, listedDate, status } = property;

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "5rem" }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/properties" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontWeight: "600", fontSize: "0.9rem", marginBottom: "1.5rem" }} className="hover-gold">
          <ArrowLeft size={16} /> Back to Listings
        </Link>

        {/* Title and Header Details */}
        <div className="detail-header">
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ backgroundColor: "#F0A500", color: "#1C2333", fontSize: "0.75rem", fontWeight: "700", padding: "0.25rem 0.75rem", borderRadius: "4px", textTransform: "uppercase" }}>
                For {type}
              </span>
              <span style={{ backgroundColor: "#1e293b", color: "#FFFFFF", fontSize: "0.75rem", fontWeight: "700", padding: "0.25rem 0.75rem", borderRadius: "4px", textTransform: "uppercase" }}>
                {propertyType}
              </span>
            </div>
            <h1 style={{ fontSize: "2.25rem", color: "#1C2333", fontFamily: "var(--font-heading)", marginBottom: "0.5rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
              {title}
            </h1>
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748b", fontSize: "1rem" }}>
              <MapPin size={18} style={{ color: "#F0A500" }} />
              {location}
            </p>
          </div>
          
          <div className="detail-price-box">
            <span style={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700", display: "block" }}>
              List Price
            </span>
            <span style={{ fontSize: "2.25rem", fontWeight: "800", color: "#F0A500", display: "block", fontFamily: "var(--font-heading)", lineHeight: "1.1", margin: "0.2rem 0" }}>
              {priceLabel}
            </span>
            <span style={{ fontSize: "0.85rem", color: "#22c55e", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }}></span>
              {status}
            </span>
          </div>
        </div>

        {/* main layout grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2.5rem" }} className="detail-layout">
          
          {/* Left Column: Media Gallery, Desc, Features */}
          <div>
            {/* Gallery Box */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div 
                className="gallery-main"
                style={{ 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)", 
                  marginBottom: "1rem", 
                  position: "relative", 
                  backgroundColor: "#1e293b" 
                }}
              >
                {!imageLoaded && (
                  <div 
                    className="shimmer" 
                    style={{ 
                      position: "absolute", 
                      top: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "100%", 
                      background: "linear-gradient(90deg, #1C2333 25%, #1e293b 50%, #1C2333 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite"
                    }} 
                  />
                )}
                <img
                  src={activeImage}
                  alt={title}
                  onLoad={() => setImageLoaded(true)}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                    opacity: imageLoaded ? 1 : 0
                  }}
                />
              </div>

              {/* Thumbnails */}
              {images && images.length > 1 && (
                <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      style={{
                        flexShrink: 0,
                        width: "100px",
                        height: "70px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border: activeImage === img ? "3px solid #F0A500" : "3px solid transparent",
                        padding: 0,
                        cursor: "pointer"
                      }}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", fontFamily: "var(--font-heading)", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                Property Description
              </h2>
              <p style={{ color: "#475569", fontSize: "1.025rem", lineHeight: "1.8", whiteSpace: "pre-line" }}>
                {description}
              </p>
            </div>

            {/* Property Details Specs Table */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", fontFamily: "var(--font-heading)", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                Overview Details
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {beds > 0 && (
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.5rem", borderRadius: "8px", color: "#F0A500" }}><Bed size={20} /></div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Bedrooms</span>
                      <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>{beds} Beds</strong>
                    </div>
                  </div>
                )}

                {baths > 0 && (
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.5rem", borderRadius: "8px", color: "#F0A500" }}><Bath size={20} /></div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Bathrooms</span>
                      <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>{baths} Baths</strong>
                    </div>
                  </div>
                )}

                {sqft > 0 && (
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.5rem", borderRadius: "8px", color: "#F0A500" }}><Square size={18} /></div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Size Area</span>
                      <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>{sqft.toLocaleString()} Sq Ft</strong>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.5rem", borderRadius: "8px", color: "#F0A500" }}><Calendar size={18} /></div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Listed Date</span>
                    <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>{listedDate}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            {amenities && amenities.length > 0 && (
              <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", fontFamily: "var(--font-heading)", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                  Key Amenities
                </h2>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                  {amenities.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#475569", fontSize: "0.95rem" }}>
                      <div style={{ display: "inline-flex", backgroundColor: "#e6f4ea", color: "#137333", borderRadius: "50%", padding: "2px" }}>
                        <Check size={14} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry / Contact Card */}
          <div>
            <div 
              className="sticky-sidebar"
              style={{ 
                backgroundColor: "#FFFFFF", 
                padding: "2rem", 
                borderRadius: "12px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)", 
                position: "sticky", 
                top: "120px" 
              }}
            >
              <h3 style={{ fontSize: "1.25rem", color: "#1C2333", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
                Interested in this property?
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Send your contact details to Lennox Real Estate Ltd and one of our dedicated agents will reach out to you within 24 hours.
              </p>

              {submitSuccess ? (
                <div style={{ backgroundColor: "#eafaf1", color: "#137333", padding: "1.25rem", borderRadius: "8px", fontSize: "0.9rem", border: "1px solid #c6f0d5", marginBottom: "1rem" }}>
                  <strong>Inquiry Submitted!</strong> Thank you. Our dedicated property agent will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. 0712 345 678"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={`I am interested in this ${propertyType} at ${location}. Please send more information.`}
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem", display: "inline-flex", gap: "0.5rem" }}
                  >
                    {isSubmitting ? (
                      "Sending Inquiries..."
                    ) : (
                      <>
                        <Send size={16} /> Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Contacts */}
              <div style={{ marginTop: "1.75rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem", textAlign: "center" }}>
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", fontWeight: "700", display: "block", marginBottom: "0.75rem" }}>
                  Or Call Direct
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="tel:0737796886" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", width: "100%" }}>
                    <Phone size={14} /> 0737 796886
                  </a>
                  <a href="tel:0795673809" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", width: "100%" }}>
                    <Phone size={14} /> 0795 673809
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .gallery-main {
          height: 480px;
        }
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1.5rem;
        }
        .detail-price-box {
          text-align: right;
        }
        @media (max-width: 991px) {
          .detail-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .sticky-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 768px) {
          .gallery-main {
            height: 320px !important;
          }
          .detail-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .detail-price-box {
            text-align: left !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-main {
            height: 220px !important;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .hover-gold:hover {
          color: #F0A500 !important;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetail;
