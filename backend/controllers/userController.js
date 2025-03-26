const admin = require('../services/firebase'); // Firebase Admin configurado

exports.loginUser = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Aquí verificas o registras al usuario en PostgreSQL con el uid
    // ej: const user = await User.findOrCreate({ where: { firebaseUid: uid }});

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};