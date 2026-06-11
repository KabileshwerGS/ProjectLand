const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  plotId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: Number,
    required: true
  },
  facing: {
    type: String,
    required: true,
    trim: true
  },
  width: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "booked", "reserved"],
    default: "available"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Plot", plotSchema);
