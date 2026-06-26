const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const contenuRoutes = require("./routes/contenu.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);
app.use("/api/messages", messageRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API CCI Mayotte opérationnelle ✅" });
});

module.exports = app;