const Contenu = require("../models/Contenu");
const Historique = require("../models/Historique");

// Recupere tous les contenus tries du plus recent au plus ancien.
exports.getAll = async (req, res) => {
  try {
    const contenus = await Contenu.findAll({ order: [["createdAt", "DESC"]] });
    res.json(contenus);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Recupere un contenu par son identifiant et incremente le compteur de vues.
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

// Cree un nouveau contenu et enregistre l'action dans l'historique MongoDB.
exports.create = async (req, res) => {
  try {
    const { titre, corps, categorie } = req.body;
    const contenu = await Contenu.create({ titre, corps, categorie });
    // Enregistre l'ajout dans l'historique MongoDB - si indisponible on continue quand même
    try {
      await Historique.create({
        action: "AJOUT_CONTENU",
        details: `Article "${titre}" ajouté`,
      });
    } catch (mongoError) {
      console.warn("⚠️ Historique MongoDB non enregistré :", mongoError.message);
    }
    res.status(201).json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifie un contenu existant et enregistre l'action dans l'historique MongoDB.
exports.update = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    await contenu.update(req.body);
    // Enregistre la modification dans l'historique MongoDB - si indisponible on continue quand même
    try {
      await Historique.create({
        action: "MODIFICATION_CONTENU",
        details: `Article "${contenu.titre}" modifié`,
      });
    } catch (mongoError) {
      console.warn("⚠️ Historique MongoDB non enregistré :", mongoError.message);
    }
    res.json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprime un contenu et enregistre l'action dans l'historique MongoDB.
exports.delete = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    const titre = contenu.titre;
    await contenu.destroy();
    // Enregistre la suppression dans l'historique MongoDB - si indisponible on continue quand même
    try {
      await Historique.create({
        action: "SUPPRESSION_CONTENU",
        details: `Article "${titre}" supprimé`,
      });
    } catch (mongoError) {
      console.warn("⚠️ Historique MongoDB non enregistré :", mongoError.message);
    }
    res.json({ message: "Contenu supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};