import { Link } from "react-router-dom";

// Composant Accompagnement - section bleue avec boutons de contact
function Accompagnement() {
  return (
    <section className="accompagnement">
      <h2 className="accompagnement-titre">L'accompagnement</h2>

      <div className="accompagnement-contenu">
        {/* Texte à gauche */}
        <div className="accompagnement-texte">
          <p>Nous accompagnons les entrepreneurs, les entreprises</p>
          <p>et les porteurs de projet dans toutes leurs démarches.</p>
          <p>Création, développement, formation et export.</p>
        </div>

        {/* Boutons à droite */}
        <div className="accompagnement-boutons">
          <Link to="/contact" className="btn-accompagnement">Prendre rendez-vous 📧</Link>
          <Link to="/contact" className="btn-accompagnement">Numéro de téléphone 📞</Link>
        </div>
      </div>
    </section>
  );
}

export default Accompagnement;