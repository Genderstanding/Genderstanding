import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  // sourcing dispatch to use calls
  const dispatch = useDispatch();
  // sourcing use selector to hold store information
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  const goToOwnerNodes = () => {
    history.push("/owner");
  };

  const goToUserNodes = () => {
    history.push("/usernodes");
  };

  return (
    <div className="flex flex-col h-screen userpage-container">
      <HeaderBar />

      <div className="flex flex-col justify-center userpage-boxes">
        <h2 className="mt-4 mb-1 ml-5">Communities you created:</h2>
        <div className="flex items-center justify-center mb-4 moderator-box">
          {/* map communities you moderate inside these divs*/}
          <div className="moderator-container" onClick={goToOwnerNodes}>
            <div className="m-4 owned-community-names">What's New?</div>
          </div>
        </div>

        <h2 className="mt-4 mb-1 ml-5">Communities you're a part of:</h2>
        <div className="flex items-center justify-center mb-4 part-of-box">
          {/* map communities you particpate in in this div*/}
          <div className="user-container" onClick={goToUserNodes}>
            <div className="m-4 user-community-names">Why not cheese?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
