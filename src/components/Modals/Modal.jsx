import styled from 'styled-components';
import xMark from "../../assets/img/xmark.svg"

const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(110, 110, 110, 0.75);
  z-index: 999;
  
  #xMark{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 64px;
    height: 64px;
    cursor: pointer;
  }
`

const Modal = (props) => {
    return (
        <StyledModal>
            <img id="xMark" src={xMark} alt="close modal" onClick={() => props.closeAction()}/>
            {props.children}
        </StyledModal>

    )
}

export default Modal;