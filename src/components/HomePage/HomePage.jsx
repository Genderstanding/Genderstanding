import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CardActionArea, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

import HeaderBar from "../HeaderBar/HeaderBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HomePage({ isDarkMode }) {
  // store user infos
  const user = useSelector((store) => store.user);
  // store public posts
  const publicPosts = useSelector(
    (store) => store.postReducer.publicDatabaseResponse
  );
  // store all nodes
  let listOfNodes = useSelector(
    (store) => store.nodeReducer.nodeDatabaseResponse
  );

  const [nodeId, setNodeId] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  let yourContent;
  const checkUserId = (node) => {
    if (node.user_id == user.id) {
      yourContent = <AccountCircleIcon style={{ marginTop: "-20px" }} />;
    } else if (node.user_id !== user.id) {
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
    dispatch({ type: "FETCH_NODE_ASSOCIATION" });
    dispatch({ type: "FETCH_CURRENT_NODE" });
    dispatch({ type: "FETCH_PUBLIC_POSTS" });
  }, []);

  const handleGoToFeatured = () => {
    history.push("/featured");
  };

  return (
    <>
      <div className="flex flex-col App font-mulish">
        <HeaderBar />
        <div className="flex-grow content-container">
          <div className="mt-4 communities-container">
            <h1 className="text-2xl font-bold mx-7 font-mulish">Communities</h1>
            <h3 className="mx-7" >View your communities</h3>
            <div className="flex items-center">
              {/* useHistory back button */}
              <MdChevronLeft size={35} className={`text-secondary  ${isDarkMode ? "light" : "dark"}`} />
              <div
                id="slider"
                className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"
              >
                {/* Here is the div where we MAP ya'll */}
                {listOfNodes.map((node) => {
                  return (
                    <div
                      onClick={() => handleGoToNode(node)}
                      className={` duration-300 ease-in-out side-scroll-box hover:scale-105 text-neutral-950 bg-red-50 ${
                        isDarkMode ? "light" : "dark"
                      }`}
                      key={node.id}
                    >
                      {checkUserId(node)}
                      <br />
                     <span className="truncate w-52">{node.node_name}</span> 
                      <div className="pt-2 text-xs font-bold text-primary active:underline">View community <span className="pt-2 text-xs text-primary"> </span></div> 
                     
                    </div>
                  );
                })}
              </div>
              <MdChevronRight size={35} className={`text-secondary  ${isDarkMode ? "light" : "dark"}`}/>
            </div>
          </div>

          <div className="mt-4 featured-container">
            <h1 className="text-2xl font-bold mx-7 font-mulish">Featured</h1>
            <h3 className="mx-7">  View featured posts</h3>
            <div className="mt-3 ml-6 featured-buttons">
              <button
                className={`pt-3 pb-3 pl-3 pr-4 mb-4 mr-4 font-semibold shadow-md  active:underline text-neutral-50 rounded-2xl bg-primary shadow-black-100 ${
                  isDarkMode ? "light" : "dark"
                }`}
              >
                Trending
              </button>
              <button
                className={`pt-3 pb-3 pl-5 pr-5 mb-4 ml-4 mr-4 font-semibold active:underline text-neutral-50 shadow-md rounded-2xl bg-primary shadow-black-100 ${
                  isDarkMode ? "light" : "dark"
                }`}
              >
                Latest
              </button>
              <button
                className={`pt-3 pb-3 pl-4 pr-4 mb-4 ml-4 mr-4 font-semibold active:underline text-neutral-50 shadow-md rounded-2xl bg-primary shadow-black-100 ${
                  isDarkMode ? "light" : "dark"
                }`}
              >
                Popular
              </button>
            </div>
            <div
              className="flex flex-col items-center featured-nodes-homepage"
              onClick={handleGoToFeatured}
            >
              {publicPosts
                .filter(
                  (post) => post?.reply_id == null && post?.public == true
                ) // Filter the desired posts
                .slice(0, 2) // Use only the first two posts
                .map((post, index) => (
                  <>
                    <div key={post.id}>
                      <div
                        className={`flex flex-col py-5 px-5 text-md ${
                          index === 0 ? "featured-top" : "featured-bottom"
                        } font-mulish text-neutral-950 bg-userContent/100 ${
                          isDarkMode ? "light" : "dark"
                        }`}
                      >
                        <p className="w-32 font-bold truncate font-title">
                          {post.node_name}{" "}
                        </p>
                        <p className="font-normal truncate text-md w-52 font-body">
                          {post.content}
                        </p>
                       <div className="pt-2 text-sm font-bold text-primary active:underline">View Question <span className="pt-2 text-primary" sx={{fontSize:"16px"}}>  < KeyboardDoubleArrowRightRoundedIcon/></span></div> 
                     
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
