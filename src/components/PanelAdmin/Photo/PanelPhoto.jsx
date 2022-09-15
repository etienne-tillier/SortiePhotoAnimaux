import React , {useState} from 'react';
import styled from 'styled-components';
import ItemPhoto from './ItemPhoto';

const StyledPanelPhoto = styled.div`

`


const PanelPhoto = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.photos)

    const afficherPhotos = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemPhoto className="itemList"
                    data={data[key]}
                    supprimerList={supprimerPhotoList}
                />
            )
        ))
    }

    const supprimerPhotoList = (photo) => {
        const index = data.indexOf(photo)
        if (index > -1) { 
            setData( currentData => {
                return currentData.filter(photoInList => {
                    return photoInList !== photo
                })
            })
        }
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