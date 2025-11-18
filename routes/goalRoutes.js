const express = require("express");
const router = express.Router();
const { agregarLibroAMeta, nuevaMeta, listarMetas, completarMeta, listarMetasCompletadas } = require("../controllers/goalController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, nuevaMeta);  // Crear meta
router.get("/", authMiddleware, listarMetas); // Listar metas de un usuario
router.post("/meta/:goalId/libro", agregarLibroAMeta); // Agregar libro a meta
router.get("/completadas", authMiddleware, listarMetasCompletadas); // Metas Logradas
router.put("/:goalId", authMiddleware, completarMeta );  // Completar meta

module.exports = router;
