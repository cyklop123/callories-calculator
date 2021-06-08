import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Trash} from 'react-bootstrap-icons'

const Meal = ({mealName, mealProducts, handleDelete}) => {
    
    return (
        <>
            <h3>{mealName.charAt(0).toUpperCase() + mealName.slice(1)}</h3>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th style={{width:"5%"}}>#</th>
                <th>Product</th>
                <th style={{width:"10%"}}>Amount [g]</th>
                <th style={{width:"10%"}}>Callories</th>
                <th style={{width:"10%"}}>Carbo</th>
                <th style={{width:"10%"}}>Proteins</th>
                <th style={{width:"10%"}}>Fats</th>
                <th style={{width:"5%"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    mealProducts.map((product, i) => (
                        <tr key={product._id}>
                            <td>{i+1}</td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{Math.round( product.kcal * 100)/100}</td>
                            <td>{Math.round( product.carbs * 100)/100}</td>
                            <td>{Math.round( product.prots * 100)/100}</td>
                            <td>{Math.round( product.fats * 100)/100}</td>
                            <td className="text-center"><Button variant="danger" size="sm" data-id={product._id} onClick={handleDelete}><Trash /></Button></td>
                        </tr>
                    ))      
                }
            </tbody>
        </Table>
        </>
    )
}

export default Meal