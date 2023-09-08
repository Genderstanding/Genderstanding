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

const SettingsModal = ({ settingsOpen, closeSettings, children }) => {
  // importing dispatch
  const dispatch = useDispatch();
  // importing history
  const history = useHistory();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nodeCodeInput, setNodeCodeInput] = useState("");
  // DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
  );

  // Store to match against currently available codes
  const nodeAssociation = useSelector(
    (store) => store.nodeAssociationReducer.nodeAssociationDatabase
  );

  // Delete Account confirmation
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: "FETCH_POST"});
    dispatch({ type: "FETCH_NODE_ASSOCIATION" });
    dispatch({ type: 'FETCH_PUBLIC_POSTS'});
  }, []);

  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    }
  }, [isDarkMode]);

  // DARK MODE toggle handler
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode);
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
      console.log("Error in deleting account", error);
    }
  };

  // Code input
  const handleNodeCodeInput = (event, nodeCodeInput, nodeAssociation) => {
    event.preventDefault();
    try {
      // loop through all of the current nodeAssociations
      for (let node of nodeAssociation) {
        // look for the auth_code in the database and match it to the inputed code
        if (node?.auth_code == nodeCodeInput) {
          // If there are no users already associated to the node with the inputed code,
          // dispatch a database update to PUT the user's ID into the database as a user
          // who can view the node
          if (node?.user_id == null) {
            dispatch({
              type: "USER_NODE_ASSOCIATION",
              payload: nodeCodeInput,
            });

            toast.success("Invite code submitted successfully", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            history.push("/home");
          } else if (node?.user_id !== null) {
            toast.error("Invite code has already been used", {
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
        }
      }
    } catch (error) {
      console.log("Error submitting invite node: ", error);
    }
  };

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
          <span className="mb-2">Join Node</span>
          <div className="text-center text-amber-950">
            <input
              style={{
                maxWidth: "160px",
                marginLeft: "25px",
                borderRadius: "8px",
              }}
              type="text"
              placeholder="enter code"
              className="text-center bg-bkg "
              onChange={(event) => setNodeCodeInput(event.target.value)}
            />
            <button
              className="text-green-800 "
              onClick={(event) =>
                handleNodeCodeInput(event, nodeCodeInput, nodeAssociation)
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
