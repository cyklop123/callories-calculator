import {useState} from 'react'
import AddProductAdmin from '../components/AddProudctAdmin'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axiosInstance from '../ApiRequests'
import AsyncSelect from 'react-select/async'

const AdminPanelPage = () => {

    const [alertAdd, setAlertAdd] = useState(null)
    const [alertDelete, setAlertDelete] = useState(null)
    const [product, setProduct] = useState(0)

    const [fats, setFats] = useState(-1)
    const [carbs, setCarbs] = useState(-1)
    const [kcal, setKcal] = useState(-1)
    const [prots, setProts] = useState(-1)
    const [name, setName] = useState('')

    const handleAddProduct = async (e) => {
        e.preventDefault()
        
        if (carbs >= 0 && fats >= 0 && prots >= 0 && kcal >= 0 && name.length > 3) {
            try {
                await axiosInstance.post('/products', { name, kcal, prots, carbs, fats })
                setAlertAdd({variant: 'success', message: `Successfully added ${name}`})
            } catch (err) {
                console.log(err) 
                setAlertAdd({variant: 'danger', message: `Something went wrong. Try later!`})
            }
        } else {
            setAlertAdd({variant: 'danger', message: `Invalid data`})
        }
    }

    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        
        if (!product) {
            setAlertDelete({variant: 'danger', message: `Choose product!`})
            return
        }

        try {
            await axiosInstance.delete(`/products/${product.value}`)
            setAlertDelete({variant: 'success', message: `Successfully deleted ${product.label}`})
            setProduct(0)
        } catch (err) {
            console.log(err) 
            setAlertDelete({variant: 'danger', message: `Something went wrong. Try later!`})
        }
    }

    const loadOptions = (query) => {
        const req = axiosInstance.get(`/products?name=${query}`)
        return req
            .then(res => res.data.map(({_id, name}) => ({value: _id, label: name})))
            .catch(err => console.log(err))
    }

    return (
        <>
        {alertAdd && <Alert dismissible variant={alertAdd.variant} onClose={() => setAlertAdd(null)}>{alertAdd.message}</Alert>}
        <Jumbotron>
            <h3 className='text-center'>Add Product</h3>
            <AddProductAdmin handleAddProduct={handleAddProduct} form={{
                setFats,
                setCarbs,
                setKcal,
                setProts,
                setName,
            }} />
        </Jumbotron>
        {alertDelete && <Alert dismissible variant={alertDelete.variant} onClose={() => setAlertDelete(null)}>{alertDelete.message}</Alert>}
        <Jumbotron>
            <h3 className='text-center'>Delete Product</h3>
                         
            <form>
                <AsyncSelect 
                    onChange={(prop, val) => setProduct(prop)}
                    loadOptions={loadOptions}
                    value={product}
                />
                <Button className="float-right mt-3" variant="danger" type="submit" onClick={handleDeleteProduct}>
                    Delete product
                </Button>
            </form>
        </Jumbotron>
        </>
    )
}

export default AdminPanelPage