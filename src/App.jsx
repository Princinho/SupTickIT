import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { createTheme } from "@mui/material";
import { themeOptions } from "./ThemeOptions.jsx";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { DataContext, UserContext } from "./Contexts.js";
import { Companies } from "./Pages/Companies/Companies.jsx";
import { Projects } from "./Pages/Projects/Projects.jsx";
import { CompanyDetails } from "./Pages/Companies/CompanyDetails.jsx";
import { sampleData as initialData } from "./SampleData.js";
import {
  getSampleDataFromLocalStorage,
  saveDataToLocalStorage,
} from "./utils.js";
import { Users } from "./Pages/Users/Users.jsx";
import { UserDetails } from "./Pages/Users/UserDetails.jsx";
import { Categories } from "./Pages/Categories/Categories.jsx";
import { LoginRegister } from "./Pages/Login/LoginRegister.jsx";
import { Tickets } from "./Pages/Tickets/Tickets.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TicketDetails } from "./Pages/Tickets/AgentTickets/TicketDetails.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AccessDenied } from "./Pages/Login/AccessDenied.jsx";
import { SystemSettings } from "./Pages/SystemSettings/SystemSettings.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ServiceCategories } from "./Pages/ServiceCategories/ServiceCategories.jsx";
import { Vehicles } from "./Pages/Vehicles/Vehicles.jsx";
import { Customers } from "./Pages/Customers/Customers.jsx";
function App() {
  const [user, setUser] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const theme = createTheme(themeOptions);
  const queryClient = new QueryClient();
  let storedData = getSampleDataFromLocalStorage();
  if (!storedData) {
    console.log("no stored data, using initialData", initialData);
    storedData = initialData;
    saveDataToLocalStorage(initialData);
    setSampleData(initialData);
  } else {
    if (!sampleData) setSampleData(storedData);
  }

  useEffect(() => {
    // Pour eviter que les donnees soient reinitialisees a chaque actualisation
    try {
      let stringifiedSampleData = JSON.stringify(sampleData);
      let stringifiedInitialData = JSON.stringify(initialData);
      if (stringifiedSampleData != stringifiedInitialData)
        saveDataToLocalStorage(sampleData);
    } catch (e) {
      console.warn(e);
    }
  }, [sampleData]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route path="accessdenied" element={<AccessDenied />} />
        <Route path="login" element={<LoginRegister />} />
        <Route path="/" element={<Layout />}>
          <Route path="projects" element={<Projects />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:id" element={<CompanyDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="servicecategories" element={<ServiceCategories />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="customers" element={<Customers />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
          <Route path="systemsettings" element={<SystemSettings />} />
        </Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <DataContext.Provider value={{ sampleData, setSampleData }}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </DataContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
