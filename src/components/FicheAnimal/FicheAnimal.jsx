import axios from 'axios';
import React,  { useContext, useState } from 'react';
import styled from "styled-components"
import {Link, Redirect, useNavigate} from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';
import Button from "../Buttons/Button";

const StyledFicheAnimal = styled.a`
    -webkit-box-shadow: 0 0 6px -2px rgba(0,0,0,0.78);
    box-shadow: 0 0 6px -2px rgba(0,0,0,0.78);
    border-radius: 3px;
    color: black;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    //align-items: center;

    span{
        font-weight: bold;
    }

    a {
        text-decoration: none;
        color: black;
        transition: 0.2s;

        //:hover {
        //    cursor: pointer;
        //    color: white;
        //}
    }

    .nomespece{
        text-align: center;
        padding: 5px 0;
        margin: 0;
    }

    img {
        max-width: 75%;
        height: 150px;
        object-fit: cover;
        margin: 0 auto;
        display: block;
    }

    ul {
        padding: 0;
        margin: 5px 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        list-style: none;
        gap: 5px;
    }

    .modifierAnimal{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding-bottom: 5px;
    }

    .headerCategorie{
        text-align: center;
        margin: 0;
    }

    .btn-secondary {
        background-color: #61B15A;
    }

    .caracteristiques{
        padding-left: 20px;
    }
    
    .bottomSection{
        display: flex;
        flex-direction: column;
        margin-top: auto;
    }

`

//Composant qui permet d'afficher les informations d'un animal
const FicheAnimal = (props) => {


    const {currentUser,isAdmin} = useContext(UtilisateurContext)
    const [lienWiki, setLienWiki] = useState("https://fr.wikipedia.org/wiki/" + props.nomespece)
    const navigate = useNavigate()


    const afficherCategories = () => {
        return (
            Object.keys(props.categories).map((key) => (
                <li className='categorie'>{props.categories[key].nomcategorie}</li>
        ))
    )}


    const supprimerEspece = () => {
        const supp = window.confirm("Voulez vous vraiment supprimer cet espèce ?")
        if (supp){
            try {
                axios.delete(process.env.REACT_APP_API+ "especeAnimal/" + props.id, {
                    headers: {
                        authorization: 'Bearer ' + currentUser.accessToken
                    }
                }).then((res) => {
                    if (res){
                        props.setreload(props.reload + 1)
                        Notiflix.Notify.success("L'animal a bien été supprimé");
                    }   
                })
            } catch (error) {
                console.error(error.message)
                navigate("/erreur/404")
            }
        }
    }


    return (
        <StyledFicheAnimal href={lienWiki} target="_blank" rel="noreferrer">
                <h3 className='nomespece'>{props.nomespece}</h3>
                <img src={props.image}/>
                <div className="caracteristiques">
                    <p className='couleur'><span>Couleur(s)</span> {props.couleur}</p>
                    <p className='taille'><span>Taille</span> {props.taille} cm</p>
                    <p className='poids'><span>Poids</span> {props.poids} kg</p>
                </div>
                <p className='headerCategorie'><span>Catégories</span></p>
                <ul><React.Fragment>{afficherCategories()}</React.Fragment></ul>
                <div className="bottomSection">
                    {( isAdmin &&
                        <div className="modifierAnimal">
                            <Link to={"/admin/formulaireAnimaux/" + props.id}>
                                <Button text={"Mettre à jour"}></Button>
                            </Link>
                            <Button onClick={supprimerEspece} text={"Supprimer"}></Button>
                        </div>
                    )}
                    <Button
                        className="sortieButton"
                        text="Voir les sorties"
                        onClick={ event => {
                            event.preventDefault()
                            navigate("/prive/sorties/" + props.id)
                        }
                    }/>
                </div>
        </StyledFicheAnimal>
    );
};

export default FicheAnimal;