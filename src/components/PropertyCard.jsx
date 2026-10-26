import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin } from "lucide-react";

const PropertyCard = ({ property }) => {
  const { id, title, priceLabel, location, type, propertyType, beds, baths, sqft, image } = property;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine path based on property type
  const detailPath = type === "Holiday" ? `/holiday-rentals/${id}` : `/properties/${id}`;

  // Badge color based on Sale / Rent / Holiday
  const getBadgeStyle = () => {
    switch (type) {
      case "Sale":
        return { backgroundColor: "#1e293b", color: "#f1f5f9" };
      case "Rent":
        return { backgroundColor: "#F0A500", color: "#1C2333" };
      case "Holiday":
        return { backgroundColor: "rgba(240, 165, 0, 0.15)", color: "#F0A500", border: "1px solid rgba(240, 165, 0, 0.3)" };
      default:
        return { backgroundColor: "#475569", color: "#f8fafc" };
    }
  };

  return (
    <div className="property-card" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Property Image & Badge */}
      <div style={{ position: "relative", overflow: "hidden", paddingTop: "60%", backgroundColor: "#1e293b" }}>
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
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            transition: "transform 0.5s ease, opacity 0.3s ease",
            opacity: imageLoaded ? 1 : 0
          }}
          className="card-img"
        />
        <span
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.35rem 0.85rem",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            ...getBadgeStyle()
          }}
        >
          {type}
        </span>
        <span
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "rgba(18, 24, 36, 0.75)",
            color: "#FFFFFF",
            backdropFilter: "blur(4px)",
            padding: "0.35rem 0.65rem",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "600"
          }}
        >
          {propertyType}
        </span>
      </div>

      {/* Property Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1C2333", marginBottom: "0.5rem", display: "block" }}>
          {priceLabel}
        </span>
        
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem", color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </h3>

        <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748b", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          <MapPin size={16} style={{ color: "#F0A500", flexShrink: 0 }} />
          {location}
        </p>

        {/* Specs Grid */}
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "1rem", marginTop: "auto", fontSize: "0.85rem", color: "#64748b" }}>
          {beds > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Bed size={16} style={{ color: "#F0A500" }} /> {beds} Beds
            </span>
          )}
          {baths > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Bath size={16} style={{ color: "#F0A500" }} /> {baths} Baths
            </span>
          )}
          {sqft > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Square size={14} style={{ color: "#F0A500" }} /> {sqft.toLocaleString()} Sq Ft
            </span>
          )}
        </div>

        {/* Action Link */}
        <Link
          to={detailPath}
          className="btn"
          style={{
            marginTop: "1.25rem",
            padding: "0.6rem 1rem",
            width: "100%",
            borderRadius: "6px",
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            color: "#1C2333",
            border: "1px solid #F0A500",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#F0A500";
            e.target.style.color = "#1C2333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#1C2333";
          }}
        >
          View Details
        </Link>
      </div>

      <style>{`
        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }
        .property-card:hover .card-img {
          transform: scale(1.08);
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default PropertyCard;
