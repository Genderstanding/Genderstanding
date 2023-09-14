import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import "../App/App.css";
import LogoButton from "../CustomButton/LogoButton";

// This holds Login Page
export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen login-container">
      <div className="flex items-center logo-container ">
        <LogoButton />
      </div>
      <div className="centered-container">
        <LoginForm />
      </div>
    </div>
  );
}
