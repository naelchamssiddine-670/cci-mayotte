import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Ecran d'administration pour consulter les messages et y enregistrer une reponse.
function AdminMessages() {
  // Messages fournis par l'API et brouillons de reponse indexes par identifiant.
  const [messages, setMessages] = useState([]);
  const [reponses, setReponses] = useState({});

  // Charge les messages a la premiere ouverture de la page.
  useEffect(() => {
    chargerMessages();
  }, []);

  // Demande la liste des messages en fournissant le header attendu par le backend.
  const chargerMessages = () => {
    axios
      .get("http://localhost:5000/api/messages", {
        headers: { admin: "connected" },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  };

  // Met a jour uniquement le brouillon du message en cours de traitement.
  const handleChangeReponse = (id, valeur) => {
    setReponses({ ...reponses, [id]: valeur });
  };

  // Enregistre la reponse puis recharge la liste pour refleter son nouvel etat.
  const handleRepondre = async (id) => {
    const reponse = reponses[id];
    if (!reponse || reponse.trim() === "") return;

    try {
      await axios.put(
        `http://localhost:5000/api/messages/${id}/repondre`,
        { reponse },
        { headers: { admin: "connected" } }
      );
      chargerMessages();
    } catch (error) {
      console.error("Erreur lors de la réponse :", error);
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
        <h1>Messages reçus</h1>

        {/* Chaque message non traite affiche un champ de reponse. */}
        {messages.length === 0 ? (
          <p>Aucun message pour le moment.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`dashboard-message ${!msg.lu ? "non-lu" : ""}`}
            >
              <p><strong>{msg.nom}</strong> — {msg.email}</p>
              <p style={{ margin: "8px 0", color: "#444" }}>{msg.contenu}</p>

              {msg.reponse ? (
                <p style={{ color: "#373cf3", fontStyle: "italic" }}>
                  ✅ Réponse envoyée : "{msg.reponse}"
                </p>
              ) : (
                <div className="dashboard-message-reponse">
                  <textarea
                    placeholder="Écrire une réponse..."
                    rows={2}
                    value={reponses[msg.id] || ""}
                    onChange={(e) => handleChangeReponse(msg.id, e.target.value)}
                  />
                  <button className="admin-btn" onClick={() => handleRepondre(msg.id)}>
                    Répondre
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminMessages;
