const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
require("dotenv").config();
const Plot = require("./models/Plot");

const initialPlots = [
  { plotId: 1, name: "P-01", area: 1200, facing: "East", width: 30, length: 40, rate: 3500, status: "available" },
  { plotId: 2, name: "P-02", area: 1500, facing: "East", width: 30, length: 50, rate: 3600, status: "booked" },
  { plotId: 3, name: "P-03", area: 1800, facing: "West", width: 36, length: 50, rate: 3500, status: "available" },
  { plotId: 4, name: "P-04", area: 1200, facing: "North", width: 30, length: 40, rate: 3700, status: "reserved" },
  { plotId: 5, name: "P-05", area: 2400, facing: "South", width: 40, length: 60, rate: 3800, status: "booked" },
  { plotId: 6, name: "P-06", area: 1500, facing: "East", width: 30, length: 50, rate: 3600, status: "available" },
  { plotId: 7, name: "P-07", area: 1200, facing: "North", width: 30, length: 40, rate: 3500, status: "available" },
  { plotId: 8, name: "P-08", area: 1800, facing: "South", width: 36, length: 50, rate: 3700, status: "booked" },
  { plotId: 9, name: "P-09", area: 2400, facing: "East", width: 40, length: 60, rate: 3900, status: "available" },
  { plotId: 10, name: "P-10", area: 1500, facing: "West", width: 30, length: 50, rate: 3600, status: "available" },
  { plotId: 11, name: "P-11", area: 1200, facing: "North", width: 30, length: 40, rate: 3500, status: "reserved" },
  { plotId: 12, name: "P-12", area: 3000, facing: "East", width: 50, length: 60, rate: 4000, status: "available" }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://kabileshwergs84_db_user:Brownie28*@cluster4.429y8mj.mongodb.net/terragrande?retryWrites=true&w=majority";
    
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");

    // Clear existing plots
    console.log("Clearing existing plots...");
    await Plot.deleteMany();
    console.log("Plots cleared.");

    // Insert new plots
    console.log("Inserting seed plots data...");
    await Plot.insertMany(initialPlots);
    console.log("Database seeded successfully!");

    mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
