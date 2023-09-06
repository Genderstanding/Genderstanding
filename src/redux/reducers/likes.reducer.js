import { combineReducers } from "redux";

const likeDatabaseResponse = (state = [], action) => {
    switch(action.type) {
        case 'SET_LIKES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    likeDatabaseResponse,
})