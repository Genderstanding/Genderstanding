import React, { useEffect } from "react";
import "./FeaturedPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FeaturedModal from "../FeaturedReplyModal/FeaturedModal";

function FeaturedPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [publicPost, setPublicPost] = useState("");
  const [viewPostOpen, setViewPostOpen] = useState(false);

  let publicPosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );

  let user = useSelector((store) => store.user);

  // Function to like a post
  const increaseCount = (postId) => {
    dispatch({
      type: "LIKE_POST",
      payload: postId,
    });
    dispatch({
      type: "LIKE_POST_USER",
      payload: { post: postId },
    });
  };

  // Function to open selected post
  const openPublicPost = (selectedNodeId) => {
    try {
      setPublicPost(selectedNodeId);
      setViewPostOpen(true);

      dispatch({
        type: "FETCH_PUBLIC_POSTS",
        payload: selectedNodeId,
      });
      // history.push('/public')
      console.log("postID", selectedNodeId);
    } catch (error) {
      console.log(
        "Error in obtaining node information on FeaturedPage: ",
        error
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderBar />
        <div className="mt-4 featured-container">
          <h1 className="mb-1 ml-5 text-2xl font-bold font-mulish">Featured</h1>
          <h4>View community nodes</h4>
          <div className="mt-2 ml-8 featured-buttons"></div>
          <div className="flex flex-col items-center justify-center pb-24 thread-container ">
            {publicPosts.map((post) => {
              if (post?.reply_id == null) {
                if (post?.public == true) {
                  return (
                    <div
                      className="pt-2 pb-2 mt-4 mb-2 font-medium shadow-md text-amber-950 bg-userContent featured-box "
                      key={post?.id}
                    > 
                      <div className="flex items-end justify-between px-4 py-2">
                        <span className="text-sm">
                          {moment(post?.post_time).fromNow()}
                        </span>
                        <span className="text-sm text-end">
                          Featured
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center m-5 text-lg font-bold featured-text bg-userContent text-amber-950">
                        {post?.node_name}
                      </div>
                      <div className="flex items-end justify-between px-4 py-2 ">
                        <button
                          className="text-sm font-bold active:underline text-amber-950"
                          onClick={() => openPublicPost(post.node_id)}
                        >
                          Open
                        </button>
                        <button
                          className="text-sm font-bold active:underline text-amber-950"
                          onClick={() => increaseCount(post.id)}
                        >
                          🖤{"  "}
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
          selectedNodeId={publicPost}
        />
      </div>
    </>
  );
}

export default FeaturedPage;
