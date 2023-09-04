import React, { useState } from "react";
import "./UserNodes.css";
import ReplyModal from "../ReplyModal/ReplyModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderUserBar from "../HeaderBar/HeaderUserBar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import { useDispatch } from "react-redux";
import moment from 'moment';


const UserNodes = ({isDarkMode}) => {
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

  const questionsArray = [
    {
      node_id: 1,
      user_id: 123,
      question:
        "Rainbows are visions, but only illusions. Rainbows have nothing to hide.",
      count: 0,
    },
    {
      node_id: 2,
      user_id: 234,
      question:
        "Rainbows are nightmares, as real as death. Rainbows will eat you alive.",
      count: 0,
    },
  ];

  // Function to like a post
  const increaseCount = (postId) => {
    dispatch({
      type: "LIKE_POST",
      payload: postId,
    });


    // const updatedPostArray = nodePosts.map((content) =>
    //   content.node_id === nodeId
    //     ? { ...content, count: content.count + 1 }
    //     : content
    //     );
    //     setQuestionsArray(updatedQuestionsArray);
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

                {/* <div className='flex items-center header-container '>
                    <MdChevronLeft size={25} className='ml-2' />
                    <div className="flex-grow"></div>
                    <button className="mr-4 text-2xl" onClick={()=>openAddQuestion(newNode?.id)}>?</button>
                </div> */}
                <HeaderUserBar/>


                <div className="flex flex-col items-center justify-center thread-container ">
                    {nodePosts.map(post => {
                        if (post?.node_id == newNode.id) {
                            if (post?.reply_id == null) {
                              if(post?.replied == true){
                                return (
                               
                                      <div className={`mt-4 mb-3 pb-2 pt-2 font-medium  text-black shadow-md bg-userContent question-box ${isDarkMode ? 'dark' : 'light'}`} key={post?.id}>
                                        <div className="flex items-end justify-between px-4 py-2">
                                            <span className="text-sm">{moment(post?.post_time).fromNow()}</span>

                                      </div>
                                      {/* this should display the latest question/reply in this thread */}
                                      <div className="m-4 question-text" >
                                          {post?.content}
                                      </div>
                                      <div className="flex items-end justify-between px-4 py-2">
                                          <button className="text-sm" onClick={() => openAddReply(post)}>Open</button>
                                          <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤<span>{post.votes || 0}</span></button>
                                      </div>
                                  </div>
                              )
                              }
                            }
                        }
                    })}
                </div>
                <AddQuestionModal addQuestionOpen={addQuestionOpen} closeAddQuestion={closeAddQuestion} />
                <ReplyModal addReplyOpen={addReplyOpen} closeAddReply={closeAddReply} questionObject={clickedReplyContent} />
            </div>
        </>
    );
};

export default UserNodes;
