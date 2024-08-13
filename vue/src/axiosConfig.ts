import axios from 'axios'
import { API_BASE_URL, WP_API_BASE } from './config'

export const axiosInstance = axios.create({
    baseURL: WP_API_BASE,
})

export const axiosInstance2 = axios.create({
    baseURL: API_BASE_URL,
})
