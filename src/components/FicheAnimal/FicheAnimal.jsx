import axios from 'axios';
import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

const StyledFicheAnimal = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;

    img {
        max-width: 200px;
        max-height: 200px;
    }

`

const FicheAnimal = (props) => {

    const afficherCategories = () => {
        return (
            Object.keys(props.categories).map((key) => (
                <li className='categorie'>{props.categories[key].nomcategorie}</li>
        ))
    )}


    const supprimerEspece = () => {
        axios.delete("http://localhost:5000/especeAnimal/" + props.id).then((res) => {
            if (res){
                props.setreload(props.reload + 1)
            }   
            else {
                console.log("Une erreur est survenue lors de la suppression")
            }
        })
    }

    const updateEspece = () => {

    }


    return (
        <StyledFicheAnimal>
            <h3 className='nomespece'>{props.nomespece}</h3>
            <img src={props.image}/>
            <p className='couleur'>{props.couleur}</p>
            <p className='taille'>{props.taille}</p>
            <p className='poids'>{props.poids}</p>
            <ul><React.Fragment>{afficherCategories()}</React.Fragment></ul>
            <Link to={"/prive/formulaireAnimaux/" + props.id}>
                <div onClick={updateEspece} className="btn btn-secondary">Mettre à jour</div>
            </Link>
            <div onClick={supprimerEspece} className="btn btn-secondary">Supprimer</div>
        </StyledFicheAnimal>
    );
};

export default FicheAnimal;