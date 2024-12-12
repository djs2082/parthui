import { createTheme } from "@mui/material/styles";

const basicTheme = createTheme({
  palette: {
    background: {
      paper: "#f9f9f9",
    },
  },
  shape: {
    borderRadius: 2,
  },
  spacing: 8,
  // @ts-ignore
  custom: {
    border: "1px solid #e5eef1",
    shadow:
      "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(0, 0, 0, 0.08)",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e5eef1",
          width: "24px",
          height: "24px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "10px !important",
          color: "#0483df",
          width: "15px",
          height: "15px",
          stroke: "#0483df",
          strokeWidth: "2px",
        },
      },
    },
  },
});

export default basicTheme;
