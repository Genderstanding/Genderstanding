import React, {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddNodeModal from '../AddNodeModal/AddNodeModal';
import SettingsModal from '../SettingsModal/SettingsModal';


function UserPage() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const openAddUser = () => {
    setAddUserOpen(true);
};

  const closeAddUser = () => {
    setAddUserOpen(false);
  };

  const openSettings = () => {
    setSettingsOpen(true);
  }

  const closeSettings = () => {
    setSettingsOpen(false);
  }
  return (
    <div className="user-container flex flex-col h-screen">
      <div className='header-container flex items-center '>
        <MdChevronLeft size={25} className='ml-2' />
        {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
        <div className="flex-grow"></div>
        <button className="mr-4 text-2xl" onClick={openAddUser}>+</button>
      </div>

      <h2>Communities you created:</h2>
      {/* map communities you moderate iside this div*/}
      <div className='moderator-container'>

      </div>

      <h2>Communities you're a part of:</h2>
      {/* map communities you particpate in in this div*/}
      <div className='user-container'>

      </div>

      <AddNodeModal addUserOpen={addUserOpen} closeAddUser={closeAddUser} />
      <SettingsModal settingsOpen={settingsOpen} closeSettings={closeSettings} />
    </div>   
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
