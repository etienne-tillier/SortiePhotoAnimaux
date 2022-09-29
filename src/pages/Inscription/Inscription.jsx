import React, { useState,useContext, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';
import Modal from "../../components/Modals/Modal";
import styled from 'styled-components';

const StyledInscription = styled.div`
  position: fixed;
  z-index: 999;

  #formContainer{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    height: 70%;
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

const Inscription = () => {

    const {modalState, toggleModals, inscription, inscriptionBD} = useContext(UtilisateurContext)
    const [validation, setvalidation] = useState("")

    const navigate = useNavigate()

    const inputs = useRef([])
    const formRef = useRef()

    //On ajoute tous les inputs à la liste
    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }


    //Fonction qui vérifie la validité des inputs avant de procéder à l'inscription
    const handleForm = async (e) => {
        e.preventDefault()
        if (inputs.current[0].value.length < 6){
            setvalidation("Pseudo de 6 caractères minimum")
            return
        }
        else if ((inputs.current[2].value.length || inputs.current[3].value.length) < 6){
            setvalidation("Mot de passe de 6 caractères minimuum")
            return
        }
        else if (inputs.current[2].value !== inputs.current[3].value){
            setvalidation("Les mots de passe ne sont pas les mêmes")
            return
        }
        else {
            try {
                const pseudo = inputs.current[0].value
                const email = inputs.current[1].value
                const creds = await inscription(inputs.current[1].value,inputs.current[2].value)
                //vide les champs du form
                formRef.current.reset()
                setvalidation("")
                try {
                    inscriptionBD(creds.user.uid,pseudo,email)
                    toggleModals("close")
                    Notiflix.Notify.success("Inscription réussie");
                    navigate("/")
                } catch (error) {
                    console.log(error.message + "CODE")
                }

            } catch (err) {
                console.log(err.code + "CODE")
                if (err.code === "auth/invalid-email"){
                    setvalidation("Le format de l'email est invalide")
                }
                else if (err.code === "auth/email-already-in-use"){
                    setvalidation("L'email est déjà utilisé")
                }
            }

        }

    }

    //fermer la modal
    const closeModal = () => {
        setvalidation("")
        toggleModals("close")
    }

    return (
        <StyledInscription>
            {modalState.signUpModal && (
                <Modal closeAction={closeModal}>
                    <div id="formContainer" className="w-100 h-100 bg-dark bg-opacity-75">
                        <h1>S'inscrire</h1>
                        <form ref={formRef} onSubmit={handleForm}>
                            <label htmlFor="inscriptionPseudo">Pseudo</label>
                            <input ref={addInputs} name="pseudo" required type="text" id="inscriptionPseudo"/>

                            <label htmlFor="inscriptionEmail">Adresse email</label>
                            <input ref={addInputs} name="email" required type="email" id="inscriptionEmail"/>

                            <label htmlFor="inscriptionMdp">Mot de passe</label>
                            <input ref={addInputs} name="mdp" required type="password" id="inscriptionMdp"/>

                            <label htmlFor="verifMdp">Vérification du mot de passe</label>
                            <input ref={addInputs} name="mdp" required type="password" id="verifMdp"/>
                            {validation!=="" && (<p>{validation}</p>)}

                            <input id="submit" type="Submit" value="S'inscrire"/>
                        </form>
                    </div>

                </Modal>
            )}
        </StyledInscription>
    );
};

export default Inscription;