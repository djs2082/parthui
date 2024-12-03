import { createTheme } from "@mui/material";

const shadiBioDataTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          maxWidth: "100%",
          height: "40px",
          width: "240px",
          backgroundColor: "rgba(128, 0, 0, 0.8)",
          borderRadius: "8px",
          fontSize: "16px",
          textAlign: "center",
          color: "white",
          textTransform: "none",
          zIndex: 2,
          "&:hover": {
            boxShadow: "0px 4px 4px rgba(138, 110, 147, 0.5)",
            backgroundColor: "rgba(128, 0, 0, 1)",
          },
          "&:active": {
            background: "#004b87",
          },
          "&:disabled": {
            background: "#e5eef1",
            color: "#bcccd3",
          },
        },
      },
    },
  },
});

export default shadiBioDataTheme;
