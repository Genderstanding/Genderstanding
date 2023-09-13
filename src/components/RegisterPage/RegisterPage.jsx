import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import "../App/App.css"
import LogoButton from '../CustomButton/LogoButton';

// This page holds the register page  
export default function RegisterPage() {
  return (  
    <div className="flex flex-col h-screen register-container">
   <div className="flex items-center logo-container "><LogoButton/></div>
        <div className="centered-container">
        <RegisterForm />
        <div></div>
      </div>
      </div>

  );
}

