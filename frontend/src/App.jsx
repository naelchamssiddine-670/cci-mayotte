import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import PageAVenir from "./pages/PageAVenir";
import Contact from "./pages/Contact";
import ListeContenus from "./pages/ListeContenus";
import DetailContenu from "./pages/DetailContenu";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContenus from "./pages/AdminContenus";
import AdminContenuForm from "./pages/AdminContenuForm";
import RouteProtegee from "./components/RouteProtegee";
import AdminMessages from "./pages/AdminMessages";

// Compose la structure commune du site et declare toutes les adresses accessibles.
function App() {
  return (
    <BrowserRouter>
      {/* La navigation et le pied de page restent visibles sur toutes les pages. */}
      <Navbar />
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Accueil />} />

        {/* Pages "à venir" pour les liens secondaires */}
        <Route path="/presentation" element={<PageAVenir titre="Présentation" />} />
        <Route path="/entreprise" element={<PageAVenir titre="Entreprise" />} />
        <Route path="/se-former" element={<PageAVenir titre="Se former" />} />
        <Route path="/marche-public" element={<PageAVenir titre="Marché public" />} />
        <Route path="/offres-emploi" element={<PageAVenir titre="Offres d'emploi" />} />
        <Route path="/trouver-formation" element={<PageAVenir titre="Trouver une formation" />} />
        <Route path="/commerce-exterieur" element={<PageAVenir titre="Commerce extérieur" />} />
        <Route path="/formalites" element={<PageAVenir titre="Formalités administratives" />} />
        <Route path="/mentions-legales" element={<PageAVenir titre="Mentions légales" />} />
        <Route path="/confidentialite" element={<PageAVenir titre="Politique de confidentialité" />} />
        <Route path="/liens-utiles" element={<PageAVenir titre="Liens utiles" />} />
        <Route path="/services" element={<PageAVenir titre="Nos services" />} />

        {/* Pages contenus et contact */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contenus" element={<ListeContenus />} />
        <Route path="/contenu/:id" element={<DetailContenu key={window.location.pathname} />} />

        {/* Espace admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RouteProtegee>
              <AdminDashboard />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/contenus"
          element={
            <RouteProtegee>
              <AdminContenus />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/contenus/ajouter"
          element={
            <RouteProtegee>
              <AdminContenuForm />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/contenus/modifier/:id"
          element={
            <RouteProtegee>
              <AdminContenuForm />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <RouteProtegee>
              <AdminMessages />
            </RouteProtegee>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
