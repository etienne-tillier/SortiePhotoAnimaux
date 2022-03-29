import React, {useState, useEffect, useContext, useRef} from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';


const StyledFormulaireSortie = styled.div`

    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;     
    overflow-y: scroll;
    background-color: #ADCE74;

    #prive {
        margin-left: 12px;
    }

    label{
        font-weight: bold;
    }

    input {
        margin-bottom: 10px;
    }

    .btn {
        display: block;
        margin: 15px auto;
        width: 50%;
        border: 1px solid #FFF76A;
    }

    .btn-primary {
        background-color: #61B15A;
    }


    h3 {
        text-align: center;
    }

    .containerPhoto {
        display: grid;
        grid-template-columns: 1fr 1fr ;
        gap: 10px;
    }

    textarea{
        resize: none;
    }

`

const FormulaireSortie = (props) => {


    const [inputList, setInputList] = useState([]);
    const [especesChoisiesPhoto, setespecesChoisiesPhoto] = useState([])
    const [isMount, setisMount] = useState(false)
    const inputs = useRef([])
    const formRef = useRef()
    const [description, setdescription] = useState("")
    const [prive, setprive] = useState(false)
    const [especes, setespeces] = useState()
    const [especesChoisies, setespecesChoisies] = useState()
    const [latitude, setlatitude] = useState()
    const [longitude, setlongitude] = useState()
    const [date, setdate] = useState()
    const [validation, setvalidation] = useState("")

    
    const {currentUser, isAdmin} = useContext(UtilisateurContext)
    const { id } = useParams();
    const navigate = useNavigate()

 // Tous les handles servent à sauvegarder les données rentrées dans les inputs des forms dynamiques pour les photos de la sortie
 const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  };

  const handleSelectChange = (value,index) => {
      const list = [...inputList]
      list[index]["espece"] = value
      setInputList(list)
  }

  const handleFileChange = (event, index) => {
    const list = [...inputList]
    list[index]["imagePhoto"] = event.target.files[0]
    setInputList(list)
  }
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { espece: "", descriptionPhoto: "" , camera: "", objectif: "", iso: "", ouverture: "", vitesse: "", longitudePhoto: "", latitudePhoto: "", imagePhoto: ""}]);
  };


    useEffect(() => { 
        try {
            axios.get(process.env.REACT_APP_API+ "especeAnimal", {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                  }
            }).then((animaux) => {
                let options = []
                for (let animal of animaux.data){
                    options.push({
                        value: animal.id,
                        label: animal.nomespece
                    })
                }
                setespeces(options)
                if (id){
                    try {
                        axios.get(process.env.REACT_APP_API+ "sorties/" + id, {
                            headers: {
                                authorization: 'Bearer ' + currentUser.accessToken
                              }
                        }).then((sortie) => {
                            //verif access 
                            if (currentUser.uid !== sortie.data.idutilisateur && !isAdmin){
                                navigate("/erreur/403")
                            }
                            else {
                                setdescription(sortie.data.description)
                                setdate(new Date(sortie.data.date).toISOString().split('T')[0])
                                setlatitude(sortie.data.latitude)
                                setlongitude(sortie.data.longitude)
                                setprive(sortie.data.prive)
                                let especesArray = []
                                for (let espece of options){
                                    for (let especeSortie of sortie.data.especes){
                                        if (especeSortie.nomespece === espece.label){
                                            especesArray.push(espece)
                                        }
                                    }
                                }
                                setespecesChoisies(especesArray)
                                setisMount(true)
                            }
                        })
                    } catch (error) {
                        console.log(error.message)
                        navigate("/erreur/404")
                    }
                }
                else {
                    setisMount(true)
                }
            })
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
     }, [])
        
    //Fonction pour ajouter tous les inputs des forms photos à la liste de tous les inputs 
    const addInputs = (el) => {
        if (!inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }


    //ajoute une photo sur l'api
    const ajouterPhoto = (idSortie,photo) => {
        const fd = new FormData()
        fd.append("idespeceanimal",photo.espece.value)
        fd.append("iso",photo.iso)
        fd.append("uid",currentUser.uid)
        fd.append("description",photo.descriptionPhoto)
        fd.append("camera",photo.camera)
        fd.append("objectif",photo.objectif)
        fd.append("ouverture",photo.ouverture)
        fd.append("vitesse",photo.vitesse)
        fd.append("longitude",photo.longitudePhoto)
        fd.append("latitude",photo.latitudePhoto)
        fd.append("idsortie",idSortie)
        fd.append("imagePhoto",photo.imagePhoto)
        try {
            axios.post(process.env.REACT_APP_API+ "photos",fd, {
                headers: {
                    authorization: 'Bearer ' + currentUser.accessToken
                }
            })
        } catch (error) {
            console.log(error.message)
            navigate("/erreur/404")
        }
    }


    //vérifie les champs du form sortie puis ajoute ou modifie une sortie en fonction de ce qui est rentré dans le form de la sortie
    const handleForm = async (e) => {
        e.preventDefault()
        const descriptionValue = inputs.current[0].value
        const dateValue = inputs.current[1].value
        const latitudeValue = inputs.current[2].value
        const longitudeValue = inputs.current[3].value
        const priveValue = inputs.current[4].checked
        //verif ici
        if (isNaN(latitudeValue)){
            setvalidation("La latitude doit être un nombre")
        }
        else if (isNaN(longitudeValue)){
            setvalidation("La longitude doit être un nombre")
        }
        else if (dateValue > Date.now()){
            setvalidation("La date n'est pas encore passée")
        }
        else {
            //s'il y a au moins une photo
            if (inputList) {
                for(let inputLongitude of document.getElementsByName("longitudePhoto")){
                    if (isNaN(inputLongitude.value)){
                        setvalidation("La longitude doit être un nombre")
                        return
                    }
                }
                for(let inputLatitude of document.getElementsByName("latitudePhoto")){
                    if (isNaN(inputLatitude.value)){
                        setvalidation("La latitude doit être un nombre")
                        return
                    }
                }
                for(let inputIso of document.getElementsByName("iso")){
                    if (isNaN(inputIso.value)){
                        setvalidation("Les iso doivent être un nombre")
                        return
                    }
                }
                for(let inputVitesse of document.getElementsByName("vitesse")){
                    if (isNaN(inputVitesse.value)){
                        setvalidation("La vitesse doit être un nombre")
                        return
                    }
                }
            }
            let idEspeces = []
            for (let espece of especesChoisies){
                idEspeces.push(espece.value)
            }
            //update
            if (id){
                try {
                    axios.put(process.env.REACT_APP_API + "sorties/" + id,
                    {
                        idutilisateur: currentUser.uid,
                        date: dateValue,
                        description: descriptionValue,
                        latitude: latitudeValue,
                        longitude: longitudeValue,
                        prive: priveValue,
                        especes: idEspeces
                    },{
                        headers: {
                            authorization: 'Bearer ' + currentUser.accessToken
                        }
                    }).then((resp) => {
                        if (resp){
                            for (let photo of inputList){
                                ajouterPhoto(id, photo)
                            }
                            Notiflix.Notify.success("La sortie a bien été modifiée");
                            navigate("/prive/sorties")
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                    navigate("/erreur/404")
                }
            }
             //create
            else {
                try {
                    axios.post(process.env.REACT_APP_API+ "sorties",{
                        idutilisateur: currentUser.uid,
                        date: dateValue,
                        description: descriptionValue,
                        latitude: latitudeValue,
                        longitude: longitudeValue,
                        prive: priveValue,
                        especes: idEspeces
                    },{
                        headers: {
                            authorization: 'Bearer ' + currentUser.accessToken
                        }
                      }).then((resp) => {
                        if (resp){
                            for (let photo of inputList){
                                ajouterPhoto(resp.data.id, photo)
                            }
                            Notiflix.Notify.success("La sortie a bien été créé");
                            navigate("/prive/sorties")
                        }
                })
                } catch (error) {
                    console.log(error.message)
                    navigate("/erreur/404")
                }
            }
        }
    }


    return (
        <>
        {(isMount &&
            <StyledFormulaireSortie>
                 <div
                className=""
                style={{ minWidth: "400px" }}
                >
                    <form
                    ref={formRef}
                    onSubmit={handleForm}
                    >
                         <div className="form-group">
                            <label htmlFor="especes">Especes</label>
                            <Select
                                defaultValue ={especesChoisies}
                                isMulti
                                name="especes"
                                options={especes}
                                onChange={setespecesChoisies}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea defaultValue={description} ref={addInputs} rows="7" cols="33" className="form-control" id="description" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input defaultValue={date} ref={addInputs} type="date" className="form-control" id="date" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input defaultValue={latitude} ref={addInputs} type="text" className="form-control" id="latitude" placeholder="24.5" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input defaultValue={longitude} ref={addInputs} type="text" className="form-control" id="longitude" placeholder="27.3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="prive">Prive</label>
                            <input defaultChecked={prive} ref={addInputs} type="checkbox" id="prive" />
                        </div>
                        <section className="containerPhoto">
                            {/* Pour tous les formulaire photo, les affiches */}
                            {inputList.map((element, index) => {
                            return (
                                <>
                                <div className="photoForm">
                                    <header>
                                        <h3>Nouvelle Photo</h3>
                                    </header>
                                    <div className="form-group">
                                    <label htmlFor="espece">Especes</label>
                                    <Select
                                        name="especesPhoto"
                                        options={especes}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={element.espece}
                                        onChange={(value) => handleSelectChange(value,index)}
                                        required
                                    />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descriptionPhoto">Description</label>
                                        <textarea minLength={3} value={element.descriptionPhoto} onChange={e => handleInputChange(e, index)} name="descriptionPhoto"  rows="7" cols="33" className="form-control" id="descriptionPhoto" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="camera">Appareil photo</label>
                                        <input placeholder='Nikon D90' minLength={3} value={element.camera} onChange={e => handleInputChange(e, index)} name="camera" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="objectif">Objectif</label>
                                        <input placeholder='500mm' minLength={3} value={element.objectif} onChange={e => handleInputChange(e, index)} name="objectif" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="iso">ISO</label>
                                        <input placeholder='200' value={element.iso} onChange={e => handleInputChange(e, index)} name="iso" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ouverture">Ouverture</label>
                                        <input placeholder='f4' value={element.ouverture} onChange={e => handleInputChange(e, index)} name="ouverture" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vitesse">Vitesse</label>
                                        <input placeholder='450' value={element.vitesse} onChange={e => handleInputChange(e, index)} name="vitesse" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="longitudePhoto">Longitude</label>
                                        <input placeholder='42.6' value={element.longitudePhoto} onChange={e => handleInputChange(e, index)} name="longitudePhoto" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="latitudePhoto">Latitutde</label>
                                        <input placeholder='2.5' value={element.latitudePhoto} onChange={e => handleInputChange(e, index)} name="latitudePhoto" type="text" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imagePhoto">Photo</label>
                                        <input accept=".jpg, .jpeg, .png" onChange={e => handleFileChange(e, index)} type="file" name="imagePhoto" className="form-control" required/>
                                    </div>
                                        <div className="btn-box">
                                        <div
                                            className="btn btn-warning"
                                            onClick={() => handleRemoveClick(index)}>Supprimer</div>
                                        </div>
                                    </div>
                                </>
                                );
                            })}
                        </section>
                        <p className="text-danger mt-1">{validation}</p>
                        <div className="btn btn-primary" onClick={handleAddClick}>Ajouter une photo</div>
                        <button className="btn btn-primary">{id ? "Modifier" : "Créer"}</button>
                    </form>
                </div>
            </StyledFormulaireSortie>
        )}
        </>
    );
};

export default FormulaireSortie;