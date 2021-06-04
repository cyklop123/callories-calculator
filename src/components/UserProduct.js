import Table from 'react-bootstrap/Table'

const UserProduct = ({userProducts}) => {
    return (
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th style={{width:"10%"}}>#</th>
            <th>Product</th>
            <th style={{width:"10%"}}>Callories</th>
            <th style={{width:"10%"}}>Carbohydrates</th>
            <th style={{width:"10%"}}>Proteins</th>
            <th style={{width:"10%"}}>Fats</th>
            </tr>
        </thead>
        <tbody>
            {
                userProducts.userProducts.map((userProduct, i) => (
                    <tr key={userProduct._id}>
                        <td>{i+1}</td>
                        <td>{userProduct.product.name}</td>
                        <td>{userProduct.product.kcal}</td>
                        <td>{userProduct.product.carbs}</td>
                        <td>{userProduct.product.prots}</td>
                        <td>{userProduct.product.fats}</td>
                    </tr>
                ))      
            }
        </tbody>
        </Table>
    )
}

export default UserProduct