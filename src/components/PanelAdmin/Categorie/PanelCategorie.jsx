import React , {useState} from 'react';
import styled from 'styled-components';
import ItemCategorie from './ItemCategorie';

const StyledPanelCategorie = styled.div`

`


const PanelCategorie = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.categories)

    const afficherCategorie = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemCategorie className="itemList"
                    data={data[key]}
                    supprimerList={supprimerCategorieList}
                />
            )
        ))
    }

    const supprimerCategorieList = (categorie) => {
        const index = data.indexOf(categorie)
        if (index > -1) { 
            setData( currentData => {
                return currentData.filter(categorieInList => {
                    return categorieInList !== categorie
                })
            })
        }
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