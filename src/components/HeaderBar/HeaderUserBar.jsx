import React, { useState } from "react";
import "../HomePage/HomePage.css";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";
import SVG from "../../Assets/SVG/SVG";
import { useHistory } from "react-router-dom";

// this holds node user header 
export default function HeaderUserBar({ isDarkMode }) {
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const history = useHistory();
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  let user = useSelector((store) => store.user);
  // open and close add question modal
  const openAddQuestion = () => {
    setAddQuestionOpen(true);
  };
  const closeAddQuestion = () => {
    setAddQuestionOpen(false);
  };

  const svgQuestion = [
    "M9 9.00001C9 5.49998 14.5 5.50001 14.5 9.00001C14.5 11.5 12 10.9999 12 13.9999",
    "M12 18.01L12.01 17.9989",
    "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z",
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex items-center header-container text-text bg-bkg ${
        isDarkMode ? "light" : "dark"
      }`}
    >
      <button onClick={() => history.goBack()}>
        <MdChevronLeft
          size={35}
          className={`ml-2 text-secondary  ${isDarkMode ? "light" : "dark"}`}
        />
      </button>
      {/* Display joined node name */}
      <p className="mb-1 ml-5 text-2xl font-bold capitalize truncate text-text font-mulish w-52">
        {newNode?.[0]?.node_name || newNode?.node_name}
      </p>
      {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
      <div className="flex-grow"></div>
      <button
        className="mr-4 text-2xl"
        onClick={() => openAddQuestion(newNode?.id)}
      >
        <SVG
          width={24}
          height={24}
          viewBox="0 0 24 24"
          pathData={svgQuestion}
          className={`stroke-secondary ${isDarkMode ? "light" : "dark"}`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </button>
      {/* ADD QUESTION */}
      <AddQuestionModal
        addQuestionOpen={addQuestionOpen}
        closeAddQuestion={closeAddQuestion}
      />
    </div>
  );
}
