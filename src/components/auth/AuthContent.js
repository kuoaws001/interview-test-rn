import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/styles';
import AuthForm from './AuthForm';

const AuthContent = ({ onAuthenticate }) => {

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        identifierIsInvalid: false,
        passwordIsInvalid: false,
    });

    const handleSubmit = (credentail) => {
        let { identifier, password } = credentail;

        identifier = identifier.trim();
        password = password.trim();

        const identifierIsInvalid = identifier.length >= 4;
        const passwordIsValid = password.length >= 4;

        if (!identifierIsInvalid || !passwordIsValid) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                identifierIsInvalid: !identifierIsInvalid,
                passwordIsInvalid: !passwordIsValid,
            });
            return;
        }

        onAuthenticate({ identifier, password });
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                onSubmit={handleSubmit}
                credentialsInvalid={credentialsInvalid}
            />
        </View>
    )
}

export default AuthContent

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});