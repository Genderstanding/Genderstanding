import React from "react";
import "./FeaturedPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";
import { useSelector } from "react-redux";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { useState } from "react";

function FeaturedPage() {

  const [publicPost, setPublicPost] = useState("")
  const [viewPostOpen, setViewPostOpen] = useState(false);

  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );

  const dispatch = useDispatch();

  //like store
  let likePosts = useSelector(
    (store) => store.likesReducer.likeDatabaseResponse
  );

  //user store
  const user = useSelector((state) => state.user);

  // Function to like a post
  const increaseCount = (postId) => {
    const isLikedByUser = likePosts.some((like) => like.post_id === postId && like.user_id === user.id);
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
   // setIsLikeClicked(true);
  }

  const openPublicPost = (post) => {
    setPublicPost(post);
    setViewPostOpen(true);
  }




  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderBar />
        <div className="mt-4 featured-container">
          <h1 className="mb-1 ml-5 text-2xl font-bold font-mulish">Featured</h1>
          <h4>View community nodes</h4>
          <div className="mt-2 ml-8 featured-buttons"></div>
          <div className="flex flex-col items-center justify-center pb-24 thread-container ">
            {nodePosts.map(post => {
              if (post?.reply_id == null) {
                if (post?.public == true) {
                  return (
                    <div className="mt-4 mb-2 pb-2 pt-2 font-medium  text-amber-950 shadow-md bg-userContent question-box " key={post?.id}>
                      <div className="flex items-end justify-between px-4 py-2">
                        <span className="text-sm">
                          {moment(post?.post_time).fromNow()}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center m-5 text-lg font-bold question-text bg-userContent text-amber-950">{post?.content}</div>
                      <div className="flex items-end justify-between px-4 py-2 ">
                        <button
                          className="text-sm font-bold active:underline text-amber-950"
                          onClick={() => openPublicPost(post)}
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


                  )
                }
              }
            })}
          </div>
        </div>
      </div >
    </>
  );
}


export default FeaturedPage;