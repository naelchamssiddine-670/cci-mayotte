import Hero from "../components/Hero";
import Cartes from "../components/Cartes";
import MayotteChiffre from "../components/MayotteChiffre";
import Evenement from "../components/Evenement";
import Accompagnement from "../components/Accompagnement";

function Accueil() {
  return (
    <>
      <Hero />
      <Cartes />
      <MayotteChiffre />
      <Evenement />
      <Accompagnement />
    </>
  );
}

export default Accueil;