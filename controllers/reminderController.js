const pool = require("../db");

// Obtener recordatorios automáticos basados en metas
exports.getReminders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Traemos metas activas del usuario
    const goals = await pool.query(
      "SELECT id, title, due_date, completed FROM goals WHERE user_id = $1 ORDER BY due_date ASC",
      [userId]
    );

    // Creamos recordatorios automáticos en memoria
    const reminders = goals.rows.map((g) => {
      let message = "";
      const today = new Date();
      const due = new Date(g.due_date);
      const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24)); // días restantes

      if (g.completed) {
        message = "🎉 ¡Has completado esta meta!";
      } else if (diff <= 0) {
        message = "⏰ Esta meta ya venció, ¡a ponerse al día!";
      } else if (diff === 1) {
        message = "📅 Mañana vence esta meta";
      } else {
        message = `📚 Te quedan ${diff} días para completarla.`;
      }

      return {
        id: g.id,
        title: g.title,
        message,
        remind_at: g.due_date,
        completed: g.completed,
      };
    });

    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al generar recordatorios" });
  }
};
