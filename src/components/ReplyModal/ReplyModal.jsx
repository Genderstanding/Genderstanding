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
                    reply_id: questionObject.id
                }
                })
        } catch (error) {
            console.log('Error in button click to create new reply: ', error)
        }

    }


    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center reply-box'>
                {/* {children} */}
                <h2 className='mb-4 mr-4 text-xl font-bold'>Thread</h2>
                <div className="m-4 question-text">
                    {questionObject.question}
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
                    className='w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 reply-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    placeholder="Write a Reply..." 
                    onChange={(event)=>setReplyInput(event.target.input)}
                    required>
                 </textarea>
                <div className='mt-6 buttons-container'>
                    <button className='mr-6 underline'>Confirm</button>

                    <button className='underline ' onClick={closeAddReply}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;