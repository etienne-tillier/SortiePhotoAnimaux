import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import {Link} from "react-router-dom"


const Nav = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #FFCE89 !important;


    .emplacementLogo{
        height: 100%;
        width: 25%;
    }


    .logo{
        position: relative;
        text-decoration: none;
        font-size: 1.4rem;
        top: 25%;
        left: 10%;
        padding: 20px 20px;
        user-select: none;
    }

    .logo:visited {
        color: black;
    }



`



const Navbar = () => {


    return (
        <Nav className='bg-light'>
            <div className='emplacementLogo'>
                <Link to='/' className="logo">
                    SortiePhoto
                </Link>
            </div>
            <Burger/>
        </Nav>
    )
}

export default Navbar
