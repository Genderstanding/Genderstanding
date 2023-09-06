import React, { useState } from "react";
import "./FeaturedModal.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

export default FeaturedModal = ({
  addReplyOpen,
  closeAddReply,
  questionObject,
  isDarkMode,
}) => {
  if (!addReplyOpen) {
      return null;
  }

  
  return (
    <>
    <div className="flex flex-col h-screen App">
      <HeaderUserBar />
      <div className="flex flex-col items-center justify-center pb-24 thread-container ">
        {nodePosts.map((post) => {
          if (post?.node_id == newNode.id) {
            if (post?.reply_id == null) {
              if (post?.replied == true) {
                return (
                  <div
                    className={`mt-4 mb-2 pb-2 pt-2 font-medium  text-amber-950 shadow-md bg-userContent featured-box ${
                      isDarkMode ? "light" : "dark"
                    }`}
                    key={post?.id}
                  > 
                   <div className="flex items-end justify-between px-4 py-2">
                      <span className="text-sm">
                        {moment(post?.post_time).fromNow()}
                      </span>
                    </div>
                    {/* this should display the latest question/reply in this thread */}
                    <div className={`flex flex-col items-center justify-center m-5 text-lg font-bold featured-text bg-userContent text-amber-950 ${isDarkMode ? "light" : "dark"}`}>{post?.content}</div>
                    <div className="flex items-end justify-between px-4 py-2 ">
                      <button
                        className="text-sm font-bold active:underline text-amber-950"
                        onClick={() => openAddReply(post)}
                      >
                        Open
                      </button>
                      <button
                        className="text-sm font-bold active:underline text-amber-950"
                        onClick={() => increaseCount(post.id)}
                      >
                       🖤{'  '}<span>{post.votes || 0}</span>
                      </button>
                    </div>
                  </div>
                );
              }
            }
          }
        })}
      </div>
    </div>
  </>
  )
}
