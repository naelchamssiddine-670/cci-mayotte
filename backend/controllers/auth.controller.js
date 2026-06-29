const Admin = require("../models/Admin");

// Controleur charge de l'authentification administrateur.
exports.login = async (req, res) => {
  try {
    // Recuperation des identifiants envoyes par le client.
    const { email, password } = req.body;

    // Vérifier que l'admin existe
    // Recherche un administrateur avec l'email fourni.
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe directement
    // Compare le mot de passe fourni avec celui stocke en base.
    if (password !== admin.password) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Répondre avec les infos admin
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
