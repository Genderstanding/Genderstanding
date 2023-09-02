import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderOwnerBar from "../HeaderBar/HeaderOwnerBar";
import "./OwnerNodes.css";
import ElipsisModal from "../ElipsisModal/ElipsisModal";

const OwnerNodes = () => {
  const [elipsisOpen, setElipsisOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState('(test data) Why are there so so many songs about rainbows and whats on the other side?');
  const [addReplys, setAddReplys] = useState(0);
  const [replyTexts, setReplyTexts] = useState([]);
  const [activeReplyText, setActiveReplyText] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [showRejectButton, setShowRejectButton] = useState(true);

  const toggleShowButton = () => {
    setShowButton(!showButton);
  }

  const handleShowReject = () => {
    setShowRejectButton(false);
  }
  const handleAddReply = (index, replyText) => {
    const newReplyTexts = [...replyTexts];
    newReplyTexts.push(activeReplyText);
    setReplyTexts(newReplyTexts);
    setActiveReplyText('');
    setAddReplys(prev => (prev - 1))
    toggleShowButton();
    handleShowReject();
  }

  const openElipsis = (content) => {
    console.log('openElipsis clicked!')
    setElipsisOpen(true);
    setContentToEdit(content);
  };

  const closeElipsis = () => {
    setElipsisOpen(false);
  };

  const handleSaveEdit = (editedContent) => {
    // dispatch an action to update for reals
    // updating content directly in the state
    setContentToEdit(editedContent);
  };



  // sourcing use selector to hold store information
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );

  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderOwnerBar />
        <div className="flex flex-col justify-center items-center thread-container ">
          {nodePosts.map((post) => {
            if (post?.node_id == newNode.id) {
              return (
                <div className="mt-4 question-box">
                  <div className="flex items-end justify-between px-4 py-2">
                    <span className="text-sm">5 minutes ago</span>
                    <button onClick={() => openElipsis(contentToEdit)}>. . .</button>
                  </div>
                  <div className="m-4 question-text">{post?.content}</div>
                  <div className="flex items-end justify-between px-4 py-2">
                    <button className="text-sm" onClick={() => setAddReplys(prev => (prev + 1))}>Reply</button>
                    <button className="text-sm">Reject</button>
                  </div>
                  {[...Array(addReplys).keys()].map((addReply, i) => (
                    <div key={i} className="mt-4 ml-5 reply-container flex flex-col items-center">
                      <textarea
                        className="reply-text m-4 p-2 min h-20 w-1/2"
                        placeholder="Enter Reply..."
                        value={activeReplyText}
                        onChange={(e) => setActiveReplyText(e.target.value)} />
                      <div className="flex items-end justify-between px-4 py-2">
                        {/* could not get these buttons apart without adding the margin??? */}
                        <button className="add-reply text-sm mr-20" onClick={handleAddReply}>Add Reply</button>
                        <button className="cancel-reply text-sm ml-24" onClick={() => setAddReplys(prev => (prev - 1))}>Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
          })}

          {/* dummy data for display and tinkering*/}
          <div className="question-box mt-4 ">
            <div className="flex items-end justify-between px-4 py-2">
              <span className="text-sm">5 minutes ago</span>
              <button onClick={() => openElipsis(contentToEdit)}>. . .</button>
            </div>
            <div className="m-4 question-text">
              {contentToEdit}
            </div>
            <div className="flex items-end justify-between px-4 py-2">
              {showButton && 
              <button className="text-sm" onClick={() => setAddReplys(prev => (prev + 1))}>Reply</button>
              }
              {showRejectButton ? (
              <button className="text-sm">Reject</button>
               ) : (
                <button className="text-sm ml-72">🖤<span>0</span></button>
              )}
            </div>
          </div>
          {[...Array(addReplys).keys()].map((addReply, i) => (
            <div key={i} className="mt-4 ml-5 reply-container flex flex-col items-center">
              <textarea
                className="reply-text m-4 p-2 min h-20 w-1/2"
                placeholder="Enter Reply..."
                value={activeReplyText}
                onChange={(e) => setActiveReplyText(e.target.value)} />
              <div className="flex items-end justify-between px-4 py-2">
                {/* could not get these buttons apart without adding the margin??? */}
                <button className="add-reply text-sm mr-20" onClick={handleAddReply}>Add Reply</button>
                <button className="cancel-reply text-sm ml-24" onClick={() => setAddReplys(prev => (prev - 1))}>Cancel</button>
              </div>
            </div>
          ))}
          {/* end of dummy */}

          {/* this is where the reply maps to, not a dummy... a smarty */}
          {replyTexts.map((text, i) => (
            <div key={i} className="mt-4 ml-5 reply-container ">
              <div className="flex items-end justify-between px-4 py-2">
                <span className="text-sm">5 minutes ago</span>
                <button onClick={() => openElipsis(contentToEdit)}>. . .</button>
              </div>
              <div className="rendered-reply m-4">
                {text}
              </div>
              <div className="flex items-end justify-between px-4 py-2">
                <button className="text-sm" onClick={() => setAddReplys(prev => (prev + 1))}>Reply</button>
                <button className="text-sm" >🖤<span>0</span></button>
              </div>
            </div>
          ))}
        </div>
        <ElipsisModal
          elipsisOpen={elipsisOpen}
          elipsisClose={closeElipsis}
          contentToEdit={contentToEdit}
          handleSaveEdit={handleSaveEdit} />

      </div>
    </>
  );
};

export default OwnerNodes;
