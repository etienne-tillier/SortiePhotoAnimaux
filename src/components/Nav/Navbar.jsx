import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'


const Nav = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: skyblue;

    .logo{
        padding: 20px 20px;
    }
`



const Navbar = () => {
    return (
        <Nav>
            <div className="logo">
                NavBar
            </div>
            <Burger/>
        </Nav>
    )
}

export default Navbar
