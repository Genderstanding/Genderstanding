import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Saga to create a new code for a node association
function* createNodeAssociation(action){
    try {
        yield axios.post('/invite', action.payload)
        yield put({ type: 'FETCH_NODE_ASSOCIATION'})
    } catch (error) {
        console.log('Error in SAGA POST to node association: ', error);
    }
}

// Saga to fetch all current node associations
function* fetchNodeAssociation(action) {
    try {
        const nodeAssociationResponse = yield axios.get('/nodeassociation')
        yield put({ type: 'SET_NODE_ASSOCIATION', payload: nodeAssociationResponse.data })
    } catch (error) {
        console.log('ERror in SAGA GET request for node association: ', error)
    }
}

// Saga to add a user ID to a node association if the code matches
function* userNodeAssociation(action){
    try {
        yield axios.put(`/nodeassociation/${action.payload}`)
        yield put({ type: 'FETCH_NODE_ASSOCIATION'})
    } catch (error) {
        console.log('Error in SAGA PUT to add user to node association: ', error)
    }
}

// Saga to remove a user ID from a node association (if kicked from community)
function* removeNodeAssociation(action) {
    try {
        yield axios.put(`/nodeassociation/${action.payload}`)
        yield put({ type: 'FETCH_NODE_ASSOCIATION'})
    } catch (error) {
        console.log('Error in SAGA DELETE to remove a user from a node association: ', error)
    }
}

// call listener for different dispatches
function* nodeAssociationSaga() {
    yield takeLatest('CREATE_NODE_ASSOCIATION', createNodeAssociation);
    yield takeLatest('FETCH_NODE_ASSOCIATION', fetchNodeAssociation);
    yield takeLatest('REMOVE_NODE_ASSOCIATION', removeNodeAssociation);
    yield takeLatest('USER_NODE_ASSOCIATION', userNodeAssociation);
}

export default nodeAssociationSaga;