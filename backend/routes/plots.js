const express = require("express");
const router = express.Router();
const Plot = require("../models/Plot");

// @route   GET /api/plots
// @desc    Get all plots
router.get("/", async (req, res) => {
  try {
    const plots = await Plot.find().sort({ plotId: 1 });
    res.json(plots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/plots/:id
// @desc    Update plot status
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ msg: "Status is required" });
  }

  try {
    let plot = await Plot.findOne({ plotId: req.params.id });

    if (!plot) {
      return res.status(404).json({ msg: "Plot not found" });
    }

    plot.status = status;
    await plot.save();

    res.json(plot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
