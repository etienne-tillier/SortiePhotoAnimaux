import React , {useState, useEffect } from 'react';
import styled from 'styled-components';
import ItemPhoto from './ItemPhoto';

const StyledPanelPhoto = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    gap: 2.5%;
    
    > * {
        width: 30%;
    }
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
            {afficherPhotos()}
        </StyledPanelPhoto>
        }
        </>
    );
};

export default PanelPhoto;