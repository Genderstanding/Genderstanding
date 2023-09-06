import axios from "axios";
import { put, takeLatest } from "redux-saga/effects"

function* fetchLikes(){
    try{
        const likeResponse = yield axios.get('/likes')
        yield put({ type: 'SET_LIKES', payload: likeResponse.data})
    } catch(error) {
        console.log('Error in SAGA GET of likes: ', error)
    }
}

function* likePost(action){
    try{
        yield axios.post('/likes', action.payload)
        yield put({ type: 'FETCH_LIKES' })
    } catch (error) {
        console.log('Error in SAGA POST for like: ', error)
    }
}


function* likeSaga(){
    yield takeLatest('FETCH_LIKES', fetchLikes);
    yield takeLatest('LIKE_POST_USER', likePost);
}

export default likeSaga;