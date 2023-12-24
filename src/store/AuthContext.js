import React, { createContext, useReducer, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSession, isValidToken } from '../util/auth'
import axios, { endpoints } from '../util/axios'

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

    if (action.type === 'INITIAL') {
        return {
            ...state,
            user: action.payload.user,
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

        const initialize = async () => {

            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken && isValidToken(accessToken)) {

                const response = await axios.post(endpoints.auth.refresh);
                const { jwt, user } = response.data;

                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user: {
                            ...user,
                        },
                    },
                });

                setSession(jwt);
                setAuthToken(jwt);
            } else {
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user: null,
                    },
                });

                setSession(null);
                setAuthToken(null);
            }
        }

        initialize()

    }, [])

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