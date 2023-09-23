import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Typography } from "@mui/material";

function LogoButton() {
  const history = useHistory();
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <button
        onClick={() => {
          history.push("/welcome");
        }}
      >
       <Typography
          variant="h3"
          sx={{
            fontSize: "40px",
            fontWeight: 900,
            fontFamily: "ADLaM Display",
            color: "#fff",
            margin: "auto",
            textShadow: "0px 1px 2px rgba(0, 0, 0, .3)",
            letterSpacing: "3px",
          }}
        >
          Genderstanding
        </Typography>
      </button>
    </div>
  );
}

export default LogoButton;
