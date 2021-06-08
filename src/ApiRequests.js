import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const refresh = cookies.get('refresh')

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
})

axiosInstance.interceptors.response.use(response => response, async function(error) {
    const originalRequest = error.config
    if( error.response && error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        return axiosInstance.post('/users/refresh', {
            token: refresh
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

export default axiosInstance