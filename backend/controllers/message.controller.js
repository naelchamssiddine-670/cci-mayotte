const Message = require("../models/Message");
const Historique = require("../models/Historique");

// Controleur des messages : gere les messages envoyes par les visiteurs.

// Envoyer un message (public)
exports.create = async (req, res) => {
  try {
    // Recupere les informations envoyees par le formulaire de contact.
    const { nom, email, contenu } = req.body;
    // Enregistre le message dans la base de donnees.
    await Message.create({ nom, email, contenu });
    // Enregistre l'action dans l'historique MongoDB.
    await Historique.create({
      action: "NOUVEAU_MESSAGE",
      details: `Message reçu de ${nom} (${email})`,
    });
    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Voir tous les messages (admin)
exports.getAll = async (req, res) => {
  try {
    // Liste les messages du plus recent au plus ancien.
    const messages = await Message.findAll({ 
      order: [["createdAt", "DESC"]] 
    });
    // Renvoie la liste complete des messages.
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Répondre à un message (admin)
exports.repondre = async (req, res) => {
  try {
    // Recherche le message concerne par la reponse admin.
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message introuvable" });
    }
    // Sauvegarde la reponse et marque le message comme lu.
    await message.update({ reponse: req.body.reponse, lu: true });
    // Enregistre la reponse dans l'historique MongoDB.
    await Historique.create({
      action: "REPONSE_MESSAGE",
      details: `Réponse envoyée à ${message.email}`,
    });
    res.json({ message: "Réponse enregistrée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};