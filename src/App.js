import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListeAnimaux from "./components/ListeAnimaux/ListeAnimaux.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx"
import FormulaireAnimaux from "./pages/FormulaireAnimaux/FormulaireAnimaux.jsx";
import Navbar from "./components/Nav/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
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
            <Route path="/FormulaireAnimaux" element={<FormulaireAnimaux></FormulaireAnimaux>}/>
          </Routes>
        </div>
        <Footer></Footer>
      </StyledApp>
    </>
  );
};

export default App;
