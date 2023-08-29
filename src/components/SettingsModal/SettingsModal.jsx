import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './SettingsModal.css'
import LogOutButton from '../LogOutButton/LogOutButton';

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
            <div className='settings-modal'>
                {children}
                <div className="flex flex-col">
                    {/* onClick Link to login */}
                    {/* <button className="self-end mt-2 mb-6 mr-2 text-sm underline">Log Out</button> */}
                    <LogOutButton />
                </div>
                <div className='flex flex-col'>
                    <span className='mb-2'>Join Node</span>
                    <div>
                        <input type='text' placeholder='enter code' className='mr-2' />
                        <button>☑️</button>
                    </div><br />
                    <span className='mb-2'>Theme</span>
                    <div className="flex justify-between">
                        <button className='ml-10'>☼</button>
                        <button className='mr-10'>☾</button>
                    </div><br />
                    <div className="flex flex-col gap-2">
                        <button className="underline">Remove Node</button>
                        <button className="underline" onClick={openDeleteConfirmation}>Delete Account</button>
                    </div><br />
                    <button className='mt-6 underline' onClick={closeSettings}>
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