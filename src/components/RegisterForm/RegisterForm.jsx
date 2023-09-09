import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomIcon from '../../Assets/Icon/CustomIcon'
import "../App/App.css";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
try {
   dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
    history.push("/action")
} catch (error) {
  toast.error("Registration failed", {
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
   

  }; // end registerUser 
  
const handleAutofill = ( ) =>{
  setUsername("Daniella")
  setPassword('123')
  
}

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <CustomIcon />
        {/* INPUT */}
      <div className="label-container">
        <label htmlFor="username" className="label">
          <Typography
          onClick={handleAutofill}
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
              className="Text username"
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
              className="Text password"
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
           {/* LOGIN */}
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
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
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
