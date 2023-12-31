import React, { useEffect } from "react";
import "./FeaturedPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FeaturedModal from "../FeaturedReplyModal/FeaturedModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// This holds featured page
function FeaturedPage({ isDarkMode }) {
  const dispatch = useDispatch();
  const [publicPost, setPublicPost] = useState("");
  const [postInfos, setPostInfo] = useState("");
  const [viewPostOpen, setViewPostOpen] = useState(false);

  const publicPosts = useSelector(
    (store) => store.postReducer.publicDatabaseResponse
  );

  let nodeData = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);
  // like store
  let likePosts = useSelector(
    (store) => store.likesReducer.likeDatabaseResponse
  );

  useEffect(() => {
    dispatch({ type: "FETCH_PUBLIC_POSTS" });
    dispatch({ type: "FETCH_LIKES" });
  }, []);

  //user store
  const user = useSelector((state) => state.user);

  // Function to like a post
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

  // Function to open selected post
  const openPublicPost = (selectedPostId, postInfo) => {
    try {
      setPublicPost(selectedPostId);
      setPostInfo(postInfo);
      setViewPostOpen(true);
    } catch (error) {
    }
  };

  return (
    <>
      <div className="flex flex-col App">
        <HeaderBar />
        <div className="mt-4 featured-container">
          <h1 className="mb-1 ml-8 text-2xl font-bold font-mulish">Featured</h1>
          <h4 className="mb-1 ml-8 font-mulish">View featured posts </h4>
          <div className="flex flex-col items-center justify-center pb-24 thread-container ">
            {publicPosts.map((post) => {
              if (post?.reply_id == null) {
                if (post?.public == true) {
                  return (
                    <div
                      className="pt-2 pb-2 mt-4 mb-2 font-medium shadow-md text-amber-950 bg-userContent featured-box "
                      key={post?.id}
                    >
                      <div className="flex items-end px-4 py-2 ">
                        <div className="text-sm ">
                          {moment(post?.post_time).fromNow()}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center m-5 text-lg font-bold featured-text bg-userContent text-amber-950">
                        {/* Display the user's question */}
                        <span>{post?.content} </span>
                      </div>
                      <div className="flex items-end justify-between px-4 py-2 ">
                        <button
                          className="font-bold text-semibold active:underline text-amber-950"
                          onClick={() => openPublicPost(post.id, post)}
                        >
                          Open
                        </button>
                        <button
                          className="font-semibold text-md active:underline text-amber-950"
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
            })}
          </div>
        </div>
        <FeaturedModal
          viewPostOpen={viewPostOpen}
          setViewPostOpen={setViewPostOpen}
          selectedPostId={publicPost}
          postInfo={postInfos}
        />
      </div>
    </>
  );
}

export default FeaturedPage;
