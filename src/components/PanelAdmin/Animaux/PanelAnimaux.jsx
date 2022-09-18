import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
import ItemAnimaux from './ItemAnimaux';

const StyledPanelAnimaux = styled.div`

`


const PanelAnimaux = (props) => {

    const [isMount, setisMount] = useState(true)
    const [data, setData] = useState(props.animaux)

        
    useEffect(() => {
        setData(props.animaux)
      }, [props.animaux])


    const afficherAnimaux = () => {
        return (
            Object.keys(data).map((key) => (
                <ItemAnimaux className="itemList"
                    data={data[key]}
                    supprimerList={props.supprimerInList}
                />
            )
        ))
    }




    return (
        <>
        {isMount && 
        <StyledPanelAnimaux>
            <ul className='listeAnimaux'>
                {afficherAnimaux()}
            </ul>
        </StyledPanelAnimaux>
        }
        </>
    );
};

export default PanelAnimaux;