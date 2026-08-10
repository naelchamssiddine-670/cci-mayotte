const mongoose = require("mongoose");

// Schema MongoDB des evenements importants effectues dans l'administration.
const historiqueSchema = new mongoose.Schema({
  // Type d'evenement, par exemple une connexion ou une modification.
  action: String,
  // Texte permettant d'identifier l'element ou la personne concernee.
  details: String,
  // Date de creation automatique de l'entree dans l'historique.
  date: { type: Date, default: Date.now }
}, {
  // Nom de la collection MongoDB utilisee pour les historiques.
  collection: "historique"
});

// Cree et exporte le modele utilise par les controleurs pour ecrire l'historique.
module.exports = mongoose.model("Historique", historiqueSchema);
