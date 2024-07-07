import axios from 'axios'
import { WP_API_BASE } from './config'

const axiosInstance = axios.create({
    baseURL: WP_API_BASE,
})

export default axiosInstance
