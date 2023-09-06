import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';

// TO DO: ALERT 
//function to POST new node post to database
function* createNode(action) {
    try {

        const nodePostResponse = axios.post('/node', action.payload)
        yield put({ type: 'FETCH_NODE' })
        yield put({ type: 'FETCH_NEW_NODE', payload: nodePostResponse })
    
    } catch (error) {

        console.log('Error in SAGA POST to nodes: ', error)

    }
}

// function to GET all nodes from database
function* fetchNode(action) {
    try {
        const nodeResponse = yield axios.get('/node')
        
        console.log('Node data received:', nodeResponse.data); 

        yield put({ type: 'SET_NODE', payload: nodeResponse.data })
    } catch (error) {
        console.log('Error in SAGA GET request to nodes: ', error)
    }
}

// function to PUT new node name into database
function* updateNode(action) {
    try {
        yield axios.put(`/node/${action.payload}`)
        yield put({ type:'FETCH_NODE'})
    } catch (error) {
        console.log('Error in SAGA PUT node request: ', error)
    }
}

// function to DELETE a node from database
function* deleteNode(action) {
    try {
        yield axios.delete(`/node/${action.payload}`)
        console.log(action.payload, "action.payload")
        yield put({ type: 'FETCH_NODE'})
    } catch (error) {
        console.log('Error in SAGA DELETE node request: ', error)
    }
}

// functions to listen for calls from page
function* nodeSaga() {
    yield takeLatest('CREATE_NODE', createNode)
    yield takeLatest('FETCH_NODE', fetchNode)
    yield takeLatest('UPDATE_NODE', updateNode)
    yield takeLatest('DELETE_NODE', deleteNode)
}

export default nodeSaga;