const express = require("express");
const router = express.Router();
const contenuController = require("../controllers/contenu.controller");
const verifyToken = require("../middlewares/auth.middleware");

// Routes publiques de consultation des contenus.
router.get("/", contenuController.getAll);
router.get("/:id", contenuController.getOne);

// Routes protegees reservees a l'administration des contenus.
router.post("/", verifyToken, contenuController.create);
router.put("/:id", verifyToken, contenuController.update);
router.delete("/:id", verifyToken, contenuController.delete);

// Export du routeur pour l'enregistrer dans l'application Express.
module.exports = router;
