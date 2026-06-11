import React from "react";

export default function Amenities() {
  const amenityList = [
    { icon: "fa-shield-halved", title: "Gated Security", desc: "24/7 manned security gatehouse with modern CCTV surveillance for full-circle family safety." },
    { icon: "fa-road", title: "Wide Asphalt Roads", desc: "9-meter and 12-meter layout tar roads complete with paved footpaths and structural gutters." },
    { icon: "fa-plug", title: "Underground Cabling", desc: "No hanging overhead lines. Neat underground electricity, telephone, and internet conduits." },
    { icon: "fa-faucet-drip", title: "24/7 Water Supply", desc: "Fully functional dual-conduit water connections piped to each individual plot boundary." },
    { icon: "fa-tree", title: "Landscaped Parks", desc: "Lush landscape grass parks featuring gazebos, walking paths, and safe play infrastructure." },
    { icon: "fa-bolt", title: "LED Street Lights", desc: "Energy-efficient solar LED street lights covering all layout roads and walking paths." },
    { icon: "fa-house-chimney-window", title: "Luxury Clubhouse", desc: "Exclusive community clubhouse with fitness gym, gaming tables, and a party hall." },
    { icon: "fa-droplet", title: "Rainwater Harvesting", desc: "Eco-friendly master drainage system designed to recharge groundwater tables." }
  ];

  return (
    <section className="section" id="amenities" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <h2>World-Class Amenities</h2>
          <p>Every plot comes fully connected to custom-designed features, ready for immediate construction.</p>
        </div>

        <div className="amenities-grid">
          {amenityList.map((amenity, idx) => (
            <div className="amenity-card" key={idx}>
              <div className="amenity-icon-wrapper">
                <i className={`fa-solid ${amenity.icon}`}></i>
              </div>
              <h4>{amenity.title}</h4>
              <p>{amenity.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
