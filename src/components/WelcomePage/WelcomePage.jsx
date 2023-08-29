import React from "react";
import "./WelcomePage.css";
import { CustomButton } from "../CustomButton/CustomButton";
import "../CustomButton/CustomButton.css"

export default function WelcomePage() {
  return (
    <div className="flex flex-col h-screen welcomepage-container">
      <div className="flex items-center header-container ">GENDERSTANDING</div>
      <CustomButton className="btn"
          buttonStyle="btn--primary"
          buttonSize="btn--large" path="/registration">Get Started</CustomButton>
    </div>
  );
}
