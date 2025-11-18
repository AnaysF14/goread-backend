const { createGoal, getGoalsByUser, completeGoal, getCompletedGoals, addBookToGoal } = require("../models/goalModel");

// Crear una nueva meta
const nuevaMeta = async (req, res) => {
  const { title, targetAmount, due_date } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !targetAmount || !due_date) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const goal = await createGoal(userId, title, targetAmount, due_date);
    res.status(201).json({ msg: "Meta creada con éxito", goal });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear meta", error: err.message });
  }
};

// Listar metas del usuario
const listarMetas = async (req, res) => {
  const userId = req.user.id;

  try {
    const goals = await getGoalsByUser(userId);
    res.json(goals);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener metas", error: err.message });
  }
};

// Marcar como completada
const completarMeta = async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user.id;

  try {
    const goal = await completeGoal(userId, goalId);
    if (!goal) {
      return res.status(404).json({ msg: "Meta no encontrada o no pertenece al usuario" });
    }
    res.status(200).json({ msg: "Meta completada con éxito", goal });
  } catch (err) {
    res.status(500).json({ msg: "Error al completar meta", error: err.message });
  }
};

// Listar metas completadas
const listarMetasCompletadas = async (req, res) => {
  const userId = req.user.id;

  try {
    const goals = await getCompletedGoals(userId);
    res.json(goals);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener logros", error: err.message });
  }
};

// Función para agregar un libro a una meta
const agregarLibroAMeta = async (req, res) => {
  const { goalId } = req.params; // El ID de la meta
  const { book } = req.body; // El libro que se quiere agregar

  const userId = req.user.id; // ID del usuario

  try {
    // Verificamos si la meta existe y pertenece al usuario
    const goal = await getGoalsByUser(userId);
    if (!goal) {
      return res.status(404).json({ msg: "Meta no encontrada o no pertenece al usuario" });
    }

    // Llamamos a la función que agrega el libro a la meta
    await addBookToGoal(goalId, book);
    res.status(200).json({ msg: "Libro agregado a la meta con éxito", goal });
  } catch (err) {
    res.status(500).json({ msg: "Error al agregar el libro a la meta", error: err.message });
  }
};

module.exports = {
  nuevaMeta,
  listarMetas,
  completarMeta,
  listarMetasCompletadas,
  agregarLibroAMeta, // Exportar la nueva función
};
