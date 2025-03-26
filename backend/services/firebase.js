const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../config/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

module.exports = { admin, db };
