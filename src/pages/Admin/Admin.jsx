import React, {useContext} from 'react';
import {UtilisateurContext} from "../../context/userContext"
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//ce composant est la porte d'entrée vers les pages admin (connexion requise)
const Admin = () => {


    const {currentUser, isAdmin} = useContext(UtilisateurContext)

    if (!currentUser || !isAdmin){
        return <Navigate to="/erreur/403"/>
    }

    //outlet = la page admin que l'on veut afficher
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default Admin;