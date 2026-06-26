const express = require("express");
const router = express.Router();
const contenuController = require("../controllers/contenu.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/", contenuController.getAll);
router.get("/:id", contenuController.getOne);
router.post("/", verifyToken, contenuController.create);
router.put("/:id", verifyToken, contenuController.update);
router.delete("/:id", verifyToken, contenuController.delete);

module.exports = router;