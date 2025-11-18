const { Pool } = require("pg");
require("dotenv").config();

let db;

if (process.env.DATABASE_URL) {
  // 🌐 Modo producción (Render)
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // necesario para Render
    },
  });
} else {
  // 💻 Modo desarrollo local
  db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
}

module.exports = db;
