import React, { useState } from "react";

export default function PlotDirectory({ plots, onEnquire, filters, setFilters }) {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const formatIndianCurrency = (number) => {
    const rounded = Math.round(number);
    const numStr = rounded.toString();
    if (numStr.length <= 3) return "₹ " + numStr;
    
    const lastThree = numStr.substring(numStr.length - 3);
    const otherBits = numStr.substring(0, numStr.length - 3);
    const formattedOther = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return "₹ " + formattedOther + "," + lastThree;
  };

  // 1. Apply Filtering
  let filteredPlots = plots.filter((plot) => {
    // Tab filtering (status override)
    if (activeTab !== "all" && plot.status !== activeTab) {
      return false;
    }
    
    // Quick search status filter
    if (filters.status !== "all" && plot.status !== filters.status) {
      return false;
    }

    // Quick search facing filter
    if (filters.facing !== "all" && plot.facing.toLowerCase() !== filters.facing.toLowerCase()) {
      return false;
    }

    // Quick search size filter
    if (plot.area < filters.minSize) {
      return false;
    }

    return true;
  });

  // 2. Apply Sorting
  if (sortBy === "price-low") {
    filteredPlots.sort((a, b) => (a.area * a.rate) - (b.area * b.rate));
  } else if (sortBy === "price-high") {
    filteredPlots.sort((a, b) => (b.area * b.rate) - (a.area * a.rate));
  } else if (sortBy === "size-high") {
    filteredPlots.sort((a, b) => b.area - a.area);
  }

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Clear status filter from quick search to avoid conflict
    setFilters(prev => ({ ...prev, status: "all" }));
  };

  return (
    <section className="section" id="plot-directory" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <h2>Available Plots Directory</h2>
          <p>Explore our wide selection of layout options. Filter by status or sort to find your perfect land match.</p>
        </div>

        <div className="plot-filter-bar">
          <div className="plot-tabs">
            {["all", "available", "reserved", "booked"].map((tab) => (
              <button 
                key={tab}
                className={`plot-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab === "all" ? "All Plots" : tab === "booked" ? "Sold Out" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="plot-sort">
            <select 
              id="sort-selector"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="size-high">Size: Large to Small</option>
            </select>
          </div>
        </div>

        <div className="plots-grid">
          {filteredPlots.length === 0 ? (
            <div style={{ gridColumn: "span 3", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: "2.5rem", marginBottom: "16px" }}></i>
              <p>No plots match the selected search criteria.</p>
            </div>
          ) : (
            filteredPlots.map((plot) => {
              const thumbnailSeed = (plot.id % 3) + 1;
              let mediaSrc = "/assets/gated_entrance.png";
              if (thumbnailSeed === 2) mediaSrc = "/assets/clubhouse_park.png";
              if (thumbnailSeed === 3) mediaSrc = "/assets/hero_land.png";

              return (
                <div className="plot-card" key={plot.id}>
                  <div className="plot-card-media">
                    <img src={mediaSrc} alt={`TerraGrande ${plot.name} Landscape Site View`} />
                    <div className={`plot-card-badge ${plot.status}`}>{plot.status}</div>
                  </div>
                  <div className="plot-card-body">
                    <div className="plot-card-title">
                      <h4>Plot {plot.name}</h4>
                      <span>Premium Area</span>
                    </div>
                    <div className="plot-card-specs">
                      <div className="spec-item">
                        <span className="spec-label">Area</span>
                        <span className="spec-val">{plot.area} sqft</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Facing</span>
                        <span className="spec-val">{plot.facing}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Size</span>
                        <span className="spec-val">{plot.width} x {plot.length} ft</span>
                      </div>
                    </div>
                    <div className="plot-card-footer">
                      <div className="plot-card-price">
                        <span>Total Value</span>
                        <h5>{formatIndianCurrency(plot.area * plot.rate)}</h5>
                      </div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => onEnquire(plot.name)}
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
