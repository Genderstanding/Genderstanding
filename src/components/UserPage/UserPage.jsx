import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";
import { useEffect } from "react";
import OwnerNodes from "../OwnerNodes/OwnerNodes";

function UserPage({ isDarkMode }) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      history.push("/owner");
    } catch (error) {
    }
  };

  const goToUserNodes = async (event, node) => {
    event.preventDefault();
    try {
      dispatch({
        type: "SET_NEW_NODE",
        payload: node,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      history.push("/usernodes");
    } catch (error) {
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: 'FETCH_LIKES'})
  }, []);

  return (
    <>
      <div className="flex flex-col App">
        <HeaderBar />
        {/* items-center removed */}
        <div className="flex flex-col justify-center userpage-container">
          <div className="mb-24 communities-container">
            <h1 className="mt-4 mb-1 ml-10 text-2xl font-bold font-mulish">
              Created Communities
            </h1>
            <div className="flex flex-col items-center justify-center mb-4 owner-box ">
              {/* map communities you created inside this div*/}
              {allNodes.map((node) => {
                if (user.id == node?.user_id) {
                  return (
                    <div
                      key={node?.id}
                      className={`m-4 owner-container flex flex-col justify-center items-center bg-ownerContent text-amber-950 ${
                        isDarkMode ? "light" : "dark"
                      }`}
                      onClick={(event) => goToOwnerNodes(event, node)}
                    >
                      <div className="m-4 text-xl font-bold text-center capitalize text-amber-950 owned-community-names">
                        <span className="text-xl font-bold owned-community-names">
                          {node?.node_name}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <h1 className="mt-4 mb-1 ml-10 text-2xl font-bold font-mulish">
              Joined Communities 
            </h1>
            <div className="flex flex-col items-center justify-center mb-4 part-of-box">
              {/* map communities you participate inside this div*/}
              {allNodes.map((node) => {
                if (user?.id !== node?.user_id) {
                  return (
                    <div
                      key={node?.id}
                      className={`capitalize m-4 user-container flex flex-col justify-center items-center overflow-y-scroll ... bg-userContent text-amber-950 ${
                        isDarkMode ? "light" : "dark"
                      }`}
                      onClick={(event) => goToUserNodes(event, node)}
                    >
                      <div className="text-xl font-bold text-center truncate w-52 owned-community-names">
                        <span>{node?.node_name}</span>
                        <div className="ml-2"></div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
