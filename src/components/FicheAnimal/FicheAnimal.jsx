import React from 'react';
import styled from "styled-components"

const StyledFicheAnimal = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;

`

const FicheAnimal = (props) => {

    const afficherCategories = () => {
        return (
            Object.keys(props.categories).map((key) => (
                <li className='categorie' value={props.categories[key]}/>
        ))
    }


    return (
        <StyledFicheAnimal>
            <h3 className='nomespece'>{props.nomespece}</h3>
            <p className='couleur'>{props.couleur}</p>
            <p className='taille'>{props.taille}</p>
            <p className='poids'>{props.poids}</p>
            <ul><React.Fragment>{afficherCategories}</React.Fragment></ul>
        </StyledFicheAnimal>
    );
};

export default FicheAnimal;