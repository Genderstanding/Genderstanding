import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddNodeModal from '../AddNodeModal/AddNodeModal';
import SettingsModal from '../SettingsModal/SettingsModal';
import { useHistory } from 'react-router-dom';
import './UserPage.css'


function UserPage() {
  const [addNodeOpen, setaddNodeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  // sourcing dispatch to use calls
  const dispatch = useDispatch();
  // sourcing use selector to hold newest node store information
  let newNode = useSelector(store => store.newNodeReducer.newNodeDatabaseResponse)
  // sourcing use selector to hold all node store information
  let allNodes = useSelector(store => store.nodeReducer.nodeDatabaseResponse)

  console.log('nodes are in: ', allNodes);


  const openAddNode = () => {
    setaddNodeOpen(true);
  };

  const closeAddNode = () => {
    setaddNodeOpen(false);
  };

  const openSettings = () => {
    setSettingsOpen(true);
  }

  const closeSettings = () => {
    setSettingsOpen(false);
  }

  const goToOwnerNodes = (event, nodeId) => {
    event.preventDefault();
    dispatch({
      type: "FETCH_NEW_NODE",
      payload: nodeId
    })
    history.push('/owner');
  };

  const goToUserNodes = () => {
    history.push('/usernodes');
  };

  return (

    <div className="userpage-container flex flex-col h-screen">
      <div className='header-container flex items-center '>
        <MdChevronLeft size={25} className='ml-2' />
        {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
        <div className="flex-grow"></div>
        <button className="mr-4 text-2xl" onClick={openAddNode}>+</button>
      </div>

      <div className='userpage-boxes flex flex-col justify-center'>

        <h2 className='ml-5 mt-4 mb-1'>Communities you created:</h2>
        <div className='moderator-box flex items-center justify-center mb-4'>
          {/* map communities you moderate inside these divs*/}
          {allNodes.map(node => {
            return (
              <div className="moderator-container" onClick={(event)=>goToOwnerNodes(event, node?.id)}>
                <div className='owned-community-names m-4' key={node?.id}>
                  {node?.node_name}
                  {node?.id}
                </div>
              </div>
            )
          })}
          <div className="moderator-container" onClick={goToOwnerNodes}>
            <div className='owned-community-names m-4'>
              What's New?
            </div>
          </div>
        </div>

        <h2 className='ml-5 mt-4 mb-1'>Communities you're a part of:</h2>
        <div className='part-of-box flex items-center justify-center mb-4'>
          {/* map communities you particpate in in this div*/}
          <div className='user-container' onClick={goToUserNodes}>
            <div className='user-community-names m-4'>
              Why not cheese?
            </div>
          </div>
        </div>
      </div>



      <AddNodeModal addNodeOpen={addNodeOpen} addNodeClose={closeAddNode} />
      <SettingsModal settingsOpen={settingsOpen} closeSettings={closeSettings} />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
