import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../Buttons/Button";

const StyledItemAnimaux = styled.tr`
`

const ItemAnimaux = (props) => {

    const {currentUser} = useContext(UtilisateurContext)
    const navigate = useNavigate()

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
            <td>{props.data.id}</td>
            <td> {props.data.nomespece} </td>
            <td><Button onClick={() => {navigate("/admin/formulaireAnimaux/" + props.data.id)}} text="Modifier" /></td>
            <td><Button onClick={() => supprimerAnimaux(props.data.id)} text="Supprimer" /></td>
        </StyledItemAnimaux>
    );
};

export default ItemAnimaux;