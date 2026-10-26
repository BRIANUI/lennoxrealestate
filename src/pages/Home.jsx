import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCms } from "../context/CmsContext";
import PropertyCard from "../components/PropertyCard";
import BlogCard from "../components/BlogCard";
import { Search, MapPin, Building, ChevronRight, Star, Award, ShieldCheck, HeartHandshake } from "lucide-react";

const Home = () => {
  const { properties, blogPosts, isLoading } = useCms();
  const navigate = useNavigate();

  // Search form state
  const [searchType, setSearchType] = useState("Sale");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchPropType, setSearchPropType] = useState("");

  const heroSlides = [
    {
      image: "/hero-diani.jpg",
      label: "Premium Kenya Properties",
      title: "Discover Premium Properties with Integrity",
      subtitle: "Lennox Real Estate Ltd delivers trusted, transparent, and value-driven solutions. Find your beachfront villa or investment plot."
    },
    {
      image: "/holiday-hero.jpg",
      label: "Exclusive Stays & Rentals",
      title: "Bespoke Holiday Homes & Serviced Cottages",
      subtitle: "Relax in handpicked oceanfront villas, townhouses, and cottages featuring premium hospitality and verified security."
    },
    {
      image: "/property-1.jpg",
      label: "Verified Land Ventures",
      title: "Invest in Verified Plots with Clean Titles",
      subtitle: "Acquire prime land across Kwale, Kilifi, and Nairobi with 100% legal verification and professional diligence."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      type: searchType,
      location: searchLocation,
      propertyType: searchPropType
    }).toString();
    navigate(`/properties?${query}`);
  };

  // Get featured properties (limit 3)
  const featuredProperties = properties
    .filter((p) => p.featured)
    .slice(0, 3);

  // Get recommended properties (limit 3)
  const recommendedProperties = properties
    .filter((p) => p.recommended)
    .slice(0, 3);

  // Get latest blogs (limit 3)
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF",
          paddingTop: "0", 
          overflow: "hidden"
        }}
      >
        {/* Slide Background Images */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(rgba(18, 24, 36, 0.65), rgba(18, 24, 36, 0.8)), url('${slide.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? "scale(1)" : "scale(1.05)",
              transition: "opacity 2.5s ease-in-out, transform 12s ease-out",
              zIndex: 0
            }}
          />
        ))}

        {/* Polished Gold Particle Radial Effect */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(240, 165, 0,0.05) 0%, transparent 60%)", 
            zIndex: 1, 
            pointerEvents: "none" 
          }} 
        />

        {/* Preload subsequent slide images in background to avoid loading flicker */}
        <div style={{ display: "none" }}>
          {heroSlides.map((slide) => (
            <img key={slide.image} src={slide.image} alt="" />
          ))}
        </div>

        {/* Hero Content Container */}
        <div className="container hero-container" style={{ width: "100%", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", minHeight: "100vh", padding: "18vh 0 6rem 0" }}>
          {/* Animated Slide Content */}
          <div key={currentSlide} style={{ maxWidth: "850px", textAlign: "center", margin: "0 auto" }}>
            <span
              className="animate-slide-up"
              style={{
                color: "#F0A500",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontSize: "0.95rem",
                fontWeight: "600",
                display: "block",
                marginBottom: "1rem",
                animationDelay: "0.2s"
              }}
            >
              {heroSlides[currentSlide].label}
            </span>
            <h1
              className="animate-slide-up"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                fontWeight: "300",
                lineHeight: "1.1",
                color: "#FFFFFF",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.5px",
                animationDelay: "0.4s",
                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
              {heroSlides[currentSlide].title}
            </h1>
            <p
              className="animate-slide-up"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: "1.7",
                fontWeight: "300",
                maxWidth: "700px",
                margin: "0 auto",
                textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                animationDelay: "0.6s"
              }}
            >
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          {/* Search Filter Bar */}
          <div
            className="animate-fade-in hero-search-bar"
            style={{
              backgroundColor: "rgba(18, 24, 36, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              padding: "2rem 2.5rem",
              color: "#FFFFFF",
              maxWidth: "1050px",
              margin: "2.5rem auto auto auto",
              width: "100%",
              animationDelay: "0.8s"
            }}
          >
            <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", alignItems: "flex-end" }}>
              {/* Type Selection */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "rgba(255,255,255,0.7)", fontWeight: "500", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>Purpose</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="form-control"
                  style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", borderRadius: 0, padding: "0.5rem 0", fontSize: "1.05rem", fontWeight: "400" }}
                >
                  <option value="Sale" style={{ color: "#1C2333" }}>Buy Property</option>
                  <option value="Rent" style={{ color: "#1C2333" }}>Rent Property</option>
                  <option value="Holiday" style={{ color: "#1C2333" }}>Holiday Stays</option>
                </select>
              </div>

              {/* Location Input */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "rgba(255,255,255,0.7)", fontWeight: "500", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>Destination</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={18} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "#F0A500" }} />
                  <input
                    type="text"
                    placeholder="e.g. Diani, Kilifi"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", borderRadius: 0, padding: "0.5rem 0 0.5rem 1.75rem", fontSize: "1.05rem", fontWeight: "400" }}
                  />
                </div>
              </div>

              {/* Property Type Selection */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "rgba(255,255,255,0.7)", fontWeight: "500", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>Category</label>
                <div style={{ position: "relative" }}>
                  <Building size={18} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "#F0A500" }} />
                  <select
                    value={searchPropType}
                    onChange={(e) => setSearchPropType(e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", borderRadius: 0, padding: "0.5rem 0 0.5rem 1.75rem", fontSize: "1.05rem", fontWeight: "400" }}
                  >
                    <option value="" style={{ color: "#1C2333" }}>All Collections</option>
                    <option value="Villa" style={{ color: "#1C2333" }}>Luxury Villa</option>
                    <option value="Apartment" style={{ color: "#1C2333" }}>Apartment</option>
                    <option value="Cottage" style={{ color: "#1C2333" }}>Coastal Cottage</option>
                    <option value="Land" style={{ color: "#1C2333" }}>Prime Land</option>
                    <option value="Townhouse" style={{ color: "#1C2333" }}>Townhouse</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button type="submit" className="btn btn-primary" style={{ height: "48px", borderRadius: "8px", width: "100%", fontSize: "0.95rem", letterSpacing: "0.5px" }}>
                <Search size={18} /> Explore
              </button>
            </form>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "1rem", zIndex: 10, alignItems: "center" }}>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? "24px" : "8px",
                height: "4px",
                borderRadius: "2px",
                backgroundColor: currentSlide === idx ? "#F0A500" : "rgba(255, 255, 255, 0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.4s ease",
                boxShadow: currentSlide === idx ? "0 0 10px rgba(240, 165, 0, 0.5)" : "none"
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section bg-dark" style={{ color: "#FFFFFF", backgroundImage: "radial-gradient(circle at 10% 20%, rgba(240, 165, 0,0.08) 0%, transparent 40%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px" }}>Who We Are</span>
            <h2 style={{ fontSize: "2.25rem", color: "#FFFFFF", marginTop: "0.5rem" }}>Our Core Foundation</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#F0A500", margin: "1rem auto", borderRadius: "2px" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {/* Mission Card */}
            <div
              className="glassmorphism-dark"
              style={{
                padding: "3rem 2.5rem",
                borderRadius: "16px",
                borderLeft: "5px solid #F0A500",
                boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0, 0.15)", padding: "0.75rem", borderRadius: "12px", color: "#F0A500" }}>
                  <Award size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "#FFFFFF", fontFamily: "var(--font-heading)" }}>Our Mission</h3>
              </div>
              <p style={{ color: "#a0aec0", fontSize: "1.05rem", lineHeight: "1.7" }}>
                Provide trusted, transparent, and value-driven real estate solutions by helping clients acquire, invest in, and own quality property while delivering exceptional customer service, integrity, professionalism, and sustainable growth in the communities we serve.
              </p>
            </div>

            {/* Vision Card */}
            <div
              className="glassmorphism-dark"
              style={{
                padding: "3rem 2.5rem",
                borderRadius: "16px",
                borderLeft: "5px solid #F0A500",
                boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ backgroundColor: "rgba(240, 165, 0, 0.15)", padding: "0.75rem", borderRadius: "12px", color: "#F0A500" }}>
                  <Star size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "#FFFFFF", fontFamily: "var(--font-heading)" }}>Our Vision</h3>
              </div>
              <p style={{ color: "#a0aec0", fontSize: "1.05rem", lineHeight: "1.7" }}>
                To become the leading and most trusted real estate company in Kenya, transforming property ownership and investment through excellence, innovation, integrity, and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "0.5rem" }}>Handpicked Listings</span>
            <h2>Featured Properties</h2>
            <p>Explore some of the finest properties for sale, rent, or holiday staying in Diani and coastal Kenya.</p>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <div className="flex-center" style={{ gap: "0.5rem", color: "#64748b" }}>
                <div style={{ width: "24px", height: "24px", border: "3px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                Loading properties...
              </div>
            </div>
          ) : (
            <>
              <div className="grid-3" style={{ marginBottom: "3rem" }}>
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div style={{ textAlign: "center" }}>
                <Link to="/properties" className="btn btn-secondary">
                  Browse All Listings <ChevronRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Recommended Listings Section */}
      {recommendedProperties.length > 0 && (
        <section className="section bg-light" style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          <div className="container">
            <div className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "0.5rem" }}>Curated For You</span>
              <h2>Recommended Properties</h2>
              <p>Handpicked premium properties selected by our experts for outstanding location, quality, and investment value.</p>
            </div>

            <div className="grid-3" style={{ marginBottom: "3rem" }}>
              {recommendedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "0.5rem" }}>What We Offer</span>
            <h2>Our Real Estate Services</h2>
            <p>Providing expert representation and tailored strategies to ensure optimal returns on your property journey.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {/* Service 1 */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem 2rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", borderTop: "4px solid #F0A500" }}>
              <div style={{ color: "#F0A500", marginBottom: "1.25rem" }}><ShieldCheck size={36} /></div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Property Acquisitions & Sales</h3>
              <p style={{ color: "#64748b", fontSize: "0.925rem", lineHeight: "1.6" }}>
                Guiding clients through secure, transparent purchases of luxury homes, plots of land, and commercial premises with verified title deeds.
              </p>
            </div>

            {/* Service 2 */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem 2rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", borderTop: "4px solid #F0A500" }}>
              <div style={{ color: "#F0A500", marginBottom: "1.25rem" }}><Star size={36} /></div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Holiday Letting & Management</h3>
              <p style={{ color: "#64748b", fontSize: "0.925rem", lineHeight: "1.6" }}>
                Managing premium vacation cottages and townhouses, ensuring exceptional hospitality for guests and high occupancy yields for owners.
              </p>
            </div>

            {/* Service 3 */}
            <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem 2rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", borderTop: "4px solid #F0A500" }}>
              <div style={{ color: "#F0A500", marginBottom: "1.25rem" }}><HeartHandshake size={36} /></div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>Comparative Property Assessment</h3>
              <p style={{ color: "#64748b", fontSize: "0.925rem", lineHeight: "1.6" }}>
                Conducting rigorous market assessments and valuations to ensure listings are correctly priced for maximum investment returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Insights */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "0.5rem" }}>Real Estate Insights</span>
            <h2>Latest From Our Blog</h2>
            <p>Stay informed about real estate trends, legal processes, and lifestyle tips along the Kenyan coastline.</p>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>Loading blogs...</div>
          ) : (
            <div className="grid-3" style={{ marginBottom: "3rem" }}>
              {latestBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <Link to="/blog" className="btn btn-secondary">
              View All Articles <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="gradient-navy section" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontSize: "2.5rem", color: "#FFFFFF", marginBottom: "1.25rem", fontFamily: "var(--font-heading)" }}>
            Ready to Find Your Dream Property?
          </h2>
          <p style={{ color: "#a0aec0", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
            Connect with our dedicated real estate agents today. We offer professional, transparent, and values-driven advisory services to secure your property legacy in Kenya.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-primary">
              Contact an Agent
            </Link>
            <Link to="/properties" className="btn btn-outline-white">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUpFade 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ── Mobile Optimizations ── */
        @media (max-width: 768px) {
          .hero-container {
            padding-top: 140px !important;
            padding-bottom: 6rem !important;
          }
          .hero-search-bar {
            padding: 1.25rem !important;
            margin-top: 2rem !important;
            border-radius: 12px !important;
          }
          .hero-search-bar form {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .hero-container {
            padding-top: 110px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
