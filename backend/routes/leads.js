const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// @route   POST /api/leads
// @desc    Register a new lead (site visit or inquiry)
router.post("/", async (req, res) => {
  const { name, phone, email, type, plotName, visitDate, message } = req.body;

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
    console.error(err.message);
    res.status(500).send("Server Error");
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
