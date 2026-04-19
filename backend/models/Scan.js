const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  cleanerId: String,
  scannedAt: {
    type: Date,
    default: Date.now
  },
  ip: String,
  userAgent: String
});

module.exports = mongoose.model("Scan", scanSchema);