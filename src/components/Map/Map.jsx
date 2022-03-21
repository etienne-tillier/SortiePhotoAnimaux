import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
//import icone from "../../assets/img/restaurantIcone.jpg" flag
import SortieDetail from '../SortieDetail/SortieDetail';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMap = styled.div`
    height: 100%;
    width: 100%;


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

    
    const [latBase, setLatBase] = useState(48.856614);
    const [longBase, setLongBase] = useState(2.3522219);
    const [selectedSortie, setselectedSortie] = useState();
    const [markers, setmarkers] = useState([])


    useEffect(() => {
        for (let sortie of props.sorties){
            setmarkers((current) => [...current, {
                lat: parseFloat(sortie.latitude),
                lng: parseFloat(sortie.longitude),
                key: sortie.id,
                sortie: sortie,
            }])
        }
      }, [])


    const libraries = ["places"]
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
        lat: props.latitude,
        lng: props.longitude
      }

    if (loadError) return "Erreur charmement de la carte"

    if (!isLoaded) return "La carte est en chargement"
    const google = window.google


     const onClickMarker = (sortie) => {
         props.setselectedSortie(sortie)
     }

    return (
        <>
        <StyledMap>
            <header>
                <h1>
                    PhotoAnimaux 
                    {/* <span>{logo ici}</span> */}
                </h1>
                <Link to="/prive/formulaireSortie">
                    <div className="btn btn-primary">Nouvelle Sortie</div>
                </Link>
                </header>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => props.setselectedSortie(marker.sortie)}
                    >
                    </Marker>
                ))}
                {/* { Object.keys(props.sorties).map((key) => {
                    return (
                        <Marker
                        id={key}
                        position={{ lat: props.sorties[key].latitude, lng: props.sorties[key].longitude }}
                        onClick={() => onClickMarker(props.sorties[key])}
                        icon={{
                            //url: icone,
                            scaledSize: new google.maps.Size(50, 50)
                        }}
                        >
                        </Marker>
                    )
                    })
                } */}
                {/* {selectedSortie && (
                        <InfoWindow
                            position={{lat: selectedSortie.latitude, lng: selectedSortie.longitude}}
                            onCloseClick={() => {
                                setselectedSortie(null);
                            }}
                        >
                                <SortieDetail
                                    idutilisateur={selectedSortie.idutilisateur}
                                    description={selectedSortie.Adresse}
                                    id={selectedSortie.id}
                                    date={selectedSortie.date}
                                />
                        </InfoWindow>
                        )} */}
            </GoogleMap>
            </StyledMap>
        </>
    );
};

  
export default Map;