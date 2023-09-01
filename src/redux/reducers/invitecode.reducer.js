
const inviteCode = (state = {}, action) => {
    switch(action.type) {
        case 'SET_INVITE_CODE':
            return action.payload;
        default: 
            return state;
    }
}

export default 
    inviteCode;
