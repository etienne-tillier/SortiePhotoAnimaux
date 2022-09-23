import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ItemUtilisateur from './ItemUtilisateur';
import Table from "../../Table/Table";

const StyledPanelUtilisateur = styled.div`

`

const PanelUtilisateur = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.users)

        
    useEffect(() => {
        setData(props.users)
    }, [props.users])

    
    const afficherUtilisateurs = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemUtilisateur className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }



    return (
        <>
        {isMount && 
            <StyledPanelUtilisateur>
                <Table headers={["Pseudo", "Adresse mail", "Admin ?", "Modifier", "Supprimer"]}>
                    {afficherUtilisateurs()}
                </Table>
            </StyledPanelUtilisateur>
        }
        </>
    );
};

export default PanelUtilisateur;