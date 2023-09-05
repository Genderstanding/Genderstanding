import React from "react";
import "./AddQuestionModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  console.log("Current node contents is: ", currentNode);

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
      closeAddQuestion();
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
    } catch (error) {
      console.log("Error in submitting a question: ", error);
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
    setQuestionInput("");
  };

  return (
    <div
      className={`flex items-center justify-center modal-overlay ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center ask-question-box ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        {children}
        <h2 className="mb-4 mr-4 text-xl font-bold text-amber-950">Ask a New Question</h2>
        <textarea
          rows="4"
          className="w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 question-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a question..."
          onChange={(event) => setQuestionInput(event.target.value)}
          value={questionInput}
          required
        ></textarea>
        <div className="mt-6 buttons-container">
          <button className="mx-5 font-bold active:underline text-amber-950" onClick={handleSubmitQuestion}>
            Confirm
          </button>
          <button className="mx-5 font-bold active:underline text-amber-950" onClick={closeAddQuestion}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
