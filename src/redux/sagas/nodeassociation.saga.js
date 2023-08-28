import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* createNodeAssociation(action){
    try {
        yield axios.post('/invite', action.payload)
        yield put({ type: 'FETCH_NODE_ASSOCIATION'})
    } catch (error) {
        console.log('Error in SAGA POST to node association: ', error);
    }
}

function* fetchNodeAssociation(action) {
    try {
        const nodeAssociationResponse = yield axios.get('/nodeassociation')
        yield put({ type: 'SET_NODE_ASSOCIATION'})
  
    } catch (error) {
        console.log('ERror in SAGA GET request for node association: ', error)
    }
}

// call listener for different dispatches
function* nodeAssociationSaga() {
    yield takeLatest('CREATE_NODE_ASSOCIATION', createNodeAssociation);
    yield takeLatest('FETCH_NODE_ASSOCIATION', fetchNodeAssociation)
}

export default nodeAssociationSaga;