import React from "react";
import "./AddNodeModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AddNodeModal = ({ addNodeOpen, addNodeClose, children }) => {
  if (!addNodeOpen) {
    return null;
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  const [nodeInput, setNodeInput] = useState("");

  // function to handle adding a node to database
  const handleAddNode = (event) => {
    event.preventDefault();

    try {
      if (!nodeInput) {
        toast.error("Please create a name", {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        dispatch({ type: "CREATE_NODE", payload: { name: nodeInput } });

        // Check the referrer and redirect accordingly
        if (
          location.state &&
          (location.state.referrer === "/action" ||
            location.state.referrer === "/home")
        ) {
          // If the user is coming from the action page, redirect to /home
          history.push("/home");
        } else {
          // If the user is coming from any other route, redirect to /user
          history.push("/user");
        }

        toast.success("Node created successfully", {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      
    } catch (error) {
      toast.error("Failed to created new community", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center add-node-modal">
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold text-amber-950">
          Create Community
        </h2>
        <input
          type="text"
          placeholder="Enter a name ..."
          className="border-b border-black text-amber-950"
          onChange={(event) => setNodeInput(event.target.value)}
        />
        <div className="mt-6 text-amber-950 buttons-container">
          <button
            className="mr-6 font-bold active:underline "
            onClick={handleAddNode}
          >
            Confirm
          </button>
          <button
            className="font-bold active:underline "
            onClick={addNodeClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNodeModal;
