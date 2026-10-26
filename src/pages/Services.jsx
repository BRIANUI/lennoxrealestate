import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, LineChart, Compass, Home, Key, ClipboardCheck } from "lucide-react";

const Services = () => {
  const serviceList = [
    {
      icon: <ShieldCheck size={36} />,
      title: "Property Buyer Representation",
      description: "We act exclusively on behalf of property buyers, providing independent advice and search capabilities to secure verified properties with clean title deeds at market-reflective rates."
    },
    {
      icon: <LineChart size={36} />,
      title: "Comparative Property Assessment",
      description: "Our team performs comprehensive valuation analyses comparing local transaction histories and asset metrics to verify that property pricing aligns with genuine value."
    },
    {
      icon: <Compass size={36} />,
      title: "Dedicated Property Agent",
      description: "Every listing is assigned a dedicated professional agent who handles all showings, inquiries, negotiations, and document drafting to facilitate a secure, seamless closing."
    },
    {
      icon: <Key size={36} />,
      title: "Letting & Property Management",
      description: "For investors, we manage luxury lettings and rentals, handling guest services, utility billings, maintenance schedules, and occupancy updates to maximize passive rental yields."
    },
    {
      icon: <Home size={36} />,
      title: "Holiday Rental Operations",
      description: "We run full-service hospitality management for coastal cottages, villas, and penthouses. From listing distribution on Airbnb/Booking.com to physical guest check-ins."
    },
    {
      icon: <ClipboardCheck size={36} />,
      title: "Title Deed Verification & Due Diligence",
      description: "Before listing or purchasing any plot of land, we run comprehensive title deed searches at the Ministry of Lands registries to guarantee absolute legal safety."
    }
  ];

  return (
    <div style={{ paddingTop: "90px", paddingBottom: "5rem" }}>
      {/* Page Header */}
      <section className="section bg-light" style={{ padding: "3rem 0", marginBottom: "4rem", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px" }}>What We Do</span>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", marginTop: "0.5rem", fontFamily: "var(--font-heading)" }}>Our Real Estate Solutions</h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "1rem auto 0 auto", fontSize: "1.1rem" }}>
            Providing trusted, professional, and transparent advisory services to secure your property investments across Kenya.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container">
        <div className="grid-3" style={{ gap: "2.5rem" }}>
          {serviceList.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2.5rem 2rem",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                borderTop: "4px solid #F0A500",
                display: "flex",
                flexDirection: "column"
              }}
              className="service-card"
            >
              <div style={{ color: "#F0A500", marginBottom: "1.25rem" }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: "1.25rem", color: "#1C2333", fontFamily: "var(--font-heading)", marginBottom: "0.75rem" }}>
                {service.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.925rem", lineHeight: "1.6" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ marginTop: "6rem" }}>
        <div
          className="gradient-navy animate-fade-in"
          style={{
            padding: "4rem 3rem",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", color: "#FFFFFF", marginBottom: "1rem", fontFamily: "var(--font-heading)" }}>
              Need Specialized Advisory or Valuation?
            </h2>
            <p style={{ color: "#a0aec0", fontSize: "1.05rem", marginBottom: "2rem", lineHeight: "1.6" }}>
              Our expert agents are ready to provide a custom comparative property assessment or assist in locating verified residential and commercial assets in Kwale, Kilifi, and Nairobi.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Speak to a Consultant
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
};

export default Services;
