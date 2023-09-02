import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import './SettingsModal.css'

const SettingsModal = ({ settingsOpen, closeSettings, children }) => {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [nodeCodeInput, setNodeCodeInput] = useState('')

    // Store to match against currently available codes
    const nodeAssociation = useSelector(store => store.nodeAssociationReducer.nodeAssociationDatabase)
    
    // importing dispatch
    const dispatch = useDispatch();
    // importing history
    const history = useHistory();

    if (!settingsOpen) {
        return null;
    }

    const openDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };


    //Delete logic...
    const handleDeleteAccount = () => {
  
        // Dispatch simply calls for whatever user is logged in to be deleted. 
        // Confirmation on front end will prevent accidental clicks
        try {
            closeSettings();
            dispatch({type: 'DELETE_USER'})
            history.push('/login')
        } catch(error) {
            console.log('Error in deleting account', error)
        }

    };

    const handleNodeCodeInput = (event, nodeCodeInput, nodeAssociation) => {
        event.preventDefault();
        // loop through all of the current nodeAssociations
        for(let node of nodeAssociation) {
            // look for the auth_code in the database and match it to the inputed code
            if(node?.auth_code == nodeCodeInput){
                // If there are no users already associated to the node with the inputed code, 
                // dispatch a database update to PUT the user's ID into the database as a user
                // who can view the node
                if(node?.user_id == null) {
                    dispatch({
                        type: 'USER_NODE_ASSOCIATION',
                        payload: nodeCodeInput
                    })
                }
            }
        }
    }

    return (
        <div className='modal-overlay'>
            <div className='mt-15 settings-modal'>
                {children}
                <div className="flex flex-col">
                    {/* onClick Link to login */}
                    {/* <button className="self-end mt-2 mb-6 mr-2 text-sm underline">Log Out</button> */}
                    <LogOutButton  onCloseSettings={closeSettings}  />
                </div>
                <div className='flex flex-col'>
                    <span className='mb-2'>Join Node</span>
                    <div>
                        <input 
                        style={{textAlign:"center"}} 
                        type='text' 
                        placeholder='enter code' 
                        className='ml-4' 
                        onChange={(event)=>setNodeCodeInput(event.target.value)}
                        />
                        <button
                        onClick={(event)=>handleNodeCodeInput(event, nodeCodeInput, nodeAssociation)}
                        >☑️</button>
                    </div><br />
                    <span className='mb-2'>Theme</span>
                    <div className="flex justify-between">
                        <button className='ml-20'>☼</button>
                        <button className='mr-20'>☾</button>
                    </div><br />
                    <div className="flex flex-col gap-2">
                        <button className="mt-2 underline ">Remove Node</button>
                        <button className="mt-2 underline" onClick={openDeleteConfirmation}>Delete Account</button>
                    </div><br />
                    <button className='mt-4 underline' onClick={closeSettings}>
                        Close
                    </button>

                    {showDeleteConfirmation && (
                        <div className=" delete-box">
                            <p className='mb-12'>Are you sure you want to delete your account?</p>
                            <button className="mt-2 mr-10 underline" onClick={handleDeleteAccount}>Confirm</button>
                            <button className="mt-2 underline" onClick={closeDeleteConfirmation}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;