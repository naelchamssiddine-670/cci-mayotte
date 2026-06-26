const Contenu = require("../models/Contenu");

// Récupérer tous les contenus
exports.getAll = async (req, res) => {
  try {
    const contenus = await Contenu.findAll({ 
      order: [["createdAt", "DESC"]] 
    });
    res.json(contenus);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer un contenu par ID
exports.getOne = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    await contenu.increment("vues");
    res.json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Ajouter un contenu
exports.create = async (req, res) => {
  try {
    const { titre, corps, categorie } = req.body;
    const contenu = await Contenu.create({ titre, corps, categorie });
    res.status(201).json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifier un contenu
exports.update = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    await contenu.update(req.body);
    res.json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprimer un contenu
exports.delete = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    await contenu.destroy();
    res.json({ message: "Contenu supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};