import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import Alert from 'react-bootstrap/Alert'

import { MEALS } from '../Constants'

const AddProduct = ({modal, getOptions, form}) => {
    return (
        <Modal show={modal.show} onHide={modal.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add product</Modal.Title>
            </Modal.Header>

            <Form>
                <Modal.Body>
                        {/* <SearchProduct /> */}
                        <AsyncSelect
                            cacheOptions
                            onChange={(prop, val) => form.setProduct(prop)}
                            loadOptions={getOptions}
                            defaultOptions
                        />
                        <Form.Group controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" min="1" placeholder="100" onChange={e => form.setProductQuantity(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="addProductForm.MealType">
                            <Form.Label>Meal type</Form.Label>
                            <Form.Control as="select" onChange={e => form.setProductMeal(e.target.value)}>
                                <option value=""></option>
                                {
                                    MEALS.map((meal, i) => (
                                        <option value={meal} key={i}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        {form.wrongData && <Alert variant="danger">{form.wrongData}</Alert>}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={modal.handleClose}>Close</Button>
                    <Button variant="primary" type="submit" onClick={modal.handleSubmit}>Add product</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddProduct