const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const verifyToken = require("../middlewares/auth.middleware");

// Route publique pour envoyer un message.
router.post("/", messageController.create);

// Routes protegees pour consulter et traiter les messages.
router.get("/", verifyToken, messageController.getAll);
router.put("/:id/repondre", verifyToken, messageController.repondre);

// Export du routeur pour l'enregistrer dans l'application Express.
module.exports = router;
