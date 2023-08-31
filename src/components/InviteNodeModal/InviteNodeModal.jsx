import React from "react";
import '../InviteNodeModal/InviteNodeModal.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InviteNodeModal = ({
  InviteCodeOpen,
  InviteCodeClose,
  children,
}) => {
  if (!InviteCodeOpen) {
    return null;
  }
  // sourcing dispatch to use calls
  const dispatch = useDispatch();
  // sourcing use selector to hold store information
  let newCode = useSelector((store) => store.newCodeReducer);

  // function to handle posting and getting code from database
  const handleGenerateCode = () => {
    try {
      dispatch({ type: "GENERATE_CODE" });
    } catch (error) {
      console.log("Error in button click to generate new node: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center invite-code-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold">Generate Invite Code</h2>
        <div className="mt-6 buttons-container">
          <button className="mr-6 underline" onClick={handleGenerateCode}>
            Generate
          </button>
          <div>{newCode}</div>
          <button className="underline " onClick={InviteCodeClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
