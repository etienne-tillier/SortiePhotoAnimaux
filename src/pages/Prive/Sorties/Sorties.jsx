import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import { UtilisateurContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';


const StyledSorties = styled.div`
    width: 100%;
    height: 100%;


`

const Sorties = () => {

    const {isAdmin} = useContext(UtilisateurContext)
    const [isMount, setisMount] = useState(false)
    const [sortiesData, setsortiesData] = useState()

    useEffect(() => {
        axios.get("http://localhost:5000/sorties").then((sorties) => {
            setsortiesData(sorties.data)
            console.log(sorties.data)
            setisMount(true)
        })
      }, [])


    return (
        <>
        {(isMount &&
        <>
            <header>
                <Link to="/prive/formulaireSortie">
                    <div className="btn btn-primary">Nouvelle Sortie</div>
                </Link>
            </header>
            <p>SORTIES ! !</p>
        </>
        )}
        </>
    );
};

export default Sorties;