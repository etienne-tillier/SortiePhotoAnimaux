import React, {useContext} from 'react';
import { UtilisateurContext } from '../../context/userContext';

const Connexion = () => {

    const {modalState, toggleModals} = useContext(UtilisateurContext)

    return (
        <>
        {modalState.signInModal && (
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
                    <h5 className="modal-title">Se connecter</h5>
                    <button 
                    onClick={() => toggleModals("close")}
                    className="btn-close"></button>
                  </div>

                  <div className="modal-body">
                    <form 
                    //ref={formRef}
                    //onSubmit={handleForm}
                    className="sign-in-form">

                      <div className="mb-3">
                        <label htmlFor="connexionEmail" className="form-label">
                          Adresse email
                        </label>
                        <input
                         // ref={addInputs}
                          name="email"
                          required
                          type="email"
                          className="form-control"
                          id="connexionEmail"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="connexionMdp" className="form-label">
                          Mot de passe
                        </label>
                        <input
                          //ref={addInputs}
                          name="mdp"
                          required
                          type="password"
                          className="form-control"
                          id="connexionMdp"
                        />
                      </div>

                      <button className="btn btn-primary">Se connecter</button>
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

export default Connexion;