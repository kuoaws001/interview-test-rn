import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import { Colors } from '../../constants/styles'

// interface Props {
//     onPress: () => void;
// }

const FlatButton = ({ onPress, children }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default FlatButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.primary100,
    },
});