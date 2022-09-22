import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';

const StyledItemPhoto = styled.div`
    display: flex;
    flex-direction: row;
    
    .imgAnimal{
        width: 50%;
    }
`

const ItemPhoto = (props) => {

    const {currentUser} = useContext(UtilisateurContext)

    useEffect(() => {
        console.log(props.data)
      }, [])

    const supprimerPhoto = (id) => {
        const del = window.confirm("Voulez vous vraiment supprimer cette photo ?")
        if (del) {
            axios.delete(process.env.REACT_APP_API + "photos/" + id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
                }).then((resp) => {
                    if (resp.status == 200){
                        props.supprimerList(props.data)
                        Notiflix.Notify.success("La photo a bien été supprimé")
                    }
                    else {
                        Notiflix.Notify.success("La photo n'a pas pu être supprimé")
                    }
                })
        }
    }

    return (
        <StyledItemPhoto>
            <pre>{props.data.id}</pre>
            <img className="imgAnimal" alt="image d'animal" src={props.data.lienfichier}/>
            <div className="btn btn-secondary">Mettre à jour</div>
            <button onClick={() => supprimerPhoto(props.data.id)}>Supprimer </button>
        </StyledItemPhoto>
    );
};

export default ItemPhoto;