import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* EnterInviteCode(action) {
  try {
    console.log("update invite code saga", action.payload);
    // Update user with matching invite code the database
   yield axios.post(`/invite/code`, action.payload);
  } catch (error) {
    yield put({ type: "ENTER_INVITE_CODE_ERROR", payload: "Invalid invite code" });
    console.log("Error in updating user with matching invite code saga: ", error);
  }
}

function* enterInviteCodeSaga() {
  yield takeLatest("ENTER_INVITE_CODE", EnterInviteCode);
}

export default enterInviteCodeSaga;
