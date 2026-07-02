const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Historique = require("../models/Historique");

exports.login = async (req, res) => {
  try {
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

    // Enregistre dans MongoDB - si MongoDB est indisponible on continue quand même
    try {
      await Historique.create({
        action: "CONNEXION",
        details: `Connexion de ${admin.email}`,
      });
    } catch (mongoError) {
      console.warn("⚠️ Historique MongoDB non enregistré :", mongoError.message);
    }

    // Renvoie une reponse de connexion avec les informations publiques de l'admin.
    res.json({ 
      message: "Connexion réussie",
      admin: { id: admin.id, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};