import React, { useState } from "react";
import "./OwnerNodes.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar"
import { useDispatch } from "react-redux";
import moment from 'moment';

import OwnerReplyModal from "../OwnerReplyModal/OwnerReplyModal";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import ElipsisModal from "../ElipsisModal/ElipsisModal";


const OwnerNodes = () => {
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const [clickedReplyContent, setClickedReplyContent] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [toggleButtom, setToggleButton] = useState(true);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);

  // inputing dispatch
  const dispatch = useDispatch();

  // const toggleShowButton = () => {
  //   setShowButton(!showButton);
  // }

  // sends a flag to the database to permanently make the post visible to all users
  const handleAcceptButton = (postId) => {
    dispatch({
      type: 'ACCEPT_POST',
      payload: postId
    })
    setShowButton(false);
    setToggleButton(false);
  }

  // Sends a call to the database to remove the post from the database
  const handleRejectButton = (postId) => {
    dispatch({
      type: 'DELETE_POST',
      payload: postId
    })
  }

  const handleReportButton = (postId) => {
    dispatch({
      type: 'REPORT_POST',
      payload: postId
    })
  }

  // Posts being held in store
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  console.log('nodePosts object:', nodePosts)

  // function to like a post
  const increaseCount = (postId) => {
    console.log('post id is : ', postId)
    dispatch({
      type: 'LIKE_POST',
      payload: postId
    })
  };

  const openAddQuestion = () => {
    setAddQuestionOpen(true);
  };

  const closeAddQuestion = () => {
    setAddQuestionOpen(false);
  };

  const openAddReply = (questionObject) => {
    setClickedReplyContent(questionObject);
    setAddReplyOpen(true);
  };

  const closeAddReply = () => {
    setAddReplyOpen(false);
  };

  return (
    <>

      <div className="flex flex-col h-screen App">
        <HeaderOwnerBar />
        <div className="flex flex-col items-center justify-center thread-container">
          {nodePosts.map(post => {
            if(post?.reported == false) {
            if (post?.node_id == newNode.id) {
              if (post?.reply_id == null) {
                if(post?.replied == false) {
                  return (
                    <div className="mt-4 question-box" key={post?.id}>
                      <div className="flex items-end justify-between px-4 py-2">
                        <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
                        
                      </div>
                      {/* this should display the latest question/reply in this thread */}
                      <div className="m-4 question-text" >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-4 py-2">
                        {toggleButtom ? (
                          <button className="underline text-sm" onClick={()=>handleAcceptButton(post?.id)}>Accept</button>
                        ) : (
                          <button className="text-sm" onClick={() => openAddReply(post)}>Reply</button>
                        )}
                        {showButton &&
                          <button className="underline text-sm" onClick={()=>handleRejectButton(post?.id)}>Reject</button>
                        }
                        {toggleButtom ? (
                          <button className="underline text-sm" onClick={()=> handleReportButton(post?.id)}>Report</button>
                        ) : (
                          <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤<span>{post.votes || 0}</span></button>
                        )}
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="mt-4 question-box" key={post?.id}>
                      <div className="flex items-end justify-between px-4 py-2">
                        <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
  
                      </div>
                      {/* this should display the latest question/reply in this thread */}
                      <div className="m-4 question-text" >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-4 py-2">
                          <button className="text-sm" onClick={() => openAddReply(post)}>Reply</button>
                          <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤<span>{post.votes || 0}</span></button>
                      </div>
                    </div>
                  )
                } 
              }
            }
            }
          })}
        </div>
        <AddQuestionModal addQuestionOpen={addQuestionOpen} closeAddQuestion={closeAddQuestion} />
        <OwnerReplyModal addReplyOpen={addReplyOpen} closeAddReply={closeAddReply} questionObject={clickedReplyContent} />
      </div>
    </>
  );
};

export default OwnerNodes;
