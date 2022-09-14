import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';

const StyledItemAnimaux = styled.div`
    display: flex;
    flex-direction: row;
`

const ItemAnimaux = (props) => {

    const {currentUser} = useContext(UtilisateurContext)

    const supprimerAnimaux = (id) => {
        const del = window.confirm("Voulez vous vraiment supprimer cet animal ?")
        if (del) {
            axios.delete(process.env.REACT_APP_API + "especeAnimal/" + id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
                }).then((resp) => {
                    if (resp.status == 200){
                        props.supprimerList(props.data)
                        Notiflix.Notify.success("L'animal a bien été supprimé")
                    }
                    else {
                        Notiflix.Notify.success("L'animal n'a pas pu être supprimé")
                    }
                })
        }
    }

    return (
        <StyledItemAnimaux>
            <pre>{props.data.id} {props.data.nomespece} </pre>
            <Link to={"/admin/formulaireAnimaux/" + props.data.id}>
                <div className="btn btn-secondary">Mettre à jour</div>
            </Link>
            <button onClick={() => supprimerAnimaux(props.data.id)}>Supprimer </button>
        </StyledItemAnimaux>
    );
};

export default ItemAnimaux;