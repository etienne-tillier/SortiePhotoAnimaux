import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'


const Nav = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: skyblue;


    .emplacementLogo{
        height: 100%;
        width: 25%;
    }


    .logo{
        position: relative;
        text-decoration: none;
        font-size: 1.3rem;
        top: 25%;
        left: 10%;
        padding: 20px 20px;
        user-select: none;
        transition: 0.3s;
    }

    .logo:visited {
        color: black;
    }

    .logo:hover{
        color: yellow;
    }


`



const Navbar = () => {
    return (
        <Nav>
            <div className='emplacementLogo'>
                <a href='/' className="logo">
                    SortiePhoto
                </a>
            </div>
            <Burger/>
        </Nav>
    )
}

export default Navbar
