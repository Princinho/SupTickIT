import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import { createTheme } from '@mui/material'
import { themeOptions } from './ThemeOptions.jsx'
import { ThemeProvider } from '@emotion/react'
import { Applications } from './Pages/Applications.jsx'
const theme = createTheme(themeOptions)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='applications' element={<Applications />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
