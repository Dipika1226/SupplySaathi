const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true },
  pricePerUnit: { type: Number, required: true, min: 0 },
  quantityAvailable: { type: Number, required: true, min: 0 },
  unit: {
    type: String,
    enum: ["kg", "litre", "piece", "packet", "dozen", "other"],
    default: "kg",
    required: true,
  },
});

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    contact: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },
    category: {
      type: String,
      required: true,
      enum: ["vegetables", "groceries", "grains", "fruits", "dairy", "bakery", "spices", "other"],
      default: "other",
    },
    deliverySlots: {
      type: [String],
      validate: arr => Array.isArray(arr) && arr.length > 0,
    },
    inventory: {
      type: [inventoryItemSchema],
      validate: items => items.length > 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
