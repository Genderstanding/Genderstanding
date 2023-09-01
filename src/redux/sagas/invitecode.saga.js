import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// TO DO: ALERT
// function* fetchInviteCode() {
//   try {
//     // Get the updated invite code from the database
//     const response = yield axios.get(`/invite`);
//     console.log("invitecode in saga", inviteCodeResponse);
//     yield put({ type: "SET_INVITE_CODE", payload: response.data });
//   } catch (error) {
//     console.log("Error in invite code saga: ", error);
//   }d
// }

function* generateInviteCode(action) {
  try {
    // Post invite code to the database
    const response = yield axios.post(`/invite`, action.payload);
    console.log(response, "POST invite code in saga");
    yield put({ type: "SET_INVITE_CODE", payload: response.data });
  } catch (error) {
    console.log("Error in invite code saga: ", error);
  }
}

function* inviteCodeSaga() {
  // yield takeLatest("FETCH_INVITE_CODE", fetchInviteCode);
  yield takeLatest("GENERATE_INVITE_CODE", generateInviteCode);
}

export default inviteCodeSaga;
