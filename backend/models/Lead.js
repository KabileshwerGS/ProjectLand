const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["visit", "inquiry"],
    required: true
  },
  plotName: {
    type: String,
    required: function() { return this.type === "inquiry"; }
  },
  visitDate: {
    type: Date,
    required: function() { return this.type === "visit"; }
  },
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Lead", leadSchema);
