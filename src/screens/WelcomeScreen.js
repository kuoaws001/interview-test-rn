import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../store/AuthContext'

const WelcomeScreen = () => {
    const [message, setMessage] = useState('');

    const ctx = useContext(AuthContext);
    const token = ctx.token;

    // useEffect(() => {
    //     axios
    //         .get('https://react-native-course-37b62-default-rtdb.firebaseio.com/message.json?auth=' + token)
    //         .then((response) => {
    //             setMessage(response.data)
    //         })
    // }, [token]);

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>

            <Text>{message}</Text>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});