import { frFR } from "@mui/material/locale";
export const themeOptions = {
  palette: {
    menu: {
      main: "#3A173F",
    },
    lightblue: {
      main: "#3A173F",
      dark: "#3A173F",
      light: "#3A173F",
      contrastText: "rgba(255, 255, 255, 0.87)",
    },
    mode: "dark",
    primary: {
      main: "#f57505",
    },
    secondary: {
      main: "#edd382",
    },
    text: {
      primary: "#efefef",
    },
    background: {
      paper: "#020122",
      default: "#020122",
    },
  },
  typography: {
    fontFamily: '"Urbanist", "Roboto", "Arial", sans-serif',
    // fontSize: 16,
  },
  props: {
    MuiAppBar: {
      color: "secondary",
    },
  },
  frFR,
};
