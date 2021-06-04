import axios from 'axios'
import {useEffect, useState} from 'react'
import UserProduct from '../components/UserProduct'

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
            {userProducts && <UserProduct userProducts={userProducts} /> }
        </>
    )
}

export default DashboardPage