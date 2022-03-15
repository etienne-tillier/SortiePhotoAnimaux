import React from 'react';

const FicheAnimal = (props) => {



    return (
        <React.Fragment>
            <h3>{props.nomespece}</h3>
            <p>{props.couleur}</p>
            <p>{props.taille}</p>
            <p>{props.poids}</p>
        </React.Fragment>
    );
};

export default FicheAnimal;