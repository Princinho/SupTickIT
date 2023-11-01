


import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import { createTheme } from '@mui/material'
import { themeOptions } from './ThemeOptions.jsx'
import { ThemeProvider } from '@emotion/react'
import { Login } from './Pages/Login/Login'
import { useEffect, useState } from 'react'
import { DataContext, UserContext } from './Contexts.js'
import { Companies } from './Pages/Companies/Companies.jsx'
import { Projects } from './Pages/Projects/Projects.jsx'
import { CompanyDetails } from './Pages/Companies/CompanyDetails.jsx'
import { sampleData as initialData } from './SampleData.js'
import { getSampleDataFromLocalStorage, saveSampleDataToLocalStorage } from './utils.js'
import { Users } from './Pages/Users/Users.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [sampleData, setSampleData] = useState(initialData)
  const theme = createTheme(themeOptions)
  useEffect(() => {
    let storedData = getSampleDataFromLocalStorage()
    console.log('retrieved storedData', storedData)
    if (!storedData) {
      console.log('no stored data, using initialData', initialData)
      storedData = initialData
      saveSampleDataToLocalStorage(initialData)
      setSampleData(initialData)
    } else {
      console.log('using storedData', storedData)
      setSampleData(storedData)
    }

  }, [])
  useEffect(() => {
    // Pour eviter que les donnees soient reinitialisees a chaque actualisation
    if (JSON.stringify(sampleData) != JSON.stringify(initialData))
      saveSampleDataToLocalStorage(sampleData)
    console.log('saving to localstorage', sampleData)
  }, [sampleData])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet />} >
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />} >
          <Route path='projects' element={<Projects />} />
          <Route path='companies' element={<Companies />} />
          <Route path='companies/:id' element={<CompanyDetails />} />
          <Route path='users' element={<Users />} />

        </Route>
      </Route>
    )
  )

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
