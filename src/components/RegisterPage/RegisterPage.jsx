import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import "../App/App.css"
import { Typography } from "@mui/material";

export default function RegisterPage() {
  return (  

    <div className="flex flex-col h-screen register-container">
    <div className="flex items-center logo-container ">  <Typography variant="h3" sx={{fontSize:"30px",fontWeight:900,  color:"#fff",  paddingLeft:"10px"}}>GENDERSTANDING</Typography></div>
      <div className="centered-container">
        <RegisterForm />
      </div>
      </div>

  );
}

