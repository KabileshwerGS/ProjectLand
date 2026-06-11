import React, { useState, useEffect } from "react";

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container nav-wrapper">
        <a href="#" className="logo">
          <i className="fa-solid fa-mountain-sun"></i>
          <span>TERRA</span>GRANDE
        </a>
        
        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
          <li><a href="#layout-map" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Plot Explorer</a></li>
          <li><a href="#calculator" class="nav-link" onClick={() => setMobileMenuOpen(false)}>EMI Calculator</a></li>
          <li><a href="#amenities" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Amenities</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            id="theme-toggle" 
            className="btn btn-secondary btn-icon" 
            title="Toggle Light/Dark Mode" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
          </button>
          <a href="#contact" className="btn btn-primary">
            <i className="fa-solid fa-calendar-check"></i> Book Site Visit
          </a>
          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
