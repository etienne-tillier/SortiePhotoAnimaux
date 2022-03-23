import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
//import icone from "../../assets/img/restaurantIcone.jpg" flag
import SortieDetail from '../SortieDetail/SortieDetail'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UtilisateurContext } from '../../context/userContext'
import utilisateurIcon from "../../assets/img/utilisateur-map.png"
import publiqueIcon from "../../assets/img/public-map.png"
import icone from "../../assets/img/icone.png"
import Select from 'react-select'


const StyledMap = styled.div`
    height: 100%;
    width: 100%;


    .icone{
        width: 80px;
    }

    header{
        width: 50%;
        display: flex;
        gap: 2rem;
        position: absolute;
        top: 9rem;
        left: 1rem;
        z-index: 10;
        margin: 0;
        padding: 0;
    }

    h1{
        color: #281414;
        user-select: none;
    }

`

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


    const { isAdmin, currentUser } = useContext(UtilisateurContext)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+ "sorties").then((sorties) => {
            setsortiesData(sorties.data)
            console.log(sorties.data)
            for (let sortie of sorties.data){
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
                else if (isAdmin || !sortie.prive){
                    setmarkerPubliqueData((current) => [...current,{
                        lat: parseFloat(sortie.latitude),
                        lng: parseFloat(sortie.longitude),
                        key: sortie.id,
                        sortie}
                ])
                    setmarkerPublique((current) => [...current,{
                        lat: parseFloat(sortie.latitude),
                        lng: parseFloat(sortie.longitude),
                        key: sortie.id,
                        sortie}
                ])}
            }
            setisMount(true)
        })
      }, [props.updateComponent])

      
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
     }, [])

     useEffect(() => {
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
    }, [])


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


      const miseAJourSortie = (sortie) => {
        setselectedSortie(sortie)
        setlatitude(sortie.latitude)
        setlongitude(sortie.longitude)
        props.setselectedSortie(sortie)
      }

      const handleCheckBox = (e) => {
        if(e.target.checked){
            setprive(true)
        }
        else{
            setprive(false)
        }
      }


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
        height: '100%'
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
        <StyledMap>
            <header>
                <img className="icone" src={icone} alt="test"></img>
                <Link to="/prive/formulaireSortie">
                    <div className="btn btn-primary">Nouvelle Sortie</div>
                </Link>
                <Select
                options={optionSelect}
                isMulti
                onChange={setoptionSelected}
                className="basic-multi-select"
                classNamePrefix="select"
                >
                </Select>
                <div className="form-group">
                            <label htmlFor="prive">Prive</label>
                            <input onChange={(e) => handleCheckBox(e)} type="checkbox" id="prive" />
                        </div>
                </header>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            >{(!prive &&
                <>
                {markerPublique.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => miseAJourSortie(marker.sortie)}
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
                        onClick={() => miseAJourSortie(marker.sortie)}
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
            </StyledMap>
            )}
        </>
    );
};

  
export default Map;