// invitecode holds the generated invite codes  
const inviteCode = (state = {}, action) => {
  switch (action.type) {
    case "CLEAR_GENERATE_INVITE_CODE":
        return {};
    case "GENERATE_INVITE_CODE":
      return action.payload;
    case "GENERATE_INVITE_CODE_ERROR":
      return { message: action.payload };
    default:
      return state;
  }
};

export default inviteCode;
