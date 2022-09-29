import React, { useState,useContext, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';
import Modal from "../../components/Modals/Modal";
import Button from "../../components/Buttons/Button";

const UpdateUser = () => {

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

    useEffect(() => {
        console.log("upodatada")
        toggleModals("update")
    }, [])


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
        <>
            {modalState.update && (
                    <div>
                    <div onClick={() => closeModal()}></div>
                    <div style={{ minWidth: "400px" }}>
                        <div>
                            <div>
                                <div>
                                    <h5>Modifier</h5>
                                    <button onClick={() => closeModal()}></button>
                                </div>
                                <div>
                                    <form ref={formRef} onSubmit={handleForm}>
                                        <div>
                                            <label htmlFor="inscriptionPseudo">Pseudo</label>
                                            <input ref={addInputs} name="pseudo" required type="text" id="inscriptionPseudo"/>
                                        </div>
                                        <div>
                                            <label htmlFor="inscriptionEmail">Adresse email</label>
                                            <input ref={addInputs} name="email" required type="email" id="inscriptionEmail"/>
                                        </div>
                                        <div>
                                            <label htmlFor="inscriptionMdp">Mot de passe</label>
                                            <input ref={addInputs} name="mdp" required type="password" id="inscriptionMdp"/>
                                        </div>
                                        <div>
                                            <label htmlFor="verifMdp">Vérification du mot de passe</label>
                                            <input ref={addInputs} name="mdp" required type="password" id="verifMdp"/>
                                            <p>{validation}</p>
                                        </div>
                                        <button>Modifier</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateUser;