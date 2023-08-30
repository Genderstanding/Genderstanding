import React from 'react';
import './ReplyModal.css'

const ReplyModal = ({ addReplyOpen, closeAddReply, questionObject }) => {
    if (!addReplyOpen) {
        return null;
    }

    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='reply-box flex flex-col justify-center items-center'>
                {/* {children} */}
                <h2 className='text-xl font-bold mb-4 mr-4'>Thread</h2>
                <div className="question-text m-4">
                    {questionObject.question}
                </div>
                <textarea
                    rows="4"
                    className='reply-textarea w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    placeholder="Write a Reply..." required>
                 </textarea>
                <div className='buttons-containter mt-6'>
                    <button className='underline mr-6'>Confirm</button>

                    <button className='underline ' onClick={closeAddReply}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;