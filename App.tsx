import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import {PaperProvider} from "react-native-paper";
import {ToastProvider} from "./src/providers/ToastContext";

type User = {
    name: string
    email: string
    phone: string
    company: { name: string }
}

type RootStackParamList = {
    Users: undefined
    Detail: { user: User }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <ToastProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Users" component={HomeScreen} />
                            <Stack.Screen name="Detail" component={DetailScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ToastProvider>
            </PaperProvider>
        </Provider>
    )
}