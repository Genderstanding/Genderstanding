import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// This holds logout button
function LogOutButton(props) {
const history = useHistory();
  const dispatch = useDispatch();
  const styleClass = "text-md font-bold active:underline self-end mr-2 mt-2 mb-6";
  const combineClasses = `${styleClass} ${props.className}`;

  // handles logout functionality 
  const handleLogout = ()=> {
    dispatch({ type: 'LOGOUT' })
    // direct to login page
    history.push('/login')
    // close setting modal
    props.onCloseSettings();
      // LOGOUT
  }
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={combineClasses}
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
