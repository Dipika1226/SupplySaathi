const mongoose = require("mongoose");

const clusterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },

  meetingDay: { type: String, required: true }, // e.g., "Monday"
  meetingTime: { type: String, required: true }, // e.g., "11:00 AM"

  category: {
    type: String,
    enum: ["fruits", "vegetables", "spices", "general"],
    default: "general",
  },

  status: {
    type: String,
    enum: ["active", "joining", "planning"],
    default: "joining",
  },

  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  joinedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  vendorsGoing: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

clusterSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("Cluster", clusterSchema);
