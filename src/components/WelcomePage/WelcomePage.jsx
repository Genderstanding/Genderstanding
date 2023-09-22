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
      <div className="flex items-center logo-container">
        <Typography
          variant="h3"
          sx={{
            fontSize: "40px",
            fontWeight: 900,
            fontFamily: "ADLaM Display",
            color: "#fff",
            margin: "auto",
            textShadow: "0px 1px 2px rgba(0, 0, 0, .3)",
            letterSpacing: "3px",
          }}
        >
          Genderstanding
        </Typography>
      </div>
      <div
        className="welcome-paragraph"
        style={{
          width: 300,
          height: 400,
          color: "#CF6F5A",
          fontSize: 30,
          fontFamily: "Roboto Slab",
          fontWeight: "700",
          wordWrap: "break-word",
          margin: "auto",
          marginTop: "3%",
          marginBottom: "25%",
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
