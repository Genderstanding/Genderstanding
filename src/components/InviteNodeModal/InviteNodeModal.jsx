import React from "react";
import './InviteNodeModal.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";


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
        <div className="code-container">
          <span>1a2b3c4d</span>
          <button className="copy-code-button underline ml-4">
            copy
          </button>
        </div>
        <div className="buttons-container flex mt-6">
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
