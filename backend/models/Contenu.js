const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

// Modele Sequelize representant un contenu publie sur le site.
const Contenu = sequelize.define("Contenu", {
  // Identifiant unique auto-incremente.
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Titre affiche pour le contenu.
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Corps principal du contenu.
  corps: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Categorie du contenu, avec une valeur par defaut.
  categorie: {
    type: DataTypes.STRING,
    defaultValue: "Actualité",
  },
  // Compteur de consultations du contenu.
  vues: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  // Nom exact de la table MySQL.
  tableName: "contenu",

  // Sequelize gere automatiquement createdAt et updatedAt.
  timestamps: true,
});

// Export du modele pour les controleurs.
module.exports = Contenu;
