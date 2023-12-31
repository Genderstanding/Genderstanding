import React, { useState, useEffect } from "react";
import "./OwnerNodes.css";
import { useSelector } from "react-redux";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar";
import { useDispatch } from "react-redux";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OwnerReplyModal from "../OwnerReplyModal/OwnerReplyModal";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import QuestionTitleEllipsis from "../QuestionTitleEllipsis/QuestionTitleEllipsis";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This holds nodes of user who created the nodes
const OwnerNodes = ({ isDarkMode }) => {
  const dispatch = useDispatch();

  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const [clickedReplyContent, setClickedReplyContent] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [toggleButtom, setToggleButton] = useState(true);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [questionStates, setQuestionStates] = useState({});
  const [postIdProp, setPostIdProp] = useState(null);
  const [elipsisOpen, setElipsisOpen] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [postContent, setPostContent] = useState();

  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  let nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);
  let likePosts = useSelector(
    (store) => store.likesReducer.likeDatabaseResponse
  );
  const user = useSelector((state) => state.user);
  const userIds = nodeData.map((node) => node.user_id);

  // handle open and close ellipsis
  const openElipsis = (postId, postContent) => {
    setElipsisOpen(true);
    setPostIdProp(postId);
    setPostContent(postContent);
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

  // handle report post
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

  // function to like a post
  const increaseCount = (postId) => {
    const isLikedByUser = likePosts.some(
      (like) => like.post_id === postId && like.user_id === user.id
    );
    if (!isLikedByUser) {
      dispatch({
        type: "LIKE_POST",
        payload: postId,
      });
      dispatch({
        type: "LIKE_POST_USER",
        payload: { post: postId },
      });
    }
  };

  // handle open and close add question modal
  const openAddQuestion = () => {
    setAddQuestionOpen(true);
  };
  const closeAddQuestion = () => {
    setAddQuestionOpen(false);
  };

  // handle open and close add reply modal
  const openAddReply = (questionObject) => {
    setClickedReplyContent(questionObject);
    setAddReplyOpen(true);
  };
  const closeAddReply = () => {
    setAddReplyOpen(false);
  };
  
  // display post and node
  useEffect(() => {
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: 'FETCH_LIKES'});
  }, []);

  return (
    <>
      <div className="flex flex-col App">
        <HeaderOwnerBar />
        <div className="flex flex-col items-center justify-center pb-24 thread-container">
          {/* Conditional render to display modal */}
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
                      <div
                        className={`mt-4 mb-4 text-amber-950 shadow-md bg-userContent question-box ${
                          isDarkMode ? "dark" : "light"
                        }`}
                        key={post?.id}
                      >
                        <div className="flex items-end justify-between px-5 py-3">
                          <span className="text-sm">
                            {moment(post?.post_time).fromNow()}
                          </span>

                          <img
                            style={{ width: "30px" }}
                            src="./bell.gif"
                            alt="Bell"
                          />
                        </div>
                        {/* this should display the latest question/reply in this thread */}
                        <div
                          className={`flex flex-col items-center justify-center text-xl font-bold m-5 question-text bg-userContent text-amber-950 ${
                            isDarkMode ? "dark" : "light"
                          }`}
                        >
                          {post?.content}
                        </div>
                        <div className="flex items-end justify-between px-5 py-3 ">
                          {questionState.toggleButtom ? (
                            <button
                              className="text-sm font-semibold active:underline"
                              onClick={() => handleAcceptButton(post?.id)}
                            >
                              Accept
                            </button>
                          ) : (
                            <button
                              className="text-sm font-semibold active:underline"
                              onClick={() => openAddReply(post)}
                            >
                              Open
                            </button>
                          )}
                          {questionState.showButton && (
                            <button
                              className="text-sm font-semibold active:underline"
                              onClick={() => handleRejectButton(post?.id)}
                            >
                              Reject
                            </button>
                          )}
                          {questionState.toggleButtom ? (
                            <button
                              className="text-sm font-semibold active:underline"
                              onClick={() => handleReportButton(post?.id)}
                            >
                              Report
                            </button>
                          ) : (
                            // THIS SHOULDN'T RENDER UNLESS APPROVED
                            <button
                              className="text-sm font-bold active:underline text-amber-950"
                              onClick={() => increaseCount(post.id)}
                            >
                              {likePosts.some(
                                (like) =>
                                  like.post_id === post.id &&
                                  like.user_id === user.id
                              ) ? (
                                <FavoriteIcon
                                  className={`text-hearts ${
                                    isDarkMode ? "dark" : "light"
                                  }`}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  className={`text-hearts ${
                                    isDarkMode ? "dark" : "light"
                                  }`}
                                />
                              )}
                              {"  "}
                              <span>{post.votes || 0}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={`mt-4 mb-2 question-box font-medium text-amber-950 shadow-md bg-ownerContent ${
                          isDarkMode ? "light" : "dark"
                        }`}
                        key={post?.id}
                      >
                        <div className="flex items-end justify-between px-5 py-3">
                          <span className="text-sm">
                            {moment(post?.post_time).fromNow()}
                          </span>
                          <button onClick={() => openElipsis(post?.id, post)}>
                            . . .
                          </button>
                        </div>
                        {/* this should display the latest question/reply in this thread */}
                        <div
                          className={`flex flex-col items-center justify-center m-5 text-xl font-bold question-text bg-ownerContent text-amber-950 ${
                            isDarkMode ? "light" : "dark"
                          }`}
                        >
                          {post?.content}
                        </div>
                        <div className="flex items-end justify-between px-5 py-3 ">
                          <button
                            className="text-sm font-semibold active:underline text-amber-950"
                            onClick={() => openAddReply(post)}
                          >
                            Reply
                          </button>
                          {/* <button className="text-sm font-bold active:underline text-amber-950" onClick={() => increaseCount(post.id)}>
                            {toggleHeart ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}{'  '}<span>{post.votes || 0}</span></button> */}

                          <button
                            className="text-sm font-bold active:underline text-amber-950"
                            onClick={() => increaseCount(post.id)}
                          >
                            {likePosts.some(
                              (like) =>
                                like.post_id === post.id &&
                                like.user_id === user.id
                            ) ? (
                              <FavoriteIcon
                                className={`text-hearts ${
                                  isDarkMode ? "dark" : "light"
                                }`}
                              />
                            ) : (
                              <FavoriteBorderIcon
                                className={`text-hearts ${
                                  isDarkMode ? "dark" : "light"
                                }`}
                              />
                            )}
                            {"  "}
                            <span>{post.votes || 0}</span>
                          </button>
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
          postContent={postContent}
          handleRejectButton={handleRejectButton}
          handleReportButton={handleReportButton}
        />
      </div>
    </>
  );
};

export default OwnerNodes;
