import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminContenus() {
  const [contenus, setContenus] = useState([]);

  useEffect(() => {
    chargerContenus();
  }, []);

  const chargerContenus = () => {
    axios
      .get("http://localhost:5000/api/contenus")
      .then((res) => setContenus(res.data))
      .catch((err) => console.error(err));
  };

  const handleSupprimer = async (id) => {
    if (!window.confirm("Supprimer ce contenu ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contenus/${id}`, {
        headers: { admin: "connected" },
      });
      chargerContenus();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
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
        <h1>Gestion des contenus</h1>

        <Link to="/admin/contenus/ajouter">
          <button className="btn-ajouter">+ Ajouter un contenu</button>
        </Link>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Vues</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contenus.map((item) => (
              <tr key={item.id}>
                <td>{item.titre}</td>
                <td>{item.categorie}</td>
                <td>{item.vues}</td>
                <td className="dashboard-actions">
                  <Link to={`/admin/contenus/modifier/${item.id}`}>
                    <button className="btn-modifier">Modifier</button>
                  </Link>
                  <button className="btn-supprimer" onClick={() => handleSupprimer(item.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminContenus;