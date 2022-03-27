import React, {useContext} from 'react';
import {UtilisateurContext} from "../../context/userContext"
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Notiflix from 'notiflix';
//ce composant est la porte d'entrée vers les pages privées (connexion requise)
const Prive = () => {


    const {currentUser} = useContext(UtilisateurContext)

    if (!currentUser){
        return <Navigate to="/erreur/401"/>
    }

    //outlet = la page prive que l'on veut afficher
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default Prive;