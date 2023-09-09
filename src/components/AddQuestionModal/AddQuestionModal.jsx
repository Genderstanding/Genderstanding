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

  const [autofill, setAutofill] = useState("");

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
      setAutofill('')
      setQuestionInput("");
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
  
  };

  const handleAutofill = () => {
    setAutofill('Why did you choose now to come out as a man?')
  }

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
        <h2 onClick={handleAutofill} className="my-2 mr-4 text-xl font-bold text-amber-950">Ask a New Question</h2>
        <textarea 
          rows="4"
          // className="w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 question-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          className={`shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-sm bg-bkg border-1 text-text reply-textarea focus:ring-0 placeholder-text font-normal${isDarkMode ? "light" : "dark"}`}
                  
          placeholder="Write a question..."
          onChange={(event) => setQuestionInput(event.target.value)}
          value={questionInput || autofill}
          required
        ></textarea>
        <div className="buttons-container">
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