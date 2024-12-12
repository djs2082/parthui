import { createTheme } from "@mui/material";

const paletteDesign = {
  primary: {
    main: "#1976d2",
  },
  secondary: {
    main: "#dc004e",
  },
};

const typographyDesign = {
  button: {
    textTransform: "none",
  },
};

const styleDesign = {
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
};

const styleDesignHover = {
  boxShadow: "0px 4px 4px rgba(138, 110, 147, 0.5)",
};

const styleDesignActive = {
  background: "rgba(128, 0, 0, 1)",
};

const styleDesignDisabled = {
  background: "#e5eef1",
  color: "#bcccd3",
};

export const shadiBioDataThemePrimary = createTheme({
  palette: paletteDesign,
  // @ts-ignore
  typography: typographyDesign,
  components: {
    MuiButton: {
      styleOverrides: {
        // @ts-ignore
        root: {
          ...styleDesign,
          "&:hover": {
            ...styleDesignHover,
          },
          "&:active": {
            ...styleDesignActive,
          },
          "&:disabled": {
            ...styleDesignDisabled,
          },
        },
      },
    },
  },
});

export const shadiBioDataThemeSecondary = createTheme({
  palette: paletteDesign,
  // @ts-ignore
  typography: typographyDesign,
  components: {
    MuiButton: {
      styleOverrides: {
        // @ts-ignore
        root: {
          ...styleDesign,
          backgroundColor: "white",
          color: "rgba(128, 0, 0, 0.8)",
          border: "1px solid rgba(128, 0, 0, 0.8)",
          "&:hover": {
            ...styleDesignHover,
          },
          "&:active": {
            ...styleDesignActive,
            backgroundColor: "rgba(128, 0, 0, 1)",
            border: "1px solid rgba(128, 0, 0, 1)",
            color: "white",
          },
          "&:disabled": {
            ...styleDesignDisabled,
          },
        },
      },
    },
  },
});
