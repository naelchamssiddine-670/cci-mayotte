const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Historique = require("../models/Historique");

// Controleur charge de l'authentification administrateur.
exports.login = async (req, res) => {
  try {
    // Recuperation des identifiants envoyes par le client.
    const { email, password } = req.body;

    // Recherche un administrateur avec l'email fourni.
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Compare le mot de passe fourni avec le hash stocke en base via Bcrypt.
    const valide = await bcrypt.compare(password, admin.password);
    if (!valide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Enregistre la connexion dans l'historique MongoDB.
    await Historique.create({
      action: "CONNEXION",
      details: `Connexion de ${admin.email}`,
    });

    // Renvoie une reponse de connexion avec les informations publiques de l'admin.
    res.json({ 
      message: "Connexion réussie",
      admin: { id: admin.id, email: admin.email }
    });
  } catch (error) {
    // Reponse generique en cas d'erreur serveur.
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};