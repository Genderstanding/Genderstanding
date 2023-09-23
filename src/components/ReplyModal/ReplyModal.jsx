import React, { useState, useEffect } from "react";
import "./ReplyModal.css";
import { useSelector, useDispatch } from "react-redux";
import ElipsisModal from "../ElipsisModal/ElipsisModal";
import moment from "moment";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This holds the reply modal
const ReplyModal = ({
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
  const user = useSelector((state) => state.user);

  // reverse the order of display
  const reversePosts = nodePosts.slice().reverse();

  // Hold text input
  const [replyInput, setReplyInput] = useState("");
  const [elipsisOpen, setElipsisOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState("");
  const [postIdProp, setPostIdProp] = useState(null);
  const [userIdProp, setUserIdProp] = useState(null);
  const [nodeOwnerIdProp, setNodeOwnerIdProp] = useState(null);
  const [showReply, setShowReply] = useState(false);

  // function to close and open ellipsis
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

  // function to handle delete post
  const handleDeleteButton = (postId) => {
    try {
      dispatch({
        type: "DELETE_POST",
        payload: postId,
      });
    } catch (error) {
      toast.error("Failed to delete post", {
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

  // function to handle report user
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

  // function to handle reply
  const handleReply = (event, questionObject) => {
    event.preventDefault();
    setReplyInput("");
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
      toast.success("Post successfully created", {
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
      toast.error("Failed to create post", {
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

  useEffect(() => {
    if (user.id === questionObject.user_id) {
      setShowReply(true);
    }
  }, [user.id, questionObject.user_id]);

  return (
    <div className="flex items-center justify-center user-modal-overlay">
      {/* removed items-center */}
      <div className="flex flex-col justify-center user-reply-box">
        {/* {children} */}
        <h2 className="mt-6 mb-4 mr-4 text-xl font-bold text-center text-amber-950">
          {questionObject.content}
        </h2>
        <div className="flex items-end justify-center px-4 py-2 text-amber-950">
          <span className="text-sm font-semibold text-amber-950">
            {moment(questionObject?.post_time).fromNow()}
          </span>
        </div>
        <div className="overflow-y-auto user-scrollable-container text-amber-950">
            {/* Post display here */}
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
                      ? "user-owner-text-bubble mb-2"
                      : "user-user-text-bubble ml-5 mb-2"
                  }`}
                >
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm font-bold">
                      {isNodeOwner ? "Owner" : "User"}
                      {"   "}
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
        {/* Text area */}
        {showReply ? (
          <>
            <textarea
              rows="4"
              className={`shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-sm bg-bkg border-1 user-reply-textarea focus:ring-0 text-text placeholder-text font-normal ${
                isDarkMode ? "dark" : "light"
              }`}
              placeholder="Write a Reply..."
              onChange={(event) => setReplyInput(event.target.value)}
              value={replyInput}
              required
            />
            <div className="mx-auto buttons-container">
              <button
                className={`mx-5 font-bold active:underline  text-amber-950 ${
                  isDarkMode ? "dark" : "light"
                }`}
                onClick={(event) => handleReply(event, questionObject)}
              >
                Confirm
              </button>
              <button
                className={`mx-5 my-5 font-bold active:underline  text-amber-950 ${
                  isDarkMode ? "dark" : "light"
                }`}
                onClick={closeAddReply}
              >
                Close
              </button>
            </div>
          </>
        ) : (
             <div className="mx-auto buttons-container">
            <button
              className={`mx-5 my-5 font-bold active:underline  text-amber-950 ${
                isDarkMode ? "dark" : "light"
              }`}
              onClick={closeAddReply}
            >
              Close
            </button>
          </div>
        )}
      </div>
      {/* ellipsis modal */}
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

export default ReplyModal;
