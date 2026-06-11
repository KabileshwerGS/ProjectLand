import React from "react";

export default function PlotMap({ plots, selectedPlot, setSelectedPlot, onEnquire }) {
  // Indian numbering system currency format utility
  const formatIndianCurrency = (number) => {
    const rounded = Math.round(number);
    const numStr = rounded.toString();
    if (numStr.length <= 3) return "₹ " + numStr;
    
    const lastThree = numStr.substring(numStr.length - 3);
    const otherBits = numStr.substring(0, numStr.length - 3);
    const formattedOther = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return "₹ " + formattedOther + "," + lastThree;
  };

  const handlePlotClick = (plotId) => {
    const matchedPlot = plots.find((p) => p.plotId === plotId);
    if (matchedPlot) {
      setSelectedPlot(matchedPlot);
    }
  };

  // Helper to determine status class for SVG polygon fill styling
  const getPlotStatus = (plotId) => {
    const matched = plots.find((p) => p.plotId === plotId);
    return matched ? matched.status : "available";
  };

  return (
    <section className="section" id="layout-map">
      <div className="container">
        <div className="section-header">
          <h2>Interactive Layout Map</h2>
          <p>Click on any plot on the master plan layout below to see details, pricing, and availability status in real-time.</p>
        </div>

        <div className="map-grid">
          {/* Map Canvas Box */}
          <div className="map-wrapper">
            <div className="map-legend">
              <div className="legend-item">
                <div className="legend-color available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-color booked"></div>
                <span>Booked</span>
              </div>
              <div className="legend-item">
                <div className="legend-color reserved"></div>
                <span>Reserved</span>
              </div>
            </div>
            
            {/* Custom SVG Community Layout Map */}
            <svg viewBox="0 0 720 320" className="svg-map" id="layout-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Map Background Area */}
              <rect width="720" height="320" rx="12" fill="var(--bg-tertiary)" opacity="0.3" />
              
              {/* Community Central Road */}
              <rect x="10" y="130" width="560" height="50" rx="4" fill="#334155" />
              <line x1="15" y1="155" x2="565" y2="155" stroke="#f8fafc" strokeDasharray="10 8" strokeWidth="2" opacity="0.8" />
              <text x="290" y="160" fill="#cbd5e1" fontSize="10" fontFamily="Montserrat" fontWeight="600" opacity="0.5" letterSpacing="3">12 METER WIDE ROAD</text>
              
              {/* Top Plots (1 to 6) */}
              <g className="map-plots-group">
                {[1, 2, 3, 4, 5, 6].map((id, index) => {
                  const x = 20 + index * 90;
                  const status = getPlotStatus(id);
                  const isSelected = selectedPlot && selectedPlot.plotId === id;
                  return (
                    <g key={id} onClick={() => handlePlotClick(id)} style={{ cursor: "pointer" }}>
                      <rect 
                        className={`map-plot ${status} ${isSelected ? "selected" : ""}`} 
                        x={x} y="20" width="80" height="100" rx="4" 
                      />
                      <text x={x + 40} y="70" className="plot-label">P-0{id}</text>
                    </g>
                  );
                })}
              </g>

              {/* Bottom Plots (7 to 12) */}
              <g className="map-plots-group">
                {[7, 8, 9, 10, 11, 12].map((id, index) => {
                  const x = 20 + index * 90;
                  const status = getPlotStatus(id);
                  const isSelected = selectedPlot && selectedPlot.plotId === id;
                  return (
                    <g key={id} onClick={() => handlePlotClick(id)} style={{ cursor: "pointer" }}>
                      <rect 
                        className={`map-plot ${status} ${isSelected ? "selected" : ""}`} 
                        x={x} y="190" width="80" height="100" rx="4" 
                      />
                      <text x={x + 40} y="240" className="plot-label">P-{id < 10 ? "0" + id : id}</text>
                    </g>
                  );
                })}
              </g>
              
              {/* Clubhouse and Garden Area */}
              <g className="amenity-area">
                <path d="M 590 20 L 700 20 L 700 290 L 590 290 Z" fill="#1e3a8a" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="645" cy="80" r="18" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeDasharray="2 2" />
                <text x="645" y="83" fill="#ffffff" fontSize="8" fontFamily="Inter" fontWeight="700" textAnchor="middle">PARK</text>
                
                <rect x="605" y="150" width="80" height="90" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="645" y="195" fill="#f8fafc" fontSize="10" fontFamily="Montserrat" fontWeight="700" textAnchor="middle">CLUB</text>
                <text x="645" y="210" fill="#60a5fa" fontSize="9" fontFamily="Inter" fontWeight="600" textAnchor="middle">HOUSE</text>
              </g>
            </svg>
          </div>

          {/* Detail Side Card */}
          <div className="map-details-card" id="map-details-card">
            {!selectedPlot ? (
              <div className="details-placeholder">
                <i className="fa-solid fa-hand-pointer"></i>
                <h3>Select a Plot</h3>
                <p>Click on any plot in the interactive layout map to view size parameters, facing direction, dynamic price, and booking eligibility.</p>
              </div>
            ) : (
              <div className="details-content" style={{ display: "block" }}>
                <div className="details-header">
                  <div className="details-title">
                    <h3>Plot No. {selectedPlot.name}</h3>
                    <span>Phase 1 Premium</span>
                  </div>
                  <div className={`plot-status-badge ${selectedPlot.status}`}>
                    {selectedPlot.status}
                  </div>
                </div>
                
                <div className="details-grid">
                  <div className="details-item">
                    <div className="details-item-label">Plot Area</div>
                    <div className="details-item-val">{selectedPlot.area.toLocaleString()} sq.ft.</div>
                  </div>
                  <div className="details-item">
                    <div className="details-item-label">Facing</div>
                    <div className="details-item-val">{selectedPlot.facing} Facing</div>
                  </div>
                  <div className="details-item">
                    <div className="details-item-label">Dimensions</div>
                    <div className="details-item-val">{selectedPlot.width} x {selectedPlot.length} ft</div>
                  </div>
                  <div className="details-item">
                    <div className="details-item-label">Rate / Sq.Ft.</div>
                    <div className="details-item-val">{formatIndianCurrency(selectedPlot.rate)}</div>
                  </div>
                  <div className="details-item details-price">
                    <div className="details-item-label">Est. Total Price</div>
                    <div className="details-item-val">{formatIndianCurrency(selectedPlot.area * selectedPlot.rate)}</div>
                  </div>
                </div>
                
                <div className="details-actions">
                  <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => onEnquire(selectedPlot.name)}>
                    <i className="fa-solid fa-envelope"></i> Request Call Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
