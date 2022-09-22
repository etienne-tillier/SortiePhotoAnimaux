import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ItemUtilisateur from './ItemUtilisateur';

const StyledPanelUtilisateur = styled.div`
    
    table{
        border-collapse: collapse;
        width: 100%;
        margin-top: 10px;
    }
    tr:nth-child(even) {
        background-color: #98ffbe;
    }
    tr:nth-child(odd) {
        background-color: #82daa2;
    }
    
    tr{
        border: 1px solid black;
    }
    th{
        border: 1px solid black;
        background-color: var(--green3);
    }
    
    td{
        border: 1px solid black;
        text-align: center;
    }
    
    td,th{
        padding: 10px 0;
    }

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
                <table>
                    <tr>
                        <th>Pseudo</th>
                        <th>Adresse mail</th>
                        <th>Admin ?</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                    {afficherUtilisateurs()}
                </table>
            </StyledPanelUtilisateur>
        }
        </>
    );
};

export default PanelUtilisateur;