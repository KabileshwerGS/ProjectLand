import React, { useState } from "react";

export default function Hero({ onSearch }) {
  const [status, setStatus] = useState("all");
  const [facing, setFacing] = useState("all");
  const [minSize, setMinSize] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      status,
      facing,
      minSize: parseInt(minSize)
    });
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg">
          <img src="/assets/hero_land.png" alt="TerraGrande Premium Developed Layout Aerial View" />
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="badge-tag">RERA Approved Gated Community</span>
          <h1>Own a Piece of Tomorrow at <span>TerraGrande</span></h1>
          <p>Luxury villa plots designed for premium living in high-growth corridors. Experience top-tier infrastructure, lush green parks, and 100% clear titles.</p>
          <div className="hero-buttons">
            <a href="#layout-map" className="btn btn-primary">
              <i class="fa-solid fa-map-location-dot"></i> View Plot Layout
            </a>
            <a href="#contact" className="btn btn-secondary" style={{ marginLeft: "16px" }}>
              <i class="fa-solid fa-phone"></i> Enquire Now
            </a>
          </div>
        </div>
      </section>

      {/* --- Search Panel --- */}
      <div className="container hero-search-panel">
        <form className="search-box" onSubmit={handleSubmit}>
          <div className="search-group">
            <label htmlFor="filter-status">Plot Status</label>
            <select 
              id="filter-status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Plots</option>
              <option value="available">Available Only</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="search-group">
            <label htmlFor="filter-facing">Facing Direction</label>
            <select 
              id="filter-facing" 
              value={facing} 
              onChange={(e) => setFacing(e.target.value)}
            >
              <option value="all">Any Facing</option>
              <option value="east">East Facing</option>
              <option value="west">West Facing</option>
              <option value="north">North Facing</option>
              <option value="south">South Facing</option>
            </select>
          </div>
          <div className="search-group">
            <label htmlFor="filter-size">Min Plot Size</label>
            <select 
              id="filter-size" 
              value={minSize} 
              onChange={(e) => setMinSize(e.target.value)}
            >
              <option value="0">Any Size</option>
              <option value="1200">1200+ sq.ft.</option>
              <option value="1800">1800+ sq.ft.</option>
              <option value="2400">2400+ sq.ft.</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: "50px" }}>
            <i className="fa-solid fa-magnifying-glass"></i> Search Plots
          </button>
        </form>
      </div>
    </>
  );
}
