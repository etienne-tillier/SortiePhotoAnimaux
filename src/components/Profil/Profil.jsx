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
    }

    .SortiesList{
        width: 100%;
        height: 100%;
        grid-area: List;
        border-right: 1px solid black;
        border-top: 1px solid black;

        .listHead {
            width: 100%;
            height: 15%;
            padding: 7px;
            display: grid;
            grid-template-columns: 50% 25% 25%;
            gap: 2px;

            #select {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                > div {
                    width: 90%;
                }
            }


            .form-group {
                display: flex;
                align-items: center;

                label {
                    height: 30%;
                    font-weight: bold;
                    
                }

                #dateA {
                    height: 70%;
                    width: 100%;
                }
    
                
                #dateB {
                    height: 70%;
                    width: 100%;
                }

                
            }


        }

        ul {
            width: 100%;
            height: 90%;
            overflow-y: scroll;
            overflow-x: hidden;
            margin-top: 5px;

            .sortieItem{
                width: 98%;
                display: flex;
                margin: 2px 5px;
                justify-content: center;
                align-items: center;
                background-color: #FFF76A;
                border: 1px black solid;
                transition: 0.2s;

        
        
                :hover{
                    cursor: pointer;
                    background-color: yellow;
                    transform: scale(1.05);
                }
            }


            #itemSelected {
                background-color: green;
            }
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
    const [dateAfter, setDateAfter] = useState(null)
    const [dateBefore, setDateBefore] = useState(null)
    const [reload, setReload] = useState(null)

    const {currentUser} = useContext(UtilisateurContext)

    const navigate = useNavigate()

    useEffect(() => {
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
                console.log("adadadaada")
                sortSortie(sorties.data)
                setIsMounted(true)
                console.log(sorties.data)
            })
        })
      }, [reload])

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

    useEffect(() => {
        if (isMounted){
            sortSortie(sortiesUserData)
        }
    }, [optionSelected, dateAfter, dateBefore])


        //Met a jour les sorties affichées en fonction de ce qui est entré dans le select
    const sortSortie = (sortiesData) => {
        let newSorties = []
        if (optionSelected.length > 0){
            newSorties = checkSelect(sortiesData)
            newSorties = checkCalendar(newSorties)
        }
        else if (dateAfter || dateBefore){
            newSorties = checkCalendar(sortiesData)
        }
        else {
            newSorties = sortiesData
        }
        newSorties.sort((a, b) => {
            return moment.utc(a.date).isBefore(moment.utc(b.date))
        })
        setSortiesUser(newSorties)
    }

    const checkCalendar = (sortiesData) => {
        let sortiesUpdate = []
        if (dateAfter != null && dateBefore != null){
            for (let sortie of sortiesData){
                if (moment.utc(sortie.date).isBetween(moment.utc(dateAfter), moment.utc(dateBefore), undefined, "[]")){
                    sortiesUpdate.push(sortie)
                }
            }
        }
        else if (dateAfter != null){
            for (let sortie of sortiesData){
                if (moment.utc(sortie.date).isAfter(moment.utc(dateAfter))){
                    sortiesUpdate.push(sortie)
                }
            }
        }
        else if (dateBefore != null){
            for (let sortie of sortiesData){
                if (moment.utc(sortie.date).isBefore(moment.utc(dateBefore))){
                    sortiesUpdate.push(sortie)
                }
            }
        }
        else {
            console.log(sortiesData)
            sortiesUpdate = sortiesData
        }
        return sortiesUpdate
    }

    

    //Fonction qui permet d'ajouter les sorties en fonction dees especes qui ont été choisies dans le select (header de la map)
    const checkSelect = (sorties) => {
        let returnList = []
        for (let sortie of sorties){
            for (let option of optionSelected){
                for (let espece of sortie.especes){
                    if (espece.id === option.value && !returnList.includes(sortie)){
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
        const supp = window.confirm("Voulez vous vraiment supprimer cet espèce ?")
        if (supp){
            try {
                await axios.delete(process.env.REACT_APP_API + "sorties/" + sortie.id, {
                    headers: {
                        authorization: 'Bearer ' + currentUser.accessToken
                    }
                })
                setReload(sortie)
                setSelectedSortie(null)
                // let newSorties = sortiesUser;
                // let index = newSorties.indexOf(sortie)
                // console.log("index = " + index)
                // console.log(newSorties)
                // newSorties.splice(newSorties.indexOf(sortie), 1)
                // console.log(newSorties)
                // setSortiesUser(newSorties)
                Notiflix.Notify.success("La sortie a bien été supprimée");
            } catch (error) {
                console.log(error.message)
                navigate("/erreur/404")
            }
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
                        <div className="form-group">
                            <label htmlFor="date">Après</label>
                            <input onChange={(e) => setDateAfter(e.target.value)} type="date" className="form-control" id="dateA"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Avant</label>
                            <input onChange={(e) => setDateBefore(e.target.value)} type="date" className="form-control" id="dateB"/>
                        </div>
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