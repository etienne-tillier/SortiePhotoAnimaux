import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 100%;
    color: blue;
    background-color: #FFF76A;
    text-align: center;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        padding-top: 10px;
        color: black;
    }

`

const Footer = () => {
    return (
        <StyledFooter>
            <p className="text">
                Copyright Tillier Etienne
            </p>
        </StyledFooter>
    );
};

export default Footer;