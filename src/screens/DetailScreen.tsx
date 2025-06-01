import React from 'react'
import {View, Text} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type User = {
    name: string
    email: string
    phone: string
    company: { name: string }
}

type RootStackParamList = {
    Detail: { user: User }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

export default function DetailScreen({ route }: Props) {
    const { user } = route.params

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
            <Text style={{ marginTop: 8 }}>Email: {user.email}</Text>
            <Text>Phone: {user.phone}</Text>
            <Text>Company: {user.company.name}</Text>
        </View>
    )
}