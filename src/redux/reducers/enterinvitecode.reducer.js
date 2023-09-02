const enterInviteCode = (state = {}, action) => {
  switch (action.type) {
    case "CLEAR_INVITE_CODE_ERROR":
      return {};
    case "ENTER_INVITE_CODE_ERROR":
      return { error: true, message: action.payload };
    default:
      return state;
  }
};

export default enterInviteCode;
