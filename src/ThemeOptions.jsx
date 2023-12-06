

import { frFR } from '@mui/material/locale'
export const themeOptions = {

    palette: {
        mode: 'light',
        primary: {
            main: '#003463',
            light: '#0090D7',
            dark: '#001A31',
            contrastText: "#ffffff",
        },
        secondary: {
            main: '#FA1A32',
        },
        menu: {
            main: '#0090D7'
        },
        background: {
            default: '#f5f5f5',
        },
        lightblue: {
            main: "#0090D7",
            dark: "#0090C7",
            light: "#0090E7",
            contrastText: "rgba(255, 255, 255, 0.87)"
        }

    },
    typography: {
        fontFamily: '"Urbanist", "Roboto", "Arial", sans-serif',
        // fontSize: 16,
    },
    props: {
        MuiAppBar: {
            color: 'secondary',
        },
    },
    frFR

};