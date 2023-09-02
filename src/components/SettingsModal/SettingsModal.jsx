import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './SettingsModal.css'
import { useSelector, useDispatch } from "react-redux";

const SettingsModal = ({ settingsOpen, closeSettings, children }) => {
const dispatch = useDispatch();
    const [codeInput, setCodeInput] = useState('')
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const enterInviteCode = useSelector(store => store.enterInviteCodeReducer)

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
        closeSettings();
    };

    // handle code input
    const handleInviteCode = (e, codeInput) => {
        e.preventDefault()
        try {
             dispatch({type:"ENTER_INVITE_CODE", payload: codeInput})
        } catch (error) {
            dispatch({
                type: "ENTER_INVITE_CODE_ERROR",
                payload: "Invalid invite code input",
              });
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
                        <input style={{textAlign:"center"}} type='text' placeholder='enter code' className='ml-4' value={codeInput} onChange={(e) => setCodeInput(e.target.value)} />
                        <button onClick={handleInviteCode}>☑️</button>
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