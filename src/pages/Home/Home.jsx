import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Nav/Navbar';
import styled from 'styled-components';
import ListeAnimaux from '../../components/ListeAnimaux/ListeAnimaux';


const StyledHome = styled.div`
    height: 100%;
    width: 100%;
`


const Home = () => {

    // const history = useHistory();
    // const location = useLocation();
    const [isMount, setIsMount] = useState(true);
    const [reload, setReload] = useState(0);

    
    // useEffect(() => {
    //     getAllRestaurant().then((dataRestaurant) => {
    //         setRestaurants(dataRestaurant);
    //         getAllFiltre().then((dataFiltre) => {
    //             setFiltres(dataFiltre);
    //             setIsMount(true);
    //         })
    //     })
    //   }, [reload])


 
    return (
        (isMount ? (
            <React.Fragment>
                <StyledHome className='bg-secondary'>
                    {/* {(sessionStorage.getItem("admin") == "true" ?
                        <React.Fragment>
                        <div className="creerRestaurant" onClick={() => goTo("FormulaireRestaurant", {create : true})}>Nouveau Restaurant</div>
                        <div className="creerFiltre"  onClick={() => goTo("FormulaireFiltre", {create : true})}>Nouveau Filtre</div>
                        </React.Fragment>
                        :
                        " "
                    )} */}
                    <ListeAnimaux></ListeAnimaux>
                </StyledHome>
            </React.Fragment>
        ) : null)
    );
};

export default Home;