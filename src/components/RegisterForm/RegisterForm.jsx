import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CustomIcon from "../Icon/CustomIcon";
import "../App/App.css";
import { Typography } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
      <form className="formPanel" onSubmit={registerUser}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <CustomIcon />
        <div className="username">
          <label htmlFor="username">
            <Typography
              variant="h6"
              sx={{ fontFamily: "mulish", fontWeight: 700, color: "#CF6F5A" }}
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
        <div className="password">
          <label htmlFor="password">
            <Typography
              variant="h6"
              sx={{ fontFamily: "mulish", fontWeight: 700, color: "#CF6F5A" }}
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
          <div
            className="already-registered"
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
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Link exact to="/login">
              Already Registered?
            </Link>
          </div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
  );
}

export default RegisterForm;
