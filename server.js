const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const wishlistRoutes = require("./routes/wishlist");
const reminderRoutes = require("./routes/reminderRoutes");

const app = express();

app.get("/", (req, res) => {
  res.send("GoRead API funcionando");
});

// ✅ CORS habilitado (funciona para web y móvil)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reminders", reminderRoutes);

// ✅ Escucha en 0.0.0.0
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n✅ Servidor GoRead iniciado`);
  console.log(`💻 Local: http://localhost:${PORT}`);
  console.log(`📱 Móvil: http://192.168.0.11:${PORT}\n`);
});