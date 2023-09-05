import React, { useState } from "react";
import "./OwnerReplyModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ElipsisModal from "../ElipsisModal/ElipsisModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerReplyModal = ({
  addReplyOpen,
  closeAddReply,
  questionObject,
  isDarkMode,
  handleReportButton,
}) => {
  if (!addReplyOpen) {
    return null;
  }

  const dispatch = useDispatch();
  const nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  const nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  const reversePosts = nodePosts.slice().reverse();

  const [replyInput, setReplyInput] = useState("");
  const [elipsisOpen, setElipsisOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState("");

  const openElipsis = (content) => {
    setElipsisOpen(true);
    setContentToEdit(content);
  };

  const closeElipsis = () => {
    setElipsisOpen(false);
  };

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

  return (
    <div className='flex items-center justify-center modal-overlay'>
      <div className='flex flex-col items-center justify-center reply-box'>
        <h2 className='mt-6 mb-4 mr-4 text-xl font-bold'>{questionObject.content}</h2>
        <div className="overflow-y-auto scrollable-container">
          {reversePosts.map((post) => {
            if (post?.reply_id == questionObject.id) {
              const matchingNode = nodeData.find((node) => node.id === post.node_id);
              const isNodeOwner = matchingNode ? post.user_id === matchingNode.user_id : false;
              return (
                <div
                  key={post.id}
                  className={`mt-4 ${isNodeOwner ? "owner-text-bubble mr-5 mb-2" : "user-text-bubble ml-5 mb-2"}`}
                >
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm">{isNodeOwner ? "Owner" : "User"} {moment(post?.post_time).fromNow()}</span>
                    <button onClick={() => openElipsis(post?.content)}>...</button>
                  </div>
                  <div className="m-4 question-text">{post?.content}</div>
                </div>
              );
            }
          })}
        </div>
        <textarea
          rows="4"
          className='w-full px-4 py-2 mt-4 text-sm text-gray-900 bg-white border-0 reply-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
          placeholder="Write a Reply..."
          onChange={(event) => setReplyInput(event.target.value)}
          value={replyInput}
          required
        />
        <div className='mt-6 buttons-container'>
          <button className='mr-6 underline' onClick={(event) => handleReply(event, questionObject)}>Confirm</button>
          <button className='underline' onClick={closeAddReply}>
            Close
          </button>
        </div>
      </div>

      <ElipsisModal
        elipsisOpen={elipsisOpen}
        elipsisClose={closeElipsis}
        contentToEdit={contentToEdit}
        handleReportButton={handleReportButton}
      />
    </div>
  );
};

export default OwnerReplyModal;
