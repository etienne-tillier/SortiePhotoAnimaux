import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ItemUtilisateur from './ItemUtilisateur';

const StyledPanelUtilisateur = styled.div`

`

const PanelUtilisateur = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.users)

    useEffect(() => {
        console.log(props.users)
      }, [])

    
      const afficherUtilisateurs = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemUtilisateur className="itemList"
                    data={data[key]}
                    supprimerList={supprimerUtilisateurList}
                />
            )
        ))
      }

      const supprimerUtilisateurList = (user) => {
            const index = data.indexOf(user)
            if (index > -1) { 
                setData( currentData => {
                    return currentData.filter(userInList => {
                        return userInList !== user
                    })
                })
            }
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