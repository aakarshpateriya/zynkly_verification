const Cleaner = require("../models/Cleaner");
const generateToken = require("../utils/token");
const QRCode = require("qrcode");
const Scan = require("../models/Scan");

// ➕ Add Cleaner
exports.addCleaner = async (req, res) => {
  try {
    const { name, phone, photo } = req.body;

    const cleanerId = "ZYNK" + Math.floor(1000 + Math.random() * 9000);

    const cleaner = await Cleaner.create({
      name,
      phone,
      photo,
      cleanerId
    });

    const token = generateToken(cleanerId);
    const url = `http://localhost:3000/verify/${token}`;

    await QRCode.toFile(`./qrcodes/${cleanerId}.png`, url);

    res.json({
      success: true,
      cleaner,
      qrUrl: url
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get All Cleaners
exports.getCleaners = async (req, res) => {
  try {
    const cleaners = await Cleaner.find().sort({ createdAt: -1 });
    res.json(cleaners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Toggle Cleaner Status
exports.toggleCleaner = async (req, res) => {
  try {
    const cleaner = await Cleaner.findById(req.params.id);

    if (!cleaner) {
      return res.status(404).json({ error: "Cleaner not found" });
    }

    cleaner.isActive = !cleaner.isActive;
    await cleaner.save();

    res.json(cleaner);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📊 Get Scan Logs
exports.getScans = async (req, res) => {
  try {
    const scans = await Scan.find().sort({ scannedAt: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};