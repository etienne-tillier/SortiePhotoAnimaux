import React, {useContext} from 'react';
import { UtilisateurContext } from '../../../context/userContext';


const Connexion = () => {

    const {modalState, toggleModals} = useContext(UtilisateurContext)

    return (
        <React.Fragment>
{modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
          onClick={() => toggleModals("close")}
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
                    onClick={() => toggleModals("close")}
                    className="btn-close"></button>
                  </div>

                  <div className="modal-body">
                    <form 
                    //ref={formRef}
                    //onSubmit={handleForm}
                    className="sign-up-form">
                      <div className="mb-3">
                        <label htmlFor="inscriptionEmail" className="form-label">
                          Adresse email
                        </label>
                        <input
                         // ref={addInputs}
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
                          //ref={addInputs}
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
                          //ref={}
                          name="mdp"
                          required
                          type="password"
                          className="form-control"
                          id="verifMdp"
                        />
                        <p className="text-danger mt-1">{}</p>
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

export default Connexion;