import { Link } from "react-router-dom";

// Composant Cartes - les cartes de services rapides
function Cartes() {
  return (
    <section className="cartes">
      {/* Carte pour trouver une formation */}
      <Link to="/trouver-formation" className="carte">
        <div className="carte-icone">🎓</div>
        <p className="carte-texte">Trouver une formation</p>
      </Link>

      {/* Carte pour le commerce extérieur */}
      <Link to="/commerce-exterieur" className="carte">
        <div className="carte-icone">🌍</div>
        <p className="carte-texte">Commerce extérieur</p>
      </Link>

      {/* Carte pour les formalités administratives */}
      <Link to="/formalites" className="carte">
        <div className="carte-icone">📋</div>
        <p className="carte-texte">Formalités administratives</p>
      </Link>
    </section>
  );
}

export default Cartes;