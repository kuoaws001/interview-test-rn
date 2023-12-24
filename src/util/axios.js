import axios from 'axios';

const HOST_API = 'https://interview.m-inno.com'

const axiosInstance = axios.create({ baseURL: HOST_API });

export default axiosInstance;

export const endpoints = {
    auth: {
        login: '/api/auth/local',
        refresh: '/api/token/refresh'
    },
    financial: {
        figures: '/api/figures'
    }
}