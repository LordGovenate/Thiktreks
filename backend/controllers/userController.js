const { db } = require('../services/firebase');

// Crear usuario
const registerUser = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    await db.collection('users').doc(uid).set({
      email,
      displayName,
      photoURL,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Usuario registrado en Firestore' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];

    snapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() });
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { displayName, photoURL } = req.body;

  try {
    await db.collection('users').doc(uid).update({
      displayName,
      photoURL,
    });

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    await db.collection('users').doc(uid).delete();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
  }
};

module.exports = {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
};
