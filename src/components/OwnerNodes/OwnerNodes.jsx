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


const OwnerNodes = ({isDarkMode}) => {
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
        <div className="flex flex-col items-center justify-center pb-24 thread-container">
          {nodePosts.map(post => {
            if(post?.reported == false) {
            if (post?.node_id == newNode.id) {
              if (post?.reply_id == null) {
                if(post?.replied == false) {
                  return (
                    <div className={`mt-4 mb-20 text-black bg-userContent question-box ${isDarkMode ? 'dark' : 'light'}`} key={post?.id}>
                      <div className="flex items-end justify-between px-5 py-3"> New Question
                        <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
                        
                      </div>
                      {/* this should display the latest question/reply in this thread */}
                      <div className={`m-5 question-text bg-userContent ${isDarkMode ? 'dark' : 'light'}`} >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-5 py-3 ">
                        {toggleButtom ? (
                          <button className="text-sm font-semi-bold active:underline active:font-bold" onClick={()=>handleAcceptButton(post?.id)}>Accept</button>
                        ) : (
                          <button className="text-sm font-semi-bold active:underline active:font-bolde" onClick={() => openAddReply(post)}>Reply</button>
                        )}
                        {showButton &&
                          <button className="text-sm font-semi-bold active:underline active:font-bold" onClick={()=>handleRejectButton(post?.id)}>Reject</button>
                        }
                        {toggleButtom ? (
                          <button className="text-sm font-semi-bold active:underline active:font-bold" onClick={()=> handleReportButton(post?.id)}>Report</button>
                        ) : (
                          <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤<span>{post.votes || 0}</span></button>
                        )}
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className={`mt-4 mb-2 question-box font-medium text-black shadow-md bg-ownerContent ${isDarkMode ? 'dark' : 'light'}`} key={post?.id}>
                      <div className="flex items-end justify-between px-5 py-3">
                        <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
  
                      </div>
                      {/* this should display the latest question/reply in this thread */}
                      <div className={`m-5 font-normal question-text bg-ownerContent text-black ${isDarkMode ? 'dark' : 'light'}`} >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-5 py-3 ">
                          <button className="text-sm font-bold active:underline" onClick={() => openAddReply(post)}>Reply</button>
                          <button className="text-sm font-bold active:underline" onClick={() => increaseCount(post.id)}>🖤{'  '}<span>{post.votes || 0}</span></button>
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
