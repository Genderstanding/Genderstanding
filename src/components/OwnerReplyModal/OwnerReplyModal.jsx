import React, { useState } from 'react';
import './OwnerReplyModal.css'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ElipsisModal from '../ElipsisModal/ElipsisModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerReplyModal = ({ addReplyOpen, closeAddReply, questionObject, isDarkMode}) => {
    if (!addReplyOpen) {
        return null;
    }
    const dispatch = useDispatch();
    let nodePosts = useSelector(store => store.postReducer.postDatabaseResponse)
    let nodeData = useSelector(store => store.nodeReducer.nodeDatabaseResponse);

    const reversePosts = nodePosts.slice().reverse();

    // Creating a state to hold text inputed
    const [replyInput, setReplyInput] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [elipsisOpen, setElipsisOpen] = useState(false);
    const [contentToEdit, setContentToEdit] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [addReplys, setAddReplys] = useState(0);
    const [postIdProp, setPostIdProp] = useState(null);


    const openElipsis = (content, postId) => {
        setElipsisOpen(true);
        setContentToEdit(content);
        setPostIdProp(postId);
        
    };

    const closeElipsis = () => {
        setElipsisOpen(false);
    };

    const handleReply = (event, questionObject) => {
        event.preventDefault();
        setReplyInput('')
        try {
            dispatch({
                type: 'CREATE_POST',
                payload: {
                    content: replyInput,
                    reply_id: questionObject.id,
                    node_id: questionObject.node_id,
                    orig_post: false
                }
            })
            toast.success("Replied sent", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
        } catch (error) {
          toast.error("Failed to reply to user", {
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
    }

    const handleDeleteButton = (postId) => {
      try {
        console.log('delete clicked!')
        console.log('postId in handleDeleteButton:', postId)
        dispatch({
            type: 'DELETE_POST',
            payload: postId
        })
      } catch (error) {
        toast.error("Failed to delete post", {
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
    }

    const handleReportButton = (postId) => {
      try {
         dispatch({
          type: 'REPORT_POST',
          payload: postId
        })
      } catch (error) {
        toast.error("Failed to report user", {
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
       
      }

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center reply-box'>
                {/* {children} */}
                <h2 className='mt-6 mb-4 mr-4 text-xl font-bold text-amber-950'>{questionObject.content}</h2>
                <div className="overflow-y-auto scrollable-container text-amber-950">
                    {reversePosts.map((post) => {
                        if (post?.reply_id == questionObject.id) {
                            const matchingNode = nodeData.find(node => node.id === post.node_id);
                            const isNodeOwner = matchingNode ? post.user_id === matchingNode.user_id : false;
                            return (
                                <div key={post.id} className={`mt-4 ${isNodeOwner ? 'owner-text-bubble mr-5 mb-2' : 'user-text-bubble ml-5 mb-2'}`}>
                                    <div className="flex items-end justify-between px-4 py-2">
                                        <span className="text-sm">{isNodeOwner ? 'Owner' : 'User'} {moment(post?.post_time).fromNow()}</span>
                                        <button onClick={() => openElipsis(post?.content, post?.id)}>. . .</button>
                                    </div>
                                    <div className="m-4 question-text">{post?.content}</div>
                                </div>
                            )
                        }
                    })}
                </div>
                <textarea
                    rows="4"
                    className={`shadow-lg w-5/6 rounded-xl md:w-auto px-4 py-4 mt-4 mb-4 text-sm bg-bkg border-1 text-text reply-textarea focus:ring-0 placeholder-text font-normal ${isDarkMode ? "dark" : "light"}`}
                    placeholder="Write a Reply..."
                    onChange={(event) => setReplyInput(event.target.value)}
                    value={replyInput}
                    required />
                <div className='mt-6 buttons-container'>
                    <button className={`mr-6 font-bold active:underline text-amber-950 ${isDarkMode ? "dark" : "light"}`}  onClick={(event) => handleReply(event, questionObject)}>Confirm</button>
                    <button className={`font-bold active:underline text-amber-950 ${isDarkMode ? "dark" : "light"}`} onClick={closeAddReply}>
                        Close
                    </button>
                </div>

            </div>
            <ElipsisModal
                elipsisOpen={elipsisOpen}
                elipsisClose={closeElipsis}
                contentToEdit={contentToEdit}
                postIdProp={postIdProp}
                handleDeleteButton={handleDeleteButton}
                handleReportButton={handleReportButton} />
        </div>
    );
};

export default OwnerReplyModal;
