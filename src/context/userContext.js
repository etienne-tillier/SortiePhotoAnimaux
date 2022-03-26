import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UtilisateurContext = createContext();

//Le fournisseur du context à tous les composants enfants (il englobe tout et pas besoins de passer le context par les props)
function UtilisateurContextProvider(props) {

  const [currentUser, setcurrentUser] = useState()
  const [loadingData, setloadingData] = useState(true)
  const [isAdmin, setisAdmin] = useState(false)
  const navigate = useNavigate()


  //Eventlistener quand quelqu'un se connecte ou se déconnecte via l'api firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setcurrentUser(currentUser)
        console.log(currentUser)
    })

    return unsubscribe
  }, [])

  //Lorsque le currentUser change (connexion ou déconnexion), alors on lui attribue les données qui lui sont relatives dans la bd postgres et on vérifie s'il est admin
  useEffect(() => {
    //Si un utilisateur est connecté
    if (currentUser){
      let user = currentUser
      try {
        //get les sorties qui lui sont relative
        axios.get(process.env.REACT_APP_API+ "sorties/utilisateur/" + currentUser.uid).then((sorties) => {
          user.sorties = sorties.data
          try {
            //get les données users qui lui sont relative
            axios.get(process.env.REACT_APP_API+ "utilisateurs/" + currentUser.uid).then((userInfo) => {
              user.info = userInfo.data
              console.log("new user = " + JSON.stringify(user))
              console.log("userInfo " + JSON.stringify(user.info))
              setisAdmin(user.info.isadmin)
              setcurrentUser(user)
            })
          } catch (error) {
              console.log(error.message)
              navigate("/erreur/404")
          }
        })
        setloadingData(false)
      } catch (error) {
          console.log(error.message)
          navigate("/erreur/404")
      }
  }
  else {
    setisAdmin(false)
    setloadingData(false)
  }
  }, [currentUser])


  const inscription = async (email, mdp) => {
    return createUserWithEmailAndPassword(auth, email, mdp)
  }

  const connexion = async (email, mdp) => {
    return signInWithEmailAndPassword(auth, email, mdp)
  }


  const inscriptionBD = (id,pseudo,email) => {
    axios.post(process.env.REACT_APP_API+ "utilisateurs", {
      id: id,
      pseudo: pseudo,
      email: email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
      navigate("/erreur/404")
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
    <UtilisateurContext.Provider value={{modalState, toggleModals, inscription, inscriptionBD, currentUser, connexion, isAdmin}}>
      {!loadingData && props.children}
    </UtilisateurContext.Provider>
  )}

export { UtilisateurContext, UtilisateurContextProvider };
