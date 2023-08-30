import React from 'react';
import './AddQuestionModal.css'

const AddQuestionModal = ({ addQuestionOpen, closeAddQuestion, children }) => {
    if (!addQuestionOpen) {
        return null;
    }

    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='ask-question-box flex flex-col justify-center items-center'>
                {children}
                <h2 className='text-xl font-bold mb-4 mr-4'>Ask a New Question</h2>
                    <textarea rows="4" className='question-textarea w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' placeholder="Write a question..." required></textarea>
                    <div className='buttons-containter mt-6'>
                    <button className='underline mr-6'>Confirm</button>
                    
                    <button className='underline ' onClick={closeAddQuestion}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
