import React, { useState, useEffect,useContext} from 'react';


import {UtilisateurContext} from "../../context/userContext"
import { Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import Notiflix from 'notiflix';
//ce composant est la porte d'entrée vers les pages privées (connexion requise)
const Prive = () => {


    const {currentUser} = useContext(UtilisateurContext)
    const navigate = useNavigate()
    const [isMount, setisMount] = useState(false)


    useEffect(() => {
        if (!currentUser){
            Notiflix.Notify.failure("Veuillez vous connecter")
            navigate("/")
            setisMount(true)
        }
        else{
            setisMount(true)
        }
      }, [])
    

    //outlet = la page prive que l'on veut afficher
    return (
        <>
            {(isMount &&
                <Outlet></Outlet>
            )}
        </>
    );
};

export default Prive;