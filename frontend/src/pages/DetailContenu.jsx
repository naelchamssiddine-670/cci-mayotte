import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const images = [
  "/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
  "/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
];

function DetailContenu() {
  const { id } = useParams();
  const [contenu, setContenu] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contenus/${id}`)
      .then((response) => setContenu(response.data))
      .catch((error) => console.error("Erreur lors de la récupération du contenu :", error));
  }, [id]);

  if (!contenu) {
    return <div className="detail-page"><p>Chargement...</p></div>;
  }

  const dateFormatee = new Date(contenu.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Alterne l'image selon l'id pour varier visuellement
  const image = images[contenu.id % images.length];

  return (
    <div className="detail-page">
      <Link to="/" className="detail-retour">← Retour aux actualités</Link>

      <img className="detail-image" src={image} alt={contenu.titre} />

      <span className="detail-categorie">{contenu.categorie}</span>
      <h1 className="detail-titre">{contenu.titre}</h1>
      <p className="detail-meta">
        Publié le {dateFormatee} — {contenu.vues} vue{contenu.vues > 1 ? "s" : ""}
      </p>

      <p className="detail-corps">{contenu.corps}</p>
    </div>
  );
}

export default DetailContenu;