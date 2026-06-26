const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

const Contenu = sequelize.define("Contenu", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  corps: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categorie: {
    type: DataTypes.STRING,
    defaultValue: "Actualité",
  },
  vues: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "contenu",
  timestamps: true,
});

module.exports = Contenu;