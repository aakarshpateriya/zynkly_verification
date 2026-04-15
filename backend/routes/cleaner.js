const express = require("express");
const router = express.Router();
const Cleaner = require("../models/Cleaner");

// GET cleaner by ID
router.get("/:id", async (req, res) => {
  try {
    const cleaner = await Cleaner.findOne({ cleanerId: req.params.id });

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
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;