import styled from 'styled-components';

const StyledTable = styled.div`
    
    table{
        border-collapse: collapse;
        width: 100%;
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
        //border: 1px solid black;
        background-color: var(--green3);
    }
    
    td{
        //border: 1px solid black;
        text-align: center;
    }
    
    td,th{
        padding: 10px 0;
    }

`

const Table = (props) => {

    // Array of th content
    const headers = props.headers

    return (
                <StyledTable>
                    <table>
                        <tr>
                            {headers.map( item => {
                                return(<th>{item}</th>)
                            })}
                        </tr>
                        {props.children}
                    </table>
                </StyledTable>

    )
}

export default Table;