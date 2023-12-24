import axios from 'axios';

const HOST_API = 'https://interview.m-inno.com'

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const endpoints = {
    auth: {
        login: '/api/auth/local'
    },
    financial: {
        figures: '/api/figures'
    }
}