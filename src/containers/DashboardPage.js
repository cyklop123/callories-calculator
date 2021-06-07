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

const DashboardPage = () => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
    })

    const [userProducts, setUserProducts] = useState(null)
    const [date, setDate] = useState(null)
    
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        getAllProduct(today)
    }, [])

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
        console.log(day)
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

    return (
        <>
        <Row>
            <Col md="11">
                {date && <DatePicker clickLeft={prevDay} clickRight={nextDay} date={date} />}
            </Col>
            <Col md="1">
                <Button variant="success" className="m-1"><PlusLg /></Button>
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
        </>
    )
}

export default DashboardPage