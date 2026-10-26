import React from "react";
import { useCms } from "../context/CmsContext";
import PropertyCard from "../components/PropertyCard";
import { Home, Calendar, Users, ShieldCheck } from "lucide-react";

const HolidayRentals = () => {
  const { holidayProperties, isLoading } = useCms();

  return (
    <div style={{ paddingTop: "90px", paddingBottom: "5rem", minHeight: "100vh" }}>
      {/* Page Header */}
      <section
        style={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(18, 24, 36, 0.6), rgba(18, 24, 36, 0.75)), url('/holiday-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5rem 0",
          color: "#FFFFFF",
          textAlign: "center",
          marginBottom: "4rem"
        }}
      >
        <div className="container">
          <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px" }}>Vacation Retreats</span>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", marginTop: "0.5rem", fontFamily: "var(--font-heading)" }}>Lennox Holiday Stays</h1>
          <p style={{ color: "#e2e8f0", maxWidth: "600px", margin: "1rem auto 0 auto", fontSize: "1.1rem" }}>
            Experience coastal luxury in our curated cottages, townhouses, and beachfront penthouses in Diani and Kilifi.
          </p>
        </div>
      </section>

      {/* Services summary for stays */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "8px", borderLeft: "3px solid #F0A500", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <div style={{ color: "#F0A500", marginBottom: "0.75rem" }}><Calendar size={24} /></div>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>Flexible Booking</h4>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Easy date scheduling, check-ins, and chef bookings upon request.</p>
          </div>
          <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "8px", borderLeft: "3px solid #F0A500", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <div style={{ color: "#F0A500", marginBottom: "0.75rem" }}><Users size={24} /></div>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>Fully Serviced</h4>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Equipped with clean linens, high-speed WiFi, security guards, and backups.</p>
          </div>
          <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "8px", borderLeft: "3px solid #F0A500", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <div style={{ color: "#F0A500", marginBottom: "0.75rem" }}><ShieldCheck size={24} /></div>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>Managed Security</h4>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Located inside secure, vetted compounds with perimeter alarms and access codes.</p>
          </div>
        </div>
      </section>

      {/* Grid of holiday properties */}
      <section className="container">
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div style={{ display: "inline-block", width: "32px", height: "32px", border: "4px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            <p style={{ marginTop: "1rem", color: "#64748b" }}>Finding holiday properties...</p>
          </div>
        ) : holidayProperties.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
            <Home size={40} style={{ color: "#94a3b8", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.25rem", color: "#334155" }}>No Holiday Properties Available</h3>
            <p style={{ color: "#64748b", maxWidth: "400px", margin: "0.5rem auto 1.5rem auto" }}>
              We do not have any holiday properties listed at this time. Please check our standard rental listings or contact us for bespoke searches.
            </p>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: "1.5rem", color: "#1C2333", fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              Our Available Holiday Stays
            </h2>
            <div className="grid-3">
              {holidayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HolidayRentals;
