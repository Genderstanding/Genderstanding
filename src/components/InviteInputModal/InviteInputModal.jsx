import React from "react";
import "./InviteInputModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const InviteInputModal = ({ InviteCodeOpen, children }) => {
  if (!InviteCodeOpen) {
    return null;
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const [codeInput, setCodeInput] = useState();
  
  // function to handle posting and getting code from database
  const handleInputCode = (event) => {
    event.preventDefault();
    try {
      // UPDATE the INVITE CODE
      dispatch({ type:"ENTER_INVITE_CODE", payload: codeInput });
      // DIRECT user to node
      history.push(`/user`);
    } catch (error) {
      console.log("Error submitting invite node: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center invite-code-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold">Enter Invite Code</h2>
        <div className="code-container">
          <Input
            className="border-b border-black"
            type="text"
            placeholder="enter code"
            onChange={(event) => setCodeInput(event.target.value)}
          />

          <div className="flex mt-6 buttons-container">
            <button className="mr-6 underline" onClick={handleInputCode}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteInputModal;
