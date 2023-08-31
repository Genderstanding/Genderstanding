import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './SettingsModal.css'

const SettingsModal = ({ settingsOpen, closeSettings, children }) => {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
                        <input style={{textAlign:"center"}} type='text' placeholder='enter code' className='ml-4' />
                        <button>☑️</button>
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