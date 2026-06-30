// Composant Navbar - barre de navigation principale du site
function Navbar() {
  return (
    <header>
      <nav className="navbar">
        {/* Logo du site */}
        <div className="logo">
          <img src="/logo-cci.png" alt="CCI Mayotte" />
        </div>

        {/* Liste des liens de navigation */}
        <ul className="nav-links">
          <li><a href="#">Présentation</a></li>
          <li><a href="#">Entreprise</a></li>
          <li><a href="#">Se former</a></li>
          <li><a href="#">Marché public</a></li>
          <li><a href="#">Offres d'emploi</a></li>
        </ul>

        {/* Barre de recherche */}
        <div className="recherche">
          <input type="text" className="recherche-input" placeholder="Rechercher..." />
          <button className="recherche-btn">🔍</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;