import { createTheme } from "@mui/system";

export const basicTheme = createTheme({
  palette: {
    common: {
      black: "#CEB2CF",
    },
    info: {
      light: "#DB5461",
      main: "#DB5461",
    },
    primary: {
      light: "#CEB2CF",
      main: "#CEB2CF",
    },
    text: {
      primary: "#7F8589",
      main: "#7F8589",
      disabled: "#4B3851",
    },
    action: {
      hover: "#7F8589",
      active: "#CEB2CF",
      focus: "#CEB2CF",
    },
    error: {
      light: "#DB5461",
      main: "#DB5461",
    },
  },
  shape: {
    borderRadius: 1,
  },
  typography: {
    label: {
      fontSize: 16,
      fontWeight: "400",
    },
    fontSize: 16,
  },
  mixins: {
    toolbar: {
      minHeight: 60,
    },
  },
});

export default basicTheme;
