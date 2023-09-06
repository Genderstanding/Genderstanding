import React from "react";
import "./QuestionTitleEllipsis.css";
import { useDispatch } from "react-redux";



const QuestionTitleEllipsis = ({
  elipsisOpen,
  elipsisClose,
  postIdProp,
  postContent,
  handleReportButton,
  handleRejectButton
}) => {

  if (!elipsisOpen) {
    return null;
  }

  const dispatch = useDispatch();

  // function to remove a user from the give node
  const handleRemoveUser = (postContent) => {
    dispatch({
      type: 'REMOVE_NODE_ASSOCIATION',
      payload: {
        user: postContent.user_id,
        node: postContent.node_id
      }
    })
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
            onClick={() => handleRemoveUser(postContent)}
          >
            Remove User
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
