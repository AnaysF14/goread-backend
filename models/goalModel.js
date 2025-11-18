const pool = require("../db");

const createGoal = async (userId, title, targetAmount, dueDate) => {
  const result = await pool.query(
    `INSERT INTO goals (user_id, title, target_amount, due_date, completed, created_at)
     VALUES ($1, $2, $3, $4, false, NOW())
     RETURNING *`,
    [userId, title, targetAmount, dueDate]
  );
  return result.rows[0];
};

const getGoalsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const completeGoal = async (userId, goalId) => {
  const result = await pool.query(
    `UPDATE goals SET completed = true, progress = target_amount
     WHERE id = $1 AND user_id = $2 RETURNING *`,
    [goalId, userId]
  );
  return result.rows[0];
};

const getCompletedGoals = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM goals WHERE user_id = $1 AND completed = true ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

module.exports = { createGoal, getGoalsByUser, completeGoal, getCompletedGoals };
