const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Middleware for Serverless Environment
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kabileshwergs84_db_user:Brownie28*@cluster4.429y8mj.mongodb.net/terragrande?retryWrites=true&w=majority";

const connectDB = async (req, res, next) => {
  if (mongoose.connection.readyState >= 1) {
    return next();
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas successfully via middleware");
    next();
  } catch (err) {
    console.error("Database connection error in middleware:", err);
    res.status(500).json({ error: "Database Connection Error" });
  }
};

app.use(connectDB);

// Routes
app.use("/api/plots", require("./routes/plots"));
app.use("/api/leads", require("./routes/leads"));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("TerraGrande API Server Running");
});

const PORT = process.env.PORT || 5001;

// Only start Express server listener if not running in Vercel Serverless environment
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
