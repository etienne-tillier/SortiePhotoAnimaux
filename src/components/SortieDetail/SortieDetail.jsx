import React, {useState, useEffect, useContext} from 'react';
import { UtilisateurContext } from '../../context/userContext';
import axios from 'axios';
import styled from 'styled-components';


const StyledSortieDetail = styled.div`
    height: 100%;
    width: 100%;
    background-color: purple;
`

const SortieDetail = (props) => {

const [isMount, setisMount] = useState(false)
const [utilisateur, setutilisateur] = useState()

useEffect(() => {
    axios.get("http://localhost:5000/utilisateurs/" + props.idutilisateur).then((utilisateur) => {
        setutilisateur(utilisateur.data)
        setisMount(true)
    })
  }, [])

    return (
        <>
        {(isMount && 
            <StyledSortieDetail>
                <p>{props.date}</p>
                <h4>{utilisateur.pseudo}</h4>
                <p>{props.description}</p>
            </StyledSortieDetail>
         )}
        </>
    );
};

export default SortieDetail;