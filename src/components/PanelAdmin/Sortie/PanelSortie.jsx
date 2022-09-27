import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ItemSortie from './ItemSortie';
import Table from "../../Table/Table";

const StyledPanelSortie = styled.div`

`

const PanelSortie = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.sorties)

        
    useEffect(() => {
        setData(props.sorties)
        console.log(props.sorties)
    }, [props.users])

    
    const afficherSorties = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemSortie className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }



    return (
        <>
        {isMount && 
            <StyledPanelSortie>
                <Table headers={["Pseudo", "Date", "Especes", "Voir", "Modifier", "Supprimer"]}>
                    {afficherSorties()}
                </Table>
            </StyledPanelSortie>
        }
        </>
    );
};

export default PanelSortie;