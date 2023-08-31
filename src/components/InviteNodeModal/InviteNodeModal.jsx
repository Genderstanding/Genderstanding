import React from "react";
import "../InviteNodeModal/InviteNodeModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InviteNodeModal = ({
  InviteCodeOpen,
  InviteCodeClose,
  children,
}) => {
  if (!InviteCodeOpen) {
    return null;
  }

  const dispatch = useDispatch();
  const [nodeId, setNodeId] = useState();
  //   const [codeText, setCodeText] = useState('1a2b3c4d');
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  // store invite code
  let inviteCode = useSelector((store) => store.inviteCodeReducer);
  // store owner's node information
  let ownerNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(ownerNode);
      setIsCodeCopied(true);
    } catch (error) {
      console.error("Error copying code:", error);
    }
  };

  // function to handle posting and getting code from database
  const handleGenerateCode = (ownerNodeId) => {
    try {
      dispatch({ type: "GENERATE_INVITE_CODE", payload: ownerNodeId });
      setNodeId(ownerNodeId);
      setIsCodeCopied(false);
    } catch (error) {
      console.log("Error in button click to generate new node: ", error);
    }
  };

  // // display code from database
  // useEffect(() => {
  //  dispatch({type:"FETCH_INVITE_CODE"})
  // }, [])

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center invite-code-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold">Generate Invite Code</h2>
        <div className="code-container">
          <span className="code-text">{inviteCode}</span>
          <p>{ownerNode.id}</p>
          <button className="ml-4 copy-code-button" onClick={copyCode}>
            {isCodeCopied ? "Code Copied!" : "Copy Code"}
          </button>
        </div>
        <div className="flex mt-6 buttons-container">
          <button
            className="mr-6 underline"
            onClick={() => handleGenerateCode(ownerNode.id)}
          >
            Generate
          </button>
          <button className="underline " onClick={InviteCodeClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteNodeModal;
