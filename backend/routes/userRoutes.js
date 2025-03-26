const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../utils/authMiddleware");

// Registro
router.post("/register", userController.registerUser);

// Lectura
router.get("/", authMiddleware, userController.getUsers);

// Actualizar por UID
router.put("/:uid", authMiddleware, userController.updateUser);

// Eliminar por UID
router.delete("/:uid", authMiddleware, userController.deleteUser);

module.exports = router;
