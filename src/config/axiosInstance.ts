import axios from 'axios';
import { handleApiError } from './axiosErrorHandler';
import type { ApiError } from '../Types/types';

const axiosInstance = axios.create({
    baseURL: 'https://13.233.0.239:3000/api',
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
