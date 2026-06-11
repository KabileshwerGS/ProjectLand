import React, { useState, useEffect } from "react";

export default function ContactForm({ onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [message, setMessage] = useState("");

  // Set default date input to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split("T")[0];
    setVisitDate(dateString);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leadData = {
      name,
      phone,
      email,
      type: "visit",
      visitDate,
      message
    };

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await fetch(`${apiBaseUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        onSubmitSuccess(`Thank you, ${name}! Your Site Visit is booked for ${visitDate}.`);
        // Reset form
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        onSubmitSuccess("Failed to submit inquiry. Please try again.", "warning");
      }
    } catch (err) {
      console.error(err);
      onSubmitSuccess("Error connecting to server. Please try again.", "warning");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info column */}
          <div className="contact-info">
            <div className="contact-info-header">
              <h3>Schedule a Free Site Visit</h3>
              <p>See our layout firsthand. We offer free luxury vehicle pick-up and drop service from major transit hubs. Fill the form to reserve a slot.</p>
            </div>
            
            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-item-icon"><i className="fa-solid fa-map-pin"></i></div>
                <div className="contact-item-content">
                  <h5>Layout Location</h5>
                  <p>TerraGrande Enclave, Avinashi Road, Near IT Park, Coimbatore, TN 641014</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><i className="fa-solid fa-phone-volume"></i></div>
                <div className="contact-item-content">
                  <h5>Sales Inquiry Hotline</h5>
                  <p>+91 98765 43210 / +91 98765 01234</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><i className="fa-solid fa-envelope-open"></i></div>
                <div className="contact-item-content">
                  <h5>Email Correspondence</h5>
                  <p>sales@terragrande.co.in / info@terragrande.co.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lead-name">Full Name</label>
                  <input 
                    type="text" 
                    id="lead-name" 
                    placeholder="John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lead-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="lead-phone" 
                    placeholder="+91 9876543210" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lead-email">Email Address</label>
                  <input 
                    type="email" 
                    id="lead-email" 
                    placeholder="john@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lead-date">Preferred Date</label>
                  <input 
                    type="date" 
                    id="lead-date" 
                    required 
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lead-message">Additional Notes / Preferred Time</label>
                <textarea 
                  id="lead-message" 
                  rows="4" 
                  placeholder="I would like to schedule a visit in the morning around 10:00 AM..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ height: "52px", fontSize: "1rem" }}>
                <i className="fa-solid fa-paper-plane"></i> Book Free Site Visit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
