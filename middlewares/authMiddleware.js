const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Usuario autenticado:", decoded);  // Verifica que el usuario esté siendo decodificado correctamente
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token inválido:", err);
    res.status(400).json({ msg: "Token inválido" });
  }
};

module.exports = authMiddleware;
