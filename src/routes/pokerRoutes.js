const express = require("express");
const pokerController = require("../controllers/pokerController");
const validateHands = require("../middleware/validateHands");

const router = express.Router();

// Ruta POST para comparar manos de póker
router.post("/", validateHands, pokerController.compareHands);

module.exports = router;
