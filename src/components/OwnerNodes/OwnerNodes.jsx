import React, { useState } from "react";
import "./OwnerNodes.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar"
import { useDispatch } from "react-redux";
import OwnerReplyModal from "../OwnerReplyModal/OwnerReplyModal";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";


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

  const handleAcceptButton = () => {
    setShowButton(false);
    setToggleButton(false);
  }
  
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

  const increaseCount = (postId) => {
    dispatch({
      type: 'LIKE_POST',
      payload: {
        id: postId
      }
    })
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
              <HeaderOwnerBar />
                <div className="flex flex-col items-center justify-center thread-container">
                    {nodePosts.map(post => {
                        if (post?.node_id == newNode.id) {
                            if (post?.reply_id == null) {
                                return (
                                    <div className="mt-4 question-box" key={post?.id}>
                                        <div className="flex items-end justify-between px-4 py-2">
                                            <span className="text-sm">5 minutes ago</span>

                                        </div>
                                        {/* this should display the latest question/reply in this thread */}
                                        <div className="m-4 question-text" >
                                            {post?.content}
                                        </div>
                                        <div className="flex items-end justify-between px-4 py-2">
                                          {toggleButtom ? (
                                          <button className="underline text-sm"onClick={handleAcceptButton}>Accept</button>
                                          ) : (
                                          <button className="text-sm" onClick={() => openAddReply(post)}>Reply</button>
                                          )}
                                          {showButton && 
                                          <button className="underline text-sm">Reject</button>
                                          }
                                          {toggleButtom ? (
                                            <button className="underline text-sm">Report</button>
                                          ) : (
                                            <button className="text-sm" onClick={() => increaseCount(post.id)}>🖤<span>{post.votes || 0}</span></button>
                                          )}
                                          </div>
                                    </div>
                                )
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
