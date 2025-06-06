import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
    id: number
    name: string
    email: string
    phone: string
    company: { name: string }
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
        }),
    }),
})

export const { useGetUsersQuery } = usersApi