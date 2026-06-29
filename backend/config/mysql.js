const { Sequelize } = require("sequelize");

// Instance Sequelize utilisee par tous les modeles de l'application.
// Les informations de connexion viennent du fichier .env.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // Adresse du serveur MySQL et dialecte utilise.
    host: process.env.DB_HOST,
    dialect: "mysql",

    // Desactive les logs SQL dans la console.
    logging: false,
  }
);

// Export de l'instance pour la partager avec les modeles et le serveur.
module.exports = { sequelize };
