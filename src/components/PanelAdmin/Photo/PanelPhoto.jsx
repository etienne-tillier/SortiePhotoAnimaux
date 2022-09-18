import React , {useState, useEffect } from 'react';
import styled from 'styled-components';
import ItemPhoto from './ItemPhoto';

const StyledPanelPhoto = styled.div`

`


const PanelPhoto = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.photos)

    
    useEffect(() => {
        setData(props.photos)
      }, [props.photos])


    const afficherPhotos = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemPhoto className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }






    return (
        <>
        {isMount && 
        <StyledPanelPhoto>
            <ul className='listePhoto'>
                {afficherPhotos()}
            </ul>
        </StyledPanelPhoto>
        }
        </>
    );
};

export default PanelPhoto;