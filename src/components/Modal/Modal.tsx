import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss";
import { CustomModalProps } from "./type";
import { getTheme } from "./themes";

const reasonsToAvoidModalHide = ["backdropClick", "escapeKeyDown"];

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  onHide,
  header,
  body,
  className,
  primaryButton,
  secondaryButton,
  style,
  theme = "basic",
}) => {
  const themeToUse = getTheme(theme);
  const modalDefaultStyle = {
    position: "absolute",
    outline: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: themeToUse.palette.background.paper,
    // @ts-ignore
    border: themeToUse.custom.border,
    padding: themeToUse.spacing(1),
    // @ts-ignore
    boxShadow: themeToUse.custom.shadow,
    borderRadius: themeToUse.shape.borderRadius,
  };

  const handleClose = (reason: string) => {
    if (reason && reasonsToAvoidModalHide.includes(reason)) return;
    onHide();
  };

  return (
    <div className="modal-box">
      <ThemeProvider theme={getTheme(theme)}>
        <Modal open={show} onClose={handleClose} className={className}>
          <Box
            className="modal-box-wrapper"
            sx={{ ...modalDefaultStyle, ...style }}
          >
            {/* modal Header */}
            <div id="modal-header-content" className="modal-header-content">
              <span id="modal-close-button" className="modal-close-button">
                <IconButton onClick={onHide}>
                  {" "}
                  <CloseIcon />{" "}
                </IconButton>
              </span>
            </div>
            {/* modal content */}
            <div className="modal-details">
              {/* modal image and content */}
              <div id="modal-content" className="modal-content">
                <div
                  id="modal-text-and-icon"
                  className="modal-text-and-icon"
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "24px",
                  }}
                >
                  <span
                    id="modal-text"
                    className="modal-text"
                    style={{
                      width: "100%",
                    }}
                  >
                    <span
                      id="modal-content-header"
                      className="modal-content-header"
                      style={{ textAlign: "center" }}
                    >
                      {header}
                    </span>

                    <span
                      id="modal-content-body"
                      className="modal-content-body"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "24px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {body}
                    </span>
                  </span>
                </div>
              </div>
              {/* modal content buttons */}
              <div
                id="modal-buttons"
                className="modal-buttons"
                style={{
                  flexDirection: "row",
                  gap: "24px",
                }}
              >
                {primaryButton}
                {secondaryButton}
              </div>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
  // return <></>;
};

export default CustomModal;
