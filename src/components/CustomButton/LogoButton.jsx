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
            fontFamily:"ADLaM Display",
            color: "#fff",
            margin: "auto",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 1)",
            letterSpacing:"3px"
          }}
        >
          GenderStanding
        </Typography>
      </button>
    </div>
  );
}

export default LogoButton;