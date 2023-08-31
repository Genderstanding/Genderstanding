import React from 'react';
import './ReplyModal.css'

const ReplyModal = ({ addReplyOpen, closeAddReply, questionObject }) => {
    if (!addReplyOpen) {
        return null;
    }

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center reply-box'>
                {/* {children} */}
                <h2 className='mb-4 mr-4 text-xl font-bold'>Thread</h2>
                <div className="m-4 question-text">
                    {questionObject.question}
                </div>
                <textarea
                    rows="4"
                    className='w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 reply-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    placeholder="Write a Reply..." required>
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