import React, { useState } from "react";
import "./UserNodes.css";
import ReplyModal from "../ReplyModal/ReplyModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderUserBar from "../HeaderBar/HeaderUserBar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import { useDispatch } from "react-redux";
import moment from "moment";

const UserNodes = ({ isDarkMode }) => {
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const [clickedReplyContent, setClickedReplyContent] = useState("");

  // importing dispatch
  const dispatch = useDispatch();

  // Posts being held in store
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  //like store
  let likePosts = useSelector(
    (store) => store.likesReducer.likeDatabaseResponse
  );
  //user store
  const user = useSelector((state) => state.user);

  // function to like a post
  const increaseCount = (postId) => {
    console.log("post id is : ", postId);
      const isLikedByUser = likePosts.some((like) => like.post_id === postId && like.user_id === user.id);
      console.log('isLikedByUser:', isLikedByUser)
      if (!isLikedByUser) {
        dispatch({
          type: "LIKE_POST",
          payload: postId,
        });
      dispatch({
          type: 'LIKE_POST_USER',
          payload: { post: postId }
        })
      } else {
        //future toast
        alert("You have already liked this post.");
      }
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
        <HeaderUserBar />
        <div className="flex flex-col items-center justify-center pb-24 thread-container ">
          {nodePosts.map((post) => {
            if (post?.node_id == newNode.id) {
              if (post?.reply_id == null) {
                if (post?.replied == true) {
                  return (
                    <div
                      className={`mt-4 mb-2 pb-2 pt-2 font-medium  text-amber-950 shadow-md bg-userContent question-box ${isDarkMode ? "dark" : "light"
                        }`}
                      key={post?.id}
                    >
                      <div className="flex items-end justify-between px-4 py-2">
                        <span className="text-sm">
                          {moment(post?.post_time).fromNow()}
                        </span>
                      </div>
                      {/* this should display the latest question/reply in this thread */}
                      <div className={`flex flex-col items-center justify-center m-5 text-lg font-bold question-text bg-userContent text-amber-950 ${isDarkMode ? 'dark' : 'light'}`}>{post?.content}</div>
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
        <AddQuestionModal
          addQuestionOpen={addQuestionOpen}
          closeAddQuestion={closeAddQuestion}
        />
        <ReplyModal
          addReplyOpen={addReplyOpen}
          closeAddReply={closeAddReply}
          questionObject={clickedReplyContent}
        />
      </div>
    </>
  );
};

export default UserNodes;
