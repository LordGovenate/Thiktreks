// utils/authMiddleware.js
const admin = require("firebase-admin");

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const idToken = header.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token inválido:", error.message);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
