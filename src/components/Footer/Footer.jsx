import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: var(--green4);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Footer = () => {
    return (
        <StyledFooter>
            <p className="text">
                Copyright TILLIER Etienne, ITALIANO Lorenzo
            </p>
        </StyledFooter>
    );
};

export default Footer;