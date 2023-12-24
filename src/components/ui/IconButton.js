import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

// interface Props {
//     icon: string;
//     color: string | undefined;
//     size: number;
//     onPress: () => void;
// }

const IconButton = ({ icon, color, size, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        margin: 8,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.7,
    },
});