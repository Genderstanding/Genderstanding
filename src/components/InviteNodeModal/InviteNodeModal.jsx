import React from "react";
import "../InviteNodeModal/InviteNodeModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This holds modal to create invite code 
export const InviteNodeModal = ({
  InviteCodeOpen,
  InviteCodeClose,
  children,
}) => {
  if (!InviteCodeOpen) {
    return null;
  }
  const [nodeId, setNodeId] = useState();
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  // store invite code
  let inviteCode = useSelector((store) => store.inviteCodeReducer);
  // store owner's node information
  let ownerNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
 const dispatch = useDispatch();
 
 // handle code copying 
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setIsCodeCopied(true);
    } catch (error) {
      toast.error("Failed to copy invite code", {
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

  // function to handle posting and getting code from database
  const handleGenerateCode = (e, nodeID) => {
    e.preventDefault()
    try { 
      setNodeId(nodeID)
      setIsCodeCopied(false);
      dispatch({type: "SET_INVITE_CODE", payload: {node_id: nodeID} })
    } catch (error) {
      toast.error("Failed to generate invite code", {
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
      <div className="flex flex-col items-center justify-center invite-code-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold text-amber-950">Generate Invite Code </h2>
        <div className="code-container">
          <span className="code-text text-amber-950">{!inviteCode.length > 0 ? "" : inviteCode}</span>
          <button className="ml-4 copy-code-button text-amber-950" onClick={copyCode}>
            {isCodeCopied ? "Code Copied!" : "Copy Code"}
          </button>
        </div>
        <div className="flex mt-6 buttons-container text-amber-950">
          <button
            className="mr-6 font-bold active:underline text-amber-950"
            onClick={(e) => handleGenerateCode(e, ownerNode.id)}
          >
            Generate
          </button>
          <button className="font-bold active:underline" onClick={() => InviteCodeClose(dispatch({type:"CLEAR_GENERATE_INVITE_CODE"}))}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteNodeModal;
