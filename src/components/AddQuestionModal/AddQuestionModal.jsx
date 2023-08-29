import React from 'react';
import './AddQuestionModal.css'

const AddQuestionModal = ({ addQuestionOpen, closeAddQuestion, children }) => {
    if (!addQuestionOpen) {
        return null;
    }

    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='add-node-modal flex flex-col justify-center items-center'>
                {children}
                <h2 className='text-xl font-bold mb-4 mr-4'>Ask a Question</h2>
                    <textarea></textarea>
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
