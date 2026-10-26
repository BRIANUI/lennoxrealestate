import React from "react";
import { Award, Shield, Eye, HeartHandshake, Milestone } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Header Banner */}
      <section className="gradient-navy" style={{ paddingTop: "90px", paddingBottom: "4rem", textAlign: "center" }}>
        <div className="container">
          <span style={{ color: "#F0A500", textTransform: "uppercase", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "2px" }}>
            Get to Know Us
          </span>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", color: "#FFFFFF", marginTop: "0.5rem", fontFamily: "var(--font-heading)" }}>
            About Lennox Real Estate Ltd
          </h1>
          <p style={{ color: "#a0aec0", maxWidth: "600px", margin: "1rem auto 0 auto", fontSize: "1.1rem" }}>
            A trusted name in Kenyan real estate, providing excellence, innovation, and value-driven property solutions.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section section-bg">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Our Evolution</span>
            <h2 style={{ fontSize: "2rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>Redefining Coastal & National Real Estate</h2>
            <p style={{ color: "#55647a", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.25rem" }}>
              Lennox Real Estate Ltd provides trusted, transparent, and value-driven real estate solutions in Kenya. Transforming property ownership and investment, we have grown from offering prime coastal properties in Kwale and Kilifi counties to delivering specialized residential and investment plots across the country.
            </p>
            <p style={{ color: "#55647a", fontSize: "1rem", lineHeight: "1.7" }}>
              Our transition to Lennox Real Estate Ltd highlights our expanded reach and reinforced commitment to transparency, professional diligence, and premium property matching.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="/holiday-hero.jpg"
              alt="Lennox Real Estate properties"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 15px 40px rgba(0,0,0,0.1)", objectFit: "cover", height: "350px" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                backgroundColor: "#F0A500",
                color: "#1C2333",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              className="badge-experience"
            >
              <span style={{ fontSize: "2rem", fontWeight: "800", lineHeight: "1" }}>100%</span>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginTop: "0.25rem" }}>Verified Titles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2rem" }}>Our Pillars of Purpose</h2>
            <div style={{ width: "50px", height: "3px", backgroundColor: "#F0A500", margin: "1rem auto", borderRadius: "1.5px" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
            {/* Mission */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "3rem 2.25rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", borderTop: "5px solid #1C2333" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "rgba(18, 24, 36, 0.05)", padding: "0.6rem", borderRadius: "10px", color: "#1C2333" }}>
                  <Milestone size={28} />
                </div>
                <h3 style={{ fontSize: "1.35rem", fontFamily: "var(--font-heading)" }}>Our Mission Statement</h3>
              </div>
              <p style={{ color: "#55647a", fontSize: "1rem", lineHeight: "1.7" }}>
                Provide trusted, transparent, and value-driven real estate solutions by helping clients acquire, invest in, and own quality property while delivering exceptional customer service, integrity, professionalism, and sustainable growth in the communities we serve.
              </p>
            </div>

            {/* Vision */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "3rem 2.25rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", borderTop: "5px solid #F0A500" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0, 0.1)", padding: "0.6rem", borderRadius: "10px", color: "#F0A500" }}>
                  <Eye size={28} />
                </div>
                <h3 style={{ fontSize: "1.35rem", fontFamily: "var(--font-heading)" }}>Our Vision Statement</h3>
              </div>
              <p style={{ color: "#55647a", fontSize: "1rem", lineHeight: "1.7" }}>
                To become the leading and most trusted real estate company in Kenya, transforming property ownership and investment through excellence, innovation, integrity, and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Our Principles</span>
            <h2 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Our Core Values</h2>
            <div style={{ width: "50px", height: "3px", backgroundColor: "#F0A500", margin: "1rem auto", borderRadius: "1.5px" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem" }}>
            {/* Value 1 */}
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ color: "#F0A500", display: "inline-flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px", backgroundColor: "rgba(240, 165, 0,0.1)", borderRadius: "50%", marginBottom: "1.25rem" }}>
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Absolute Integrity</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                We believe in complete transparency and strict legal compliance in every transaction, offering verified properties with clean title deeds.
              </p>
            </div>

            {/* Value 2 */}
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ color: "#F0A500", display: "inline-flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px", backgroundColor: "rgba(240, 165, 0,0.1)", borderRadius: "50%", marginBottom: "1.25rem" }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Pursuit of Excellence</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                We deliver exceptional customer service, utilizing our deep market insights and experienced agents to achieve premium outcomes.
              </p>
            </div>

            {/* Value 3 */}
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ color: "#F0A500", display: "inline-flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px", backgroundColor: "rgba(240, 165, 0,0.1)", borderRadius: "50%", marginBottom: "1.25rem" }}>
                <HeartHandshake size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Value-Driven Innovation</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                We continuous iterate our services and operations, leveraging technology and modern methods to deliver seamless customer experiences.
              </p>
            </div>

            {/* Value 4 */}
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ color: "#F0A500", display: "inline-flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px", backgroundColor: "rgba(240, 165, 0,0.1)", borderRadius: "50%", marginBottom: "1.25rem" }}>
                <Milestone size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Sustainable Growth</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                We support sustainable community development and planning to ensure long-term value for property owners and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .badge-experience {
            position: static !important;
            margin-top: 1rem;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
