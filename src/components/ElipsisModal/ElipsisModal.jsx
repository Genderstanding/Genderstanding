import React, { useState } from 'react';
import './ElipsisModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const ElipsisModal = ({ elipsisOpen, elipsisClose, contentToEdit, handleSaveEdit }) => {
    const [editedContent, setEditedContent] = useState(contentToEdit);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        handleSaveEdit(editedContent); // Call the parent's handleSaveEdit function
        setIsEditing(false);
    };

    if (!elipsisOpen) {
        return null;
    }


    return (
        <div className='flex items-center justify-center modal-overlay'>
            <div className='flex flex-col items-center justify-center add-node-modal'>
                {/* {children} */}
                <div className=' flex flex-col justify-start buttons-container'>
                    {isEditing ? (
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className='edit-textarea'
                        />
                    ) : null}

                    <div className='flex flex-col justify-start buttons-container'>
                        {isEditing ? (
                            <button className='underline m-2' onClick={handleSave}>
                                Save
                            </button>
                        ) : (
                            <>
                                <button className='underline m-2' onClick={handleEditToggle}>
                                    Edit
                                </button>
                                <button className='underline m-2'>Delete</button>
                                <button className='underline m-2'>Remove User</button>
                                <button className='underline m-2'>Report User</button>
                            </>
                        )}
                        <button className='underline m-2' onClick={elipsisClose}>
                            Close
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            );
};

export default ElipsisModal;
