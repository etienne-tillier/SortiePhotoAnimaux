import React , { useEffect,useState} from 'react';

import styled from 'styled-components';
import ItemCategorie from './ItemCategorie';
import Table from "../../Table/Table";

const StyledPanelCategorie = styled.div`
    margin: 10px 10%;
`


const PanelCategorie = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.categories)

    useEffect(() => {
        setData(props.categories)
    }, [props.categories])

    const afficherCategorie = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemCategorie className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }






    return (
        <>
        {isMount && 
        <StyledPanelCategorie>
            <Table headers={["Nom de la catégorie" , "Modifier", "Supprimer"]}>
                {afficherCategorie()}
            </Table>
        </StyledPanelCategorie>
        }
        </>
    );
};

export default PanelCategorie;