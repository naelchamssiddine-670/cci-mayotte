const Contenu = require("../models/Contenu");

// Controleur des contenus : regroupe les actions CRUD exposees par les routes.

// Récupérer tous les contenus
exports.getAll = async (req, res) => {
  try {
    // Lecture de tous les contenus avec un tri du plus recent au plus ancien.
    const contenus = await Contenu.findAll({ 
      order: [["createdAt", "DESC"]] 
    });
    // Renvoie directement la liste des contenus au format JSON.
    res.json(contenus);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer un contenu par ID
exports.getOne = async (req, res) => {
  try {
    // Recherche un contenu par sa cle primaire, fournie dans l'URL.
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      // Reponse 404 si aucun contenu ne correspond a l'identifiant.
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    // Incremente le compteur de vues avant de renvoyer le contenu.
    await contenu.increment("vues");
    res.json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Ajouter un contenu
exports.create = async (req, res) => {
  try {
    // Extrait uniquement les champs attendus pour la creation.
    const { titre, corps, categorie } = req.body;
    // Cree une nouvelle ligne dans la table des contenus.
    const contenu = await Contenu.create({ titre, corps, categorie });
    // Reponse 201 : ressource creee avec succes.
    res.status(201).json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifier un contenu
exports.update = async (req, res) => {
  try {
    // Recherche le contenu a modifier.
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    // Met a jour le contenu avec les donnees envoyees par le client.
    await contenu.update(req.body);
    res.json(contenu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprimer un contenu
exports.delete = async (req, res) => {
  try {
    // Recherche le contenu a supprimer.
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: "Contenu introuvable" });
    }
    // Supprime definitivement la ligne de la base de donnees.
    await contenu.destroy();
    res.json({ message: "Contenu supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
