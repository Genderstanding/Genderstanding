import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import "./SettingsModal.css";
import DeleteNodeModal from "../DeleteNodeModal/DeleteNodeModal";

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
    if (isDarkMode) {
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
          }
        }
      }
      // Go to home page when user enter invite code
      history.push(`/usernodes`);
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
        className={`mt-15 settings-modal bg-re2d-100 ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        {children}
        <div className="flex flex-col">
          {/* onClick Link to login */}
          {/* <button className="self-end mt-2 mb-6 mr-2 text-sm underline">Log Out</button> */}
          <LogOutButton onCloseSettings={closeSettings} />
        </div>
        <div className="flex flex-col">
          <span className="mb-2">Join Node</span>
          <div>
            <input
              style={{ textAlign: "center" }}
              type="text"
              placeholder="enter code"
              className="ml-4"
              onChange={(event) => setNodeCodeInput(event.target.value)}
            />
            <button
              onClick={(event) =>
                handleNodeCodeInput(event, nodeCodeInput, nodeAssociation)
              }
            >
              ☑️
            </button>
          </div>
          <br />
          <span className="mb-2">Theme</span>
          <div className="flex justify-between">
            {/* DARK MODE */}
            {/* <button
              className={isDarkMode ? "dark ml-20" : "light ml-20"}
              onClick={() => handleDarkModeToggle(isDarkMode)}
            >
              ☼
            </button>
            <button
              className={isDarkMode ? "dark mr-20" : "light mr-20"}
              onClick={() => handleDarkModeToggle(!isDarkMode)}
            >
              ☾
            </button> */}
            <p className="ml-20">
              <button
                className={isDarkMode ? "dark ml-20" : "light ml-20"}
                onClick={() => handleDarkModeToggle()}
              >
                {isDarkMode ? "☼" : "☾"}
              </button>
            </p>
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <button className="mt-2 active:underline "><DeleteNodeModal/></button>
            <button className="mt-2 font-bold active:underline" onClick={openDeleteConfirmation}>
              Delete Account
            </button>
          </div>
          <br />
          <button className="mt-4 underline" onClick={closeSettings}>
            Close
          </button>
          {showDeleteConfirmation && (
            <div className=" delete-box">
              <p className="mb-12">
                Are you sure you want to delete your account?
              </p>
              <button
                className="mt-2 mr-10 underline"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
              <button
                className="mt-2 underline"
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
