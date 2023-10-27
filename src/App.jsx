


import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import { createTheme } from '@mui/material'
import { themeOptions } from './ThemeOptions.jsx'
import { ThemeProvider } from '@emotion/react'
import { Applications } from './Pages/Applications/Applications.jsx'
import { Login } from './Pages/Login/Login'
import { useState } from 'react'
import { UserContext } from './Contexts.js'
import { Companies } from './Pages/Companies/Companies.jsx'

function App() {
  const [user, setUser] = useState(null)
  const theme = createTheme(themeOptions)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet />} >
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />} >
          <Route path='applications' element={<Applications />} />
          <Route path='companies' element={<Companies />} />

        </Route>
      </Route>
    )
  )
  return (

    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>

  )
}

export default App
