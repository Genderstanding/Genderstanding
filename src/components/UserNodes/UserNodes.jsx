import React, { useState } from "react";
import "./UserNodes.css";
import ReplyModal from "../ReplyModal/ReplyModal";
import { useSelector } from "react-redux";
import HeaderUserBar from "../HeaderBar/HeaderUserBar";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import { useDispatch } from "react-redux";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// This page holds the nodes that a user is in
const UserNodes = ({ isDarkMode }) => {
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const [clickedReplyContent, setClickedReplyContent] = useState("");

  const dispatch = useDispatch();

  // Posts being held in store
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  // New nodes being held in store
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  // Likes of a post being held in store
  let likePosts = useSelector(
    (store) => store.likesReducer.likeDatabaseResponse
  );
  // account of the logged in user being held in store
  const user = useSelector((state) => state.user);

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

  // function to open and close the add question modal
  const openAddQuestion = () => {
    setAddQuestionOpen(true);
  };
  const closeAddQuestion = () => {
    setAddQuestionOpen(false);
  };
  // function to open and close the reply modal
  const openAddReply = (questionObject) => {
    setClickedReplyContent(questionObject);
    setAddReplyOpen(true);
  };
  const closeAddReply = () => {
    setAddReplyOpen(false);
  };

  return (
    <>
      <div className="flex flex-col App">
        <HeaderUserBar />
        <div className="flex flex-col items-center justify-center pb-24 thread-container ">
          {nodePosts.map((post) => {
            if (post?.node_id == newNode.id) {
              if (post?.reply_id == null) {
                if (post?.replied == true) {
                  return (
                    <div
                      className={`mt-4 mb-2 pb-2 pt-2 font-medium  text-amber-950 shadow-md bg-userContent question-box ${
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
                      <div
                        className={`  flex flex-col items-center justify-center m-5 text-lg font-bold question-text bg-userContent text-amber-950 ${
                          isDarkMode ? "light" : "dark"
                        }`}
                      >
                        {post?.content}
                      </div>
                      <div className="flex items-end justify-between px-4 py-2 ">
                        <button
                          className="font-semibold text-md active:underline text-amber-950"
                          onClick={() => openAddReply(post)}
                        >
                          Open
                        </button>
                        <button onClick={() => increaseCount(post.id)}>
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
