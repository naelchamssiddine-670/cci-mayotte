require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize } = require("./mysql");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Vérifier si un admin existe déjà
    const adminExistant = await Admin.findOne();
    if (adminExistant) {
      console.log("⚠️  Un admin existe déjà !");
      process.exit(0);
    }

    // Hacher le mot de passe avec Bcrypt
    const motDePasseHache = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Créer l'admin
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: motDePasseHache,
    });

    console.log("✅ Compte admin créé !");
    console.log(`   Email    : ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password : ${process.env.ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur :", error.message);
    process.exit(1);
  }
};

createAdmin();