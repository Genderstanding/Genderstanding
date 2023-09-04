import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CardActionArea } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import HeaderBar from "../HeaderBar/HeaderBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HomePage({isDarkMode}) {
// holds user infos
  const user = useSelector((store) => store.user);

  // store that holds all of nodes
  let listOfNodes = useSelector(
    (store) => store.nodeReducer.nodeDatabaseResponse
  );

  const [nodeId, setNodeId] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  let yourContent;
  const checkUserId = (node) => {
    if (node.user_id == user.id) {
      yourContent = <AccountCircleIcon />;
    } else if (node.user_id !== user.id)  {
      yourContent = "";
    }
    return yourContent;
  };

  const handleGoToNode = (node) => {
    setNodeId(node.id);
    if (node.user_id === user.id) {
      dispatch({
        type: "SET_NEW_NODE",
        payload: node,
      });
      history.push("/owner");
    } else {
      dispatch({
        type: "SET_NEW_NODE",
        payload: node,
      });
      history.push("/usernodes");
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: "FETCH_NODE_ASSOCIATION" })
    dispatch({ type: 'FETCH_CURRENT_NODE'});
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderBar />
        <div className="flex-grow content-container">
          <div className="mt-4 communities-container">
            <h1 className="text-2xl font-bold font-mulish">Communities</h1>
            <h3>View your nodes</h3>
            <div className="flex items-center">
              {/* useHistory back button */}
              <MdChevronLeft size={35} />
              <div
                id="slider"
                className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"
              >
                {/* Here is the div where we MAP ya'll */}
                {listOfNodes.map((node) => {
                  return (
                    <div
                    onClick={() => handleGoToNode(node)}
                    className={`duration-300 ease-in-out side-scroll-box hover:scale-105 text-neutral-950 bg-red-50 ${isDarkMode ? 'dark' : 'light'}`}
                    key={node.id}
                    >
                      {checkUserId(node)}
                      <br />
                      {node.node_name}
                    </div>
                  );
                })}
              </div>
              <MdChevronRight size={35} />
            </div>
          </div>

          <div className="mt-4 featured-container">
            <h1 className="text-2xl font-bold font-mulish">Featured</h1>
            <h3>View community nodes</h3>
            <div className="mt-3 ml-6 featured-buttons">
            <button className={`pt-3 pb-3 pl-3 pr-4 mb-4 mr-4 font-semibold shadow-lg  active:underline text-neutral-50 rounded-2xl bg-primary shadow-black-200 ${isDarkMode ? 'dark' : 'light'}`}>Trending</button>
              <button className={`pt-3 pb-3 pl-5 pr-5 mb-4 ml-4 mr-4 font-semibold active:underline text-neutral-50 shadow-lg rounded-2xl bg-primary shadow-black-200 ${isDarkMode ? 'dark' : 'light'}`}>Latest</button>
              <button className={`pt-3 pb-3 pl-4 pr-4 mb-4 ml-4 mr-4 font-semibold active:underline text-neutral-50 shadow-lg rounded-2xl bg-primary shadow-black-200 ${isDarkMode ? 'dark' : 'light'}`}>Popular</button>
              </div>
            <div className="flex flex-col items-center featured-nodes-homepage">
              <div className={`font-medium text-md featured-top font-mulish text-neutral-950 bg-userContent/100 ${isDarkMode ? 'dark' : 'light'}`}>Featured Spotlight text 1</div>
              <div className={`font-medium text-md featured-top font-mulish text-neutral-950 bg-userContent/100 ${isDarkMode ? 'dark' : 'light'}`}>Featured Spotlight text 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


