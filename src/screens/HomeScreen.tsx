import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, Button, TouchableOpacity, TextInput } from 'react-native'
import { useGetUsersQuery } from '../features/users/usersApi'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useToast } from '../providers/ToastContext'

type Props = NativeStackScreenProps<any, 'Users'>

export default function HomeScreen({ navigation }: Props) {
    const { data, error, isLoading, isSuccess, refetch } = useGetUsersQuery()
    const { showToast } = useToast()
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (error) {
            showToast('Error loading users', 'red')
        } else if (isSuccess && data?.length) {
            showToast('Successfully loaded users', 'green')
        }
    }, [error, isSuccess, data])

    const handleRefresh = async () => {
        const result = await refetch()
        if ('error' in result) {
            showToast('Failed to refresh users', 'red')
        } else {
            showToast('Users refreshed', 'green')
        }
    }

    const filteredUsers = useMemo(() => {
        if (!data) return []
        return data.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data, searchQuery])

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                }}
            />

            <Button title="Refresh" onPress={handleRefresh} />

            {isLoading && <Text style={{ marginTop: 16 }}>Loading...</Text>}

            {!isLoading && filteredUsers && (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail', { user: item })}
                            style={{ paddingVertical: 12 }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}