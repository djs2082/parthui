import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// @ts-ignore
import SpinnerImage from "./../../images/spinner.gif";
// @ts-ignore
import BasicSpinnerImage from "./../../images/basicSpinner.gif";
import "./index.scss";
import ProgressBar from "./ProgressBar";

interface LoaderProps {
  type: "basic" | "love" | "shadi";
  count: number;
  progress?: number;
}

const modalDefaultStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  padding: "10px",
  width: "100%",
  Height: "100%",
  background: "rgba(0,0,0,0.2)",
  boxShadow: "none",
};

const Loader: React.FC<LoaderProps> = ({
  count,
  type = "basic",
  progress = 0,
}) => {
  const getLoaderImage = () => {
    switch (type) {
      case "love":
        return SpinnerImage;
      case "shadi":
        return SpinnerImage;
      default:
        return BasicSpinnerImage;
    }
  };
  if (count <= 0) return <></>;
  return (
    <div className="modal-box">
      <Modal open>
        <Box className="loader-modal-box-wrapper" sx={{ modalDefaultStyle }}>
          <div className="loader-modal-details">
            <img
              src={getLoaderImage()}
              alt="Loading..."
              className="spinner-image"
            />
            {progress > 0 ? (
              <ProgressBar progress={progress} type={type} />
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Loader;
