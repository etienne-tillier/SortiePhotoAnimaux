import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


const StyledFormulaireAnimaux = styled.div`
    width: 100%;
    height: 100%;


`


const FormulaireAnimaux = () => {

    




    return (
        <>
            <StyledFormulaireAnimaux>
                <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{ minWidth: "400px" }}
                >
                    <form>
                        <div class="form-group">
                            <label for="nomespece">Nom de l'espèce</label>
                            <input type="text" class="form-control" id="nomespece" placeholder="giraffe"/>
                        </div>
                        <div class="form-group">
                            <label for="couleur">Couleur</label>
                            <input type="text" class="form-control" id="couleur" placeholder="marron"/>
                        </div>
                        <div class="form-group">
                            <label for="taille">Taille (en cm)</label>
                            <input type="text" class="form-control" id="taille" placeholder="120"/>
                        </div>
                        <div class="form-group">
                            <label for="poidsMoyen">Poids Moyen (en kg)</label>
                            <input type="text" class="form-control" id="poidsMoyen" placeholder="10"/>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile"/>
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                        <div className="btn btn-primary">Submit</div>
                    </form>
                </div>
            </StyledFormulaireAnimaux>
        </>
    );
};

export default FormulaireAnimaux;