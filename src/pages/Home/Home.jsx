import styled from "styled-components"
//import Button from "../Buttons/Button";
import React, {useContext, useEffect, useState} from "react";

//import { UtilisateurContext } from '../../context/userContext';
//import axios from "axios";
//import {useNavigate} from "react-router-dom";

const StyledHome = styled.div`
  
  #BannerImg{
    width: 100%;  
  }
    
`


const Home = (props) => {


    return (
        <StyledHome>
            <img src={require("../../assets/img/imgBanner.jpg")} alt="Banner img" id="BannerImg"/>
        </StyledHome>
    )
}

export default Home;