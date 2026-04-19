const mongoose = require("mongoose");


const cleanerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cleanerId: { type: String, unique: true },
  phone: String,
  photo: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Cleaner", cleanerSchema);