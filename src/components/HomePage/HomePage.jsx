import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CardActionArea } from "@mui/material";


import HeaderBar from "../HeaderBar/HeaderBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HomePage() {
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
      yourContent = "Created node: ";
    } else if (node.user_id !== user.id)  {
      yourContent = "Joined node: ";
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
            <h2>Communities</h2>
            <h4>View your nodes</h4>
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
                    className="duration-300 ease-in-out side-scroll-box hover:scale-105"
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
            <h2>Featured</h2>
            <h4>View community nodes</h4>
            <div className="mt-2 ml-8 featured-buttons">
              <button className="mr-4 underline">Trending</button>
              <button className="mr-4 underline">Latest</button>
              <button className="mr-4 underline">Popular</button>
            </div>
            <div className="flex flex-col items-center featured-nodes-homepage">
              <div className="featured-top">Featured Spotlight text 1</div>
              <div className="featured-bottom">Featured Spotlight text 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
