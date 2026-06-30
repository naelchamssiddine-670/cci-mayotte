import { useState } from "react";
import axios from "axios";

// Page Contact - formulaire qui enregistre le message en base de données
function Contact() {
  const [formData, setFormData] = useState({ nom: "", email: "", contenu: "" });
  const [statut, setStatut] = useState(null);

  // Met à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoie le formulaire au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages", formData);
      setStatut("succes");
      setFormData({ nom: "", email: "", contenu: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setStatut("erreur");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ color: "#373cf3", fontSize: "28px", marginBottom: "20px" }}>
        Nous contacter
      </h1>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Une question ? Un projet ? Envoyez-nous un message, nous vous répondrons rapidement.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px" }}
        />
        <textarea
          name="contenu"
          placeholder="Votre message"
          value={formData.contenu}
          onChange={handleChange}
          required
          rows={6}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px", fontFamily: "Arial" }}
        />
        <button
          type="submit"
          style={{ backgroundColor: "#373cf3", color: "#fff", border: "none", padding: "14px", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
        >
          Envoyer le message
        </button>
      </form>

      {statut === "succes" && (
        <p style={{ color: "green", marginTop: "16px" }}>✅ Votre message a bien été envoyé !</p>
      )}
      {statut === "erreur" && (
        <p style={{ color: "red", marginTop: "16px" }}>❌ Une erreur est survenue, réessayez.</p>
      )}
    </div>
  );
}

export default Contact;