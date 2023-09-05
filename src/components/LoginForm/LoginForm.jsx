import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import { Typography } from "@mui/material";
import "../App/App.css";
import CustomIcon from "../../Assets/Icon/CustomIcon";

// TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
      toast.error("Login failed", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <CustomIcon />
      {/* INPUT */}
      <div className="label-container">
        <label htmlFor="username" className="label">
          <Typography
            variant="h6"
            sx={{
              marginLeft: "35px",
              fontSize: "16px",
              fontFamily: "mulish",
              fontWeight: 500,
              color: "#CF6F5A",
              marginTop:"12px"
            }}
          >
            Username
          </Typography>
          <div className="Field">
            <input
              className="Text"
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="label-container">
        <label htmlFor="password" className="label">
          <Typography
            variant="h6"
            sx={{
              marginLeft: "35px",
              fontSize: "16px",
              fontFamily: "mulish",
              fontWeight: 500,
              color: "#CF6F5A",
              marginTop:"12px"
            }}
          >
            Password
          </Typography>
          <div className="Field">
            <input
              className="Text"
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </label>
      </div>
      <div>
        {/* REGISTER */}
        <div
          className="not-registered"
          style={{
            width: "100%",
            height: "100%",
            color: "#CF6F5A",
            fontSize: "20px",
            fontFamily: "Mulish",
            fontWeight: "700",
            wordWrap: "break-word",
            paddingTop: "16px",
            paddingBottom: "16px",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Link exact to="/registration">
            Not Registered?
          </Link>
        </div>
        {/* LOG IN */}
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
