import React, { useEffect, useState } from "react";
import "../HomePage/HomePage.css";
import { InviteNodeModal } from "../InviteNodeModal/InviteNodeModal";
import SettingsModal from "../SettingsModal/SettingsModal";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import SVG from "../SVG/SVG";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";

export default function HeaderOwnerBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [InviteCodeOpen, setOpenInviteCode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [nodeId, setNodeId]= useState()
  let nodePosts = useSelector(
    (store) => store.postReducer.postDatabaseResponse
  );
  let newNode = useSelector(
    (store) => store.newNodeReducer.newNodeDatabaseResponse
  );

  //  INVITE CODE MODAL
  const openInviteCode = (nodeID) => {
    setOpenInviteCode(true);
  };
  const closeInviteCode = () => {
    setOpenInviteCode(false);
  };

  //  SETTING MODAL
  const openSettings = () => {
    setSettingsOpen(true);
  };
  const closeSettings = () => {
    setSettingsOpen(false);
  };
  
  const svgInvite = [
    "M18.2422 17.8633C21.0312 17.8633 23.3047 15.3789 23.3047 12.3555C23.3047 9.35547 21.043 7 18.2422 7C15.4648 7 13.1797 9.40234 13.1797 12.3789C13.1914 15.3906 15.4531 17.8633 18.2422 17.8633ZM18.2422 16.0938C16.5312 16.0938 15.0664 14.4531 15.0664 12.3789C15.0664 10.3398 16.5078 8.76953 18.2422 8.76953C19.9883 8.76953 21.418 10.3164 21.418 12.3555C21.418 14.4297 19.9648 16.0938 18.2422 16.0938ZM10.8711 28.7031H25.6016C27.5469 28.7031 28.4727 28.1172 28.4727 26.8281C28.4727 23.7578 24.5938 19.3164 18.2422 19.3164C11.8789 19.3164 8 23.7578 8 26.8281C8 28.1172 8.92578 28.7031 10.8711 28.7031ZM10.3203 26.9336C10.0156 26.9336 9.88672 26.8516 9.88672 26.6055C9.88672 24.6836 12.8633 21.0859 18.2422 21.0859C23.6094 21.0859 26.5859 24.6836 26.5859 26.6055C26.5859 26.8516 26.4688 26.9336 26.1641 26.9336H10.3203Z",
    "M31.0024 18C31.2542 18 31.4679 17.7803 31.4679 17.5146V13.0033H35.5392C35.7862 13.0033 36 12.7733 36 12.5026C36 12.2267 35.7862 12.0019 35.5392 12.0019H31.4679V7.48537C31.4679 7.21969 31.2542 7 31.0024 7C30.7458 7 30.5368 7.21969 30.5368 7.48537V12.0019H26.4656C26.2185 12.0019 26 12.2267 26 12.5026C26 12.7733 26.2185 13.0033 26.4656 13.0033H30.5368V17.5146C30.5368 17.7803 30.7458 18 31.0024 18Z",
  ];
  
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center header-container">
      <button onClick={() => history.goBack()}>
        <MdChevronLeft size={25} className="ml-2" />
      </button>
      {/* Display created node name */}
      <div style={{ margin: "25px" }}>
        <Typography>Created Node: {newNode?.[0]?.node_name || newNode?.node_name}</Typography>
      </div>
      {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
      <div className="flex-grow"></div>
      <button
        className="mr-4 text-2xl"
        onClick={() => openInviteCode(newNode.id)}
      >
        <SVG
          width={24}
          height={24}
          viewBox="8 5 27 27"
          pathData={svgInvite}
          fill="#CF6F5A"
        />
      </button>
      <InviteNodeModal
        InviteCodeOpen={InviteCodeOpen}
        InviteCodeClose={closeInviteCode}
      />
      <SettingsModal
        settingsOpen={settingsOpen}
        closeSettings={closeSettings}
      />
    </div>
  );
}
