import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 100%;
    color: blue;
    background-color: red;
`

const Footer = () => {
    return (
        <StyledFooter>
            <div className="text">
                Copyright...
            </div>
        </StyledFooter>
    );
};

export default Footer;