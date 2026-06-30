import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Liste des images locales utilisées en alternance pour les contenus
const images = [
  "/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
  "/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
];

// Page qui affiche tous les contenus de la base de données
function ListeContenus() {
  const [contenus, setContenus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contenus")
      .then((response) => setContenus(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des contenus :", error));
  }, []);

  return (
    <div className="liste-contenus">
      <h1 className="liste-titre">Toutes nos actualités</h1>

      <div className="liste-grille">
        {contenus.length === 0 ? (
          <p>Aucun contenu pour le moment.</p>
        ) : (
          contenus.map((item, index) => (
            <Link to={`/contenu/${item.id}`} className="liste-carte" key={item.id}>
              <img
                className="liste-image"
                src={images[item.id % images.length]}
                alt={item.titre}
              />
              <span className="liste-categorie">{item.categorie}</span>
              <h3 className="liste-carte-titre">{item.titre}</h3>
              <p className="liste-carte-texte">{item.corps.substring(0, 100)}...</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ListeContenus;