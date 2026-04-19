const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Cleaner = require("../models/Cleaner");

const {
  addCleaner,
  getCleaners,
  toggleCleaner
} = require("../controllers/cleanerController");

// 🧑‍💼 ADMIN ROUTES (FIRST)
router.post("/add", addCleaner);
router.get("/all", getCleaners);
router.put("/toggle/:id", toggleCleaner);

// 🔐 VERIFY ROUTE (LAST)
router.get("/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const cleaner = await Cleaner.findOne({
      cleanerId: decoded.cleanerId
    });

    if (!cleaner) {
      return res.json({ verified: false });
    }

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