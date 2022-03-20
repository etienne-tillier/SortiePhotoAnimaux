import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListeAnimaux from "./components/ListeAnimaux/ListeAnimaux.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx"
import FormulaireAnimaux from "./pages/Admin/FormulaireAnimaux/FormulaireAnimaux.jsx";
import FormulaireSortie from "./pages/Prive/FormulaireSortie/FormulaireSortie.jsx";
import Sorties from "./pages/Prive/Sorties/Sorties.jsx";
import Prive from "./pages/Prive/Prive.jsx";
import Navbar from "./components/Nav/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Admin from "./pages/Admin/Admin.jsx";
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
    <>
      <StyledApp>
        <Navbar/>
        <Connexion/>
        <Inscription/>
        <div className="containerApp">
          <Routes>
            <Route path="/" element={<ListeAnimaux></ListeAnimaux>} />
            <Route path="/listeAnimaux" element={<ListeAnimaux></ListeAnimaux>} />
            <Route path="/prive" element={<Prive></Prive>}>
              <Route path="/prive/sorties" element={<Sorties></Sorties>}/>
              <Route path="/prive/formulaireSortie" element={<FormulaireSortie></FormulaireSortie>}/>
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
    </>
  );
};

export default App;
