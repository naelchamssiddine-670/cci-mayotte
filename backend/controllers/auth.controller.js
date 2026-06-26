const Admin = require("../models/Admin");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que l'admin existe
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe directement
    if (password !== admin.password) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Répondre avec les infos admin
    res.json({ 
      message: "Connexion réussie",
      admin: { id: admin.id, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};