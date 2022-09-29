import styled from "styled-components"
//import Button from "../Buttons/Button";
import React, {useContext, useEffect, useState} from "react";
//import { UtilisateurContext } from '../../context/userContext';
//import axios from "axios";
//import {useNavigate} from "react-router-dom";

const StyledHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    
    > * {
        width: 50%;
    }
    
    .leftPart{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .leftPart > h1{
        width: 75%;
        font-size: 5vw;
    }
    
    //#BannerImg{
    //    width: 50%;  
    //}
    
`


const Home = (props) => {


    return (
        <StyledHome>
            <div className="leftPart">
                <h1>Bienvenue dans le monde de la photo animalière !</h1>
            </div>

            <img src={require("../../assets/img/imgBanner.png")} alt="Banner img" id="BannerImg"/>
        </StyledHome>
    )
}

export default Home;