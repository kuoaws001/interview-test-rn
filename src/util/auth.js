import axios from "axios";

const API_KEY = 'AIzaSyDtygyMCGd4tX9kVszAKDFm3U4lgXpIty8';

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    })

    return response.data.idToken;
}

export const login = (email, password) => {
    return authenticate('signInWithPassword', email, password);
}

export const createUser = (email, password) => {
    return authenticate('signUp', email, password);
}