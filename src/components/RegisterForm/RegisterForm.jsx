import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomIcon from "../Icon/CustomIcon";
import "../App/App.css";

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
      <div>
  <CustomIcon/>
      </div>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        {" "}
        <label htmlFor="username">
          Username
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
      <div>
        <label htmlFor="password">
          Password
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
