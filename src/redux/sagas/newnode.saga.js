import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';

function* fetchNewNode(action) {
    try {
        const nodeResponse = yield axios.get(`/node/new`)
        yield put({ type: 'SET_NEW_NODE', payload: nodeResponse.data})
    } catch(error) {
        console.log('Error in SAGA GET request for a new node: ', error)
    }
}


function* newNodeSaga() {
    yield takeLatest('FETCH_NEW_NODE', fetchNewNode)
}

export default newNodeSaga;