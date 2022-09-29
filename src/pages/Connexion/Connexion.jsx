import React, { useState,useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';
import Modal from "../../components/Modals/Modal";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";

const StyledConnexion = styled.div`
  position: fixed;
  z-index: 999;

  #formContainer{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    height: 50%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 24px 2px rgba(0,0,0,0.73);
    box-shadow: 0 0 24px 2px rgba(0,0,0,0.73);
  }

  form{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  form>*{
    width: 50%;
  }

  #submit{
    margin: 10px;
    background-color: var(--green3);
    border: 2px solid var(--green4);
    cursor: pointer;
    font-weight: bold;
  }
  
  #submit:hover{
    background-color: var(--green2);
  }
  
  input{
    padding: 10px;
    border-radius: 5px;
    border: 1px black solid;
  }
`


//Modale pour la connexion
const Connexion = () => {


    const {modalState, toggleModals, connexion, resetPassword} = useContext(UtilisateurContext)
    const [validation, setvalidation] = useState("")
    const [isResetPassword, setIsResetPassword] = useState(false)

    const inputs = useRef([])
    const formRef = useRef()

    const navigate = useNavigate()

    const addInputs = (el) => {
        if (!inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }


    //Fonction qui vérifie si la connexion est possible avec les données entrées dans les inputs du form
    const handleForm = async (e) => {
        e.preventDefault()
        if (!isResetPassword){
            try {
                const creds = await connexion(inputs.current[0].value,inputs.current[1].value)
                //vide les champs du form
                formRef.current.reset()
                setvalidation("")
                toggleModals("close")
                Notiflix.Notify.success("Vous êtes connecté")
                navigate("/")

            } catch (err) {
                setvalidation("Le mot de passe ou l'email est invalide (ou les deux)")
            }

        }
        else {
            try {
                const resetDone = await resetPassword(inputs.current[0].value)
                formRef.current.reset()
                setvalidation("")
                toggleModals("close")
                Notiflix.Notify.success("Une mail vous a été envoyé")
                navigate("/")
            }
            catch (err) {
                setvalidation("L'email ne correspond à aucun compte")
            }
        }
    }

    //Fonction pour fermer la modale
    const closeModal = () => {
        setvalidation("")
        setIsResetPassword(false)
        toggleModals("close")
    }


    return (
        <StyledConnexion>
            {modalState.signInModal && (
                <Modal closeAction={closeModal}>
                    <div id="formContainer">
                        <h1>Se connecter</h1>
                        <form ref={formRef} onSubmit={handleForm}>
                            <label htmlFor="connexionEmail">Adresse email</label>
                            <input ref={addInputs} name="email" required type="email" id="connexionEmail"/>
                            { !isResetPassword &&
                                <>
                                    <label htmlFor="connexionMdp">Mot de passe</label>
                                    <input ref={addInputs} name="mdp" required type="password" id="connexionMdp"/>
                                </>
                            }
                            {validation!=="" && (<p>{validation}</p>)}
                            <input id="submit" type="submit" value={ !isResetPassword ? "Se connecter" : "Envoyer l'email" } />
                            <Button onClick={() => {setIsResetPassword(!isResetPassword)}} text={ isResetPassword ? "Se connecter" : "Mot de passe oublié ?" } />
                        </form>

                    </div>
                </Modal>
            )}
        </StyledConnexion>
    );
};

export default Connexion;