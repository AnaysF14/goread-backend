const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require("../controllers/wishlistController");

// Obtener lista de deseos del usuario
router.get("/", verifyToken, getWishlist);

// Agregar libro
router.post("/", verifyToken, addToWishlist);

// Eliminar libro
router.delete("/:id", verifyToken, removeFromWishlist);

module.exports = router;
