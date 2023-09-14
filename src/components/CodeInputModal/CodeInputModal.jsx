import React from "react";
import "./CodeInputModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CodeInputModal = ({
  InviteCodeOpen,
  handleCloseInviteModal,
  children,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [nodeCodeInput, setNodeCodeInput] = useState("");

  // Store to match against currently available codes
  const nodeAssociation = useSelector(
    (store) => store.nodeAssociationReducer.nodeAssociationDatabase
  );

  const node = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  const user = useSelector((store) => store.user);

  if (!InviteCodeOpen) {
    return null;
  }

  // Code input
  const handleNodeCodeInput = (event, nodeCodeInput, nodeAssociation, user) => {
    event.preventDefault();

    try {
      let matchingNode = nodeAssociation.find(
        (node) => node?.auth_code === nodeCodeInput
      );

      if (
        !matchingNode ||
        !matchingNode.auth_code ||
        nodeCodeInput.length !== 8
      ) {
        toast.error("Invalid Code or Community not found", getToastOptions());
        return;
      }

      if (matchingNode.user_id === null) {
        // Dispatch a database update to PUT the user's ID into the database
        dispatch({
          type: "USER_NODE_ASSOCIATION",
          payload: nodeCodeInput,
        });
        toast.success("Invite code submitted successfully", getToastOptions());
        history.push("/home");
      } else if (matchingNode.user_id !== null) {
        // Dispatch a database update to PUT the user's ID into the database
        if (matchingNode.user_id === user.id) {
          toast.error("You're already in the community", getToastOptions());
        } else if (matchingNode.user_id !== user.id) {
          toast.error("Code has already been used", getToastOptions());
        }
      } else {
        toast.error("error inputting code", getToastOptions());
      }
      // clear input
      setNodeCodeInput("");
    } catch (error) {
    }
  };

  // TOASTIFY
  const getToastOptions = () => ({
    position: "bottom-left",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center add-node-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold text-amber-950">
          Enter Invite Code
        </h2>
        <div className="code-container">
          <input
            type="text"
            placeholder="Enter a code ..."
            className="border-b border-black text-amber-950"
            onChange={(event) => setNodeCodeInput(event.target.value)}
            value={nodeCodeInput}
          />

          <div className="mt-6 buttons-container text-amber-950">
            <button
              className="mr-6 font-semibold active:underline active:font-bold"
              onClick={(event) =>
                handleNodeCodeInput(event, nodeCodeInput, nodeAssociation, user)
              }
            >
              Confirm
            </button>

            <button
              className="font-semibold active:underline active:font-bold"
              onClick={handleCloseInviteModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
