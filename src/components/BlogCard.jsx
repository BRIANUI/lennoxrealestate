import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const BlogCard = ({ post }) => {
  const { id, title, excerpt, date, category } = post;

  return (
    <div className="blog-card" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)", transition: "all 0.3s ease", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Blog Category & Image Placeholder */}
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #1C2333 100%)", padding: "2.5rem 1.5rem", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "140px" }}>
        <span style={{ position: "absolute", top: "1rem", left: "1rem", backgroundColor: "rgba(240, 165, 0, 0.2)", color: "#F0A500", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>
          {category}
        </span>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.8rem" }}>
          <Calendar size={14} style={{ color: "#F0A500" }} />
          {date}
        </div>
      </div>

      {/* Blog Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.75rem", color: "#1C2333", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4" }}>
          {title}
        </h3>
        
        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {excerpt}
        </p>

        {/* Action Link */}
        <Link
          to={`/blog/${id}`}
          style={{
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#F0A500",
            fontWeight: "700",
            fontSize: "0.9rem"
          }}
          className="read-more-link"
        >
          Read Article <ArrowRight size={16} className="arrow-icon" style={{ transition: "transform 0.2s" }} />
        </Link>
      </div>

      <style>{`
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
        }
        .blog-card:hover .arrow-icon {
          transform: translateX(4px);
        }
        .blog-card:hover .read-more-link {
          color: #D4920A !important;
        }
      `}</style>
    </div>
  );
};

export default BlogCard;
