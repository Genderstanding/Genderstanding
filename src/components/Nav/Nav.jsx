import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SettingsModal from '../SettingsModal/SettingsModal';
import { IoMdHome } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

export default function Nav() {
  const user = useSelector((store) => store.user);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => {
    setSettingsOpen(true);
  }

  const closeSettings = () => {
    setSettingsOpen(false);
  }

  return (

    <div className='footer-container flex'>
  
      <Link to="/home">
        {/* <h2 className="nav-title">Prime Solo Project</h2> */}
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}


 </div>
    

 

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
           <Link className="navLink" to="/home">
           {/* Link this to home page */}
          <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">
          <IoMdHome size={32} />
           
            <span>Home</span>
        
            </button>
    </Link>


   {/* Link this to UserPage */}
   <Link className="navLink" to="/user">
    <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">  
            <FaUser size={22} />
            <span>Me</span>       
            </button>
            </Link>

    {/* Link this to the Community page */}
    <Link className="navLink" to="/community">
    <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow">
      <BiGroup size={32} />
      <span>Community</span>
    </button>
</Link>

 {/* Link this to the Setting page */}
 <Link className="navLink" to="/setting">
    <button className="flex flex-col items-center justify-center px-4 py-2 flex-grow" onClick={openSettings}>
      <FiSettings size={32} />
      <span>Settings</span>
    </button>
    <SettingsModal settingsOpen={settingsOpen} closeSettings={closeSettings} />
    </Link>

 
            {/* <LogOutButton className="navLink" /> */}
            </>
             )}  

        <Link className="navLink" to="/about">
          About
        </Link>
 
</div>
  )
}
