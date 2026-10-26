import React, { useState, useEffect } from "react";
import { auth, storage } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCms } from "../context/CmsContext";
import { Plus, Trash2, Edit3, LogOut, CheckSquare, LayoutGrid, BookOpen, AlertCircle } from "lucide-react";

const Admin = () => {
  const { 
    properties, 
    blogPosts, 
    addProperty, 
    updateProperty, 
    deleteProperty,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  } = useCms();

  // Auth state
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Saving state for property form
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Raw File objects chosen by the file picker (not yet uploaded)
  const [pendingFiles, setPendingFiles] = useState([]);
  // Preview URLs (object URLs for display only)
  const [previewUrls, setPreviewUrls] = useState([]);

  // Tab state
  const [activeTab, setActiveTab] = useState("properties"); // "properties" or "blogs"

  // Form toggles
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Property Form State
  const [propertyData, setPropertyData] = useState({
    title: "",
    price: "",
    priceLabel: "",
    location: "",
    type: "Sale",
    propertyType: "Villa",
    beds: "",
    baths: "",
    sqft: "",
    image: "",
    images: [],
    description: "",
    amenities: "",
    featured: true,
    recommended: false,
    status: "Available",
    listedDate: new Date().toISOString().split("T")[0]
  });

  // Blog Form State
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    category: "Investment",
    content: ""
  });

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError("Invalid credentials. Please verify email and password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Upload a single File to Firebase Storage and return its download URL
  const uploadImageToStorage = async (file) => {
    const uniqueName = `lennox_properties/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, uniqueName);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Property Submit
  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess("");

    // Must have either already-saved URLs on the property OR pending new files
    const existingUrls = Array.isArray(propertyData.images)
      ? propertyData.images.filter(u => u && u.startsWith("http"))
      : [];

    if (existingUrls.length === 0 && pendingFiles.length === 0) {
      setSaveError("Please add at least one property picture.");
      return;
    }

    setIsSaving(true);
    try {
      // Upload any new files to Firebase Storage
      const uploadedUrls = await Promise.all(
        pendingFiles.map(file => uploadImageToStorage(file))
      );

      // Merge existing saved URLs with newly uploaded ones
      const allImageUrls = [...existingUrls, ...uploadedUrls];

      const formattedData = {
        ...propertyData,
        price: Number(propertyData.price),
        beds: Number(propertyData.beds),
        baths: Number(propertyData.baths),
        sqft: Number(propertyData.sqft),
        amenities: typeof propertyData.amenities === "string"
          ? propertyData.amenities.split(",").map(a => a.trim()).filter(a => a)
          : propertyData.amenities,
        images: allImageUrls,
        image: allImageUrls[0] || "",
        listedDate: propertyData.listedDate || new Date().toISOString().split("T")[0]
      };

      if (editingPropertyId) {
        await updateProperty(editingPropertyId, formattedData);
        setSaveSuccess("Listing updated successfully!");
      } else {
        await addProperty({ ...formattedData, id: Date.now().toString() });
        setSaveSuccess("Listing created successfully!");
      }
      setTimeout(() => {
        resetPropertyForm();
        setSaveSuccess("");
      }, 1500);
    } catch (error) {
      console.error("Error saving property:", error);
      setSaveError(`Failed to save listing: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const resetPropertyForm = () => {
    setPropertyData({
      title: "",
      price: "",
      priceLabel: "",
      location: "",
      type: "Sale",
      propertyType: "Villa",
      beds: "",
      baths: "",
      sqft: "",
      image: "",
      images: [],
      description: "",
      amenities: "",
      featured: true,
      recommended: false,
      status: "Available",
      listedDate: new Date().toISOString().split("T")[0]
    });
    setPendingFiles([]);
    setPreviewUrls([]);
    setSaveError("");
    setSaveSuccess("");
    setEditingPropertyId(null);
    setShowPropertyForm(false);
  };

  const startEditProperty = (p) => {
    setPropertyData({
      ...p,
      amenities: Array.isArray(p.amenities) ? p.amenities.join(", ") : p.amenities,
      // Keep images as an array of existing URLs
      images: Array.isArray(p.images) ? p.images : [],
      recommended: p.recommended || false,
      listedDate: p.listedDate || new Date().toISOString().split("T")[0]
    });
    setPendingFiles([]);
    setPreviewUrls([]);
    setSaveError("");
    setSaveSuccess("");
    setEditingPropertyId(p.id);
    setShowPropertyForm(true);
  };

  // Blog Submit
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlogId) {
        await updateBlogPost(editingBlogId, blogData);
      } else {
        await addBlogPost({ ...blogData, id: Date.now().toString() });
      }
      resetBlogForm();
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const resetBlogForm = () => {
    setBlogData({
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      category: "Investment",
      content: ""
    });
    setEditingBlogId(null);
    setShowBlogForm(false);
  };

  const startEditBlog = (b) => {
    setBlogData(b);
    setEditingBlogId(b.id);
    setShowBlogForm(true);
  };

  // --- Rendering Sign In Page ---
  if (!user) {
    return (
      <div style={{ paddingTop: "150px", paddingBottom: "5rem", minHeight: "100vh", backgroundColor: "#f1f5f9" }} className="flex-center">
        <div style={{ backgroundColor: "#FFFFFF", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src="/logo.jpg" alt="Lennox Real Estate Logo" style={{ height: "60px", width: "60px", borderRadius: "50%", border: "2px solid #F0A500", objectFit: "cover", marginBottom: "0.75rem" }} />
            <h2 style={{ fontSize: "1.5rem", color: "#1C2333", fontFamily: "var(--font-heading)" }}>Lennox Agent Portal</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Administrative Sign In</p>
          </div>

          {authError && (
            <div style={{ backgroundColor: "#fef2f2", color: "#b91c1c", padding: "0.75rem", borderRadius: "6px", fontSize: "0.85rem", border: "1px solid #fee2e2", display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.25rem" }}>
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="form-control"
                placeholder="agent@lennox.com"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "1.75rem" }}>
              <label className="form-label">Portal Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.75rem" }}
            >
              {isLoggingIn ? "Signing In..." : "Sign In to Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Rendering Dashboard ---
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "5rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Dashboard Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "1.5rem", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", color: "#1C2333", fontFamily: "var(--font-heading)" }}>
              Admin Control Panel
            </h1>
            <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
              Signed in as: <strong>{user.email}</strong>
            </span>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", border: "1px solid #ef4444", color: "#ef4444", display: "inline-flex", gap: "0.5rem" }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => { setActiveTab("properties"); resetPropertyForm(); resetBlogForm(); }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              border: "1px solid",
              borderColor: activeTab === "properties" ? "#F0A500" : "#cbd5e1",
              backgroundColor: activeTab === "properties" ? "#F0A500" : "#FFFFFF",
              color: activeTab === "properties" ? "#1C2333" : "#475569",
              display: "inline-flex",
              gap: "0.4rem"
            }}
          >
            <LayoutGrid size={16} /> Manage Listings ({properties.length})
          </button>
          <button
            onClick={() => { setActiveTab("blogs"); resetPropertyForm(); resetBlogForm(); }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              border: "1px solid",
              borderColor: activeTab === "blogs" ? "#F0A500" : "#cbd5e1",
              backgroundColor: activeTab === "blogs" ? "#F0A500" : "#FFFFFF",
              color: activeTab === "blogs" ? "#1C2333" : "#475569",
              display: "inline-flex",
              gap: "0.4rem"
            }}
          >
            <BookOpen size={16} /> Manage Blog Posts ({blogPosts.length})
          </button>
        </div>

        {/* ================= PROPERTIES TAB ================= */}
        {activeTab === "properties" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.35rem", color: "#1e293b" }}>Property Listings</h2>
              {!showPropertyForm && (
                <button onClick={() => setShowPropertyForm(true)} className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.85rem", display: "inline-flex", gap: "0.3rem" }}>
                  <Plus size={16} /> Add Listing
                </button>
              )}
            </div>

            {/* Listing Form */}
            {showPropertyForm && (
              <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
                  {editingPropertyId ? "Edit Property Listing" : "Create New Property Listing"}
                </h3>

                {saveError && (
                  <div style={{ backgroundColor: "#fef2f2", color: "#b91c1c", padding: "0.75rem", borderRadius: "6px", fontSize: "0.85rem", border: "1px solid #fee2e2", display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.25rem" }}>
                    <AlertCircle size={16} />
                    <span>{saveError}</span>
                  </div>
                )}

                {saveSuccess && (
                  <div style={{ backgroundColor: "#f0fdf4", color: "#15803d", padding: "0.75rem", borderRadius: "6px", fontSize: "0.85rem", border: "1px solid #bbf7d0", display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.25rem" }}>
                    <CheckSquare size={16} />
                    <span>{saveSuccess}</span>
                  </div>
                )}

                <form onSubmit={handlePropertySubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Property Title</label>
                      <input
                        type="text"
                        required
                        value={propertyData.title}
                        onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                        className="form-control"
                        placeholder="e.g. 3 Bedroom Apartment, Galu"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Numeric Price (KES)</label>
                      <input
                        type="number"
                        required
                        value={propertyData.price}
                        onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                        className="form-control"
                        placeholder="e.g. 15000000"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Display Price Tag</label>
                      <input
                        type="text"
                        required
                        value={propertyData.priceLabel}
                        onChange={(e) => setPropertyData({ ...propertyData, priceLabel: e.target.value })}
                        className="form-control"
                        placeholder="e.g. KES 15,000,000"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        required
                        value={propertyData.location}
                        onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
                        className="form-control"
                        placeholder="e.g. Galu Beach, Diani"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Listing Type</label>
                      <select
                        value={propertyData.type}
                        onChange={(e) => setPropertyData({ ...propertyData, type: e.target.value })}
                        className="form-control"
                      >
                        <option value="Sale">Sale / Purchase</option>
                        <option value="Rent">Rent</option>
                        <option value="Holiday">Holiday Stay</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        value={propertyData.propertyType}
                        onChange={(e) => setPropertyData({ ...propertyData, propertyType: e.target.value })}
                        className="form-control"
                      >
                        <option value="Villa">Villa</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Cottage">Cottage</option>
                        <option value="Land">Land / Plot</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bedrooms</label>
                      <input
                        type="number"
                        value={propertyData.beds}
                        onChange={(e) => setPropertyData({ ...propertyData, beds: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bathrooms</label>
                      <input
                        type="number"
                        value={propertyData.baths}
                        onChange={(e) => setPropertyData({ ...propertyData, baths: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Size (Sq Ft)</label>
                      <input
                        type="number"
                        value={propertyData.sqft}
                        onChange={(e) => setPropertyData({ ...propertyData, sqft: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Property Pictures</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          if (files.length === 0) return;
                          setPendingFiles(prev => [...prev, ...files]);
                          const newPreviews = files.map(f => URL.createObjectURL(f));
                          setPreviewUrls(prev => [...prev, ...newPreviews]);
                        }}
                        className="form-control"
                        style={{ padding: "0.5rem" }}
                      />

                      {/* Already-saved images (from Firestore, shown when editing) */}
                      {Array.isArray(propertyData.images) && propertyData.images.filter(u => u && u.startsWith("http")).length > 0 && (
                        <div style={{ marginTop: "0.75rem" }}>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Saved Images</span>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
                            {propertyData.images.filter(u => u && u.startsWith("http")).map((img, idx) => (
                              <div key={`saved-${idx}`} style={{ position: "relative" }}>
                                <img src={img} alt={`Saved ${idx + 1}`} style={{ width: "65px", height: "45px", objectFit: "cover", borderRadius: "4px", border: "2px solid #e2e8f0" }} />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPropertyData(prev => ({
                                      ...prev,
                                      images: prev.images.filter((_, i) => i !== prev.images.indexOf(img))
                                    }));
                                  }}
                                  style={{
                                    position: "absolute", top: "-5px", right: "-5px",
                                    backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "50%",
                                    width: "16px", height: "16px", fontSize: "10px", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                  }}
                                >×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* New pending images (not yet uploaded) */}
                      {previewUrls.length > 0 && (
                        <div style={{ marginTop: "0.75rem" }}>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>New (will upload on save)</span>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
                            {previewUrls.map((url, idx) => (
                              <div key={`new-${idx}`} style={{ position: "relative" }}>
                                <img src={url} alt={`New ${idx + 1}`} style={{ width: "65px", height: "45px", objectFit: "cover", borderRadius: "4px", border: "2px dashed #F0A500" }} />
                                <button
                                  type="button"
                                  onClick={() => {
                                    URL.revokeObjectURL(url);
                                    setPendingFiles(prev => prev.filter((_, i) => i !== idx));
                                    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
                                  }}
                                  style={{
                                    position: "absolute", top: "-5px", right: "-5px",
                                    backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "50%",
                                    width: "16px", height: "16px", fontSize: "10px", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                  }}
                                >×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block", marginTop: "0.25rem" }}>
                        Select one or more pictures to upload. The first picture will be the main thumbnail.
                      </span>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">Description Details</label>
                    <textarea
                      rows="4"
                      required
                      value={propertyData.description}
                      onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                      className="form-control"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Amenities (Comma separated)</label>
                    <input
                      type="text"
                      value={propertyData.amenities}
                      onChange={(e) => setPropertyData({ ...propertyData, amenities: e.target.value })}
                      className="form-control"
                      placeholder="Pool, Beach Access, Security, WiFi"
                    />
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Status</label>
                      <select
                        value={propertyData.status}
                        onChange={(e) => setPropertyData({ ...propertyData, status: e.target.value })}
                        className="form-control"
                        style={{ minWidth: "160px" }}
                      >
                        <option value="Available">Available</option>
                        <option value="Under Offer">Under Offer</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Listed Date</label>
                      <input
                        type="date"
                        value={propertyData.listedDate || ""}
                        onChange={(e) => setPropertyData({ ...propertyData, listedDate: e.target.value })}
                        className="form-control"
                        style={{ minWidth: "160px" }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, display: "flex", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: "600" }}>
                        <input
                          type="checkbox"
                          checked={propertyData.featured}
                          onChange={(e) => setPropertyData({ ...propertyData, featured: e.target.checked })}
                          style={{ width: "16px", height: "16px", accentColor: "#F0A500" }}
                        />
                        Featured Listing
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: "600" }}>
                        <input
                          type="checkbox"
                          checked={propertyData.recommended || false}
                          onChange={(e) => setPropertyData({ ...propertyData, recommended: e.target.checked })}
                          style={{ width: "16px", height: "16px", accentColor: "#F0A500" }}
                        />
                        Recommended Listing
                      </label>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary"
                      style={{ padding: "0.6rem 1.5rem", opacity: isSaving ? 0.7 : 1, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      {isSaving ? (
                        <>
                          <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }}></span>
                          {editingPropertyId ? "Updating..." : "Saving..."}
                        </>
                      ) : (
                        editingPropertyId ? "Update Listing" : "Create Listing"
                      )}
                    </button>
                    <button type="button" onClick={resetPropertyForm} disabled={isSaving} className="btn btn-secondary" style={{ padding: "0.6rem 1.5rem", border: "1px solid #cbd5e1" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Listings Table */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Image</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Title</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Type</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Price</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Location</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem" }}>
                        <img src={p.image} alt={p.title} style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                      </td>
                      <td style={{ padding: "1rem", fontWeight: "600", fontSize: "0.9rem" }}>{p.title}</td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: p.type === "Sale" ? "#f1f5f9" : "#e6f4ea", color: p.type === "Sale" ? "#475569" : "#137333" }}>
                          {p.type}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", fontWeight: "700", color: "#F0A500" }}>{p.priceLabel}</td>
                      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#64748b" }}>{p.location}</td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            title="Edit this listing"
                            onClick={() => startEditProperty(p)}
                            className="btn"
                            style={{ padding: "0.35rem 0.65rem", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#475569", background: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: "600" }}
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          <button
                            title="Delete this listing permanently"
                            onClick={async () => {
                              if (window.confirm(`Are you sure you want to delete "${p.title}"?\n\nThis action cannot be undone.`)) {
                                try {
                                  await deleteProperty(p.id);
                                  alert(`"${p.title}" has been deleted.`);
                                } catch (err) {
                                  console.error("Delete failed:", err);
                                  alert(`Failed to delete: ${err.message}`);
                                }
                              }
                            }}
                            className="btn"
                            style={{ padding: "0.35rem 0.65rem", border: "1px solid #fecaca", borderRadius: "6px", color: "#ef4444", background: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: "600" }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.35rem", color: "#1e293b" }}>Blog Publications</h2>
              {!showBlogForm && (
                <button onClick={() => setShowBlogForm(true)} className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.85rem", display: "inline-flex", gap: "0.3rem" }}>
                  <Plus size={16} /> Write Post
                </button>
              )}
            </div>

            {/* Blog Form */}
            {showBlogForm && (
              <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
                  {editingBlogId ? "Edit Blog Publication" : "Write New Blog Publication"}
                </h3>
                <form onSubmit={handleBlogSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogData.title}
                        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        value={blogData.category}
                        onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                        className="form-control"
                      >
                        <option value="Investment">Investment Insights</option>
                        <option value="Guides">Legal & Buyer Guides</option>
                        <option value="Lifestyle">Coastal Lifestyle</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Excerpt / Brief Summary</label>
                    <input
                      type="text"
                      required
                      value={blogData.excerpt}
                      onChange={(e) => setBlogData({ ...blogData, excerpt: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Article Content</label>
                    <textarea
                      rows="8"
                      required
                      value={blogData.content}
                      onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                      className="form-control"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: "0.6rem 1.5rem" }}>
                      Publish Article
                    </button>
                    <button type="button" onClick={resetBlogForm} className="btn btn-secondary" style={{ padding: "0.6rem 1.5rem", border: "1px solid #cbd5e1" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Blog Post List */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Title</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Category</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Publication Date</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Excerpt</th>
                    <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((b) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem", fontWeight: "600", fontSize: "0.9rem" }}>{b.title}</td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: "rgba(240, 165, 0,0.15)", color: "#F0A500" }}>
                          {b.category}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#64748b" }}>{b.date}</td>
                      <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {b.excerpt}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button onClick={() => startEditBlog(b)} className="btn" style={{ padding: "0.4rem", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#475569", background: "none" }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => { if(window.confirm(`Delete article "${b.title}"? This cannot be undone.`)) deleteBlogPost(b.id); }} className="btn" style={{ padding: "0.4rem", border: "1px solid #fecaca", borderRadius: "4px", color: "#ef4444", background: "none" }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
