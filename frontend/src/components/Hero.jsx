import { Link } from "react-router-dom";

// Composant Hero - bannière principale de la page d'accueil
function Hero() {
  return (
    <section className="hero">
      {/* Bloc de texte de la section principale */}
      <div className="hero-contenu">
        <h1 className="hero-titre">101ème département français</h1>
        <p className="hero-texte">Votre partenaire pour le développement économique de Mayotte.</p>
        <p className="hero-texte">
          La CCI Mayotte accompagne les entrepreneurs, les entreprises et les
          porteurs de projet dans toutes leurs démarches :
        </p>
        <p className="hero-texte">création, développement, formation et export.</p>
      </div>

      {/* Boutons d'action */}
      <div className="hero-boutons">
        <Link to="/services" className="btn-blanc">Nos services ➡️</Link>
        <Link to="/contact" className="btn-blanc">Nous contacter 📥</Link>
      </div>
    </section>
  );
}

export default Hero;