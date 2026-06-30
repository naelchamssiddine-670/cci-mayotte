import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Page de connexion administrateur
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // On garde une trace que l'admin est connecté
      localStorage.setItem("adminConnecte", "true");
      localStorage.setItem("adminEmail", response.data.admin.email);
      navigate("/admin/dashboard");
    } catch (error) {
      setErreur("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="admin-login">
      <h1>Connexion administrateur</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="admin-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="admin-input"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {erreur && <p className="admin-erreur">{erreur}</p>}
        <button type="submit" className="admin-btn">Se connecter</button>
      </form>
    </div>
  );
}

export default AdminLogin;