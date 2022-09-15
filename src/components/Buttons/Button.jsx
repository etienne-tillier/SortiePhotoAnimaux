import styled from "styled-components"

const StyledButton = styled.button`
    background-color: var(--green3);
    border: 2px solid var(--green4);
    padding: 7.5px;
    cursor:pointer;
    border-radius: 4px;
    font-size:11px;
    font-weight:bold;
  
    :hover{
      background-color: var(--green2);
      border: 2px solid var(--green3);
    }
`

//Composant qui permet une uniformité des bouttons
const FicheButton = (props) => {

    return (
        <StyledButton onClick={props.onClick}>
            {props.text}
        </StyledButton>
    )
}

export default FicheButton;