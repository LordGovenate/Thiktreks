// firebaseTest.js
const { auth } = require("./services/firebase");

auth.getUserByEmail("usuario@test.com")
  .then(user => console.log("✅ Firebase funciona:", user))
  .catch(error => console.error("❌ Error:", error.message));
