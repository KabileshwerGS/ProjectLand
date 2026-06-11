import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlotMap from "./components/PlotMap";
import PlotDirectory from "./components/PlotDirectory";
import Calculator from "./components/Calculator";
import Amenities from "./components/Amenities";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";
import ToastContainer from "./components/ToastContainer";

const fallbackPlots = [
  { plotId: 1, name: "P-01", area: 1200, facing: "East", width: 30, length: 40, rate: 3500, status: "available" },
  { plotId: 2, name: "P-02", area: 1500, facing: "East", width: 30, length: 50, rate: 3600, status: "booked" },
  { plotId: 3, name: "P-03", area: 1800, facing: "West", width: 36, length: 50, rate: 3500, status: "available" },
  { plotId: 4, name: "P-04", area: 1200, facing: "North", width: 30, length: 40, rate: 3700, status: "reserved" },
  { plotId: 5, name: "P-05", area: 2400, facing: "South", width: 40, length: 60, rate: 3800, status: "booked" },
  { plotId: 6, name: "P-06", area: 1500, facing: "East", width: 30, length: 50, rate: 3600, status: "available" },
  { plotId: 7, name: "P-07", area: 1200, facing: "North", width: 30, length: 40, rate: 3500, status: "available" },
  { plotId: 8, name: "P-08", area: 1800, facing: "South", width: 36, length: 50, rate: 3700, status: "booked" },
  { plotId: 9, name: "P-09", area: 2400, facing: "East", width: 40, length: 60, rate: 3900, status: "available" },
  { plotId: 10, name: "P-10", area: 1500, facing: "West", width: 30, length: 50, rate: 3600, status: "available" },
  { plotId: 11, name: "P-11", area: 1200, facing: "North", width: 30, length: 40, rate: 3500, status: "reserved" },
  { plotId: 12, name: "P-12", area: 3000, facing: "East", width: 50, length: 60, rate: 4000, status: "available" }
];

export default function App() {
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [filters, setFilters] = useState({
    status: "all",
    facing: "all",
    minSize: 0
  });
  
  // Lead Inquiry Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryPlotName, setInquiryPlotName] = useState("");
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Fetch Plots from MongoDB Backend
  const fetchPlots = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "https://land-project-backend.vercel.app";
      const response = await fetch(`${apiBaseUrl}/api/plots`);
      if (response.ok) {
        const data = await response.json();
        setPlots(data);
      } else {
        console.warn("Failed to load plots API. Loading local fallback.");
        setPlots(fallbackPlots);
      }
    } catch (error) {
      console.error("Error fetching plots:", error);
      setPlots(fallbackPlots);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  // Theme Sync setup
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.body.classList.add("light-theme");
      showToast("Theme switched to Light Mode", "info");
    } else {
      document.body.classList.remove("light-theme");
      showToast("Theme switched to Dark Mode", "info");
    }
  };

  // Toast handler
  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Search filter callback
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  // Launch inquiry modal
  const handleOpenInquiry = (plotName) => {
    setInquiryPlotName(plotName);
    setIsModalOpen(true);
  };

  return (
    <div id="home">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <Hero onSearch={handleSearch} />

      {/* --- Why Choose Us (Trust Card) --- */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose TerraGrande?</h2>
            <p>Over two decades of building trust, securing investments, and delivering premium lifestyles.</p>
          </div>
          
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <div className="trust-number">22+ Years</div>
              <div className="trust-title">of Unparalleled Trust</div>
            </div>
            <div className="trust-card">
              <div className="trust-icon"><i className="fa-solid fa-users"></i></div>
              <div className="trust-number">1,500+</div>
              <div className="trust-title">Happy Land Owners</div>
            </div>
            <div className="trust-card">
              <div className="trust-icon"><i className="fa-solid fa-file-signature"></i></div>
              <div className="trust-number">100%</div>
              <div className="trust-title">Clear Title & RERA Registered</div>
            </div>
            <div className="trust-card">
              <div className="trust-icon"><i className="fa-solid fa-chart-line"></i></div>
              <div className="trust-number">3.5x</div>
              <div className="trust-title">Estimated Value Growth (5 Yrs)</div>
            </div>
          </div>
        </div>
      </section>

      <PlotMap 
        plots={plots} 
        selectedPlot={selectedPlot} 
        setSelectedPlot={setSelectedPlot} 
        onEnquire={handleOpenInquiry}
      />

      <PlotDirectory 
        plots={plots} 
        onEnquire={handleOpenInquiry} 
        filters={filters} 
        setFilters={setFilters}
      />

      <Calculator selectedPlot={selectedPlot} />

      <Amenities />

      <ContactForm onSubmitSuccess={showToast} />

      <Footer />

      <InquiryModal 
        plotName={inquiryPlotName} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmitSuccess={showToast}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
