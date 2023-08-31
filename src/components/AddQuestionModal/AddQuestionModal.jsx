import React from 'react';
import './AddQuestionModal.css'

const AddQuestionModal = ({ addQuestionOpen, closeAddQuestion, children }) => {
    if (!addQuestionOpen) {
        return null;
    }

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center ask-question-box'>
                {children}
                <h2 className='mb-4 mr-4 text-xl font-bold'>Ask a New Question</h2>
                    <textarea rows="4" className='w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 question-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' placeholder="Write a question..." required></textarea>
                    <div className='mt-6 buttons-container'>
                    <button className='mr-6 underline'>Confirm</button>
                    
                    <button className='underline ' onClick={closeAddQuestion}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
