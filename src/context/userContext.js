import React, { createContext, useState, useEffect } from "react";

const UtilisateurContext = createContext();

//Le fournisseur du context à tous les composants enfants (il englobe tout et pas besoins de passer le context par les props)
function UtilisateurContextProvider(props) {
  // modal

  const [modalState, setModalState] = useState({
    signUpModal: true,
    signInModal: false,
  });


  //fonction pour gérer la fermeture et ouverture des modals
  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  //props.children = tous les enfants
  return(
    <UtilisateurContext.Provider value={{modalState, toggleModals}}>
      {props.children}
    </UtilisateurContext.Provider>
  )}

export { UtilisateurContext, UtilisateurContextProvider };
