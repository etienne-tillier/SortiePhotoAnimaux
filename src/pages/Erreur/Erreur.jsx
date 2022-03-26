import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledError = styled.div`
    height: 100%;
    width: 100%;
    background-color: #ADCE74;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
//Page qui affiche les erreurs
const Erreur = (props) => {

    const [typeErreur, settypeErreur] = useState("non définie")

    //On regarde de quelle erreur il s'agit
    useEffect(() => { 
        if (props.erreur){
            settypeErreur(props.erreur)
        }
     }, [])

    return (
        <StyledError>
            <h2>Oops, une erreur est survenue. Pour revenir à la page d'accueil, veuillez cliquer <Link to={"/"}>ici</Link></h2>
            <h3>(Erreur : {typeErreur})</h3>
        </StyledError>
    );
};

export default Erreur;