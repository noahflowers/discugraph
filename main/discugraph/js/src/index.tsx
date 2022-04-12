import React from 'react'
import ReactDOMClient from 'react-dom/client' 
import { App } from './App'

const docuroot = document.getElementById('root') as Element
ReactDOMClient.createRoot(docuroot).render(
    <App />,
)