const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../utils/authMiddleware");

// Registrar usuario
router.post("/register", userController.registerUser);

// Obtener todos los usuarios (restringido con token)
router.get("/", authMiddleware, userController.getUsers);

// Actualizar usuario por UID
router.put("/:uid", authMiddleware, userController.updateUser);

// Eliminar usuario por UID
router.delete("/:uid", authMiddleware, userController.deleteUser);

module.exports = router;
