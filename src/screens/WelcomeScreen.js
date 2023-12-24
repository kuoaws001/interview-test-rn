import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserAvatar from 'react-native-user-avatar';
import { AuthContext } from '../store/AuthContext'
import Button from '../components/ui/Button';

const WelcomeScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    const handlePress = () => {
        navigation.navigate('PageOne');
    }

    return (
        <View style={styles.rootContainer}>
            <UserAvatar size={50} name={user?.displayName} />
            <Text style={styles.title}>{user?.displayName}</Text>
            <Text style={styles.title}>{user?.email}</Text>

            <Button onPress={handlePress}>
                Page One
            </Button>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
});