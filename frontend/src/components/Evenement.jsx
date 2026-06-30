import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const images = [
  "/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
  "/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
];

function Evenement() {
  const [contenus, setContenus] = useState([]);

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
        {contenus.length === 0 ? (
          <p>Aucun contenu pour le moment.</p>
        ) : (
          contenus.map((item, index) => (
            <div className="evenement-carte" key={item.id}>
              <img
                className="evenement-image"
                src={images[item.id % images.length]}
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