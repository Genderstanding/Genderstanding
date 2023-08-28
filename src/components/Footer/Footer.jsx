import React, { useState } from 'react';
import SettingsModal from '../SettingsModal/SettingsModal';
import { IoMdHome } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => {
    setSettingsOpen(true);
  }

  const closeSettings = () => {
    setSettingsOpen(false);
  }

  return (
    <>
    <div className='footer-container flex'>

        {/* Link this to home page */}
        <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">
          <IoMdHome size={32} />
          <span>Home</span>
        </button>

        {/* Link this to My Nodes page */}
        <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">
          <FaUser size={22} />
          <span>Me</span>
        </button>

        {/* Link this to the featured page */}
        <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">
          <BiGroup size={32} />
          <span>Community</span>
        </button>

        <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow" onClick={openSettings}>
          <FiSettings size={32} />
          <span>Settings</span>
        </button>
      </div>
      <SettingsModal settingsOpen={settingsOpen} closeSettings={closeSettings} />
      </>
  );
}

export default Footer;
