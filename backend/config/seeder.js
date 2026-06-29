require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize } = require("./mysql");
const Admin = require("../models/Admin");

// Script de creation du premier compte administrateur.
// Il est prevu pour etre lance manuellement depuis la ligne de commande.
const createAdmin = async () => {
  try {
    // Connexion a MySQL et synchronisation du modele Admin.
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Vérifier si un admin existe déjà
    // Controle l'existence d'un admin pour eviter les doublons.
    const adminExistant = await Admin.findOne();
    if (adminExistant) {
      console.log("⚠️  Un admin existe déjà !");
      process.exit(0);
    }

    // Hacher le mot de passe avec Bcrypt
    // Transforme le mot de passe en hash avant stockage.
    const motDePasseHache = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Créer l'admin
    // Enregistre le compte administrateur dans la base.
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: motDePasseHache,
    });

    console.log("✅ Compte admin créé !");
    console.log(`   Email    : ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password : ${process.env.ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    // En cas d'erreur, affiche le message puis termine avec un code d'echec.
    console.error("❌ Erreur :", error.message);
    process.exit(1);
  }
};

// Execution du seeder.
createAdmin();
