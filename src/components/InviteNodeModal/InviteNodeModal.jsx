import React from "react";
import "../InviteNodeModal/InviteNodeModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const InviteNodeModal = ({ InviteCodeOpen, InviteCodeClose, children }) => {
  const dispatch = useDispatch();
  const [nodeId, setNodeId] = useState();
  // store invite code
  let inviteCode = useSelector((store) => store.inviteCodeReducer);
  // store owner's node information
  let ownerNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  // modal setting
  if (!InviteCodeOpen) {
    return null;
  }

  console.log(inviteCode, "invite code in CLIENT");

  // function to handle posting code to database
  const handleGenerateCode = (ownerNodeId) => {
    try {
      // set and send ownerNodeId to database
      dispatch({ type: "GENERATE_INVITE_CODE", payload: ownerNodeId });
      setNodeId(ownerNodeId);
      console.log('nodeid', ownerNodeId)
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
        <div className="mt-6 buttons-container">
          <button
            className="mr-6 underline"
            onClick={() => handleGenerateCode(ownerNode.id)}
          >
            Generate
          </button>
          <p>{ownerNode.id}</p>
          <p>{inviteCode?.[0]}</p>
          <button className="underline " onClick={InviteCodeClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteNodeModal;
