import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
//import icone from "../../assets/img/restaurantIcone.jpg" flag
import SortieDetail from '../../../components/SortieDetail/SortieDetail'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UtilisateurContext } from '../../../context/userContext'
import utilisateurIcon from "../../../assets/img/utilisateur-map.png"
import publiqueIcon from "../../../assets/img/public-map.png"
import icone from "../../../assets/img/icone.png"
import Select from 'react-select'
import Notiflix from 'notiflix';


const StyledMap = styled.div`


    height: 100%;
    width: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: ${({selectedSortie}) => selectedSortie ? "2fr 1fr" : "1fr"};
    background-color: #ADCE74;
    padding: 2%;
    gap: 3%;

    #googleMap{
        display: block;
        border: solid black 1px;
    }

    .sortie {
        display: block;
        width: fit-content;
        height: fit-content;
    }


    #googleMap header .btn {
        width: 100%;
    }

    .btn {
        display: block;
        margin: 15px auto;
        border: 1px solid #FFF76A;
        grid-area: button;
    }

    .btn-primary {
        background-color: #61B15A;
    }

    .basic-multi-select {
        width: 75%;
    }

    .lien {
        width: 30%;
        text-decoration: none;
        grid-area: button;
    }

    .containerMapSortie{
        width:100%;
        height: 100%;

    }

    .form-group{
        margin-top: 0.9rem;
    }

    .form-group > label {
        font-weight: bold;
    }

    #select{
        grid-area: search;
    }

    .checkbox {
        width: 15%;
        margin-top: 1.1rem;
        grid-area: checkbox; 
    }

    .checkbox input {
        margin-left: 0.5rem;
    }

    .icone{
        width: 80px;
        grid-area: icon;
    }

    header{
        width: 90%;
        display: flex;
        gap: 2%;
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 10;
        margin: 0;
        padding: 0;
    }

    h1{
        color: #281414;
        user-select: none;
    }

    @media (max-width: 1270px) {
        header{
            width: 95%;
        }

        .lien {
            width: 40%;
        }

        .basic-multi-select {
            width: 65%;
         }

    }

    @media (max-width: 900px) {

        display: flex;
        flex-direction: column;

        .lien {
            width: 35%;
        }

        .basic-multi-select {
            width: 55%;
         }
         
         #googleMap{
         }

         
        

    }
    @media (max-width: 584px) {

        header{
            display: grid;
            gap: 0;
            grid-template-areas: 'icon search search search'
                                'icon button button checkbox';
        }

        .form-group{
            margin: 0;
        }

        .lien {
            width: 100%;
        }

        .basic-multi-select {
            width: 90%;
        }

        .checkbox {
            margin-top: 1.3rem;
            width: 90%;
            margin-left: 1rem;
        }


    }

`
//Composant qui gère la carte et les sorties qui y sont présenté à l'intérieur à l'aide des markers
const Map = (props) => {

    

    const [markers, setmarkers] = useState([])
    const [isMount, setisMount] = useState(false)
    const [sortiesData, setsortiesData] = useState()
    const [markerPrive, setmarkerPrive] = useState([])
    const [markerPublique, setmarkerPublique] = useState([])
    const [markerPriveData, setmarkerPriveData] = useState([])
    const [markerPubliqueData, setmarkerPubliqueData] = useState([])
    const [selectedSortie, setselectedSortie] = useState()
    const [latitude, setlatitude] = useState(48.856);
    const [longitude, setlongitude] = useState(2.352);
    const [prive, setprive] = useState(false)
    const [animaux, setAnimaux] = useState()
    const [optionSelect, setoptionSelect] = useState([])
    const [optionSelected, setoptionSelected] = useState([])
    const [ libraries ] = useState(['places']);
    const [reload, setreload] = useState(null)
    const [markerClicked, setmarkerClicked] = useState(null)


    const { currentUser, isAdmin } = useContext(UtilisateurContext)
    const {navigate} = useNavigate()


    //On get toutes les sorties
    useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_API+ "sorties", {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            }).then((sorties) => {
                setsortiesData(sorties.data)
                for (let sortie of sorties.data){ 
                    //si la sortie est à l'utilisateur (marker bleu)
                    if (sortie.idutilisateur === currentUser.uid){
                        setmarkerPriveData((current) => [...current,{
                            lat: parseFloat(sortie.latitude),
                            lng: parseFloat(sortie.longitude),
                            key: sortie.id,
                            sortie: sortie}
                    ])
                        setmarkerPrive((current) => [...current,{
                            lat: parseFloat(sortie.latitude),
                            lng: parseFloat(sortie.longitude),
                            key: sortie.id,
                            sortie: sortie}
                    ])}
                    //sinon si c'est un admin ou que la sortie n'est pas privé (marker orange)
                    else if (isAdmin || !sortie.prive){
                        setmarkerPubliqueData((current) => [...current,{
                            lat: parseFloat(sortie.latitude),
                            lng: parseFloat(sortie.longitude),
                            key: sortie.id,
                            sortie: sortie}
                    ])
                        setmarkerPublique((current) => [...current,{
                            lat: parseFloat(sortie.latitude),
                            lng: parseFloat(sortie.longitude),
                            key: sortie.id,
                            sortie: sortie}
                    ])}
                }
            })
            setisMount(true)
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
      }, [reload])

    //Pour localiser sur la map la personne
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
     }, [])

     //Get les espèces pour le select dans le header de la map
     useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_API+"especeAnimal").then((especes) => {
                setAnimaux(especes.data)
                for (let animal of especes.data){
                    setoptionSelect((current) => [...current,
                        {
                            value: animal.id,
                            label: animal.nomespece
                        }
                    ])
                }
            })  
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
    }, [])

    //Met a jour les sorties affichées en fonction de ce qui est entré dans le select
    useEffect(() => {
        if (optionSelected.length > 0){
            let newMarkerPrive = checkSelect(markerPriveData)
            let newMarkerPublique = checkSelect(markerPubliqueData)
            setmarkerPrive(newMarkerPrive)
            setmarkerPublique(newMarkerPublique)
        }
        else {
            setmarkerPrive(markerPriveData)
            setmarkerPublique(markerPubliqueData)
        }
      }, [optionSelected])



    const onDeleteSortie = async (sortie) => {
        try {
            await axios.delete(process.env.REACT_APP_API + "sorties/" + sortie.id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            })
            Notiflix.Notify.success("La sortie a bien été supprimée");
            setmarkerPrive([])
            setmarkerPublique([])
            setreload(sortie)
            setselectedSortie(null)
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
    }

    //Lorsque l'utilisateur clique sur un market (une sortie), elle s'affiche
    const miseAJourSortie = (marker) => {
        setselectedSortie(marker.sortie)
        setmarkerClicked(marker)
        setlatitude(marker.sortie.latitude)
        setlongitude(marker.sortie.longitude)
    }

    //Savoir quand l'utilisateur veut avoir que ses sorties ou pas (privé ou non)
    const handleCheckBox = (e) => {
        if(e.target.checked){
            setprive(true)
        }
        else{
            setprive(false)
        }
    }

    //Fonction qui permet d'ajouter les sorties en fonction dees especes qui ont été choisies dans le select (header de la map)
    const checkSelect = (markers) => {
        let returnList = []
        for (let marker of markers){
            for (let option of optionSelected){
                for (let espece of marker.sortie.especes){
                    if (espece.id === option.value){
                        returnList.push(marker)
                    }
                }
            }
        }
        return returnList;
    }


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    })

    const mapContainerStyle = {
        width: '100%',
        minHeight: (selectedSortie ? '75%' : '100%')
    }

    const options = {
        disableDefaultUI: true,
        zoomControl: true,

    }

    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }

    if (loadError) return "Erreur charmement de la carte"

    if (!isLoaded) return "La carte est en chargement"

    return (
        <>
        {( isMount &&
        <StyledMap selectedSortie={selectedSortie}>
            <GoogleMap
                id="googleMap"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            >
                <header>
                    <img className="icone" src={icone} alt="test"></img>
                    <Link className="lien" to="/prive/formulaireSortie">
                        <div className="btn btn-primary">Nouvelle Sortie</div>
                    </Link>
                    <Select
                    id="select"
                    options={optionSelect}
                    isMulti
                    onChange={setoptionSelected}
                    className="basic-multi-select form-group"
                    classNamePrefix="select"
                    >
                    </Select>
                    <div className="form-group checkbox">
                        <label htmlFor="prive">Prive</label>
                        <input onChange={(e) => handleCheckBox(e)} type="checkbox" id="prive" />
                    </div>
                </header>{(!prive &&
                <>
                {markerPublique.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => miseAJourSortie(marker)}
                        icon={{
                            url: publiqueIcon,
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                    >
                    </Marker>
                ))}
                </>
                )}
                {markerPrive.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => miseAJourSortie(marker)}
                        icon={{
                            url: utilisateurIcon,
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                    >
                    </Marker>
                ))}
            </GoogleMap>
            {(selectedSortie &&
            <SortieDetail
                className="sortie"
                idutilisateur={selectedSortie.idutilisateur}
                description={selectedSortie.description}
                id={selectedSortie.id}
                date={selectedSortie.date}
                photos={selectedSortie.photos}
                sortie={selectedSortie}
                onDeleteComponent={onDeleteSortie}
                >
            </SortieDetail>
            )}
            </StyledMap>
            )}
        </>
    );
};

  
export default Map;