import axios from 'axios';
import { handleApiError } from './axiosErrorHandler';
import type { ApiError } from '../Types/types';

const axiosInstance = axios.create({
    // baseURL: 'https://api.blogs.sheryians.com/api',
    baseURL:"http://localhost:3000/api", // Use your local or production API URL
    timeout: 10000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError: ApiError = handleApiError(error); 
        return Promise.reject(apiError); 
    }
);

export default axiosInstance;
