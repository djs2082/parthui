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
  backgroundColor: "#0483df",
  borderRadius: "8px",
  fontSize: "16px",
  textAlign: "center",
  color: "white",
  textTransform: "none",
  zIndex: 2,
};

const styleDesignHover = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};

const styleDesignActive = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#06335a",
};

const styleDesignDisabled = {
  background: "#e5eef1",
  backgroundColor: "#bcccd3",
};

export const basicThemePrimary = createTheme({
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

export const basicThemeSecondary = createTheme({
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
          border: "1px solid #68bcff",
          color: "#0483df",
          "&:hover": {
            ...styleDesignHover,
          },
          "&:active": {
            ...styleDesignActive,
            backgroundColor: "#004b87",
            border: "1px solid #004b87",
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
