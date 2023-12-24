import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useContext } from 'react'

import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/auth/AuthContent'
import { login } from '../util/auth'
import { AuthContext } from '../store/AuthContext'

const LoginScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const ctx = useContext(AuthContext);

    const handleLogin = async ({ email, password }) => {

        setIsAuthenticating(true);

        try {
            const token = await login(email, password);
            ctx.authenticate(token);
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
        <AuthContent isLogin={true} onAuthenticate={handleLogin} />
    )
}

export default LoginScreen

const styles = StyleSheet.create({})