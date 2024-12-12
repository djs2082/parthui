import { createTheme, ThemeProvider } from "@mui/material/styles";

const loveTheme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: "red !important",
        },
        colorPrimary: {
          backgroundColor: "red !important",
        },
      },
    },
  },
});

export default loveTheme;
