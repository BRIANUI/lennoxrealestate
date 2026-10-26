import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCms } from "../context/CmsContext";
import PropertyCard from "../components/PropertyCard";
import { Search, MapPin, Building, RotateCcw } from "lucide-react";

const Properties = () => {
  const { properties, isLoading } = useCms();
  const location = useLocation();

  // Search parameters from home page
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "Sale";
  const initialLocation = queryParams.get("location") || "";
  const initialPropType = queryParams.get("propertyType") || "";

  // Filter States
  const [filterType, setFilterType] = useState(initialType);
  const [filterLocation, setFilterLocation] = useState(initialLocation);
  const [filterPropType, setFilterPropType] = useState(initialPropType);
  const [filterBeds, setFilterBeds] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");

  // Sync state with URL parameters when URL changes
  useEffect(() => {
    setFilterType(queryParams.get("type") || "Sale");
    setFilterLocation(queryParams.get("location") || "");
    setFilterPropType(queryParams.get("propertyType") || "");
  }, [location.search]);

  // Reset Filters
  const handleReset = () => {
    setFilterType("Sale");
    setFilterLocation("");
    setFilterPropType("");
    setFilterBeds("");
    setFilterPriceRange("");
  };

  // Filter Logic
  const filteredProperties = properties.filter((p) => {
    // 1. Type
    if (filterType && p.type !== filterType) return false;
    
    // 2. Location
    if (filterLocation && !p.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    
    // 3. Property Type
    if (filterPropType && p.propertyType !== filterPropType) return false;
    
    // 4. Beds
    if (filterBeds && p.beds < parseInt(filterBeds)) return false;

    // 5. Price Range
    if (filterPriceRange) {
      const price = p.price;
      if (filterPriceRange === "under-5m" && price >= 5000000) return false;
      if (filterPriceRange === "5m-15m" && (price < 5000000 || price > 15000000)) return false;
      if (filterPriceRange === "15m-30m" && (price < 15000000 || price > 30000000)) return false;
      if (filterPriceRange === "over-30m" && price <= 30000000) return false;
    }

    return true;
  });

  // Unique locations for filters (optional helper)
  return (
    <div style={{ paddingTop: "90px", minHeight: "100vh" }}>
      {/* Search Header Banner */}
      <section className="section bg-light" style={{ padding: "2.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "1.5rem", fontFamily: "var(--font-heading)" }}>
            Explore Properties
          </h1>

          {/* Filters Form */}
          <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {/* Type Select */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Listed For</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-control"
                >
                  <option value="Sale">Sale / Purchase</option>
                  <option value="Rent">Long-term Rent</option>
                  <option value="Holiday">Holiday Stay</option>
                </select>
              </div>

              {/* Location Input */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Location</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: "2.25rem" }}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category</label>
                <div style={{ position: "relative" }}>
                  <Building size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <select
                    value={filterPropType}
                    onChange={(e) => setFilterPropType(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: "2.25rem" }}
                  >
                    <option value="">All Categories</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Land">Land / Plot</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>
              </div>

              {/* Min Beds */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Min Bedrooms</label>
                <select
                  value={filterBeds}
                  onChange={(e) => setFilterBeds(e.target.value)}
                  className="form-control"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Price Range</label>
                <select
                  value={filterPriceRange}
                  onChange={(e) => setFilterPriceRange(e.target.value)}
                  className="form-control"
                >
                  <option value="">Any Price</option>
                  {filterType === "Rent" ? (
                    <>
                      <option value="under-5m">Under KES 50,000/mo</option>
                      <option value="5m-15m">KES 50,000 - 150,000/mo</option>
                      <option value="15m-30m">KES 150,000 - 300,000/mo</option>
                      <option value="over-30m">Over KES 300,000/mo</option>
                    </>
                  ) : filterType === "Holiday" ? (
                    <>
                      <option value="under-5m">Under KES 15,000/night</option>
                      <option value="5m-15m">KES 15,000 - 30,000/night</option>
                      <option value="over-30m">Over KES 30,000/night</option>
                    </>
                  ) : (
                    <>
                      <option value="under-5m">Under KES 5M</option>
                      <option value="5m-15m">KES 5M - 15M</option>
                      <option value="15m-30m">KES 15M - 30M</option>
                      <option value="over-30m">Over KES 30M</option>
                    </>
                  )}
                </select>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ height: "42px", display: "inline-flex", gap: "0.4rem", borderRadius: "6px", width: "100%", padding: "0.5rem 1rem", border: "1px solid #cbd5e1", color: "#1e293b", backgroundColor: "#f8fafc" }}
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="section section-bg">
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              <div style={{ display: "inline-block", width: "32px", height: "32px", border: "4px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
              <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading listings...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
              <Building size={48} style={{ color: "#94a3b8", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.25rem", color: "#334155", marginBottom: "0.5rem" }}>No Listings Found</h3>
              <p style={{ color: "#64748b", maxWidth: "450px", margin: "0 auto 1.5rem auto" }}>
                We couldn't find any properties matching your search criteria. Try adjusting your location text, category selection, or filters.
              </p>
              <button onClick={handleReset} className="btn btn-primary" style={{ padding: "0.6rem 1.5rem" }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div>
              <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Showing <strong>{filteredProperties.length}</strong> matching property listings
              </div>
              <div className="grid-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .props-filter-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Properties;
