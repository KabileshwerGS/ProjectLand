import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-wrapper">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#" className="logo">
                <i className="fa-solid fa-mountain-sun"></i>
                <span>TERRA</span>GRANDE
              </a>
              <p>We are developers of premium layouts, plots, and luxury estates. Building sustainable residential layouts with clean paperwork, top infrastructure, and high growth potential.</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="social-link" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="social-link" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Layout Projects</h4>
              <ul>
                <li><a href="#">Avinashi Road Plots</a></li>
                <li><a href="#">Saravanampatti Enclave</a></li>
                <li><a href="#">Singanallur Premium</a></li>
                <li><a href="#">Trichy Road Layouts</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#about">About Company</a></li>
                <li><a href="#layout-map">Interactive Map</a></li>
                <li><a href="#calculator">Loan Calculator</a></li>
                <li><a href="#contact">Site Visit Booking</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal Information</h4>
              <ul>
                <li><a href="#">RERA Registrations</a></li>
                <li><a href="#">Clear Title Certifications</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 TerraGrande Properties. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Corporate Disclaimer</a>
              <a href="#">RERA No: TN/2026/0048291</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating Actions Bar (Phone & Whatsapp) --- */}
      <div className="floating-actions">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="float-btn float-whatsapp" data-tooltip="WhatsApp Sales" aria-label="WhatsApp Chat">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="tel:+919876543210" className="float-btn float-call" data-tooltip="Call Hotline" aria-label="Phone Call">
          <i className="fa-solid fa-phone"></i>
        </a>
      </div>
    </>
  );
}
