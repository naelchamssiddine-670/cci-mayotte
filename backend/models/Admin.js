const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

// Modele Sequelize representant un administrateur.
const Admin = sequelize.define("Admin", {
  // Identifiant unique auto-incremente.
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Email utilise pour la connexion admin.
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Mot de passe stocke en base.
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Nom exact de la table MySQL.
  tableName: "admin",

  // createdAt est conserve, updatedAt est desactive.
  timestamps: true,
  updatedAt: false,
});

// Export du modele pour les controleurs et scripts.
module.exports = Admin;
