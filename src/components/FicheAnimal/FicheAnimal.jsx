import axios from 'axios';
import React,  { useContext } from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';

const StyledFicheAnimal = styled.div`
    width: 400px;
    border: 1px solid black;
    border-radius: 10px;

    span{
        font-weight bold;
    }

    .nomespece{
        text-align: center;
    }

    img {
        max-width: 300px;
        height: 200px;
        object-fit: cover;
        margin: 20px 0px;
        display: block;
        margin-left: auto;
        margin-right: auto 

    }

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        list-style: none;
    }

    .modifierAnimal{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .headerCategorie{
        text-align: center;
    }

    .btn-secondary {
        background-color: #61B15A;
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
        axios.delete(process.env.REACT_APP_API+ "especeAnimal/" + props.id).then((res) => {
            if (res){
                props.setreload(props.reload + 1)
            }   
            else {
                console.log("Une erreur est survenue lors de la suppression")
            }
        })
    }

    const {isAdmin} = useContext(UtilisateurContext)




    return (
        <StyledFicheAnimal>
            <h3 className='nomespece'>{props.nomespece}</h3>
            <img src={props.image}/>
            <p className='couleur'><span>Couleur(s)</span> {props.couleur}</p>
            <p className='taille'><span>Taille</span> {props.taille} cm</p>
            <p className='poids'><span>Poids</span> {props.poids} kg</p>
            <p className='headerCategorie'><span>Catégories</span></p>
            <ul><React.Fragment>{afficherCategories()}</React.Fragment></ul>
            {(isAdmin && 
                <div className="modifierAnimal">
                    <Link to={"/admin/formulaireAnimaux/" + props.id}>
                        <div className="btn btn-secondary">Mettre à jour</div>
                    </Link>
                    <div onClick={supprimerEspece} className="btn btn-secondary">Supprimer</div>
                </div>
            )}
        </StyledFicheAnimal>
    );
};

export default FicheAnimal;