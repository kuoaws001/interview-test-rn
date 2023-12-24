import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/styles';
import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { useNavigation } from '@react-navigation/native';

// interface Props {
//     isLogin: boolean;
//     onAuthenticate: ({ email, password }: { email: string, password: string }) => void;
// }

const AuthContent = ({ isLogin, onAuthenticate }) => {

    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        emailIsInvalid: false,
        passwordIsInvalid: false,
        emailsDontMatch: false,
        passwordsDontMatch: false,
    });

    const handleSwitchAuthMode = () => {
        if (isLogin) {
            navigation.replace('Signup');
        } else {
            navigation.replace('Login');
        }
    }

    const handleSubmit = (credentail) => {
        let { email, confirmEmail, password, confirmPassword } = credentail;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                emailIsInvalid: !emailIsValid,
                emailsDontMatch: !emailIsValid || !emailsAreEqual,
                passwordIsInvalid: !passwordIsValid,
                passwordsDontMatch: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }

        onAuthenticate({ email, password });
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
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