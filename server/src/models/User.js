const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\+91)?[6-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid Indian phone number!`,
    },
  },
  language: {
    type: String,
    enum: ["Hindi", "English", "Marathi", "Tamil"],
    default: "Hindi",
  },
  role: {
    type: String,
    enum: ["buyer", "supplier"],
    default: "buyer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
