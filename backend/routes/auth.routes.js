const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Route de connexion administrateur.
router.post("/login", authController.login);

// Export du routeur pour l'enregistrer dans l'application Express.
module.exports = router;
