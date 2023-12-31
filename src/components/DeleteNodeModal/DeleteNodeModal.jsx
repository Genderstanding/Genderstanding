import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardActionArea, Typography } from "@mui/material";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteNodeModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // all nodes from a user
  const allNodes = useSelector(
    (store) => store.nodeReducer.nodeDatabaseResponse
  );
  const user = useSelector((store) => store.user);

  const handleDeleteNode = (nodeID) => {
    try {
      dispatch({ type: "DELETE_NODE", payload: nodeID });
      setShowDeleteButtons((prevState) =>
        prevState.filter((id) => id !== nodeID)
      );
    } catch (error) {
      toast.error("Failed to delete community", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  const toggleShowDeleteButton = (nodeId) => {
    setShowDeleteButtons((prevState) =>
      prevState.includes(nodeId)
        ? prevState.filter((id) => id !== nodeId)
        : [...prevState, nodeId]
    );
  };
  

  return (
    <div className="text-amber-950">
      <TriggerButton
        className="text-amber-950"
        type="button"
        onClick={handleOpen}
      >
        Remove Community
      </TriggerButton>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        {/* NODES */}
        <Box className="overflow-y-auto text-center text-amber-950" sx={style}>
          <h2 className="text-xl font-bold text-center ">Your Communities</h2>
          <div className="" style={{ minHeight: "240px" }}>
            {allNodes.map((node) => {
              if (user?.id == node?.user_id) {
                const isDeleteButtonVisible = showDeleteButtons.includes(
                  node?.id
                );

                return (
                  <div
                    className="my-5 font-semibold text-center text-md "
                    key={node.id}
                  >
                    <Card
                      className="text-center border-r-12"
                      sx={{ minWidth: 50, maxWidth: 200, minHeight: 30 }}
                    >
                      <CardActionArea
                        onClick={() => toggleShowDeleteButton(node?.id)}
                      >
                        <Typography>
                          {isDeleteButtonVisible ? (
                            <button
                              className="font-bold border-r-12"
                              onClick={() => handleDeleteNode(node?.id)}
                            >
                              Delete
                            </button>
                          ) : (
                            <div className="w-32 ml-10 font-semibold truncate border-r-12">
                              {node?.node_name}
                            </div>
                          )}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              }
              return null; // if condition doesn't match
            })}
          </div>
          <div className="my-10 text-center ">
            <button
              className="font-bold active:underline"
              onClick={() => handleClose(false)}
            >
              Close
            </button>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 270,
  minHeight: 400,
  maxHeight: 400,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: mulish, sans-serif;
  font-weight: 700;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
  }
  `
);
