// seedClusters.js
const mongoose = require("mongoose");
require("dotenv").config();

const Cluster = require("../models/Cluster");
const User = require("../models/User"); // Assuming at least 1 user exists

const clusters = [
  {
    name: "Karol Bagh Vendors",
    location: "Karol Bagh Market",
    area: "Karol Bagh",
    city: "Delhi",
    meetingDay: "Tuesday",
    meetingTime: "11:00 AM",
    category: "vegetables",
    status: "joining",
    coordinates: {
      type: "Point",
      coordinates: [77.1892, 28.6512], // [lng, lat]
    },
  },
  {
    name: "Chandni Chowk Group",
    location: "Chandni Chowk",
    area: "Chandni Chowk",
    city: "Delhi",
    meetingDay: "Monday",
    meetingTime: "3:00 PM",
    category: "spices",
    status: "active",
    coordinates: {
      type: "Point",
      coordinates: [77.2303, 28.6562],
    },
  },
  {
    name: "Paharganj Collective",
    location: "Main Bazaar",
    area: "Paharganj",
    city: "Delhi",
    meetingDay: "Friday",
    meetingTime: "10:00 AM",
    category: "general",
    status: "planning",
    coordinates: {
      type: "Point",
      coordinates: [77.2167, 28.6448],
    },
  },
  {
    name: "Lajpat Nagar Vendors",
    location: "Central Market",
    area: "Lajpat Nagar",
    city: "Delhi",
    meetingDay: "Monday",
    meetingTime: "9:00 AM",
    category: "fruits",
    status: "joining",
    coordinates: {
      type: "Point",
      coordinates: [77.2432, 28.5708],
    },
  },
  {
    name: "Sarojini Nagar Group",
    location: "Market Area",
    area: "Sarojini Nagar",
    city: "Delhi",
    meetingDay: "Wednesday",
    meetingTime: "11:00 AM",
    category: "general",
    status: "active",
    coordinates: {
      type: "Point",
      coordinates: [77.1991, 28.5766],
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    const user = await User.findOne();
    if (!user) {
      throw new Error("⚠️ No user found. Please seed a user first.");
    }

    const clustersWithMeta = clusters.map((cluster) => ({
      ...cluster,
      createdBy: user._id,
      joinedUsers: [user._id],
      vendorsGoing: 1,
    }));

    await Cluster.deleteMany();
    await Cluster.insertMany(clustersWithMeta);
    console.log("✅ Cluster seeding completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
