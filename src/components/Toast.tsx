import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

type Props = {
    visible: boolean
    message: string
    backgroundColor?: string
}

export default function Toast({ visible, message, backgroundColor = '#333' }: Props) {
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start()
    }, [visible])

    return (
        <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 16,
        right: 0,
        zIndex: 9999,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
})