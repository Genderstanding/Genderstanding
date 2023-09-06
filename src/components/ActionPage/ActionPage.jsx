import React, { useState } from "react";
import "./ActionPage.css";
import "../App/App.css";
import { Typography } from "@mui/material";
import LogoButton from "../CustomButton/LogoButton";
import { ActionButton } from "../CustomButton/ActionButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import AddNodeModal from "../AddNodeModal/AddNodeModal";
import { CodeInputModal } from "../CodeInputModal/CodeInputModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function ActionPage() {
  const history = useHistory();
  
 const user = useSelector(store => store.user)
  // INVITE CODE MODAL
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const handleOpenInviteModal = () => {
    setInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setInviteModalOpen(false);
  };

  // ADD NODE MODAL
  const [addNodeOpen, setaddNodeOpen] = useState(false);

  const openAddNode = () => {
    setaddNodeOpen(true);
  };

  const closeAddNode = () => {
    setaddNodeOpen(false);
  };
  
  const handleAlert = (username) => {
    console.log(username, "username")
    toast.info(`Hello ${username}, Welcome to GenderStanding`, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  
  return (
    <div className="action-container">
      <div className="flex items-center logo-container ">
        <LogoButton />
      </div>
      <div className="centered-container">
        <Typography
          variant="h3"
          sx={{
            fontSize: "34px",
            fontWeight: 900,
            fontFamily: "mulish",
            color: "#CF6F5A",
            marginTop: "50px",
          }}
        >
          Why Are You Here?
        </Typography>
      </div>


      <div className="button-container">
        {/* NEW NODE */}

        <ActionButton className="btn" onClick={openAddNode}>
          Create Node
        </ActionButton>

        <AddNodeModal addNodeOpen={addNodeOpen} addNodeClose={closeAddNode} />

        {/* INVITE CODE INPUT */}

        <ActionButton className="btn" onClick={handleOpenInviteModal}>
          Join Node
        </ActionButton>

        <CodeInputModal
          InviteCodeOpen={inviteModalOpen}
          handleCloseInviteModal={handleCloseInviteModal}
        />

        <CustomButton className="btn" path="/home" onClick={() => handleAlert(user?.username)}>
          Just Browsing
        </CustomButton>
        
      </div>
    </div>
  );
}
