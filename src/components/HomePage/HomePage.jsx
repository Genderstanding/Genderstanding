import React, { useState } from 'react';
import './HomePage.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { IoMdHome } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';




import AddNodeModal from '../AddNodeModal';
import SettingsModal from '../SettingsModal';


function HomePage() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    <div className="HomePage flex flex-col h-screen">
      <div className='header-container flex items-center '>
        <MdChevronLeft size={25} className='ml-2'/>
        {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
        <div className="flex-grow"></div>
        <button className="mr-4 text-2xl" onClick={openAddUser}>+</button>
      </div>



      <div className='content-container flex-grow'>
        <div className='communities-container mt-4'>
          <h2>Communities</h2>
          <h4>View your nodes</h4>
          <div className='relative flex items-center'>
            {/* useHistory back button */}
            <MdChevronLeft size={35} />
            <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth'>
              {/* this will map links to the nodes instead */}
              {data.map(item => (
                <div key={item.id} className={item.className}></div>
              ))}
            </div>
            <MdChevronRight size={35} />
          </div>
        </div>

        <div className='featured-container mt-4'>
          <h2>Featured</h2>
          <h4>View community nodes</h4>
          <div className='featured-buttons ml-8 mt-2'>
            <button className='underline mr-4'>Trending</button>
            <button className='underline mr-4'>Latest</button>
            <button className='underline mr-4'>Popular</button>
          </div>
          <div className='featured-nodes-homepage flex flex-col items-center'>
            <div className='featured-top'>

            </div>
            <div className='featured-bottom'>

            </div>
          </div>
        </div>
      </div>


      <AddNodeModal addUserOpen={addUserOpen} closeAddUser={closeAddUser} />
      <SettingsModal settingsOpen={settingsOpen} closeSettings={closeSettings} />
    </div>
  );
}

export default HomePage;
