import React from "react";
import "./WelcomePage.css";
import { CustomButton } from "../CustomButton/CustomButton";
import "../CustomButton/CustomButton.css"
import '../App/App.css'
import { Typography } from "@mui/material";

export default function WelcomePage() {
  return (
    
    <div className="flex flex-col h-screen welcome-container">
      <div className="flex items-center logo-container "><Typography variant="h3" sx={{fontSize:"30px",fontWeight:900,  color:"#fff",  paddingLeft:"10px", textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'}}>GENDERSTANDING</Typography></div>
      <div className="welcome-paragraph" style={{width: 300, height: 450, color: '#CF6F5A', fontSize: 30, fontFamily: 'Roboto Slab', fontWeight: '700', wordWrap: 'break-word', margin:"32px 45px "}}>Welcome,<br/><br/>Here, friends and family can ask anonymous questions and embrace a loved one on their new journey. Let's grow, understand, and support together.</div>
    
     <div className="centered-container" style={{marginTop:"45px"}}>
       <CustomButton  className="btn" path="/registration">Get Started</CustomButton>
    </div>
    </div>
  );
}
