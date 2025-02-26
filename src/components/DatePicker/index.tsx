import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@emotion/react";
import { getTheme } from "./themes";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface DesktopDatePickerType {
  label: string;
  inputFormat: string;
  value: Date;
  required: boolean;
  error: string;
  errorText: string;
}
const DatePicker: React.FC<DesktopDatePickerType> = ({
  label,
  inputFormat,
  value,
  required,
  error,
  errorText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={getTheme}>
        <FormControl>
          <DesktopDatePicker
            label={label}
            inputFormat={inputFormat || "dd/MM/yyyy"}
            value={value}
            renderInput={(params) => (
              <TextField
                required={required}
                {...params}
                sx={{ fontSize: "16px" }}
                error={error || !!error}
                size="normal"
              />
            )}
          ></DesktopDatePicker>
        </FormControl>
        <FormHelperText id="outlined-weight-helper-text" className="no-margin">
          <p
            style={{
              color: "#DB5461",
              fontSize: "12px",
            }}
          >
            {errorText ? errorText : ""}
          </p>
        </FormHelperText>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DatePicker;
