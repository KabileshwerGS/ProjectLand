const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.post("/", async (req, res) => {
  const { name, phone, email, type, plotName, visitDate, message } = req.body;

  // 1. Mandatory base fields validation
  if (!name || !phone || !email || !type) {
    return res.status(400).json({ error: "Missing required fields (name, phone, email, type)" });
  }

  // 2. Dynamic conditional validation
  if (type === "inquiry" && !plotName) {
    return res.status(400).json({ error: "Plot name is required for inquiries" });
  }

  if (type === "visit" && !visitDate) {
    return res.status(400).json({ error: "Visit date is required for site visit bookings" });
  }

  try {
    const newLead = new Lead({
      name,
      phone,
      email,
      type,
      plotName: type === "inquiry" ? plotName : undefined,
      visitDate: type === "visit" ? visitDate : undefined,
      message
    });

    const lead = await newLead.save();
    res.json(lead);
  } catch (err) {
    console.error("Error saving lead to DB:", err.message);
    res.status(500).json({ error: "Server error saving lead" });
  }
});

// @route   GET /api/leads
// @desc    Get all lead inquiries (for admin overview)
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
