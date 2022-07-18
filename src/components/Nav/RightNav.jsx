import React, {useContext} from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { UtilisateurContext } from '../../context/userContext'
import { auth } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import Notiflix from 'notiflix'



const Ul = styled.ul`

    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    padding-right: 60px;
    /* transition: 0.3s linear; */
    z-index: 19;
    li {
        padding: 15% 10px;
    }

    .link {
        text-decoration: none;
        outline: none;
        user-select: none;
        font-size: 1.1rem;
        cursor: pointer;
    }

    

    
    .link {color: #0D2538;}         /* Unvisited link  */
    .link:visited {color: #0D2538;} /* Visited link    */
    .link:hover {color: red;}   /* Mouse over link */

    @media (max-width : 768px){
        flex-flow: column nowrap;
        background-color: #61B15A;
        position: fixed;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        padding-top: 40px;
        padding-right: 50px;
        transition: transform 0.3s ease-in-out;

        .link {color: white;}         /* Unvisited link  */
        .link:visited {color: white;} /* Visited link    */
        .link:hover {color: red;}   /* Mouse over link */
    }



`

const RightNav = ( props ) => {

    const {toggleModals,currentUser} = useContext(UtilisateurContext)

    const navigate = useNavigate()

    const deconnexion = async () => {
        signOut(auth).then((res) => {
            if (res){
                Notiflix.Notify.sucess("Vous êtes bien déconnecté", { closeButton: true });
                navigate("/")
            }
        })

    }

    return (
        <>
            <Ul open={props.open}>
                <li><Link className='link' to="/" >Animaux</Link></li>
                <li><Link className='link' to="/prive/sorties">Sorties</Link></li>
                <li><a className='link' href='https://www.paypal.com/donate/?hosted_button_id=HKSU6YQRD82JA' target="blank">Don</a></li>
                {!currentUser ?
                    <>
                    <li><div className='link' onClick={() => toggleModals("signIn")}>Connexion</div></li>
                    <li><div className='link'  onClick={() => toggleModals("signUp")}>S'inscrire</div></li>
                    </>
                :   <>
                    <li><Link className='link' to="/prive/userProfil">Profil</Link></li>    
                    <li><div className='link'  onClick={() => deconnexion()}>Déconnexion</div></li>
                    </> }
            </Ul>
        </>
    )
}

export default RightNav
