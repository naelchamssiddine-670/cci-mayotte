import { Link } from "react-router-dom";

// Composant Footer - pied de page du site
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-haut">
        {/* Logo */}
        <Link to="/" className="footer-logo">
          <img src="/logo-cci-blanc.png" alt="Logo CCI Mayotte" />
        </Link>

        {/* Colonne Nos services */}
        <div className="footer-colonne">
          <h3 className="footer-titre-col">Nos services</h3>
          <ul className="footer-liste">
            <li><Link to="/trouver-formation">Trouver une formation</Link></li>
            <li><Link to="/commerce-exterieur">Commerce extérieur</Link></li>
            <li><Link to="/formalites">Formalités administratives</Link></li>
          </ul>
        </div>

        {/* Colonne La CCI */}
        <div className="footer-colonne">
          <h3 className="footer-titre-col">La CCI</h3>
          <ul className="footer-liste">
            <li><Link to="/presentation">Présentation</Link></li>
            <li><Link to="/entreprise">Entreprendre</Link></li>
            <li><Link to="/se-former">Se former</Link></li>
            <li><Link to="/marche-public">Marché public</Link></li>
          </ul>
        </div>

        {/* Icônes réseaux sociaux */}
        <div className="footer-reseaux">
          <a href="#" className="reseau" aria-label="Facebook">f</a>
          <a href="#" className="reseau" aria-label="Twitter">t</a>
          <a href="#" className="reseau" aria-label="LinkedIn">in</a>
        </div>
      </div>

      {/* Partie basse du footer */}
      <div className="footer-bas">
        <ul className="footer-liens-utiles">
          <li><Link to="/liens-utiles">Liens utiles</Link></li>
          <li><Link to="/mentions-legales">Mentions légales</Link></li>
          <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;