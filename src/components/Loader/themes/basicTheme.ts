import { createTheme, ThemeProvider } from "@mui/material/styles";

const basicTheme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: "#0483df",
        },
        colorPrimary: {
          backgroundColor: "white",
        },
      },
    },
  },
});

export default basicTheme;
