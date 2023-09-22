import React from "react";
import "./WelcomePage.css";
import { CustomButton } from "../CustomButton/CustomButton";
import "../CustomButton/CustomButton.css";
import "../App/App.css";
import { Typography } from "@mui/material";

// this is the welcome page, the start of the application
export default function WelcomePage() {
  return (
    <div className="flex flex-col welcome-container">
    <div className="flex items-center text-center logo-container"> <Typography
          variant="h3"
          sx={{
            fontSize: "36px",
            fontWeight: 900,
            fontFamily:"ADLaM Display",
            color: "#fff",
            margin: "auto",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 1)",
            letterSpacing:"3px"
          }}
        >
          GenderStanding
        </Typography></div>
   
      <div
        className="welcome-paragraph"
        style={{
          width: 300,
          height: 400,
          color: "#CF6F5A",
          fontSize: 28,
          fontFamily: "Roboto Slab",
          fontWeight: "700",
          wordWrap: "break-word",
          margin: "32px 45px ",
        }}
      >
        Welcome,
        <br />
        <br />
        Here, friends and family can ask anonymous questions and embrace a loved
        one on their new journey. Let's grow, understand, and support together.
      </div>

      <div className="centered-container" style={{ marginTop: "45px" }}>
        <CustomButton className="btn-btn" path="/registration">
          Get Started 
        </CustomButton>
      </div>
    </div>
  );
}
