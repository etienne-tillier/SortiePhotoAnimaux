import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import styled from 'styled-components'
import InputLocalisation from '../../../components/InputLocalisation/InputLocalisation';
import publiqueIcon from "../../../assets/img/public-map.png"




const StyledMapCoord = styled.div`

    height: 800px;
    width: 800px;
    background-color: #ADCE74;
    position: absolute;
    left: 62%;
    top: 10%;



`


const MapCoord = (props) => {


    const [latitude, setlatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);
    const [marker, setMarker] = useState(false);
    const [zoom, setZoom] = useState(8);
    const [ libraries ] = useState(['places']);

    //Pour localiser sur la map la personne
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
            setMarker(true)
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

    const mapHandleClick = (latLng) => {
        props.setLatLng(latLng.lat(),latLng.lng())
        setlatitude(latLng.lat)
        setlongitude(latLng.lng)
    }

      const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    })


    return ( 
        <StyledMapCoord>
            <InputLocalisation
                id="inputAddress"
                setLatitude={setlatitude}
                setLongitude={setlongitude}
                setZoom={setZoom}
            />
            <GoogleMap
                id="googleMap"
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={center}
                options={options}
                onClick={(e) => { mapHandleClick(e.latLng) }}
            >
            {(marker && 
                <Marker
                    position={{lat: latitude, lng: longitude}}
                    icon={{
                        url: publiqueIcon,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                >
                </Marker>
            )}
            </GoogleMap>
        </StyledMapCoord>
     );
}
 
export default MapCoord;