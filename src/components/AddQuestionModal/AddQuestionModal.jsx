import React from 'react';
import './AddQuestionModal.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const AddQuestionModal = ({ addQuestionOpen, closeAddQuestion, children }) => {
    if (!addQuestionOpen) {
        return null;
    }

    // State to hold text input
    const [questionInput, setQuestionInput] = useState('');

    // Sourcing dispatch
    const dispatch = useDispatch();

    let currentNode = useSelector(store => store.newNodeReducer.newNodeDatabaseResponse)


    console.log('Current node contents is: ', currentNode)

    const handleSubmitQuestion = (event) => {
        event.preventDefault();
        try {
            dispatch({ 
                type: 'CREATE_POST',
                payload: {
                    content: questionInput,
                    node_id: currentNode.id,
                    orig_post: false,
                }
            })
            closeAddQuestion();
        } catch(error) {
            console.log('Error in creating a question: ', error)
        }
        setQuestionInput('')
    }

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center ask-question-box'>
                {children}
                <h2 className='mb-4 mr-4 text-xl font-bold'>Ask a New Question</h2>
                    <textarea rows="4" 
                    className='w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 question-textarea dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' 
                    placeholder="Write a question..." 
                    onChange={(event)=>setQuestionInput(event.target.value)}
                    required
                    ></textarea>
                    <div className='mt-6 buttons-container'>
                    <button className='mr-6 underline' onClick={handleSubmitQuestion}>Confirm</button>
                    
                    <button className='underline ' onClick={closeAddQuestion}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
