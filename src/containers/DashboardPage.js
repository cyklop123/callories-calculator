import axios from 'axios'
import {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserProduct from '../components/UserProduct'
import Summary from '../components/Summary'

const DashboardPage = () => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
    })

    const [userProducts, setUserProducts] = useState(null)
    
    useEffect(() => {
        axiosInstance.get('/'+new Date().toISOString().split('T')[0])
        .then(res => {
            setUserProducts(res.data)
        })
        .catch(err => {
            if(err.response){
                console.log(err.response.code)
                setUserProducts(null)
            }
        })
    }, [])

    return (
        <>
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