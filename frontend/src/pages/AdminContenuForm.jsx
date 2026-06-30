import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Formulaire pour ajouter ou modifier un contenu - utilisé pour les deux cas
function AdminContenuForm() {
  const { id } = useParams(); // Si id existe = modification, sinon = ajout
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ titre: "", corps: "", categorie: "Actualité" });
  const estModification = Boolean(id);

  useEffect(() => {
    if (estModification) {
      axios
        .get(`http://localhost:5000/api/contenus/${id}`)
        .then((res) => setFormData({ titre: res.data.titre, corps: res.data.corps, categorie: res.data.categorie }))
        .catch((err) => console.error(err));
    }
  }, [id, estModification]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (estModification) {
        await axios.put(`http://localhost:5000/api/contenus/${id}`, formData, {
          headers: { admin: "connected" },
        });
      } else {
        await axios.post("http://localhost:5000/api/contenus", formData, {
          headers: { admin: "connected" },
        });
      }
      navigate("/admin/contenus");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <h2>CCI Mayotte</h2>
        <Link to="/admin/dashboard">📋 Vue d'ensemble</Link>
        <Link to="/admin/contenus">📰 Contenus</Link>
        <Link to="/admin/messages">✉️ Messages</Link>
      </div>

      <div className="dashboard-content">
        <h1>{estModification ? "Modifier le contenu" : "Ajouter un contenu"}</h1>

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="titre"
            placeholder="Titre"
            className="admin-input"
            value={formData.titre}
            onChange={handleChange}
            required
          />
          <select
            name="categorie"
            className="admin-input"
            value={formData.categorie}
            onChange={handleChange}
          >
            <option value="Actualité">Actualité</option>
            <option value="Évènement">Évènement</option>
            <option value="Formation">Formation</option>
          </select>
          <textarea
            name="corps"
            placeholder="Contenu de l'article"
            className="admin-input"
            rows={8}
            value={formData.corps}
            onChange={handleChange}
            required
          />
          <button type="submit" className="admin-btn">
            {estModification ? "Enregistrer les modifications" : "Publier le contenu"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminContenuForm;