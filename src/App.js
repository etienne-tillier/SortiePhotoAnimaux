import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListeAnimaux from "./pages/ListeAnimaux/ListeAnimaux.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx"
import FormulaireAnimaux from "./pages/Admin/FormulaireAnimaux/FormulaireAnimaux.jsx";
import FormulaireSortie from "./pages/Prive/FormulaireSortie/FormulaireSortie.jsx";
import Prive from "./pages/Prive/Prive.jsx";
import Navbar from "./components/Nav/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Map from "./pages/Prive/Map/Map.jsx";
import Erreur from "./pages/Erreur/Erreur.jsx";
import "./App.css";
import styled from "styled-components";


const StyledApp = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 15% 80% 5%;

  .containerApp{
    width: 100%;
    height: 100%;
  }

`

const App = () => {
  return (
    <React.StrictMode>
      <StyledApp>
        <Navbar/>
        <Connexion/>
        <Inscription/>
        <div className="containerApp">
          <Routes>
            <Route path="/" element={<ListeAnimaux></ListeAnimaux>} />
            <Route path="/listeAnimaux" element={<ListeAnimaux></ListeAnimaux>} />
            <Route path="/erreur">
              <Route path="/erreur/400" element={<Erreur erreur="La syntaxe de la requête est erronée"></Erreur>} />
              <Route path="/erreur/401" element={<Erreur erreur="Une authentification est nécessaire pour accéder à la ressource"></Erreur>} />
              <Route path="/erreur/402" element={<Erreur erreur="Paiement requis pour accéder à la ressource"></Erreur>} />
              <Route path="/erreur/403" element={<Erreur erreur="Droit non accordé"></Erreur>} />
              <Route path="/erreur/404" element={<Erreur erreur="Ressource non trouvée"></Erreur>} />
            </Route>
            <Route path="/prive" element={<Prive></Prive>}>
              <Route path="/prive/sorties" element={<Map></Map>}/>
              <Route path="/prive/formulaireSortie" element={<FormulaireSortie create="true"></FormulaireSortie>}/>
              <Route path="/prive/formulaireSortie/:id" element={<FormulaireSortie create="false"></FormulaireSortie>}/>
            </Route>
            <Route path="/admin" element={<Admin></Admin>}>
              <Route path="/admin/formulaireAnimaux" element={<FormulaireAnimaux create="true"></FormulaireAnimaux>}>
                <Route path="/admin/formulaireAnimaux/:id" element={<FormulaireAnimaux create="false"></FormulaireAnimaux>}/>
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer></Footer>
      </StyledApp>
    </React.StrictMode>
  );
};

export default App;
