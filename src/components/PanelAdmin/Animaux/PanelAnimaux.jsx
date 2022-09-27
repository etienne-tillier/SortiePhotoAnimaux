import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
import ItemAnimaux from './ItemAnimaux';
import Table from "../../Table/Table";

const StyledPanelAnimaux = styled.div`
    margin: 10px 10%;
`


const PanelAnimaux = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.animaux)

        
    useEffect(() => {
        setData(props.animaux)
    }, [props.animaux])


    const afficherAnimaux = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemAnimaux className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }




    return (
        <>
        {isMount && 
        <StyledPanelAnimaux>
            <Table headers={["id", "Nom d'èspece", "Modifier", "Supprimer"]}>
                {afficherAnimaux()}
            </Table>
        </StyledPanelAnimaux>
        }
        </>
    );
};

export default PanelAnimaux;