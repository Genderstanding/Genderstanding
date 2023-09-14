import React, { useState, useEffect } from "react";
import "./OwnerReplyModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ElipsisModal from "../ElipsisModal/ElipsisModal";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This holds reply modal ofr OWNER
const OwnerReplyModal = ({
  addReplyOpen,
  closeAddReply,
  questionObject,
  isDarkMode,
}) => {
  if (!addReplyOpen) {
    return null;
  }
  const dispatch = useDispatch();
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  const reversePosts = nodePosts.slice().reverse();

  // Creating a state to hold text input
  const [replyInput, setReplyInput] = useState("");
  const [elipsisOpen, setElipsisOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState("");
  const [postIdProp, setPostIdProp] = useState(null);
  const [userIdProp, setUserIdProp] = useState(null);
  const [nodeOwnerIdProp, setNodeOwnerIdProp] = useState(null);

  // open and close ellipsis
  const openElipsis = (content, postId, userId, nodeOwnerId) => {
    setElipsisOpen(true);
    setContentToEdit(content);
    setPostIdProp(postId);
    setUserIdProp(userId);
    setNodeOwnerIdProp(nodeOwnerId);
  };
  const closeElipsis = () => {
    setElipsisOpen(false);
  };

  // function to handle reply
  const handleReply = (event, questionObject) => {
    event.preventDefault();
    try {
      dispatch({
        type: "CREATE_POST",
        payload: {
          content: replyInput,
          reply_id: questionObject.id,
          node_id: questionObject.node_id,
          orig_post: false,
        },
      });
      toast.success("Replied sent", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setReplyInput("");
    } catch (error) {
      toast.error("Failed to reply to user", {
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

  // function to handle delete post
  const handleDeleteButton = (postId) => {
    try {
      dispatch({
        type: "DELETE_POST",
        payload: postId,
      });

      if (dispatch) {
        toast.success("Comment deleted", {
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
        toast.error("Failed to delete comment", {
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
    } catch (error) {
    }
  };

  // function to handle report 
  const handleReportButton = (postId) => {
    try {
      dispatch({
        type: "REPORT_POST",
        payload: postId,
      });
    } catch (error) {
      toast.error("Failed to report user", {
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
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center reply-box">
        {/* {children} */}
        <h2
          className="mt-6 mb-4 mr-4 text-xl font-bold text-center text-amber-950"
        >
          {questionObject.content}
        </h2>
        <span className="text-sm font-semibold text-amber-950">
          {moment(questionObject?.post_time).fromNow()}
        </span>
        <div className="overflow-y-auto h-90 scrollable-container text-amber-950">
          {reversePosts.map((post) => {
            if (post?.reply_id == questionObject.id) {
              const matchingNode = nodeData.find(
                (node) => node.id === post.node_id
              );
              const isNodeOwner = matchingNode
                ? post.user_id === matchingNode.user_id
                : false;
              return (
                <div
                  key={post.id}
                  className={`mt-4 ${
                    isNodeOwner
                      ? "owner-text-bubble mb-2"
                      : "user-text-bubble ml-5 mb-2"
                  }`}
                >
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm font-bold">
                      {isNodeOwner ? "Owner" : "User"}{" "}
                      <span className="pl-2 text-sm font-normal">
                        {moment(post?.post_time).fromNow()}
                      </span>
                    </span>
                    <button
                      onClick={() =>
                        openElipsis(
                          post,
                          post?.id,
                          post.user_id,
                          matchingNode?.user_id
                        )
                      }
                    >
                      . . .
                    </button>
                  </div>
                  <div className="m-4 question-text">{post?.content}</div>
                </div>
              );
            }
          })}
        </div>
        <textarea
          rows="4"
          className={`border-1 border-b border-primary shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-md bg-bkg border-1 text-text reply-textarea focus:ring-0 placeholder-text font-normal${
            isDarkMode ? "light" : "dark"
          }`}
          placeholder="Write a Reply..."
          onChange={(event) => setReplyInput(event.target.value)}
          value={replyInput}
          required
        />
        <div className=" buttons-container">
          <button
            className={`my-5 mx-5 font-bold active:underline text-amber-950 ${
              isDarkMode ? "light" : "dark"
            }`}
            onClick={(event) => handleReply(event, questionObject)}
          >
            Confirm
          </button>
          <button
            className={`my-5 mx-5  font-bold active:underline text-amber-950 ${
              isDarkMode ? "light" : "dark"
            }`}
            onClick={closeAddReply}
          >
            Close
          </button>
        </div>
      </div>
      <ElipsisModal
        elipsisOpen={elipsisOpen}
        elipsisClose={closeElipsis}
        contentToEdit={contentToEdit}
        postIdProp={postIdProp}
        userIdProp={userIdProp}
        nodeOwnerIdProp={nodeOwnerIdProp}
        handleDeleteButton={handleDeleteButton}
        handleReportButton={handleReportButton}
      />
    </div>
  );
};

export default OwnerReplyModal;
