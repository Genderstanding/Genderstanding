import React from "react";
import "./QuestionTitleEllipsis.css";



const QuestionTitleEllipsis = ({
    elipsisOpen,
    elipsisClose,
    postIdProp,
    handleReportButton,
    handleRejectButton
}) => {

  if (!elipsisOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center ellipsis-node-modal">
        {/* {children} */}
        <div className="flex flex-col justify-start buttons-container text-amber-950">
                <button
                  className="m-2 font-bold active:underline text-amber-950"
                  onClick={() => handleRejectButton(postIdProp)}
                >
                  Delete
                </button>
                <button
                  className="m-2 font-bold active:underline text-amber-950"
                  onClick={() => handleReportButton(postIdProp)}
                >
                  Report User
                </button>
                <button
                className="m-2 font-bold active:underline text-amber-950"
                onClick={elipsisClose}
                >
                Close
                </button>
          </div>
        </div>
      </div>
  );
};

export default QuestionTitleEllipsis;
