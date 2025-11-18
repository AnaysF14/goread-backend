const pool = require("../db");

// Obtener la lista del usuario
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM wishlist WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de deseos" });
  }
};

// Agregar un libro
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, author, notes } = req.body;
    const result = await pool.query(
      "INSERT INTO wishlist (user_id, title, author, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, author, notes]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el libro" });
  }
};

// Eliminar libro
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    await pool.query("DELETE FROM wishlist WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
    res.json({ message: "Libro eliminado de la lista" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
