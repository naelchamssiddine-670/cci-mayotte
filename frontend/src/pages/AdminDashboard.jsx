import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Dashboard admin - vue d'ensemble avec gestion des contenus et messages
function AdminDashboard() {
  const [contenus, setContenus] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = () => {
    axios
      .get("http://localhost:5000/api/contenus")
      .then((res) => setContenus(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/messages", {
        headers: { admin: "connected" },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  };

  const handleDeconnexion = () => {
    localStorage.removeItem("adminConnecte");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const handleSupprimer = async (id) => {
    if (!window.confirm("Supprimer ce contenu ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contenus/${id}`, {
        headers: { admin: "connected" },
      });
      chargerDonnees();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const messagesNonLus = messages.filter((m) => !m.lu).length;

  return (
    <div className="dashboard">
      {/* Menu latéral */}
      <div className="dashboard-sidebar">
        <h2>CCI Mayotte</h2>
        <Link to="/admin/dashboard">📋 Vue d'ensemble</Link>
        <Link to="/admin/contenus">📰 Contenus</Link>
        <Link to="/admin/messages">✉️ Messages {messagesNonLus > 0 && `(${messagesNonLus})`}</Link>
        <button className="dashboard-deconnexion" onClick={handleDeconnexion}>
          Déconnexion
        </button>
      </div>

      {/* Contenu principal */}
      <div className="dashboard-content">
        <h1>Vue d'ensemble</h1>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          {contenus.length} contenu{contenus.length > 1 ? "s" : ""} publié{contenus.length > 1 ? "s" : ""} —{" "}
          {messages.length} message{messages.length > 1 ? "s" : ""} reçu{messages.length > 1 ? "s" : ""} (
          {messagesNonLus} non lu{messagesNonLus > 1 ? "s" : ""})
        </p>

        <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>Derniers contenus</h2>
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
            {contenus.slice(0, 5).map((item) => (
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

export default AdminDashboard;