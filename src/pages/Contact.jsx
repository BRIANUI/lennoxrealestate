import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Sales",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "Sales",
        message: ""
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  // Social Links SVG Details
  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/p/Lennox-Real-Estate-LTD-61556613850623/" },
    { name: "Instagram", url: "https://www.instagram.com/lennox_real_estate/" },
    { name: "Twitter/X", url: "https://x.com/EstateLennox" },
    { name: "YouTube", url: "https://youtube.com/@lennoxrealestate?si=mUCCpcsW7Y6hkeGr" },
    { name: "LinkedIn", url: "https://ke.linkedin.com/in/lennox-real-estate-ltd-36316a340" },
    { name: "TikTok", url: "https://www.tiktok.com/tag/lennoxrealestated" }
  ];

  return (
    <div style={{ paddingTop: "90px", paddingBottom: "5rem" }}>
      {/* Page Header */}
      <section className="section bg-light" style={{ padding: "3rem 0", marginBottom: "4rem", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px" }}>Get in Touch</span>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", marginTop: "0.5rem", fontFamily: "var(--font-heading)" }}>Contact Lennox Real Estate</h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "1rem auto 0 auto", fontSize: "1.1rem" }}>
            Reach out to our professional property team today. We are happy to help with inquiries, listings, and viewings.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3.5rem" }} className="contact-layout">
          {/* Left Column: Details */}
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontFamily: "var(--font-heading)", borderLeft: "4px solid #F0A500", paddingLeft: "0.75rem" }}>
              Our Office Contacts
            </h2>
            
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "2rem" }}>
              Feel free to visit our office or reach us directly via phone and email. You can also connect with us on our verified social media channels for real-time updates.
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
              <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.6rem", borderRadius: "10px", color: "#F0A500" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <strong style={{ display: "block", color: "#1C2333", fontSize: "0.95rem" }}>Physical Location</strong>
                  <span style={{ color: "#64748b", fontSize: "0.925rem" }}>
                    Diani Beach Road, South Coast,<br />Kwale County, Kenya
                  </span>
                </div>
              </li>

              <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.6rem", borderRadius: "10px", color: "#F0A500" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <strong style={{ display: "block", color: "#1C2333", fontSize: "0.95rem" }}>Phone Lines</strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <a href="tel:0737796886" style={{ color: "#64748b", fontSize: "0.925rem" }} className="hover-gold">0737 796886</a>
                    <a href="tel:0795673809" style={{ color: "#64748b", fontSize: "0.925rem" }} className="hover-gold">0795 673809</a>
                  </div>
                </div>
              </li>

              <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0,0.1)", padding: "0.6rem", borderRadius: "10px", color: "#F0A500" }}>
                  <Mail size={22} />
                </div>
                <div>
                  <strong style={{ display: "block", color: "#1C2333", fontSize: "0.95rem" }}>Email Address</strong>
                  <a href="mailto:lennoxrealestate7@gmail.com" style={{ color: "#64748b", fontSize: "0.925rem" }} className="hover-gold">
                    lennoxrealestate7@gmail.com
                  </a>
                </div>
              </li>
            </ul>

            {/* Social Media Links */}
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", fontFamily: "var(--font-heading)" }}>Follow Us</h3>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn-contact"
                    style={{
                      padding: "0.4rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      backgroundColor: "#FFFFFF",
                      color: "#475569",
                      border: "1px solid #e2e8f0",
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                Send Us a Message
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "2rem" }}>
                Have questions or want to list your property? Fill out the form below and we'll reply as soon as possible.
              </p>

              {submitSuccess ? (
                <div style={{ backgroundColor: "#eafaf1", color: "#137333", padding: "1.25rem", borderRadius: "8px", border: "1px solid #c6f0d5", marginBottom: "1.5rem" }}>
                  <strong>Message Sent Successfully!</strong> Thank you for contacting Lennox Real Estate. We will get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="John Doe"
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
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Topic of Interest</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="Sales">Buying a Property</option>
                      <option value="Renting">Renting a Property</option>
                      <option value="Listing">Listing My Property</option>
                      <option value="Holiday">Booking a Holiday Stay</option>
                      <option value="Valuation">Valuation & Assessment</option>
                      <option value="Other">General Inquiries</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details</label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Describe your property requirements, questions or parameters here..."
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "0.8rem", fontSize: "0.95rem", display: "inline-flex", gap: "0.5rem" }}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container" style={{ marginTop: "5rem" }}>
        <div className="map-container" style={{ borderRadius: "12px", overflow: "hidden", height: "400px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #cbd5e1", position: "relative" }}>
          {/* Map placeholder */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem", textAlign: "center" }}>
            <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", borderRadius: "12px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", maxWidth: "400px" }}>
              <MapPin size={32} style={{ color: "#F0A500", marginBottom: "0.75rem" }} />
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Lennox Real Estate Office</h3>
              <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
                Diani Beach Road, Kwale County, Kenya
              </p>
              <a
                href="https://maps.google.com/?q=Diani+Beach+Road+Kwale"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: "0.45rem 1.25rem", fontSize: "0.8rem" }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hover-gold:hover {
          color: #F0A500 !important;
        }
        .social-btn-contact:hover {
          background-color: #F0A500 !important;
          color: #1C2333 !important;
          border-color: #F0A500 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(240, 165, 0,0.2);
        }
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .map-container {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
