import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MessageBoard } from './components/MessageBoard'

const queryClient = new QueryClient()

export const App: (() => JSX.Element) = () => {
     
    return (
        <QueryClientProvider client={queryClient}>
            <MessageBoard />
        </QueryClientProvider>
    )
}