import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import "./SettingsModal.css";
import DeleteNodeModal from "../DeleteNodeModal/DeleteNodeModal";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This hold setting modal
const SettingsModal = ({ settingsOpen, closeSettings, children }) => {
  // importing dispatch
  const dispatch = useDispatch();
  // importing history
  const history = useHistory();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nodeCodeInput, setNodeCodeInput] = useState("");
  // DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if the theme preference is not set in localStorage
    if (!localStorage.theme) {
      localStorage.theme = "light"; // Set the default theme to "light"
    }

    // Use the value from localStorage or the system preference
    return localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
      ? true
      : false;
  });

  // Store to match against currently available codes
  const nodeAssociation = useSelector(
    (store) => store.nodeAssociationReducer.nodeAssociationDatabase
  );
  const user = useSelector((store) => store.user);

  // Delete Account confirmation
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    }
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: "FETCH_NODE_ASSOCIATION" });
    dispatch({ type: "FETCH_PUBLIC_POSTS" });
  }, []);

  // DARK MODE toggle handler
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    }
  };

  // Delete account
  const handleDeleteAccount = () => {
    // Dispatch simply calls for whatever user is logged in to be deleted.
    // Confirmation on front end will prevent accidental clicks
    try {
      closeSettings();
      dispatch({ type: "DELETE_USER" });
      history.push("/login");
    } catch (error) {
    }
  };

  // Code input
  const handleNodeCodeInput = (event, nodeCodeInput, nodeAssociation, user) => {
    event.preventDefault();
// clear input
setNodeCodeInput("");
    try {
      let matchingNode = nodeAssociation.find(
        (node) => node?.auth_code === nodeCodeInput
      );

      if (
        !matchingNode ||
        !matchingNode.auth_code ||
        nodeCodeInput.length !== 8
      ) {
        toast.error("Invalid Code or Community not found", getToastOptions());
        return;
      }

      if (matchingNode.user_id === null) {
        // Dispatch a database update to PUT the user's ID into the database
        dispatch({
          type: "USER_NODE_ASSOCIATION",
          payload: nodeCodeInput,
        });
        toast.success("Invite code submitted successfully", getToastOptions());
        history.push("/home");
      } else if (matchingNode.user_id !== null) {
        // Dispatch a database update to PUT the user's ID into the database
        if (matchingNode.user_id === user.id) {
          toast.error("You're already in the community", getToastOptions());
        } else if (matchingNode.user_id !== user.id) {
          toast.error("Code has already been used", getToastOptions());
        }
      } else {
        toast.error("error inputting code", getToastOptions());
      }
    } catch (error) {
    }
  };


  // TOASTIFY
  const getToastOptions = () => ({
    position: "bottom-left",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  if (!settingsOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div
        className={`mt-15 settings-modal bg-red-100 ${
          isDarkMode ? "light" : "dark"
        }`}
      >
        {children}
        <div className="flex flex-col">
          {/* onClick Link to login */}
          {/* <button className="self-end mt-2 mb-6 mr-2 text-sm underline">Log Out</button> */}
          <LogOutButton
            setIsDarkMode={setIsDarkMode}
            onCloseSettings={closeSettings}
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-2">Join Community</span>
          <div className="text-center text-amber-950">
            <input
              style={{
                maxWidth: "160px",
                marginLeft: "25px",
                borderRadius: "8px",
              }}
              type="text"
              placeholder="enter code"
              className={`text-center text-text bg-bkg ${
                isDarkMode ? "dark" : "light"
              }`}
              onChange={(event) => setNodeCodeInput(event.target.value)}
              value={nodeCodeInput}
            />
            <button
              className="text-green-800 "
              onClick={(event) =>
                handleNodeCodeInput(event, nodeCodeInput, nodeAssociation, user)
              }
            >
              <TaskAltIcon />
            </button>
          </div>
          <br />
          <span className="mb-2">Theme</span>
          <div className="flex text-center">
            {/* DARK MODE */}
            <div className="flex items-center mx-auto">
              <button
                className={
                  isDarkMode ? "dark text-gray-700" : "light text-yellow-700"
                }
                onClick={() => handleDarkModeToggle()}
              >
                {isDarkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="mt-2 active:underline ">
              <DeleteNodeModal />
            </button>
            <button
              className="mt-2 font-bold active:underline"
              onClick={openDeleteConfirmation}
            >
              Delete Account
            </button>
          </div>
          <br />
          <button
            className="mt-4 font-bold active:underline"
            onClick={closeSettings}
          >
            Close
          </button>
          {showDeleteConfirmation && (
            <div className=" delete-box">
              <p className="mb-12">
                Are you sure you want to delete your account?
              </p>
              <button
                className="mt-2 mr-10 font-bold active:underline"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
              <button
                className="mt-2 font-bold active:underline"
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
