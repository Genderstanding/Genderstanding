import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiGroup } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';

export default function Nav({isDarkMode}) {
  const user = useSelector((store) => store.user);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <div className="nav">
    <div className="flex nav-container ">
      <Link to="/home">
        {/* <h2 className="nav-title">Prime Solo Project</h2> */}
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            {/* Login / Register */}
          </Link>
        )}
      </div>

      {/* If a user is logged in, show these links */}
      {user.id && (
        <div className="flex items-center toolbar-container">
          <Link className="navLink" to="/home">
            {/* Link this to home page */}
            <button className="flex flex-col items-center justify-center flex-grow px-4 py-2">
            <HomeOutlinedIcon sx={{fontSize:"32px"}}/>

              <span>Home</span>
            </button>
          </Link>

          {/* Link this to UserPage */}
          <Link className="navLink" to="/user">
            <button className="flex flex-col items-center justify-center flex-grow px-4 py-2">
              <PersonOutlineIcon sx={{fontSize:"32px"}}/>
              <span>Me</span>
            </button>
          </Link>

          {/* Link this to the Featured page */}
          <Link className="navLink" to="/public">
            <button className="flex flex-col items-center justify-center flex-grow px-4 py-2 ">
            <PeopleOutlineSharpIcon sx={{fontSize:"32px"}}/>
              <span>Featured</span>
            </button>
          </Link>

          {/* Settings Modal */}
            <button
           style={{color: "#7C7C7C"}}
              className="flex flex-col items-center justify-center flex-grow px-4 py-2 navLinkSetting"
              onClick={openSettings}
            >
              <FiSettings className="navLinkSetting"  size={32} />
              <span>Settings</span>
            </button>
            <SettingsModal
              settingsOpen={settingsOpen}
              closeSettings={closeSettings}
            />

          {/* <LogOutButton className="navLink" /> */}
        </div>
      )}

      {/* <Link className="navLink" to="/about">
        About
      </Link> */}
    </div>
    </div>
  );
}
