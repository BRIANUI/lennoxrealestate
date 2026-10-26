import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCms } from "../context/CmsContext";
import { Calendar, Tag, User, ArrowLeft, Send } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogPosts, isLoading } = useCms();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (blogPosts.length > 0) {
      const found = blogPosts.find((p) => p.id === id);
      if (found) {
        setPost(found);
      }
    }
  }, [id, blogPosts]);

  if (isLoading || (!post && blogPosts.length === 0)) {
    return (
      <div style={{ paddingTop: "150px", textAlign: "center", minHeight: "80vh" }} className="container">
        <div style={{ display: "inline-block", width: "32px", height: "32px", border: "4px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading article details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: "150px", textAlign: "center", minHeight: "80vh" }} className="container">
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Article Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>The article listing you are trying to view does not exist or has been removed.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const { title, content, date, category } = post;

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Back Link */}
        <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontWeight: "600", fontSize: "0.9rem", marginBottom: "2rem" }} className="hover-gold">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Article Meta */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span style={{ backgroundColor: "rgba(240, 165, 0, 0.15)", color: "#F0A500", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>
            {category}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#64748b", fontSize: "0.85rem" }}>
            <Calendar size={14} style={{ color: "#F0A500" }} />
            {date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#64748b", fontSize: "0.85rem" }}>
            <User size={14} style={{ color: "#F0A500" }} />
            By Lennox Advisor
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#1C2333", fontFamily: "var(--font-heading)", lineHeight: "1.25", marginBottom: "2rem" }}>
          {title}
        </h1>

        {/* Cover Graphic Banner */}
        <div style={{ width: "100%", height: "350px", borderRadius: "12px", background: "linear-gradient(135deg, #1e293b 0%, #0b0f19 100%)", marginBottom: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center", color: "rgba(255,255,255,0.05)" }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        </div>

        {/* Content Body */}
        <article style={{ fontSize: "1.1rem", color: "#334155", lineHeight: "1.9", marginBottom: "4rem" }} className="article-body">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "1.5rem" }}>
              {paragraph}
            </p>
          ))}
        </article>

        {/* Contextual CTA Box */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", borderLeft: "5px solid #F0A500", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.35rem", color: "#1C2333", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
            Interested in Coastal Property Investment?
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Lennox Real Estate Ltd offers verified beachfront properties, gated communities, and advisory services. Reach out to speak with our investment consultants.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ display: "inline-flex", gap: "0.5rem" }}>
            <Send size={16} /> Consult an Advisor
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .hover-gold:hover {
          color: #F0A500 !important;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;
