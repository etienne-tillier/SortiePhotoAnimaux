import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import {Link} from "react-router-dom"


const Nav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: var(--green4) !important;
    align-items: center;

    .emplacementLogo{
        height: 100%;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .logo{
        text-decoration: none;
        font-size: 1.4rem;
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
