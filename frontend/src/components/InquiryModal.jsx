import React, { useState } from "react";

export default function InquiryModal({ plotName, isOpen, onClose, onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leadData = {
      name,
      phone,
      email,
      type: "inquiry",
      plotName
    };

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "https://project-land-mu.vercel.app";
      const response = await fetch(`${apiBaseUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        onSubmitSuccess(`Inquiry for Plot ${plotName} submitted! Sales brochure sent to your email.`);
        // Reset form & close
        setName("");
        setPhone("");
        setEmail("");
        onClose();
      } else {
        onSubmitSuccess("Failed to submit inquiry. Please try again.", "warning");
      }
    } catch (err) {
      console.error(err);
      onSubmitSuccess("Error connecting to server. Please try again.", "warning");
    }
  };

  return (
    <div className={`modal-overlay active`} onClick={(e) => e.target.classList.contains("modal-overlay") && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-header">
          <h3>Enquire about <span>Plot {plotName}</span></h3>
          <p>Enter your contact details. Our dedicated layout sales officer will call you back within 15 minutes with complete layout maps and pricing brochures.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modal-name">Full Name</label>
            <input 
              type="text" 
              id="modal-name" 
              placeholder="John Doe" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-phone">Phone Number</label>
            <input 
              type="tel" 
              id="modal-phone" 
              placeholder="+91 9876543210" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-email">Email Address</label>
            <input 
              type="email" 
              id="modal-email" 
              placeholder="john@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: "52px", width: "100%" }}>
            <i className="fa-solid fa-envelope-open-text"></i> Send Details & Pricing Brochure
          </button>
        </form>
      </div>
    </div>
  );
}
