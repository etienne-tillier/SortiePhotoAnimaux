import React, { useState,useContext, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../context/userContext';
import Notiflix from 'notiflix';

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
        <React.Fragment>
{modalState.signUpModal && (
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
                    <h5 className="modal-title">S'inscrire</h5>
                    <button 
                    onClick={() => closeModal()}
                    className="btn-close"></button>
                  </div>

                  <div className="modal-body">
                    <form 
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form">
                      <div className="mb-3">
                      <label htmlFor="inscriptionPseudo" className="form-label">
                        Pseudo
                      </label>
                      <input
                        ref={addInputs}
                        name="pseudo"
                        required
                        type="text"
                        className="form-control"
                        id="inscriptionPseudo"
                      />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="inscriptionEmail" className="form-label">
                          Adresse email
                        </label>
                        <input
                          ref={addInputs}
                          name="email"
                          required
                          type="email"
                          className="form-control"
                          id="inscriptionEmail"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="inscriptionMdp" className="form-label">
                          Mot de passe
                        </label>
                        <input
                          ref={addInputs}
                          name="mdp"
                          required
                          type="password"
                          className="form-control"
                          id="inscriptionMdp"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="verifMdp" className="form-label">
                          Vérification du mot de passe
                        </label>
                        <input
                          ref={addInputs}
                          name="mdp"
                          required
                          type="password"
                          className="form-control"
                          id="verifMdp"
                        />
                        <p className="text-danger mt-1">{validation}</p>
                      </div>

                      <button className="btn btn-primary">S'inscrire</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

        </div>
     )}
        </React.Fragment>
    );
};

export default Inscription;