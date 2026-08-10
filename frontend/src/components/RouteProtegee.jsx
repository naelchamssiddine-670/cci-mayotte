import { Navigate } from "react-router-dom";

// Composant qui protège les routes admin - redirige vers la connexion si non connecté
function RouteProtegee({ children }) {
  // La connexion est memorisee dans le navigateur apres une authentification reussie.
  const estConnecte = localStorage.getItem("adminConnecte") === "true";

  if (!estConnecte) {
    return <Navigate to="/admin/login" replace />;
  }

  // Affiche la page demandee uniquement pour un administrateur connecte.
  return children;
}

export default RouteProtegee;
