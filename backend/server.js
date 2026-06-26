const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./config/mysql");

// Import des routes
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

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connecté");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synchronisées");

    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur :", error.message);
    process.exit(1);
  }
};

startServer();