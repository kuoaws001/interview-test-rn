import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useContext } from 'react'

import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/auth/AuthContent'
import { login } from '../util/auth'
import { AuthContext } from '../store/AuthContext'

const LoginScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const ctx = useContext(AuthContext);

    const handleLogin = async ({ identifier, password }) => {

        setIsAuthenticating(true);

        try {
            const { jwt, user } = await login(identifier, password);
            ctx.login(jwt, user);
        } catch (error) {
            Alert.alert('Authentication failed!');
        }

        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return (
            <LoadingOverlay message='login...' />
        )
    }

    return (
        <AuthContent onAuthenticate={handleLogin} />
    )
}

export default LoginScreen

const styles = StyleSheet.create({})