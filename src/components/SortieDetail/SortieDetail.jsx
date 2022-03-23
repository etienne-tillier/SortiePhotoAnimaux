import React, {useState, useEffect, useContext} from 'react';
import { UtilisateurContext } from '../../context/userContext';
import axios from 'axios';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment'


const StyledSortieDetail = styled.div`
    height: 100%;
    width: 100%;
    background-color: purple;
    display: grid;
    grid-template-rows:5% 40% 43% 5%;
    gap: 10px;

    .containerGalerie{
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: 2fr 1fr;
    }


    .carouselPhoto {
        height: 80%;
        width: 80%;
    }

    .infoPhoto{
        width: 100%;
        height: 100%;
    }
`

const SortieDetail = (props) => {

const [isMount, setisMount] = useState(false)
const [utilisateur, setutilisateur] = useState()
const [description, setdescription] = useState()
const [camera, setcamera] = useState()
const [objectif, setobjectif] = useState()
const [iso, setiso] = useState()
const [ouverture, setouverture] = useState()
const [vitesse, setvitesse] = useState()

useEffect(() => {
    axios.get(process.env.REACT_APP_API+ "utilisateurs/" + props.idutilisateur).then((utilisateur) => {
        setutilisateur(utilisateur.data)
        if (props.photos.length > 0){
            setdescription(props.photos[0].description)
            setcamera(props.photos[0].camera)
            setobjectif(props.photos[0].objectif)
            setiso(props.photos[0].iso)
            setouverture(props.photos[0].ouverture)
            setvitesse(props.photos[0].vitesse)
        }
        console.log(utilisateur.data)
        setisMount(true)
    })
  }, [props.idutilisateur, props.photos])

  const handleCarousel = (index) => {
    setcamera(props.photos[index].camera)
    setdescription(props.photos[index].description)
    setobjectif(props.photos[index].objectif)
    setiso(props.photos[index].iso)
    setouverture(props.photos[index].ouverture)
    setvitesse(props.photos[index].vitesse)
  }

  const supprimerSortie = async () => {
    await axios.delete(process.env.REACT_APP_API + "sorties/" + props.id)
    props.setupdateComponent((current) => current + 1)
  }


  const mettreAJourSortie = () => {


  }

    return (
        <>
        {(isMount && 
            <StyledSortieDetail>
                <p>Sortie réalisée le {moment.utc(props.date).format('DD/MM/YYYY')} par {utilisateur.pseudo}</p>
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
                            <div>
                                <img className="imgCarousel" src={process.env.REACT_APP_API + photo.lienfichier}/>
                            </div>
                        ))}
                    </Carousel>
                    <div className="infoPhoto">
                            <p>{description}</p>
                            <p>Appareil Photo : {camera}</p>
                            <p>Objectif : {objectif}</p>
                            <p>Iso : {iso}</p>
                            <p>Ouverture : {ouverture}</p>
                            <p>Vitesse : {vitesse}</p>
                    </div>
                </div>
                )}
                <div className="modification">
                    <div className="btn btn-primary">Modifier</div>
                    <div onClick={() => supprimerSortie()} className="btn btn-warning">Supprimer</div>
                </div>
            </StyledSortieDetail>
         )}
        </>
    );
};

export default SortieDetail;