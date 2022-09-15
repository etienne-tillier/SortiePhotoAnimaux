import React, { useState,useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';



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
        <>
        {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
          onClick={() => closeModal()}
          className="w-100 h-100 bg-dark bg-opacity-75">
          </div>
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{ minWidth: "400px" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Se connecter</h5>
                    <button 
                    onClick={() => closeModal()}
                    className="btn-close"></button>
                  </div>

                  <div className="modal-body">
                    <form 
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-in-form">

                      <div className="mb-3">
                        <label htmlFor="connexionEmail" className="form-label">
                          Adresse email
                        </label>
                        <input
                          ref={addInputs}
                          name="email"
                          required
                          type="email"
                          className="form-control"
                          id="connexionEmail"
                        />
                      </div>
                      { !isResetPassword && 
                      <div className="mb-3">
                        <label htmlFor="connexionMdp" className="form-label">
                          Mot de passe
                        </label>
                        <input
                          ref={addInputs}
                          name="mdp"
                          required
                          type="password"
                          className="form-control"
                          id="connexionMdp"
                        />
                      </div>
                      }
                      <p className="text-danger mt-1">{validation}</p>
                      <button className="btn btn-primary">{ !isResetPassword ? "Se connecter" : "Envoyer l'email" } </button>
                    </form>
                    <button className="btn btn-primary" onClick={() => {setIsResetPassword(!isResetPassword)}}>{ isResetPassword ? "Se connecter" : "Mot de passe oublié ?" } </button>
                  </div>
                </div>
              </div>
            </div>

        </div>
     )}
        </>
    );
};

export default Connexion;