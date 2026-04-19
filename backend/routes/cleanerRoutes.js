const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Cleaner = require("../models/Cleaner");
const Scan = require("../models/Scan");
const auth = require("../middleware/auth");

const {
  addCleaner,
  getCleaners,
  toggleCleaner,
  getScans
} = require("../controllers/cleanerController");

// 🧑‍💼 ADMIN ROUTES
router.post("/add", auth, addCleaner);
router.get("/all", auth, getCleaners);
router.put("/toggle/:id", auth, toggleCleaner);
router.get("/scans", auth, getScans);

// 🔐 VERIFY ROUTE (MUST BE LAST)
router.get("/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const cleaner = await Cleaner.findOne({
      cleanerId: decoded.cleanerId
    });

    if (!cleaner) {
      return res.json({ verified: false });
    }

    // 📊 LOG SCAN
    await Scan.create({
      cleanerId: cleaner.cleanerId,
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.json({
      verified: cleaner.isActive,
      name: cleaner.name,
      phone: cleaner.phone,
      photo: cleaner.photo
    });

  } catch (err) {
    return res.json({ verified: false });
  }
});

module.exports = router;