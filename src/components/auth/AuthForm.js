import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Button from '../ui/Button'
import Input from './Input'

// interface Props {
//     isLogin: boolean;
//     onSubmit: (credentail: ICredentail) => void;
//     credentialsInvalid: ICredentialsInvalid;
// }

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const { emailIsInvalid, emailsDontMatch, passwordIsInvalid, passwordsDontMatch } = credentialsInvalid;

    const handleUpdateInputValue = (inputType, value) => {
        switch (inputType) {
            case 'email':
                setEnteredEmail(value);
                break;

            case 'confirmEmail':
                setEnteredConfirmEmail(value);
                break;

            case 'password':
                setEnteredPassword(value);
                break;

            case 'confirmPassword':
                setEnteredConfirmPassword(value);
                break;

            default:
                break;
        }
    }

    const handelSubmit = () => {
        const credential = {
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword
        }

        onSubmit(credential);
    }

    return (
        <View style={{}}>
            <View>
                <Input
                    label="Email Address"
                    onUpdateValue={handleUpdateInputValue.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        onUpdateValue={handleUpdateInputValue.bind(this, 'confirmEmail')}
                        value={enteredConfirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label="Password"
                    onUpdateValue={handleUpdateInputValue.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        onUpdateValue={handleUpdateInputValue.bind(this, 'confirmPassword')}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={handelSubmit}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});