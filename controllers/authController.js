const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

//Registro Formulario 
const registro = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Correo inválido" });
    }

    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({ msg: "La contraseña debe tener al menos 8 caracteres" });
    }

    const userExist = await findUserByEmail(email);
    if (userExist) return res.status(400).json({ msg: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashedPassword);

    res.status(201).json({ msg: "Usuario creado con éxito", userId });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

//Login Formulario 
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ msg: "Login exitoso", token, user: { id: user.id, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor", err: err.message });
  }
};

module.exports = { registro, login };
