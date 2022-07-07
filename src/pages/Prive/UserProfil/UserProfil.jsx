import React, {useContext, useState, useEffect, useRef} from 'react';
import Profil from '../../../components/Profil/Profil';
import { UtilisateurContext } from '../../../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';


const UserProfil = () => {


    const {currentUser} = useContext(UtilisateurContext)
    const navigate = useNavigate()
    const [isMounted, setIsMounted] = useState(false)
    const [idUser, setIdUser] = useState("")

    const {userId} = useParams()

    useEffect(() => {
        if (!currentUser){
            navigate("/erreur/401")

        }
        else {
            if (userId){
                //check si ami
            }
            else {
                setIdUser(currentUser.info.id)
                setIsMounted(true)
            }
        }
    }, [])

    return (
        (isMounted &&
            <Profil
            id={idUser}
            />
        )
    );
};

export default UserProfil;