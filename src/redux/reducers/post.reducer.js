import { combineReducers } from "redux";

// reducer to hold GET request from database of all posts
const postDatabaseResponse = ( state = [], action) => {
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
        default: 
            return state;
    }
}

const publicDatabaseResponse = ( state = [], action) => {
    switch(action.type){
        case 'SET_PUBLIC_POSTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    postDatabaseResponse,
    publicDatabaseResponse
})