import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { endpoints } from '../util/axios'

export const login = async (identifier, password) => {

    const response = await axios.post(endpoints.auth.login, {
        identifier,
        password
    })

    return response.data;
}

export const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

export const tokenExpired = (exp) => {
    let expiredTimer;

    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        AsyncStorage.removeItem('accessToken');
    }, timeLeft);
};

export const setSession = (accessToken) => {
    if (accessToken) {
        AsyncStorage.setItem('accessToken', accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const { exp } = jwtDecode(accessToken)

        tokenExpired(exp);
    } else {
        AsyncStorage.removeItem('accessToken');
        
        delete axios.defaults.headers.common.Authorization;
    }
}