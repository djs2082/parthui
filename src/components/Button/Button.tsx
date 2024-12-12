import { ThemeProvider, Button } from "@mui/material";
import { getTheme } from "./themes";
import { CustomButtonProps } from "./types";

const CustomButton: React.FC<
  CustomButtonProps & { type: "primary" | "secondary" }
> = ({
  style,
  disabled,
  disableRipple,
  onClick,
  children,
  className,
  rounded = false,
  theme = "basic",
  type = "primary",
}) => {
  return (
    <ThemeProvider theme={getTheme(theme, type)}>
      <Button
        variant="text"
        className={`${className}`}
        disabled={disabled}
        disableRipple={disableRipple}
        sx={{
          ...style,
          borderRadius: rounded ? "40px" : "8px",
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
