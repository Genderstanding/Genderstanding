import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';

//function to POST new node post to database
function* createNode(action) {
    try {
        yield axios.post('/node', action.payload)
        yield put({ type: 'FETCH_NODE' })
    } catch (error) {
        console.log('Error in SAGA POST to nodes: ', error)
    }
}

// function to GET all nodes from database
function* fetchNode(action) {
    try {
        const nodeResponse = yield axios.get('/node')
        yield put({ type: 'SET_NODE', payload: nodeResponse.data })
    } catch (error) {
        console.log('Error in SAGA GET request to nodes: ', error)
    }
}

// functions to listen for calls from page
function* nodeSaga() {
    yield takeLatest('CREATE_NODE', createNode)
    yield takeLatest('FETCH_NODE', fetchNode)
}

export default nodeSaga;