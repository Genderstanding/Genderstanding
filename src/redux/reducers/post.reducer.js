import { combineReducers } from "redux";

// postDatabaseResponse to hold GET request from database of all posts
const postDatabaseResponse = ( state = [], action) => {
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
        default: 
            return state;
    }
}

// publicDatabaseResponse to hold GET request from database of public posts
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