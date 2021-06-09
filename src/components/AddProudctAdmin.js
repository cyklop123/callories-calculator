import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddProductAdmin = ({handleAddProduct, form}) => {
    return (
        <Form>
            <Form.Group controlId="formGroupProductName">
                <Form.Label>Product name</Form.Label>
                <Form.Control type="text" placeholder="Enter product name" onChange={e => form.setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGroupProductDetails">
                <Form.Label>Callories</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" onChange={e => form.setKcal(e.target.value)} />
                <Form.Label>Fats</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" onChange={e => form.setFats(e.target.value)} />
                <Form.Label>Carbohydrates</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" onChange={e => form.setCarbs(e.target.value)} />
                <Form.Label>Proteins</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" onChange={e => form.setProts(e.target.value)} />
            </Form.Group>
            <Button className="float-right" variant="success" type="submit" onClick={handleAddProduct}>
                Add product
            </Button>
        </Form>
    )
}

export default AddProductAdmin