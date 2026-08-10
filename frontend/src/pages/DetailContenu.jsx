import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Images locales utilisees pour illustrer le contenu selon son identifiant.
const images = [
  "/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
  "/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
];

// Affiche les informations completes d'un contenu selectionne dans l'URL.
function DetailContenu() {
  // L'identifiant provient du segment /contenu/:id de la route.
  const { id } = useParams();
  // Le contenu reste nul pendant le chargement de l'appel API.
  const [contenu, setContenu] = useState(null);

  // Recharge les donnees lorsque l'identifiant dans l'URL change.
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contenus/${id}`)
      .then((response) => setContenu(response.data))
      .catch((error) => console.error("Erreur lors de la récupération du contenu :", error));
  }, [id]);

  // Evite d'afficher des informations incompletes avant la reponse de l'API.
  if (!contenu) {
    return <div className="detail-page"><p>Chargement...</p></div>;
  }

  // Formate la date technique envoyee par la base pour l'affichage en francais.
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
