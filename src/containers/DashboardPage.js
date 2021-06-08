import axios from 'axios'
import moment from 'moment'
import {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'

import UserProduct from '../components/UserProduct'
import Summary from '../components/Summary'
import DatePicker from '../components/DatePicker'
import AddProduct from '../components/AddProduct'

const DashboardPage = ({cookies, removeCookie}) => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
    })
    axiosInstance.interceptors.response.use(response => response, async function(error) {
        const originalRequest = error.config
        if( error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            return axiosInstance.post('/users/refresh', {
                token: cookies.refresh
            }).then(res => {
                if(res.status === 200){
                    return axiosInstance(originalRequest)
                }
            }).catch(err => {
                console.log("Token refresh error", err)
            })
        }
        return Promise.reject(error)
    })

    const [userProducts, setUserProducts] = useState(null)
    const [date, setDate] = useState(null)
    const [addProduct, setAddProduct] = useState(false)
    
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

    const getAllProduct = day => {
        axiosInstance.get('/'+day)
            .then(res => {
                setUserProducts(res.data)
                setDate(day)
            })
            .catch(err => {
                if(err.response){
                    console.log(err.response.code)
                    setUserProducts(null)
                }
            })
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
    const handleSubmitAddProduct = (e) => {
        e.preventDefault()
        if (product === 0 || productQuantity === 0 || productMeal === '') return setWrongData("Enter data")
        setWrongData(null)
        axiosInstance.post('/', {
            productId: product.value,
            quantity: productQuantity,
            type: productMeal,
            date
        }).then(res => {
            getAllProduct(date)
            handleClose()
        })
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
                {userProducts && <UserProduct userProducts={userProducts.userProducts} /> }
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