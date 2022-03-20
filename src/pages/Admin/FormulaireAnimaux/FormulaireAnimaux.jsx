import React, {useState, useEffect, useRef} from 'react';
import Select from 'react-select'
import styled from 'styled-components';
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import FormData from 'form-data';


const StyledFormulaireAnimaux = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


`


const FormulaireAnimaux = (props) => {

    const inputs = useRef([])
    const formRef = useRef()
    const [isMount, setisMount] = useState(false)
    const [categories, setcategories] = useState()
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

    const navigate = useNavigate()

    useEffect(() => {
        //categorie pour le select
        axios.get("http://localhost:5000/categorieanimal").then((categories) => {
            setcategories(categories.data)
            console.log(categories.data)
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
                axios.get("http://localhost:5000/especeanimal/" + id).then((animal) => {
                    setnomespece(animal.data.nomespece)
                    setcouleur(animal.data.couleur)
                    settaille(animal.data.taille)
                    setpoids(animal.data.poidsmoyen)
                    setimage(animal.data.image)
                    let categoriesArray = []
                    console.log(animal.data.categories)
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
                axios.put("http://localhost:5000/especeAnimal/" + id,fd).then((resp) => {
                    if (resp){
                        navigate("/")
                    }
                })
            }
            //create
            else {
                if (file.type !== "image/jpeg" && file.type !== "image/png"){
                    setvalidation("Le format de l'image n'est pas bon")
                }
                else {
                    fd.append("imageEspece", file, file.name)
                    axios.post("http://localhost:5000/especeAnimal",fd).then((resp) => {
                        if (resp){
                            navigate("/")
                        }
                })
                }
                }
        }
    }



    return (
        <>
        {(isMount &&
            <StyledFormulaireAnimaux>
                <div
                className=""
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
                        <button className="btn btn-primary">Créer</button>
                    </form>
                </div>
            </StyledFormulaireAnimaux>
         )}
        </>
    );
};

export default FormulaireAnimaux;