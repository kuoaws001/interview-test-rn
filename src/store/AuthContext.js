import React, { createContext, PropsWithChildren, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface IAuthContext {
//     token: string | null;
//     isAuthenticated: boolean;
//     authenticate: (token: string) => void;
//     logout: () => void;
// }

export const AuthContext = createContext({
    token: null,
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        async function fetchToken() {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                setAuthToken(token);
            }
        }

        fetchToken();
    }, []);


    const authenticate = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}