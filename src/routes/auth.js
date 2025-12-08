const { Router } = require("express");
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middlewares/auth");

const router = Router();

// Ruta para el registro de usuarios
router.post("/register", register);
// Ruta para el login de usuarios
router.post("/login", login);
// Ruta protegida de ejemplo
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
