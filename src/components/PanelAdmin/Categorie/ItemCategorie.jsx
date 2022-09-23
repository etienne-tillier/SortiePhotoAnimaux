import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';
import Button from "../../Buttons/Button";

const StyledItemCategorie = styled.tr`
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
                if (resp.status == 200) {
                    props.supprimerList(props.data)
                    Notiflix.Notify.success("La catégorie a bien été supprimé")
                } else {
                    Notiflix.Notify.success("La catégorie n'a pas pu être supprimé")
                }
            })
        }
    }

    return (
        <StyledItemCategorie>
            <td>{props.data.nomcategorie}</td>
            {/*TODO faire marcher le bouton modifier*/}
            <td><Button text="Modifier" /></td>
            <td><Button onClick={() => supprimerCategorie(props.data.id)} text="Supprimer" /></td>
        </StyledItemCategorie>
    )
}

export default ItemCategorie