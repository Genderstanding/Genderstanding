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

  if (!InviteCodeOpen) {
    return null;
  }


  // Code input
  const handleNodeCodeInput = (event, nodeCodeInput, nodeAssociation) => {
    event.preventDefault();
    try {
      // loop through all of the current nodeAssociations
      for (let node of nodeAssociation) {
        // look for the auth_code in the database and match it to the inputed code
        if (node?.auth_code == nodeCodeInput) {
          // If there are no users already associated to the node with the inputed code,
          // dispatch a database update to PUT the user's ID into the database as a user
          // who can view the node
          if (node?.user_id == null) {
            dispatch({
              type: "USER_NODE_ASSOCIATION",
              payload: nodeCodeInput,
            });

            toast.success("Invite code submitted successfully", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            history.push("/home");
          } else if (node?.user_id !== null) {
            toast.error("Invite code has already been used", {
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
        }
      }
    } catch (error) {
      toast.error("Error submitting invite code", {
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

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center add-node-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold text-amber-950">Enter Invite Code</h2>
        <div className="code-container">
          <input
            type="text"
            placeholder="Enter a code ..."
            className="border-b border-black text-amber-950"
            onChange={(event) => setNodeCodeInput(event.target.value)}
          />

          <div className="mt-6 buttons-container text-amber-950">
            <button
              className="mr-6 font-semibold active:underline active:font-bold"
              onClick={(event) =>
                handleNodeCodeInput(event, nodeCodeInput, nodeAssociation)
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
