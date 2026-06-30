import { Navigate } from "react-router-dom";

// Composant qui protège les routes admin - redirige vers la connexion si non connecté
function RouteProtegee({ children }) {
  const estConnecte = localStorage.getItem("adminConnecte") === "true";

  if (!estConnecte) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RouteProtegee;