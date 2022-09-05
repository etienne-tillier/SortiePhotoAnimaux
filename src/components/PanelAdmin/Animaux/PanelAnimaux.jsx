import React , {useState} from 'react';
import styled from 'styled-components';
import ItemAnimaux from './ItemAnimaux';

const StyledPanelAnimaux = styled.div`

`


const PanelAnimaux = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.animaux)

    const afficherAnimaux = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemAnimaux className="itemList"
                    data={data[key]}
                    supprimerList={supprimerAnimauxList}
                />
            )
        ))
    }

    const supprimerAnimauxList = (animal) => {
        const index = data.indexOf(animal)
        if (index > -1) { 
            setData( currentData => {
                return currentData.filter(animalInList => {
                    return animalInList !== animal
                })
            })
        }
  }





    return (
        <>
        {isMount && 
        <StyledPanelAnimaux>
            <ul className='listeAnimaux'>

            </ul>
        </StyledPanelAnimaux>
        }
        </>
    );
};

export default PanelAnimaux;