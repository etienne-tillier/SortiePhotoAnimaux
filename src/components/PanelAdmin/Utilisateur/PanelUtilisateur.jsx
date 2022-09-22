import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ItemUtilisateur from './ItemUtilisateur';

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
                <ul className="listUtilisateur">
                    {afficherUtilisateurs()}
                </ul>
            </StyledPanelUtilisateur>
        }
        </>
    );
};

export default PanelUtilisateur;