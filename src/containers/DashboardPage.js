import axios from 'axios'

const DashboardPage = ({accessToken, refreshToken}) => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
    })
    
    axiosInstance.get('/2021-05-28')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            if(err.response){
                console.log(err.response.code)
            }
        })

    return (
        <></>
    )
}

export default DashboardPage