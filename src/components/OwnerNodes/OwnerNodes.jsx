import React, { useState, useEffect } from "react";
import "./OwnerNodes.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar";
import { useDispatch } from "react-redux";
import moment from "moment";

import OwnerReplyModal from "../OwnerReplyModal/OwnerReplyModal";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import QuestionTitleEllipsis from "../QuestionTitleEllipsis/QuestionTitleEllipsis";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerNodes = ({ isDarkMode }) => {
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const [clickedReplyContent, setClickedReplyContent] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [toggleButtom, setToggleButton] = useState(true);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [questionStates, setQuestionStates] = useState({});
  const [postIdProp, setPostIdProp] = useState(null);
  const [elipsisOpen, setElipsisOpen] = useState(false);

  // inputing dispatch
  const dispatch = useDispatch();


  

  const openElipsis = (postId) => {
    setElipsisOpen(true);
    setPostIdProp(postId);  
};

const closeElipsis = () => {
    setElipsisOpen(false);
};

  // sends a flag to the database to permanently make the post visible to all users
  const handleAcceptButton = (postId) => {
    try {
       dispatch({
      type: "ACCEPT_POST",
      payload: postId,
    });
    setQuestionStates((prevStates) => ({
      ...prevStates,
      [postId]: {
        toggleButtom: false,
        showButton: false,
      },
    }));
    setShowButton(false);
    setToggleButton(false);
    } catch (error) {
      toast.error("Failed to accept question", {
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

  // Sends a call to the database to remove the post from the database
  const handleRejectButton = (postId) => {
    try {
      dispatch({
        type: "DELETE_POST",
        payload: postId,
      });
    } catch (error) {
      toast.error("Failed to reject question", {
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

  const handleReportButton = (postId) => {
    try {
        dispatch({
      type: "REPORT_POST",
      payload: postId,
    });
    } catch (error) {
      toast.error("Failed to report", {
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

  // Posts being held in store
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );


  // function to like a post
  const increaseCount = (postId) => {
    console.log("post id is : ", postId);
    dispatch({
      type: "LIKE_POST",
      payload: postId,
    });
    dispatch({
      type: 'LIKE_POST_USER',
      payload: { post: postId }
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

  useEffect(() => {
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: "FETCH_NODE" });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderOwnerBar />
        <div className="flex flex-col items-center justify-center pb-24 thread-container">
          {nodePosts.map((post) => {
            if (post?.reported == false) {
              if (post?.node_id == newNode.id) {
                if (post?.reply_id == null) {
                  if (post?.replied == false) {
                    const questionState = questionStates[post?.id] || {
                      toggleButtom: true,
                      showButton: true,
                    };
                    return (
                      <div className={`mt-4 mb-4 text-amber-950 shadow-md bg-userContent question-box ${isDarkMode ? 'dark' : 'light'}`} key={post?.id}>
                        <div className="flex items-end justify-between px-5 py-3"> New Question!
                          <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
                          
                        </div>
                        {/* this should display the latest question/reply in this thread */}
                        <div className={`flex flex-col items-center justify-center text-lg font-bold m-5 question-text bg-userContent text-amber-950 ${isDarkMode ? 'dark' : 'light'}`} >
                          {post?.content}
                        </div>
                        <div className="flex items-end justify-between px-5 py-3 ">
                          {questionState.toggleButtom ? (
                               <button className="text-sm font-bold active:underline" onClick={()=>handleAcceptButton(post?.id)}>Accept</button>
                               ) : (
                                 <button className="text-sm font-bold active:underline" onClick={() => openAddReply(post)}>Reply</button>
                               )}
                               {questionState.showButton &&
                                 <button className="text-sm font-bold active:underline" onClick={()=>handleRejectButton(post?.id)}>Reject</button>
                               }
                               {questionState.toggleButtom ? (
                                 <button className="text-sm font-bold active:underline" onClick={()=> handleReportButton(post?.id)}>Report</button>
                          ) : (
                            // THIS SHOULDN'T RENDER UNLESS APPROVED
                            <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤{"  "}<span>{post.votes || 0}</span></button>
                          )}
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className={`mt-4 mb-2 question-box font-medium text-amber-950 shadow-md bg-ownerContent ${isDarkMode ? "light": "dark"}`} key={post?.id}>
                        <div className="flex items-end justify-between px-5 py-3">
                        <span className="text-sm">{moment(post?.post_time).fromNow()}</span>
                        <button onClick={() => openElipsis( post?.id)}>. . .</button>
                        </div>
                        {/* this should display the latest question/reply in this thread */}
                        <div className={`flex flex-col items-center justify-center m-5 text-lg font-bold question-text bg-ownerContent text-amber-950 ${isDarkMode ? "light": "dark"}`} >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-5 py-3 ">
                      <button className="text-sm font-bold active:underline text-amber-950" onClick={() => openAddReply(post)}>Reply</button>
                      <button className="text-sm font-bold active:underline text-amber-950" onClick={() => increaseCount(post.id)}>🖤{'  '}<span>{post.votes || 0}</span></button>
                      </div>
                      </div>
                    );
                  }
                }
              }
            }
          })}
        </div>
        <AddQuestionModal
          addQuestionOpen={addQuestionOpen}
          closeAddQuestion={closeAddQuestion}
        />
        <OwnerReplyModal
          addReplyOpen={addReplyOpen}
          closeAddReply={closeAddReply}
          questionObject={clickedReplyContent}
        />
        <QuestionTitleEllipsis 
        elipsisOpen={elipsisOpen}
        elipsisClose={closeElipsis}
        postIdProp={postIdProp}
        handleRejectButton={handleRejectButton}
        handleReportButton={handleReportButton}
        />
      </div>
    </>
  );
};

export default OwnerNodes;