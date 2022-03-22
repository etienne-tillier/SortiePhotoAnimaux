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
    overflow-y: scroll;

    .containerMapSortie{
        width:100%;
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
    }


`

const Sorties = () => {

    const {isAdmin} = useContext(UtilisateurContext)
    const [isMount, setisMount] = useState(true)
    const [selectedSortie, setselectedSortie] = useState()


      const miseAJourSortieCote = (sortie) => {
        setselectedSortie(sortie)
        console.log(sortie)
      }


    return (
        <>
        {(isMount &&
        <>
            <StyledSorties>
                <div className="containerMapSortie">
                <div className="map">
                    <Map 
                   // restaurants={(filtreSelectionnes.length == 0 ? props.restaurants : restaurantsTri)}
                    setselectedSortie={miseAJourSortieCote}
                    />
                </div>
                {(selectedSortie ?
                <SortieDetail
                    idutilisateur={selectedSortie.idutilisateur}
                    description={selectedSortie.description}
                    id={selectedSortie.id}
                    date={selectedSortie.date}
                    photos={selectedSortie.photos}
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