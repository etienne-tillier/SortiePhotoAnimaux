import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import styled from 'styled-components'

const StyledMapCoord = styled.div`

    height: 400px;
    width: 400px;
    background-color: blue;
    position: absolute;
    left: 70%;
    top: 35%;


`


const MapCoord = (props) => {


    const [latitude, setlatitude] = useState(48.856);
    const [longitude, setlongitude] = useState(2.352);
    const [ libraries ] = useState(['places']);

    //Pour localiser sur la map la personne
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
        }, [])

    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    }

    const options = {
        // disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,

    }

    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }

      const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    })


    return ( 
        <StyledMapCoord>
            <GoogleMap
                id="googleMap"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={(e) => {props.setLatLng(e.latLng.lat(),e.latLng.lng())}}
            >
            </GoogleMap>
        </StyledMapCoord>
     );
}
 
export default MapCoord;