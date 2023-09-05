import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardActionArea, Typography } from "@mui/material";

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
  let allNodes = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  const handleDeleteNode = (nodeId) => {
    try {
      dispatch({ type: "DELETE_NODE", nodeId });
    } catch (error) {
      console.log("error deleting nodes", error);
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
        Remove Node
      </TriggerButton>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        {/* NODES */}
        <Box className="text-center text-amber-950" sx={style}>
          <h2 className="text-xl font-bold text-center">Your Communities</h2>
          {allNodes.map((node) => {
            const isDeleteButtonVisible = showDeleteButtons.includes(node.id);

            return (
              <div
                className="my-5 font-semibold text-center text-md"
                key={node.id}
              >
                <Card className=" bg-rose-100 border-r-12" sx={{ minWidth: 50, maxWidth: 200, height:30}}>
                  <CardActionArea onClick={() => toggleShowDeleteButton(node.id)}>
                    <Typography>
                      {isDeleteButtonVisible ? (
                        <button
                          className="font-semibold border-r-12"
                          onClick={() => handleDeleteNode(node.id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <div className="font-semibold border-r-12">
                          {node.node_name}
                        </div>
                      )}
                    </Typography>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
          <button
            className="font-bold text-center ml-15 active:underline"
            onClick={() => handleClose(false)}
          >
            Close
          </button>
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
  minHeight: 200,
  maxHeight: 500,
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
