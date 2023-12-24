import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

import { Colors } from '../../constants/styles'

// interface Props {
//     label: string;
//     keyboardType?: any;
//     secure?: any;
//     onUpdateValue: (value: string) => void;
//     value: any;
//     isInvalid: boolean
// }

const Input = ({ label, keyboardType, secure, onUpdateValue, value, isInvalid }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                // autoCapitalize={false}
                // autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: Colors.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        fontSize: 16,
    },
    inputInvalid: {
        backgroundColor: Colors.error100,
    },
});