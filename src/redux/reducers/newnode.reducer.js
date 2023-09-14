import { combineReducers } from "redux";

// newNodeDatabaseResponse holds GET request from database of newest node
const newNodeDatabaseResponse = (state ={}, action) => {
    switch(action.type) {
        case 'SET_NEW_NODE':
            return action.payload;
        default: 
            return state;
    }
}

export default combineReducers({
    newNodeDatabaseResponse,
})