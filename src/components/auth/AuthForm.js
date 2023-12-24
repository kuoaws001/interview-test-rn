import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Button from '../ui/Button'
import Input from './Input'

const AuthForm = ({ onSubmit, credentialsInvalid }) => {
    const [enteredIdentifier, setEnteredIdentifier] = useState('in004');
    const [enteredPassword, setEnteredPassword] = useState('OMqkJBVEFvBOwca');

    const { identifierIsInvalid, passwordIsInvalid, } = credentialsInvalid;

    const handleUpdateInputValue = (inputType, value) => {
        switch (inputType) {
            case 'identifier':
                setEnteredIdentifier(value);
                break;

            case 'password':
                setEnteredPassword(value);
                break;

            default:
                break;
        }
    }

    const handelSubmit = () => {
        const credential = {
            identifier: enteredIdentifier,
            password: enteredPassword,
        }

        onSubmit(credential);
    }

    return (
        <View style={{}}>
            <View>
                <Input
                    label="Identifier"
                    onUpdateValue={handleUpdateInputValue.bind(this, 'identifier')}
                    value={enteredIdentifier}
                    isInvalid={identifierIsInvalid}
                />

                <Input
                    label="Password"
                    onUpdateValue={handleUpdateInputValue.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />

                <View style={styles.buttons}>
                    <Button onPress={handelSubmit}>
                        Log In
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