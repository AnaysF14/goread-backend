const express = require("express");
const router = express.Router();
const  verifyToken  = require("../middlewares/authMiddleware");
const { getReminders } = require("../controllers/reminderController");

// Recordatorios automáticos basados en metas
router.get("/", verifyToken, getReminders);

module.exports = router; // 
