// Middleware de protection des routes reservees a l'administration.
const verifyToken = (req, res, next) => {
  // Lecture du header attendu pour autoriser l'acces.
  const adminHeader = req.headers["admin"];

  // Bloque la requete si le header admin n'est pas present ou invalide.
  if (!adminHeader || adminHeader !== "connected") {
    return res.status(401).json({ message: "Accès refusé" });
  }

  // Autorise la requete a continuer vers le controleur suivant.
  next();
};

// Export du middleware pour l'utiliser dans les fichiers de routes.
module.exports = verifyToken;
