import { combineReducers } from "redux";

// nodeDatabaseResponse holds GET request from database of all nodes
const nodeDatabaseResponse = (state = [], action) => {
    switch(action.type) {
        case 'SET_NODE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    nodeDatabaseResponse,
})