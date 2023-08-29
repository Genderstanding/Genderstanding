import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import "../App/App.css"
import { Typography } from "@mui/material";

export default function LoginPage() {

  return (
  
    <div className="flex flex-col h-screen login-container">
   <div className="flex items-center logo-container ">  <Typography variant="h3" sx={{fontSize:"30px",fontWeight:900,  color:"#fff",  paddingLeft:"10px"}}>GENDERSTANDING</Typography></div>
         <div className="centered-container">
        <LoginForm />
      </div>
      </div>
 
  );
}
