import React, { useState } from "react";
import "./ActionPage.css";
import "../App/App.css";
import { Typography } from "@mui/material";
import LogoButton from "../CustomButton/LogoButton";
import { ActionButton } from "../CustomButton/ActionButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import AddNodeModal from "../AddNodeModal/AddNodeModal";
import InviteInputModal from "../InviteInputModal/InviteInputModal";

export default function ActionPage() {
  const dispatch = useDispatch();
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
        <ActionButton className="btn" 
        onClick={openAddNode}>
          Create Node
        </ActionButton>
        <AddNodeModal addNodeOpen={addNodeOpen}  addNodeClose={closeAddNode} />

        {/* INVITE CODE INPUT */}
        <ActionButton
          className="btn"
          onClick={handleOpenInviteModal}
         
        >
          Join Node
        </ActionButton>
        <InviteInputModal
          InviteCodeOpen={inviteModalOpen}
          handleCloseInviteModal={handleCloseInviteModal}
        />

        <CustomButton className="btn" path="/home">
          Just Browsing
        </CustomButton>
      </div>
    </div>
  );
}
