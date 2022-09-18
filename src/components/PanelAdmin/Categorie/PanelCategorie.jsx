import React , { useEffect,useState} from 'react';

import styled from 'styled-components';
import ItemCategorie from './ItemCategorie';

const StyledPanelCategorie = styled.div`

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
            <ul className='listeCategorie'>
                {afficherCategorie()}
            </ul>
        </StyledPanelCategorie>
        }
        </>
    );
};

export default PanelCategorie;