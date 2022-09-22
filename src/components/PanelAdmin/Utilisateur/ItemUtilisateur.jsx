import axios from 'axios';
import React, { useEffect, useContext} from 'react';
import styled from 'styled-components';
import Notiflix from 'notiflix';
import { UtilisateurContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';



const StyledItemUtilisateur = styled.div`

    .itemUser {
        display: flex;
        flex-direction: row;
    }

`




const ItemUtilisateur = (props) => {

    const {currentUser} = useContext(UtilisateurContext)

//ajouter suppression firebase dans l'api
    const supprimerUtilisateur = (id) => {
        const supp = window.confirm("Voulez vous vraiment supprimer cet utilisateur ?")
        if (supp){
        axios.delete(process.env.REACT_APP_API + "utilisateurs/" + id, {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
              }})
        props.supprimerList(props.data)
        Notiflix.Notify.success("L'utilisateur a bien été supprimé")
        }
    }

    return (
        <StyledItemUtilisateur>
        <div className="itemUser">
            <pre>{props.data.pseudo} {props.data.email} {props.data.isadmin}</pre>
            <Link to={"/admin/panelAdmin/updateUser/" + props.data.id} >Modifier</Link>
            <button onClick={() => supprimerUtilisateur(props.data.id)}>Supprimer </button>
        </div>
        </StyledItemUtilisateur>
    );
};

export default ItemUtilisateur;