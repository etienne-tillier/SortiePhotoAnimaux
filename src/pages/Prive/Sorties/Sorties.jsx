import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';
import SortieDetail from '../../../components/SortieDetail/SortieDetail';
import Map from '../../../components/Map/Map';


const StyledSorties = styled.div`
    width: 100%;
    height: 100%;

    .containerMapSortie{
        width:100%;
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
    }


`

const Sorties = () => {

    const {isAdmin} = useContext(UtilisateurContext)
    const [isMount, setisMount] = useState(false)
    const [sortiesData, setsortiesData] = useState()
    const [selectedSortie, setselectedSortie] = useState()
    const [latitude, setlatitude] = useState(48.856);
    const [longitude, setlongitude] = useState(2.352);

    useEffect(() => {
        axios.get("http://localhost:5000/sorties").then((sorties) => {
            setsortiesData(sorties.data)
            console.log(sorties.data)
            setisMount(true)
        })
      }, [])

      
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
     }, [])

      const miseAJourSortie = (sortie) => {
        setselectedSortie(sortie)
        setlatitude(sortie.latitude)
        setlongitude(sortie.longitude)
      }


    return (
        <>
        {(isMount &&
        <>
            <StyledSorties>
                <div className="containerMapSortie">
                <div className="map">
                    <Map 
                    latitude={parseFloat(latitude)}
                    longitude={parseFloat(longitude)}
                    sorties={sortiesData}
                   // restaurants={(filtreSelectionnes.length == 0 ? props.restaurants : restaurantsTri)}
                    setselectedSortie={miseAJourSortie}
                    />
                </div>
                {(selectedSortie ?
                <SortieDetail
                    idutilisateur={selectedSortie.idutilisateur}
                    description={selectedSortie.Adresse}
                    id={selectedSortie.id}
                    date={selectedSortie.date}
                    >
                </SortieDetail>
                : <div> 
                    <p>En attente</p>
                </div>)}
                </div>
            </StyledSorties>
        </>
        )}
        </>
    );
};

export default Sorties;