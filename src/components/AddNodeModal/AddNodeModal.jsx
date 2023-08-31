import React from 'react';
import './AddNodeModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const AddNodeModal = ({ addNodeOpen, addNodeClose, children }) => {
    if (!addNodeOpen) {
        return null;
    }
    // sourcing dispatch to use calls
    const dispatch = useDispatch();
    // sourcing use history to push to new page
    const history = useHistory();
    // sourcing use selector to hold store information
    let newNode = useSelector(store => store.newNodeReducer.newNodeDatabaseResponse)

    // state to hold text input
    const [nodeInput, setNodeInput ] = useState('');




    // function to handle adding a node to database
    const handleAddNode = (event) => {
        event.preventDefault();
    try {
        dispatch({type: 'CREATE_NODE', payload: {name: nodeInput}})
        history.push(`/owner`)
 } catch (error) {
    console.log('Error in button click to create new node: ', error)
 }
    
}

    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center add-node-modal'>
                {children}
                <h2 className='mb-4 mr-4 text-xl font-bold'>Create Community</h2>
                <input type='text' 
                placeholder='add name' 
                className='border-b border-black'
                onChange={(event) => setNodeInput(event.target.value)}
                />
                <div className='mt-6 buttons-container'>
                    <button className='mr-6 underline' onClick={handleAddNode}>Confirm</button>
                    
                    <button className='underline ' onClick={addNodeClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNodeModal;
