import React from 'react';
import './AddNodeModal.css'

const AddNodeModal = ({ addNodeOpen, addNodeClose, children }) => {
    if (!addNodeOpen) {
        return null;
    }

    return (
        <div className='modal-overlay flex justify-center items-center'>
            <div className='add-node-modal flex flex-col justify-center items-center'>
                {children}
                <h2 className='text-xl font-bold mb-4 mr-4'>Create Community</h2>
                <input type='text' placeholder='add name' className='border-b border-black'/>
                <div className='buttons-containter mt-6'>
                    <button className='underline mr-6'>Confirm</button>
                    
                    <button className='underline ' onClick={addNodeClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNodeModal;
