import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Images locales affichees avec les deux actualites presentes en page d'accueil.
const images = [
  "/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
  "/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
];

// Recupere et affiche un apercu des deux contenus les plus recents.
function Evenement() {
  // Etat contenant les contenus retournes par l'API.
  const [contenus, setContenus] = useState([]);

  // Charge les contenus une seule fois, a l'affichage initial du composant.
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contenus")
      .then((response) => setContenus(response.data.slice(0, 2)))
      .catch((error) => console.error("Erreur lors de la récupération des contenus :", error));
  }, []);

  return (
    <section className="evenement">
      <h2 className="evenement-titre">Évènement & actualité</h2>

      <div className="evenement-grille">
        {/* Un message est affiche tant que l'API ne renvoie aucun contenu. */}
        {contenus.length === 0 ? (
          <p>Aucun contenu pour le moment.</p>
        ) : (
          // Chaque carte mene vers la page de detail du contenu correspondant.
          contenus.map((item, index) => (
            <div className="evenement-carte" key={item.id}>
              <img
                className="evenement-image"
                src={index === 0 ? images[0] : images[1]}
                alt={item.titre}
              />
              <h3 className="actu-titre">{item.titre}</h3>
              <p className="evenement-texte">{item.corps.substring(0, 150)}...</p>
              <Link to={`/contenu/${item.id}`} className="lire-plus">
                Lire la suite →
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Evenement;
