import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* generateInviteCode(action) {
  try {
    // Post invite code to the database
    yield axios.post(`/invite/code`, action.payload);
    console.log(action.payload, "POST invite code in saga");

    // Get the updated invite code from the database
    const inviteCodeResponse = yield axios.get(`/invite/code`);

    console.log("invitecode in saga", inviteCodeResponse);

    yield put({ type: "SET_INVITE_CODE", payload: inviteCodeResponse.data });
  } catch (error) {
    console.log("Error in invite code saga: ", error);
  }
}

function* inviteCodeSaga() {
  yield takeLatest("GENERATE_INVITE_CODE", generateInviteCode);
}

export default inviteCodeSaga;
