import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


function* generateInviteCode(action) {
  try {
    // Post invite code to the database
    const response = yield axios.post(`/invite`, action.payload);
    console.log(response, "POST invite code in saga");
    yield put({ type: "GENERATE_INVITE_CODE", payload: response.data });
  } catch (error) {
    yield put({ type: "GENERATE_INVITE_CODE_ERROR",  payload: "An error occurred while generating invite code" });
    console.log("Error generating invite code in saga: ", error);
  }
}

function* inviteCodeSaga() {
  yield takeLatest("SET_INVITE_CODE", generateInviteCode);
}

export default inviteCodeSaga;
