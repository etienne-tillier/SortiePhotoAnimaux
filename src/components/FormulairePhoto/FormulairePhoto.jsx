import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Select from 'react-select'


const StyledFormulairePhoto = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`

const FormulairePhoto = (props) => {

    const [isMount, setisMount] = useState(false)
    const [iso, setiso] = useState()
    const [lienFichier, setlienFichier] = useState()
    const [description, setdescription] = useState()
    const [camera, setcamera] = useState()
    const [objectif, setobjectif] = useState()
    const [ouverture, setouverture] = useState()
    const [vitesse, setvitesse] = useState()
    const [longitude, setlongitude] = useState()
    const [latitude, setlatitude] = useState()
    const [especeChoisie, setespeceChoisie] = useState()



    useEffect(() => {

        setisMount(true)
      }, [])



    return (
        <>
        {(isMount && 
            <StyledFormulairePhoto>
                <div
                className=""
                style={{ minWidth: "400px" }}
                >
                    <h3>Nouvelle photo</h3>
                         <div className="form-group">
                            <label htmlFor="espece">Especes</label>
                            <Select
                                defaultValue ={especeChoisie}
                                name="espece[]"
                                options={props.especes}
                                onChange={setespeceChoisie}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descriptionPhoto">Description</label>
                            <textarea defaultValue={description} name="descriptionPhoto[]"  rows="7" cols="33" className="form-control" id="descriptionPhoto" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="camera">Appareil photo</label>
                            <input defaultValue={camera} name="camera[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="objectif">Objectif</label>
                            <input defaultValue={objectif} name="objectif[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="iso">ISO</label>
                            <input defaultValue={iso} name="iso[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ouverture">Ouverture</label>
                            <input defaultValue={ouverture} name="ouverture[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vitesse">Vitesse</label>
                            <input defaultValue={vitesse} name="vitesse[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input defaultValue={longitude} name="longitude[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude">Latitutde</label>
                            <input defaultValue={latitude} name="latitude[]" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lienFichier">Photo</label>
                            <input  type="file" name="lienFichier[]" className="form-control" required/>
                        </div>
                </div>
            </StyledFormulairePhoto>
         )}
        </>
    );
};

export default FormulairePhoto;