import React, { useState } from "react";
import "./ReplyModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

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
  console.log("nodeData=", nodeData);
  console.log("nodePosts=", nodePosts);

  const reversePosts = nodePosts.slice().reverse();

  // Creating a state to hold text inputed
  const [replyInput, setReplyInput] = useState("");

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
    } catch (error) {
      console.log("Error in button click to create new reply: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center reply-box">
        {/* {children} */}
        <h2 className="mt-6 mb-4 mr-4 text-xl font-bold text-amber-950">
          {questionObject.content}
        </h2>
        <div className="flex items-end justify-between px-4 py-2">
          <span className="text-sm font-semibold text-amber-950">
            {moment(questionObject?.post_time).fromNow()}
          </span>
        </div>
        <div className="overflow-y-auto scrollable-container text-amber-950">
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
                      ? "owner-text-bubble mr-4"
                      : "user-text-bubble ml-4"
                  }`}
                >
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm">
                      {isNodeOwner ? "Owner" : "User"}{" "}
                      {moment(post?.post_time).fromNow()}
                    </span>
                    <button onClick={() => openElipsis(contentToEdit)}>
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
          className={`shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-sm bg-bkg border-1 reply-textarea focus:ring-0 text-text placeholder-text font-normal ${
            isDarkMode ? "dark" : "light"
          }`}
          placeholder="Write a Reply..."
          onChange={(event) => setReplyInput(event.target.value)}
          value={replyInput}
          required
        />

        <div className="mt-6 text-center align-middle buttons-container">
          <button
            className={`mx-5 font-bold active:underline  text-amber-950 ${
              isDarkMode ? "dark" : "light"
            }`}
            onClick={(event) => handleReply(event, questionObject)}
          >
            Confirm
          </button>
          <button
            className={`mx-5 font-bold active:underline  text-amber-950 ${
              isDarkMode ? "dark" : "light"
            }`}
            onClick={closeAddReply}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
