import axios from 'axios';
import React,  { useContext } from 'react';
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';

const StyledFicheAnimal = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;

    span{
        font-weight bold;
    }

    .nomespece{
        padding-top: 10px;
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
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        list-style: none;
    }

    .modifierAnimal{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: 10px;
    }

    .headerCategorie{
        text-align: center;
    }

    .btn-secondary {
        background-color: #61B15A;
    }

    .caracteristiques{
        padding-left: 20px;
    }

`

//Composant qui permet d'afficher les informations d'un animal
const FicheAnimal = (props) => {


    const {currentUser,isAdmin} = useContext(UtilisateurContext)
    const navigate = useNavigate()

    const afficherCategories = () => {
        return (
            Object.keys(props.categories).map((key) => (
                <li className='categorie'>{props.categories[key].nomcategorie}</li>
        ))
    )}


    const supprimerEspece = () => {
        try {
            axios.delete(process.env.REACT_APP_API+ "especeAnimal/" + props.id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            }).then((res) => {
                if (res){
                    props.setreload(props.reload + 1)
                    Notiflix.Notify.success("L'animal a bien été supprimé", { closeButton: true });
                }   
            })
        } catch (error) {
            console.error(error.message)
            navigate("/erreur/404")
        }
    }





    return (
        <StyledFicheAnimal>
            <h3 className='nomespece'>{props.nomespece}</h3>
            <img src={props.image}/>
            <div className="caracteristiques">
                <p className='couleur'><span>Couleur(s)</span> {props.couleur}</p>
                <p className='taille'><span>Taille</span> {props.taille} cm</p>
                <p className='poids'><span>Poids</span> {props.poids} kg</p>
            </div>
            <p className='headerCategorie'><span>Catégories</span></p>
            <ul><React.Fragment>{afficherCategories()}</React.Fragment></ul>
            {( isAdmin &&
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