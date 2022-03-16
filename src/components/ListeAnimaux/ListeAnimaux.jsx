import React , { useEffect, useState } from 'react';
import axios from "axios"
import FicheAnimal from '../FicheAnimal/FicheAnimal';
import styled from 'styled-components';


const StyledListeAimaux = styled.div`

    height: 100%;
    width: 100%;

    .liste{
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
    }
`

const ListeAnimaux = () => {

    const [isMount, setisMount] = useState(false)
    const [animaux, setanimaux] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/especeanimal").then((animaux) => {
            console.log(animaux.data)
            setanimaux(animaux.data)
            setisMount(true)
        })
      }, [])

    const afficherAnimaux = () => {
        return (
            Object.keys(animaux).map((key) => (
                <FicheAnimal
                    id={animaux[key].id}
                    nomespece={animaux[key].nomespece}
                    couleur={animaux[key].couleur}
                    poids={animaux[key].poidsmoyen}
                    taille={animaux[key].taille}
                    categories={animaux[key].categories}
                />
            ))
        )
    }

    return (
        (isMount ? 
        <StyledListeAimaux>
                <p>test animaux</p>
                <div className='liste'>{afficherAnimaux()}</div>
        </StyledListeAimaux>
        : null)
    );
};

export default ListeAnimaux;