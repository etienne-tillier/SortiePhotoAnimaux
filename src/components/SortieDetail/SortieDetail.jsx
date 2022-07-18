import React, {useState, useEffect, useContext} from 'react';
import { UtilisateurContext } from '../../context/userContext';
import axios from 'axios';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';

const StyledSortieDetail = styled.div`



    min-height: fit-content;
    height: 100%;
    width: 100%;
    border: 1px solid black;
    background-color: #61B15A;
    display: grid;
    ${({photos}) => photos > 0 ? "grid-template-areas: " + "'galerie galerie galerie galerie''galerie galerie galerie galerie''galerie galerie galerie galerie ''realisation realisation realisation realisation''desc desc desc desc ''desc desc desc desc ''desc desc desc desc ''modif modif modif modif '" : "grid-template-areas:" + "'realisation realisation realisation realisation' 'desc desc desc desc' 'desc desc desc desc' 'desc desc desc desc' 'modif modif modif modif'"}; 
    gap: 10px;

    .containerGalerie{
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-area: galerie;
        margin-top: 1rem;
    }

    .lien{
        text-decoration: none;
        width: 50%;
    }

    .btn {
        width: 50%;
        background-color: #ffc107;
        color: #000;
    }

    .btn-warning {
        width: 25%;
    }


    .imgCarousel{
        max-width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h6 {
        font-weight: bold;
        margin-bottom: 0.2rem;
    }

    p {
        margin-bottom: 0.4rem;
    }

    .carouselPhoto {
        height: 80%;
        width: 80%;
        display: block;
        margin: 0 auto;
    }

    .modification {
        height: 100%;
        width: 100%;
        grid-area: modif;
        display: flex;
        grid-template-columns: 1fr 1fr;
        justify-content: space-evenly;
        align-items: center;
    }

    #realisation{
        text-align: center;
        grid-area: realisation;
        font-weight: bold;
    }

    .descriptionSortie{
        grid-area: desc;
        overflow-wrap: anywhere;
        padding: 0 1rem;
    }


    .infoPhoto{
        width: 100%;
        height: 100%;
        font-size: 0.7rem;
        overflow-wrap: anywhere;
        padding-right: 1rem;
    }

    @media (max-width: 1000px) {
        .containerGalerie{
            display: flex;
            flex-direction: column;
        }

        .btn {
            width: 70%;
        }

        .btn-warning {
            width: 35%;
        }
    }

    @media (max-width: 900px) {
        .containerGalerie{
            display: grid;
            grid-template-columns: 2fr 1fr ;
        }
        
        .carouselPhoto {
            height: 50%;
            width: 50%;
        }

        .btn {
            width: 50%;
        }

        .btn-warning {
            width: 25%;
        }
    }

    @media (max-width: 600px) {
        .carouselPhoto {
            margin: auto;
        }
    }
`


//Composant qui affiche une sortie dans les détails
const SortieDetail = (props) => {

const [isMount, setisMount] = useState(false)
const [utilisateur, setutilisateur] = useState()
const [description, setdescription] = useState()
const [camera, setcamera] = useState()
const [objectif, setobjectif] = useState()
const [iso, setiso] = useState()
const [ouverture, setouverture] = useState()
const [vitesse, setvitesse] = useState()

const {currentUser, isAdmin} = useContext(UtilisateurContext)
const navigate = useNavigate()


//Charge les données manquantes pour la sortie affichée dans le composant
useEffect(() => {
    try {
        //Get les infos de l'utilisateur qui a crée la sortie
        axios.get(process.env.REACT_APP_API+ "utilisateurs/" + props.idutilisateur, {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
              }
        }).then((utilisateur) => {
            setutilisateur(utilisateur.data)
            if (props.photos.length > 0){
                setdescription(props.photos[0].description)
                setcamera(props.photos[0].camera)
                setobjectif(props.photos[0].objectif)
                setiso(props.photos[0].iso)
                setouverture(props.photos[0].ouverture)
                setvitesse(props.photos[0].vitesse)
            }
            setisMount(true)
        })
    } catch (error) {
        console.error(error.message)
        navigate("/erreur/404")
    }
  }, [props.idutilisateur, props.photos])


  //Lorsque l'on change de photo dans le carouse -> met à jour les infos de la photo qui a changé
  const handleCarousel = (index) => {
    setcamera(props.photos[index].camera)
    setdescription(props.photos[index].description)
    setobjectif(props.photos[index].objectif)
    setiso(props.photos[index].iso)
    setouverture(props.photos[index].ouverture)
    setvitesse(props.photos[index].vitesse)
  }



    return (
        <>
        {(isMount && 
            <StyledSortieDetail photos={props.photos.length}>
                <p id="realisation">Sortie réalisée le {moment.utc(props.date).format('DD/MM/YYYY')} par {utilisateur.pseudo}</p>
                <div className="descriptionSortie">
                    <h5>Description de la sortie</h5>
                    <p>{props.description}</p>
                </div>
                {( props.photos.length > 0 &&
                <div className="containerGalerie">
                    <Carousel
                        className='carouselPhoto'
                        onChange={(index) => handleCarousel(index)}
                        showThumbs={false}
                        showIndicators={false}
                      >
                        {props.photos.map((photo) => (
                                <img className="imgCarousel" src={photo.lienfichier}/>
                        ))}
                    </Carousel>
                    <div className="infoPhoto">
                            <p>{description}</p>
                            <h6>Appareil Photo :</h6>
                            <p>{camera}</p>
                            <h6>Objectif :</h6>
                            <p>{objectif}</p>
                            <h6>Iso :</h6>
                            <p>{iso}</p>
                            <h6>Ouverture :</h6>
                            <p>{ouverture}</p>
                            <h6>Vitesse :</h6>
                            <p>{vitesse}</p>
                    </div>
                </div>
                )}
                {((currentUser.uid === utilisateur.id || isAdmin) &&
                <div className="modification">
                    <Link  className="lien" to={"/prive/formulaireSortie/" + props.id}>
                        <div className="btn">Modifier</div>
                    </Link>
                    <div onClick={() => props.onDeleteComponent(props.sortie)} className="btn btn-warning">Supprimer</div>
                </div>
                )}
            </StyledSortieDetail>
         )}
        </>
    );
};

export default SortieDetail;