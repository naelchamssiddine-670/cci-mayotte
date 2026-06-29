const express = require("express");
const cors = require("cors");

// Routes principales de l'API.
const authRoutes = require("./routes/auth.routes");
const contenuRoutes = require("./routes/contenu.routes");
const messageRoutes = require("./routes/message.routes");

// Creation de l'application Express.
const app = express();

// Middlewares globaux : CORS autorise les requetes externes,
// express.json() permet de lire le corps JSON des requetes.
app.use(cors());
app.use(express.json());

// Association des routes avec leurs prefixes d'URL.
app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);
app.use("/api/messages", messageRoutes);

// Route de test pour verifier rapidement que l'API repond.
app.get("/", (req, res) => {
  res.json({ message: "API CCI Mayotte opérationnelle ✅" });
});

// Export de l'application pour pouvoir la reutiliser ailleurs.
module.exports = app;
