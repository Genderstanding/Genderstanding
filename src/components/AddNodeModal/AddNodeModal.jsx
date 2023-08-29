import React from 'react';
import './AddNodeModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const AddNodeModal = ({ addUserOpen, closeAddUser, children }) => {
    if (!addUserOpen) {
        return null;
    }
    // sourcing dispatch to use calls
    const dispatch = useDispatch();
    // sourcing use history to push to new page
    const history = useHistory();
    // sourcing use selector to hold store information
    let listOfNodes = useSelector(store => store.nodeReducer.nodeDatabaseResponse)

    // state to hold text input
    const [nodeInput, setNodeInput ] = useState('');




    // function to handle adding a node to database
    const handleAddNode = (event) => {
        event.preventDefault();

        dispatch({
            type: 'CREATE_NODE',
            payload: 
            {name: nodeInput}
        })
        closeAddUser();
        history.push('/home')
    }

    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='add-node-modal flex flex-col justify-center items-center'>
                {children}
                <h2 className='text-xl font-bold mb-4 mr-4'>Create Community</h2>
                <input type='text' 
                placeholder='add name' 
                className='border-b border-black'
                onChange={(event) => setNodeInput(event.target.value)}
                />
                <div className='buttons-containter mt-6'>
                    <button className='underline mr-6' onClick={handleAddNode}>Confirm</button>
                    
                    <button className='underline ' onClick={closeAddUser}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNodeModal;
