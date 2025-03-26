// controllers/userController.js
const { auth } = require("../services/firebase");
const admin = require("firebase-admin");

const db = admin.database(); // Si usarás Realtime DB

// Registrar usuario
const registerUser = async (req, res) => {
  try {
    const { email, password, displayName, photoURL } = req.body;

    // Crear en Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      photoURL,
    });

    // Guardar en Realtime DB
    await db.ref(`users/${userRecord.uid}`).set({
      email,
      displayName,
      photoURL,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val() || {};
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { displayName, photoURL } = req.body;

    await db.ref(`users/${uid}`).update({ displayName, photoURL });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    await auth.deleteUser(uid);
    await db.ref(`users/${uid}`).remove();

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};

module.exports = { registerUser, getUsers, updateUser, deleteUser };
