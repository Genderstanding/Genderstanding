import React from "react";
import "./AddQuestionModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AddQuestionModal = ({
  addQuestionOpen,
  closeAddQuestion,
  children,
  isDarkMode,
}) => {
  if (!addQuestionOpen) {
    return null;
  }

  // State to hold text input
  const [questionInput, setQuestionInput] = useState("");

  // Sourcing dispatch
  const dispatch = useDispatch();

  let currentNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );


  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    try {
      dispatch({
        type: "CREATE_POST",
        payload: {
          content: questionInput,
          node_id: currentNode.id,
          orig_post: false,
        },
      });
      toast.success("Question submitted", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setQuestionInput("");
      closeAddQuestion();
    } catch (error) {
      toast.error("Error submitting a question", {
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
  
  };


  return (
    <div
      className={`flex items-center justify-center modal-overlay ${
        isDarkMode ? "light" : "dark"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center ask-question-box ${
          isDarkMode ? "light" : "dark"
        }`}
      >
        {children}
        <h2 className="pt-3 my-2 mr-2 text-xl font-bold text-main">Ask a New Question</h2>
        <textarea 
          rows="3"
          // className="w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 question-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          className={`shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-md bg-textarea border-1 border-b border-primary text-text question-textarea focus:ring-0 placeholder-gray font-semibold ${isDarkMode ? "light" : "dark"}`}
                  
          placeholder="Write a question..."
          onChange={(event) => setQuestionInput(event.target.value)}
          value={questionInput}
          required
        ></textarea>
        <div className="pb-2 my-2 buttons-container">
          <button className="p-2 mx-5 font-bold rounded-xl text-main bg-userContent active:underline" onClick={handleSubmitQuestion}>
            Confirm
          </button>
          <button className="p-2 mx-5 font-bold rounded-xl text-main bg-userContent active:underline" onClick={closeAddQuestion}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;