import React, { createContext, useReducer, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSession, isValidToken } from '../util/auth'

const initialState = {
    user: null,
};

const reducer = (state, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            user: action.payload.user,
        };
    }

    if (action.type === 'LOGOUT') {
        return {
            ...state,
            user: null,
        };
    }
    return state;
};


export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchToken() {
            const accessToken = await AsyncStorage.getItem('accessToken');

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);
                setAuthToken(accessToken);
            } else {
                setSession(null);
                setAuthToken(null);
            }
        }

        fetchToken();
    }, []);

    const login = (accessToken, user) => {

        setSession(accessToken);
        setAuthToken(accessToken);

        dispatch({
            type: 'LOGIN',
            payload: {
                user: {
                    ...user,
                },
            },
        });
    }

    const logout = () => {

        setSession(null);
        setAuthToken(null);

        dispatch({
            type: 'LOGOUT',
        });
    }

    const value = {
        user: state.user,
        isAuthenticated: !!authToken,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}