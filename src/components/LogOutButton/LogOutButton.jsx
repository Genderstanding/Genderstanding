import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {

  const dispatch = useDispatch();
  const styleClass = "text-sm underline self-end mr-2 mt-2 mb-6";
  const combineClasses = `${styleClass} ${props.className}`;

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={combineClasses}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
