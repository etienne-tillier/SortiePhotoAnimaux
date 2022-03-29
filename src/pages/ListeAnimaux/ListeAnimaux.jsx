
import React , { useEffect, useState, useContext } from 'react';
import axios from "axios"
import FicheAnimal from '../../components/FicheAnimal/FicheAnimal';
import styled from 'styled-components';
import loupeLogo from "../../assets/img/searchIcon.png"
import { UtilisateurContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const StyledListeAimaux = styled.div`

    height: 100%;
    width: 100%;
    background-color: #ADCE74;
    overflow-y: scroll;

    header{
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        place-items: center;
        gap: 10px;
    }

    .form-outline{
        width: 30%;
    }


    .btn {
        background-color: #61B15A;
        border: 1px solid #FFF76A;
    }

    .liste{
        width: 100%;
        height: 90%;
        display: grid;
        padding: 0 10%;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        
    }
    @media (max-width: 1490px) {
        .liste {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 1100px) {
        .liste {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 750px) {
        .liste {
            grid-template-columns: 1fr;
        }
    }


    @media (max-width: 500px) {
        .liste {
            padding: 20px 0;
        }

        header{
            padding-top: 20px;
        }
    }
`

const ListeAnimaux = () => {

    const [isMount, setisMount] = useState(false)
    const [animaux, setanimaux] = useState("")
    const [animauxSorted, setanimauxSorted] = useState("")
    const [categories, setcategories] = useState("")
    const [reload, setreload] = useState(0)

    const navigate = useNavigate()
    const {isAdmin} = useContext(UtilisateurContext)

    useEffect(() => {
        //load animaux
        try {
            axios.get(process.env.REACT_APP_API+ "especeAnimal").then((animaux) => {
                setanimaux(animaux.data)
                setanimauxSorted(animaux.data)
                setisMount(true)
                //load categories
                try {
                    axios.get(process.env.REACT_APP_API+ "categorieAnimal").then((categoriesData) => {
                        let listeCategorie = []
                        for (let categorie of categoriesData.data){
                            listeCategorie.push(categorie.nomcategorie)
                        }
                        setcategories(listeCategorie)
                    })
                } catch (error) {
                    console.log(error.message)
                    navigate("/error")
                }
            })
        } catch (error) {
            console.log(error.message)
            navigate("/error")
            
        }
      }, [reload])


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
                    image={process.env.REACT_APP_API + animauxSorted[key].image}
                    setreload={setreload}
                    reload={reload}
                />
            ))
        )
    }

    //tri les animaux en fonction de ce qui est rentré dans la barre de recherche (chaine) -> fonctionne avec les noms des espèce et leur catégories(doit être écrit en entier)
    const sortAnimaux = (chaine) => {
        let sort = []
        //vérif si chaine = une catégorie
        if (categories.includes(chaine.toLowerCase())){
            for (let animal of animaux){
                //affiche tous les animaux de la catégorie en question
                for (let categorie of animal.categories){
                    if (categorie.nomcategorie.toLowerCase() === chaine.toLowerCase()){
                        sort.push(animal)
                    }
                }
            }
        }
        //sinon recherche seulement en fonction du noms des animaux et affiche ceux qui includes la chaine
        else {
            for (let animal of animaux){
                if (animal.nomespece.toLowerCase().includes(chaine.toLowerCase())){
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
                    {(isAdmin &&
                        <>
                            <Link to="/admin/formulaireAnimaux/">
                                <div className="btn btn-primary">Nouvel Animal</div>
                            </Link>
                        </>
                    )}
                    <div class="form-outline">
                    <input onChange={(e) => sortAnimaux(e.target.value)} type="search" id="form1" class="form-control" placeholder="Rechercher un animal" aria-label="Search" />
                    </div>
                </header>
                <div className='liste'>{afficherAnimaux()}</div>
        </StyledListeAimaux>
        : null)
    );
};

export default ListeAnimaux;