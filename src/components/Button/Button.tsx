import { createTheme, ThemeProvider, Button } from "@mui/material";
import { basicTheme } from "./Themes";
import { CustomButtonProps } from "./types";

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  disabled,
  disableRipple,
  onClick,
  children,
  className,
  rounded = false,
}) => {
  return (
    <ThemeProvider theme={basicTheme}>
      <Button
        className={`primary-button ${className}`}
        disabled={disabled}
        disableRipple={disableRipple}
        sx={{ ...style, borderRadius: rounded ? "40px" : "8px" }}
        onClick={onClick}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
