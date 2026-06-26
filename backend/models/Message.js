const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reponse: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  lu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "message",
  timestamps: true,
  updatedAt: false,
});

module.exports = Message;