import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar";

import "./OwnerNodes.css";

const OwnerNodes = () => {
  // sourcing use selector to hold store information
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );

  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderOwnerBar />
        <div className="flex justify-center thread-container ">
          {nodePosts.map((post) => {
            if (post?.node_id == newNode.id) {
              return (
                <div className="mt-4 question-box">
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm">5 minutes ago</span>
                    <button>. . .</button> 
                  </div>
                  <div className="m-4 question-text">{post?.content}</div>
                  <div className="flex items-end justify-between px-4 py-2">
                    <button className="text-sm">Reply</button>
                    <button className="text-sm">Reject</button>
                  </div>
                </div>
              );
            }
          })}
          <div className="mt-4 question-box">
            <div className="flex items-end justify-between px-4 py-2">
              <span className="text-sm">5 minutes ago</span>
              <button>. . .</button>
            </div>
            <div className="m-4 question-text">
              (test data) Why are there so many songs about rainbows? Also,
              what's on the other side?
            </div>
            <div className="flex items-end justify-between px-4 py-2">
              <button className="text-sm">Reply</button>
              <button className="text-sm">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerNodes;
