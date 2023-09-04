import React, { useState } from 'react';
import './OwnerReplyModal.css'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ElipsisModal from '../ElipsisModal/ElipsisModal';



const OwnerReplyModal = ({ addReplyOpen, closeAddReply, questionObject }) => {
    if (!addReplyOpen) {
        return null;
    }
    const dispatch = useDispatch();
    let nodePosts = useSelector(store => store.postReducer.postDatabaseResponse)
    let nodeData = useSelector(store => store.nodeReducer.nodeDatabaseResponse);
    console.log("nodeData=", nodeData)
    console.log("nodePosts=", nodePosts)


    const reversePosts = nodePosts.slice().reverse();

    // Creating a state to hold text inputed
    const [replyInput, setReplyInput] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [elipsisOpen, setElipsisOpen] = useState(false);
    const [contentToEdit, setContentToEdit] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [addReplys, setAddReplys] = useState(0);

    
      const openElipsis = (content) => {
        console.log('openElipsis clicked, content is:', content)
        setElipsisOpen(true);
        setContentToEdit(content);
      };
    
      const closeElipsis = () => {
        setElipsisOpen(false);
      };
    
    //   const handleSaveEdit = (editedContent) => {
    //     // dispatch an action to update for reals
    //     // updating content directly in the state
    //     setContentToEdit(editedContent);
    //   };

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
        } catch (error) {
            console.log('Error in button click to create new reply: ', error)
        }

    }

    
    const handleSaveEdit = () => {

        console.log('Content To Edit:', contentToEdit);
        console.log('Edited Content:', editedContent); 
        
        if (editedContent !== contentToEdit) {
          try {
            dispatch({
              type: 'EDIT_POST', 
              payload: {
                id: nodePosts.id,
                content: editedContent,
              },
            });
          } catch (error) {
            console.log('Error in button click to edit post: ', error);
          }
        }
        setContentToEdit(editedContent);
        setIsEditing(false);
      };

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center reply-box'>
                {/* {children} */}
                <h2 className='mb-4 mr-4 mt-6 text-xl font-bold'>{questionObject.content}</h2>
                <div className="scrollable-container overflow-y-auto">
                    {reversePosts.map((post) => {
                        if (post?.reply_id == questionObject.id) {
                            const matchingNode = nodeData.find(node => node.id === post.node_id);
                            const isNodeOwner = matchingNode ? post.user_id === matchingNode.user_id : false;
                            return (
                                <div key={post.id} className={`mt-4 ${isNodeOwner ? 'owner-text-bubble mr-5' : 'user-text-bubble ml-5'}`}>
                                    <div className="flex items-end justify-between px-4 py-2">
                                        <span className="text-sm">{isNodeOwner ? 'Owner' : 'User'} {moment(post?.post_time).fromNow()}</span>
                                        <button onClick={() => openElipsis(post?.content)}>. . .</button>
                                    </div>
                                    <div className="m-4 question-text">{post?.content}</div>
                                </div>
                            )
                        }
                    })}
                </div>
                <textarea
                    rows="4"
                    className='w-full px-4 py-2 mt-4 text-sm text-gray-900 bg-white border-0 reply-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    placeholder="Write a Reply..."
                    onChange={(event) => setReplyInput(event.target.value)}
                    value={replyInput}
                    required />
                <div className='mt-6 buttons-container'>
                    <button className='mr-6 underline' onClick={(event) => handleReply(event, questionObject)}>Confirm</button>
                    <button className='underline ' onClick={closeAddReply}>
                        Close
                    </button>
                </div>
                
            </div>
            <ElipsisModal
                elipsisOpen={elipsisOpen}
                elipsisClose={closeElipsis}
                contentToEdit={contentToEdit}
                handleSaveEdit={handleSaveEdit} />
        </div>
    );
};

export default OwnerReplyModal;