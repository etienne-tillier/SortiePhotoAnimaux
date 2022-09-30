import axios from 'axios';
import React, { useEffect, useContext} from 'react';
import styled from 'styled-components';
import Notiflix from 'notiflix';
import { UtilisateurContext } from '../../../context/userContext';
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../Buttons/Button";



const StyledItemUtilisateur = styled.tr`

`




const ItemUtilisateur = (props) => {

    const {currentUser} = useContext(UtilisateurContext)
    const navigate = useNavigate()


//ajouter suppression firebase dans l'api
    const supprimerUtilisateur = (id) => {
        const supp = window.confirm("Voulez vous vraiment supprimer cet utilisateur ?")
        if (supp){
        axios.delete(process.env.REACT_APP_API + "utilisateurs/" + id, {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
            }
        })
        props.supprimerList(props.data)
        Notiflix.Notify.success("L'utilisateur a bien été supprimé")
        }
    }

    return (
        <StyledItemUtilisateur>
                <td>{props.data.pseudo}</td>
                <td>{props.data.email}</td>
                <td>{props.data.isadmin ? "Oui" : "Non"}</td>
                <td><Button onClick={() => {navigate("/admin/panelAdmin/updateUser/" + props.data.id)}} text="Modifier" /></td>
                <td><Button onClick={() => supprimerUtilisateur(props.data.id)} text="Supprimer" /></td>
        </StyledItemUtilisateur>
    );
};

export default ItemUtilisateur;