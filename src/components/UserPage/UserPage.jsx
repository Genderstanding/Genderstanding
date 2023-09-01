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
  // sourcing use selector to hold newest node store information
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );
  // sourcing use selector to hold all node store information
  let allNodes = useSelector((store) => store.nodeReducer.nodeDatabaseResponse);

  console.log("nodes are in: ", allNodes);

  const openAddNode = () => {
    setaddNodeOpen(true);
  };

  const closeAddNode = () => {
    setaddNodeOpen(false);
  };

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const goToOwnerNodes = async (event, node) => {
    event.preventDefault();
    try {
      dispatch({
        type: "SET_NEW_NODE",
        payload: node,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      history.push("/owner");
    } catch (error) {
      console.log("Error in obtaining node information on userPage: ", error);
    }
  };

  const goToUserNodes = async (event, node) => {
    event.preventDefault();
    try {
      dispatch({
        type: "SET_NEW_NODE",
        payload: node,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      history.push("/usernodes");
    } catch (error) {
      console.log("Error in going to user node page: ", error);
    }
  };

  return (
    <>
   <div className="flex flex-col h-screen userpage-container">
<HeaderBar/>

      <div className="flex flex-col items-center justify-center userpage-boxes ">
        <h2 className="mt-4 mb-1 ml-5 ">Communities you created:</h2>
        <div className="flex flex-col items-center justify-center mb-4 owner-box ">
          {/* map communities you moderate inside these divs*/}
          {allNodes.map((node) => {
            if (user.id == node?.user_id) {
              return (
                <div
                  className="m-4 owner-container"
                  onClick={(event) => goToOwnerNodes(event, node)}
                >
                  <div className="m-4 owned-community-names" key={node?.id}>
                    {node?.node_name}
                    {node?.id}
                  </div>
                </div>
              );
            }
          })}
          <div className="m-4 owner-container" onClick={goToOwnerNodes}>
            <div className="m-4 owned-community-names">(test data) What's New?</div>
          </div>
        </div>

        <h2 className="mt-4 mb-1 ml-5">Communities you're a part of:</h2>
        <div className="flex flex-col items-center justify-center mb-4 part-of-box">
           {/* map communities you particpate in in this div*/}
           {allNodes.map((node) => {
            if (user?.id !== node?.user_id) {
              return (
                <div
                  className="m-4 user-container overflow-y-scroll ..."
                  onClick={(event) => goToUserNodes(event, node)}
                >
                  <div className="m-4 owned-community-names" key={node?.id}>
                    {node?.node_name}
                    {node?.id}
                  </div>
                </div>
              );
            }
          })}
          {/* TEST DATA */}
        <div className="m-4 user-container" onClick={goToUserNodes}>
        <div className="m-4 notowned-community-names">(test data) Not Much, You?</div> </div>    
        </div>
      </div>
    </div>
    </>
  );
}

export default UserPage;
