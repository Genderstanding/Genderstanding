import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';

// TO DO: ALERT 
function* fetchNewNode(action) {
    try {
        const nodeResponse = yield axios.get(`/node/new`)
        yield put({ type: 'SET_NEW_NODE', payload: nodeResponse.data})
    } catch(error) {
        console.log('Error in SAGA GET request for a new node: ', error)
    }
}

function* fetchCurrentNode(action){
    try {
        const nodeResponse = yield axios.get(`/node/new/${action.payload}`)
        yield put({ type: 'SET_NEW_NODE', payload: nodeResponse.data})
    } catch(error) {
        console.log('Error in SAGA get of current node: ', error)
    }
}


function* newNodeSaga() {
    yield takeLatest('FETCH_NEW_NODE', fetchNewNode);
    yield takeLatest('FETCH_CURRENT_NODE', fetchCurrentNode)
}

export default newNodeSaga;