import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import { UtilisateurContext } from '../../context/userContext';
import moment from 'moment';
import SortieDetail from '../SortieDetail/SortieDetail';
import Notiflix from 'notiflix';
import Select from 'react-select'



const StyledProfil = styled.div`
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-areas: "Name Name Selected Selected Selected Selected"
                        "List List Selected Selected Selected Selected"
                        "List List Selected Selected Selected Selected"
                        "List List Selected Selected Selected Selected"
                        "List List Selected Selected Selected Selected";

    * {
        margin: 0;
        padding: 0;
    }

    .UserName {
        width: 100%;
        height: 100%;
        grid-area: Name;
        background-color: pink;
        display: flex;
        justify-content: center;
        align-items: center;

        h3 {
            font-size: 3rem;
        }
    }


    .SelectedSortie {
        width: 100%;
        height: 100%;
        grid-area: Selected;
        background-color: greenyellow;
    }

    .SortiesList{
        width: 100%;
        height: 100%;
        grid-area: List;
        background-color: brown;

        .listHead {
            width: 100%;
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;

            #select{
                width: 65%;
                height: 60%;
            }

        }

        ul {
            width: 100%;
            height: 90%;
            overflow-y: scroll;

            #itemSelected {
                background-color: green;
            }
        }
    }



    .sortieItem{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightskyblue;

        :hover{
            cursor: pointer;
            background-color: yellow;
        }
    }

    .sortie{
        width: 100%;
        height: 100%;
    }

`


const Profil = (props) => {

    const idUser = props.id;
    const [isMounted, setIsMounted] = useState(false)
    const [dataUser, setDataUser] = useState();
    const [sortiesUserData, setSortiesUserData] = useState();
    const [sortiesUser, setSortiesUser] = useState();
    const [selectedSortie, setSelectedSortie] = useState(null);
    const [optionSelect, setoptionSelect] = useState([])
    const [optionSelected, setoptionSelected] = useState([])

    const {currentUser} = useContext(UtilisateurContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("id" + idUser)
        axios.get(process.env.REACT_APP_API+ "utilisateurs/" + idUser, {
        headers: {
            authorization: 'Bearer ' + currentUser.accessToken
          }
        }).then((user) => {
            setDataUser(user.data)
            axios.get(process.env.REACT_APP_API+ "sorties/utilisateur/" + idUser, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            }).then((sorties) => {
                console.log(sorties.data)
                // tri pour avoir les plus récentes en premières
                sorties.data.sort((a, b) => {
                    return moment.utc(a.date).isBefore(moment.utc(b.date))
                })
                setSortiesUserData(sorties.data)
                setSortiesUser(sorties.data)
                setIsMounted(true)
                console.log(sorties.data)
            })
        })
      }, [])

    //Met a jour les sorties affichées en fonction de ce qui est entré dans le select
    useEffect(() => {
        if (optionSelected.length > 0){
            let newSorties = checkSelect(sortiesUserData)
            setSortiesUser(newSorties)
        }
        else {
            setSortiesUser(sortiesUserData)
        }
      }, [optionSelected])

           //Get les espèces pour le select dans le header de la map
     useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_API+"especeAnimal").then((especes) => {
                for (let animal of especes.data){
                    setoptionSelect((current) => [...current,
                        {
                            value: animal.id,
                            label: animal.nomespece
                        }
                    ])
                }
            })  
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
    }, [])

    //Fonction qui permet d'ajouter les sorties en fonction dees especes qui ont été choisies dans le select (header de la map)
    const checkSelect = (sorties) => {
        let returnList = []
        for (let sortie of sorties){
            for (let option of optionSelected){
                for (let espece of sortie.especes){
                    if (espece.id === option.value){
                        returnList.push(sortie)
                    }
                }
            }
        }
        return returnList;
    }


    const selectSortie = (e,sortie) => {
        setSelectedSortie(sortie)
        document.getElementsByClassName("SortiesList")[0].style.width = "550px"
        if (document.getElementById("itemSelected")){
            document.getElementById("itemSelected").id = ""
        }
        e.currentTarget.id = "itemSelected"
    }

    //a revoir p-e
    const onDeleteSortie = async (sortie) => {
        try {
            await axios.delete(process.env.REACT_APP_API + "sorties/" + sortie.id, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            })
            Notiflix.Notify.success("La sortie a bien été supprimée");
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
    }


    return (
        (isMounted &&
            <StyledProfil>
                <div className='UserName'>
                    <h3>{dataUser.pseudo}</h3>
                </div>
                <div className='SelectedSortie'>
                    {(selectedSortie != null &&
                        <SortieDetail
                            className="sortie"
                            idutilisateur={selectedSortie.idutilisateur}
                            description={selectedSortie.description}
                            id={selectedSortie.id}
                            date={selectedSortie.date}
                            photos={selectedSortie.photos}
                            sortie={selectedSortie}
                            onDeleteComponent={onDeleteSortie}
                        />
                    )}
                </div>
                <div className='SortiesList'>
                    <header className='listHead'>
                        <Select
                        id="select"
                        options={optionSelect}
                        isMulti
                        onChange={setoptionSelected}
                        className="basic-multi-select form-group"
                        classNamePrefix="select"
                        />
                    </header>
                    <ul>
                        {
                            sortiesUser.map((sortie) => (
                                <li className='sortieItem' onClick={(e) => selectSortie(e,sortie)}><h3>{moment.utc(sortie.date).format('DD/MM/YYYY')}</h3></li>
                            ))
                        }
                    </ul>
                </div>
            </StyledProfil>
        )
    );
};

export default Profil;