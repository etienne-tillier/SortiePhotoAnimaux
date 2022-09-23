import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';
import xMark from "../../../assets/img/xmark.svg"
import { Link } from 'react-router-dom';

const StyledItemPhoto = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    -webkit-box-shadow: 0 0 6px -2px rgba(0,0,0,0.78);
    box-shadow: 0 0 6px -2px rgba(0,0,0,0.78);
    
    .imgAnimal {
        max-width: 100%;
        max-height: 300px;
    }
    
    .xMark{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
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
            {/*<pre>{props.data.id}</pre>*/}
            <img className="imgAnimal" alt="image d'animal" src={props.data.lienfichier}/>
            <img className="xMark" src={xMark} onClick={() => supprimerPhoto(props.data.id)} />
        </StyledItemPhoto>
    );
};

export default ItemPhoto;