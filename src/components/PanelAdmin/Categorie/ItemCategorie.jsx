import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';

const StyledItemCategorie = styled.div`
    display: flex;
    flex-direction: row;
`

const ItemCategorie = (props) => {

    const {currentUser} = useContext(UtilisateurContext)

    const supprimerCategorie = (id) => {
        const del = window.confirm("Voulez vous vraiment supprimer cette catégorie ?")
        if (del) {
            axios.delete(process.env.REACT_APP_API + "categorieAnimal/" + id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
                }).then((resp) => {
                    if (resp.status == 200){
                        props.supprimerList(props.data)
                        Notiflix.Notify.success("La catégorie a bien été supprimé")
                    }
                    else {
                        Notiflix.Notify.success("La catégorie n'a pas pu être supprimé")
                    }
                })
        }
    }

    return (
        <StyledItemCategorie>
            <pre>{props.data.nomcategorie} </pre>
            <button>Modifier </button>
            <button onClick={() => supprimerCategorie(props.data.id)}>Supprimer </button>
        </StyledItemCategorie>
    );
};

export default ItemCategorie;