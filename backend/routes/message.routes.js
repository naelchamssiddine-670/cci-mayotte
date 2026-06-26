const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/", messageController.create);
router.get("/", verifyToken, messageController.getAll);
router.put("/:id/repondre", verifyToken, messageController.repondre);

module.exports = router;