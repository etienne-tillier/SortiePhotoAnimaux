import axios from 'axios';
import React, { useEffect, useContext} from 'react';
import styled from 'styled-components';
import Notiflix from 'notiflix';
import { UtilisateurContext } from '../../../context/userContext';
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../Buttons/Button";
import { useState } from 'react';
import ModalSortie from '../../ModalSortie/ModalSortie';



const StyledItemSortie = styled.tr`

`




const ItemSortie = (props) => {

    const {currentUser} = useContext(UtilisateurContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

//ajouter suppression firebase dans l'api
    const supprimerSortie = (id) => {
        const supp = window.confirm("Voulez vous vraiment supprimer cette sortie ?")
        if (supp){
        axios.delete(process.env.REACT_APP_API + "sorties/" + id, {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
            }
        })
        props.supprimerList(props.data)
        Notiflix.Notify.success("La sortie a bien été supprimée")
        }
    }

    const afficherEspeces = () => {
        return (          
            Object.keys(props.data.especes).map((key) => (
                <p>{props.data.especes[key].nomespece}</p>
            ))
            )
    }

    const closeModal = (bool) => {
        setIsModalOpen(bool)
    }

    return (
        <StyledItemSortie>
            {isModalOpen && 
                <ModalSortie
                className="sortie"
                idutilisateur={props.data.idutilisateur}
                description={props.data.description}
                id={props.data.id}
                date={props.data.date}
                photos={props.data.photos}
                sortie={props.data}
                onDeleteComponent={supprimerSortie}
                //closeModal={() => {setSelectedSortie(null)}}
                onCloseModal = {closeModal}
                >
            </ModalSortie>
            }
                <td>{props.data.idutilisateur}</td>
                <td>{props.data.date}</td>
                <td>
                    {afficherEspeces()}
                </td>
                <td><Button onClick={() => {setIsModalOpen(true)}} text="Voir" /></td>
                <td><Button onClick={() => {navigate("/admin/panelAdmin/updateUser/" + props.data.id)}} text="Modifier" /></td>
                <td><Button onClick={() => supprimerSortie(props.data.id)} text="Supprimer" /></td>
        </StyledItemSortie>
    );
};

export default ItemSortie;