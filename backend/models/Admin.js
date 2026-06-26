const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "admin",
  timestamps: true,
  updatedAt: false,
});

module.exports = Admin;