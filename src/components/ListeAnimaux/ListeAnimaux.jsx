import React , { useEffect, useState } from 'react';
import axios from "axios"
import FicheAnimal from '../FicheAnimal/FicheAnimal';

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
                />
            ))
        )
    }

    return (
        (isMount ? 
        <React.Fragment>
            <div>
                <p>test animaux</p>
                <div>{afficherAnimaux()}</div>
            </div>
        </React.Fragment>
        : null)
    );
};

export default ListeAnimaux;