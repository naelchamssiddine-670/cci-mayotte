const Message = require("../models/Message");

// Envoyer un message (public)
exports.create = async (req, res) => {
  try {
    const { nom, email, contenu } = req.body;
    await Message.create({ nom, email, contenu });
    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Voir tous les messages (admin)
exports.getAll = async (req, res) => {
  try {
    const messages = await Message.findAll({ 
      order: [["createdAt", "DESC"]] 
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Répondre à un message (admin)
exports.repondre = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message introuvable" });
    }
    await message.update({ reponse: req.body.reponse, lu: true });
    res.json({ message: "Réponse enregistrée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};