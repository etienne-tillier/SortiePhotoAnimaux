import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import { UtilisateurContext } from '../../context/userContext';
import moment from 'moment';
import SortieDetail from '../SortieDetail/SortieDetail';
import Notiflix from 'notiflix';



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
        overflow-y: scroll;
    }

    .sortieItem{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightskyblue;
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
    const [sortiesUser, setSortiesUser] = useState();
    const [selectedSortie, setSelectedSortie] = useState(null);
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
                setSortiesUser(sorties.data)
                setIsMounted(true)
                console.log(sorties.data)
            })
        })
      }, [])


    const selectSortie = (sortie) => {
        setSelectedSortie(sortie)
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
                    <ul>
                        {
                            sortiesUser.map((sortie) => (
                                <li className='sortieItem' onClick={() => selectSortie(sortie)}><h3>{moment.utc(sortie.date).format('DD/MM/YYYY')}</h3></li>
                            ))
                        }
                    </ul>
                </div>
            </StyledProfil>
        )
    );
};

export default Profil;