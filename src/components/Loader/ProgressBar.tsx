import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { loaderType } from "./types";
import { ThemeProvider } from "@emotion/react";
import { getTheme } from "./themes";

interface ProgressBarProps {
  progress: number;
  type?: loaderType;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  type = "basic",
}) => {
  if (progress === 0) return <></>;
  const getProgressBarClass = () => {
    switch (type) {
      case "love":
        return "love-progress-bar";
      case "shadi":
        return "love-progress-bar";
      default:
        return "basic-progress-bar";
    }
  };
  console.log(getTheme(type));
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      height="30px"
      width="100%"
    >
      <Box width="100%" mr={1}>
        <ThemeProvider theme={getTheme(type)}>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={getProgressBarClass()}
          />
        </ThemeProvider>
      </Box>
      <Box minWidth={35}>
        {/* @ts-ignore */}
        <Typography
          variant="body1"
          sx={{ color: "white" }}
          // color="textPrimary"
        >
          <p style={{ color: "white", marginTop: "16px" }}>{`${Math.round(
            progress
          )}% done...`}</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
