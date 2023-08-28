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

// call listener for different dispatches
function* nodeAssociationSaga() {
    yield takeLatest('CREATE_NODE_ASSOCIATION', createNodeAssociation)
}

export default nodeAssociationSaga;