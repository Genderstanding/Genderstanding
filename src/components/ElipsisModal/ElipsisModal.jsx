import React, { useState, useEffect } from 'react';
import './ElipsisModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const ElipsisModal = ({ elipsisOpen, elipsisClose, contentToEdit, postIdProp, handleDeleteButton, handleReportButton }) => {
    const [editedContent, setEditedContent] = useState(contentToEdit);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    // When entering edit mode, set the edited content to the current content
    if (!isEditing) {
      setEditedContent(contentToEdit);
    }
    };

    console.log('post idProp is going to be: ', postIdProp)


    const handleSaveEdit = (event) => {
        event.preventDefault();
        try {
            dispatch({
                type: 'EDIT_POST',
                payload: {
                    id: postIdProp,
                    content: editedContent
                }
            });
        } catch (error) {
            console.log('Error in editing a post: ', error);
        }

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
                                <button className='underline m-2' onClick={(event)=>handleEditToggle(event, postIdProp)}>
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
