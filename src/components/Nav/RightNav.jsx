import React from 'react'
import styled from 'styled-components'
// import { firebase } from "../../utils/firebaseConfig";
// import { verifConnexion } from '../../utils/db';

const Ul = styled.ul`

    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    /* transition: 0.3s linear; */
    z-index: 19;
    li {
        padding: 15% 10px;
    }

    a {
        text-decoration: none;
        outline: none;
    }

    a {color: #0D2538;}         /* Unvisited link  */
    a:visited {color: #0D2538;} /* Visited link    */
    a:hover {color: red;}   /* Mouse over link */

    @media (max-width : 768px){
        flex-flow: column nowrap;
        background-color: #0D2538;
        position: fixed;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        padding-top: 40px;
        padding-right: 50px;
        transition: transform 0.3s ease-in-out;

        a {color: white;}         /* Unvisited link  */
        a:visited {color: white;} /* Visited link    */
        a:hover {color: red;}   /* Mouse over link */
    }



`

const RightNav = ( props ) => {

    // const deconnexion = () => {
    //     firebase.auth().signOut();
    //     sessionStorage.setItem("connexion",false);
    //     sessionStorage.setItem("admin",false);
    // }

    return (
        <div>
            <Ul open={props.open}>
                <li><a href="home" >Accueil</a></li>
                <li><a href="">Contact</a></li>
                {/* {(verifConnexion() ? 
                        <li><a href="home" onClick={() => deconnexion()}>Déconnexion</a></li>
                         :
                         <li><a href="connexion">Connexion</a></li>)} */}
            </Ul>
        </div>
    )
}

export default RightNav
