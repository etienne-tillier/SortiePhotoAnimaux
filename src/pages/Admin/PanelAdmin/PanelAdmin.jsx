import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from "axios"
import { UtilisateurContext } from '../../../context/userContext';
import PanelAnimaux from '../../../components/PanelAdmin/Animaux/PanelAnimaux';
import PanelCategorie from '../../../components/PanelAdmin/Categorie/PanelCategorie';
import PanelPhoto from '../../../components/PanelAdmin/Photo/PanelPhoto';
import PanelSortie from '../../../components/PanelAdmin/Sortie/PanelSortie';
import PanelUtilisateur from '../../../components/PanelAdmin/Utilisateur/PanelUtilisateur';

const StyledPanelAdmin = styled.div`

    .panelMenu{
        display: flex;
        list-style: none;
        gap: 10px;
        justify-content: center;
        align-items: center;
        -webkit-box-shadow: 0 4px 7px -2px rgba(0,0,0,0.34);
        box-shadow: 0 4px 7px -2px rgba(0,0,0,0.34);
        margin: 0;
        padding: 10px 0;
    }

    .itemMenu{
        font-weight: bold;
    }
    
    .itemMenu:hover{
        cursor: pointer;
        color: var(--green3);
    }


`

const PanelAdmin = () => {

    const [users, setUsers] = useState(null)
    const [animaux, setAnimaux] = useState(null)
    const [categories, setCategories] = useState(null)
    const [sorties, setSorties] = useState(null)
    const [photos, setPhotos] = useState(null)
    const [isUsers, setIsUsers] = useState(true)
    const [isAnimaux, setIsAnimaux] = useState(false)
    const [isCategories, setIsCategories] = useState(false)
    const [isSorties, setIsSorties] = useState(false)
    const [isPhotos, setIsPhotos] = useState(false)
    const [isMount, setIsMount] = useState(false)
    const {currentUser} = useContext(UtilisateurContext)


    useEffect(() => { 
        axios.get(process.env.REACT_APP_API+ "utilisateurs", {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
            }
        }).then((users) => {
            setUsers(users.data)
            axios.get(process.env.REACT_APP_API+ "especeAnimal", {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
            }).then((animaux) => {
                setAnimaux(animaux.data)
                axios.get(process.env.REACT_APP_API+ "categorieAnimal", {
                    headers: {
                        authorization: 'Bearer ' + currentUser.accessToken
                    }
                }).then((categories) => {
                    setCategories(categories.data)
                    axios.get(process.env.REACT_APP_API+ "sorties", {
                        headers: {
                            authorization: 'Bearer ' + currentUser.accessToken
                        }
                    }).then((sorties) => {
                        setSorties(sorties.data)
                        axios.get(process.env.REACT_APP_API+ "photos", {
                            headers: {
                                authorization: 'Bearer ' + currentUser.accessToken
                            }
                        }).then((photos) => {
                            setPhotos(photos.data)
                            setIsMount(true)
                        })
                    })
                })
            })
        })
    }, [])


    const choixMenu = (choice) => {
        if (choice === "user"){
            setIsUsers(true)
            setIsAnimaux(false)
            setIsCategories(false)
            setIsPhotos(false)
            setIsSorties(false)
        }
        else if (choice === "photo"){
            setIsUsers(false)
            setIsAnimaux(false)
            setIsCategories(false)
            setIsPhotos(true)
            setIsSorties(false)
        }
        else if (choice === "sortie"){
            setIsUsers(false)
            setIsAnimaux(false)
            setIsCategories(false)
            setIsPhotos(false)
            setIsSorties(true)
        }
        else if (choice === "categorie"){
            setIsUsers(false)
            setIsAnimaux(false)
            setIsCategories(true)
            setIsPhotos(false)
            setIsSorties(false)
        }
        else if (choice === "animaux"){
            setIsUsers(false)
            setIsAnimaux(true)
            setIsCategories(false)
            setIsPhotos(false)
            setIsSorties(false)
        }
    }


    const supprimerUtilisateurList = (user) => {
        const index = users.indexOf(user)
        if (index > -1) { 
            setUsers( currentData => {
                return currentData.filter(userInList => {
                    return userInList !== user
                })
            })
        }
  }

  const supprimerAnimauxList = (animal) => {
    const index = animaux.indexOf(animal)
    if (index > -1) { 
        setAnimaux( currentData => {
            return currentData.filter(animalInList => {
                return animalInList !== animal
            })
        })
    }
}

const supprimerPhotoList = (photo) => {
    const index = photos.indexOf(photo)
    if (index > -1) { 
        setPhotos( currentData => {
            return currentData.filter(photoInList => {
                return photoInList !== photo
            })
        })
    }
}

const supprimerCategorieList = (categorie) => {
    const index = categories.indexOf(categorie)
    if (index > -1) { 
        setCategories( currentData => {
            return currentData.filter(categorieInList => {
                return categorieInList !== categorie
            })
        })
    }
}

const supprimerSortieInList = (sortie) => {
    const index = sorties.indexOf(sortie)
    if (index > -1) { 
        setSorties( currentData => {
            return currentData.filter(sortieInList => {
                return sortieInList !== sortie
            })
        })
    }
}



    return (
        <>
        {isMount && 
            <StyledPanelAdmin>
                <ul className="panelMenu">
                    <li className="itemMenu" onClick={() => { choixMenu("user") }}>Utilisateurs</li>
                    <li className="itemMenu" onClick={() => { choixMenu("sortie") }}>Sorties</li>
                    <li className="itemMenu" onClick={() => { choixMenu("animaux") }}>Animaux</li>
                    <li className="itemMenu" onClick={() => { choixMenu("photo") }}>Photos</li>
                    <li className="itemMenu" onClick={() => { choixMenu("categorie") }}>Catégories</li>
                </ul>
                <div className="panel">
                    {isUsers && 
                        <PanelUtilisateur
                            users={users}
                            supprimerInList={supprimerUtilisateurList}
                        >
                        </PanelUtilisateur>
                    }
                    {isAnimaux && 
                        <PanelAnimaux
                            animaux={animaux}
                            supprimerInList={supprimerAnimauxList}
                        >
                        </PanelAnimaux>
                    }
                    {isPhotos && 
                        <PanelPhoto
                            photos={photos}
                            supprimerInList={supprimerPhotoList}
                        >
                        </PanelPhoto>
                    }
                    {isCategories && 
                        <PanelCategorie
                            categories={categories}
                            supprimerInList={supprimerCategorieList}
                        >
                        </PanelCategorie>
                    }
                    {isSorties && 
                        <PanelSortie
                            sorties={sorties}
                            supprimerInList={supprimerSortieInList}
                        >
                        </PanelSortie>
                    }
                </div>
            </StyledPanelAdmin>
        }
        </>
    );
};

export default PanelAdmin;