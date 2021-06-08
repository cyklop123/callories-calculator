import axiosInstance from '../ApiRequests'
import moment from 'moment'
import {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'

import UserProduct from '../components/UserProduct'
import Summary from '../components/Summary'
import DatePicker from '../components/DatePicker'
import AddProduct from '../components/AddProduct'

const DashboardPage = ({cookies, removeCookie}) => {

    const [userProducts, setUserProducts] = useState(null)
    const [date, setDate] = useState(null)
    const [addProduct, setAddProduct] = useState(false)
    const [alert, setAlert] = useState({variant:'', message: ''})
    const [alertShow, setAlertShow] = useState(false)
    
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        getAllProduct(today)
    }, [])

    //datepicker
    const prevDay = (e) => {
        e.preventDefault()
    
        let dateParent = moment(date)
        dateParent.set({hour: 0, minute: 0, second: 0, millisecond: 0})
        const yesterday = dateParent.subtract(1, 'd').format('YYYY-MM-DD')
        getAllProduct(yesterday)
    }

    const nextDay = (e) => {
        e.preventDefault()

        let dateParent = moment(date)
        dateParent.set({hour: 0, minute: 0, second: 0, millisecond: 0})
        const tomorrow = dateParent.add(1, 'd').format('YYYY-MM-DD')
        getAllProduct(tomorrow)
    }

    //panel
    const getAllProduct = async day => {
        try{
            const res = await axiosInstance.get('/'+day)
            setUserProducts(res.data)
            setDate(day)
        }
        catch(err){
            console.log(err.response.code)
            setUserProducts(null)
        }
    }
    const deleteUserProduct = async e => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        try{
            await axiosInstance.delete('/'+id)
            getAllProduct(date)
            showAlertAndCloseAfter(5000, 'success', 'Succesfuly deleted')
        }
        catch(e){
            console.log(e)
            showAlertAndCloseAfter(5000, 'danger', 'Error while deleting')
        }
    }
    const showAlertAndCloseAfter = (ms, variant, message) => {
        setAlertShow(true)
        setAlert({variant, message})
        setTimeout(() => {
            setAlertShow(false)
        }, ms)
    }

    //modal
    const handleClose = () => setAddProduct(false)
    const handleAddProduct = (e) => {
        e.preventDefault()
        setAddProduct(true)
    }
    const [product, setProduct] = useState(0)
    const [productQuantity, setProductQuantity] = useState(0)
    const [productMeal, setProductMeal] = useState('')
    const [wrongData, setWrongData] = useState(null)
    const handleSubmitAddProduct = async e => {
        e.preventDefault()
        if (product === 0 || productQuantity === 0 || productMeal === '') return setWrongData("Enter data")
        setWrongData(null)
        try {
            await axiosInstance.post('/', {
                productId: product.value,
                quantity: productQuantity,
                type: productMeal,
                date
            })
            getAllProduct(date)
            handleClose()
        }
        catch (e){
            console.log(e)
            setWrongData("Error while adding")
        }
    }
    const getOptions = (query) => {
        
        const req = axiosInstance.get(`/products?name=${query}`)
        return req.then(res => {
            return res.data.map(({_id, name}) => ({value: _id, label:name}))
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <Row>
            <Col md="11">
                {date && <DatePicker clickLeft={prevDay} clickRight={nextDay} date={date} />}
            </Col>
            <Col md="1">
                <Button variant="success" className="m-1" onClick={handleAddProduct}><PlusLg /></Button>
            </Col>
        </Row>
        <Row>
            <Col>
                {<Alert show={alertShow} dismissible variant={alert.variant} onClose={() => setAlertShow(false)}>{alert.message}</Alert>}
                {userProducts && <UserProduct userProducts={userProducts.userProducts} deleteUserProduct={deleteUserProduct} /> }
            </Col>
        </Row>
        <Row>
            <Col>
                {userProducts && <Summary summary={userProducts.summary} /> }
            </Col>
        </Row>
        <AddProduct
            modal={{
                show: addProduct,
                handleClose,
                handleSubmit: handleSubmitAddProduct
            }}
            getOptions={getOptions} 
            form={{
                setProduct,
                setProductQuantity,
                setProductMeal,
                wrongData
            }}
        />
        </>
    )
}

export default DashboardPage