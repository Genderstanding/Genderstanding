import React, { useState } from "react";
import "./FeaturedModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

function FeaturedModal({
  viewPostOpen,
  isDarkMode,
  setViewPostOpen,
  selectedNodeId,
}) {
  if (!viewPostOpen) {
    return null;
  }

  const publicPosts = useSelector(
    (store) => store.postReducer.publicDatabaseResponse
  );
  
  let nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);
  
  // Filter responses for the selected node
  const nodeResponses = publicPosts.filter(
    (response) => response.node_id === selectedNodeId
  );

  // Reverse the order of responses
  const reverseResponses = [...nodeResponses].reverse();

  const closePublicPost = () => {
    setViewPostOpen(false);
  };

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center reply-box">
        {/* Display the user's question */}
        {reverseResponses
          .filter((response) => response.reply_id === null)
          .map((response) => (
           <h2
              className="mt-6 mb-4 mr-4 text-xl font-bold text-amber-950"
              key={response.id}
            > <span className="text-xl"> Question: </span>
              {response.content}
            </h2>
          ))} 
        {/* display responses, oldest first */}
        <div className="overflow-y-auto scrollable-container text-amber-950">
          {reverseResponses
            .filter((response) => response.reply_id !== null)
            .map((response) => {
                
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
                      ? "owner-text-bubble mb-2"
                      : "user-text-bubble ml-5 mb-2"
                  }`}
                >
                 <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm font-bold">
                      {isNodeOwner ? "Owner" : "User"}{" "}
                    
                    </span>
                    <span className="text-sm text-end">  {moment(response?.post_time).fromNow()}
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
