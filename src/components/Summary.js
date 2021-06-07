import Table from 'react-bootstrap/Table'

const Summary = ({summary}) => {
    return (
        <>
        <h3>Summary</h3>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th style={{paddingLeft: '10%'}}>Total</th>
            <th style={{width:"10%"}}>Callories</th>
            <th style={{width:"10%"}}>Carbo</th>
            <th style={{width:"10%"}}>Proteins</th>
            <th style={{width:"10%"}}>Fats</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>&nbsp;</td>
                <td>{Math.round(summary.kcal*100) / 100}</td>
                <td>{Math.round(summary.carbs*100) / 100}</td>
                <td>{Math.round(summary.prots*100) / 100}</td>
                <td>{Math.round(summary.fats*100) / 100}</td>
            </tr>
        </tbody>
        </Table>
        </>
    )
}

export default Summary