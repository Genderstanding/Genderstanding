import React from "react";
import "./InviteInputModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const InviteInputModal = ({ InviteCodeOpen, handleCloseInviteModal, children }) => {
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
    <div className='flex items-center justify-center modal-overlay'>
     <div className='flex flex-col items-center justify-center add-node-modal'>
    {children}
    <h2 className='mb-4 mr-4 text-xl font-bold'>Enter Invite Code</h2>
        <div className="code-container">
        <input type='text' 
    placeholder='Enter a code ...' 
    className='border-b border-black'
    onChange={(event) => setCodeInput(event.target.value)}
    />

<div className='mt-6 buttons-container'>
            <button className="mr-6 underline" onClick={handleInputCode}>
              Confirm
            </button>
            <button className="underline " onClick={handleCloseInviteModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




export default InviteInputModal;
