import React, {useState, useEffect, useRef, useContext} from 'react';
import Select from 'react-select'
import styled from 'styled-components';
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import FormData from 'form-data';
import { UtilisateurContext } from '../../../context/userContext';
import Notiflix from 'notiflix';


const StyledFormulaireAnimaux = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ADCE74;
    overflow-y: scroll;
    display: flex;
    justify-content: center;


    .btn {
        background-color: #61B15A;
        border: 1px solid #FFF76A;
        width: 50%;
        display: block;
        margin: 15px auto;
    }

    label {
        font-weight: bold;
    }

    .custom-file{
        margin-top: 15px;
    }

    .form-group {
        margin-bottom: 10px;
    }

`


const FormulaireAnimaux = (props) => {

    const inputs = useRef([])
    const formRef = useRef()
    const [isMount, setisMount] = useState(false)
    const [categories, setcategories] = useState()
    const [categoriesSupp, setcategoriesSupp] = useState()
    const [options, setoptions] = useState()
    const [categoriesChoisies, setcategoriesChoisies] = useState(null)
    const [file, setfile] = useState()
    const [validation, setvalidation] = useState("")
    const [nomespece, setnomespece] = useState("")
    const [taille, settaille] = useState("")
    const [poids, setpoids] = useState("")
    const [couleur, setcouleur] = useState("")
    const [image, setimage] = useState("")

    const { id } = useParams();
    const {currentUser} = useContext(UtilisateurContext)
    const navigate = useNavigate()

    useEffect(() => {
        //categorie pour le select
        axios.get(process.env.REACT_APP_API+ "categorieanimal", {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
              }
        }).then((categories) => {
            setcategories(categories.data)
            let options = []
            for (let categorie of categories.data){
                options.push({
                    value: categorie.id,
                    label: categorie.nomcategorie
                })
            }
            setoptions(options)
            //si c'est un uptdate alors on prérempli les catégorie pour l'animal en question
            if (id){
                axios.get(process.env.REACT_APP_API+ "especeanimal/" + id, {
                    headers: {
                        authorization: 'Bearer ' + currentUser.accessToken
                      }
                }).then((animal) => {
                    setnomespece(animal.data.nomespece)
                    setcouleur(animal.data.couleur)
                    settaille(animal.data.taille)
                    setpoids(animal.data.poidsmoyen)
                    setimage(animal.data.image)
                    let categoriesArray = []
                    for (let categorie of options){
                        for (let categorieAnimal of animal.data.categories){
                            if (categorieAnimal.nomcategorie === categorie.label){
                                categoriesArray.push(categorie)
                            }
                        }
                    }
                    setcategoriesChoisies(categoriesArray)
                    setisMount(true)
                })
            }
            else {
                setisMount(true)
            }
    
        })

    }, [])

    
    const addInputs = (el) => {
        if (!inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const handleChangeFile = (event) => {
        setfile(event.target.files[0])
    }


    const handleForm = (e) => {
        e.preventDefault()
        const nom = inputs.current[0].value
        const couleur = inputs.current[1].value
        const taille = inputs.current[2].value
        const poids = inputs.current[3].value
        const img = inputs.current[4].value
        //verif ici
        if (nom.length < 3){
            setvalidation("Le nom est trop petit")
        }
        else if (couleur.length < 3){
            setvalidation("La couleur n'existe pas")
        }
        else if (isNaN(taille)){
            setvalidation("La taille n'est pas un nombre")
        }
        else if (isNaN(poids)){
            setvalidation("Le poids n'est pas un nombre")
        }
        else {
            let idCategories = []
                for (let categorie of categoriesChoisies){
                    idCategories.push(categorie.value)
                }
                const fd = new FormData()
                fd.append("nomespece",nom)
                fd.append("poidsmoyen",poids)
                fd.append("couleur",couleur)
                fd.append("taille",taille)
                fd.append("categories",JSON.stringify(idCategories))
            //update
            if (id){
                if (file){
                    if (file.type !== "image/jpeg" && file.type !== "image/png"){
                        setvalidation("Le format de l'image n'est pas bon")
                    }
                    else {
                        fd.append("imageEspece", file, file.name)
                    }
                }
                else {
                    fd.append("imageEspece", image)
                }
                try {
                    axios.put(process.env.REACT_APP_API+ "especeAnimal/" + id,fd,{
                        headers: {
                            authorization: 'Bearer ' + currentUser.accessToken
                          },
                    }).then((resp) => {
                        if (resp){
                            Notiflix.Notify.success("L'animal a bien été modifié");
                            navigate("/")
                        }
                    })
                } catch (error) {
                    console.error(error.message)
                    navigate("/erreur/404")
                }
            }
            //create
            else {
                if (file.type !== "image/jpeg" && file.type !== "image/png"){
                    setvalidation("Le format de l'image n'est pas bon")
                }
                else {
                    fd.append("imageEspece", file, file.name)
                    try {
                        axios.post(process.env.REACT_APP_API+ "especeAnimal",fd,{
                            headers: {
                                authorization: 'Bearer ' + currentUser.accessToken
                              }
                        }).then((resp) => {
                            if (resp){
                                Notiflix.Notify.success("L'animal a bien été créé");
                                navigate("/")
                            }
                            else {
                                navigate("/erreur/401")
                            }
                    })
                    } catch (error) {
                        console.log(error.message)
                        navigate("/erreur/404")
                    }
                }
                }
        }
    }

    const ajouterCategorie = () => {
        const categorie = document.getElementById("newCategorie").value
        axios.post(process.env.REACT_APP_API + "categorieAnimal",{
            nomcategorie: categorie
        },{
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
              },
        }).then((categorieData) => {
            if (categorieData){
                setoptions((current) => [...current,{
                    value: categorieData.data.id,
                    label: categorieData.data.nomcategorie
                }])
                Notiflix.Notify.success("La catégorie a bien été créé");
            }
            else {
                console.error("La création de catégorie n'a pas eu lieu")
            }
        })
    }

    const supprimerCategories = async () => {
        for (let categorie of categoriesSupp){
           await axios.delete(process.env.REACT_APP_API + "categorieAnimal/" + categorie.value, {
            headers: {
                authorization: 'Bearer ' + currentUser.accessToken
              },
           })
           const index = options.indexOf(categorie);
           const copieListe = options
           if (index > -1) {
           copieListe.splice(index, 1); // 2nd parameter means remove one item only
           setoptions(copieListe)
       }
        }
        setcategoriesSupp(null);
    }



    return (
        <>
        {(isMount &&
            <StyledFormulaireAnimaux>
                <div
                className="form-container"
                style={{ minWidth: "400px" }}
                >
                    <form
                    ref={formRef}
                    onSubmit={handleForm}
                    >
                        <div className="form-group">
                            <label htmlFor="nomespece">Nom de l'espèce</label>
                            <input defaultValue={nomespece} ref={addInputs} type="text" className="form-control" id="nomespece" placeholder="giraffe" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="couleur">Couleur</label>
                            <input defaultValue={couleur} ref={addInputs} type="text" className="form-control" id="couleur" placeholder="marron" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taille">Taille (en cm)</label>
                            <input defaultValue={taille} ref={addInputs} type="text" className="form-control" id="taille" placeholder="120" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="poidsMoyen">Poids Moyen (en kg)</label>
                            <input defaultValue={poids} ref={addInputs} type="text" className="form-control" id="poidsMoyen" placeholder="10" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Categories</label>
                            <Select
                                defaultValue ={categoriesChoisies}
                                isMulti
                                name="categories"
                                options={options}
                                onChange={setcategoriesChoisies}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="custom-file">
                            <input onChange={handleChangeFile} ref={addInputs} type="file" className="custom-file-input" id="imageEspece" {...(id ? "required" : "")}/>
                            <label className="custom-file-label" htmlFor="imageEspece">Choisissez une image</label>
                        </div>
                        <p className="text-danger mt-1">{validation}</p>
                        <button className="btn btn-primary">{(id ? "Modifier" : "Créer")}</button>
                    </form>
                    <div className="categories">
                        <div className="form-group ajoutCategorie">
                                <label htmlFor="newCategorie">Ajouter une catégorie</label>
                                <input type="text" className="form-control" id="newCategorie" placeholder="Mamifère" required/>
                                <div onClick={() => ajouterCategorie()} className="btn btn-primary">Nouvelle catégorie</div>
                        </div>
                        <div className="form-group supprimerCategorie">
                        <label htmlFor="categoriesSupp">Supprimer une catégorie</label>
                            <Select
                                    defaultValue ={categoriesSupp}
                                    isMulti
                                    name="categoriesSupp"
                                    options={options}
                                    onChange={setcategoriesSupp}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            <div onClick={() => supprimerCategories()} className="btn btn-primary">Supprimer les catégories</div>
                        </div>
                    </div>
                </div>
            </StyledFormulaireAnimaux>
         )}
        </>
    );
};

export default FormulaireAnimaux;