import { Link } from "react-router-dom";

// Page générique affichée pour les liens pas encore développés
function PageAVenir({ titre }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "28px", color: "#373cf3", marginBottom: "16px" }}>{titre}</h1>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}>
        Cette page est en cours de construction. Revenez bientôt !
      </p>
      <Link to="/" style={{ color: "#373cf3", fontWeight: "bold", textDecoration: "none" }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

export default PageAVenir;