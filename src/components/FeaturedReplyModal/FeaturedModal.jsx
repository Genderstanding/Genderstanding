import React, { useState } from "react";
import "./FeaturedModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// this holds featured page's modal (public posts)
function FeaturedModal({
  viewPostOpen,
  isDarkMode,
  setViewPostOpen,
  selectedPostId,
  postInfo
}) {
  if (!viewPostOpen) {
    return null;
  }

  // store all public posts (questions and responses)
  const publicPosts = useSelector(
    (store) => store.postReducer.publicDatabaseResponse
  );

  // store all nodes
  let nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  // filter
  const nodeResponses = publicPosts.filter((post) => {
    return post.reply_id === selectedPostId;
  });

  // Reverse the order of responses
  const reverseResponses = [...nodeResponses].reverse();

  const closePublicPost = () => {
    setViewPostOpen(false);
  };

  return (
    <div className="flex items-center justify-center featured-modal-overlay">
          {/* removed items-center */}
      <div className="flex flex-col justify-center featured-reply-box">
        {/* Title */}
        <h2 className="mt-6 mb-4 mr-4 text-xl font-bold text-center text-amber-950">
        {postInfo.content}
        </h2>
        <span className="text-sm text-center text-amber-950">
                    {" "}
                    {moment(postInfo?.post_time).fromNow()}
                  </span>
        <div className="overflow-y-auto scrollable-container text-amber-950">
          {reverseResponses.map((response) => {
            // Find the corresponding node in nodeData
            const matchingNode = nodeData.find(
              (node) => node.id === response.node_id
            );

            // Check if the response user_id matches the node owner's user_id
            const isNodeOwner = matchingNode
              ? response.user_id === matchingNode.user_id
              : false;

            return (
              <div
                key={response.id}
                className={`mt-4 ${
                  isNodeOwner
                    ? "featured-owner-text-bubble mb-2"
                    : "featured-user-text-bubble ml-5 mb-2"
                }`}
              >
                <div className="flex items-end justify-between px-4 py-2">
                  <span className="text-sm font-bold">
                    {isNodeOwner ? "Node Owner" : "User"}{" "}
                  </span>
                  <span className="text-sm text-end">
                    {" "}
                    {moment(response?.post_time).fromNow()}
                  </span>
                </div>
                <div className="m-4 question-text">{response?.content}</div>
              </div>
            );
          })}
        </div>

        {/* Close button */}
        <div className="text-center align-middle buttons-container">
          <button
            className={`my-5 mx-5 font-bold active:underline  text-amber-950 ${
              isDarkMode ? "light" : "dark"
            }`}
            onClick={closePublicPost}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedModal;
