import React, { useState, useEffect } from "react";
import "./ElipsisModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment, { now } from 'moment'
import { min } from "moment/moment";

const ElipsisModal = ({
    elipsisOpen,
    elipsisClose,
  contentToEdit,
  postIdProp,
  userIdProp,
  nodeOwnerIdProp,
  handleReportButton,
  handleDeleteButton
}) => {
  const [editedContent, setEditedContent] = useState(contentToEdit.content);
  const [isEditing, setIsEditing] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [showRemove, setShowRemove] = useState(true);

  const postDate = moment(contentToEdit.post_time);
  const currentDate = moment();
  const minutesElapsed = currentDate.diff(postDate, 'minutes');

  const dispatch = useDispatch();
 
  const user = useSelector((state) => state.user);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // When entering edit mode, set the edited content to the current content
    if (!isEditing) {
      setEditedContent(contentToEdit);
    }
  };

  // Function to edit a comment and update the inputed information
  const handleSaveEdit = (event) => {
    event.preventDefault();
    try {
      dispatch({
        type: "EDIT_POST",
        payload: {
          id: postIdProp,
          content: editedContent,
        },
      });
      
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save edit", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

    //delete button render logic
    useEffect(()=> {
        if(userIdProp === user.id){
            setShowDelete(true);
        } else {
            setShowDelete(false);
        }
    }, [userIdProp, user.id])

    //remove button render logic
    useEffect(()=> {
        if(nodeOwnerIdProp === user.id){
            setShowRemove(true);
        } else {
            setShowRemove(false);
        }
    }, [nodeOwnerIdProp, user.id])

  // function to remove a user from the give node
  const handleRemoveUser = (contentToEdit) => {
    dispatch({
        type: 'REMOVE_NODE_ASSOCIATION',
        payload: {
            user: editedContent.user_id,
            node: editedContent.node_id
        }
    })
  }


  useEffect(() => {
    // When contentToEdit changes, update the edited content if not in edit mode
    if (!isEditing) {
      setEditedContent(contentToEdit);
    }
  }, [contentToEdit, isEditing]);

  //edit button render logic
  useEffect(()=> {
    if(minutesElapsed < 60 && userIdProp === user.id){
        setShowEdit(true);
    } else {
        setShowEdit(false);
    }
  }, [minutesElapsed, userIdProp, user.id])

  if (!elipsisOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center modal-overlay">
      <div className="flex flex-col items-center justify-center ellipsis-node-modal">
        {/* {children} */}
        <div className="flex flex-col justify-start buttons-container text-amber-950">
          {isEditing ? (
            <textarea
              value={editedContent.content}
              onChange={(e) => setEditedContent(e.target.value)}
              className="edit-textarea"
            />
          ) : null}

          <div className="flex flex-col justify-start buttons-container">
            {isEditing ? (
              <button
                className="m-2 font-bold active:underline text-amber-950"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            ) : (
              <>
                {showEdit && (<button
                  className="m-2 font-bold active:underline text-amber-950"
                  onClick={handleEditToggle}
                >
                  Edit
                </button>
                )}
                {showDelete &&(
                <button
                  className="m-2 font-bold active:underline text-amber-950"
                  onClick={() => handleDeleteButton(postIdProp)}
                >
                  Delete
                </button>
                )}
                {showRemove && (
                <button 
                    className="m-2 font-bold active:underline text-amber-950"
                    onClick={()=>handleRemoveUser(postIdProp)}
                >
                  Remove User
                </button>
                )}
                <button
                  className="m-2 font-bold active:underline text-amber-950"
                  onClick={() => handleReportButton(postIdProp)}
                >
                  Report User
                </button>
              </>
            )}
            <button
              className="m-2 font-bold active:underline text-amber-950"
              onClick={elipsisClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElipsisModal;
