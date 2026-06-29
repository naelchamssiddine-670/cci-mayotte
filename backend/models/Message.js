const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

// Modele Sequelize representant un message envoye par un visiteur.
const Message = sequelize.define("Message", {
  // Identifiant unique auto-incremente.
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Nom de la personne qui envoie le message.
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Email de contact de l'expediteur.
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Texte du message envoye.
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Reponse eventuelle saisie par un administrateur.
  reponse: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  // Indique si le message a ete traite ou lu.
  lu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  // Nom exact de la table MySQL.
  tableName: "message",

  // createdAt est conserve, updatedAt est desactive.
  timestamps: true,
  updatedAt: false,
});

// Export du modele pour les controleurs.
module.exports = Message;
