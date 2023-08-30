import React, { useState } from 'react';
import './ReplyModal.css'
import { useSelector, useDispatch} from 'react-redux';


const ReplyModal = ({ addReplyOpen, closeAddReply, questionObject }) => {
    if (!addReplyOpen) {
        return null;
    }
    const dispatch = useDispatch();
    let nodePosts = useSelector(store => store.postReducer.postDatabaseResponse)

    // Creating a state to hold text inputed
    const [replyInput, setReplyInput] = useState('');

    const handleReply = (event, questionObject) => {
        event.preventDefault();
        try{
            dispatch({ 
                type: 'CREATE_REPLY', 
                payload: {
                    content: replyInput,
                    reply_id: questionObject.id,
                    orig_post: false
                }
                })
        } catch (error) {
            console.log('Error in button click to create new reply: ', error)
        }

    }


    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='reply-box flex flex-col justify-center items-center'>
                {/* {children} */}
                <h2 className='text-xl font-bold mb-4 mr-4'>Thread</h2>
                <div className="question-text m-4">
                    {questionObject.content}
                </div>
                {nodePosts.map(post => {
                    if (post.reply_id == questionObject.id) {
                        return (
                            <div className="question-text m-4">
                                {post.content}
                            </div>
                        )
                    }
                })}

                <textarea
                    rows="4"
                    className='reply-textarea w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    placeholder="Write a Reply..." 
                    onChange={(event)=>setReplyInput(event.target.value)}
                    required>
                    
                </textarea>
                <div className='buttons-containter mt-6'>
                    <button className='underline mr-6' onClick={handleReply}>Confirm</button>

                    <button className='underline ' onClick={closeAddReply}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;