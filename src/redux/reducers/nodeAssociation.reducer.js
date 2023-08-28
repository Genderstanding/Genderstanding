import { combineReducers } from "redux";

// Reducer to hold all of the node association information
const nodeAssociationDatabase = (state =[], action) => {
    switch(action.type) {
        case 'SET_NODE_ASSOCIATION':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    nodeAssociationDatabase,
})