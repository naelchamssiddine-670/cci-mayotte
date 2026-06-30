// Composant MayotteChiffre - statistiques sur Mayotte
function MayotteChiffre() {
  return (
    <section className="mayotte-chiffre">
      <h2 className="chiffre-titre">Mayotte en chiffre</h2>

      <div className="chiffre-grille">
        {/* Carte statistique 1 */}
        <div className="chiffre-carte">
          <div className="chiffre-nombre">145 000 ↗️</div>
          <div className="chiffre-label">Habitants</div>
        </div>

        {/* Carte statistique 2 */}
        <div className="chiffre-carte">
          <div className="chiffre-nombre">374 km²</div>
          <div className="chiffre-label">Superficie</div>
        </div>

        {/* Carte statistique 3 */}
        <div className="chiffre-carte">
          <div className="chiffre-nombre">5 000</div>
          <div className="chiffre-label">Entreprises</div>
        </div>

        {/* Carte statistique 4 */}
        <div className="chiffre-carte">
          <div className="chiffre-nombre">101</div>
          <div className="chiffre-label">Département français</div>
        </div>

        {/* Carte statistique 5 */}
        <div className="chiffre-carte">
          <div className="chiffre-nombre">2 000 🎓</div>
          <div className="chiffre-label">Formations disponibles</div>
        </div>
      </div>
    </section>
  );
}

export default MayotteChiffre;