import React , { useEffect, useState } from 'react';
import axios from "axios"
import FicheAnimal from '../FicheAnimal/FicheAnimal';
import styled from 'styled-components';
import loupeLogo from "../../assets/img/searchIcon.png"


const StyledListeAimaux = styled.div`

    height: 80%;
    width: 100%;

    header{
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    input{
        width: 30%;
        height: 25px;
    }

    .searchIcon{
        width: 30px;
        height: 30px;
    }

    .liste{
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
    }
    @media (max-width: 768px) {
        
    }
`

const ListeAnimaux = () => {

    const [isMount, setisMount] = useState(false)
    const [animaux, setanimaux] = useState("")
    const [animauxSorted, setanimauxSorted] = useState("")
    const [categories, setcategories] = useState("")

    useEffect(() => {
        //load animaux
        axios.get("http://localhost:5000/especeanimal").then((animaux) => {
            console.log(animaux.data)
            setanimaux(animaux.data)
            setanimauxSorted(animaux.data)
            setisMount(true)
            //load categories
            axios.get("http://localhost:5000/categorieAnimal").then((categoriesData) => {
                console.log(categoriesData.data)
                let listeCategorie = []
                for (let categorie of categoriesData.data){
                    listeCategorie.push(categorie.nomcategorie)
                }
                setcategories(listeCategorie)
            })
        })
      }, [])

    const afficherAnimaux = () => {
        return (
            Object.keys(animauxSorted).map((key) => (
                <FicheAnimal
                    id={animauxSorted[key].id}
                    nomespece={animauxSorted[key].nomespece}
                    couleur={animauxSorted[key].couleur}
                    poids={animauxSorted[key].poidsmoyen}
                    taille={animauxSorted[key].taille}
                    categories={animauxSorted[key].categories}
                />
            ))
        )
    }

    const sortAnimaux = (chaine) => {
        let sort = []
        if (categories.includes(chaine)){
             console.log("yes")
            for (let animal of animaux){
                for (let categorie of animal.categories){
                    if (categorie.nomcategorie == chaine){
                        sort.push(animal)
                    }
                }
            }
        }
        else {
            for (let animal of animaux){
                if (animal.nomespece.includes(chaine)){
                    sort.push(animal)
                }
            }
        }
        setanimauxSorted(sort)
    }

    return (
        (isMount ? 
        <StyledListeAimaux>
                <header>
                    <input id='searchAnimal' onChange={(e) => {sortAnimaux(e.target.value)}} type="text" />
                    <img className='searchIcon' src={loupeLogo} alt="loupe" />
                </header>
                <div className='liste'>{afficherAnimaux()}</div>
        </StyledListeAimaux>
        : null)
    );
};

export default ListeAnimaux;