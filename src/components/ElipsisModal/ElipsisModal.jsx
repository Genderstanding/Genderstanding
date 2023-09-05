import React, { useState, useEffect } from 'react';
import './ElipsisModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const ElipsisModal = ({ elipsisOpen, elipsisClose, contentToEdit, postIdProp, handleDeleteButton, handleReportButton }) => {
    const [editedContent, setEditedContent] = useState(contentToEdit);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    console.log('postIdProp in ElipsisModal:', postIdProp);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    // When entering edit mode, set the edited content to the current content
    if (!isEditing) {
      setEditedContent(contentToEdit);
    }
    };

    const handleSaveEdit = () => {
        // Handle saving edited content here
        // You can dispatch an action or perform the necessary logic
        // based on postIdProp and editedContent
        console.log('postIdProp in ElipsisModal:', postIdProp);
        console.log('editedContent in ElipsisModal:', editedContent);

        
        dispatch({
            type: 'EDIT_POST',
            payload: {
                id: postIdProp,
                content: editedContent,
                
            },
        });

        // After saving, exit edit mode
        setIsEditing(false);
    };

    useEffect(() => {
    // When contentToEdit changes, update the edited content if not in edit mode
    if (!isEditing) {
      setEditedContent(contentToEdit);
    }
  }, [contentToEdit, isEditing]);

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
                            <button className='underline m-2' onClick={handleSaveEdit}>
                                Save
                            </button>
                        ) : (
                            <>
                                <button className='underline m-2' onClick={handleEditToggle}>
                                    Edit
                                </button>
                                <button className='underline m-2' onClick={() => handleDeleteButton(postIdProp)}>
                                    Delete
                                </button>
                                <button className='underline m-2'>
                                    Remove User
                                </button>
                                <button className='underline m-2' onClick={() => handleReportButton(postIdProp)}>
                                    Report User
                                </button>
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
