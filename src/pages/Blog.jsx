import React, { useState } from "react";
import { useCms } from "../context/CmsContext";
import BlogCard from "../components/BlogCard";
import { BookOpen } from "lucide-react";

const Blog = () => {
  const { blogPosts, isLoading } = useCms();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

  // Filter posts
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "5rem", minHeight: "100vh" }}>
      {/* Page Header */}
      <section className="section bg-light" style={{ padding: "3rem 0", marginBottom: "4rem", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ color: "#F0A500", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px" }}>Insights & News</span>
          <h1 style={{ fontSize: "2.5rem", marginTop: "0.5rem", fontFamily: "var(--font-heading)" }}>Lennox Property Journal</h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "1rem auto 0 auto", fontSize: "1.1rem" }}>
            Explore analysis, investment opportunities, legal processes, and guides for Kenyan property ownership.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Category Filters */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: "1px solid #e2e8f0",
                backgroundColor: selectedCategory === cat ? "#F0A500" : "#FFFFFF",
                color: selectedCategory === cat ? "#1C2333" : "#475569"
              }}
              className="cat-btn"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div style={{ display: "inline-block", width: "32px", height: "32px", border: "4px solid #cbd5e1", borderTopColor: "#F0A500", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#f8fafc", borderRadius: "12px" }}>
            <BookOpen size={40} style={{ color: "#94a3b8", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.25rem", color: "#334155" }}>No Articles Found</h3>
            <p style={{ color: "#64748b" }}>We haven't published any articles in this category yet.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .cat-btn:hover {
          border-color: #F0A500 !important;
          color: #F0A500;
        }
      `}</style>
    </div>
  );
};

export default Blog;
