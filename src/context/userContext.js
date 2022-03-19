import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"
import axios from "axios";


const UtilisateurContext = createContext();

//Le fournisseur du context à tous les composants enfants (il englobe tout et pas besoins de passer le context par les props)
function UtilisateurContextProvider(props) {

  const [currentUser, setcurrentUser] = useState()
  const [loadingData, setloadingData] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setcurrentUser(currentUser)
        console.log(currentUser)
        setloadingData(false)
    })

    return unsubscribe
  }, [])

  const updateUtilisateurData = async (currentUser) => {
    const sorties = await axios.get("http://localhost:5000/sorties/utilisateur/" + currentUser.uid)
    console.log(JSON.stringify(sorties.data))
    currentUser.sorties = sorties.data;
    setcurrentUser(currentUser)
    console.log(currentUser)
  }


  const inscription = async (email, mdp) => {
    return createUserWithEmailAndPassword(auth, email, mdp)
  }

  const connexion = async (email, mdp) => {
    return signInWithEmailAndPassword(auth, email, mdp)
  }

  const inscriptionBD = (id,pseudo,email) => {
    axios.post('http://localhost:5000/utilisateurs', {
      id: id,
      pseudo: pseudo,
      email: email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
  }



  // modal

  const [modalState, setModalState] = useState({
    signUpModal: false,
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
  //attendre que l'utilisateur connecté soit bien pris en compte avant d'envoyer
  return(
    <UtilisateurContext.Provider value={{modalState, toggleModals, inscription, inscriptionBD, currentUser, connexion}}>
      {!loadingData && props.children}
    </UtilisateurContext.Provider>
  )}

export { UtilisateurContext, UtilisateurContextProvider };
