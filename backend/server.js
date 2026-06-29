const express = require("express");
const cors = require("cors");

// Chargement des variables d'environnement depuis le fichier .env.
require("dotenv").config();

// Connexion Sequelize configuree pour MySQL.
const { sequelize } = require("./config/mysql");

// Import des routes principales de l'API.
const authRoutes = require("./routes/auth.routes");
const contenuRoutes = require("./routes/contenu.routes");
const messageRoutes = require("./routes/message.routes");

// Creation de l'application Express.
const app = express();

// Middlewares globaux : CORS et lecture du JSON dans req.body.
app.use(cors());
app.use(express.json());

// Association des modules de routes avec leurs prefixes.
app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);
app.use("/api/messages", messageRoutes);

// Route de test pour confirmer que le serveur est actif.
app.get("/", (req, res) => {
  res.json({ message: "API CCI Mayotte opérationnelle ✅" });
});

// Port d'ecoute configurable via .env, avec une valeur par defaut.
const PORT = process.env.PORT || 5000;

// Demarre la base de donnees puis lance le serveur HTTP.
const startServer = async () => {
  try {
    // Verifie que la connexion MySQL est disponible.
    await sequelize.authenticate();
    console.log("✅ MySQL connecté");

    // Synchronise les modeles Sequelize avec les tables MySQL.
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synchronisées");

    // Lance l'API une fois la base prete.
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    // Stoppe le processus si la base ou le serveur ne demarre pas.
    console.error("❌ Erreur :", error.message);
    process.exit(1);
  }
};

// Point d'entree du serveur.
startServer();
