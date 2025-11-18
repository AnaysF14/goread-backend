const db = require("../db");

const createUser = async (name, email, password) => {
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, password]
  );
  return result.rows[0].id;
};

const findUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
