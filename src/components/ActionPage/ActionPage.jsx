import React from "react";
import "./ActionPage.css";
import "../App/App.css";
import { Typography } from "@mui/material";
import LogoButton from "../CustomButton/LogoButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";

export default function ActionPage() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-screen action-container">
      <div className="flex items-center logo-container ">
        <LogoButton />
      </div>
      <div className="centered-container">
      <div className="text-container" style={{}}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "34px",
            fontWeight: 900,
            fontFamily: "mulish",
            color: "#CF6F5A",
            margin: "auto",
          }}
        >
          Why Are You Here?
        </Typography>
   
</div>
        <div className="button-container">
          <CustomButton className="btn" path="/newnode">
            Create Node
          </CustomButton>
          <CustomButton className="btn" path="/newcode">
            Join Node
          </CustomButton>
          <CustomButton
            className="btn"
            path="/"
          >
            Just Browsing
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
