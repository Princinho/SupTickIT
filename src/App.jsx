


import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import { createTheme } from '@mui/material'
import { themeOptions } from './ThemeOptions.jsx'
import { ThemeProvider } from '@emotion/react'
import { Login } from './Pages/Login/Login'
import { useState } from 'react'
import { DataContext, UserContext } from './Contexts.js'
import { Companies } from './Pages/Companies/Companies.jsx'
import { Projects } from './Pages/Projects/Projects.jsx'
import { CompanyDetails } from './Pages/Companies/CompanyDetails.jsx'
import { sampleData as initialData } from './SampleData.js'

function App() {
  const [user, setUser] = useState(null)
  const [sampleData, setSampleData] = useState(initialData)
  const theme = createTheme(themeOptions)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet />} >
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />} >
          <Route path='projects' element={<Projects />} />
          <Route path='companies' element={<Companies />} />
          <Route path='companies/:id' element={<CompanyDetails />} />

        </Route>
      </Route>
    )
  )
  console.log(sampleData)
  return (

    <UserContext.Provider value={{ user, setUser }}>
      <DataContext.Provider value={{ sampleData, setSampleData }}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </DataContext.Provider>
    </UserContext.Provider>

  )
}

export default App
