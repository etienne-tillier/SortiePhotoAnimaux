import styled from "styled-components"
import Button from "../Buttons/Button";
import React, {useContext, useEffect, useState} from "react";
import { UtilisateurContext } from '../../context/userContext';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const StyledModalSortie = styled.div`
  position: absolute;
  background-color: hsl(0, 0%, 50%, 0.85);
  top: 0;
  left: 0;
  z-index: 100;
  width:100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img{
    max-width: 100vw;
    max-height: 100vh;
  }
  
  Button{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  #infos{
    position: absolute;
    bottom:0;
    left: 0;
    width: 100vw;
    height: 25vh;
    background-color: hsl(0, 0%, 50%, 0.85);
    border-top: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1%;
    padding: 0 10px
  }

  #topInfos{
    position: absolute;
    top: 0;
    width: 30vw;
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(0, 0%, 50%, 0.85);
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 0 0 20px 20px;
  }
  
  #pageCount{
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: hsl(0, 0%, 50%, 0.85);
    width: 10vw;
    height: 5vh;
    border:1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  
  #leftButton{
    position: absolute;
    max-width: 64px;
    transform: translateY(-50%);
    top: 50%;
    left: 10px;
    cursor: pointer;
  }
  
  #rightButton{
    position: absolute;
    top: 50%;
    right: 10px;
    max-width: 64px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  #infos>p{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #infos>div{
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }
  
  #hideDetails{
    position: absolute;
    top: calc(72vh - 10px);
    left: 50%;
    height: 20px;
    transform: translateX(-50%);
    cursor: pointer;
    background-color: hsl(0, 0%, 50%, 0.8);
    border: 1px solid black;
    padding: 6px 20px 4px 20px;
    border-radius: 10px 10px 0 0;
  }

  #showDetails{
    position: absolute;
    top: calc(97vh - 10px);
    left: 50%;
    height: 20px;
    transform: translateX(-50%);
    cursor: pointer;
    background-color: hsl(0, 0%, 50%, 0.8);
    border: 1px solid black;
    padding: 6px 20px 4px 20px;
    border-radius: 10px 10px 0 0;
  }

`

//Composant qui permet une uniformité des bouttons
const ModalSortie = (props) => {

    const closeModalFunc = () => {
        props.onCloseModal(false)
    }


    const date = new Date(props.date)
    const [displayDetails, setDisplayDetails] = useState(true)

    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)
    const [currentPicture, setCurrentPicture] = useState("")

    const [currentPictureDescription, setCurrentPictureDescription] = useState("")
    const [currentPictureCamera, setCurrentPictureCamera] = useState("")
    const [currentPictureObjectif, setCurrentPictureObjectif] = useState("")
    const [currentPictureISO, setCurrentPictureISO] = useState("")
    const [currentPictureOuverture, setCurrentPictureOuverture] = useState("")
    const [currentPictureVitesse, setCurrentPictureVitesse] = useState("")

    const [utilisateur, setUtilisateur] = useState()

    const { currentUser, isAdmin } = useContext(UtilisateurContext)
    const {navigate} = useNavigate()

    const monthInLetters = (month) => {
        switch (month){
            case 0:
                return "Janvier"
            case 1:
                return "Février"
            case 2:
                return "Mars"
            case 3:
                return "Avril"
            case 4:
                return "Mai"
            case 5:
                return "Juin"
            case 6:
                return "Juillet"
            case 7:
                return "Août"
            case 8:
                return "Septembre"
            case 9:
                return "Octobre"
            case 10:
                return "Novembre"
            case 11:
                return "Decembre"
            default:
                return "Mois inconnu"
        }
    }

    const setNewPicture = (index) => {
        setCurrentPicture(props.photos[index].lienfichier)
        setCurrentPictureDescription(props.photos[index].description)
        setCurrentPictureCamera(props.photos[index].camera)
        setCurrentPictureObjectif(props.photos[index].objectif)
        setCurrentPictureISO(props.photos[index].iso)
        setCurrentPictureOuverture(props.photos[index].ouverture)
        setCurrentPictureVitesse(props.photos[index].vitesse)
    }

    const goLeft = () => {
        if(currentPictureIndex===0){
            setNewPicture(props.photos.length-1)
            setCurrentPictureIndex(props.photos.length-1)
        }else{
            setNewPicture(currentPictureIndex-1)
            setCurrentPictureIndex(currentPictureIndex-1)
        }
    }

    const goRight = () => {
        if(currentPictureIndex===(props.photos.length-1)){
            setNewPicture(0)
            setCurrentPictureIndex(0)

        }else{
            setNewPicture(currentPictureIndex+1)
            setCurrentPictureIndex(currentPictureIndex+1)
        }
    }

    //FIXME +3 au jours pour aucune raison
    const dateString = date.getDay() + " " + monthInLetters(date.getMonth()) + " " + date.getFullYear()

    const hideDetails = () => {
        setDisplayDetails(false)
    }

    const showDetails = () => {
        setDisplayDetails(true)
    }

    const getUserFromId = (id) => {
        try {
            //Get les infos de l'utilisateur qui a crée la sortie
            axios.get(process.env.REACT_APP_API+ "utilisateurs/" + id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
            }).then((utilisateur) => {
                console.log(utilisateur.data)
                setUtilisateur(utilisateur.data.pseudo)
            })
        } catch (error) {
            console.error(error.message)
            navigate("/erreur/404")
        }
    }

    useEffect(() => {
        getUserFromId(props.idutilisateur)
        if(props.photos.length > 0){
            setCurrentPicture(props.photos[currentPictureIndex].lienfichier)

            setCurrentPictureDescription(props.photos[currentPictureIndex].description)
            setCurrentPictureCamera(props.photos[currentPictureIndex].camera)
            setCurrentPictureObjectif(props.photos[currentPictureIndex].objectif)
            setCurrentPictureISO(props.photos[currentPictureIndex].iso)
            setCurrentPictureOuverture(props.photos[currentPictureIndex].ouverture)
            setCurrentPictureVitesse(props.photos[currentPictureIndex].vitesse)
        }
    }, [])

    //{props.photos}
    //{props.sortie.latitude}
    //                 {props.sortie.longitude}

    // TODO Ameliorer le système de zoom en lisant la doc : https://github.com/prc5/react-zoom-pan-pinch?ref=morioh.com&utm_source=morioh.com
    return (
        <StyledModalSortie>
            <TransformWrapper>
                <TransformComponent>
                    <img src={currentPicture}  alt="Aucune image disponible pour cette sortie"/>
                </TransformComponent>
            </TransformWrapper>

            <Button onClick={closeModalFunc} text={"Fermer"}></Button>
            <div id="topInfos">
                <p>Sortie de {utilisateur}, le {dateString}</p>
            </div>
            {(displayDetails &&
                <img id="hideDetails" onClick={hideDetails} src={require("../../assets/img/down-chevron.png")}/>
            )}
            {(!displayDetails &&
                <img src={require("../../assets/img/up-chevron.png")} id="showDetails" onClick={showDetails} />
            )}

            {(displayDetails &&
                <div id="infos">
                    <p>Description de la sortie :<br/>{props.description}</p>
                    {(currentPicture!=="" &&
                        <>
                            <p>Description de la photo:<br/>{currentPictureDescription}</p>
                            <div id="infosAppareil">
                                <pre>Caméra: {currentPictureCamera}<br/>
                                Objectif: {currentPictureObjectif}<br/>
                                ISO: {currentPictureISO}<br/>
                                Ouverture: {currentPictureOuverture}<br/>
                                Vitesse: {currentPictureVitesse}</pre>
                            </div>
                        </>
                    )}
                </div>
            )}

            {(props.photos.length!==0 &&
                <>
                    <div id="pageCount">
                        <p>{currentPictureIndex+1} sur {props.photos.length}</p>
                    </div>
                </>
            )}
            {(props.photos.length>1 &&
                <>
                    <img id="leftButton" onClick={goLeft} src={require("../../assets/img/left-arrow.png")} alt="go left" />
                    <img id="rightButton" onClick={goRight} src={require("../../assets/img/right-arrow.png")} alt="go right" />
                </>
            )}

        </StyledModalSortie>
    )
}

export default ModalSortie;