import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from "axios"
import { UtilisateurContext } from '../../context/userContext';

const StyledPanelAdmin = styled.div`



`

const PanelAdmin = () => {

    const [users, setUsers] = useState(null)
    const [animaux, setAnimaux] = useState(null)
    const [categories, setCategories] = useState(null)
    const [sorties, setSorties] = useState(null)
    const [photos, setPhotos] = useState(null)
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


    return (
        <>
        {isMount && 
            <StyledPanelAdmin>
                
            </StyledPanelAdmin>
        }
        </>
    );
};

export default PanelAdmin;